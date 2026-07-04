# Context-Pack Contract

Stenography emits compact Markdown for agents and JSON metadata for workflow tools.

## JSON Schema

Schema: [../schemas/context-pack.schema.json](../schemas/context-pack.schema.json)

Required fields:

- `task_id`: stable task key, e.g. `issue-123`
- `source_inputs.issue`: task or issue file consumed by the pack
- `source_inputs.repo_wiki`: expected Codebrain repo wiki path
- `source_inputs.codebrain_relevant_files`: opaque Codebrain analysis JSON path, or `null`
- `budget_tokens`: requested token budget
- `estimated_tokens`: deterministic local estimate (`ceil(chars / 4)`)
- `included_sections`: ordered context sections included in Markdown
- `outputs.markdown`: generated agent-facing pack
- `outputs.json`: generated machine contract

## Standalone Boundary

Stenography consumes Codebrain outputs as files and does not import Codebrain internals.
Avionics owns workflow toggles/orchestration.
agent-lens owns measurement and A/B reports.

## CLI

```bash
stenography pack \
  --repo . \
  --task issue-123.md \
  --budget 30000 \
  --codebrain-analysis .codebrain/analysis/issue-123.json \
  --output .stenography/packs/issue-123.pack.md

stenography summarize-repo --repo . --output .stenography/repo-summary.md
stenography validate-pack .stenography/packs/issue-123.pack.json
```

## Avionics Toggles

```yaml
features:
  stenography_context_pack:
    enabled: true
  stenography_repo_summary:
    enabled: true
```

Experiment variant:

```yaml
baseline:
  features:
    stenography_context_pack: false

variants:
  - name: stenography_enabled
    features:
      stenography_context_pack: true
```

## agent-lens Metrics

agent-lens should measure:

- total tokens
- tool-result tokens
- elapsed time
- search/tool call count
- missing-context failures
- eval pass rate when tests exist
- cost per successful run
