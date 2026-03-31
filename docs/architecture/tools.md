# Tool system (`src/tools/`)

Each invocable tool is implemented as a self-contained module defining input schema, permission model, and execution logic.

Registration is centralized in `src/tools.ts`; types and shared behavior live in `src/Tool.ts` (very large).

| Tool                                     | Description                                    |
| ---------------------------------------- | ---------------------------------------------- |
| `BashTool`                               | Shell command execution                        |
| `FileReadTool`                           | File reading (images, PDFs, notebooks)       |
| `FileWriteTool`                          | File creation / overwrite                      |
| `FileEditTool`                           | Partial file modification (string replacement) |
| `GlobTool`                               | File pattern matching search                   |
| `GrepTool`                               | ripgrep-based content search                   |
| `WebFetchTool`                           | Fetch URL content                              |
| `WebSearchTool`                          | Web search                                     |
| `AgentTool`                              | Sub-agent spawning                             |
| `SkillTool`                              | Skill execution                                |
| `MCPTool`                                | MCP server tool invocation                     |
| `LSPTool`                                | Language Server Protocol integration           |
| `NotebookEditTool`                       | Jupyter notebook editing                       |
| `TaskCreateTool` / `TaskUpdateTool`      | Task creation and management                   |
| `SendMessageTool`                        | Inter-agent messaging                          |
| `TeamCreateTool` / `TeamDeleteTool`      | Team agent management                          |
| `EnterPlanModeTool` / `ExitPlanModeTool` | Plan mode toggle                               |
| `EnterWorktreeTool` / `ExitWorktreeTool` | Git worktree isolation                         |
| `ToolSearchTool`                         | Deferred tool discovery                        |
| `CronCreateTool`                         | Scheduled trigger creation                     |
| `RemoteTriggerTool`                      | Remote trigger                                 |
| `SleepTool`                              | Proactive mode wait                            |
| `SyntheticOutputTool`                    | Structured output generation                   |

Many tools pair a logic module with an Ink `UI.tsx` for progress and permission UX under `src/components/`.

## Anatomy of a tool (logic)

A tool is a **`Tool`** object (`src/Tool.ts`) with, in practice:

- **`name`** — stable string the model sees (MCP tools often include a server prefix; normalization lives under `src/services/mcp/`).
- **`inputSchema`** — Zod (or compatible) schema; used to **parse** model JSON before execution and to decide **`isConcurrencySafe`** in [Tool execution](./tool-execution.md).
- **`description`** — static or async text shown in permission prompts.
- **Permission hooks** — integration with `filesystem` rules for file/shell tools.
- **`run` / execution entry** — performs the side effect and returns structured content for **`tool_result`**.
- Optional **`isConcurrencySafe(input)`** — if true for a **parsed** input, the orchestrator may batch this tool with adjacent read-only tools.

`MCPTool` forwards to live MCP sessions maintained by **`src/services/mcp/client.ts`**. `AgentTool` forks nested **`query`** runs with a child **`ToolUseContext`**.

## Registration (`src/tools.ts`)

**`getTools()`** (and related helpers) assemble the list passed into **`QueryEngine`**: built-in tools, feature-gated entries, synthetic output tool when enabled, etc. The REPL **does not** scan `src/tools/` at runtime; only registered tools reach the model.

**`ToolSearchTool`** exists so the model can defer loading rarely used tools into context until needed (see `src/utils/toolSearch.ts`).

Related: [Permissions](./permissions.md), [Plugins & skills](./plugins-skills.md), [Tool execution](./tool-execution.md).
