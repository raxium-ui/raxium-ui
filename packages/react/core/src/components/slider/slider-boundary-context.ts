import { createContext, useContext } from 'react'

export type SliderBoundary = 'clippingAncestors' | Element | Array<Element> | undefined

const SliderBoundaryContext = createContext<SliderBoundary>(undefined)

export const SliderBoundaryProvider = SliderBoundaryContext.Provider

export function useSliderBoundary(): SliderBoundary {
  return useContext(SliderBoundaryContext)
}
