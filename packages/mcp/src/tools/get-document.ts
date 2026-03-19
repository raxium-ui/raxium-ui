import type { DataFacade } from '../data-facade.js'
import { frameworkWithComponentInputSchema, toToolContent } from './shared.js'

export const getDocumentTool = {
  name: 'get-document',
  description: 'Get the document for a component in a framework.',
  inputSchema: frameworkWithComponentInputSchema,
}

export function createGetDocumentHandler(facade: DataFacade) {
  return async ({ framework, componentName }: { framework: 'vue', componentName: string }) => {
    const result = await facade.getDocument(framework, componentName)
    return {
      content: toToolContent(result),
    }
  }
}
