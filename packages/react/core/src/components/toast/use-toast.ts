import type { ToasterWrap, ToastExtraProps, ToastOptions } from './props'
import { isEmpty } from 'es-toolkit/compat'
import { DEFAULT_TOASTER_ID } from './props'
import { useToasterList } from './toaster-registry'

export function useToast() {
  const toasters = useToasterList()

  function findToaster(_options?: Partial<ToastOptions>, iteratee?: (item: ToasterWrap) => boolean) {
    if (isEmpty(toasters)) {
      console.warn(
        '[RUI] there is no toaster found, please make sure ToasterManager is mounted in RUIConfig',
      )
      return
    }
    return toasters.find((item) => {
      if (iteratee)
        return iteratee(item)
      return item.toasterId === DEFAULT_TOASTER_ID
    }) ?? toasters[0]
  }

  function create(options: ToastOptions, extra?: ToastExtraProps, iteratee?: (item: ToasterWrap) => boolean) {
    const wrap = findToaster(options, iteratee)
    if (!wrap) {
      console.warn('[RUI] there is no toaster found, please check your toast iteratee function')
      return
    }
    const toastId = wrap.toaster.create(options, extra)
    return { toastId, toaster: wrap.toaster }
  }

  return {
    toast: {
      create,
      success: (options: ToastOptions, extra?: ToastExtraProps) => create({ ...options, type: 'success' }, extra),
      error: (options: ToastOptions, extra?: ToastExtraProps) => create({ ...options, type: 'error' }, extra),
      info: (options: ToastOptions, extra?: ToastExtraProps) => create({ ...options, type: 'info' }, extra),
      warning: (options: ToastOptions, extra?: ToastExtraProps) => create({ ...options, type: 'warning' }, extra),
      loading: (options: ToastOptions, extra?: ToastExtraProps) => create({ ...options, type: 'loading' }, extra),
    },
  }
}
