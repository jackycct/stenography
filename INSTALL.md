# Installation & Integration Guide

## APM Installation

Stenography uses Microsoft Agent Package Manager (APM) as canonical packaging for agent-facing assets.

```bash
apm install
```

Canonical source files live under `.apm/`:

- `.apm/instructions/context-budget-policy.instructions.md`
- `.apm/skills/stenography-context-pack/SKILL.md`
- `.apm/skills/stenography-repo-summary/SKILL.md`

Generated runtime folders for supported agents should be treated as install output, not source of truth.

Lockfile policy:

- Commit `apm.lock.yaml`.
- Update lockfile whenever `apm.yml` or `.apm/` assets change.
- Do not hand-edit generated runtime folders when `.apm/` can express the asset.

Validation:

```bash
apm validate
npm test
```

Release/versioning:

- Bump `package.json` and `apm.yml` together.
- Keep context-pack schema changes backward-compatible within a minor version.
- Document breaking contract changes in a major version.

## Automatic Installation (Agent-Friendly)

If an AI agent is running inside this repository, it can auto-detect its own environment and copy the correct configuration file to a target workspace root by running:

```bash
node path/to/stenography/install.js [target-directory]
```

*Example (installing to current working directory):*
```bash
node C:/w/stenography/install.js .
```

---

## Manual Installation

To load Stenography standards manually in your preferred AI tools, clone or copy the respective files to your project root directory:

## 1. Claude Code
- **Method**: Place [CLAUDE.md](CLAUDE.md) in your project root.
- **Result**: Claude Code reads the pointer and resolves project rules automatically on startup.

## 2. VS Code GitHub Copilot
- **Method**: Place [AGENTS.md](AGENTS.md) or [CLAUDE.md](CLAUDE.md) in your project root.
- **Result**: Copilot natively reads and applies these rules automatically to workspace chats.



## 3. Cursor
- **Method**: Place [.cursorrules](.cursorrules) in your project root.
- **Result**: Cursor applies the rules to all project-level chat and Composer interactions.

## 4. Codex & Antigravity
- **Method**: Place [AGENTS.md](AGENTS.md) in your project root.
- **Result**: Codex and Antigravity agents use this entrypoint for repo-local routing.
