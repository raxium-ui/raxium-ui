# @raxium/react

## 0.5.3

### Patch Changes

- 891f4b6: Fix value generic inference for radio groups, checkbox groups, selects, and trees so consumer callbacks retain narrow model value types. Vue named, compound, and globally registered components now infer string and number models without requiring manual type guards, while React generic defaults no longer widen callback values.

## 0.5.2

### Patch Changes

- 5ec6e96: Align Input value events to `string`. Clear now commits `''` instead of `undefined`, so `v-model` / `onValueChange` match `ref<string>` and `useState('')` without `| undefined`.
- 6fff60a: Make RadioGroup, CheckboxGroup, Select, and Tree generic over option/id value. Vue infers that type from `v-model` (and Tree `selectedValue` / `expandedValue` / `checkedValue`) so `update:*` matches the bound type instead of the full union. React RadioGroup / CheckboxGroup do the same for `value` / `onValueChange`, with a generic `forwardRef` assertion so the type parameter is not erased.

## 0.5.1

### Patch Changes

- 947f998: Add `--rui-motion-*` CSS tokens and a `motion` craft variant (`default` | `fade` | `none`) with `defineMotionPreset` so overlay, dialog, collapse, tabs, and radio share one duration/recipe instead of hard-coded animation classes. Give Dialog backdrop its own presence so stacked dialogs fade the overlay independently of content, and fold backdrop opacity into the blur keyframes so the dimmer actually animates. Drive Tabs panel motion from `data-direction` / `data-orientation` instead of craft variants, and assign `--motion-duration` on every element so `tailwindcss-motion`’s non-inheriting `@property` default (700ms) no longer wins over `--rui-motion-duration`.
- Updated dependencies [947f998]
  - @raxium/themes@0.4.1

## 0.5.0

### Minor Changes

- 8f0138c: Add the React component library (`@raxium/react`), the first published release of the React port. It ships 35 Ark UI-based components — Accordion, Badge, Button, Checkbox, Collapsible, DatePicker, Dialog, Editable, FloatingPanel, HoverCard, Icon, Input, Menu, Message, NumberInput, Overlay, Pagination, PinInput, Popover, Progress, RadioGroup, RatingGroup, ScrollArea, Select, Skeleton, Slider, Spin, Switch, Tabs, TagsInput, Toast, Tooltip, Tree and more — together with hooks, providers, and utilities, fully typed and consumable via granular `./components/*`, `./hooks/*`, `./providers/*`, and `./utils/*` entry points.

  Enhance `@raxium/themes` with an improved runtime theming system: refined preset/skin-pack resolution and craft merging so themes compose predictably across both the React and Vue libraries.

  Align `@raxium/vue` theming composables and config providers (`useTheme`, `useProvideComponentTheme`, `RUIConfigProvider`) with the shared theming model for consistent behavior across frameworks.

### Patch Changes

- Updated dependencies [8f0138c]
  - @raxium/themes@0.4.0
