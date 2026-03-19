import type { DataFacade } from '../data-facade.js'
import { frameworkOnlyInputSchema, toToolContent } from './shared.js'

export const listComponentsTool = {
  name: 'list-components',
  description: 'List all supported component names by framework.',
  inputSchema: frameworkOnlyInputSchema,
}

export function createListComponentsHandler(facade: DataFacade) {
  return async ({ framework }: { framework: 'vue' }) => {
    const result = await facade.listComponents(framework)
    return {
      content: toToolContent(result),
    }
  }
}
