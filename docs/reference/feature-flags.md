# Feature flags

Upstream builds use **dead code elimination** via Bun’s `bun:bundle` feature flags:

```typescript
import { feature } from "bun:bundle";

// Inactive code is completely stripped at build time
const voiceCommand = feature("VOICE_MODE")
  ? require("./commands/voice/index.js").default
  : null;
```

## Notable flag names

`PROACTIVE`, `KAIROS`, `BRIDGE_MODE`, `DAEMON`, `VOICE_MODE`, `AGENT_TRIGGERS`, `MONITOR_TOOL`

Runtime product behavior may also use **GrowthBook** (see `src/services/analytics/`). This static mirror may contain branches that only compile when the corresponding bundle flags are enabled upstream.
