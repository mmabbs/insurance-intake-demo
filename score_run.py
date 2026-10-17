"""Score one saved n8n run against the answer key, with cost per email.

Functional reference, Claude-built. Test data only.

    python3 score_run.py results/run-6-raw.json "Haiku 5.5, schema v1"

Reads the run saved by fetch_run.py, test-data/answer-key.json, and
test-data/pinned-12-emails.json (to pair each answer with its email).
Writes results/run-<id>-score.md and adds one row to results/scored-runs.csv.
Scoring rules are the ones in test-data/README.md.
"""
import csv
import json
import pathlib
import re
import sys

HERE = pathlib.Path(__file__).resolve().parent

# USD per million tokens, from the Claude API reference cached 2026-10-06.
# Haiku 5.5's price holds for prompts up to 100K tokens; these emails are ~2K.
PRICES = {
    "claude-haiku-5-5": (0.10, 0.50),
    "claude-sonnet-5-5": (2.00, 10.00),
    "claude-opus-5-5": (4.00, 20.00),
}
FIELDS = ["urgency", "client_name", "policy_number", "cant_tell_policy", "effective_date", "requested_change"]


def norm_name(s):
    return re.sub(r"[^a-z0-9]", "", s.lower()) if s else None


def check(field, got, key):
    want = key[field]
    if field == "client_name":
        # null is right only when the preferred answer is null; the accept list counts either way (E08's "Kev").
        if got is None:
            return want is None
        accepted = {norm_name(a) for a in key.get("client_name_accept", [])}
        if want is not None:
            accepted.add(norm_name(want))
        return norm_name(got) in accepted
    if field == "policy_number":
        if want is None or got is None:
            return want is None and got is None
        return re.sub(r"\s", "", got).lower() == re.sub(r"\s", "", want).lower()
    if field == "requested_change":
        text = (got or "").lower()
        return all(any(word.lower() in text for word in group) for group in key["must_mention"])
    return got == want


def node_of_type(run, type_suffix):
    for n in run["workflowData"]["nodes"]:
        if n["type"].endswith(type_suffix):
            return n
    sys.exit(f"No {type_suffix} node in this run.")


# The workflow has more than one Claude model node, so find the one wired into the extractor.
def model_feeding(run, target_name):
    by_name = {n["name"]: n for n in run["workflowData"]["nodes"]}
    for source, outputs in run["workflowData"]["connections"].items():
        for link in (outputs.get("ai_languageModel") or [[]])[0]:
            if link["node"] == target_name and by_name[source]["type"].endswith(".lmChatAnthropic"):
                return by_name[source]
    sys.exit(f"No Claude model node is connected to {target_name}.")


def main():
    raw_path = pathlib.Path(sys.argv[1])
    label = sys.argv[2] if len(sys.argv) > 2 else ""
    run = json.loads(raw_path.read_text())
    key = {e["subject"]: e for e in json.loads((HERE / "test-data/answer-key.json").read_text())["emails"]}
    pinned = json.loads((HERE / "test-data/pinned-12-emails.json").read_text())

    runs = run["data"]["resultData"]["runData"]
    extractor = node_of_type(run, ".informationExtractor")
    model_node = model_feeding(run, extractor["name"])
    model = model_node["parameters"]["model"]["value"]
    answers = runs[extractor["name"]][0]["data"]["main"][0]
    model_calls = runs[model_node["name"]]

    # Pair answers with emails by item position, then check each model call saw that email's subject.
    warnings = []
    prompt_subjects = []
    for call in model_calls:
        msgs = call["inputOverride"]["ai_languageModel"][0][0]["json"]["messages"]
        m = re.search(r"Subject: (.*)", msgs[-1])
        prompt_subjects.append(m.group(1).strip() if m else None)

    rows = []
    for pos, item in enumerate(answers):
        idx = item.get("pairedItem", {}).get("item", pos)
        subject = pinned[idx]["subject"]
        if idx < len(prompt_subjects) and prompt_subjects[idx] != subject:
            warnings.append(f"Answer {pos + 1}: paired with '{subject}', but model call {idx + 1} saw '{prompt_subjects[idx]}'")
        out = item["json"].get("output", {})
        k = key[subject]
        result = {"id": k["id"], "subject": subject, "out": out, "key": k,
                  "category_ok": out.get("category") == k["category"],
                  "fields": {f: check(f, out.get(f), k) for f in FIELDS}}
        rows.append(result)
    rows.sort(key=lambda r: r["id"])

    tin = sum(c["data"]["ai_languageModel"][0][0]["json"]["tokenUsage"]["promptTokens"] for c in model_calls)
    tout = sum(c["data"]["ai_languageModel"][0][0]["json"]["tokenUsage"]["completionTokens"] for c in model_calls)
    pin, pout = PRICES[model]
    cost = tin / 1e6 * pin + tout / 1e6 * pout
    n = len(rows)
    cat_ok = sum(r["category_ok"] for r in rows)
    field_ok = sum(sum(r["fields"].values()) for r in rows)
    field_total = n * len(FIELDS)
    per_field = {f: sum(r["fields"][f] for r in rows) for f in FIELDS}

    run_id = run["id"]
    lines = [
        f"# Scored Run {run_id}", "",
        f"{label}. Model `{model}`. Run started {run['startedAt']}. Claude-built scoring script.", "",
        "## Totals", "",
        f"1. **Category:** {cat_ok}/{n} right.",
        f"2. **Fields:** {field_ok}/{field_total} right ({len(FIELDS)} scored fields per email).",
        *[f"   - {f}: {per_field[f]}/{n}" for f in FIELDS],
        f"3. **Tokens:** {tin} in, {tout} out, across {len(model_calls)} model calls.",
        f"4. **Cost:** ${cost:.4f} for {n} emails, ${cost / n:.5f} per email, at ${pin}/${pout} per million tokens in/out.",
        "",
    ]
    if warnings:
        lines += ["## Pairing Warnings", "", *[f"- {w}" for w in warnings], ""]
    lines += ["## Per Email", "", "| Email | Category | " + " | ".join(FIELDS) + " | Confidence |",
              "|---" * (len(FIELDS) + 3) + "|"]
    for r in rows:
        mark = lambda ok: "✓" if ok else "✗"
        lines.append(f"| {r['id']} | {mark(r['category_ok'])} | " + " | ".join(mark(r["fields"][f]) for f in FIELDS)
                     + f" | {r['out'].get('confidence')} |")
    lines += ["", "## Misses", ""]
    for r in rows:
        misses = (["category"] if not r["category_ok"] else []) + [f for f in FIELDS if not r["fields"][f]]
        for f in misses:
            want = r["key"][f] if f != "requested_change" else f"must mention one of each: {r['key']['must_mention']}"
            lines.append(f"- **{r['id']} {f}:** got `{r['out'].get(f)}`, want `{want}`")
    lines += ["", "## The AI's Reasons", ""]
    for r in rows:
        lines.append(f"- **{r['id']}** ({r['out'].get('confidence')}): {r['out'].get('reason')}")

    out_md = HERE / "results" / f"run-{run_id}-score.md"
    out_md.write_text("\n".join(lines) + "\n")

    # One row per run: re-scoring a run replaces its row.
    log = HERE / "results" / "scored-runs.csv"
    header = ["run", "started", "label", "model", "emails", "category_right", "fields_right", "fields_total",
              "tokens_in", "tokens_out", "cost_usd", "cost_per_email_usd"]
    kept = []
    if log.exists():
        with log.open(newline="") as f:
            kept = [r for r in csv.reader(f)][1:]
    kept = [r for r in kept if r and r[0] != str(run_id)]
    kept.append([run_id, run["startedAt"], label, model, n, cat_ok, field_ok, field_total, tin, tout,
                 f"{cost:.4f}", f"{cost / n:.5f}"])
    with log.open("w", newline="") as f:
        csv.writer(f).writerows([header, *kept])
    print("\n".join(lines[:12 + len(FIELDS)]))
    if warnings:
        print("WARNINGS:", *warnings, sep="\n")
    print(f"\nWrote results/{out_md.name} and added a row to results/scored-runs.csv")


if __name__ == "__main__":
    main()
