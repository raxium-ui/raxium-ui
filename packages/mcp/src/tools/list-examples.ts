import type { DataFacade } from '../data-facade.js'
import type { Framework } from '../types.js'
import { frameworkOnlyInputSchema, toToolContent } from './shared.js'

export const listExamplesTool = {
  name: 'list-examples',
  description: 'List all supported component examples by framework.',
  inputSchema: frameworkOnlyInputSchema,
}

export function createListExamplesHandler(facade: DataFacade) {
  return async ({ framework }: { framework: Framework }) => {
    const result = await facade.listExamples(framework)
    return {
      content: toToolContent(result),
    }
  }
}
