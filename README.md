# Insurance Intake Demo

An AI workflow that reads an insurance brokerage's shared inbox, drafts the activity a staff member would normally log in the brokerage's system (Applied Epic), and sends it to a broker to approve. Every email, approval, and correction is logged, and the broker's corrections feed back into the AI's instructions.

**Demo build with synthetic data.** The brokerage (Callander & Reid Insurance Brokers), its clients, the insurers, and every email are made up. The brokerage's system is a mock of Applied Epic, built from real Epic screenshots and field names. Nothing here has run on real client data.

Full case study: <https://moesfrontmatters.com/projects/ins-intake>

## What It Does

A new email in the shared inbox starts the workflow.

1) **Sorts each email.** Claude Haiku 5.5 reads the email and decides the request type, urgency, client, policy, and what changed. It writes down why it read the email that way and how sure it is. When it can't tell which policy an email is about, it says so instead of guessing.
2) **Drafts the activity.** A second call pulls the client's file, so the draft never asks a client for what's already on record. It writes the activity's Description and Note, and drafts a follow-up email only when the brokerage needs something from someone.
3) **Applies fixed rules.** The request type sets the activity's Code (CHGR, RENL, FNOL, UNDR, MISC). Urgency sets Priority and how soon the Follow up/Start date falls. The owner is fixed. The AI judges type and urgency; the rules decide what those mean in Epic, so they come out the same way every time.
4) **Sends it to a broker.** The broker gets one review email at a time, with a prefilled form and a ⚠ on anything that needs a closer look, and approves it or fixes it.
5) **Files and logs.** The broker's version is filed in the mock Epic. Every email gets an audit record. Every change the broker makes is saved as a before-and-after pair, and the five newest corrections go back into the AI's instructions as examples. A live run that fails lands on a "needs attention" list on the dashboard, with the step that broke and the error.

Nothing is filed until a broker approves it. RIBO's guidance on AI use says a brokerage stays responsible for its work even when a vendor's tool does it, and asks brokerages to keep a licensed broker "in the loop."

## Results

Every number below was measured and scored against an answer key written before the AI steps were built. Prices come from the token counts n8n saved with each run.

**Final scored run** (run 6066, 12 test emails, Claude Haiku 5.5, `results/run-6066-score.md`):

| What | Result |
| --- | --- |
| Request types right | 12 of 12 |
| Details right (urgency, client, policy, effective date, what changed) | 71 of 72 |
| Activity fields right (Code, Priority, Lookup Code, Policy Number) | 47 of 48 |
| Cost per email, whole workflow | $0.00195, about a fifth of a cent |

Both misses are the same mistake: a client asking for her "pink slips" (Ontario's proof-of-insurance card) was marked Low urgency. A broker knows it's Normal, since driving without one can get a ticket.

**Did a broker's correction fix it?** (`results/priority-test.md`) The broker fixed that email once. I then ran the pink-slip email 60 times before that correction and 60 times after, in a test copy of the reading step. I did the same with a new pink-slip email from a different client, one the AI had never seen corrected:

| | Marked Low, before | Marked Low, after |
| --- | --- | --- |
| The original email | 32 of 60 | 0 of 60 |
| A new, similar email | 14 of 60 | 0 of 60 |

**Haiku against Sonnet** (`results/scored-runs.csv`): on the sorting step, Claude Haiku 5.5 got 12 of 12 types and 71 of 72 details right. Claude Sonnet 5.5 got 11 of 12 and 70 of 72, at about 13 times the cost per email.

## What's in This Repo

| Folder or file | What it holds |
| --- | --- |
| `workflows/insurance-intake.json` | The main workflow, exported from n8n |
| `workflows/` | The other workflows (mock Epic data, dashboard data, needs-attention, tests), and every version of the prompts and output formats |
| `test-data/` | The test emails, fake clients, and the answer key. See `test-data/README.md` |
| `results/` | One score report per scored run, and `scored-runs.csv` with every run's numbers |
| `pages/` | The mock Epic screen and the dashboard (what came in, what was approved as drafted, what was corrected, what failed, and what it cost), as web pages. See `pages/README.md` |
| `score_run.py`, `fetch_run.py`, `count_priority.py` | The scoring and test-counting scripts |
| `screenshots/` | Screenshots taken during the build |

## How It Was Built

**I** designed the workflow and made the key decisions. I built the main workflow and the feedback loop by hand in n8n, set up the accounts, and reviewed the test emails and the answer key.

**Claude Code**, at my direction, drafted the fake clients, test emails, and answer key. It also wrote the scoring scripts, researched Applied Epic's field names and screens, built the mock Epic screen, the dashboard, and the workflow that feeds the dashboard its data, built the pink-slip test workflow, and added the format-repair step. Everything Claude built is labelled "Claude-built" in the file itself.

**Stack:** n8n (self-hosted, version 2.43.4), Claude Haiku 5.5, Gmail, Claude Code.

## Known Limits

- **Twelve test emails are not a real inbox.** The accuracy numbers come from 12 deliberately messy emails, not live mail.
- **Time saved wasn't measured.** There was no real "before" to measure against.
- **The AI's confidence rating is a label it gives itself,** based on whether it had to guess. It isn't a measured probability, and it wasn't scored.
- **A "needs attention" entry doesn't say which email failed.** Finding the email is a manual check.
- **Emails leave the brokerage's systems.** The AI step sends each email, and the matching client file, to Anthropic for processing, outside Canada.
- **The web pages are functional references,** built for fictional data on one computer. They have no login and no access control.

