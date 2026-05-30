# Stenography

Stenography is an agent communication and context-compression system designed to minimize token usage while maintaining human readability and strict technical accuracy.

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

| Metric / Style | Verbose (Default) | Caveman | Stenography (Symbolic) |
| :--- | :--- | :--- | :--- |
| **Output Token Size** | 100% (baseline) | ~25% (75% saved) | **~30% (70% saved)** |
| **Input Context Size** | 100% (baseline) | ~35% (65% saved) | **~35% (65% saved)** |
| **Human Readability** | High | Extremely low (broken prose) | **High (logical structure)** |
| **Technical Accuracy** | High | Moderate (risks ambiguity) | **High (retains logical relationships)** |
| **Speed (TTFT/Generation)**| 1x | ~3x | **~3x** |

---

## Skills

### `/compress-context`
Automatically parses a target markdown file, strips grammatical fluff, maps logic to symbols, and rewrites the file in place to save active context space.

---

## Installation & Integration

See [INSTALL.md](INSTALL.md) for details on setting up Stenography configuration files in Claude Code, GitHub Copilot, Cursor, and Codex / Antigravity.


