# Draft the entry: auto-fix v1

Claude-built, at Moe's request (2026-10-18), and put into n8n through n8n's command line (`import:workflow`), not the editor.

**What changed:** on `Structured Output Parser` (the parser under `Draft the entry (Basic LLM Chain)`), **Auto-Fix Format** is on (`autoFix: true`). A new model node, `Fix draft format (Haiku 5.5)`, is a copy of `Draft activity and follow-up email (Haiku 5.5)` (same model, same Anthropic login), connected to the parser's **Model** slot.

**Why:** scored run 2657 stopped at `Draft the entry` with "Model output doesn't fit required format" ("Invalid JSON in model output"). Haiku's draft for Brenda's email (E06) was right in content but ended with one `}` too many. With Auto-Fix Format on, a draft that doesn't parse goes back to the model with the parser's error and comes back corrected, instead of stopping the run (checked in n8n 2.43.4's `OutputParserStructured.node.ts`).

**Why a separate model node:** `score_run.py` and the build log price tokens per model node by name, so any repair calls show up as their own cost line.

**Not yet seen working:** in run 2704 every draft parsed the first time, so `Fix draft format (Haiku 5.5)` never ran. If auto-fix can't repair a draft either, the run fails, and a published run lands in `needs_attention`.
