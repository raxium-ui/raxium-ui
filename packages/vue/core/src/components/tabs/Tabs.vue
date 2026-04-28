<script setup lang="ts">
import type { TabsRootEmits } from '@ark-ui/vue/tabs'
import type { TabsProps } from '.'
import { useForwardExpose, useForwardProps } from '@ark-ui/vue'
import { Tabs, useTabs } from '@ark-ui/vue/tabs'
import { clsx } from '@raxium/themes/utils'
import { useTheme } from '@raxium/vue/composables/useTheme'
import { ThemeProvider } from '@raxium/vue/providers/theme'
import { computed, ref, useTemplateRef, watch } from 'vue'
import TabsProviderEx from './TabsProviderEx.vue'

const { class: propsClass, theme: propsTheme, ...props } = defineProps<TabsProps>()
const emit = defineEmits<TabsRootEmits>()
const forwarded = useForwardProps(props)
const tabs = useTabs(forwarded, emit)
const tabsRoot = useTemplateRef('tabsRoot')

const triggerDomRevision = ref(0) // 单纯的计数器，用于触发dom变化后的computed/watchEffect
watch(
  () => tabsRoot.value?.$el as Element | undefined,
  (rootEl) => {
    if (!rootEl)
      return
    const observer = new MutationObserver(() => {
      triggerDomRevision.value++
    })
    observer.observe(rootEl, { childList: true, subtree: true })
    return () => observer.disconnect()
  },
  { flush: 'post', immediate: true },
)

const index = computed(() => {
  triggerDomRevision.value
  if (!tabsRoot.value?.$el)
    return 0
  const tabTriggerEls = Array.from(
    tabsRoot.value?.$el.querySelectorAll('[data-part="trigger"]'),
  ) as HTMLElement[]
  if (!tabTriggerEls.length)
    return 0
  const curIndex = tabTriggerEls.findIndex(
    el => el.getAttribute('data-value') === tabs.value.value,
  )
  return curIndex < 0 ? 0 : curIndex
})

// theme
const theme = useTheme(() => propsTheme)
const crafts = computed(() => theme.value.crafts.tvTabs())

// expose
defineExpose({ $api: tabs })
useForwardExpose()
</script>

<template>
  <Tabs.RootProvider
    ref="tabsRoot"
    :value="tabs"
    :lazy-mount="forwarded.lazyMount"
    :unmount-on-exit="forwarded.unmountOnExit"
    :class="crafts.root({ class: clsx(propsClass), ...theme })"
  >
    <TabsProviderEx
      :value="{
        index,
        orientation: forwarded.orientation ?? 'horizontal',
        domRevision: triggerDomRevision,
      }"
    >
      <ThemeProvider :value="theme">
        <slot />
      </ThemeProvider>
    </TabsProviderEx>
  </Tabs.RootProvider>
</template>
