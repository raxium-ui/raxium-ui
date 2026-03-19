import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'

import { getRemoteConfig, getRepoRoot } from './config.js'
import { DataFacade } from './data-facade.js'
import { LocalFallbackProvider } from './providers/local-fallback.js'
import { RemoteProvider } from './providers/remote-provider.js'
import { createGetDocumentHandler, getDocumentTool } from './tools/get-document.js'
import { createGetExampleHandler, getExampleTool } from './tools/get-example.js'
import { createListComponentsHandler, listComponentsTool } from './tools/list-components.js'
import { createListDocumentsHandler, listDocumentsTool } from './tools/list-documents.js'
import { createListExamplesHandler, listExamplesTool } from './tools/list-examples.js'

export function createServer(): McpServer {
  const remoteProvider = new RemoteProvider(getRemoteConfig())
  const localProvider = new LocalFallbackProvider(getRepoRoot())
  const facade = new DataFacade(remoteProvider, localProvider)

  const server = new McpServer(
    {
      name: '@raxium/mcp',
      version: '0.1.0',
    },
    {
      instructions:
        'Use this server to list components/examples/documents and fetch component example/document by framework.',
    },
  )

  server.registerTool(
    listComponentsTool.name,
    {
      description: listComponentsTool.description,
      inputSchema: listComponentsTool.inputSchema,
    },
    createListComponentsHandler(facade),
  )

  server.registerTool(
    listExamplesTool.name,
    {
      description: listExamplesTool.description,
      inputSchema: listExamplesTool.inputSchema,
    },
    createListExamplesHandler(facade),
  )

  server.registerTool(
    getExampleTool.name,
    {
      description: getExampleTool.description,
      inputSchema: getExampleTool.inputSchema,
    },
    createGetExampleHandler(facade),
  )

  server.registerTool(
    listDocumentsTool.name,
    {
      description: listDocumentsTool.description,
      inputSchema: listDocumentsTool.inputSchema,
    },
    createListDocumentsHandler(facade),
  )

  server.registerTool(
    getDocumentTool.name,
    {
      description: getDocumentTool.description,
      inputSchema: getDocumentTool.inputSchema,
    },
    createGetDocumentHandler(facade),
  )

  return server
}
