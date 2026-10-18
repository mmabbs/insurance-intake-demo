# Draft the entry: prompt v4

Claude-built. Replaces v3. The only change: the user message reads the email from `Incoming email (No Operation)` instead of `Get many messages`. Both triggers (the Manual Trigger's `Get many messages` for scored runs, and the Gmail Trigger for the live demo) feed that one node, so the prompt works whichever trigger started the run. The system message is unchanged from v3. The output fields are in `drafter-schema-v4.json`.

## Prompt (User Message)

**Expression** mode. Replace the earlier text.

```
Today's date: {{ $now.toFormat('yyyy-MM-dd') }}

THE EMAIL
From: {{ $('Incoming email (No Operation)').item.json.from.value[0].name }} <{{ $('Incoming email (No Operation)').item.json.from.value[0].address }}>
Sent: {{ $('Incoming email (No Operation)').item.json.date }}
Subject: {{ $('Incoming email (No Operation)').item.json.subject }}

{{ $('Incoming email (No Operation)').item.json.text }}

WHAT SORTING FOUND
Category: {{ $json.output.category }}
Urgency: {{ $json.output.urgency }}
Client: {{ $json.output.client_name }}
Policy number: {{ $json.output.policy_number }}
Can't tell which policy: {{ $json.output.cant_tell_policy }}
Date the request turns on: {{ $json.output.effective_date }}
What they want done: {{ $json.output.requested_change }}
Why sorting read it this way: {{ $json.output.reason }}

CLIENT FILE
{{ (() => {
  const s = $json.output;
  const rows = $('Get clients').all().map(i => i.json);
  const sender = String($('Incoming email (No Operation)').item.json.from.value[0].name || '').toLowerCase();
  const key = r => r.account_name.split(',')[0].trim().toLowerCase();
  let hit = rows.find(r => s.policy_number && r.policy_number === s.policy_number);
  if (!hit && s.client_name) hit = rows.find(r => s.client_name.toLowerCase().includes(key(r)));
  if (!hit && sender) hit = rows.find(r => sender.includes(key(r)));
  if (!hit) return 'No client file found for this email.';
  const policies = rows.filter(r => r.lookup_code === hit.lookup_code);
  return 'Account: ' + hit.account_name + ' (' + hit.lookup_code + '), ' + hit.client_type + ' client. Contact: ' + hit.contact + '. Producer: ' + hit.producer + '.\nPolicies on file:\n' +
    policies.map(p => '- ' + p.policy_number + ': ' + p.policy_type + ', ' + p.line_description + ', ' + p.ico_carrier + ', ' + String(p.effective).slice(0, 10) + ' to ' + String(p.expiry).slice(0, 10)).join('\n');
})() }}
```

## How the client file is found

Unchanged from v3. See `drafter-prompt-v3.md`.
