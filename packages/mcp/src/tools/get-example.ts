import type { DataFacade } from '../data-facade.js'
import type { Framework } from '../types.js'
import { frameworkWithComponentInputSchema, toToolContent } from './shared.js'

export const getExampleTool = {
  name: 'get-example',
  description: 'Get the examples for a component in a framework.',
  inputSchema: frameworkWithComponentInputSchema,
}

export function createGetExampleHandler(facade: DataFacade) {
  return async ({ framework, componentName }: { framework: Framework, componentName: string }) => {
    const result = await facade.getExample(framework, componentName)
    return {
      content: toToolContent(result),
    }
  }
}
