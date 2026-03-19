export const SUPPORTED_FRAMEWORKS = ['vue'] as const

export type Framework = (typeof SUPPORTED_FRAMEWORKS)[number]

export type DataSource = 'remote' | 'local'

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

export interface ToolSuccess<T extends ToolData> {
  ok: true
  source: DataSource
  framework: Framework
  data: T
}

export interface ToolFailure {
  ok: false
  source: DataSource | 'none'
  framework: Framework
  error: {
    code: string
    message: string
    details?: unknown
  }
}

export type ToolResult<T extends ToolData> = ToolSuccess<T> | ToolFailure

export interface ComponentDataProvider {
  readonly source: DataSource
  listComponents: (framework: Framework) => Promise<string[]>
  listExamples: (framework: Framework) => Promise<ExampleSummary[]>
  getExample: (framework: Framework, componentName: string) => Promise<ExampleDetail>
  listDocuments: (framework: Framework) => Promise<DocumentSummary[]>
  getDocument: (framework: Framework, componentName: string) => Promise<DocumentDetail>
}
