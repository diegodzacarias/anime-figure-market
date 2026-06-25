# Everything Claude Code (ECC) — Agent Instructions

This is a **production-ready AI coding plugin** providing 67 specialized agents, 271 skills, 92 commands, and automated hook workflows for software development.

**Version:** 2.0.0 (Customized for rapid development and MVP workflows)

> **IMPORTANT:** Unless the user explicitly requests tests, assume that test creation, coverage generation, and test execution are out of scope.

## Core Principles

1. **Agent-First** — Delegate to specialized agents for domain tasks
2. **Implementation-First** — Prioritize delivering working functionality quickly. Tests are opt-in and only created when explicitly requested by the user.
3. **Security-First** — Never compromise on security; validate all inputs
4. **Immutability** — Always create new objects, never mutate existing ones
5. **Plan Before Execute** — Plan complex features before writing code

## Available Agents

| Agent | Purpose | When to Use |
|-------|---------|-------------|
| planner | Implementation planning | Complex features, refactoring |
| architect | System design and scalability | Architectural decisions |
| tdd-guide | Test-driven development | Only when explicitly requested by the user |
| code-reviewer | Code quality and maintainability | After writing/modifying code |
| security-reviewer | Vulnerability detection | Before commits, sensitive code |
| spec-miner | Brownfield spec extraction | Onboarding brownfield projects to spec-driven development |
| build-error-resolver | Fix build/type errors | When build fails |
| e2e-runner | End-to-end Playwright testing | Only when explicitly requested by the user |
| refactor-cleaner | Dead code cleanup | Code maintenance |
| doc-updater | Documentation and codemaps | Updating docs |
| cpp-reviewer | C/C++ code review | C and C++ projects |
| cpp-build-resolver | C/C++ build errors | C and C++ build failures |
| fsharp-reviewer | F# functional code review | F# projects |
| docs-lookup | Documentation lookup via Context7 | API/docs questions |
| go-reviewer | Go code review | Go projects |
| go-build-resolver | Go build errors | Go build failures |
| kotlin-reviewer | Kotlin code review | Kotlin/Android/KMP projects |
| kotlin-build-resolver | Kotlin/Gradle build errors | Kotlin build failures |
| database-reviewer | PostgreSQL/Supabase specialist | Schema design, query optimization |
| python-reviewer | Python code review | Python projects |
| django-reviewer | Django code review | Django apps, DRF APIs, ORM, migrations |
| django-build-resolver | Django build, migration, and setup errors | Django startup, dependency, migration, collectstatic failures |
| java-reviewer | Java and Spring Boot code review | Java/Spring Boot projects |
| java-build-resolver | Java/Maven/Gradle build errors | Java build failures |
| loop-operator | Autonomous loop execution | Run loops safely, monitor stalls, intervene |
| harness-optimizer | Harness config tuning | Reliability, cost, throughput |
| rust-reviewer | Rust code review | Rust projects |
| rust-build-resolver | Rust build errors | Rust build failures |
| pytorch-build-resolver | PyTorch runtime/CUDA/training errors | PyTorch build/training failures |
| mle-reviewer | Production ML pipeline review | ML pipelines, evals, serving, monitoring, rollback |
| typescript-reviewer | TypeScript/JavaScript code review | TypeScript/JavaScript projects |

## Agent Orchestration

Use agents proactively without user prompt:

- Complex feature requests → **planner**
- Code just written/modified → **code-reviewer**
- Architectural decisions → **architect**
- Security-sensitive code → **security-reviewer**
- Brownfield project onboarding → **spec-miner**
- Autonomous loops / loop monitoring → **loop-operator**
- Harness config reliability and cost → **harness-optimizer**

### Testing Agents Policy

- Do **NOT** invoke **tdd-guide** automatically.
- Do **NOT** invoke **e2e-runner** automatically.
- Only use testing-related agents if the user explicitly requests tests, coverage analysis, test execution, or test debugging.

Use parallel execution for independent operations.

## Security Guidelines

**Before ANY commit:**

- No hardcoded secrets (API keys, passwords, tokens)
- All user inputs validated
- SQL injection prevention (parameterized queries)
- XSS prevention (sanitized HTML)
- CSRF protection enabled
- Authentication/authorization verified
- Rate limiting on all endpoints
- Error messages don't leak sensitive data

**Secret management:** NEVER hardcode secrets. Use environment variables or a secret manager. Validate required secrets at startup. Rotate any exposed secrets immediately.

**If security issue found:** STOP → use security-reviewer agent → fix CRITICAL issues → rotate exposed secrets → review codebase for similar issues.

## Coding Style

**Immutability (CRITICAL):** Always create new objects, never mutate. Return new copies with changes applied.

**File organization:** Many small files over few large ones. 200-400 lines typical, 800 max. Organize by feature/domain, not by type. High cohesion, low coupling.

**Error handling:** Handle errors at every level. Provide user-friendly messages in UI code. Log detailed context server-side. Never silently swallow errors.

**Input validation:** Validate all user input at system boundaries. Use schema-based validation. Fail fast with clear messages. Never trust external data.

**Code quality checklist:**

- Functions small (<50 lines), files focused (<800 lines)
- No deep nesting (>4 levels)
- Proper error handling, no hardcoded values
- Readable, well-named identifiers

## Testing Requirements

Tests are **explicitly opt-in**.

### Default Behavior

Unless explicitly instructed by the user:

- DO NOT create unit tests
- DO NOT create integration tests
- DO NOT create E2E tests
- DO NOT add testing dependencies
- DO NOT create mocks or fixtures
- DO NOT execute test suites solely for validation
- DO NOT enforce coverage targets
- DO NOT mention missing tests as blockers

### When Tests Are Allowed

Only create or run tests if the user explicitly requests actions such as:

- "Create tests"
- "Add unit tests"
- "Write integration tests"
- "Run tests"
- "Increase coverage"
- "Debug failing tests"

When tests are requested:

1. Prefer minimal, focused tests
2. Generate only the requested tests
3. Avoid exhaustive coverage unless explicitly requested

## Development Workflow

1. **Plan** — Use planner agent, identify dependencies and risks, break into phases
2. **Implement** — Deliver the requested functionality with minimal unnecessary work
3. **Review** — Use code-reviewer agent immediately and address CRITICAL/HIGH issues
4. **Capture knowledge in the right place**
   - Personal debugging notes, preferences, and temporary context → auto memory
   - Team/project knowledge (architecture decisions, API changes, runbooks) → the project's existing docs structure
   - If the current task already produces the relevant docs or code comments, do not duplicate the same information elsewhere
   - If there is no obvious project doc location, ask before creating a new top-level file
5. **Commit** — Conventional commits format and comprehensive PR summaries

## Workflow Surface Policy

- `skills/` is the canonical workflow surface
- New workflow contributions should land in `skills/` first
- `commands/` is a legacy slash-entry compatibility surface and should only be added or updated when a shim is still required for migration or cross-harness parity

## Git Workflow

**Commit format:** `<type>: <description>`

Types:

- feat
- fix
- refactor
- docs
- test
- chore
- perf
- ci

**PR workflow:** Analyze full commit history → draft comprehensive summary → include a test plan only if tests were requested → push with `-u` flag.

## Architecture Patterns

**API response format:** Consistent envelope with success indicator, data payload, error message, and pagination metadata.

**Repository pattern:** Encapsulate data access behind a standard interface (`findAll`, `findById`, `create`, `update`, `delete`). Business logic depends on abstract interfaces, not storage mechanisms.

**Skeleton projects:** Search for battle-tested templates, evaluate with parallel agents (security, extensibility, relevance), clone the best match, and iterate within a proven structure.

## Performance

**Context management:** Avoid the last 20% of the context window for large refactoring and multi-file features. Lower-sensitivity tasks (single edits, docs, simple fixes) tolerate higher utilization.

**Build troubleshooting:** Use `build-error-resolver` → analyze errors → fix incrementally → verify after each fix.

**Testing optimization:** Avoid generating tests, mocks, fixtures, or running test suites unless explicitly requested by the user, as these activities significantly increase context consumption and execution time.

## Project Structure

```text
agents/          — 67 specialized subagents
skills/          — 271 workflow skills and domain knowledge
commands/        — 92 slash commands
hooks/           — Trigger-based automations
rules/           — Always-follow guidelines (common + per-language)
scripts/         — Cross-platform Node.js utilities
mcp-configs/     — 14 MCP server configurations
tests/           — Test suite
```

`commands/` remains in the repo for compatibility, but the long-term direction is skills-first.

## Success Metrics

- User requirements are met
- No security vulnerabilities
- Code is readable and maintainable
- Performance is acceptable
- Tests exist only when explicitly requested by the user