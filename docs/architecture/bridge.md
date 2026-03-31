# Bridge system (`src/bridge/`)

Bidirectional communication between **IDE extensions** (VS Code, JetBrains, etc.) and the **terminal CLI**. When bridge mode is active, the REPL is driven or observed remotely instead of only from local stdin.

## Logical responsibilities

| Concern | Typical modules |
|---------|-----------------|
| Transport | `replBridge.ts`, `replBridgeTransport.ts`, WebSocket or stdio adapters |
| Message framing | `bridgeMessaging.ts` — **pure** helpers: ingress parsing, **control_request** / **control_response**, echo dedup; shared by env-based and env-less bridge cores |
| Session lifecycle | `sessionRunner.ts`, `createSession.ts`, `bridgeMain.ts` |
| Auth | `jwtUtils.ts`, `trustedDevice.ts`, `workSecret.ts` |
| Permissions | `bridgePermissionCallbacks.ts` — ties IDE-side approval to CLI **permission** flow |
| Config & caps | `bridgeConfig.ts`, `pollConfig.ts`, `capacityWake.ts`, `envLessBridgeConfig.ts` |
| API surface | `bridgeApi.ts`, `codeSessionApi.ts` |

`bridgeMessaging.ts` header comment states the design goal: **transport-layer helpers** with no closure over bridge state—everything is passed in so **`initBridgeCore`** vs **`initEnvLessBridgeCore`** can share the same parsing and control-message handling.

## Message shapes

Incoming traffic is validated as **`SDKMessage`** unions (discriminated by `type`); helpers like **`isSDKMessage`**, **`isSDKControlRequest`**, **`isSDKControlResponse`** narrow parsed JSON. This aligns the bridge with the same **SDK-shaped** messages the headless agent SDK uses (`src/entrypoints/agentSdkTypes.js`, `src/entrypoints/sdk/`).

## Relation to the REPL

`initReplBridge.ts` connects the transport to the running Ink session so remote control can inject input, receive transcripts, and synchronize permission prompts with **`PermissionRequest`** / bridge callbacks.

Related: [Permissions](./permissions.md), [Runtime & bootstrap](./runtime-bootstrap.md) (`BRIDGE_MODE` feature gate), [Services](./services.md).

## Key files (starter list)

| File | Role |
|------|------|
| `bridgeMain.ts` | Bridge main loop |
| `bridgeMessaging.ts` | Shared ingress/control parsing |
| `bridgePermissionCallbacks.ts` | Permission callbacks |
| `replBridge.ts` | REPL session bridge wiring |
| `jwtUtils.ts` | JWT authentication helpers |
| `sessionRunner.ts` | Session execution management |
