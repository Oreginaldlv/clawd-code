# Introduction

This repository hosts a **static mirror of a TypeScript `src/` tree** for **educational use, defensive security research, and software supply-chain analysis**. It is maintained by an independent university student as a personal research project.

**Naming.** **Splinterworks**, **Clawd**, and **Clawd Code** are fictional stand-ins for a vendor, assistant, and terminal coding-agent CLI—same spirit as **Macrohard** for a giant software company. They name a _style_ of product for this mirror, not a real shipping brand.

## Purpose and acceptable use

This archive exists to support:

- study of **build artifacts, packaging, and release-process risks** in real-world CLI tooling
- **secure software engineering** and **defensive** analysis of agentic developer tools
- **architecture review** and discussion of how such systems are structured

Use it only in ways that comply with applicable law and third-party terms. Do **not** use this repository to harm others, bypass security, or misuse upstream services.

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

## How to use these docs

1. Read [Tech stack](./tech-stack.md) for runtime and libraries.
2. Skim [Architecture overview](../architecture/overview.md) for subsystem relationships.
3. Use [Directory map](../reference/directory-map.md) and [Generated src index](../reference/src-index.md) to locate folders and files in your editor.

For **how code runs** (bootstrap → query loop → tools), see [Architecture overview](../architecture/overview.md) and the **Execution** pages in the sidebar.

Next: [Important notice](./notice.md).
