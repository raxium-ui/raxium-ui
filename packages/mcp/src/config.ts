/* eslint-disable node/prefer-global/process */
const DEFAULT_TIMEOUT_MS = 8000
const DEFAULT_RETRIES = 1

const DEFAULT_REMOTE_ENDPOINTS = {
  listComponents: '/mcp/components',
  listExamples: '/mcp/examples',
  getExample: '/mcp/example',
  listDocuments: '/mcp/documents',
  getDocument: '/mcp/document',
} as const

export interface RemoteConfig {
  baseUrl?: string
  token?: string
  timeoutMs: number
  retries: number
  endpoints: {
    listComponents: string
    listExamples: string
    getExample: string
    listDocuments: string
    getDocument: string
  }
}

function parseOptionalInt(value: string | undefined, fallback: number): number {
  if (!value) {
    return fallback
  }

  const parsed = Number.parseInt(value, 10)
  if (Number.isNaN(parsed) || parsed <= 0) {
    return fallback
  }

  return parsed
}

export function getRemoteConfig(): RemoteConfig {
  return {
    baseUrl: process.env.MCP_REMOTE_BASE_URL,
    token: process.env.MCP_REMOTE_TOKEN,
    timeoutMs: parseOptionalInt(process.env.MCP_TIMEOUT_MS, DEFAULT_TIMEOUT_MS),
    retries: parseOptionalInt(process.env.MCP_REMOTE_RETRIES, DEFAULT_RETRIES),
    endpoints: {
      listComponents:
        process.env.MCP_REMOTE_ENDPOINT_LIST_COMPONENTS ?? DEFAULT_REMOTE_ENDPOINTS.listComponents,
      listExamples:
        process.env.MCP_REMOTE_ENDPOINT_LIST_EXAMPLES ?? DEFAULT_REMOTE_ENDPOINTS.listExamples,
      getExample: process.env.MCP_REMOTE_ENDPOINT_GET_EXAMPLE ?? DEFAULT_REMOTE_ENDPOINTS.getExample,
      listDocuments:
        process.env.MCP_REMOTE_ENDPOINT_LIST_DOCUMENTS ?? DEFAULT_REMOTE_ENDPOINTS.listDocuments,
      getDocument:
        process.env.MCP_REMOTE_ENDPOINT_GET_DOCUMENT ?? DEFAULT_REMOTE_ENDPOINTS.getDocument,
    },
  }
}

export function getRepoRoot(): string {
  return process.env.MCP_REPO_ROOT ?? process.cwd()
}
