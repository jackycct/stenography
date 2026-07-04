# Context-Packing Design

## Goal

Generate compact, deterministic context packs that help coding agents act with enough context while staying inside a token budget.

## Inputs

- task brief or issue text
- repo summary from local files
- optional Codebrain analysis JSON
- token budget
- output path

## Outputs

- Markdown pack for agent consumption
- JSON metadata for workflow tools

## Modes

### Lossless Mode

Lossless packing preserves source facts without semantic removal.

Use for:

- public API contracts
- exact CLI commands
- schema fields
- file paths and symbol names
- risk notes and acceptance criteria

Expected transforms:

- reorder sections by task relevance
- deduplicate repeated facts
- replace prose wrappers with structured headings
- keep exact paths, commands, and identifiers

### Lossy Mode

Lossy packing compresses wording while preserving task utility.

Use for:

- explanatory prose
- background context
- repeated rationale
- non-normative examples

Allowed transforms:

- summarize long prose
- collapse equivalent bullets
- replace low-value narrative with key-value notes
- omit context that is not needed for the task

Disallowed transforms:

- changing requirements
- dropping acceptance criteria
- inventing performance results
- rewriting commands into untested variants
- merging distinct architecture boundaries

## Section Order

Default pack sections:

1. `issue_summary`
2. `repo_map`
3. `relevant_files`
4. `symbols`
5. `affected_tests`
6. `risk_notes`
7. `execution_guidance`

## Budget Policy

When estimated tokens exceed budget:

1. Preserve task requirements and validation commands.
2. Preserve exact file paths and public contracts.
3. Compress rationale and background first.
4. Prefer references to durable docs over copied text.
5. Drop lowest-relevance repo map entries last.

## Failure Modes

- missing acceptance criteria -> agent implements the wrong surface
- missing file path -> agent repeats discovery work
- stale performance claim -> repo overstates measured value
- nondeterministic input -> pack cannot be diffed or reproduced

## Validation

Use golden examples to compare:

- source input facts
- compressed pack content
- metadata JSON fields
- expected validation command
