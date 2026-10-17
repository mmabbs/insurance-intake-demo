# Pages

Screens for the insurance intake demo. Each one is a **functional reference**: Claude-built, not developer-reviewed, and only for showing on fictional data. Labelled per `draft-internal-policy-vibe-coded-prototypes.md` in the vault.

## mock-bms-functional-reference.html

A mock broker management screen for Callander & Reid Insurance Brokers. Its field labels, column order, and activity codes follow Applied Epic, from `applied-epic-field-list.md`. It is not Applied Epic and carries no Applied branding.

**To open it:** n8n must be running, with the `Mock Epic data` workflow published. Then double-click the file, or run `open pages/mock-bms-functional-reference.html` from `insurance-intake/`.

**Where its data comes from:** two webhooks in the `Mock Epic data` workflow (`workflows/mock-epic-data.json`).

| Address | Returns |
| --- | --- |
| `http://localhost:5678/webhook/epic-clients` | Every row of the `clients` Data Table: one row per policy, 11 rows for 6 accounts |
| `http://localhost:5678/webhook/epic-activities` | Every row of the `activities` Data Table. An empty table comes back as status 200 with an empty body |

The page asks both addresses again every 5 seconds. Activities that appear after the page loads are highlighted for 10 seconds, and the status bar names the newest one.

**Views:** Home (all activities, using Epic's Home-list columns), Accounts (the 6 clients), and one account's page (account details, policies, and that account's activities). Clicking an activity opens its details, in the order of Epic's Add Activity screen.

## Known limitations

1. **Read-only.** Nothing on the page writes back. Activities are added only by the intake workflow, or by hand in n8n's Data tables tab.
2. **No login.** The user name in the title bar is fixed text. Anyone who can open the file and reach `localhost:5678` sees all the data.
3. **No access control on the webhooks.** They have no authentication and allow any page to read them. That's fine for fictional data on one Mac, and it's wrong for anything real.
4. **Fictional data only.** Clients, policies, carriers (Birchview Assurance, Kestrel Bay Insurance), and staff are made up.
5. **Not Epic's real layout.** No screenshot of Epic's Add Activity screen was found. The detail pane's field order comes from Applied's written help steps (`applied-epic-field-list.md` section 08), so its layout is a best guess.
6. **Most of the navigation is for show.** Policies, Claims, Marketing, Procedures, and Reports are greyed out and do nothing.
7. **Dates show in Toronto time.** n8n sends dates in UTC (`2026-03-01T05:00:00.000Z`), and the page converts them. A Date column holding a time other than midnight shows the time too.
8. **Depends on n8n.** If n8n stops or the workflow is unpublished, the page shows a "Can't reach the data" message and keeps the last rows it had.
