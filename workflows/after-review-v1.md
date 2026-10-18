# After the broker's review: v1

Claude-built. What happens to each email after the broker submits the review form, inside the loop. Replaces the **Replace Me** placeholder n8n added with the loop.

```
Send draft to broker for review (Gmail Send and Wait)
  → Build activity row (Edit Fields)          broker's answers → the 12 activities columns
  → Write activity to Epic (Data Table)        insert into activities
  → Build audit row (Edit Fields)              AI draft vs broker's answers, what changed
  → Log the email (Data Table)                 insert into audit_log
  → Did the broker change anything? (If)
       true  → Build correction row (Edit Fields) → Save the correction (Data Table) → back to the loop
       false → back to the loop
```

Each **Build** node is Edit Fields, Mode **JSON**, with **Include Other Input Fields** off, so it outputs exactly the table's columns. Each **Data Table** node is Insert, with **Map Automatically**, which sends every field of the item as a column.

Send and Wait passes on only the form answers (`$json.data`), so these blocks reach back by name to `Review one email at a time (Loop Over Items)` for the email and the AI's draft. In run 1609, n8n linked the form's answer to the email it came from, so the reach-back works.

A Data Table insert outputs the row it wrote, with its new `id`. That's how the audit row records which activity it wrote, and how the If and the correction row read the audit row as `$json`.

**Changed** means a box's submitted value differs from the AI's draft, after both are tidied: Windows line breaks (`\r\n`, which browsers send from multi-line boxes) become plain ones, and spaces at either end are dropped.

## Build activity row (Edit Fields)

**Expression** mode in the **JSON** box.

```
{
  "code": {{ JSON.stringify($json.data.Code) }},
  "description": {{ JSON.stringify($json.data.Description) }},
  "who_owner": {{ JSON.stringify($('Review one email at a time (Loop Over Items)').item.json.who_owner) }},
  "follow_up_start": {{ JSON.stringify($json.data['Follow up/Start']) }},
  "priority": {{ JSON.stringify($json.data.Priority) }},
  "status": {{ JSON.stringify($('Review one email at a time (Loop Over Items)').item.json.status) }},
  "associated_to": {{ JSON.stringify($json.data['Policy Number'] ? "Policy" : "Account") }},
  "lookup_code": {{ JSON.stringify($json.data['Lookup Code'] || null) }},
  "policy_number": {{ JSON.stringify($json.data['Policy Number'] || null) }},
  "entered_on": {{ JSON.stringify($json.data.respondedAt) }},
  "entered_by": {{ JSON.stringify($json.data['Approved by']) }},
  "note": {{ JSON.stringify(String($json.data.Note).replace(/\r\n/g, '\n').trim()) }}
}
```

## Build audit row (Edit Fields)

**Expression** mode in the **JSON** box. `$json` here is the activities row just written.

```
{{ (() => {
  const loop = $('Review one email at a time (Loop Over Items)').item.json;
  const form = $('Send draft to broker for review (Gmail Send and Wait)').item.json.data;
  const tidy = v => String(v ?? '').replace(/\r\n/g, '\n').trim();
  const out = loop.output;
  const aiDraft = {
    'Description': loop.description,
    'Code': loop.code,
    'Priority': loop.priority,
    'Follow up/Start': loop.follow_up_start,
    'Lookup Code': loop.lookup_code,
    'Policy Number': loop.policy_number,
    'Note': loop.note,
    'Follow-up email': out.follow_up_needed ? 'To: ' + (out.follow_up_recipient === 'client' ? 'the client' : 'the sender') + '\nSubject: ' + out.follow_up_subject + '\n\n' + out.follow_up_body : ''
  };
  const ai = {}, broker = {};
  for (const k of Object.keys(aiDraft)) { ai[k] = tidy(aiDraft[k]); broker[k] = tidy(form[k]); }
  const changed = Object.keys(ai).filter(k => ai[k] !== broker[k]);
  return JSON.stringify({
    message_id: loop.email.message_id,
    received_at: loop.email.date,
    sender: loop.email.from_name + ' <' + loop.email.from_address + '>',
    subject: loop.email.subject,
    category: loop.ai_read.category,
    urgency: loop.ai_read.urgency,
    confidence: loop.ai_read.confidence,
    review_flag: loop.review_flag,
    pulled_out: JSON.stringify($('Sort and pull out').item.json.output),
    ai_draft: JSON.stringify(ai),
    broker_final: JSON.stringify(broker),
    fields_changed: changed.join(', '),
    approved_by: tidy(form['Approved by']),
    approved_at: form.respondedAt,
    activity_id: $json.id,
    execution_id: Number($execution.id)
  });
})() }}
```

## Did the broker change anything? (If)

One condition: `{{ $json.fields_changed }}`, type **String**, **is not empty**. `$json` is the audit row just written.

## Build correction row (Edit Fields)

**Expression** mode in the **JSON** box. `$json` is the audit row just written. Only the changed boxes go in `ai_values` and `broker_values`, so the feedback loop can show the AI each fix on its own.

```
{{ (() => {
  const loop = $('Review one email at a time (Loop Over Items)').item.json;
  const keys = $json.fields_changed.split(', ');
  const ai = JSON.parse($json.ai_draft), broker = JSON.parse($json.broker_final);
  return JSON.stringify({
    message_id: $json.message_id,
    email_subject: loop.email.subject,
    email_text: loop.email.text,
    fields_changed: $json.fields_changed,
    ai_values: JSON.stringify(Object.fromEntries(keys.map(k => [k, ai[k]]))),
    broker_values: JSON.stringify(Object.fromEntries(keys.map(k => [k, broker[k]]))),
    corrected_by: $json.approved_by,
    corrected_at: $json.approved_at,
    audit_id: $json.id,
    execution_id: $json.execution_id
  });
})() }}
```
