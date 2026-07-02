<script setup lang="ts">
import type { CreateToasterProps } from '@ark-ui/vue/toast'
import type * as toast from '@zag-js/toast'
import type { VNodeChild } from 'vue'
import type { RaxiumToaster, ToasterProps, ToastExtraProps, ToastOptions } from '.'
import { createToaster, Toaster } from '@ark-ui/vue/toast'
import { useProvideComponentTheme } from '@raxium/vue/composables/useProvideComponentTheme'
import { useTheme } from '@raxium/vue/composables/useTheme'
import { shallowReactive } from 'vue'

const { toasterId, theme: propsTheme, ...props } = defineProps<ToasterProps>()

// slots
defineSlots<{
  default: (props: { toast: ToastOptions<any>, props?: ToastExtraProps }) => any
}>()

const rawToaster = createToaster(props as CreateToasterProps)

/**
 * Per-toast extra props (reactive so <Toast> re-renders when updated).
 * Keyed by the toast id returned from `create` / `update` / `promise`.
 */
const propsMap = shallowReactive(new Map<string, ToastExtraProps>())

function setProps(id: string | undefined, extra?: ToastExtraProps, merge = false) {
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
 * present in the visible toasts. We can't hook `onStatusChange` per toast
 * because zag's `StatusChangeDetails` does not include the toast id.
 */
rawToaster.subscribe(() => {
  if (propsMap.size === 0)
    return
  const alive = new Set(
    rawToaster
      .getVisibleToasts()
      .map(t => t.id)
      .filter(Boolean) as string[],
  )
  for (const id of Array.from(propsMap.keys())) {
    if (!alive.has(id))
      propsMap.delete(id)
  }
})

const toaster: RaxiumToaster = {
  ...rawToaster,
  create(data: ToastOptions, extra?: ToastExtraProps) {
    const id = rawToaster.create(data as Partial<toast.Options>)
    setProps(id, extra)
    return id
  },
  update(id: string, data: Partial<ToastOptions>, extra?: ToastExtraProps) {
    const nextId = rawToaster.update(id, data as Partial<toast.Options<any>>)
    // If store returns a new id, migrate existing props.
    if (nextId && nextId !== id && propsMap.has(id)) {
      propsMap.set(nextId, propsMap.get(id)!)
      propsMap.delete(id)
    }
    setProps(nextId ?? id, extra, true)
    return nextId
  },
  success(data?: Partial<ToastOptions>, extra?: ToastExtraProps) {
    const id = rawToaster.create({ ...data, type: 'success' } as Partial<toast.Options>)
    setProps(id, extra)
  },
  error(data?: Partial<ToastOptions>, extra?: ToastExtraProps) {
    const id = rawToaster.create({ ...data, type: 'error' } as Partial<toast.Options>)
    setProps(id, extra)
  },
  info(data?: Partial<ToastOptions>, extra?: ToastExtraProps) {
    const id = rawToaster.create({ ...data, type: 'info' } as Partial<toast.Options>)
    setProps(id, extra)
  },
  warning(data?: Partial<ToastOptions>, extra?: ToastExtraProps) {
    const id = rawToaster.create({ ...data, type: 'warning' } as Partial<toast.Options>)
    setProps(id, extra)
  },
  loading(data?: Partial<ToastOptions>, extra?: ToastExtraProps) {
    const id = rawToaster.create({ ...data, type: 'loading' } as Partial<toast.Options>)
    setProps(id, extra)
  },
  promise<T>(
    promise: Promise<T> | (() => Promise<T>),
    options: toast.PromiseOptions<T, VNodeChild>,
    shared?: Omit<ToastOptions, 'type'>,
    extra?: ToastExtraProps,
  ) {
    const result = rawToaster.promise(promise, options, shared as any)
    setProps(result?.id, extra)
    return result
  },
}

// theme
const theme = useTheme(() => propsTheme)
useProvideComponentTheme(theme, () => propsTheme)

// expose
defineExpose({
  toasterId,
  toaster,
})
</script>

<template>
  <Toaster
    v-slot="rawToast"
    :toaster="rawToaster"
  >
    <slot
      :toast="rawToast"
      :props="rawToast?.id ? propsMap.get(rawToast.id) : undefined"
    />
  </Toaster>
</template>
