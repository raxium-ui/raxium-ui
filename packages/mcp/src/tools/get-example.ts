import type { DataFacade } from '../data-facade.js'
import { frameworkWithComponentInputSchema, toToolContent } from './shared.js'

export const getExampleTool = {
  name: 'get-example',
  description: 'Get the examples for a component in a framework.',
  inputSchema: frameworkWithComponentInputSchema,
}

export function createGetExampleHandler(facade: DataFacade) {
  return async ({ framework, componentName }: { framework: 'vue', componentName: string }) => {
    const result = await facade.getExample(framework, componentName)
    return {
      content: toToolContent(result),
    }
  }
}
