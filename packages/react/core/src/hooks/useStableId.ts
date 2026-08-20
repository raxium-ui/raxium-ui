import { useId } from 'react'

export function useStableId(prefix = 'id') {
  const localId = useId()
  return `${prefix}-${localId}`
}
