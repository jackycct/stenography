---
name: compress-context
description: >
  Compress natural language files (e.g. instructions, READMEs, todo lists, preferences)
  to reduce token size while preserving all technical details.
  Trigger: /compress-context <filepath> or user asks to compress a context/memory file.
---

# Compress Context Skill

Use this skill to compress natural language files to save context tokens.

## Rules

When user runs `/compress-context <filepath>`:

1. **Verify File**:
   - Ensure the target file exists.
   - If not found, report error.

2. **Create Backup**:
   - Create a copy of the original file at `<filepath>.original.md`.
   - Do not overwrite an existing `.original.md` backup.

3. **Perform Compression**:
   - Compress the natural language text using the **Compression Guidelines** below.
   - Maintain 100% technical accuracy.

4. **Write Output**:
   - Overwrite the original file at `<filepath>` with the compressed version.

5. **Report Savings**:
   - Calculate characters/words before and after.
   - Print summary showing original size, compressed size, and percentage saved.

## Compression Guidelines

### Remove (Fluff)
- Articles: a, an, the
- Filler: just, really, basically, actually, simply, essentially, generally, clearly
- Pleasantries: "sure", "certainly", "of course", "happy to", "I'd recommend"
- Hedging: "it might be worth", "you could consider", "it would be good to"
- Redundant phrasing: "in order to" → "to", "make sure to" → "ensure", "the reason is because" → "because"
- Conjunctions/Connectives: "however", "furthermore", "additionally", "in addition"
- Structural padding: "This document describes...", "In this section we will..."

### Preserve EXACTLY
- Markdown headings and basic structure (bullets, lists)
- Code blocks (fenced ``` and inline `code`)
- URLs, links, and image markdown
- File paths and directory structures
- Exact commands (`npm run dev`, `python main.py`)
- Technical terms, function names, class names, API paths

### Abbreviate (Dense Style)
- Use standard shortcuts: `fn` (function), `impl` (implementation), `db` (database), `config` (configuration), `req/res` (request/response), `auth` (auth/authorization), `param/arg` (parameter/argument), `err` (error), `dev` (development), `pkg` (package), `doc` (documentation), `repo` (repository), `sys` (system), `app` (application), `env` (environment).
- Keep prose fragments instead of full sentences.

### Symbolic Logic & Namespace Mapping
- Map logical/sequential transitions to math/symbolic operators:
  - Conditional flow (if/then): `X -> Y` or `X => Y`
  - Negation/Difference: `!=`
  - Existence checks (exists / verify X): `∃ X`
  - Iteration (each / check all X): `∀ X`
  - Warnings/Critical nodes: `! [Warning]`
- Map descriptive statements to Key-Value Namespaces:
  - Prose: "The development environment settings are set to true."
  - Symbolic: `env.dev: true`
