# Pages

Screens for the insurance intake demo. Each one is a **functional reference**: Claude-built, not developer-reviewed, and only for showing on fictional data. Labelled per `draft-internal-policy-vibe-coded-prototypes.md` in the vault.

## mock-bms-functional-reference.html

A mock broker management screen for Callander & Reid Insurance Brokers. Its layout follows real Applied Epic screenshots: the vendor images on Software Advice's Applied Epic page, and the Higginbotham Epic Configuration Guide (rev 04-21-26). Its field labels and activity codes come from `applied-epic-field-list.md`. It is not Applied Epic and carries no Applied branding.

**To open it:** n8n must be running, with the `Mock Epic data` workflow published. Then double-click the file, or run `open pages/mock-bms-functional-reference.html` from `insurance-intake/`.

**Where its data comes from:** two webhooks in the `Mock Epic data` workflow (`workflows/mock-epic-data.json`).

| Address | Returns |
| --- | --- |
| `http://localhost:5678/webhook/epic-clients` | Every row of the `clients` Data Table: one row per policy, 11 rows for 6 accounts |
| `http://localhost:5678/webhook/epic-activities` | Every row of the `activities` Data Table. An empty table comes back as status 200 with an empty body |

The page asks both addresses again every 5 seconds. Activities that appear after the page loads are highlighted for 10 seconds, and the status bar names the newest one.

**Views:** Home (the activity list, with Epic's Home-list columns), Locate (search the 6 accounts by name, lookup code, or policy number), and one account's page (account card, policies, and that account's activities). Under each activity list sit Epic's two panels for the selected row: Activity at a Glance, and Activity - Last Note Entered, which shows the `note` column.

## Known limitations

1. **Read-only.** Nothing on the page writes back. Activities are added only by the intake workflow, or by hand in n8n's Data tables tab.
2. **No login.** The user name in the title bar is fixed text. Anyone who can open the file and reach `localhost:5678` sees all the data.
3. **No access control on the webhooks.** They have no authentication and allow any page to read them. That's fine for fictional data on one Mac, and it's wrong for anything real.
4. **Fictional data only.** Clients, policies, carriers (Birchview Assurance, Kestrel Bay Insurance), and staff are made up.
5. **Close to Epic, not a copy.** The Home list, the two activity panels, the Locate screen, and the header and menu follow real screenshots. The account page's card and the Activity at a Glance fields are partly a best guess, and no screenshot of Epic's Add Activity screen was found. Colours and the font (Open Sans) were matched by eye. Open Sans loads from Google Fonts, so offline the page falls back to a system font.
6. **Most of the navigation is for show.** Greyed-out menu items and header buttons (Actions, Links, New, Print, Logout) do nothing.
7. **Dates show in Toronto time.** n8n sends dates in UTC (`2026-03-01T05:00:00.000Z`), and the page converts them. A Date column holding a time other than midnight shows the time too.
8. **Depends on n8n.** If n8n stops or the workflow is unpublished, the page shows a "Can't reach the data" message and keeps the last rows it had.

## dashboard-functional-reference.html

The intake dashboard, in the branded look (`brand-brief.md` in the vault: warm charcoal, cream, pine, ochre; Zilla Slab headings, Satoshi body). It's the layer on top of the brokerage's own system, so it deliberately looks nothing like the mock Epic screen.

**To open it:** n8n must be running, with the `Dashboard data` workflow published. Then double-click the file, or run `open pages/dashboard-functional-reference.html` from `insurance-intake/`.

**Where its data comes from:** four webhooks in the `Dashboard data` workflow (`workflows/dashboard-data.json`).

| Address | Returns |
| --- | --- |
| `http://localhost:5678/webhook/dash-audit-log` | Every row of `audit_log` |
| `http://localhost:5678/webhook/dash-corrections` | Every row of `corrections` |
| `http://localhost:5678/webhook/dash-needs-attention` | Every row of `needs_attention` |
| `http://localhost:5678/webhook/dash-cost` | One summary: for each run listed in `audit_log`, the tokens of every Claude call n8n saved with that run, priced per model, plus the totals |

The page asks the three table addresses every 5 seconds and the cost address every 30 seconds. New rows are highlighted for 10 seconds.

**What it shows:** emails in (with how many were flagged for a closer look), approved as drafted, corrected by a broker, the "needs attention" count, and running cost with cost per email. Below: the needs-attention list, the broker's corrections (the AI's value struck through above the broker's), every email, and cost per run.

**How the numbers are worked out:**

1. **Approved as drafted:** `audit_log` rows whose `fields_changed` is empty. **Corrected:** the rest.
2. **Running cost:** measured, not estimated. The `dash-cost` webhook reads each run through n8n's own API (the n8n node, with the `n8n API (read runs only)` credential) and adds up the token counts of every Claude model node, including the drafter's format fixer. Prices are the ones `score_run.py` uses (Claude API reference, cached 2026-10-06).
3. **Cost per email:** the total divided by the emails in `audit_log`. A run stopped before every review was submitted counts all its Claude calls but only the emails it logged, so test runs like that push this number up. After Tuesday's cleanup, only complete runs remain.

## Dashboard Known Limitations

1. **Read-only, no login, no access control.** Same as the mock Epic screen: anyone who can open the file and reach `localhost:5678` sees all the data.
2. **The cost webhook reads whole runs.** Each call fetches every listed run in full, which is why it's asked every 30 seconds, not every 5. Fine for a demo's handful of runs; it would need a saved running total for real volume.
3. **Prices are fixed in the workflow.** If Anthropic changes a price or the workflow switches to a model not in the list, those calls show as "not counted" under the cost table until the price list in `Add up tokens and cost (Code)` is updated.
4. **Runs n8n has deleted can't be priced.** n8n prunes old runs by default. A pruned run shows as "couldn't be read" under the cost table.
5. **Fonts load from the web.** Zilla Slab from Google Fonts and Satoshi from Fontshare; offline, the page falls back to system fonts.
6. **Fictional data only.**
