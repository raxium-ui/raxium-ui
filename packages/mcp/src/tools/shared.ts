import { z } from 'zod'

import { SUPPORTED_FRAMEWORKS } from '../types.js'

export const frameworkSchema = z.enum(SUPPORTED_FRAMEWORKS)

export const frameworkOnlyInputSchema = z.object({
  framework: frameworkSchema,
}).strict()

export const frameworkWithComponentInputSchema = z.object({
  framework: frameworkSchema,
  componentName: z.string().min(1),
}).strict()

export function toToolContent(payload: unknown): Array<{ type: 'text', text: string }> {
  return [
    {
      type: 'text',
      text: JSON.stringify(payload, null, 2),
    },
  ]
}
