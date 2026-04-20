<script lang="ts">
export interface RUIConfigProps {
  theme?: RUIConfigContext['theme']
  tooltip?: RUIConfigContext['tooltip']
  dialog?: RUIConfigContext['dialog']
  hoverCard?: RUIConfigContext['hover-card']
  popover?: RUIConfigContext['popover']
  menu?: RUIConfigContext['menu']
  iconify?: RUIConfigContext['iconify']
  toasterManager?: ToasterManagerProps
  messager?: MessagerProps
}
</script>

<script setup lang="ts">
import type { MessagerExpose, MessagerProps } from '@raxium/vue/components/message'
import type { ToasterManagerExpose, ToasterManagerProps } from '@raxium/vue/components/toast'
import type { RUIConfigContext } from './rui-config-context'
import { addAPIProvider, addCollection, addIcon } from '@iconify/vue'
import { Message, Messager } from '@raxium/vue/components/message'
import { OverlayProvider } from '@raxium/vue/components/overlay'
import { SpinProvider } from '@raxium/vue/components/spin'
import { ToasterManager } from '@raxium/vue/components/toast'
import { omit } from 'es-toolkit'
import { computed, useTemplateRef } from 'vue'
import { ThemeProvider } from '../theme'
import { provideRUIConfigContext } from './rui-config-context'

const props = withDefaults(defineProps<RUIConfigProps>(), {
  theme: () => ({
    skin: undefined,
    surface: undefined,
    size: 'base',
    unstyled: false,
    bordered: true,
  }),
  tooltip: () => ({
    openDelay: 0,
    closeDelay: 0,
    lazyMount: false,
    unmountOnExit: false,
    placement: 'top',
    theme: undefined,
  }),
  hoverCard: () => ({
    openDelay: 0,
    closeDelay: 300,
    lazyMount: true,
    unmountOnExit: true,
    placement: 'bottom',
    theme: undefined,
  }),
  dialog: () => ({
    lazyMount: true,
    unmountOnExit: true,
    theme: undefined,
  }),
  popover: () => ({
    lazyMount: true,
    unmountOnExit: true,
    placement: 'bottom',
    theme: undefined,
  }),
  menu: () => ({
    lazyMount: true,
    unmountOnExit: true,
    placement: 'bottom-start',
    theme: undefined,
  }),
  select: () => ({
    lazyMount: false,
    unmountOnExit: false,
    placement: 'bottom-start',
    theme: undefined,
  }),
  datePicker: () => ({
    lazyMount: true,
    unmountOnExit: true,
    placement: 'bottom',
    theme: undefined,
  }),
  iconify: () => ({
    addIcons: [],
    addCollections: [],
    addAPIProviders: [],
  }),
  toasterManager: () => ({
    disableDefaultToaster: false,
    defaultToasterProps: {},
  }),
  messager: () => ({}),
})

props.iconify?.addIcons?.forEach(([icon, iconifyIcon]) => {
  addIcon(icon, iconifyIcon)
})
props.iconify?.addCollections?.forEach(([collection, provider]) => {
  addCollection(collection, provider)
})
props.iconify?.addAPIProviders?.forEach(([provider, config]) => {
  addAPIProvider(provider, config)
})

const toasterManagerExpose = useTemplateRef<ToasterManagerExpose>('toasterManager')
const messagerExpose = useTemplateRef<MessagerExpose>('messager')

provideRUIConfigContext(
  computed(() => ({
    ...omit(props, ['toasterManager', 'messager']),
    toasterManager: toasterManagerExpose.value,
    messager: messagerExpose.value,
  })),
)
</script>

<template>
  <ThemeProvider :value="props.theme">
    <SpinProvider>
      <slot />
      <template #icon>
        <slot name="spin-icon" />
      </template>
    </SpinProvider>
    <ToasterManager
      ref="toasterManager"
      v-bind="props.toasterManager"
    >
      <slot name="toaster" />
    </ToasterManager>
    <Messager
      ref="messager"
      v-slot="{ message }"
      overlap
      v-bind="props.messager"
    >
      <slot
        name="message"
        :message="message"
      >
        <Message :options="message" />
      </slot>
    </Messager>
    <OverlayProvider />
  </ThemeProvider>
</template>
