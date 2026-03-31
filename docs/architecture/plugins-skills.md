# Plugins and skills

## Skill system

Workflows under `src/skills/` (including `bundled/` definitions) are executed through **`SkillTool`**. The upstream product supports user-defined skills; this mirror captures bundled and core skill plumbing.

See also: `src/skills/bundledSkills.ts` and related API helpers under `src/skills/bundled/`.

## Plugin architecture

Plugins are loaded through the **`src/plugins/`** subtree and **`src/services/plugins/`** loader. Schemas and MCPB handling appear under `src/utils/plugins/`.

## Coordinator and teams

Multi-agent orchestration uses **`src/coordinator/`** alongside tools such as **`AgentTool`**, **`TeamCreateTool`**, **`TeamDeleteTool`**, and **`SendMessageTool`**.

## Feature flags (build-time)

Dead code elimination in upstream builds uses Bun’s `bun:bundle` feature flags. See [Feature flags](../reference/feature-flags.md) for the pattern and notable flag names.

## How skills run (conceptually)

1. Skill definitions (markdown + frontmatter or bundled TS) live under **`src/skills/`**.
2. **`initBundledSkills`** (from **`main.tsx`**) registers discoverable skills for the session.
3. The model (or user) invokes **`SkillTool`** with a skill identifier.
4. The tool implementation loads the skill body, may merge **prompt** fragments into context, and executes any scripted steps the upstream format defines.

**`EXPERIMENTAL_SKILL_SEARCH`** (when enabled) ties into **`src/services/skillSearch/`** so relevant skills can be prefetched during **`query`** iterations.

## How plugins run

**`initBuiltinPlugins`** loads in-repo bundled plugins; **`initializeVersionedPlugins`** / **`pluginLoader.ts`** resolve user-installed plugins, apply **managed** allowlists, and expose hooks. Plugin hooks can participate in the same hook pipeline as native hooks (**`toolHooks`**, user prompt hooks, etc.).

**`src/utils/plugins/mcpbHandler.ts`** handles **MCPB**-packaged plugin artifacts.
