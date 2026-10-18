# Set activity fields: v2

Claude-built. Replaces v1. Paste the block into the **JSON** box of the **Set activity fields** node (Edit Fields, Mode **JSON**). It turns each draft into one row for the `activities` table, using the table's column names. The draft itself (`output`, including the follow-up email) is kept for the broker's review form.

Changes from v1 (2026-10-17):

1. **Priority maps High to Urgent.** Real Epic screenshots show Normal and Urgent. The extractor and the answer key keep High, Normal, Low, so scoring doesn't change.
2. **`review_flag`** holds the warning shown in the review email's subject and message, or `""` when nothing needs a closer look. Three triggers: the email didn't say which policy, the AI's confidence is low, or the category is "other."
3. **`email`** carries the email's details (Gmail message ID, sender, subject, date, text), read from `Incoming email (No Operation)`. The review form and the audit log read them from here, so nothing after the loop has to reach back past it.
4. **`ai_read`** carries what Sort and pull out found, for the review email and the audit log.

Fixed rules, not AI: Code from the category, Priority from urgency, Status Open, Who/Owner Sandra Pellegrino, Follow up/Start from urgency (High next day, Normal 3 days, Low 7 days), Associated To "Policy" when a policy was identified and "Account" otherwise. `entered_on` and `entered_by` are left for the write step, after the broker approves.

Text fields use `JSON.stringify(...)` with no quotes around it, so a quote mark inside a note can't break the JSON.

```
{
  "code": {{ JSON.stringify(({ "policy change": "CHGR", "renewal question": "RENL", "claim notice": "FNOL", "underwriter request": "UNDR", "other": "MISC" })[$('Sort and pull out').item.json.output.category] || "MISC") }},
  "description": {{ JSON.stringify($json.output.description) }},
  "who_owner": "Sandra Pellegrino",
  "follow_up_start": {{ JSON.stringify($now.plus({ days: ({ High: 1, Normal: 3, Low: 7 })[$('Sort and pull out').item.json.output.urgency] || 3 }).toISODate()) }},
  "priority": {{ JSON.stringify(({ High: "Urgent", Normal: "Normal", Low: "Low" })[$('Sort and pull out').item.json.output.urgency] || "Normal") }},
  "status": "Open",
  "associated_to": {{ JSON.stringify($json.output.policy_number ? "Policy" : "Account") }},
  "lookup_code": {{ JSON.stringify($json.output.lookup_code) }},
  "policy_number": {{ JSON.stringify($json.output.policy_number) }},
  "note": {{ JSON.stringify($json.output.note) }},
  "review_flag": {{ JSON.stringify([ $('Sort and pull out').item.json.output.cant_tell_policy ? "the email didn't say which policy" : "", $('Sort and pull out').item.json.output.confidence === "low" ? "the AI's confidence is low" : "", $('Sort and pull out').item.json.output.category === "other" ? "not one of the four request types" : "" ].filter(x => x).join("; ")) }},
  "email": {
    "message_id": {{ JSON.stringify($('Incoming email (No Operation)').item.json.id) }},
    "from_name": {{ JSON.stringify($('Incoming email (No Operation)').item.json.from.value[0].name || "") }},
    "from_address": {{ JSON.stringify($('Incoming email (No Operation)').item.json.from.value[0].address) }},
    "subject": {{ JSON.stringify($('Incoming email (No Operation)').item.json.subject || "") }},
    "date": {{ JSON.stringify($('Incoming email (No Operation)').item.json.date) }},
    "text": {{ JSON.stringify(String($('Incoming email (No Operation)').item.json.text || "").trim()) }}
  },
  "ai_read": {
    "category": {{ JSON.stringify($('Sort and pull out').item.json.output.category) }},
    "urgency": {{ JSON.stringify($('Sort and pull out').item.json.output.urgency) }},
    "confidence": {{ JSON.stringify($('Sort and pull out').item.json.output.confidence) }},
    "reason": {{ JSON.stringify($('Sort and pull out').item.json.output.reason) }},
    "cant_tell_policy": {{ JSON.stringify($('Sort and pull out').item.json.output.cant_tell_policy) }}
  }
}
```
