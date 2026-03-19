import type { CreateToasterReturn } from '@ark-ui/vue'
import type * as toast from '@zag-js/toast'
import type { VNodeChild } from 'vue'
import type { MessageOptions } from '.'
import { useConfig } from '@raxium/vue/composables/useConfig'
import { isEmpty } from 'es-toolkit/compat'
import { computed } from 'vue'

function useMessage(messager?: CreateToasterReturn) {
  const configMessager = useConfig('messager')
  const _messager = computed(() => messager ?? configMessager.value?.messager)

  function create(options: MessageOptions) {
    if (isEmpty(_messager.value)) {
      console.warn(
        '[RUI] there is no messager found, please make sure you have at least one <Messager /> in <RUIConfigProvider>',
      )
      return
    }
    const toastID = _messager.value?.create(options as toast.Options)
    return {
      ID: toastID,
      messager: _messager.value,
    }
  }

  function promise<T, V extends VNodeChild>(
    promise: Promise<T> | (() => Promise<T>),
    options: toast.PromiseOptions<T, V>,
    shared?: Omit<MessageOptions<V>, 'type' | 'title' | 'description'>,
  ) {
    if (isEmpty(_messager.value)) {
      console.warn(
        '[RUI] there is no messager found, please make sure you have at least one <Messager /> in <RUIConfigProvider>',
      )
      return
    }
    const { id, unwrap } = _messager.value?.promise(
      promise,
      options,
      shared,
    ) ?? {
      id: undefined,
      unwrap: () => Promise.resolve(undefined),
    }
    return {
      ID: id,
      unwrap,
      messager: _messager.value,
    }
  }

  function success(options: MessageOptions) {
    return create({
      ...options,
      type: 'success',
    })
  }
  function error(options: MessageOptions) {
    return create({
      ...options,
      type: 'error',
    })
  }
  function info(options: MessageOptions) {
    return create({
      ...options,
      type: 'info',
    })
  }
  function warning(options: MessageOptions) {
    return create({
      ...options,
      type: 'warning',
    })
  }
  function loading(options: MessageOptions) {
    return create({
      ...options,
      type: 'loading',
    })
  }

  return {
    message: {
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

export { useMessage }
