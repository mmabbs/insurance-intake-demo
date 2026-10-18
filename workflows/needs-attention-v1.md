# Needs attention: v1

Claude-built. A separate workflow, `Needs attention`, that n8n starts whenever the intake workflow fails. It writes one row per failure to the `needs_attention` Data Table, so a failure shows up in a list instead of only in n8n's Executions view.

```
Catch a failed run (Error Trigger)
  → Build needs-attention row (Edit Fields)     the failure → the table's 7 columns
  → Add to needs attention (Data Table)         insert into needs_attention
```

**It only catches published runs.** n8n skips the error workflow for any run started with the **Execute workflow** button (checked in n8n 2.43.4's code: `dispatchesErrorWorkflow = !isManualMode`, in `execution-lifecycle-hooks.ts`). So it catches the live demo's Gmail Trigger runs, and never the scored runs. The test below uses a small published workflow that fails on purpose.

**What it records:** which workflow failed, the last step that ran (the step that failed), the error message, n8n's run number, a link to the run in n8n, and how the run started (`trigger` for the Gmail Trigger, `webhook` for the test). It doesn't record which email was being handled: n8n's error data carries no item data.

**A failed run stops.** If one email fails in a run that holds several, the emails after it in the loop aren't reviewed. The live demo's Gmail Trigger usually brings one email per run.

## The table

Import `test-data/needs-attention-import.csv`, named `needs_attention`. It has one sample row so n8n picks the right column types: `failed_at` as a date, `execution_id` as a number, the rest as text. Delete the sample row after import.

## Build needs-attention row (Edit Fields)

Mode **JSON**, **Include Other Input Fields** off. **Expression** mode in the **JSON** box.

When the trigger itself fails (for example, Gmail login expired), n8n sends the error under `trigger` instead of `execution`, with no run number or link. The block handles both.

```
{{ (() => {
  const ex = $json.execution || {};
  const err = ex.error || ($json.trigger || {}).error || {};
  return JSON.stringify({
    failed_at: $now.toISO(),
    workflow: ($json.workflow || {}).name || 'unknown',
    failed_step: ex.lastNodeExecuted || 'Trigger',
    error: String(err.message || 'No error message').slice(0, 500),
    execution_id: ex.id ? Number(ex.id) : null,
    run_link: ex.url || null,
    started_by: ex.mode || 'trigger'
  });
})() }}
```

## Add to needs attention (Data Table)

Operation **Insert**, table `needs_attention`, **Map Automatically**.

## Wiring and testing

**Publish `Needs attention` first.** n8n's docs say an Error Trigger workflow doesn't need publishing, but n8n 2.43.4's Settings dropdown greys out every unpublished workflow (`:disabled="item.active === false"` in `WorkflowSettings.vue`). The Error Trigger counts as a publishable trigger; only the manual triggers don't.

1. In the intake workflow's **Settings**, set **Error Workflow** to `Needs attention`.
2. Test with a throwaway workflow, `Test failure`: a **Webhook** node (GET) → a **Stop and Error** node with the message `Test failure: needs attention check`. In its **Settings** (the **⋯** beside the workflow name, top left), set **Error Workflow** to `Needs attention` and click **Save**. Publish it and call its Production URL. Never use **Execute** for this test: a button-started run skips the error workflow. Then unpublish it.
3. Expected: the Production URL answers `{"message":"Workflow was started"}` (the Webhook replies before the error happens). `Test failure` shows a red Error run, `Needs attention` a green Success run, and `needs_attention` gets one row with `failed_step` `Stop and Error`, the test message, the run number and link, and `started_by` `webhook`.

**Tested 2026-10-18:** run 2576 (`Test failure`) → run 2577 (`Needs attention`) → row 1, every column as expected.
