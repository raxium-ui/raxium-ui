<script lang="ts">
/**
 * deal with ts-2742
 */
import type * as toast from '@zag-js/toast'
import type {
  ComputedRef,
  CSSProperties,
  HTMLAttributes,
  NativeElements,
  ReservedProps,
  UnwrapRef,
} from 'vue'

type Attrs<T> = T & ReservedProps
type PropTypes = NativeElements & {
  element: Attrs<HTMLAttributes>
  style: CSSProperties
}
interface UseToastContext extends ComputedRef<toast.Api<PropTypes>> {}
</script>

<script setup lang="ts">
import type { MessageProps } from '.'
import { useForwardProps } from '@ark-ui/vue'
import { ark } from '@ark-ui/vue/factory'
import { Toast, useToastContext } from '@ark-ui/vue/toast'
import { useTheme } from '@raxium/vue/composables/useTheme'
import { CircleAlert, CircleCheck, CircleX, Info, LoaderCircle, X } from 'lucide-vue-next'
import { computed, h } from 'vue'

const { class: propsClass, theme: propsTheme, options, ui, ...props } = defineProps<MessageProps>()
defineSlots<{
  default: (props: UnwrapRef<typeof slotBindings>) => any
  icon: (props: UnwrapRef<typeof slotBindings>) => any
  inner: (props: UnwrapRef<typeof slotBindings>) => any
  close: (props: UnwrapRef<typeof slotBindings>) => any
}>()
const forwarded = useForwardProps(props)
const messageContext: UseToastContext = useToastContext()
const slotBindings = computed(() => ({
  options,
  context: messageContext.value,
}))

const theme = useTheme(() => Object.assign({}, propsTheme, options?.theme))
const crafts = computed(() => theme.value.crafts.tvMessage())
const iconVNode = computed(() => {
  const className = crafts.value.icon({ class: ui?.icon, ...theme.value })
  switch (messageContext.value.type) {
    case 'info':
      return h(Info, {
        'class': className,
        'data-type': messageContext.value.type,
      })
    case 'success':
      return h(CircleCheck, {
        'class': className,
        'data-type': messageContext.value.type,
      })
    case 'error':
      return h(CircleX, {
        'class': className,
        'data-type': messageContext.value.type,
      })
    case 'warning':
      return h(CircleAlert, {
        'class': className,
        'data-type': messageContext.value.type,
      })
    case 'loading':
      return h(LoaderCircle, {
        'class': className,
        'data-type': messageContext.value.type,
      })
    default:
      return h(Info, {
        'class': className,
        'data-type': messageContext.value.type,
      })
  }
})
</script>

<template>
  <Toast.Root
    v-bind="forwarded"
    :class="crafts.root({ class: [ui?.root, propsClass], ...theme })"
  >
    <ark.div
      :class="crafts.content({ class: ui?.content, ...theme })"
      data-scope="toast"
      data-part="content"
      :data-placement="messageContext.placement"
      :data-type="messageContext.type"
    >
      <component
        :is="options?.render(messageContext)"
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
        <slot
          name="inner"
          v-bind="slotBindings"
        >
          <template v-if="typeof options?.description === 'function'">
            <component :is="options?.description(messageContext)" />
          </template>
          <template v-else>
            <Toast.Description :class="crafts.description({ class: ui?.description, ...theme })">
              {{ options?.description }}
            </Toast.Description>
          </template>
        </slot>
        <slot
          v-if="options?.showClose"
          name="close"
          v-bind="slotBindings"
        >
          <Toast.CloseTrigger
            v-if="messageContext.type !== 'loading'"
            :class="crafts.close({ class: ui?.close, ...theme })"
          >
            <X class="size-[1lh]" />
          </Toast.CloseTrigger>
        </slot>
      </slot>
    </ark.div>
  </Toast.Root>
</template>
