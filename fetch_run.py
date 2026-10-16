"""Fetch one n8n run (execution) with its full data and save it to results/.

Functional reference, Claude-built. Test data only.

Moe runs this, since it reads the n8n API key. The key is never printed or saved.
    python3 fetch_run.py            # the newest run of any workflow
    python3 fetch_run.py 42         # run number 42
The key comes from N8N_API_KEY in the git-ignored key file next to this script.
"""
import json
import pathlib
import sys
import urllib.request

HERE = pathlib.Path(__file__).resolve().parent
BASE = "http://127.0.0.1:5678/api/v1"


def api_key():
    for line in (HERE / ".env").read_text().splitlines():
        if line.strip().startswith("N8N_API_KEY="):
            return line.split("=", 1)[1].strip().strip('"').strip("'")
    sys.exit("N8N_API_KEY isn't in the key file next to this script.")


def get(path, key):
    req = urllib.request.Request(BASE + path, headers={"X-N8N-API-KEY": key, "accept": "application/json"})
    with urllib.request.urlopen(req) as resp:
        return json.load(resp)


def main():
    key = api_key()
    if len(sys.argv) > 1:
        run_id = sys.argv[1]
    else:
        newest = get("/executions?limit=1", key)["data"]
        if not newest:
            sys.exit("n8n has no saved runs.")
        run_id = newest[0]["id"]
    run = get(f"/executions/{run_id}?includeData=true", key)
    out = HERE / "results" / f"run-{run_id}-raw.json"
    out.parent.mkdir(exist_ok=True)
    out.write_text(json.dumps(run, indent=1, ensure_ascii=False))
    print(f"Saved run {run_id} ({run.get('status')}, started {run.get('startedAt')}) to results/{out.name}")


if __name__ == "__main__":
    main()
