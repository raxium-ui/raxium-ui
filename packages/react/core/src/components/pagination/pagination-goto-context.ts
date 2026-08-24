import { createContext, useContext } from 'react'

export interface PaginationGoToContextValue {
  goInputPage: () => void
}

const PaginationGoToContext = createContext<PaginationGoToContextValue>({
  goInputPage: () => {},
})

export const PaginationGoToProvider = PaginationGoToContext.Provider

export function usePaginationGoTo(): PaginationGoToContextValue {
  return useContext(PaginationGoToContext)
}
