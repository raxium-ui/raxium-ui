export const SUPPORTED_FRAMEWORKS = ['vue'] as const

export type Framework = (typeof SUPPORTED_FRAMEWORKS)[number]

export type DataSource = 'local'

export interface ExampleSummary {
  componentName: string
  exampleIds: string[]
}

export interface ExampleDetail {
  componentName: string
  examples: Array<{
    id: string
    title?: string
    code?: string
    description?: string
    url?: string
  }>
}

export interface DocumentSummary {
  componentName: string
  title?: string
}

export interface DocumentDetail {
  componentName: string
  title?: string
  content?: string
  url?: string
}

export type ToolData
  = | string[]
    | ExampleSummary[]
    | ExampleDetail
    | DocumentSummary[]
    | DocumentDetail

export interface ApiSuccess<T extends ToolData> {
  ok: true
  source: DataSource
  framework: Framework
  data: T
}

export interface ApiFailure {
  ok: false
  source: 'none'
  framework: Framework | 'unknown'
  error: {
    code: string
    message: string
    details?: unknown
  }
}

export type ApiResponse<T extends ToolData> = ApiSuccess<T> | ApiFailure
