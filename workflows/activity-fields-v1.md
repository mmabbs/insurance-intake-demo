# Set activity fields: v1

Claude-built. Paste the block into the **JSON** box of the **Set activity fields** node (Edit Fields, Mode **JSON**). It turns each draft into one row for the `activities` table, using the table's column names. The draft itself (`output`, including the follow-up email) is kept for the broker's review form.

Fixed rules, not AI: Code from the category, Priority from urgency, Status Open, Who/Owner Sandra Pellegrino, Follow up/Start from urgency (High next day, Normal 3 days, Low 7 days), Associated To "Policy" when a policy was identified and "Account" otherwise. `entered_on` and `entered_by` are left for the write step, after the broker approves.

Text fields use `JSON.stringify(...)` with no quotes around it, so a quote mark inside a note can't break the JSON.

```
{
  "code": {{ JSON.stringify(({ "policy change": "CHGR", "renewal question": "RENL", "claim notice": "FNOL", "underwriter request": "UNDR", "other": "MISC" })[$('Sort and pull out').item.json.output.category] || "MISC") }},
  "description": {{ JSON.stringify($json.output.description) }},
  "who_owner": "Sandra Pellegrino",
  "follow_up_start": {{ JSON.stringify($now.plus({ days: ({ High: 1, Normal: 3, Low: 7 })[$('Sort and pull out').item.json.output.urgency] || 3 }).toISODate()) }},
  "priority": {{ JSON.stringify($('Sort and pull out').item.json.output.urgency) }},
  "status": "Open",
  "associated_to": {{ JSON.stringify($json.output.policy_number ? "Policy" : "Account") }},
  "lookup_code": {{ JSON.stringify($json.output.lookup_code) }},
  "policy_number": {{ JSON.stringify($json.output.policy_number) }},
  "note": {{ JSON.stringify($json.output.note) }}
}
```
