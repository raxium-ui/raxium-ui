# Raxium UI — Theme Customization Guide

> **Audience**: Developers consuming `@raxium/themes` who want to customize the visual appearance of Raxium UI components.

---

## Table of Contents

1. [Architecture Overview](#1-architecture-overview)
2. [Level 1: Token Override (CSS Custom Properties)](#2-level-1-token-override)
3. [Level 2: Preset Creation (Composable Theme Extension)](#3-level-2-preset-creation)
4. [Level 3: Component theme, craft, and ui](#4-level-3-component-theme-craft-and-ui)
5. [Choosing the Right Level](#5-choosing-the-right-level)

---

## 1. Architecture Overview

Raxium UI's theme system has three layers:

```
┌──────────────────────────────────────────────────┐
│  Tokens (CSS Custom Properties)                  │  ← Lowest level: raw colors, spacing
│  tokens/primitives.css → tokens/semantic.css     │
├──────────────────────────────────────────────────┤
│  Crafts (tailwind-variants definitions)          │  ← Structural: layout, sizing, states
│  34 craft files in default/crafts/               │
├──────────────────────────────────────────────────┤
│  Component CSS (Razer theme)                     │  ← Visual: color, hover, focus styles
│  34 CSS files via .rui-* + data-* selectors      │
└──────────────────────────────────────────────────┘
```

**Theme resolution order** (lowest → highest priority):

1. Default crafts and theme defaults from `@raxium/themes/default`.
2. **Global config** (`RUIConfigProvider` `config.theme`): merges `**theme.crafts`** (into the crafts map) and `**skin**`, `**surface**`, `**size**`, `**unstyled**`, `**bordered**` where components read them.
3. **Theme context** (`ThemeProvider` `value`): same `ThemeProps` shape as above — `**crafts`** and variant fields merge with config.
4. **Component `theme` prop**: variant fields only (**no `crafts`**).
5. **Component `craft` prop**: `**CraftOverride`** merged last into that component’s resolved craft.

At render, `**ui**` slot classes and the root `**class**` attach on top (see component docs).

> **Consumers**: Put app-wide overrides in `**RUIConfigProvider :config="{ theme: { crafts, … } }"`** or `**ThemeProvider :value**`; use `**:craft**` on a single instance — **not** `:theme="{ crafts: … }"` on the component.

---

## 2. Level 1: Token Override

**When to use**: Change colors, spacing, or typography across the entire app without touching component logic.

### 2.1 Semantic Token Override

Semantic tokens are purpose-driven CSS variables that all components reference. Override them to re-theme the entire library.

```css
/* my-theme.css — import AFTER raxium's theme CSS */

@theme {
  /* Change brand primary from green to blue */
  --color-rui-primary: oklch(60% 0.25 250);
  --color-rui-primary-hover: oklch(55% 0.25 250);
  --color-rui-primary-active: oklch(50% 0.25 250);
  --color-rui-primary-border: oklch(45% 0.25 250);
  --color-rui-primary-muted: oklch(35% 0.12 250);

  /* Lighter surfaces */
  --color-rui-surface-base: oklch(20% 0.01 250);
  --color-rui-surface-container: oklch(25% 0.01 250);
  --color-rui-surface-elevated: oklch(28% 0.01 250);
}
```

### 2.2 Available Semantic Token Categories


| Category             | Prefix                  | Tokens                                                                     |
| -------------------- | ----------------------- | -------------------------------------------------------------------------- |
| Surface / Background | `--color-rui-surface-*` | `base`, `container`, `elevated`, `sunken`, `inverse`, `disabled`, `hover`  |
| Text / Foreground    | `--color-rui-text-*`    | `primary`, `secondary`, `disabled`, `inverse`, `placeholder`, `on-primary` |
| Primary (brand)      | `--color-rui-primary-*` | (no suffix), `hover`, `active`, `border`, `muted`                          |
| Danger               | `--color-rui-danger-*`  | (no suffix), `hover`, `active`, `border`, `muted`                          |
| Warning              | `--color-rui-warning-*` | (no suffix), `hover`, `active`, `border`, `muted`                          |
| Info                 | `--color-rui-info-*`    | (no suffix), `hover`, `active`, `border`, `muted`                          |
| Border               | `--color-rui-border-*`  | `default`, `subtle`, `strong`, `focus`                                     |
| Input                | `--color-rui-input-*`   | `bg`, `border`, `focus-border`, `placeholder`, `disabled-bg`               |


### 2.3 Primitive Token Override

For more fundamental changes, override primitive tokens. These are the raw values that semantic tokens reference.

```css
@theme {
  /* Override gray primitives for a warmer feel (examples from the Razer ramp) */
  --color-gray-03: oklch(15% 0.02 60);
  --color-gray-16: oklch(20% 0.02 60);
  --color-gray-1a: oklch(22% 0.02 60);
  --color-gray-1b: oklch(25% 0.02 60);
  /* ... */
}
```

> **Tip**: Prefer overriding semantic tokens. Primitive overrides cascade through semantic tokens but may have unexpected effects if the semantic mapping isn't 1:1.

---

## 3. Level 2: Preset Creation

**When to use**: Modify structural styles (sizing, layout, variant defaults) across multiple components in a reusable way.

### 3.1 Define a Preset

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
    tvDialog: {
      variants: {
        size: {
          base: { content: 'max-w-[500px]' },
        },
      },
    },
  },
})
```

### 3.2 Extend a Preset

Presets support chained extension via the `extend` field:

```ts
import { definePreset } from '@raxium/themes/utils'
import { compactPreset } from './compact-preset'

export const enterprisePreset = definePreset({
  name: 'enterprise',
  extend: compactPreset,
  crafts: {
    tvButton: {
      defaultVariants: {
        variant: 'outlined',
      },
    },
  },
})
```

### 3.3 Resolve and Apply

```ts
import { crafts } from '@raxium/themes/default'
import { resolvePreset } from '@raxium/themes/utils'
import { enterprisePreset } from './enterprise-preset'

const resolvedCrafts = resolvePreset(enterprisePreset, crafts)
```

```vue
<template>
  <RUIConfigProvider :config="{ theme: { crafts: resolvedCrafts } }">
    <App />
  </RUIConfigProvider>
</template>
```

### 3.4 Merge Independent Presets

For presets that don't extend each other (e.g., one for sizing, one for shape), use `mergePresets`:

```ts
import { crafts } from '@raxium/themes/default'
import { mergePresets } from '@raxium/themes/utils'

const roundedPreset = definePreset({
  name: 'rounded',
  crafts: {
    tvButton: {
      slots: { root: 'rounded-full' },
    },
    tvInput: {
      slots: { root: 'rounded-full' },
    },
  },
})

// Merge compact sizing + rounded shape
const resolved = mergePresets([compactPreset, roundedPreset], crafts)
```

> **Note**: When presets conflict on the same craft key, later presets take precedence.

---

## 4. Level 3: Component theme, craft, and ui

**When to use**: Tune one instance — **variants** (`theme`), **craft shape** (`craft`), or **quick slot classes** (`ui`).

### 4.1 The `theme` Prop (Variants Only)

The `**theme`** prop mirrors `**ThemeCrafts<'tv…'>['theme']**`: `**skin**`, `**surface**`, `**size**`, `**unstyled**`, `**bordered**`. It merges with config and parent context; it **must not** include `**crafts`**.

```vue
<Button :theme="{ size: 'sm', skin: 'razer' }">Smaller</Button>
<Input :theme="{ bordered: false, surface: 'light' }" />
```

Use this when you only need semantic / size knobs, not a new variant branch on the underlying `tv*` function.

### 4.2 The `craft` Prop (`CraftOverride`)

Use `**craft**` for per-component craft changes: slot class patches, `**defaultVariants**`, or full `**tv()**`-style keys (`**base**`, `**variants**`, `**compoundVariants**`, `**compoundSlots**`). Runtime resolution extends the resolved craft for **that** component (e.g. `Button` → `tvButton`).

```vue
<!-- Per-slot classes (merged at call time) -->
<Button :craft="{ slots: { root: 'h-10 rounded-full', loading: 'size-6' } }">
  Tall round
</Button>

<!-- Default variant values for this instance -->
<Button :craft="{ defaultVariants: { variant: 'outlined', size: 'lg' } }">
  Defaults
</Button>

<!-- Extra variant branch (advanced) -->
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

<!-- Base layer tweak -->
<Button :craft="{ base: 'shadow-lg' }">Shadow</Button>
```

`CraftOverride` fields (implementation: `packages/vue/core/src/providers/theme/theme-props.ts`):


| Field              | Description                                   |
| ------------------ | --------------------------------------------- |
| `slots`            | Per-slot classes merged into slot functions   |
| `defaultVariants`  | Default variant map merged into craft calls   |
| `base`             | Passed into `tv({ extend: baseCraft, base })` |
| `variants`         | Extend or replace variant definitions         |
| `compoundVariants` | Additional compound variant rules             |
| `compoundSlots`    | Additional compound slot rules                |


### 4.3 The `ui` Prop (Per-Slot Class Shortcuts)

For quick per-slot class additions without touching craft logic:

```vue
<Button :ui="{ root: 'shadow-lg', loading: 'text-blue-500' }">
  Styled Slots
</Button>

<DialogContent :ui="{ content: 'max-w-[800px]', backdrop: 'bg-black/80' }">
  Wide Dialog
</DialogContent>
```

> **Tip**: `ui` classes are merged at render time via `clsx()`, so they combine with (rather than replace) craft classes.

### 4.4 Priority (Mental Model)

Merged **theme props** (`skin`, `surface`, `size`, …):

`defaults` ← `RUIConfigProvider` ← `ThemeProvider` ← component `**theme`**

Merged **craft functions** (`crafts` map):

`library defaults` ← `theme.crafts` (config/context) ← component `**craft`** (`resolveCraftOverride`)

Then each render merges `**craft` slot/default tweaks**, `**ui`**, and the root `**class**` via `clsx` / `cxc` as documented per component.

**Do not** put `**crafts`** on a component `**theme**` prop — use `**craft**` or global `**theme.crafts**`.

---

## 5. Choosing the Right Level


| Scenario                                   | Recommended Level                                                            |
| ------------------------------------------ | ---------------------------------------------------------------------------- |
| Change brand color across the app          | **Level 1**: Override `--color-rui-primary-`* tokens                         |
| Make all surfaces warmer/cooler            | **Level 1**: Override `--color-gray-`* primitives (or remap `--color-rui-`*) |
| Create a "compact" app-wide layout         | **Level 2**: `definePreset` with smaller sizes                               |
| Enforce "outlined" as default button style | **Level 2**: Preset with `defaultVariants`                                   |
| Make one specific dialog wider             | **Level 3**: `<DialogContent :craft="{ slots: { content: 'max-w-4xl' } }">`  |
| Add a shadow to one button                 | **Level 3**: `<Button :ui="{ root: 'shadow-lg' }">`                          |
| Build a reusable enterprise theme          | **Level 2**: Preset chain + **Level 1**: Token CSS file                      |


### Decision Flowchart

```
Is it a color/spacing/typography change?
├── Yes → Level 1 (Token Override)
└── No → Does it affect multiple components?
    ├── Yes → Level 2 (Preset)
    └── No → Level 3 (craft / ui / theme prop)
```

---

## Appendix: Type Utilities

### `UIProps<K>` — Auto-derive ui prop type

```ts
import type { UIProps } from '@raxium/vue/providers'

interface MyComponentProps {
  ui?: UIProps<'tvButton'>
  // ↑ Automatically types as { root?: string; loading?: string }
}
```

### `SlotKeysOf<T>` — Extract slot keys from a craft

```ts
import type { SlotKeysOf, Crafts } from '@raxium/vue/providers'

type ButtonSlots = SlotKeysOf<Crafts['tvButton']>
// → 'root' | 'loading'
```

### `CraftOverride<K>` — Type for the `craft` prop

```ts
import type { CraftOverride } from '@raxium/vue/providers'

const override: CraftOverride<'tvButton'> = {
  base: 'shadow-md',
  slots: { root: 'h-10', loading: 'size-6' },
  defaultVariants: { variant: 'outlined', size: 'lg' },
}
```

Vue component props bundle `**theme**` and `**craft**` via `**ThemeCrafts<'tvButton'>**` (see `@raxium/vue/core` exports).