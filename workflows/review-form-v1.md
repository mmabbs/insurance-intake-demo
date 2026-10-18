# Send draft to broker for review: v1

Claude-built. Settings for the Gmail node **Send message and wait for response**, which sits on the **loop** output of `Review one email at a time (Loop Over Items)`. Each pass of the loop sends one review email to the shared inbox and pauses the run until the broker submits the form. Every box on the form comes filled in with the draft (each field's `defaultValue`), so the broker only changes what's wrong.

The node builds a form for the first item it receives only (checked in n8n 2.43.4's Gmail node code), which is why the loop sends one email at a time.

After submit, the node passes on only the form answers, as `data`, named by each box's label (`$json.data['Policy Number']`), plus `data.respondedAt`. Multi-line boxes come back with Windows line breaks (`\r\n`), so any "did the broker change it" check must ignore line-break style.

Every box below reads `$json`, the item the loop handed in: one row from `Set activity fields` v2.

## To

```
callanderreid.service@gmail.com
```

## Subject

**Expression** mode.

```
{{ $json.review_flag ? '⚠ Check closely: ' : '' }}Review {{ $json.code }} for {{ $json.email.from_name }}: {{ $json.email.subject }}
```

## Message

**Expression** mode.

```
{{ $json.review_flag ? '⚠ Needs a closer look: ' + $json.review_flag + '.\n\n' : '' }}Nothing goes into Epic until you approve this draft. Open the form, fix anything that's wrong, and submit.

THE EMAIL
From: {{ $json.email.from_name }} <{{ $json.email.from_address }}>
Sent: {{ DateTime.fromISO($json.email.date).setZone('America/Toronto').toFormat('ccc d LLL yyyy, h:mm a') }}
Subject: {{ $json.email.subject }}

{{ $json.email.text.slice(0, 2500) }}

HOW THE AI READ IT
Category: {{ $json.ai_read.category }}
Urgency: {{ $json.ai_read.urgency }}
Confidence: {{ $json.ai_read.confidence }} (the AI's own estimate, not a measured score)
Reason: {{ $json.ai_read.reason }}
```

## Form Fields

Set **Response Type** to **Custom Form** and **Define Form** to **Using JSON**. **Expression** mode.

```
[
  { "fieldLabel": "Description", "fieldType": "text", "requiredField": true, "defaultValue": {{ JSON.stringify($json.description) }} },
  { "fieldLabel": "Code", "fieldType": "dropdown", "requiredField": true, "fieldOptions": { "values": [ { "option": "CHGR" }, { "option": "RENL" }, { "option": "FNOL" }, { "option": "UNDR" }, { "option": "MISC" } ] }, "defaultValue": {{ JSON.stringify($json.code) }} },
  { "fieldLabel": "Priority", "fieldType": "dropdown", "requiredField": true, "fieldOptions": { "values": [ { "option": "Urgent" }, { "option": "Normal" }, { "option": "Low" } ] }, "defaultValue": {{ JSON.stringify($json.priority) }} },
  { "fieldLabel": "Follow up/Start", "fieldType": "date", "requiredField": true, "defaultValue": {{ JSON.stringify($json.follow_up_start) }} },
  { "fieldLabel": "Lookup Code", "fieldType": "text", "defaultValue": {{ JSON.stringify($json.lookup_code || "") }} },
  { "fieldLabel": "Policy Number", "fieldType": "text", "defaultValue": {{ JSON.stringify($json.policy_number || "") }} },
  { "fieldLabel": "Note", "fieldType": "textarea", "requiredField": true, "defaultValue": {{ JSON.stringify($json.note) }} },
  { "fieldLabel": "Follow-up email", "fieldType": "textarea", "placeholder": "No follow-up email needed", "defaultValue": {{ JSON.stringify($json.output.follow_up_needed ? 'To: ' + ($json.output.follow_up_recipient === 'client' ? 'the client' : 'the sender') + '\nSubject: ' + $json.output.follow_up_subject + '\n\n' + $json.output.follow_up_body : '') }} },
  { "fieldLabel": "Approved by", "fieldType": "text", "requiredField": true, "defaultValue": "Sandra Pellegrino" }
]
```

## Options

| Option | Value |
| --- | --- |
| Message Button Label | `Review the draft` |
| Response Form Title | `Draft activity for {{ $json.email.from_name }}` (Expression mode) |
| Response Form Description | the block below (Expression mode) |
| Response Form Button Label | `Approve and file in Epic` |
| Append n8n Attribution | off |

Response Form Description:

```
{{ $json.review_flag ? '⚠ ' + $json.review_flag + '. ' : '' }}The AI read this as {{ $json.ai_read.category }}, {{ $json.ai_read.urgency }} urgency, {{ $json.ai_read.confidence }} confidence. {{ $json.ai_read.reason }}
```
