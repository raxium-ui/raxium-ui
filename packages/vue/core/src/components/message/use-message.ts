import type * as toast from '@zag-js/toast'
import type { VNodeChild } from 'vue'
import type { MessageOptions, MessageProps, RaxiumMessager } from '.'
import { useConfig } from '@raxium/vue/composables/useConfig'
import { isEmpty } from 'es-toolkit/compat'
import { computed } from 'vue'

type MessageExtraProps = Omit<MessageProps, 'options'>

function useMessage(messager?: RaxiumMessager) {
  const configMessager = useConfig('messager')
  const _messager = computed(() => messager ?? configMessager.value?.messager)

  function create(options: MessageOptions, props?: MessageExtraProps) {
    if (isEmpty(_messager.value)) {
      console.warn(
        '[RUI] there is no messager found, please make sure you have at least one <Messager /> in <RUIConfigProvider>',
      )
      return
    }
    const messageId = _messager.value?.create(options, props)
    return {
      messageId,
      messager: _messager.value,
    }
  }

  function promise<T, V extends VNodeChild>(
    promise: Promise<T> | (() => Promise<T>),
    options: toast.PromiseOptions<T, V>,
    shared?: Omit<MessageOptions<V>, 'type'>,
    props?: MessageExtraProps,
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
      props,
    ) ?? {
      id: undefined,
      unwrap: () => Promise.resolve(undefined),
    }
    return {
      messageId: id,
      messager: _messager.value,
      unwrap,
    }
  }

  function success(options: MessageOptions, props?: MessageExtraProps) {
    return create({ ...options, type: 'success' }, props)
  }
  function error(options: MessageOptions, props?: MessageExtraProps) {
    return create({ ...options, type: 'error' }, props)
  }
  function info(options: MessageOptions, props?: MessageExtraProps) {
    return create({ ...options, type: 'info' }, props)
  }
  function warning(options: MessageOptions, props?: MessageExtraProps) {
    return create({ ...options, type: 'warning' }, props)
  }
  function loading(options: MessageOptions, props?: MessageExtraProps) {
    return create({ ...options, type: 'loading' }, props)
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
