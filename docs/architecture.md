# Architecture

## Purpose

Stenography is a deterministic context-pack generator for coding agents under token budget.

It accepts task and repo context, applies stable packing rules, and emits:

- agent-facing Markdown context packs
- machine-readable JSON metadata
- repo summaries for downstream workflows

## Components

| Component | Owner | Responsibility |
| --- | --- | --- |
| CLI | `bin/stenography.js` | pack generation, repo summary, pack validation |
| Schema | `schemas/context-pack.schema.json` | metadata contract for generated packs |
| Contract docs | `docs/context-pack-contract.md` | human-readable schema and CLI contract |
| APM assets | `.apm/` | packageable agent instructions and skills |
| Examples | `examples/` and `docs/evals/golden-examples.md` | stable validation fixtures |

## Boundaries

### Workflow Orchestration

Workflow orchestration includes issue routing, feature flags, agent run policy, experiment rollout, and cross-tool coordination.

Stenography exposes CLI commands that external orchestrators may call, but it must not own orchestration state or run scheduling.

### Repo Understanding

Repo-understanding engines own relevant file discovery, symbol search, impact analysis, repo wiki generation, and dependency reasoning.

Stenography may consume analysis outputs as opaque JSON files, but it must not import producer internals or reimplement repo intelligence.

### AgentLens

AgentLens owns telemetry, eval execution, A/B evidence, reporting, and cost/success dashboards.

Stenography may define what should be measured and include metadata needed by AgentLens. Measured performance claims require AgentLens artifacts.

## Data Flow

```text
task brief + repo files + optional analysis JSON
  -> stenography pack
  -> Markdown pack + JSON metadata
  -> external workflow / agent prompt / AgentLens eval
```

## Determinism

Pack output should remain stable for identical inputs and CLI options.

Allowed deterministic inputs:

- task file content
- repo file tree and selected text files
- analysis JSON
- explicit CLI budget and output paths

Avoid hidden inputs such as wall-clock time, network data, model output, or local editor state.

## Validation

Primary command:

```bash
npm test
```

Contract command:

```bash
node bin/stenography.js validate-pack examples/context-pack.example.json
```
