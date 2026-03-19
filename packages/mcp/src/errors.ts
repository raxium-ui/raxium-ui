export class McpToolError extends Error {
  public readonly code: string
  public readonly details?: unknown

  constructor(code: string, message: string, details?: unknown) {
    super(message)
    this.name = 'McpToolError'
    this.code = code
    this.details = details
  }
}

export function toMcpToolError(error: unknown, fallbackCode = 'UNKNOWN_ERROR'): McpToolError {
  if (error instanceof McpToolError) {
    return error
  }

  if (error instanceof Error) {
    return new McpToolError(fallbackCode, error.message)
  }

  return new McpToolError(fallbackCode, 'Unknown error occurred', { raw: error })
}
