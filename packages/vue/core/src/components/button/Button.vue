<script setup lang="ts">
import type { ButtonProps } from '.'
import { useForwardExpose } from '@ark-ui/vue'
import { ark } from '@ark-ui/vue/factory'
import { getNodeCssVar } from '@raxium/shared/css'
import { cxc } from '@raxium/themes/utils'
import { useCraft } from '@raxium/vue/composables/useCraft'
import { useRipple } from '@raxium/vue/composables/useRipple'
import { useTheme } from '@raxium/vue/composables/useTheme'
import { LoaderCircle } from 'lucide-vue-next'
import { computed } from 'vue'

const {
  variant = 'solid',
  color = 'primary',
  class: propsClass,
  theme: propsTheme,
  craft,
  disabled,
  ripple = false,
  loading = false,
  asChild = false,
  ui,
} = defineProps<ButtonProps>()

const emits = defineEmits<{
  click: [event: MouseEvent]
}>()
const slots = defineSlots<{
  default?: () => any
  tooltip?: () => any
  loading?: () => any
}>()

const { forwardRef, currentElement } = useForwardExpose()
const rippleColor = computed(() => {
  return getNodeCssVar(currentElement.value, '--rui-ripple-color', 'transparent')
})
const { onRipple, Ripple } = useRipple(currentElement, {
  enabled: ripple && !disabled,
  color: rippleColor,
})

function onClick(event: MouseEvent) {
  onRipple(event)
  emits('click', event)
}

// theme — useCraft pre-binds variants so slot calls only need { class }
const theme = useTheme(
  () => propsTheme,
  () => craft,
)
const crafts = useCraft(theme, 'tvButton', () => ({
  variant,
  color,
  loading,
}))
</script>

<template>
  <ark.button
    :ref="forwardRef"
    :class="crafts.root(cxc(ui?.root, propsClass))"
    :disabled="disabled"
    :data-variant="variant"
    :data-color="color"
    :data-ripple="ripple ? true : undefined"
    :data-loading="loading ? true : undefined"
    :data-size="theme.size"
    :as-child="asChild"
    @click="onClick"
  >
    <slot
      v-if="loading"
      name="loading"
    >
      <LoaderCircle :class="crafts.loading(cxc(ui?.loading))" />
    </slot>
    <slot />
    <Ripple v-if="ripple" />
  </ark.button>
</template>
