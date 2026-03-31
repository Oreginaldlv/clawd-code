---
layout: home

hero:
  name: Clawd Code
  text: src documentation
  tagline: Navigable map of the mirrored TypeScript tree for study and architecture review.
  actions:
    - theme: brand
      text: Start with the guide
      link: /guide/introduction
    - theme: alt
      text: Architecture overview
      link: /architecture/overview

features:
  - title: Guide
    details: Purpose, legal notice, tech stack, and how to read this codebase. <a href="/guide/introduction">Open the guide</a>.
  - title: Architecture
    details: Tools, commands, services, bridge, permissions, plugins, and skills. <a href="/architecture/overview">Open architecture</a>.
  - title: Reference
    details: Directory map, key files, feature flags, patterns, and a generated src/ index. <a href="/reference/directory-map">Open reference</a>.
---

## Local docs server

From the repository root:

```bash
npm install
npm run docs:dev
```

Regenerate the machine-built `src/` listing (also runs automatically before `docs:build`):

```bash
npm run docs:gen
```

Open the mirrored source in your editor using paths like `src/main.tsx` — the site explains structure; it does not embed every source file.

The **Architecture → Execution** section walks through **startup**, the **LLM/query loop**, **tool batching and permissions**, and ties them to concrete files (`main.tsx`, `query.ts`, `toolOrchestration.ts`, etc.).
