# Stenography

Stenography generates deterministic context packs for coding agents under a token budget.

It is not a generic short-writing project. It is a repo-local packing layer that turns task input, repo summaries, and optional Codebrain analysis into a compact Markdown pack plus JSON metadata that other workflow tools can consume.

## Project Docs

- Contribution workflow: [CONTRIBUTING.md](CONTRIBUTING.md)
- Architecture boundaries: [docs/architecture.md](docs/architecture.md)
- Context-packing design: [docs/design/context-packing.md](docs/design/context-packing.md)
- Token-savings methodology: [docs/evals/token-savings-methodology.md](docs/evals/token-savings-methodology.md)
- Golden examples: [docs/evals/golden-examples.md](docs/evals/golden-examples.md)
- Durable decisions: [docs/adr/](docs/adr/)

## Design Principles

1. **A/R/N Pattern**: Replaces verbose natural language with structured blocks:
   - `A:` Answer (direct, no fluff)
   - `R:` Reason (logical derivation/facts)
   - `N:` Next step (actionable directions)
2. **Symbolic Logic Mapping**: Replaces prose conjunctions/logic paths with logic operators (`→` for causality, `∃` for checks, `!=` for inequality).
3. **Namespace Scoping**: Translates narrative statements to key-value maps (`sys.env: dev` instead of "The system environment is configured for development").
4. **Standard Abbreviations**: Uses world-standard short names (`fn`, `db`, `config`, `pkg`, `repo`, `dev`) that LLMs parse natively without loss of meaning.
5. **Lazy Resolution**: Resolves references via file links rather than copy-pasting raw content.

---

## Token & Speed Efficiency Comparison

The table below is a target hypothesis for eval design, not a measured claim. Treat performance numbers as measured only when an AgentLens artifact is linked from an eval report.

| Metric / Style | Verbose (Default) | Caveman | Stenography (Symbolic) |
| :--- | :--- | :--- | :--- |
| **Output Token Size** | 100% (baseline) | target: ~25% | target: ~30% |
| **Input Context Size** | 100% (baseline) | target: ~35% | target: ~35% |
| **Human Readability** | High | Extremely low (broken prose) | **High (logical structure)** |
| **Technical Accuracy** | High | Moderate (risks ambiguity) | **High (retains logical relationships)** |
| **Speed (TTFT/Generation)**| 1x | target: ~3x | target: ~3x |

---

## Skills

### `/compress-context`
Automatically parses a target markdown file, strips grammatical fluff, maps logic to symbols, and rewrites the file in place to save active context space.

---

## Context Packs

Stenography also ships a standalone CLI for deterministic context packs:

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

Contract: [docs/context-pack-contract.md](docs/context-pack-contract.md)

Boundaries:

- Stenography: token-efficient context packing
- Avionics: workflow orchestration + feature toggles
- agent-lens: telemetry, evals, A/B evidence
- Codebrain: repo understanding, query, impact, repo wiki

Avionics feature flags:

```yaml
features:
  stenography_context_pack:
    enabled: true
  stenography_repo_summary:
    enabled: true
```

---

## Installation & Integration

See [INSTALL.md](INSTALL.md) for details on setting up Stenography configuration files in Claude Code, GitHub Copilot, Cursor, and Codex / Antigravity.

