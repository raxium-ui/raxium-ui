import type * as toast from '@zag-js/toast'
import type { MaybeRef, VNodeChild } from 'vue'
import type { ToasterManagerExpose, ToasterWrap, ToastExtraProps, ToastOptions } from '.'
import { useConfig } from '@raxium/vue/composables/useConfig'
import { isEmpty } from 'es-toolkit/compat'
import { computed, unref } from 'vue'
import { DEFAULT_TOASTER_ID } from '.'

function useToast(manager?: MaybeRef<ToasterManagerExpose | null | undefined>) {
  const toasterManager = useConfig('toaster-manager')
  const toasters = computed(() => unref(manager)?.toasters ?? toasterManager.value?.toasters ?? [])

  function findToaster(options?: Partial<ToastOptions>, iteratee?: (t: ToasterWrap) => boolean) {
    if (isEmpty(toasters.value)) {
      console.warn(
        '[RUI] there is no toaster found, please make sure you have at least one toaster in <RUIConfigProvider> \'s <slot name="toaster" />',
      )
      return
    }
    return toasters.value.find((t) => {
      if (iteratee)
        return iteratee(t)
      if (options?.placement) {
        return t.toaster.attrs.placement === options.placement
      }
      return t.toasterId === DEFAULT_TOASTER_ID
    })
  }

  function create(
    options: ToastOptions,
    props?: ToastExtraProps,
    iteratee?: (t: ToasterWrap) => boolean,
  ) {
    const toasterWrap = findToaster(options, iteratee)
    if (isEmpty(toasterWrap)) {
      console.warn('[RUI] there is no toaster found, please check your toast iteratee function')
      return
    }
    const toastId = toasterWrap.toaster.create(options, props)
    return {
      toastId,
      toaster: toasterWrap.toaster,
    }
  }

  function promise<T, V extends VNodeChild>(
    promise: Promise<T> | (() => Promise<T>),
    options: toast.PromiseOptions<T, V>,
    shared?: Omit<ToastOptions<V>, 'type'>,
    props?: ToastExtraProps,
    iteratee?: (t: ToasterWrap) => boolean,
  ) {
    const toasterWrap = findToaster(shared, iteratee)
    if (isEmpty(toasterWrap)) {
      console.warn('[RUI] there is no toaster found, please check your toast iteratee function')
      return
    }
    const { id, unwrap } = toasterWrap?.toaster.promise(promise, options, shared, props) ?? {
      id: undefined,
      unwrap: () => Promise.resolve(undefined),
    }
    return {
      toastId: id,
      toaster: toasterWrap?.toaster,
      unwrap,
    }
  }

  function success(
    options: ToastOptions,
    props?: ToastExtraProps,
    iteratee?: (t: ToasterWrap) => boolean,
  ) {
    return create({ ...options, type: 'success' }, props, iteratee)
  }
  function error(
    options: ToastOptions,
    props?: ToastExtraProps,
    iteratee?: (t: ToasterWrap) => boolean,
  ) {
    return create({ ...options, type: 'error' }, props, iteratee)
  }
  function info(
    options: ToastOptions,
    props?: ToastExtraProps,
    iteratee?: (t: ToasterWrap) => boolean,
  ) {
    return create({ ...options, type: 'info' }, props, iteratee)
  }
  function warning(
    options: ToastOptions,
    props?: ToastExtraProps,
    iteratee?: (t: ToasterWrap) => boolean,
  ) {
    return create({ ...options, type: 'warning' }, props, iteratee)
  }
  function loading(
    options: ToastOptions,
    props?: ToastExtraProps,
    iteratee?: (t: ToasterWrap) => boolean,
  ) {
    return create({ ...options, type: 'loading' }, props, iteratee)
  }

  return {
    toast: {
      create,
      success,
      error,
      info,
      warning,
      loading,
      promise,
    },
  }
}

export { useToast }
