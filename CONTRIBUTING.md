# Contributing

## Scope

Stenography owns deterministic context-pack generation for coding agents under token budget.

In scope:

- context-pack CLI behavior
- context-pack JSON schema and contract docs
- agent-facing dense communication assets
- packaging metadata for Stenography assets
- validation docs and golden examples

Out of scope:

- Avionics workflow orchestration and feature-flag policy
- Codebrain repo understanding, impact analysis, and repo wiki generation
- AgentLens telemetry, reporting, and A/B experiment storage

## Workflow

1. Start from a GitHub issue or short task brief.
2. Keep changes focused on one contract, doc, or CLI behavior.
3. Update the owning doc with behavior changes:
   - overview and common commands: [README.md](README.md)
   - agent routing: [AGENTS.md](AGENTS.md)
   - architecture boundaries: [docs/architecture.md](docs/architecture.md)
   - context-pack schema: [docs/context-pack-contract.md](docs/context-pack-contract.md)
   - eval process: [docs/evals/token-savings-methodology.md](docs/evals/token-savings-methodology.md)
4. Add or update golden examples when pack shape changes.
5. Run validation before opening a PR.

## Validation

```bash
npm test
```

When APM is installed:

```bash
apm validate
```

For schema/contract-only changes, also run:

```bash
node bin/stenography.js validate-pack examples/context-pack.example.json
```

## PR Checklist

- [ ] README or owning doc updated.
- [ ] Agent routing still points to the right canonical docs.
- [ ] Performance claims are labelled as measured only when AgentLens artifacts exist.
- [ ] Golden examples cover verbose input, compressed pack, metadata JSON, and validation.
- [ ] `npm test` passes.
