<script setup lang="ts">
import type { UnwrapRef } from 'vue'
import type { ToastProps, UseToastContext } from '.'
import { useForwardProps } from '@ark-ui/vue'
import { ark } from '@ark-ui/vue/factory'
import { Toast, useToastContext } from '@ark-ui/vue/toast'
import { cxc } from '@raxium/themes/utils'
import { useCraft, useTheme } from '@raxium/vue/composables'
import { CircleAlert, CircleCheck, CircleX, Info, LoaderCircle, X } from 'lucide-vue-next'
import { computed, h } from 'vue'

const { class: propsClass, theme: propsTheme, options, ui, ...props } = defineProps<ToastProps>()
defineSlots<{
  default: (props: UnwrapRef<typeof slotBindings>) => any
  icon: (props: UnwrapRef<typeof slotBindings>) => any
  inner: (props: UnwrapRef<typeof slotBindings>) => any
  close: (props: UnwrapRef<typeof slotBindings>) => any
}>()
const forwarded = useForwardProps(props)
const toastContext: UseToastContext = useToastContext()
const slotBindings = computed(() => ({
  options,
  context: toastContext.value,
}))

// theme
const theme = useTheme(() => Object.assign({}, propsTheme, options?.theme))
const crafts = useCraft(theme, 'tvToast')
const iconVNode = computed(() => {
  const className = crafts.value.icon(cxc(ui?.icon))
  switch (toastContext.value.type) {
    case 'info':
      return h(Info, {
        'class': className,
        'data-type': toastContext.value.type,
      })
    case 'success':
      return h(CircleCheck, {
        'class': className,
        'data-type': toastContext.value.type,
      })
    case 'error':
      return h(CircleX, {
        'class': className,
        'data-type': toastContext.value.type,
      })
    case 'warning':
      return h(CircleAlert, {
        'class': className,
        'data-type': toastContext.value.type,
      })
    case 'loading':
      return h(LoaderCircle, {
        'class': className,
        'data-type': toastContext.value.type,
      })
    default:
      return h(Info, {
        'class': className,
        'data-type': toastContext.value.type,
      })
  }
})
</script>

<template>
  <Toast.Root
    v-bind="forwarded"
    :class="crafts.root(cxc(ui?.root, propsClass))"
  >
    <ark.div
      :class="crafts.content(cxc(ui?.content))"
      data-scope="toast"
      data-part="content"
      :data-placement="toastContext.placement"
      :data-type="toastContext.type"
    >
      <component
        :is="options?.render(toastContext)"
        v-if="options?.render"
      />
      <slot
        v-else
        name="default"
        v-bind="slotBindings"
      >
        <slot
          name="icon"
          v-bind="slotBindings"
        >
          <component :is="iconVNode" />
        </slot>
        <ark.div
          :class="crafts.inner(cxc(ui?.inner))"
          data-part="inner"
          data-scope="toast"
        >
          <slot
            name="inner"
            v-bind="slotBindings"
          >
            <template v-if="typeof options?.title === 'function'">
              <component :is="options?.title(toastContext)" />
            </template>
            <template v-else>
              <Toast.Title :class="crafts.title(cxc(ui?.title))">
                {{ options?.title }}
              </Toast.Title>
            </template>
            <template v-if="typeof options?.description === 'function'">
              <component :is="options?.description(toastContext)" />
            </template>
            <template v-else>
              <Toast.Description :class="crafts.description(cxc(ui?.description))">
                {{ options?.description }}
              </Toast.Description>
            </template>
          </slot>
        </ark.div>
        <slot
          name="close"
          v-bind="slotBindings"
        >
          <Toast.CloseTrigger
            v-if="toastContext.type !== 'loading'"
            :class="crafts.close(cxc(ui?.close))"
          >
            <X />
          </Toast.CloseTrigger>
        </slot>
      </slot>
    </ark.div>
  </Toast.Root>
</template>
