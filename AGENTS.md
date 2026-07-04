# Stenography Agent Entrypoint

Repository-level entrypoint for Antigravity and Codex agents.

## Core References
- Style Guidelines: [communication-style.md](communication-style.md) (A/R/N pattern)
- Dense Standards: [dense-standards.md](dense-standards.md) (symbolic logic, abbreviations)
- Skill Configuration: [compress-context.md](compress-context.md) (compression tool)
- Contribution Workflow: [CONTRIBUTING.md](CONTRIBUTING.md)
- Architecture: [docs/architecture.md](docs/architecture.md)
- Context-Packing Design: [docs/design/context-packing.md](docs/design/context-packing.md)
- Eval Methodology: [docs/evals/token-savings-methodology.md](docs/evals/token-savings-methodology.md)
- Golden Examples: [docs/evals/golden-examples.md](docs/evals/golden-examples.md)
- Context-Pack Contract: [docs/context-pack-contract.md](docs/context-pack-contract.md)

## Rules
1. Reply using the strict `A:`, `R:`, `N:` structure.
2. Minimize tokens via abbreviations and math operators.
3. Keep responses highly structured and non-verbose.
4. Keep Stenography scoped to deterministic context-pack generation.
5. Do not move Avionics orchestration, Codebrain repo understanding, or AgentLens telemetry into this repo.

## Validation
- CLI smoke: `npm test`
- Pack contract: `node bin/stenography.js validate-pack examples/context-pack.example.json`
- Packaging smoke, when APM is installed: `apm validate`
