---
name: stenography-context-pack
description: Generate compact Markdown and JSON context packs from task files, repo summaries, and optional Codebrain analysis outputs.
---

# Stenography Context Pack

Use for coding-agent tasks that need compact, task-specific context.

## Workflow

1. Identify task file.
2. Use Codebrain analysis JSON when available; treat it as opaque input.
3. Run:

```bash
stenography pack --repo . --task issue-123.md --budget 30000 --codebrain-analysis .codebrain/analysis/issue-123.json --output .stenography/packs/issue-123.pack.md
```

4. Validate:

```bash
stenography validate-pack .stenography/packs/issue-123.pack.json
```

## Boundaries

- Do not implement Codebrain repo understanding here.
- Do not run agent-lens report calculations here.
- Do not orchestrate Avionics workflows here.
