# Notable design patterns

Observed patterns in the mirrored tree (descriptive, not prescriptive).

## Parallel prefetch

Startup prefetch of MDM settings, keychain reads, and API preconnect in parallel before heavier module evaluation.

```typescript
// main.tsx — fired as side-effects before other imports
startMdmRawRead();
startKeychainPrefetch();
```

## Lazy loading

Heavy modules (OpenTelemetry, gRPC, analytics, and some feature-gated subsystems) deferred via dynamic `import()` until needed.

## Agent swarms

Sub-agents via `AgentTool`; `coordinator/` for multi-agent orchestration; `TeamCreateTool` for team-level parallel work.

## Skill system

Workflows under `skills/` executed through `SkillTool`; upstream product supports user-defined skills.

## Plugin architecture

Plugins loaded through the `plugins/` subsystem and `services/plugins/`.

## Query state machine

**`query.ts`** keeps a **`State`** struct across iterations: messages, **`toolUseContext`**, auto-compact tracking, output-token recovery counters, pending **tool-use summary** promises, **stop hook** flag, **turn count**, and the last **transition** reason (for tests and recovery paths). Each **`continue`** site returns a fresh **`State`** instead of mutating many loose variables—documented in-file as preparation for a future pure reducer style.

## Immutable query config vs mutable context

**`QueryConfig`** (`src/query/config.ts`) is snapshotted once per **`query()`** call (session id, Statsig/env gates). **`ToolUseContext`** is mutable and threaded through **`runTools`** so tools can update caches, replacement state, and tracking IDs.

## Tool result budget

Large **`tool_result`** payloads are trimmed or replaced **before** each API call via **`applyToolResultBudget`** so context stays bounded; persistence of replacement records is tied to **`querySource`** (main REPL vs ephemeral sub-agent).

## Dependency injection in `query`

**`productionDeps()`** supplies UUID generation and API client functions so tests can swap implementations without mocking network globally.

## React Compiler

Many UI files use **`react/compiler-runtime`** (`"use memo"` / `_c` slots)—the upstream bundle relies on React 19 compiler optimizations for Ink trees.
