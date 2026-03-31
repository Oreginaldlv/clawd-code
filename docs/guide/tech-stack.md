# Tech stack

Upstream product stack as reflected in the mirrored `src/` tree:

| Category          | Technology                                                              |
| ----------------- | ----------------------------------------------------------------------- |
| Runtime           | [Bun](https://bun.sh)                                                   |
| Language          | TypeScript (strict)                                                     |
| Terminal UI       | [React](https://react.dev) + [Ink](https://github.com/vadimdemedes/ink) |
| CLI Parsing       | [Commander.js](https://github.com/tj/commander.js) (extra-typings)      |
| Schema Validation | [Zod v4](https://zod.dev)                                               |
| Code Search       | [ripgrep](https://github.com/BurntSushi/ripgrep)                        |
| Protocols         | [MCP SDK](https://modelcontextprotocol.io), LSP                         |
| API               | Splinterworks-style SDK (fictional docs URL in upstream)                |
| Telemetry         | OpenTelemetry + gRPC                                                    |
| Feature Flags     | GrowthBook                                                              |
| Auth              | OAuth 2.0, JWT, macOS Keychain                                          |

## Reading order (suggested)

This mirror does not ship a buildable `tsconfig`; use these docs plus your editor’s search.

1. `src/main.tsx` — CLI entry and Ink bootstrap.
2. `src/commands.ts` — slash command registration.
3. `src/tools.ts` — tool registration.
4. `src/QueryEngine.ts` — LLM loop (very large file).
5. `src/Tool.ts` — tool types and schemas (very large file).

See [Key files](../reference/key-files.md) for a longer orientation.

## How components talk (conceptual)

| Layer | Responsibility |
|-------|----------------|
| **Commander + `main.tsx`** | Parse argv, run migrations, start services, open REPL or one-shot modes |
| **`bootstrap/state.ts`** | Shared session fields (cwd, model, costs, session id, OTel counters) |
| **`commands.ts` + `commands/`** | Map `/foo` to handlers |
| **`tools.ts` + `tools/`** | Register model-callable tools |
| **`QueryEngine` + `query.ts`** | Turn user+history into streamed API calls and tool loops |
| **`runTools` + `toolExecution.ts`** | Execute tool_use with permissions and hooks |
| **`screens/REPL.tsx` + `components/`** | Ink UI, prompts, permission modals |

For step-by-step runtime behavior, read [Runtime & bootstrap](../architecture/runtime-bootstrap.md) → [Query loop](../architecture/query-loop.md) → [Tool execution](../architecture/tool-execution.md).
