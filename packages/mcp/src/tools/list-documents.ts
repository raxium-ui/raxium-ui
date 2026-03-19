import type { DataFacade } from '../data-facade.js'
import { frameworkOnlyInputSchema, toToolContent } from './shared.js'

export const listDocumentsTool = {
  name: 'list-documents',
  description: 'List all supported component documents by framework.',
  inputSchema: frameworkOnlyInputSchema,
}

export function createListDocumentsHandler(facade: DataFacade) {
  return async ({ framework }: { framework: 'vue' }) => {
    const result = await facade.listDocuments(framework)
    return {
      content: toToolContent(result),
    }
  }
}
