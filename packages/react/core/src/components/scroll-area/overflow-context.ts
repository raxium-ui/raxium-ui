import { createContext, useContext } from 'react'

export interface ScrollAreaOverflow {
  vertical: boolean
  horizontal: boolean
}

export interface ScrollAreaOverflowContextValue {
  overflow: ScrollAreaOverflow
  setOverflow: (next: ScrollAreaOverflow) => void
}

const defaultOverflow: ScrollAreaOverflow = {
  vertical: false,
  horizontal: false,
}

export const ScrollAreaOverflowContext = createContext<ScrollAreaOverflowContextValue>({
  overflow: defaultOverflow,
  setOverflow: () => {},
})

export function useScrollAreaOverflow(): ScrollAreaOverflow {
  return useContext(ScrollAreaOverflowContext).overflow
}

export function useSetScrollAreaOverflow() {
  return useContext(ScrollAreaOverflowContext).setOverflow
}
