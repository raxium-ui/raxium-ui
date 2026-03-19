import type { CSSProperties, Ref } from 'vue'
import { useProgressContext } from '@ark-ui/vue'
import { colorHex2RgbObject, colorLab2RgbObject, detectCssColorType } from '@raxium/shared/color'
import { getNodeCssVar } from '@raxium/shared/css'
import { computed, reactive, watchEffect } from 'vue'

export function useRangeTransfer(
  range: Ref<{ $el: HTMLDivElement } | null>,
  variant: Ref<'default' | 'robbin' | 'transfer'>,
  attribute: 'background' | 'stroke' = 'background',
) {
  if (variant.value === 'transfer') {
    const context = useProgressContext()
    const step = computed(() => {
      return (context.value.percent ?? 0) / 100
    })
    const styles = reactive({ [attribute]: '' })
    watchEffect(
      () => {
        const from = detectCssColorType(getNodeCssVar(range.value?.$el, '--transfer-from', '#000'))
        const to = detectCssColorType(getNodeCssVar(range.value?.$el, '--transfer-to', '#fff'))

        if (from.type !== to.type) {
          console.error(new Error('transfer indicator from and to must be same color type'))
          return {} as CSSProperties
        }
        switch (from.type) {
          case 'hex':
          case 'hexa': {
            const fromRGB = colorHex2RgbObject(from.value)
            const toRGB = colorHex2RgbObject(to.value)
            styles[attribute] = `rgb(${fromRGB.r + (toRGB.r - fromRGB.r) * step.value} ${
              fromRGB.g + (toRGB.g - fromRGB.g) * step.value
            } ${fromRGB.b + (toRGB.b - fromRGB.b) * step.value})`
            break
          }
          case 'rgb':
          case 'rgba': {
            styles[attribute] = `rgb(${from.value.r + (to.value.r - from.value.r) * step.value} ${
              from.value.g + (to.value.g - from.value.g) * step.value
            } ${from.value.b + (to.value.b - from.value.b) * step.value})`
            break
          }
          case 'lab': {
            const fromRGB = colorLab2RgbObject(from.value)
            const toRGB = colorLab2RgbObject(to.value)
            styles[attribute] = `rgb(${fromRGB.r + (toRGB.r - fromRGB.r) * step.value} ${
              fromRGB.g + (toRGB.g - fromRGB.g) * step.value
            } ${fromRGB.b + (toRGB.b - fromRGB.b) * step.value})`
            break
          }
        }
      },
      { flush: 'post' },
    )
    return { styles }
  }
  return { styles: {} }
}
