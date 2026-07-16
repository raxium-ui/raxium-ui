<script setup lang="ts">
import type * as toast from '@zag-js/toast'
import type { VNodeChild } from 'vue'
import type { MessageOptions, MessageProps, MessagerProps, RaxiumMessager } from '.'
import { createToaster, Toaster } from '@ark-ui/vue/toast'
import { useProvideComponentTheme } from '@raxium/vue/composables/useProvideComponentTheme'
import { useTheme } from '@raxium/vue/composables/useTheme'
import { useThemeCraft } from '@raxium/vue/composables/useThemeCraft'
import { defaults } from 'es-toolkit/compat'
import { shallowReactive } from 'vue'

const { theme: propsTheme, craft, showClose = true, ...props } = defineProps<MessagerProps>()

// slots
defineSlots<{
  default: (props: { message: MessageOptions<any>, props?: MessageExtraProps }) => any
}>()

type MessageExtraProps = Omit<MessageProps, 'options'>

const rawMessager = createToaster({
  ...props,
  placement: 'top',
})

/**
 * Per-message extra props (reactive so <Message> re-renders when updated).
 * Keyed by the message id returned from `create` / `update` / `promise`.
 */
const propsMap = shallowReactive(new Map<string, MessageExtraProps>())

function setProps(id: string | undefined, extra?: MessageExtraProps, merge = false) {
  if (!id)
    return
  if (extra === undefined || extra === null) {
    if (!merge)
      propsMap.delete(id)
    return
  }
  if (merge && propsMap.has(id)) {
    propsMap.set(id, { ...propsMap.get(id), ...extra })
  }
  else {
    propsMap.set(id, extra)
  }
}

/**
 * GC: after every store change, drop entries whose ids are no longer
 * present in the visible messages. We can't hook `onStatusChange` per
 * message because zag's `StatusChangeDetails` does not include the id.
 */
rawMessager.subscribe(() => {
  if (propsMap.size === 0)
    return
  const alive = new Set(rawMessager.getVisibleToasts().map(t => t.id).filter(Boolean) as string[])
  for (const id of Array.from(propsMap.keys())) {
    if (!alive.has(id))
      propsMap.delete(id)
  }
})

const messager: RaxiumMessager = {
  ...rawMessager,
  create(data: MessageOptions, extra?: MessageExtraProps) {
    const id = rawMessager.create(data as toast.Options)
    setProps(id, extra)
    return id
  },
  update(id: string, data: Partial<MessageOptions>, extra?: MessageExtraProps) {
    const nextId = rawMessager.update(id, data as Partial<toast.Options>)
    // If store returns a new id, migrate existing props.
    if (nextId && nextId !== id && propsMap.has(id)) {
      propsMap.set(nextId, propsMap.get(id)!)
      propsMap.delete(id)
    }
    setProps(nextId ?? id, extra, true)
    return nextId
  },
  success(data?: Partial<MessageOptions>, extra?: MessageExtraProps) {
    const id = rawMessager.create({ ...data, type: 'success' } as toast.Options)
    setProps(id, extra)
  },
  error(data?: Partial<MessageOptions>, extra?: MessageExtraProps) {
    const id = rawMessager.create({ ...data, type: 'error' } as toast.Options)
    setProps(id, extra)
  },
  info(data?: Partial<MessageOptions>, extra?: MessageExtraProps) {
    const id = rawMessager.create({ ...data, type: 'info' } as toast.Options)
    setProps(id, extra)
  },
  warning(data?: Partial<MessageOptions>, extra?: MessageExtraProps) {
    const id = rawMessager.create({ ...data, type: 'warning' } as toast.Options)
    setProps(id, extra)
  },
  loading(data?: Partial<MessageOptions>, extra?: MessageExtraProps) {
    const id = rawMessager.create({ ...data, type: 'loading' } as toast.Options)
    setProps(id, extra)
  },
  promise<T>(
    promise: Promise<T> | (() => Promise<T>),
    options: toast.PromiseOptions<T, VNodeChild>,
    shared?: Omit<MessageOptions, 'type'>,
    extra?: MessageExtraProps,
  ) {
    const result = rawMessager.promise(promise, options, shared as any)
    setProps(result?.id, extra)
    return result
  },
}

// theme
const theme = useTheme(() => propsTheme)
const themed = useThemeCraft(theme, 'tvMessage', () => craft)
useProvideComponentTheme(themed, () => propsTheme)

// expose
defineExpose({
  messager,
})
</script>

<template>
  <Toaster
    v-slot="rawMessage"
    :toaster="rawMessager"
  >
    <slot
      :message="defaults(rawMessage, { showClose })"
      :props="rawMessage?.id ? propsMap.get(rawMessage.id) : undefined"
    />
  </Toaster>
</template>
