import type { ReactNode } from 'react'
import type { ToasterWrap } from './props'
import { createContext, useContext } from 'react'

type RegisterToaster = (wrap: ToasterWrap) => () => void

const ToasterRegistryContext = createContext<RegisterToaster | null>(null)
const ToasterListContext = createContext<ToasterWrap[]>([])

export function ToasterRegistryProvider({
  register,
  toasters,
  children,
}: {
  register: RegisterToaster
  toasters: ToasterWrap[]
  children?: ReactNode
}) {
  return (
    <ToasterRegistryContext.Provider value={register}>
      <ToasterListContext.Provider value={toasters}>
        {children}
      </ToasterListContext.Provider>
    </ToasterRegistryContext.Provider>
  )
}

export function useToasterRegistry() {
  return useContext(ToasterRegistryContext)
}

export function useToasterList() {
  return useContext(ToasterListContext)
}
