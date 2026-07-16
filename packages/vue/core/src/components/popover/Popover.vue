<script lang="ts"></script>

<script setup lang="ts">
import type { PopoverRootEmits, UsePopoverReturn } from '@ark-ui/vue/popover'
import type { PopoverProps } from '.'
import { Popover, usePopover } from '@ark-ui/vue/popover'
import { useForwardExpose, useForwardProps } from '@ark-ui/vue/utils'
import { useConfig } from '@raxium/vue/composables/useConfig'
import { useProvideComponentTheme } from '@raxium/vue/composables/useProvideComponentTheme'
import { useTheme } from '@raxium/vue/composables/useTheme'
import { useThemeCraft } from '@raxium/vue/composables/useThemeCraft'
import { defaults } from 'es-toolkit/compat'
import { computed, mergeProps } from 'vue'

const {
  theme: propsTheme,
  craft,
  unmountOnExit = undefined,
  lazyMount = undefined,
  ...props
} = defineProps<PopoverProps>()
const emit = defineEmits<PopoverRootEmits>()
const popoverConfig = useConfig('popover', () => ({ unmountOnExit, lazyMount }))
const forwarded = useForwardProps(props)
const popover = usePopover(
  computed(() =>
    mergeProps(forwarded.value, {
      positioning: defaults(
        { ...(forwarded.value.positioning ?? {}) },
        { placement: popoverConfig.value?.placement },
      ),
    }),
  ),
  emit,
)

// theme
const theme = useTheme(() => propsTheme, () => popoverConfig.value?.theme)
const themed = useThemeCraft(theme, 'tvPopover', () => craft)
useProvideComponentTheme(themed, () => propsTheme)

// expose
defineExpose({ $api: popover as UsePopoverReturn })
useForwardExpose()
</script>

<template>
  <Popover.RootProvider
    :value="popover"
    :lazy-mount="popoverConfig?.lazyMount"
    :unmount-on-exit="popoverConfig?.unmountOnExit"
  >
    <slot />
  </Popover.RootProvider>
</template>
