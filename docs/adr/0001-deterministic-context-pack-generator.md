# 0001 - Keep Stenography as a Deterministic Context-Pack Generator

## Status

Accepted

## Context

Stenography needs to support coding-agent workflows without absorbing responsibilities from adjacent tools.

External workflow tools own orchestration, external analysis tools own repo understanding, and AgentLens owns telemetry/eval reporting.

## Decision

Stenography will own deterministic context-pack generation under token budget.

It may consume external outputs as files and emit metadata for other tools, but it will not own workflow orchestration, repo intelligence, or telemetry reporting.

## Consequences

- Pack output can be diffed and reproduced for the same inputs.
- Architecture boundaries stay clear across orchestration, repo understanding, and AgentLens measurement.
- Performance claims require AgentLens artifacts before they are labelled as measured.
- New features should extend pack inputs, transforms, schema, or validation instead of broadening orchestration scope.
