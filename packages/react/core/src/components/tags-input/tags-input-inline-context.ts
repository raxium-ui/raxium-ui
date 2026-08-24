import { createContext, useContext } from 'react'

const TagsInputInlineContext = createContext(true)

export const TagsInputInlineProvider = TagsInputInlineContext.Provider

export function useTagsInputInline(): boolean {
  return useContext(TagsInputInlineContext)
}
