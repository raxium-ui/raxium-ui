import type { CSSProperties, RefObject } from 'react'
import { useProgressContext } from '@ark-ui/react/progress'
import { colorHex2RgbObject, colorLab2RgbObject, detectCssColorType } from '@raxium/shared/color'
import { getNodeCssVar } from '@raxium/shared/css'
import { useLayoutEffect, useState } from 'react'

export function useRangeTransfer(
  rangeRef: RefObject<Element | null>,
  variant: 'default' | 'robbin' | 'transfer',
  attribute: 'background' | 'stroke' = 'background',
): CSSProperties {
  const context = useProgressContext()
  const [styles, setStyles] = useState<CSSProperties>({})
  const percent = context.percent ?? 0

  useLayoutEffect(() => {
    if (variant !== 'transfer') {
      setStyles({})
      return
    }
    const step = percent / 100
    const node = rangeRef.current as HTMLElement | null
    const from = detectCssColorType(getNodeCssVar(node, '--transfer-from', '#000'))
    const to = detectCssColorType(getNodeCssVar(node, '--transfer-to', '#fff'))
    if (from.type !== to.type) {
      console.error(new Error('transfer indicator from and to must be same color type'))
      return
    }
    switch (from.type) {
      case 'hex':
      case 'hexa': {
        const fromRGB = colorHex2RgbObject(from.value)
        const toRGB = colorHex2RgbObject(to.value)
        setStyles({
          [attribute]: `rgb(${fromRGB.r + (toRGB.r - fromRGB.r) * step} ${
            fromRGB.g + (toRGB.g - fromRGB.g) * step
          } ${fromRGB.b + (toRGB.b - fromRGB.b) * step})`,
        })
        break
      }
      case 'rgb':
      case 'rgba': {
        setStyles({
          [attribute]: `rgb(${from.value.r + (to.value.r - from.value.r) * step} ${
            from.value.g + (to.value.g - from.value.g) * step
          } ${from.value.b + (to.value.b - from.value.b) * step})`,
        })
        break
      }
      case 'lab': {
        const fromRGB = colorLab2RgbObject(from.value)
        const toRGB = colorLab2RgbObject(to.value)
        setStyles({
          [attribute]: `rgb(${fromRGB.r + (toRGB.r - fromRGB.r) * step} ${
            fromRGB.g + (toRGB.g - fromRGB.g) * step
          } ${fromRGB.b + (toRGB.b - fromRGB.b) * step})`,
        })
        break
      }
      case 'unknown':
        break
      default: {
        const _exhaustive: never = from.type
        return _exhaustive
      }
    }
  }, [attribute, percent, rangeRef, variant])

  return styles
}
