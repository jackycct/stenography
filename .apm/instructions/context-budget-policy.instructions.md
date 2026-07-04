# Context Budget Policy

Use Stenography when task context should be compact, deterministic, and reusable across agents.

## Budget Rules

- Default budget: `30000` tokens.
- Preserve exact task text, file paths, commands, symbols, and tests.
- Prefer Codebrain analysis files as opaque inputs.
- Exclude benchmark math, workflow orchestration, and code graph discovery.
- Emit Markdown for agents and JSON for tools.

## Section Order

1. `issue_summary`
2. `repo_map`
3. `relevant_files`
4. `symbols`
5. `affected_tests`
6. `risk_notes`
7. `execution_guidance`
