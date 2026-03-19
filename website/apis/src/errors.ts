import type { Framework } from './types'

export class ApiError extends Error {
  public readonly code: string
  public readonly statusCode: number
  public readonly details?: unknown
  public readonly framework: Framework | 'unknown'

  constructor(
    code: string,
    message: string,
    statusCode: number,
    framework: Framework | 'unknown' = 'unknown',
    details?: unknown,
  ) {
    super(message)
    this.name = 'ApiError'
    this.code = code
    this.statusCode = statusCode
    this.framework = framework
    this.details = details
  }
}

export function toApiError(error: unknown): ApiError {
  if (error instanceof ApiError) {
    return error
  }

  if (error instanceof Error) {
    return new ApiError('UNKNOWN_ERROR', error.message, 500)
  }

  return new ApiError('UNKNOWN_ERROR', 'Unknown error occurred', 500, 'unknown', { raw: error })
}
