# @raxium/vue

## 0.4.2

### Patch Changes

- d643104: Wire SelectContent through teleport detection and teleported depth ownership (same stacking band as Menu) so portaled overlays pick up a correct `--rui-z-index`. Point the select content craft at `z-(--rui-z-index)` instead of a fixed `z-popover`, and expose `ui.positioner` for styling the Positioner.
- ca0101f: Honor `bordered` theme variant on overlay crafts (`dialog` / `menu` / `popover` / `hover-card` / `select` / `date-picker`); fix missing `ThemeProvider` import in Slider tooltip thumbs.
- Updated dependencies [d643104]
- Updated dependencies [bd0439f]
- Updated dependencies [ca0101f]
  - @raxium/themes@0.3.2

## 0.4.1

### Patch Changes

- 79063ed: Simplify theme crafts to app-level + instance-level only; extract overlay depth stack to shared.
  - `@raxium/themes`: add `@raxium/themes/runtime` (`ThemeProps` / `ThemeConfig` / `ResolvedTheme`, craft merge helpers). `ThemeProps` is tokens-only; crafts live on `ThemeConfig` (`RUIConfig.theme.crafts`).
  - `@raxium/shared`: add `@raxium/shared/depth` (`createDepthStore`, z-index math) for framework-agnostic overlay stacking.
  - `@raxium/vue`: `useTheme` merges crafts only from config; instance overrides via `:craft` (`useCraft` / `useThemeCraft`). Scope Theme / `:theme` no longer accept `crafts`. Fix missing craft bake on Tooltip, Popover, Menu, Messager, Toaster, ScrollArea. Narrow Menu / TagsInput / NumberInput `ThemeCrafts` to a single primary craft key. `useDepth*` now adapts `@raxium/shared/depth`.

- Updated dependencies [79063ed]
  - @raxium/themes@0.3.1
  - @raxium/shared@0.1.2

## 0.4.0

### Minor Changes

- b4437f0: Refine overlay depth stacking: unify z-index via `--rui-z-index`, stabilize owner lifecycle, and fix nested dialog inert conflicts.

  ### @raxium/vue
  - Drive overlay z-index through a single CSS custom property (`--rui-z-index`) instead of inline `zIndex` styles, avoiding conflicts between inline values and theme classes.
  - `useDepthOwner`: keep owners registered for their full mount lifecycle; re-activation only calls `bringToFront()` instead of unregistering, preventing closed-but-mounted overlays (`unmountOnExit=false`) from jumping above active layers.
  - Add `depth` config to `RUIConfigContext` (`baseZIndex`, `step`) for global depth-stack tuning.
  - Update Dialog, Popover, Menu, HoverCard, Tooltip, and DatePicker content components to set `--rui-z-index`; Tooltip applies it on `Content` rather than `Positioner`.
  - `DialogBackdrop`: switch prop merging to Vue `mergeProps`.
  - Replace `@zag-js/dismissable` patch with `@zag-js/aria-hidden` patch — fixes nested Dialogs becoming unclickable when an outer layer leaves stale `inert` / `aria-hidden` on a sibling positioner.

  ### @raxium/themes
  - Dialog backdrop/positioner crafts use `z-(--rui-z-index)` as the sole z-index source (remove zag `--layer-index` fallback from class strings).
  - `POPOVER_CONTENT_BASE` adds `z-(--rui-z-index)` so Popover, Menu, HoverCard, Tooltip, and DatePicker share the same depth-aware stacking pattern.
  - DatePicker content craft switches from `z-popover` to `z-(--rui-z-index)`.

- c1992bf: Add unified overlay depth management for stacked teleported layers (Dialog, Popover, Menu, HoverCard, Tooltip, DatePicker, FloatingPanel).

  ### @raxium/vue
  - Add `useDepthOwner`, `useTeleportedDepth`, and `useTeleportedDepthOwner` composables to coordinate backdrop/content/floating z-index via `--rui-z-index` and parent-child depth injection.
  - Add `useTeleportDetection` composable to detect when a positioner is teleported to `body`, so z-index is only applied when needed.
  - Integrate depth stacking into `DialogContent` / `DialogBackdrop`, `PopoverContent`, `MenuContent`, `HoverCardContent`, `TooltipContent`, `DatePickerContent`, and `FloatingPanelContent` (with `bringToFront` on topmost panel).
  - Patch `@zag-js/dismissable` to freeze inline z-index during layer close/exit animation, preventing lower layers from painting over the closing overlay.
  - Add Storybook examples: FloatingPanel multiple panels / with Dialog, Tooltip teleport z-index.

  ### @raxium/themes
  - Dialog backdrop/positioner/content crafts now read `z-[var(--rui-z-index, …)]` for depth-aware stacking while preserving the previous zag `--layer-index` fallback.
  - DatePicker positioner craft adds popover-layer z-index baseline.
  - Razer DatePicker: fix table cell hover styles (`:not()` selectors chained with AND instead of OR).
  - FloatingPanel: slightly reduce header control trigger size (`0.875lh`).

### Patch Changes

- Updated dependencies [2b15811]
- Updated dependencies [b4437f0]
- Updated dependencies [c1992bf]
  - @raxium/themes@0.3.0

## 0.3.12

### Patch Changes

- 58e3cff: fix: Refactor Dialog component to introduce new passthrough props for enhanced customization and flexibility #74.
- 5d90b7b: Fix: Resolved issue #78 where clearing the input did not emit the correct value.
- c60c60b: Fix the size of the radio item indicator in the menu component so that it is sized correctly and visually consistent with other elements.
- Updated dependencies [c60c60b]
  - @raxium/themes@0.2.7

## 0.3.11

### Patch Changes

- c579771: Fix an issue where the Dialog component did not properly emit a "change" event before closing. The "beforeclose" event now correctly triggers a change event to notify listeners.
- 856add6: feat: Implement support for passing additional props to toast and message components programmatically. This enhancement allows for more flexible customization of individual toast and message instances, improving usability and design options.

## 0.3.10

### Patch Changes

- f7b8915: feat(RadioGroup): update props; add RadioGroupLayout for flexible arrangement
  - Enhanced RadioGroup props for more flexible configurations.
  - Introduced RadioGroupLayout component to support inline and stack layouts.
  - Improved group layout customization and alignment options.

- Updated dependencies [91039a4]
- Updated dependencies [f7b8915]
  - @raxium/themes@0.2.6

## 0.3.9

### Patch Changes

- ba94175: Introduce new `pin-input` component.
  - Added a new `pin-input` component to the design system, allowing users to enter and manage PIN codes or similar discrete character inputs.

  This update adds `pin-input` to both `@raxium/vue` and `@raxium/themes` packages.

- 2765cff: Adjusted the sizing options for multiple theme components to improve consistency and visual alignment. Updated the size scales, spacing, and padding for Tree and Pin Input components, ensuring better alignment across different sizes (xs, sm, base, lg). These changes improve overall appearance and usability throughout the UI.
- Updated dependencies [4c0e86b]
- Updated dependencies [ba94175]
- Updated dependencies [2765cff]
  - @raxium/themes@0.2.5

## 0.3.8

### Patch Changes

- 23858c1: chore: update parameter types for toast and message components

## 0.3.7

### Patch Changes

- b984bc0: - Add more consistent indicator slot usage and styling for branch and leaf checkboxes in TreeCheckboxNode and TreeNode components.
- f2b6c95: ### Added
  - Support for resuming dialog close sequence with a `resumeBeforeClose` method in the dialog API (`Dialog.vue`). This allows dialogs that use a `beforeClose` hook to be manually continued without auto-closing, giving more control over the close flow.

- d6fa7a2: - Fixed use-toast return params name

## 0.3.6

### Patch Changes

- 7d28fb0: - 修复 MenuContent 组件内容区域样式与结构逻辑，提升与 TooltipContent 结构一致性
- 59d338a: - 将 `lucide-next` 替换为 `@lucide/vue` 作为图标库依赖，提高兼容性与一致性。
- Updated dependencies [a2a0a9a]
  - @raxium/themes@0.2.4

## 0.3.5

### Patch Changes

- 85a2ac0: FIX: Centralize Lucide icon sizing in tv crafts (`[&_svg]:size-*`) and align Pagination goto/page-size sizing with theme scale.
- a594654: 升级依赖：更新 ark-ui 和 zagjs 至新版本，提升兼容性与功能完善。
- Updated dependencies [85a2ac0]
  - @raxium/themes@0.2.3

## 0.3.4

### Patch Changes

- 829befc: FIX: 修复 FloatingPanel 结构组件继承和传递主题，遵循 theme 边界约束规范。

## 0.3.3

### Patch Changes

- d899447: FIX: 修复主题系统在合并Crafts时优先级错误，确保组件级Crafts覆盖全局设置。
- Updated dependencies [d899447]
  - @raxium/themes@0.2.2

## 0.3.2

### Patch Changes

- 1175d81: - 优化 Dialog 组件结构，确保 body 部分始终渲染于 surface-razer 主题下使用正确的背景色（bg-gray-01）。
  - 调整 themes 中对 dialog 相关样式，确保 body、content、footer 在 surface-razer 主题一致性。
- 575e7d9: - 修复：Dialog 组件主题透传、Dialog 内 Ark/Dialog 的 unmountOnExit/lazyMount 透传问题
- Updated dependencies [1175d81]
  - @raxium/themes@0.2.1

## 0.3.1

### Patch Changes

- 38ce9b4: - Fix date-picker: improve theme and slot styling for DatePicker and DatePickerView components

## 0.3.0

### Minor Changes

- 810718c: themes system v2

### Patch Changes

- Updated dependencies [810718c]
  - @raxium/themes@0.2.0

## 0.2.23

### Patch Changes

- 8c71ff0: publish
- Updated dependencies [8c71ff0]
  - @raxium/themes@0.1.16

## 0.2.22

### Patch Changes

- 1ce5fb6: FIX: slider tooltip positioning shift bugs
- 97a4e82: FIX: zag.js popper shift/clip eagerly snapshots boundary

## 0.2.21

### Patch Changes

- 75b6b13: FIX: slider tooltip widget prop type

## 0.2.20

### Patch Changes

- 6810d5f: FIX: input $attrs bind
- 3ee9dc4: FIX: functional dialog options theme type
- 9c7b018: FEAT: Add ui & widget props in slider marker and tooltip marker
- Updated dependencies [9c7b018]
  - @raxium/themes@0.1.15

## 0.2.19

### Patch Changes

- 859a5e6: FIX: Fixed the responsiveness of the functional Dialog props

## 0.2.18

### Patch Changes

- e537de8: FIX: functional Dialogs cascade display
- 9719543: FEAT: Dialog add data-surface

## 0.2.17

### Patch Changes

- 8332264: FIX: Spin mode default value

## 0.2.16

### Patch Changes

- Updated dependencies [1d3df5c]
- Updated dependencies [aed5bf0]
  - @raxium/themes@0.1.14

## 0.2.15

### Patch Changes

- 196236e: FIX: Tabs trigger's computed and list's watchEffect not excuted when trigger dynamic show/hide
- 2693d6c: FIX: Spin Component crafts
- 2693d6c: FIX: Spin component dom structure
- Updated dependencies [96f91a8]
- Updated dependencies [2693d6c]
  - @raxium/themes@0.1.13

## 0.2.14

### Patch Changes

- Updated dependencies [43580c1]
- Updated dependencies [c073a47]
  - @raxium/themes@0.1.12

## 0.2.13

### Patch Changes

- 252a2c4: FEAT: add useDialog to solve the issue where it is impossible to obtain the context data of the Vue instance when creating a functional Dialog.

## 0.2.12

### Patch Changes

- Updated dependencies [c8cf78f]
  - @raxium/themes@0.1.11

## 0.2.11

### Patch Changes

- 7d0a7bf: FIX: Dialog z-index stacking display
- 9535248: FIX: Dialog export needs types
- Updated dependencies [7d0a7bf]
  - @raxium/themes@0.1.10

## 0.2.10

### Patch Changes

- d81b8ab: - FEAT: Add Tooltip/Popover/HoverCard/Menu/Select/DatePicker poper like components, global placement config
  - FEAT: add dialog before-close prop to control close before done func call

## 0.2.8

### Patch Changes

- f0937c3: FIX: slider marker add value slot
- eff1140: FEAT: Add pop components and independent global settings
- 241d4f4: FIX: the focus issues and accessibility selection problems of Checkbox and TreeCheckboxItem
- Updated dependencies [241d4f4]
  - @raxium/themes@0.1.9

## 0.2.7

### Patch Changes

- 2b13800: FIX: input watch props modelValueChange
- 7caf891: FIX: Remove 'hidden' class from HiddenInput components in Checkbox, RadioGroup, Slider, Switch, and TagsInput for improved accessibility
- Updated dependencies [7caf891]
  - @raxium/themes@0.1.8

## 0.2.6

### Patch Changes

- 6dee0b7: FIX: Datepicker lazy-mount & unmount on exit props
- ddd2f2b: FIX: Dialog footer button default style

## 0.2.5

### Patch Changes

- 502eca9: FIX: Button default value

## 0.2.4

### Patch Changes

- 59fe7c5: FIX: input props
- da6ffda: FEAT: Pagination add `dynamic page end` feature
- 9aec289: FEAT: add button variant and color to control styles
  FEAT: add more colors vars
  FIX: fix razer static rz colors
- Updated dependencies [9aec289]
  - @raxium/themes@0.1.7

## 0.2.3

### Patch Changes

- 7f60f14: rebuild
- Updated dependencies [7f60f14]
  - @raxium/themes@0.1.6

## 0.2.3

### Patch Changes

- e535dc8: FIX: add input key events emits
- 312a505: FIX: editable focus style
  FIX: number-input focus events
- 37eaa6a: FIX: Optimize the input focus effect
- Updated dependencies [312a505]
- Updated dependencies [37eaa6a]
  - @raxium/themes@0.1.6

## 0.2.2

### Patch Changes

- 87bb15a: CHORE: update lucide-next -> v1.0.0
- 5b2c0c7: CHORE: remove input component unuse types
- 0a71c62: CHORE: remove input unuse types
- f007c79: FEAT: Add new event listeners to the input component
- Updated dependencies [b5f0f69]
- Updated dependencies [e6f4c25]
  - @raxium/themes@0.1.5

## 0.2.1

### Patch Changes

- Updated dependencies [1271517]
  - @raxium/themes@0.1.4

## 0.2.0

### Minor Changes

- 8c53b5a: Update ark-ui/vue -> 5.35.0

## 0.1.3

### Patch Changes

- 840be63: fixed: spin renderIcon empty vnode judge
- Updated dependencies [cc2d621]
  - @raxium/themes@0.1.3

## 0.1.2

### Patch Changes

- 7b0300a: add Accordion component support
- Updated dependencies [7b0300a]
  - @raxium/themes@0.1.2

## 0.1.1

### Patch Changes

- 7ceb737: PUBLISH FIRST VERSION
