import type { MenuCheckboxItemBaseProps, MenuContentBaseProps, MenuItemBaseProps, MenuItemGroupBaseProps, MenuRadioItemBaseProps, MenuRadioItemGroupBaseProps, MenuRootBaseProps, MenuTriggerItemBaseProps } from '@ark-ui/vue'
import type { RadioGroupVariants } from '@raxium/themes/default'
import type { ThemeCrafts, ThemeNoCrafts } from '@raxium/vue/providers'
import type { HTMLAttributes } from 'vue'

export interface MenuProps extends MenuRootBaseProps, ThemeCrafts<'tvMenu' | 'tvCheckbox' | 'tvRadioGroup'> {
  class?: HTMLAttributes['class']
}

export interface MenuCheckboxItemProps extends MenuCheckboxItemBaseProps, ThemeNoCrafts {
  class?: HTMLAttributes['class']
  ui?: {
    root?: HTMLAttributes['class']
    checkbox?: HTMLAttributes['class']
  }
}

export interface MenuContentProps extends MenuContentBaseProps, ThemeNoCrafts {
  class?: HTMLAttributes['class']
  ui?: {
    positioner?: HTMLAttributes['class']
    content?: HTMLAttributes['class']
    inner?: HTMLAttributes['class']
  }
}

export interface MenuItemProps extends MenuItemBaseProps, ThemeNoCrafts {
  class?: HTMLAttributes['class']
}

export interface MenuItemGroupProps extends MenuItemGroupBaseProps, ThemeNoCrafts {
  class?: HTMLAttributes['class']
  label?: string
  ui?: {
    root?: HTMLAttributes['class']
    label?: HTMLAttributes['class']
    marker?: HTMLAttributes['class']
  }
}

export interface MenuRadioItemProps extends MenuRadioItemBaseProps, ThemeNoCrafts {
  class?: HTMLAttributes['class']
  variant?: RadioGroupVariants['variant']
  ui?: {
    root?: HTMLAttributes['class']
    indicator?: HTMLAttributes['class']
  }
}

export interface MenuRadioItemGroupProps extends MenuRadioItemGroupBaseProps, ThemeNoCrafts {
  class?: HTMLAttributes['class']
}

export interface MenuTriggerItemProps extends MenuTriggerItemBaseProps, ThemeNoCrafts {
  class?: HTMLAttributes['class']
}
