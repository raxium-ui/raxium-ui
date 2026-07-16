---
"@raxium/vue": patch
"@raxium/themes": patch
---

Simplify theme crafts to app-level + instance-level only.

- `@raxium/themes`: add `@raxium/themes/runtime` (`ThemeProps` / `ThemeConfig` / `ResolvedTheme`, craft merge helpers). `ThemeProps` is tokens-only; crafts live on `ThemeConfig` (`RUIConfig.theme.crafts`).
- `@raxium/vue`: `useTheme` merges crafts only from config; instance overrides via `:craft` (`useCraft` / `useThemeCraft`). Scope Theme / `:theme` no longer accept `crafts`. Fix missing craft bake on Tooltip, Popover, Menu, Messager, Toaster, ScrollArea. Narrow Menu / TagsInput / NumberInput `ThemeCrafts` to a single primary craft key.
