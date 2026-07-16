# @raxium/shared

## 0.1.2

### Patch Changes

- 79063ed: Simplify theme crafts to app-level + instance-level only; extract overlay depth stack to shared.
  - `@raxium/themes`: add `@raxium/themes/runtime` (`ThemeProps` / `ThemeConfig` / `ResolvedTheme`, craft merge helpers). `ThemeProps` is tokens-only; crafts live on `ThemeConfig` (`RUIConfig.theme.crafts`).
  - `@raxium/shared`: add `@raxium/shared/depth` (`createDepthStore`, z-index math) for framework-agnostic overlay stacking.
  - `@raxium/vue`: `useTheme` merges crafts only from config; instance overrides via `:craft` (`useCraft` / `useThemeCraft`). Scope Theme / `:theme` no longer accept `crafts`. Fix missing craft bake on Tooltip, Popover, Menu, Messager, Toaster, ScrollArea. Narrow Menu / TagsInput / NumberInput `ThemeCrafts` to a single primary craft key. `useDepth*` now adapts `@raxium/shared/depth`.

## 0.1.1

### Patch Changes

- 32a6cd2: PUBLISH FIRST VERSION
