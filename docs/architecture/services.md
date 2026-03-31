# Service layer (`src/services/`)

Integration points for network, protocols, policy, and background processing.

| Area                     | Description                                             |
| ------------------------ | ------------------------------------------------------- |
| `api/`                   | Splinterworks-style API client, file API, bootstrap     |
| `mcp/`                   | Model Context Protocol server connection and management |
| `oauth/`                 | OAuth 2.0 authentication flow                           |
| `lsp/`                   | Language Server Protocol manager                        |
| `analytics/`             | GrowthBook-based feature flags and analytics            |
| `plugins/`               | Plugin loader                                           |
| `compact/`               | Conversation context compression                        |
| `policyLimits/`          | Organization policy limits                              |
| `remoteManagedSettings/` | Remote managed settings                                 |
| `extractMemories/`       | Automatic memory extraction                             |
| `tokenEstimation.ts`     | Token count estimation                                  |
| `teamMemorySync/`        | Team memory synchronization                             |

## MCP (`src/services/mcp/`)

**`client.ts`** is the central MCP client: server lifecycle, tool/resource listing, **tool call** execution, auth errors, caching/clearing, and integration with CLI commands (`getMcpToolsCommandsAndResources`, `prefetchAllMcpResources`). **`config.ts`** parses and merges server definitions (files, enterprise policy, Clawd Web–sourced configs). **`clawdWebMcp.ts`** fetches hosted MCP configs when eligible.

The **`MCPTool`** surface in `src/tools/` turns model invocations into **`client`** RPCs; tool names are normalized for permission and telemetry (`mcpStringUtils`, `normalization.ts`, `utils.ts`).

## API (`src/services/api/`)

HTTP client for the coding assistant backend: streaming completions, bootstrap, file APIs, retries (`withRetry.ts`), prompt dumping for debug, error taxonomy (`errors.ts`). **`clawdApi.ts`** tracks usage/cost accumulation used by **`QueryEngine`** and **`cost-tracker`**.

## Compaction (`src/services/compact/`)

Implements **conversation compaction** (summarize or trim history) so later **`query`** iterations stay within context limits. Works with **`query.ts`** boundaries (`getMessagesAfterCompactBoundary`, micro-compact, reactive compact when gated).

## Analytics (`src/services/analytics/`)

**GrowthBook** initialization and cached feature checks; many gates in **`query/config.ts`** and elsewhere read **Statsig-style** gate names. Events funnel through **`logEvent`** with metadata sanitization rules.

## OAuth (`src/services/oauth/`)

Login flows and token handling coordinated with **`main.tsx`** and global config.

Related: [Bridge](./bridge.md), [Tools](./tools.md), [Query loop](./query-loop.md).

### Notable large file

`src/services/mcp/client.ts` — MCP connection and tool invocation (thousands of lines; use symbol search).
