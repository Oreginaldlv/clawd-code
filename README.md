# Clawd Code — security research mirror

This repository hosts a **static mirror of a TypeScript `src/` tree** for **educational use, defensive security research, and software supply-chain analysis**. It is maintained by an independent university student as a personal research project.

**Naming.** **Splinterworks**, **Clawd**, and **Clawd Code** are fictional stand-ins for a vendor, assistant, and terminal coding-agent CLI—same spirit as **Macrohard** for a giant software company. They name a _style_ of product for this mirror, not a real shipping brand.

---

## Important notice

**Please read this section before using or redistributing anything from this repository.**

- **No affiliation.** This project is **not** affiliated with, endorsed by, sponsored by, or maintained by **Splinterworks** or any other rights holder. It is **not** an official product repository.
- **Intellectual property.** The mirrored tree is presented for study only. **All copyrights and other rights in the original work remain with their respective owners.** This repository **does not** claim ownership of that material.
- **No license granted.** The maintainer **does not** grant you a license to use, copy, modify, or distribute the mirrored code for any purpose. Your use is **at your own risk** and subject to applicable law and third-party rights. There is **no** `LICENSE` file here implying open-source permission over third-party content.
- **“AS IS.”** Everything is provided **“AS IS”** and **“AS AVAILABLE.”** There are **no warranties** of any kind, express or implied, including merchantability, fitness for a particular purpose, accuracy, or non-infringement. The maintainer **disclaims liability** to the fullest extent permitted by law for any damages arising from use of this repository.
- **Not legal advice.** This README is for information only and is **not** legal advice.

---

## Purpose and acceptable use

This archive exists to support:

- study of **build artifacts, packaging, and release-process risks** in real-world CLI tooling
- **secure software engineering** and **defensive** analysis of agentic developer tools
- **architecture review** and discussion of how such systems are structured

Use it only in ways that comply with applicable law and third-party terms. Do **not** use this repository to harm others, bypass security, or misuse upstream services.

---

## Background (high level)

Public discussion in March 2026 suggested that **source map** artifacts associated with an **npm** distribution may have made **TypeScript source** material easier to obtain than intended.

## What is in this repository

The tree contains a mirrored **`src/`** snapshot preserved for research and analysis.

**Clawd Code** (upstream) is a terminal-oriented CLI used with Splinterworks’s coding-assistant stack for tasks such as editing files, running commands, searching codebases, and coordinating workflows. **This mirror is not a supported build, fork, or replacement** for the official product.

| Attribute              | Detail                                             |
| ---------------------- | -------------------------------------------------- |
| Snapshot context       | Public discussion, 2026-03-31                      |
| Language               | TypeScript                                         |
| Runtime (upstream)     | Bun                                                |
| Terminal UI (upstream) | React + [Ink](https://github.com/vadimdemedes/ink) |
| Scale (approximate)    | ~1,900 files, 512,000+ lines of code               |

---

## Takedown and contact

If you are a rights holder or authorized representative and believe material in this repository infringes your rights or violates applicable law, **contact the maintainer** by opening a **GitHub Issue** on this repository (or use any contact method the maintainer publishes on their GitHub profile).

Upon receipt of a **valid legal notice** (for example, a DMCA notice that meets statutory requirements where applicable), the maintainer will **review it promptly** and, where appropriate, **disable or remove** the identified content or the repository. Good-faith cooperation does not waive any party’s legal rights or remedies.

---

## Directory structure

```text
src/
├── main.tsx                 # Entrypoint orchestration (Commander.js-based CLI path)
├── commands.ts              # Command registry
├── tools.ts                 # Tool registry
├── Tool.ts                  # Tool type definitions
├── QueryEngine.ts           # LLM query engine
├── context.ts               # System/user context collection
├── cost-tracker.ts          # Token cost tracking
│
├── commands/                # Slash command implementations (~50)
├── tools/                   # Agent tool implementations (~40)
├── components/              # Ink UI components (~140)
├── hooks/                   # React hooks
├── services/                # External service integrations
├── screens/                 # Full-screen UIs (Doctor, REPL, Resume)
├── types/                   # TypeScript type definitions
├── utils/                   # Utility functions
│
├── bridge/                  # IDE and remote-control bridge
├── coordinator/             # Multi-agent coordinator
├── plugins/                 # Plugin system
├── skills/                  # Skill system
├── keybindings/             # Keybinding configuration
├── vim/                     # Vim mode
├── voice/                   # Voice input
├── remote/                  # Remote sessions
├── server/                  # Server mode
├── memdir/                  # Persistent memory directory
├── tasks/                   # Task management
├── state/                   # State management
├── migrations/              # Config migrations
├── schemas/                 # Config schemas (Zod)
├── entrypoints/             # Initialization logic
├── ink/                     # Ink renderer wrapper
├── buddy/                   # Companion sprite
├── native-ts/               # Native TypeScript utilities
├── outputStyles/            # Output styling
├── query/                   # Query pipeline
└── upstreamproxy/           # Proxy configuration
```

---

## Architecture summary

The following describes **observed structure** in the mirrored tree for research purposes. It is **descriptive analysis**, not official product documentation.

### 1. Tool system (`src/tools/`)

Each invocable tool is implemented as a self-contained module defining input schema, permission model, and execution logic.

| Tool                                     | Description                                    |
| ---------------------------------------- | ---------------------------------------------- |
| `BashTool`                               | Shell command execution                        |
| `FileReadTool`                           | File reading (images, PDFs, notebooks)         |
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

### 2. Command system (`src/commands/`)

User-facing slash commands invoked with a `/` prefix.

| Command              | Description                  |
| -------------------- | ---------------------------- |
| `/commit`            | Create a git commit          |
| `/review`            | Code review                  |
| `/compact`           | Context compression          |
| `/mcp`               | MCP server management        |
| `/config`            | Settings management          |
| `/doctor`            | Environment diagnostics      |
| `/login` / `/logout` | Authentication               |
| `/memory`            | Persistent memory management |
| `/skills`            | Skill management             |
| `/tasks`             | Task management              |
| `/vim`               | Vim mode toggle              |
| `/diff`              | View changes                 |
| `/cost`              | Check usage cost             |
| `/theme`             | Change theme                 |
| `/context`           | Context visualization        |
| `/pr_comments`       | View PR comments             |
| `/resume`            | Restore previous session     |
| `/share`             | Share session                |
| `/desktop`           | Desktop app handoff          |
| `/mobile`            | Mobile app handoff           |

### 3. Service layer (`src/services/`)

| Service                  | Description                                             |
| ------------------------ | ------------------------------------------------------- |
| `api/`                   | Splinterworks API client, file API, bootstrap           |
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

### 4. Bridge system (`src/bridge/`)

Bidirectional communication between IDE extensions (VS Code, JetBrains) and the CLI.

- `bridgeMain.ts` — Bridge main loop
- `bridgeMessaging.ts` — Message protocol
- `bridgePermissionCallbacks.ts` — Permission callbacks
- `replBridge.ts` — REPL session bridge
- `jwtUtils.ts` — JWT-based authentication
- `sessionRunner.ts` — Session execution management

### 5. Permission system (`src/hooks/toolPermission/`)

Permission checks on tool invocation: user prompt or automatic resolution depending on configured permission mode (`default`, `plan`, `bypassPermissions`, `auto`, etc.).

### 6. Feature flags

Dead code elimination via Bun’s `bun:bundle` feature flags:

```typescript
import { feature } from "bun:bundle";

// Inactive code is completely stripped at build time
const voiceCommand = feature("VOICE_MODE")
  ? require("./commands/voice/index.js").default
  : null;
```

Notable flags: `PROACTIVE`, `KAIROS`, `BRIDGE_MODE`, `DAEMON`, `VOICE_MODE`, `AGENT_TRIGGERS`, `MONITOR_TOOL`

---

## Key files in detail

### `QueryEngine.ts` (~46K lines)

Core engine for LLM API calls: streaming responses, tool-call loops, thinking mode, retry logic, token counting.

### `Tool.ts` (~29K lines)

Base types and interfaces for tools — input schemas, permission models, progress state types.

### `commands.ts` (~25K lines)

Registration and execution of slash commands; conditional imports for environment-specific command sets.

### `main.tsx`

Commander.js-based CLI parsing and React/Ink renderer setup; startup paths include MDM settings, keychain prefetch, and GrowthBook initialization for boot performance.

---

## Tech stack

| Category          | Technology                                                              |
| ----------------- | ----------------------------------------------------------------------- |
| Runtime           | [Bun](https://bun.sh)                                                   |
| Language          | TypeScript (strict)                                                     |
| Terminal UI       | [React](https://react.dev) + [Ink](https://github.com/vadimdemedes/ink) |
| CLI Parsing       | [Commander.js](https://github.com/tj/commander.js) (extra-typings)      |
| Schema Validation | [Zod v4](https://zod.dev)                                               |
| Code Search       | [ripgrep](https://github.com/BurntSushi/ripgrep)                        |
| Protocols         | [MCP SDK](https://modelcontextprotocol.io), LSP                         |
| API               | [Splinterworks SDK](https://docs.splinterworks.invalid)                 |
| Telemetry         | OpenTelemetry + gRPC                                                    |
| Feature Flags     | GrowthBook                                                              |
| Auth              | OAuth 2.0, JWT, macOS Keychain                                          |

---

## Notable design patterns

### Parallel prefetch

Startup prefetch of MDM settings, keychain reads, and API preconnect in parallel before heavier module evaluation.

```typescript
// main.tsx — fired as side-effects before other imports
startMdmRawRead();
startKeychainPrefetch();
```

### Lazy loading

Heavy modules (OpenTelemetry, gRPC, analytics, and some feature-gated subsystems) deferred via dynamic `import()` until needed.

### Agent swarms

Sub-agents via `AgentTool`; `coordinator/` for multi-agent orchestration; `TeamCreateTool` for team-level parallel work.

### Skill system

Workflows under `skills/` executed through `SkillTool`; upstream product supports user-defined skills.

### Plugin architecture

Plugins loaded through the `plugins/` subsystem.

---

## Footer

**Non-affiliation.** Not affiliated with, endorsed by, or maintained by Splinterworks or any named rights holder.

**Intellectual property.** Original works remain the property of their respective owners; this mirror does not transfer any rights.

**Disclaimer.** Provided “AS IS” without warranty; not legal advice. Use at your own risk.
