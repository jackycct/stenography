# Installation & Integration Guide

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
