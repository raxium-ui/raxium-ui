# Raxium UI — 主题定制指南

> **默认读者**：使用 `@raxium/themes` 给组件换外观的业务开发。  
> 皮肤包 / 设计系统作者：见 [进阶：Preset 与 craft](#5-进阶preset-与-craft)。  
> 组件作者（Vue / React 内部）：见 `.cursor/rules/theme-boundary.mdc`。  
> English: [THEME-CUSTOMIZATION-GUIDE.md](./THEME-CUSTOMIZATION-GUIDE.md)

---

## 目录

1. [默认路径（从这里开始）](#1-默认路径从这里开始)
2. [决策树](#2-决策树)
3. [架构（精简）](#3-架构精简)
4. [Token（CSS 变量）](#4-tokencss-变量)
5. [进阶：Preset 与 craft](#5-进阶preset-与-craft)
6. [附录：类型](#6-附录类型)

---

## 1. 默认路径（从这里开始）

绝大多数应用只需要 **三档入口**。在 [§2](#2-决策树) 明确指向之前，不要用 `craft` 或 `theme.crafts`。皮肤包走 `RUIConfig` 的 **`preset`**，不要手写合并 crafts 表。

| 范围 | 用什么 | 不要用什么 |
| --- | --- | --- |
| 整个应用 | `RUIConfig` 的 **tokens** + CSS 变量 | 除非需要 [逃逸口](#52-在应用根上挂载)，否则不要把原始 `tv*` 表挂在 `theme.crafts` |
| 一块区域（页面、面板、一层 overlay） | `ThemeProvider`（`size` / `surface` / `skin` / `bordered`） | 不要只为了改 craft 结构而包一层 |
| 某一个实例 | `class` / `className` / `ui` | 不要用 `craft` 来拼 class |

`ThemeProvider` 和组件的 `theme` **只接受 tokens**，不能带 `crafts`。

### 1.1 应用根

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

皮肤 CSS 全应用引入一次（放在 Tailwind 入口之后），例如 `@raxium/themes/razer/index.css`。

要换整库配色，覆盖 **语义 token** —— [§4](#4-tokencss-变量)。

### 1.2 一块区域

子树需要不同的 size / surface 时用 `ThemeProvider`（例如暗色应用里的浅色面板）：

```vue
<ThemeProvider :value="{ surface: 'light', size: 'sm' }">
  <SettingsForm />
</ThemeProvider>
```

### 1.3 某一个实例

优先 **`class` / `className`**（根节点）和 **`ui`**（具名槽位）。它们在 crafts 之上用 `clsx` / `cxc` 合并，**不会**替换 `tv*` 定义。

```vue
<Button class="shadow-lg" :ui="{ loading: 'text-blue-500' }">
  Styled
</Button>

<DialogContent class="max-w-4xl" :ui="{ backdrop: 'bg-black/80' }" />
```

组件 **`theme`** 只用于该实例的 token（`size`、`skin`、`surface`、`bordered`、`unstyled`）：

```vue
<Button :theme="{ size: 'sm' }">更小</Button>
<Input :theme="{ bordered: false, surface: 'light' }" />
```

---

## 2. 决策树

```
整站改颜色 / 间距 / 字体？
├── 是 → CSS token（§4）
└── 否
    ├── 全应用、多个组件要更紧凑的布局或不同的默认 variant？
    │   └── 皮肤包 / 设计系统 → `RUIConfig preset`（§5）
    └── 单个实例或一小块子树？
        ├── 区域的 size / surface / skin → ThemeProvider
        ├── 单个组件的 size / surface / skin → theme prop
        ├── 宽度、阴影、额外槽位 class → class / ui
        └── 必须改 tv* 结构、defaultVariants 或 compound
            └── 实例 craft，或全应用 preset —— §5
```

| 场景 | 用什么 |
| --- | --- |
| 全应用换品牌色 | `--color-rui-primary-*` |
| 让所有表面更暖/更冷 | `--color-gray-*` 或重映射 `--color-rui-*` |
| 暗色壳里一块浅色表单 | `ThemeProvider` `{ surface: 'light' }` |
| 某一个对话框更宽 | content 上的 `class` / `ui` |
| 某一个按钮加阴影 | `class` / `ui` |
| 全应用紧凑尺寸 | **进阶**：`RUIConfig preset` |
| 某一个实例多一个 `tv*` 尺寸分支 | **进阶**：实例 `craft` |

`useTheme`、`useInheritedTheme`、Component Theme / Scope Theme 是 **库内部实现**，业务代码不要调用。

---

## 3. 架构（精简）

实现上分三层（业务通常只碰第一层）：

```
┌──────────────────────────────────────────────────┐
│  Tokens（CSS 自定义属性）                          │  ← 颜色、间距（应用默认）
│  primitives.css → semantic.css                   │
├──────────────────────────────────────────────────┤
│  Crafts（tailwind-variants / tv*）                 │  ← 结构、尺寸、状态
│  default/crafts/*  — 皮肤包在这里覆盖              │
├──────────────────────────────────────────────────┤
│  组件 CSS（皮肤）                                  │  ← hover/focus：.rui-* + data-*
└──────────────────────────────────────────────────┘
```

**Token 合并**（低 → 高）：库默认 → `RUIConfig.theme` 的 token → 可选的 `RUIConfig.<component>.theme` → `ThemeProvider` → 组件 `theme`。

**Crafts 表合并**：库默认 → **`RUIConfig preset`**（未列出的 `tv*` 沿用默认）→ 可选的 `theme.crafts` 逃逸口 → 实例 `craft`（`CraftOverride`）。

**渲染时**：再叠 `ui` + 根节点 `class` / `className`。

| 类型 | 形状 | 谁用 |
| --- | --- | --- |
| `ThemeProps` | 仅 tokens | `ThemeProvider`、组件 `theme` |
| `ThemeConfig` | tokens + 可选 `crafts?` | `RUIConfig.theme`（`crafts` 是逃逸口） |
| `CraftPreset` | 具名的 `tv*` **options** 包 | `RUIConfig preset` |
| `ResolvedTheme` | tokens + 必有 `crafts` | 内部（`useTheme`） |

类型在 `@raxium/themes/runtime`，并由 `@raxium/vue/providers`、`@raxium/react/providers` 再导出。

---

## 4. Token（CSS 变量）

**何时用**：改全应用颜色、间距、字体，且不改组件 JS。

覆盖文件必须写在 Raxium 主题 CSS **之后**。

### 4.1 语义 Token（优先）

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

| 类别 | 前缀 | Token |
| --- | --- | --- |
| 表面 / 背景 | `--color-rui-surface-*` | `base`、`container`、`elevated`、`sunken`、`inverse`、`disabled`、`hover` |
| 文本 / 前景 | `--color-rui-text-*` | `primary`、`secondary`、`disabled`、`inverse`、`placeholder`、`on-primary` |
| 主色（品牌） | `--color-rui-primary-*` | （无后缀）、`hover`、`active`、`border`、`muted` |
| 危险 | `--color-rui-danger-*` | （无后缀）、`hover`、`active`、`border`、`muted` |
| 警告 | `--color-rui-warning-*` | （无后缀）、`hover`、`active`、`border`、`muted` |
| 信息 | `--color-rui-info-*` | （无后缀）、`hover`、`active`、`border`、`muted` |
| 边框 | `--color-rui-border-*` | `default`、`subtle`、`strong`、`focus` |
| 输入 | `--color-rui-input-*` | `bg`、`border`、`focus-border`、`placeholder`、`disabled-bg` |

### 4.2 原始 Token

要改得更底层时，覆盖语义 token 所引用的原始色阶：

```css
@theme {
  --color-gray-03: oklch(15% 0.02 60);
  --color-gray-16: oklch(20% 0.02 60);
}
```

优先改语义 token。原始 token 会往下 cascade，但映射不一定是 1:1。

---

## 5. 进阶：Preset 与 craft

给 **皮肤 / 设计系统作者**。业务页面请留在 [§1](#1-默认路径从这里开始)。

仅在必须改多个组件的 `tv*` 结构、默认 variant 或 compound 时使用——不要用它给单个按钮加阴影。

### 5.1 定义 Preset

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

### 5.2 在应用根上挂载

把皮肤包传给 `RUIConfig`。Provider 会相对 `@raxium/themes/default` 做 resolve。你没写的 key 整份沿用库默认 `tv*`。

```vue
<script setup lang="ts">
import { compactPreset } from './compact-preset'
</script>

<template>
  <RUIConfig
    :theme="{ skin: 'razer', surface: 'dark' }"
    :preset="compactPreset"
  >
    <App />
  </RUIConfig>
</template>
```

```tsx
import { RUIConfig } from '@raxium/react'
import { compactPreset } from './compact-preset'

export function Root() {
  return (
    <RUIConfig theme={{ skin: 'razer', surface: 'dark' }} preset={compactPreset}>
      <App />
    </RUIConfig>
  )
}
```

**血缘**（`extend`）：一个包建立在另一个之上。

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

**彼此独立的包**：传数组。同一 `tv*` key 以后写的为准。

```vue
<RUIConfig :preset="[compactPreset, roundedPreset]">
  <App />
</RUIConfig>
```

应用代码 **不要** 自己 `import { crafts }` 再 `resolvePreset` —— 这就是 `preset` 要做的事。

`theme.crafts` 是 **逃逸口**（已经 resolve 好的 `tv*` 函数、测试、迁移）。叠放顺序：库默认 ← `preset` ← `theme.crafts`。

### 5.3 实例 `craft`（`CraftOverride`）

仅当 `class` / `ui` 表达不了时再用（新 variant 分支、`defaultVariants`、compound）。

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

不要用 `craft.slots` / `craft.base` 只为了追加 class —— 那是 `ui` / `class` / `className` 的事。

| 字段 | 说明 |
| --- | --- |
| `slots` | 合并进各 slot 函数的 class |
| `defaultVariants` | 该实例的默认 variant |
| `base` | 传入 `tv({ extend: baseCraft, base })` |
| `variants` | 扩展或替换 variant 定义 |
| `compoundVariants` | 额外的 compound variant |
| `compoundSlots` | 额外的 compound slot |

---

## 6. 附录：类型

```ts
import type { CraftOverride, Crafts, SlotKeysOf, UIProps } from '@raxium/vue/providers'
// 或：import type { … } from '@raxium/react/providers'

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

Vue / React 组件 props 仍通过 `ThemeCrafts<'tvButton'>` 同时暴露 `theme` 和 `craft`。日常样式用 **token 的 `theme` + `ui` / `class` / `className`**；把 **`craft` 当成进阶能力**。
