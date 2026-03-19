import type { ComputedGetter, Ref } from 'vue'
import { createContext } from '@ark-ui/vue'

interface FloatingPanelAppearanceContext {
  resizeAxis: ComputedGetter<'x' | 'y' | 'xy' | 'xyc' | 'custom'>
  opacity: Ref<number>
  pinned: Ref<boolean>
  setOpacity: (opacity: number) => void
  setPinned: (pinned: boolean) => void
}
const [provideFloatingPanelAppearanceContext, injectFloatingPanelAppearanceContext]
  = createContext<FloatingPanelAppearanceContext>('FloatingPanelAppearanceContext')

export { injectFloatingPanelAppearanceContext, provideFloatingPanelAppearanceContext }
