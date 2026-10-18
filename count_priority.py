"""Count the urgency "Sort and pull out" gave each pink-slip test email.

Claude-built, demo use only. Reads the output of a command-line run of the
"Test pink-slip priority" workflow (n8n execute --rawOutput), which mixes log
lines with the run's JSON, and prints how many times E07 and E13 came out
High, Normal, and Low, with token counts.

Usage: python3 count_priority.py <saved-output-file> [label]
"""
import json
import sys
from collections import Counter


def load_run(path):
    raw = open(path, encoding="utf-8").read()
    # The run's JSON starts at the first line that opens an object; log lines
    # can also follow it, so decode one object and ignore the rest.
    start = raw.find("\n{")
    run, _ = json.JSONDecoder().raw_decode(raw[start + 1 if start >= 0 else 0:])
    return run


def main():
    run = load_run(sys.argv[1])
    label = sys.argv[2] if len(sys.argv) > 2 else ""
    run_data = run["data"]["resultData"]["runData"]
    test_items = run_data["Pink-slip test emails, 10 each (Code)"][0]["data"]["main"][0]
    answers = run_data["Sort and pull out"][0]["data"]["main"][0]

    counts = {}
    for item, answer in zip(test_items, answers):
        email = item["json"]["id"]
        output = answer["json"].get("output")
        # The test copy of the extractor continues past a bad answer, which
        # then has no output; count those as failures.
        urgency = output["urgency"] if output else "failed"
        counts.setdefault(email, Counter())[urgency] += 1

    tokens_in = tokens_out = 0
    for name, runs in run_data.items():
        for r in runs:
            for out in r.get("data", {}).get("ai_languageModel", [[]])[0] or []:
                usage = out["json"].get("tokenUsage", {})
                tokens_in += usage.get("promptTokens", 0)
                tokens_out += usage.get("completionTokens", 0)

    print(f"{label}".strip() or sys.argv[1])
    for email in sorted(counts):
        c = counts[email]
        print(f"  {email}: Low {c['Low']}, Normal {c['Normal']}, High {c['High']}, failed {c['failed']} (of {sum(c.values())})")
    print(f"  Tokens: {tokens_in} in, {tokens_out} out")


if __name__ == "__main__":
    main()
