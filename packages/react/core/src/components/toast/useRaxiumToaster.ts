import type { CreateToasterProps } from '@ark-ui/react/toast'
import type { RaxiumToaster, ToastExtraProps, ToastOptions } from './props'
import { createToaster } from '@ark-ui/react/toast'
import { useMemo, useRef } from 'react'

export function useRaxiumToaster(storeProps: CreateToasterProps) {
  const propsMap = useRef(new Map<string, ToastExtraProps>())
  const rawToaster = useMemo(() => createToaster(storeProps), [])

  const toaster = useMemo<RaxiumToaster>(() => {
    function setProps(id: string | undefined, extra?: ToastExtraProps, merge = false) {
      if (!id)
        return
      if (extra == null) {
        if (!merge)
          propsMap.current.delete(id)
        return
      }
      if (merge && propsMap.current.has(id))
        propsMap.current.set(id, { ...propsMap.current.get(id), ...extra })
      else
        propsMap.current.set(id, extra)
    }

    rawToaster.subscribe(() => {
      if (propsMap.current.size === 0)
        return
      const alive = new Set(
        rawToaster.getVisibleToasts().map(item => item.id).filter(Boolean) as string[],
      )
      for (const id of Array.from(propsMap.current.keys())) {
        if (!alive.has(id))
          propsMap.current.delete(id)
      }
    })

    return {
      ...rawToaster,
      create(data: ToastOptions, extra?: ToastExtraProps) {
        const id = rawToaster.create(data)
        setProps(id, extra)
        return id
      },
      update(id, data, extra) {
        const nextId = rawToaster.update(id, data)
        if (nextId && nextId !== id && propsMap.current.has(id)) {
          propsMap.current.set(nextId, propsMap.current.get(id)!)
          propsMap.current.delete(id)
        }
        setProps(nextId ?? id, extra, true)
        return nextId
      },
      success(data, extra) {
        const id = rawToaster.create({ ...data, type: 'success' })
        setProps(id, extra)
      },
      error(data, extra) {
        const id = rawToaster.create({ ...data, type: 'error' })
        setProps(id, extra)
      },
      info(data, extra) {
        const id = rawToaster.create({ ...data, type: 'info' })
        setProps(id, extra)
      },
      warning(data, extra) {
        const id = rawToaster.create({ ...data, type: 'warning' })
        setProps(id, extra)
      },
      loading(data, extra) {
        const id = rawToaster.create({ ...data, type: 'loading' })
        setProps(id, extra)
      },
      promise(promise, options, shared, extra) {
        const result = rawToaster.promise(promise, options, shared)
        setProps(result?.id, extra)
        return result
      },
    }
  }, [rawToaster])

  return { toaster, rawToaster, propsMap }
}
