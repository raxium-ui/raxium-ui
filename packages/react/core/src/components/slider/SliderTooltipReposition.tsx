import { useTooltipContext } from '@ark-ui/react/tooltip'
import { useEffect, useRef } from 'react'
import { useSliderBoundary } from './slider-boundary-context'

export function SliderTooltipReposition({ valueKey }: { valueKey: string }) {
  const tooltip = useTooltipContext()
  const boundary = useSliderBoundary()
  const seenBoundaryRef = useRef(false)

  useEffect(() => {
    if (seenBoundaryRef.current)
      return
    if (boundary instanceof Element || Array.isArray(boundary)) {
      seenBoundaryRef.current = true
      setTimeout(() => tooltip.reposition())
    }
  }, [boundary, tooltip])

  useEffect(() => {
    tooltip.reposition()
  }, [tooltip, valueKey])

  return null
}
