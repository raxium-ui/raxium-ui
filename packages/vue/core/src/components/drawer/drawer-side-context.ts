import type { ComputedRef } from 'vue'
import type { DrawerSide } from './props'
import { createContext } from '@ark-ui/vue'

export const [provideDrawerSide, injectDrawerSide]
  = createContext<ComputedRef<DrawerSide>>('DrawerSide')
