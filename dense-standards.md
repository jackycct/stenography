# Dense Communication Standards

Rules to minimize token count while maximizing human readability and technical accuracy.

## Core Rules

1. **Symbolic Transitions**: Replace prose conjunctions and causal statements with logic operators.
 - Cause/Effect: `A -> B` or `A => B`
 - Comparison: `A cf. B`
 - Registry/Regarding: `re: context`
 - Crucial/Warning: `! warning`

2. **Key-Value Hierarchies**: Eliminate sentence boundaries. Format actions as mapping properties.
 - Format: `<subject>: <action> -> <target>`
 - Example: `config.json: change port -> 8080`
 - Prefixes: Use `A:`, `R:`, `N:` instead of `Answer:`, `Reason:`, `Next step:`.

3. **Domain Abbreviations**: Use standard shortcuts:
   - `fn` (function), `impl` (implementation), `db` (database), `config` (configuration)
   - `req/res` (request/response), `auth` (auth/authorization), `param/arg` (parameter/argument), `err` (error)
   - `info` (information), `dev` (development), `pkg` (package), `doc` (documentation), `repo` (repository)
   - `sys` (system), `app` (application), `env` (environment)

4. **Lazy Resolution**: Mention paths/symbols as markdown links instead of copying inline snippets unless requested.

5. **No Echoing**: Answer directly. Do not repeat instructions, questions, or context.