# Raxium UI — Theme Customization Guide

> **Default audience**: app developers styling Raxium components.  
> Skin-pack / design-system authors: see [Advanced](#5-advanced-presets-and-craft).  
> Component authors (Vue / React internals): see `packages/vue/core/docs/theme-system.md`.  
> 中文版：[THEME-CUSTOMIZATION-GUIDE.zh-CN.md](./THEME-CUSTOMIZATION-GUIDE.zh-CN.md)

---

## Table of Contents

1. [Default path (start here)](#1-default-path-start-here)
2. [Decision tree](#2-decision-tree)
3. [Architecture (short)](#3-architecture-short)
4. [Tokens (CSS custom properties)](#4-tokens-css-custom-properties)
5. [Advanced: presets and `craft`](#5-advanced-presets-and-craft)
6. [Appendix: types](#6-appendix-types)

---

## 1. Default path (start here)

Most apps only need **three knobs**. Do not reach for `craft` or `theme.crafts` until the tree in [§2](#2-decision-tree) says so.

| Scope | Use | Do not use |
| --- | --- | --- |
| Whole app | `RUIConfig` **tokens** + CSS variables | Do not put a raw `tv*` table here unless you are shipping a skin pack |
| A region (page, panel, overlay stack) | `ThemeProvider` (`size` / `surface` / `skin` / `bordered`) | Do not wrap a subtree just to change craft structure |
| One instance | `class` / `ui` | Do not use `:craft` to append classes |

`ThemeProvider` and component `theme` are **tokens only**. They never accept `crafts`.

### 1.1 App root

```vue
<script setup lang="ts">
import { RUIConfig } from '@raxium/vue'
</script>

<template>
  <RUIConfig :theme="{ skin: 'razer', surface: 'dark', size: 'base', bordered: true }">
    <App />
  </RUIConfig>
</template>
```

```tsx
import { RUIConfig } from '@raxium/react'

export function Root() {
  return (
    <RUIConfig theme={{ skin: 'razer', surface: 'dark', size: 'base', bordered: true }}>
      <App />
    </RUIConfig>
  )
}
```

Import the skin CSS once (after your Tailwind entry), e.g. `@raxium/themes/razer/index.css`.

To recolor the whole library, override **semantic tokens** — [§4](#4-tokens-css-custom-properties).

### 1.2 A region

Use `ThemeProvider` when a subtree should differ in size or surface (e.g. a light panel inside a dark app):

```vue
<ThemeProvider :value="{ surface: 'light', size: 'sm' }">
  <SettingsForm />
</ThemeProvider>
```

### 1.3 One instance

Prefer **`class`** (root) and **`ui`** (named slots). They merge on top of crafts via `clsx` / `cxc`; they do not replace the `tv*` definition.

```vue
<Button class="shadow-lg" :ui="{ loading: 'text-blue-500' }">
  Styled
</Button>

<DialogContent class="max-w-4xl" :ui="{ backdrop: 'bg-black/80' }" />
```

Use the component **`theme`** prop only for token knobs on that instance (`size`, `skin`, `surface`, `bordered`, `unstyled`):

```vue
<Button :theme="{ size: 'sm' }">Smaller</Button>
<Input :theme="{ bordered: false, surface: 'light' }" />
```

---

## 2. Decision tree

```
Color, spacing, or typography for the whole product?
├── Yes → CSS tokens (§4)
└── No
    ├── Whole app / many components need smaller layout or different default variants?
    │   └── Skin pack / design system → preset → RUIConfig.theme.crafts (§5)
    └── One instance or a small subtree?
        ├── Size / surface / skin for a region → ThemeProvider
        ├── Size / surface / skin for one component → theme prop
        ├── Width, shadow, extra slot class → class / ui
        └── Must change tv* structure, defaultVariants, or compounds
            └── craft (instance) or preset (app-wide) — §5
```

| Scenario | Use |
| --- | --- |
| Change brand color across the app | `--color-rui-primary-*` tokens |
| Make all surfaces warmer/cooler | `--color-gray-*` primitives, or remap `--color-rui-*` |
| Light form inside a dark shell | `ThemeProvider` `{ surface: 'light' }` |
| One dialog wider | `class` / `ui` on content |
| One button shadow | `class` / `ui` |
| App-wide compact sizing | **Advanced**: preset → `RUIConfig.theme.crafts` |
| One extra `tv*` size branch | **Advanced**: instance `craft` |

`useTheme`, `useInheritedTheme`, Component Theme vs Scope Theme are **library internals**. App code should not call them.

---

## 3. Architecture (short)

Three implementation layers (you usually only touch the first):

```
┌──────────────────────────────────────────────────┐
│  Tokens (CSS custom properties)                  │  ← colors, spacing (app default)
│  primitives.css → semantic.css                   │
├──────────────────────────────────────────────────┤
│  Crafts (tailwind-variants / tv*)                │  ← structure, sizing, states
│  default/crafts/*  — skin packs override here    │
├──────────────────────────────────────────────────┤
│  Component CSS (skin)                            │  ← hover/focus via .rui-* + data-*
└──────────────────────────────────────────────────┘
```

**Token merge** (lowest → highest): library defaults → `RUIConfig.theme` tokens → `ThemeProvider` → component `theme`.

**Crafts table merge**: library defaults → **`RUIConfig.theme.crafts` only** → instance `craft` (`CraftOverride`).

**Render**: `ui` + root `class` on top.

| Type | Shape | Who uses it |
| --- | --- | --- |
| `ThemeProps` | tokens only | `ThemeProvider`, component `theme` |
| `ThemeConfig` | tokens + optional `crafts?` | `RUIConfig.theme` (skin packs) |
| `ResolvedTheme` | tokens + required `crafts` | internals (`useTheme`) |

Types live in `@raxium/themes/runtime` (re-exported from `@raxium/vue/providers` and `@raxium/react/providers`).

---

## 4. Tokens (CSS custom properties)

**When**: change colors, spacing, or typography across the app without touching component JS.

Import your overrides **after** Raxium theme CSS.

### 4.1 Semantic tokens (prefer this)

```css
/* my-theme.css */

@theme {
  --color-rui-primary: oklch(60% 0.25 250);
  --color-rui-primary-hover: oklch(55% 0.25 250);
  --color-rui-primary-active: oklch(50% 0.25 250);
  --color-rui-primary-border: oklch(45% 0.25 250);
  --color-rui-primary-muted: oklch(35% 0.12 250);

  --color-rui-surface-base: oklch(20% 0.01 250);
  --color-rui-surface-container: oklch(25% 0.01 250);
  --color-rui-surface-elevated: oklch(28% 0.01 250);
}
```

| Category | Prefix | Tokens |
| --- | --- | --- |
| Surface / Background | `--color-rui-surface-*` | `base`, `container`, `elevated`, `sunken`, `inverse`, `disabled`, `hover` |
| Text / Foreground | `--color-rui-text-*` | `primary`, `secondary`, `disabled`, `inverse`, `placeholder`, `on-primary` |
| Primary (brand) | `--color-rui-primary-*` | (no suffix), `hover`, `active`, `border`, `muted` |
| Danger | `--color-rui-danger-*` | (no suffix), `hover`, `active`, `border`, `muted` |
| Warning | `--color-rui-warning-*` | (no suffix), `hover`, `active`, `border`, `muted` |
| Info | `--color-rui-info-*` | (no suffix), `hover`, `active`, `border`, `muted` |
| Border | `--color-rui-border-*` | `default`, `subtle`, `strong`, `focus` |
| Input | `--color-rui-input-*` | `bg`, `border`, `focus-border`, `placeholder`, `disabled-bg` |

### 4.2 Primitive tokens

For deeper ramps, override primitives that semantic tokens reference:

```css
@theme {
  --color-gray-03: oklch(15% 0.02 60);
  --color-gray-16: oklch(20% 0.02 60);
}
```

Prefer semantic tokens. Primitive overrides cascade, but mappings are not always 1:1.

---

## 5. Advanced: presets and `craft`

For **skin / design-system authors**. App pages should stay on [§1](#1-default-path-start-here).

Use this when you must change `tv*` structure, default variants, or compounds across many components — not to add a shadow on one button.

### 5.1 Define a preset

```ts
import { definePreset } from '@raxium/themes/utils'

export const compactPreset = definePreset({
  name: 'compact',
  crafts: {
    tvButton: {
      variants: {
        size: {
          base: { root: 'h-7 px-4 text-sm' },
          lg: { root: 'h-8 px-5 text-base' },
        },
      },
    },
    tvInput: {
      variants: {
        size: {
          base: { root: 'h-7 text-sm' },
        },
      },
    },
  },
})
```

### 5.2 Extend and merge

```ts
import { definePreset } from '@raxium/themes/utils'

export const enterprisePreset = definePreset({
  name: 'enterprise',
  extend: compactPreset,
  crafts: {
    tvButton: {
      defaultVariants: { variant: 'outlined' },
    },
  },
})
```

```ts
import { crafts } from '@raxium/themes/default'
import { mergePresets, resolvePreset } from '@raxium/themes/utils'

const resolvedCrafts = resolvePreset(enterprisePreset, crafts)
const merged = mergePresets([compactPreset, roundedPreset], crafts)
```

Later presets win on the same craft key.

Apply **once** at the app root as a skin pack:

```vue
<RUIConfig :theme="{ skin: 'razer', surface: 'dark', crafts: resolvedCrafts }">
  <App />
</RUIConfig>
```

### 5.3 Instance `craft` (`CraftOverride`)

Use only when `class` / `ui` cannot express the change (new variant branch, `defaultVariants`, compounds).

```vue
<Button :craft="{ defaultVariants: { variant: 'outlined', size: 'lg' } }">
  Defaults
</Button>

<Button
  :craft="{
    variants: {
      size: {
        xl: { root: 'h-12 text-xl px-8' },
      },
    },
  }"
>
  XL
</Button>
```

Do **not** use `craft.slots` / `craft.base` just to append classes — that is `ui` / `class`.

| Field | Description |
| --- | --- |
| `slots` | Per-slot classes merged into slot functions |
| `defaultVariants` | Default variant map for this instance |
| `base` | Passed into `tv({ extend: baseCraft, base })` |
| `variants` | Extend or replace variant definitions |
| `compoundVariants` | Extra compound variant rules |
| `compoundSlots` | Extra compound slot rules |

---

## 6. Appendix: types

```ts
import type { CraftOverride, Crafts, SlotKeysOf, UIProps } from '@raxium/vue/providers'
// or: import type { … } from '@raxium/react/providers'

interface MyComponentProps {
  ui?: UIProps<'tvButton'>
  // { root?: string; loading?: string }
}

type ButtonSlots = SlotKeysOf<Crafts['tvButton']>
// 'root' | 'loading'

const override: CraftOverride<'tvButton'> = {
  defaultVariants: { variant: 'outlined', size: 'lg' },
}
```

Vue (and React) component props still expose `theme` + `craft` via `ThemeCrafts<'tvButton'>`. Treat **`craft` as advanced**; everyday styling is `theme` tokens + `ui` / `class`.
