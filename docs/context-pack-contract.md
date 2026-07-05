# Context-Pack Contract

Stenography emits compact Markdown for agents and JSON metadata for workflow tools.

## JSON Schema

Schema: [../schemas/context-pack.schema.json](../schemas/context-pack.schema.json)

Required fields:

- `task_id`: stable task key, e.g. `issue-123`
- `source_inputs.issue`: task or issue file consumed by the pack
- `source_inputs.repo`: repo root used for summary generation
- `source_inputs.analysis`: opaque optional analysis JSON path, or `null`
- `budget_tokens`: requested token budget
- `estimated_tokens`: deterministic local estimate (`ceil(chars / 4)`)
- `included_sections`: ordered context sections included in Markdown
- `outputs.markdown`: generated agent-facing pack
- `outputs.json`: generated machine contract

## Standalone Boundary

Stenography owns deterministic context-pack generation only.

It may consume optional analysis JSON as an opaque file, but it must not depend on the producer. Workflow orchestration and repo-understanding engines stay outside this repo.

AgentLens may consume pack metadata and task outcomes to prove token savings and quality improvements.

## CLI

```bash
stenography pack \
  --repo . \
  --task issue-123.md \
  --budget 30000 \
  --analysis analysis/issue-123.json \
  --output .stenography/packs/issue-123.pack.md

stenography summarize-repo --repo . --output .stenography/repo-summary.md
stenography validate-pack .stenography/packs/issue-123.pack.json
```

## AgentLens Metrics

AgentLens should measure:

- total tokens
- tool-result tokens
- elapsed time
- search/tool call count
- missing-context failures
- eval pass rate when tests exist
- cost per successful run
