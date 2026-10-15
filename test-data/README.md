# Test Data

**Synthetic data only.** Callander & Reid Insurance Brokers, its clients, its staff, both carriers (Birchview Assurance, Kestrel Bay Insurance), and every name, address, VIN, phone number, and policy number in this folder are made up. Street names were invented and not checked against real addresses. Claude-built.

| File | What it holds |
|---|---|
| `clients.csv` | Six fake clients, one row per policy, with Applied Epic field names. Loads into the `clients` Data Table |
| `test-emails.md` | Twelve test emails, in send order, ready to paste into Gmail |
| `answer-key.json` | The correct category and field values for each test email. Read by the scoring script |

## Fields in the Answer Key

The extractor's field descriptions (Thursday) should say the same thing as these definitions. If the two disagree, the scores measure the disagreement, not the AI.

| Field | Correct value | Scored |
|---|---|---|
| `category` | One of: policy change, renewal question, claim notice, underwriter request, other | Exact match |
| `urgency` | High, Normal, or Low. These map to Epic's Priority field, but Epic's full list of values isn't confirmed: Applied's help also shows "Urgent" (`applied-epic-field-list.md` section 08). Claims and anything that threatens coverage are High | Exact match |
| `client_name` | The account the email is about, as the Account Name in `clients.csv`. **The client, not the sender**: an office manager writing for a company means the company. `null` when the email doesn't say | Match against `client_name` or any `client_name_accept` value, ignoring case and punctuation |
| `policy_number` | The policy number exactly as the email gives it. `null` when the email gives none. The extractor can't see client records, so it can't fill one in | Exact match, ignoring case and spaces |
| `cant_tell_policy` | `true` when the email gives no policy number, or gives more than one without saying which the request is about | Exact match |
| `effective_date` | The one date the request turns on, as YYYY-MM-DD: when a change takes effect, the date of loss for a claim, the renewal date for a renewal question, the reply deadline for an underwriter request. `null` when the email gives no date | Exact match |
| `requested_change` | Free text. The reference wording is a guide, not the target | Passes when it mentions one word from every inner list in `must_mention`, ignoring case |

**Not scored:** `bms_policy` and `lookup_code` (the record a broker would attach the email to), `epic_code_suggested` (input for Friday's draft step), `notes`, and the AI's own reason and confidence.

## Category Count

| Category | Emails |
|---|---|
| policy change | E02, E03, E06, E11, E12 |
| renewal question | E04, E08 |
| claim notice | E01, E09 |
| underwriter request | E05, E10 |
| other | E07 |

"Policy change" replaced "add a vehicle" on 2026-10-15. It covers vehicles, drivers, and addresses, which Epic logs under one code, CHGR (change request).
