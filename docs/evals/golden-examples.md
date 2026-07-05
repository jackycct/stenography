# Golden Examples

Golden examples define expected pack shape for benchmark tasks. They are not measured performance claims.

Each example includes:

- task shape
- expected token budget
- required included sections
- expected validation command
- context that must not be lost during compression

## Example 1: CLI Contract Validation

Track: SWE-bench-style issue fixing

Expected token budget: `30000`

Required included sections:

- `issue_summary`
- `repo_map`
- `relevant_files`
- `symbols`
- `affected_tests`
- `risk_notes`
- `execution_guidance`

### Verbose Input

```text
Issue: Add validation for generated context packs.

The repository needs a repeatable way to check that a generated context pack includes
the required metadata fields. The implementation should not call an analysis producer
directly. It should treat analysis as an optional JSON input file and preserve the
boundary where repo-understanding tools own discovery. The user should be able to run
one command locally to validate the pack before handing it to an agent workflow.

Acceptance criteria:
- Generated metadata includes task_id, source_inputs, budget_tokens, estimated_tokens,
  included_sections, and outputs.
- Validation fails when required fields are missing.
- README documents the validation command.
```

### Expected Pack Content

```markdown
# Stenography Context Pack: issue-123

## Issue Summary
- Add repeatable validation for generated context-pack metadata.
- Preserve boundary: analysis = optional opaque JSON input.
- CLI must validate packs locally before agent workflow handoff.

## Relevant Files
- bin/stenography.js
- schemas/context-pack.schema.json
- docs/context-pack-contract.md
- README.md

## Risk Notes
- Do not import analysis producer internals.
- Do not drop required metadata fields.

## Execution Guidance
- Run `node bin/stenography.js validate-pack examples/context-pack.example.json`.
- Run `npm test`.
```

### Expected Metadata

```json
{
  "task_id": "issue-123",
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
  ]
}
```

Must retain:

- required JSON metadata fields
- analysis producer boundary
- exact validation command

## Example 2: Workflow Feature Toggle Rollout

Track: workflow golden task

Expected token budget: `24000`

Required included sections:

- `issue_summary`
- `repo_map`
- `relevant_files`
- `symbols`
- `affected_tests`
- `risk_notes`
- `execution_guidance`

### Verbose Input

```text
Issue: Add a workflow feature flag that lets orchestrators opt into
Stenography-generated context packs without changing the default route.

Acceptance criteria:
- Default behavior remains disabled.
- A named feature flag enables pack generation.
- AgentLens can compare baseline and enabled variants.
- Stenography does not own orchestration state.
```

### Expected Pack Content

```markdown
## Issue Summary
- Add workflow opt-in flag for Stenography context packs.
- Default route remains unchanged.
- AgentLens must be able to compare baseline vs enabled runs.

## Relevant Files
- docs/context-pack-contract.md
- docs/architecture.md
- README.md

## Risk Notes
- External orchestrators own orchestration and rollout.
- Stenography may document integration expectations but must not own scheduling.

## Execution Guidance
- Update docs only unless implementation files exist in the target repo.
- Validate links and run repo smoke tests.
```

### Expected Metadata

```json
{
  "task_id": "workflow-feature-toggle-rollout",
  "budget_tokens": 24000,
  "estimated_tokens": 16000,
  "included_sections": [
    "issue_summary",
    "repo_map",
    "relevant_files",
    "symbols",
    "affected_tests",
    "risk_notes",
    "execution_guidance"
  ]
}
```

Must retain:

- disabled-by-default behavior
- baseline vs enabled comparison requirement
- orchestration ownership boundary

## Example 3: ProgramBench Behavior Reconstruction

Track: ProgramBench small task

Expected token budget: `18000`

Required included sections:

- `issue_summary`
- `repo_map`
- `relevant_files`
- `symbols`
- `affected_tests`
- `risk_notes`
- `execution_guidance`

### Verbose Input

```text
Issue: Reconstruct the behavior of a small CLI command from tests and docs.

The target repo is a compact command-line utility similar to gron, tokei, or csview.
The agent must infer expected behavior from fixtures, CLI help text, and existing
tests. The packed context should include public command flags, representative fixtures,
and the validation command, but it should avoid copying the full repository.

Acceptance criteria:
- Behavior matches existing fixtures.
- CLI help remains compatible.
- Existing tests pass.
```

### Expected Pack Content

```markdown
## Issue Summary
- Reconstruct small CLI behavior from docs, fixtures, and tests.
- Preserve public flags and fixture semantics.
- Avoid copying unrelated source files.

## Relevant Files
- README.md
- src/cli.*
- tests/fixtures/*
- tests/*

## Symbols
- public CLI entrypoint
- argument parser
- fixture loader

## Affected Tests
- existing CLI snapshot tests
- fixture round-trip tests

## Risk Notes
- Missing fixture semantics count as `missing_constraint`.
- Do not change documented flags unless issue requires it.

## Execution Guidance
- Run the repo's standard test command.
- Compare output against fixtures before judging success.
```

### Expected Metadata

```json
{
  "task_id": "programbench-cli-reconstruction",
  "budget_tokens": 18000,
  "estimated_tokens": 12000,
  "included_sections": [
    "issue_summary",
    "repo_map",
    "relevant_files",
    "symbols",
    "affected_tests",
    "risk_notes",
    "execution_guidance"
  ]
}
```

Must retain:

- public CLI flags
- representative fixtures
- validation/test command

## Review Checks

- expected sections match [context-pack schema](../../schemas/context-pack.schema.json) and CLI output
- each example has a token budget
- critical constraints are listed under "Must retain"
- no measured token-saving claim appears without an AgentLens artifact
- missing retained context maps to a failure reason in [token-savings-methodology.md](token-savings-methodology.md)
