/* eslint-disable node/prefer-global/process */
import type { ApiFailure, ApiSuccess, Framework, ToolData } from './types'
import path from 'node:path'

import { fileURLToPath } from 'node:url'

import Fastify from 'fastify'
import { LocalDataSource } from './data-source'
import { ApiError, toApiError } from './errors'

interface FrameworkOnlyQuery {
  framework?: string
}

interface FrameworkWithComponentQuery extends FrameworkOnlyQuery {
  componentName?: string
}

function resolveRepoRoot(): string {
  const currentFilePath = fileURLToPath(import.meta.url)
  const currentDir = path.dirname(currentFilePath)
  return path.resolve(currentDir, '../../..')
}

function parseFramework(rawFramework: string | undefined): Framework {
  if (rawFramework === 'vue') {
    return rawFramework
  }

  throw new ApiError(
    'FRAMEWORK_NOT_SUPPORTED',
    `Unsupported framework: ${rawFramework ?? 'undefined'}`,
    400,
  )
}

function parseComponentName(rawComponentName: string | undefined): string {
  const componentName = rawComponentName?.trim()
  if (componentName) {
    return componentName
  }

  throw new ApiError('INVALID_COMPONENT_NAME', 'componentName is required', 400)
}

function successResponse<T extends ToolData>(framework: Framework, data: T): ApiSuccess<T> {
  return {
    ok: true,
    source: 'local',
    framework,
    data,
  }
}

function failureResponse(error: ApiError): ApiFailure {
  return {
    ok: false,
    source: 'none',
    framework: error.framework,
    error: {
      code: error.code,
      message: error.message,
      details: error.details,
    },
  }
}

export function createServer() {
  const app = Fastify({
    logger: true,
  })
  const dataSource = new LocalDataSource(resolveRepoRoot())

  app.get<{ Querystring: FrameworkOnlyQuery }>('/mcp/components', async (request, reply) => {
    try {
      const framework = parseFramework(request.query.framework)
      const data = await dataSource.listComponents(framework)
      return reply.code(200).send(successResponse(framework, data))
    }
    catch (error) {
      const normalized = toApiError(error)
      return reply.code(normalized.statusCode).send(failureResponse(normalized))
    }
  })

  app.get<{ Querystring: FrameworkOnlyQuery }>('/mcp/examples', async (request, reply) => {
    try {
      const framework = parseFramework(request.query.framework)
      const data = await dataSource.listExamples(framework)
      return reply.code(200).send(successResponse(framework, data))
    }
    catch (error) {
      const normalized = toApiError(error)
      return reply.code(normalized.statusCode).send(failureResponse(normalized))
    }
  })

  app.get<{ Querystring: FrameworkWithComponentQuery }>(
    '/mcp/example',
    async (request, reply) => {
      try {
        const framework = parseFramework(request.query.framework)
        const componentName = parseComponentName(request.query.componentName)
        const data = await dataSource.getExample(framework, componentName)
        return reply.code(200).send(successResponse(framework, data))
      }
      catch (error) {
        const normalized = toApiError(error)
        return reply.code(normalized.statusCode).send(failureResponse(normalized))
      }
    },
  )

  app.get<{ Querystring: FrameworkOnlyQuery }>('/mcp/documents', async (request, reply) => {
    try {
      const framework = parseFramework(request.query.framework)
      const data = await dataSource.listDocuments(framework)
      return reply.code(200).send(successResponse(framework, data))
    }
    catch (error) {
      const normalized = toApiError(error)
      return reply.code(normalized.statusCode).send(failureResponse(normalized))
    }
  })

  app.get<{ Querystring: FrameworkWithComponentQuery }>(
    '/mcp/document',
    async (request, reply) => {
      try {
        const framework = parseFramework(request.query.framework)
        const componentName = parseComponentName(request.query.componentName)
        const data = await dataSource.getDocument(framework, componentName)
        return reply.code(200).send(successResponse(framework, data))
      }
      catch (error) {
        const normalized = toApiError(error)
        return reply.code(normalized.statusCode).send(failureResponse(normalized))
      }
    },
  )

  return app
}

const port = Number.parseInt(process.env.PORT ?? '4398', 10)
const host = process.env.HOST ?? '0.0.0.0'

const app = createServer()
// eslint-disable-next-line antfu/no-top-level-await
await app.listen({ port, host })
