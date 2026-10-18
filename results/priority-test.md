# Pink-Slip Priority Test (Story Step 4)

Claude-built, demo use only. Counts how often "Sort and pull out" gives a pink-slip email Low urgency (Low Priority in Epic) instead of Normal, before and after the broker's saved corrections are fed in as examples. Task note section 02, item 18.

**Setup:** the `Test pink-slip priority` workflow (`workflows/test-pink-slip-priority.json`): a Code node with 10 copies each of E07 and E13 (`test-data/test-emails.md`), feeding a copy of "Sort and pull out" on Haiku 5.5, same schema as the intake workflow. Run from n8n's command line (`n8n execute`), counted with `count_priority.py`. The answer key says Normal for both. E13 is never one of the examples.

## Before: No Examples (2026-10-18)

n8n's default system prompt, as in the intake workflow.

| Run | E07 Low | E07 Normal | E07 failed | E13 Low | E13 Normal | E13 failed | Tokens in | Tokens out |
|---|---|---|---|---|---|---|---|---|
| 1 | 8 | 2 | 0 | 2 | 8 | 0 | 31,110 | 14,491 |
| 2 | stopped: one answer didn't fit the format (item 14, an E13 copy) | | | | | | | |
| 3 | 4 | 6 | 0 | 3 | 7 | 0 | 31,110 | 14,504 |
| 4 | stopped: one answer didn't fit the format (item 6, an E07 copy) | | | | | | | |
| 5 | 6 | 4 | 0 | 1 | 9 | 0 | 31,110 | 14,224 |
| 6 | 3 | 7 | 0 | 2 | 8 | 0 | 31,110 | 13,910 |
| 7 | 6 | 3 | 1 | 5 | 5 | 0 | 33,165 | 14,513 |
| 8 | 5 | 5 | 0 | 1 | 9 | 0 | 31,110 | 14,085 |
| **Total (6 runs)** | **32** | **27** | **1** | **14** | **46** | **0** | | |

Runs 1–6 stopped at the first bad answer. From run 7 on, the test copy of the extractor continues past a bad answer and counts it as failed (Settings → On Error → Continue). The model's text isn't kept in the command line's output, so what the bad answers looked like is not known.

## After: With Correction Examples (2026-10-18)

System prompt: n8n's default, plus the broker's corrections from `corrections`, built by the expression in `workflows/feedback-prompt-v1.txt`. Of the 3 saved rows, the expression kept the two Priority fixes on E07 (Low → Normal), dropped the duplicate, and skipped the Note-only fix, so the prompt held one example: E07, "you said Low, the broker changed it to Normal."

n8n's command line can't run Data Table nodes (its `execute` command never starts the Data Tables module), so these runs fed the same 3 rows through a Code node in a throwaway copy, `Scratch - feedback check (Claude)`. The system prompt the model received is identical either way; the run data shows it word for word.

| Run | E07 Low | E07 Normal | E07 failed | E13 Low | E13 Normal | E13 failed | Tokens in | Tokens out |
|---|---|---|---|---|---|---|---|---|
| 1 | 0 | 10 | 0 | 0 | 10 | 0 | 34,230 | 11,660 |
| 2 | 0 | 10 | 0 | 0 | 10 | 0 | 34,230 | 12,166 |
| 3 | 0 | 10 | 0 | 0 | 10 | 0 | 34,230 | 11,528 |
| 4 | 0 | 10 | 0 | 0 | 10 | 0 | 34,230 | 11,921 |
| 5 | 0 | 10 | 0 | 0 | 10 | 0 | 34,230 | 12,474 |
| 6 | 0 | 10 | 0 | 0 | 10 | 0 | 34,230 | 12,377 |
| **Total (6 runs)** | **0** | **60** | **0** | **0** | **60** | **0** | | |

## Side-Effect Check: The 12 Scored Emails With the Example (2026-10-18)

The answer key has no Low emails, so an example that pushed everything toward Normal would show as E01, E05, or E09 dropping from High. Two runs of the 12 pinned emails through the same copy, with the example in the prompt:

| Run | Urgency right | Category right | E01 | E05 | E09 |
|---|---|---|---|---|---|
| 1 | 12/12 | 12/12 | High | High | High |
| 2 | 12/12 | 12/12 | High | High | High |

Only urgency and category were checked here. The full field score comes from Tuesday's final scored run.

## Summary

1. **E13, the new email:** Low 14 of 60 before, 0 of 60 after.
2. **E07, the corrected email:** Low 32 of 60 before, 0 of 60 after.
3. **Failed answers:** 3 before (2 stopped runs, 1 skipped answer), 0 of 120 after. Cause not known.
4. **Input tokens per extractor call:** about 1,556 before, about 1,712 after (+156 per email for the one example).
