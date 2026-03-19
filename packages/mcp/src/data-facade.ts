import type {
  ComponentDataProvider,
  DocumentDetail,
  DocumentSummary,
  ExampleDetail,
  ExampleSummary,
  Framework,
  ToolData,
  ToolFailure,
  ToolSuccess,
} from './types.js'
import { toMcpToolError } from './errors.js'

export class DataFacade {
  private readonly remoteProvider: ComponentDataProvider
  private readonly localProvider: ComponentDataProvider

  constructor(remoteProvider: ComponentDataProvider, localProvider: ComponentDataProvider) {
    this.remoteProvider = remoteProvider
    this.localProvider = localProvider
  }

  listComponents(framework: Framework): Promise<ToolSuccess<string[]> | ToolFailure> {
    return this.executeWithFallback(framework, provider => provider.listComponents(framework))
  }

  listExamples(framework: Framework): Promise<ToolSuccess<ExampleSummary[]> | ToolFailure> {
    return this.executeWithFallback(framework, provider => provider.listExamples(framework))
  }

  getExample(
    framework: Framework,
    componentName: string,
  ): Promise<ToolSuccess<ExampleDetail> | ToolFailure> {
    return this.executeWithFallback(framework, provider => provider.getExample(framework, componentName))
  }

  listDocuments(framework: Framework): Promise<ToolSuccess<DocumentSummary[]> | ToolFailure> {
    return this.executeWithFallback(framework, provider => provider.listDocuments(framework))
  }

  getDocument(
    framework: Framework,
    componentName: string,
  ): Promise<ToolSuccess<DocumentDetail> | ToolFailure> {
    return this.executeWithFallback(framework, provider => provider.getDocument(framework, componentName))
  }

  private async executeWithFallback<T extends ToolData>(
    framework: Framework,
    operation: (provider: ComponentDataProvider) => Promise<T>,
  ): Promise<ToolSuccess<T> | ToolFailure> {
    try {
      const remoteData = await operation(this.remoteProvider)
      return {
        ok: true,
        source: this.remoteProvider.source,
        framework,
        data: remoteData,
      }
    }
    catch (remoteError) {
      const normalizedRemoteError = toMcpToolError(remoteError, 'REMOTE_PROVIDER_ERROR')

      try {
        const localData = await operation(this.localProvider)
        return {
          ok: true,
          source: this.localProvider.source,
          framework,
          data: localData,
        }
      }
      catch (localError) {
        const normalizedLocalError = toMcpToolError(localError, 'LOCAL_PROVIDER_ERROR')

        return {
          ok: false,
          source: 'none',
          framework,
          error: {
            code: normalizedLocalError.code,
            message: normalizedLocalError.message,
            details: {
              remote: {
                code: normalizedRemoteError.code,
                message: normalizedRemoteError.message,
                details: normalizedRemoteError.details,
              },
              local: {
                code: normalizedLocalError.code,
                message: normalizedLocalError.message,
                details: normalizedLocalError.details,
              },
            },
          },
        }
      }
    }
  }
}
