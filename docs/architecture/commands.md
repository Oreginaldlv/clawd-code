# Command system (`src/commands/`)

User-facing slash commands invoked with a `/` prefix. Registration and wiring live in `src/commands.ts` (very large); implementations live under `src/commands/` (~50 command areas).

## Resolution path

When the user submits input, **`processUserInput`** (`src/utils/processUserInput/processUserInput.ts`) uses **`parseSlashCommand`** / **`findCommand`** from **`commands.ts`** to match `/name` and optional arguments. Commands receive a **`LocalJSXCommandContext`** (cwd, tool context, setters for UI). They may:

- Return **messages only** (e.g. informational output) with **`shouldQuery: false`**, or
- Inject system/user messages and set **`shouldQuery: true`** to trigger **`QueryEngine`**, or
- Open fullscreen flows (doctor, config wizards) via dialog launchers.

**`filterCommandsForRemoteMode`** and similar helpers hide commands that are unsafe or meaningless when the session is remote-controlled.

## Relationship to tools

Slash **commands** are **user-initiated**; **tools** are **model-initiated**. Some commands manipulate which tools exist (e.g. MCP management) or change permission modes (`/plan`), which affects the next **`canUseTool`** decisions.

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

Related: [Services](./services.md) for API and remote behavior backing some commands.
