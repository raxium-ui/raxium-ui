import { getCurrentInstance, useId as vueUseId } from 'vue'

export function useStableId(prefix = 'id') {
  const instance = getCurrentInstance()
  const localId = vueUseId()

  return `${prefix}-${instance?.uid}${localId}`
}
