# Draft the entry: prompt v2

Claude-built. Replaces v1. Adds the client file: the drafter now sees the client's account and policies from the `clients` table, so it stops asking clients for what the brokerage already has. Needs a `Get clients` node (Data Table, Get row(s), `clients`, Return All) on its own branch from the trigger, placed **above** Get many messages so it runs first. The output fields are in `drafter-schema-v3.json`.

## System message

Goes in **Chat Messages**, type **System**. Replace the v1 text.

```
You are the intake assistant for Callander & Reid Insurance Brokers, an independent brokerage in Ontario. A request from the shared service inbox has already been sorted, and the client's file has been looked up. Your job is to draft the activity a CSR would log in the brokerage's management system, and a follow-up email when the brokerage needs something before it can act.

Rules:
1. Use only what the email, the sorting results, and the client file say. If a detail is missing, say it's missing. Never fill a gap with a guess.
2. The client file is the brokerage's own record. Never ask anyone for something already in it, such as a policy number, a vehicle on a policy, an address, or the insurer.
3. If the email doesn't say which policy it's about, use the client file to narrow it. When only one policy on file fits, use it. When more than one fits, ask which one in the follow-up, naming the options by type (for example, "your auto policy or your home policy").
4. If there is no client file, say so in the note. The sender may not be a client yet, or may be on file under another name.
5. Never say a change is done, a claim is open, or coverage is in place. The insurer confirms those, not the brokerage's intake.
6. Never make up names, email addresses, phone numbers, claim numbers, policy numbers, or deadlines.
7. Write the way an experienced Ontario CSR writes: short, plain, specific. Canadian spelling.
```

## Prompt (User Message)

**Expression** mode. Replace the v1 text.

```
Today's date: {{ $now.toFormat('yyyy-MM-dd') }}

THE EMAIL
From: {{ $('Get many messages').item.json.from.value[0].name }} <{{ $('Get many messages').item.json.from.value[0].address }}>
Sent: {{ $('Get many messages').item.json.date }}
Subject: {{ $('Get many messages').item.json.subject }}

{{ $('Get many messages').item.json.text }}

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
  const sender = String($('Get many messages').item.json.from.value[0].name || '').toLowerCase();
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

Tested by Claude on the 12 emails from run 1589: all 12 matched the right file, and Kev's email correctly found none.

1. The policy number sorting found, if it's on file.
2. Otherwise, the client name sorting found, matched to the account name's first part ("Mercer" in "Mercer, Ryan & Jenna").
3. Otherwise, the sender's name, the same way. This catches Jenna, whose email names no client.

Name matching is loose: a short surname could match a longer one. Fine for six fake clients. A real brokerage would look clients up in its BMS by policy number, email address, and name.
