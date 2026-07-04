---
name: stenography-repo-summary
description: Generate a deterministic compact repository summary for context-pack inputs.
---

# Stenography Repo Summary

Use when a task needs a compact repo map without Codebrain internals.

## Workflow

Run:

```bash
stenography summarize-repo --repo . --output .stenography/repo-summary.md
```

Use the output as one input to context-pack generation or agent prompt construction.
