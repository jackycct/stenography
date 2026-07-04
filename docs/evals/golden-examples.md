# Golden Examples

## Example: Issue Context Pack

### Verbose Input

```text
Issue: Add validation for generated context packs.

The repository needs a repeatable way to check that a generated context pack includes
the required metadata fields. The implementation should not call Codebrain directly.
It should treat Codebrain analysis as an optional JSON input file and preserve the
boundary where Codebrain owns repo understanding. The user should be able to run one
command locally to validate the pack before handing it to an agent workflow.

Acceptance criteria:
- Generated metadata includes task_id, source_inputs, budget_tokens, estimated_tokens,
  included_sections, and outputs.
- Validation fails when required fields are missing.
- README documents the validation command.
```

### Compressed Pack

```markdown
# Stenography Context Pack: issue-123

## Issue Summary
- Add repeatable validation for generated context-pack metadata.
- Preserve boundary: Codebrain analysis = optional opaque JSON input.
- CLI must validate packs locally before agent workflow handoff.

## Relevant Files
- bin/stenography.js
- schemas/context-pack.schema.json
- docs/context-pack-contract.md
- README.md

## Risk Notes
- Do not import Codebrain internals.
- Do not drop required metadata fields.

## Execution Guidance
- Run `node bin/stenography.js validate-pack examples/context-pack.example.json`.
- Run `npm test`.
```

### Metadata JSON

```json
{
  "task_id": "issue-123",
  "source_inputs": {
    "issue": "issue-123.md",
    "repo_wiki": ".codebrain/repo-wiki/index.md",
    "codebrain_relevant_files": ".codebrain/analysis/issue-123.json"
  },
  "budget_tokens": 30000,
  "estimated_tokens": 21400,
  "included_sections": [
    "issue_summary",
    "repo_map",
    "relevant_files",
    "symbols",
    "affected_tests",
    "risk_notes",
    "execution_guidance"
  ],
  "outputs": {
    "markdown": ".stenography/packs/issue-123.pack.md",
    "json": ".stenography/packs/issue-123.pack.json"
  }
}
```

### Expected Validation

```bash
node bin/stenography.js validate-pack examples/context-pack.example.json
```

Expected output:

```text
valid examples/context-pack.example.json
```

## Review Checks

- verbose input acceptance criteria are preserved
- compressed pack keeps exact commands and paths
- metadata JSON matches [schemas/context-pack.schema.json](../../schemas/context-pack.schema.json)
- no measured token-saving claim appears without AgentLens artifact
