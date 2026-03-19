import type { RemoteConfig } from '../config.js'

import type {
  ComponentDataProvider,
  DocumentDetail,
  DocumentSummary,
  ExampleDetail,
  ExampleSummary,
  Framework,
} from '../types.js'
import { URL } from 'node:url'
import { McpToolError } from '../errors.js'

interface RemoteSuccessPayload {
  data?: unknown
  result?: unknown
}

function normalizeObjectLikePayload(payload: unknown): RemoteSuccessPayload {
  if (!payload || typeof payload !== 'object') {
    return {}
  }

  return payload as RemoteSuccessPayload
}

function ensureStringArray(value: unknown, errorCode: string): string[] {
  if (!Array.isArray(value)) {
    throw new McpToolError(errorCode, 'Remote payload is not an array')
  }

  const normalized = value.filter(item => typeof item === 'string')
  if (normalized.length !== value.length) {
    throw new McpToolError(errorCode, 'Remote payload contains non-string items')
  }

  return normalized
}

function normalizeExampleSummaryList(value: unknown): ExampleSummary[] {
  if (!Array.isArray(value)) {
    throw new McpToolError('REMOTE_PAYLOAD_INVALID', 'Examples list payload must be an array')
  }

  return value.map((item) => {
    if (!item || typeof item !== 'object') {
      throw new McpToolError('REMOTE_PAYLOAD_INVALID', 'Example list item must be an object')
    }

    const componentName = typeof (item as Record<string, unknown>).componentName === 'string'
      ? (item as Record<string, unknown>).componentName as string
      : undefined

    const rawIds = (item as Record<string, unknown>).exampleIds

    if (!componentName || !Array.isArray(rawIds)) {
      throw new McpToolError('REMOTE_PAYLOAD_INVALID', 'Example list item is missing fields')
    }

    const exampleIds = rawIds.filter(entry => typeof entry === 'string') as string[]

    return { componentName, exampleIds }
  })
}

function normalizeExampleDetail(value: unknown, componentName: string): ExampleDetail {
  if (!value || typeof value !== 'object') {
    throw new McpToolError('REMOTE_PAYLOAD_INVALID', 'Example payload must be an object')
  }

  const payload = value as Record<string, unknown>
  const rawExamples = payload.examples
  if (!Array.isArray(rawExamples)) {
    throw new McpToolError('REMOTE_PAYLOAD_INVALID', 'Example payload missing examples array')
  }

  const examples = rawExamples.map((entry, index) => {
    if (!entry || typeof entry !== 'object') {
      throw new McpToolError('REMOTE_PAYLOAD_INVALID', `Example[${index}] must be an object`)
    }

    const candidate = entry as Record<string, unknown>
    const id = typeof candidate.id === 'string' ? candidate.id : `example-${index + 1}`

    return {
      id,
      title: typeof candidate.title === 'string' ? candidate.title : undefined,
      code: typeof candidate.code === 'string' ? candidate.code : undefined,
      description: typeof candidate.description === 'string' ? candidate.description : undefined,
      url: typeof candidate.url === 'string' ? candidate.url : undefined,
    }
  })

  const remoteComponentName
    = typeof payload.componentName === 'string' ? payload.componentName : componentName

  return {
    componentName: remoteComponentName,
    examples,
  }
}

function normalizeDocumentSummaryList(value: unknown): DocumentSummary[] {
  if (!Array.isArray(value)) {
    throw new McpToolError('REMOTE_PAYLOAD_INVALID', 'Document list payload must be an array')
  }

  return value.map((item) => {
    if (!item || typeof item !== 'object') {
      throw new McpToolError('REMOTE_PAYLOAD_INVALID', 'Document list item must be an object')
    }

    const candidate = item as Record<string, unknown>
    if (typeof candidate.componentName !== 'string') {
      throw new McpToolError('REMOTE_PAYLOAD_INVALID', 'Document list item missing componentName')
    }

    return {
      componentName: candidate.componentName,
      title: typeof candidate.title === 'string' ? candidate.title : undefined,
    }
  })
}

function normalizeDocumentDetail(value: unknown, componentName: string): DocumentDetail {
  if (!value || typeof value !== 'object') {
    throw new McpToolError('REMOTE_PAYLOAD_INVALID', 'Document payload must be an object')
  }

  const payload = value as Record<string, unknown>
  const remoteComponentName
    = typeof payload.componentName === 'string' ? payload.componentName : componentName

  return {
    componentName: remoteComponentName,
    title: typeof payload.title === 'string' ? payload.title : undefined,
    content: typeof payload.content === 'string' ? payload.content : undefined,
    url: typeof payload.url === 'string' ? payload.url : undefined,
  }
}

export class RemoteProvider implements ComponentDataProvider {
  public readonly source = 'remote' as const

  private readonly config: RemoteConfig

  constructor(config: RemoteConfig) {
    this.config = config
  }

  async listComponents(framework: Framework): Promise<string[]> {
    const payload = await this.requestJson(this.config.endpoints.listComponents, { framework })
    const body = normalizeObjectLikePayload(payload)
    const target = body.data ?? body.result ?? payload
    return ensureStringArray(target, 'REMOTE_COMPONENTS_INVALID')
  }

  async listExamples(framework: Framework): Promise<ExampleSummary[]> {
    const payload = await this.requestJson(this.config.endpoints.listExamples, { framework })
    const body = normalizeObjectLikePayload(payload)
    const target = body.data ?? body.result ?? payload
    return normalizeExampleSummaryList(target)
  }

  async getExample(framework: Framework, componentName: string): Promise<ExampleDetail> {
    const payload = await this.requestJson(this.config.endpoints.getExample, {
      framework,
      componentName,
    })
    const body = normalizeObjectLikePayload(payload)
    const target = body.data ?? body.result ?? payload
    return normalizeExampleDetail(target, componentName)
  }

  async listDocuments(framework: Framework): Promise<DocumentSummary[]> {
    const payload = await this.requestJson(this.config.endpoints.listDocuments, { framework })
    const body = normalizeObjectLikePayload(payload)
    const target = body.data ?? body.result ?? payload
    return normalizeDocumentSummaryList(target)
  }

  async getDocument(framework: Framework, componentName: string): Promise<DocumentDetail> {
    const payload = await this.requestJson(this.config.endpoints.getDocument, {
      framework,
      componentName,
    })
    const body = normalizeObjectLikePayload(payload)
    const target = body.data ?? body.result ?? payload
    return normalizeDocumentDetail(target, componentName)
  }

  private async requestJson(pathname: string, query: Record<string, string>): Promise<unknown> {
    if (!this.config.baseUrl) {
      throw new McpToolError(
        'REMOTE_NOT_CONFIGURED',
        'MCP_REMOTE_BASE_URL is required for remote-first mode',
      )
    }

    const url = new URL(pathname, this.config.baseUrl)
    for (const [key, value] of Object.entries(query)) {
      url.searchParams.set(key, value)
    }

    let lastError: unknown
    const attempts = this.config.retries + 1

    for (let attempt = 1; attempt <= attempts; attempt += 1) {
      const controller = new AbortController()
      const timeout = setTimeout(() => controller.abort(), this.config.timeoutMs)

      try {
        const headers: Record<string, string> = {
          Accept: 'application/json',
        }
        if (this.config.token) {
          headers.Authorization = `Bearer ${this.config.token}`
        }

        const response = await fetch(url, {
          method: 'GET',
          headers,
          signal: controller.signal,
        })

        if (!response.ok) {
          throw new McpToolError('REMOTE_HTTP_ERROR', `Remote request failed: ${response.status}`, {
            status: response.status,
            url: url.toString(),
          })
        }

        return await response.json()
      }
      catch (error) {
        lastError = error
        if (attempt === attempts) {
          break
        }
      }
      finally {
        clearTimeout(timeout)
      }
    }

    throw new McpToolError('REMOTE_REQUEST_FAILED', 'Remote request failed after retries', {
      url: url.toString(),
      reason: lastError instanceof Error ? lastError.message : String(lastError),
    })
  }
}
