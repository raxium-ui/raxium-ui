import type { crafts } from '@raxium/themes/default'
import type { ComputedRef } from 'vue'
import { createContext } from '@ark-ui/vue/utils'

export type TreeContextEx = {
  branchCrafts: ComputedRef<ReturnType<typeof crafts.tvTreeBranch>>
  itemCrafts: ComputedRef<ReturnType<typeof crafts.tvTreeItem>>
  checkboxCrafts: ComputedRef<ReturnType<typeof crafts.tvCheckbox>>
}

export const [provideTreeContext, injectTreeContext]
  = createContext<TreeContextEx>('TreeContextEx')
