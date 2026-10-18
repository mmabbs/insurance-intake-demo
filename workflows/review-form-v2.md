# Send draft to broker for review: v2

Claude-built. Replaces the **Subject** in `review-form-v1.md`. Everything else in v1 stays as it is.

Why: Gmail groups emails with the same subject into one conversation. Every re-run sent the same 12 subjects, so a new review email hid inside an old conversation. The subject now ends with the run number (`$execution.id`, n8n's ID for the current run). Each run's subjects are new, and the number matches the `execution_id` column in `audit_log` and the run in n8n's **Executions** list. To a broker it reads as a reference number.

## Subject

**Expression** mode. Replace the earlier text.

```
{{ $json.review_flag ? '⚠ Check closely: ' : '' }}Review {{ $json.code }} for {{ $json.email.from_name }}: {{ $json.email.subject }} (Ref {{ $execution.id }})
```
