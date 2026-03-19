#!/usr/bin/env node
/* eslint-disable node/prefer-global/process */
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import { createServer } from './server.js'

async function main(): Promise<void> {
  const server = createServer()
  const transport = new StdioServerTransport()
  await server.connect(transport)
}

main().catch((error) => {
  const message = error instanceof Error ? error.message : String(error)
  // Print fatal errors to stderr only to keep stdio transport clean.
  process.stderr.write(`[@raxium/mcp] Fatal error: ${message}\n`)
  process.exitCode = 1
})
