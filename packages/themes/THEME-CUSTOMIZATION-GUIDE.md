# Raxium UI — Theme Customization Guide

> **Audience**: Developers consuming `@raxium/themes` who want to customize the visual appearance of Raxium UI components.

---

## Table of Contents

1. [Architecture Overview](#1-architecture-overview)
2. [Level 1: Token Override (CSS Custom Properties)](#2-level-1-token-override)
3. [Level 2: Preset Creation (Composable Theme Extension)](#3-level-2-preset-creation)
4. [Level 3: Single-Component Craft Override](#4-level-3-single-component-craft-override)
5. [Choosing the Right Level](#5-choosing-the-right-level)

---

## 1. Architecture Overview

Raxium UI's theme system has three layers:

```
┌──────────────────────────────────────────────────┐
│  Tokens (CSS Custom Properties)                  │  ← Lowest level: raw colors, spacing
│  tokens/_primitives.css → tokens/_semantic.css    │
├──────────────────────────────────────────────────┤
│  Crafts (tailwind-variants definitions)          │  ← Structural: layout, sizing, states
│  34 craft files in default/crafts/               │
├──────────────────────────────────────────────────┤
│  Component CSS (Razer theme)                     │  ← Visual: color, hover, focus styles
│  34 CSS files via .rui-* + data-* selectors      │
└──────────────────────────────────────────────────┘
```

**Theme resolution order** (lowest → highest priority):

1. Default crafts (`@raxium/themes/default`)
2. Global config (`RUIConfigProvider` → `theme.crafts`)
3. Context (`ThemeProvider`)
4. Component props (`theme` / `craft` prop)

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

| Category | Prefix | Tokens |
|----------|--------|--------|
| Surface / Background | `--color-rui-surface-*` | `base`, `container`, `elevated`, `sunken`, `inverse`, `disabled`, `hover` |
| Text / Foreground | `--color-rui-text-*` | `primary`, `secondary`, `disabled`, `inverse`, `placeholder`, `on-primary` |
| Primary (brand) | `--color-rui-primary-*` | (no suffix), `hover`, `active`, `border`, `muted` |
| Danger | `--color-rui-danger-*` | (no suffix), `hover`, `active`, `border`, `muted` |
| Warning | `--color-rui-warning-*` | (no suffix), `hover`, `active`, `border`, `muted` |
| Info | `--color-rui-info-*` | (no suffix), `hover`, `active`, `border`, `muted` |
| Border | `--color-rui-border-*` | `default`, `subtle`, `strong`, `focus` |
| Input | `--color-rui-input-*` | `bg`, `border`, `focus-border`, `placeholder`, `disabled-bg` |

### 2.3 Primitive Token Override

For more fundamental changes, override primitive tokens. These are the raw values that semantic tokens reference.

```css
@theme {
  /* Override the entire neutral palette for a warmer feel */
  --color-rz-neutral-950: oklch(15% 0.02 60);
  --color-rz-neutral-900: oklch(20% 0.02 60);
  --color-rz-neutral-875: oklch(22% 0.02 60);
  --color-rz-neutral-850: oklch(25% 0.02 60);
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

## 4. Level 3: Single-Component Craft Override

**When to use**: Customize a specific component instance without affecting others.

### 4.1 The `craft` Prop (Recommended)

The simplest way to override styles on a single component:

```vue
<!-- Append a class to the root slot -->
<Button :craft="{ class: 'h-10 rounded-full' }">Tall Round Button</Button>

<!-- Override per-slot classes -->
<Button :craft="{ slots: { root: 'h-10', loading: 'size-6' } }">
  Custom Slots
</Button>

<!-- Change default variant values -->
<Button :craft="{ defaults: { variant: 'outlined', size: 'lg' } }">
  Default Outlined Large
</Button>

<!-- Deep extend with new variants (advanced) -->
<Button :craft="{ extend: { variants: { size: { xl: { root: 'h-12 text-xl px-8' } } } } }">
  Extended
</Button>
```

`craft` prop fields:

| Field | Type | Description |
|-------|------|-------------|
| `class` | `string` | Appended to the `root` slot |
| `slots` | `Record<SlotKey, string>` | Class overrides per slot |
| `defaults` | `Record<VariantKey, Value>` | Override default variant values |
| `extend` | `CraftInput` | Full craft extension (variants, compoundVariants, etc.) |

### 4.2 The `theme` Prop (Full Control)

For more complex overrides, use the `theme` prop:

```vue
<!-- Override via CraftInput (variants/slots/compoundVariants) -->
<Button
  :theme="{
    crafts: {
      variants: {
        size: {
          xl: { root: 'h-12 text-xl px-8' },
        },
      },
    },
  }"
>
  Custom Size XL
</Button>

<!-- Pass a factory function -->
<Button
  :theme="{
    crafts: () => tv({
      extend: tvButton,
      slots: { root: 'shadow-lg' },
    }),
  }"
/>
```

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

### 4.4 Priority

When multiple override mechanisms are used together:

```
craft.class → merged into slot call's `class` param
craft.defaults → used as fallback variant values
craft.extend → creates new tv() with base craft extended
ui.{slot} → appended via clsx() at render time
theme.crafts → resolved via resolvePropsCrafts (deepest override)
```

Final class output = craft base classes + variant classes + `craft` additions + `ui` additions + `class` prop

---

## 5. Choosing the Right Level

| Scenario | Recommended Level |
|----------|-------------------|
| Change brand color across the app | **Level 1**: Override `--color-rui-primary-*` tokens |
| Make all surfaces warmer/cooler | **Level 1**: Override `--color-rz-neutral-*` primitives |
| Create a "compact" app-wide layout | **Level 2**: `definePreset` with smaller sizes |
| Enforce "outlined" as default button style | **Level 2**: Preset with `defaultVariants` |
| Make one specific dialog wider | **Level 3**: `<DialogContent :craft="{ slots: { content: 'max-w-4xl' } }">` |
| Add a shadow to one button | **Level 3**: `<Button :ui="{ root: 'shadow-lg' }">` |
| Build a reusable enterprise theme | **Level 2**: Preset chain + **Level 1**: Token CSS file |

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

### `CraftShorthand<K>` — Type for the `craft` prop

```ts
import type { CraftShorthand } from '@raxium/vue/providers'

const override: CraftShorthand<'tvButton'> = {
  class: 'h-10',
  slots: { loading: 'size-6' },
  defaults: { variant: 'outlined' },
}
```
