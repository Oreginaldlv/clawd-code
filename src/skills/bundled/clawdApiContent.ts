// Content for the clawd-api bundled skill.
// Each .md file is inlined as a string at build time via Bun's text loader.

import csharpClawdApi from './clawd-api/csharp/clawd-api.md'
import curlExamples from './clawd-api/curl/examples.md'
import goClawdApi from './clawd-api/go/clawd-api.md'
import javaClawdApi from './clawd-api/java/clawd-api.md'
import phpClawdApi from './clawd-api/php/clawd-api.md'
import pythonAgentSdkPatterns from './clawd-api/python/agent-sdk/patterns.md'
import pythonAgentSdkReadme from './clawd-api/python/agent-sdk/README.md'
import pythonClawdApiBatches from './clawd-api/python/clawd-api/batches.md'
import pythonClawdApiFilesApi from './clawd-api/python/clawd-api/files-api.md'
import pythonClawdApiReadme from './clawd-api/python/clawd-api/README.md'
import pythonClawdApiStreaming from './clawd-api/python/clawd-api/streaming.md'
import pythonClawdApiToolUse from './clawd-api/python/clawd-api/tool-use.md'
import rubyClawdApi from './clawd-api/ruby/clawd-api.md'
import skillPrompt from './clawd-api/SKILL.md'
import sharedErrorCodes from './clawd-api/shared/error-codes.md'
import sharedLiveSources from './clawd-api/shared/live-sources.md'
import sharedModels from './clawd-api/shared/models.md'
import sharedPromptCaching from './clawd-api/shared/prompt-caching.md'
import sharedToolUseConcepts from './clawd-api/shared/tool-use-concepts.md'
import typescriptAgentSdkPatterns from './clawd-api/typescript/agent-sdk/patterns.md'
import typescriptAgentSdkReadme from './clawd-api/typescript/agent-sdk/README.md'
import typescriptClawdApiBatches from './clawd-api/typescript/clawd-api/batches.md'
import typescriptClawdApiFilesApi from './clawd-api/typescript/clawd-api/files-api.md'
import typescriptClawdApiReadme from './clawd-api/typescript/clawd-api/README.md'
import typescriptClawdApiStreaming from './clawd-api/typescript/clawd-api/streaming.md'
import typescriptClawdApiToolUse from './clawd-api/typescript/clawd-api/tool-use.md'

// @[MODEL LAUNCH]: Update the model IDs/names below. These are substituted into {{VAR}}
// placeholders in the .md files at runtime before the skill prompt is sent.
// After updating these constants, manually update the two files that still hardcode models:
//   - clawd-api/SKILL.md (Current Models pricing table)
//   - clawd-api/shared/models.md (full model catalog with legacy versions and alias mappings)
export const SKILL_MODEL_VARS = {
  OPUS_ID: 'clawd-opus-4-6',
  OPUS_NAME: 'Clawd Opus 4.6',
  SONNET_ID: 'clawd-sonnet-4-6',
  SONNET_NAME: 'Clawd Sonnet 4.6',
  HAIKU_ID: 'clawd-haiku-4-5',
  HAIKU_NAME: 'Clawd Haiku 4.5',
  // Previous Sonnet ID — used in "do not append date suffixes" example in SKILL.md.
  PREV_SONNET_ID: 'clawd-sonnet-4-5',
} satisfies Record<string, string>

export const SKILL_PROMPT: string = skillPrompt

export const SKILL_FILES: Record<string, string> = {
  'csharp/clawd-api.md': csharpClawdApi,
  'curl/examples.md': curlExamples,
  'go/clawd-api.md': goClawdApi,
  'java/clawd-api.md': javaClawdApi,
  'php/clawd-api.md': phpClawdApi,
  'python/agent-sdk/README.md': pythonAgentSdkReadme,
  'python/agent-sdk/patterns.md': pythonAgentSdkPatterns,
  'python/clawd-api/README.md': pythonClawdApiReadme,
  'python/clawd-api/batches.md': pythonClawdApiBatches,
  'python/clawd-api/files-api.md': pythonClawdApiFilesApi,
  'python/clawd-api/streaming.md': pythonClawdApiStreaming,
  'python/clawd-api/tool-use.md': pythonClawdApiToolUse,
  'ruby/clawd-api.md': rubyClawdApi,
  'shared/error-codes.md': sharedErrorCodes,
  'shared/live-sources.md': sharedLiveSources,
  'shared/models.md': sharedModels,
  'shared/prompt-caching.md': sharedPromptCaching,
  'shared/tool-use-concepts.md': sharedToolUseConcepts,
  'typescript/agent-sdk/README.md': typescriptAgentSdkReadme,
  'typescript/agent-sdk/patterns.md': typescriptAgentSdkPatterns,
  'typescript/clawd-api/README.md': typescriptClawdApiReadme,
  'typescript/clawd-api/batches.md': typescriptClawdApiBatches,
  'typescript/clawd-api/files-api.md': typescriptClawdApiFilesApi,
  'typescript/clawd-api/streaming.md': typescriptClawdApiStreaming,
  'typescript/clawd-api/tool-use.md': typescriptClawdApiToolUse,
}
