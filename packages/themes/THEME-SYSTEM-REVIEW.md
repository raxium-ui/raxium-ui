# Raxium UI 主题系统设计评审报告

> **日期**: 2026-05-11  
> **范围**: `@raxium/themes` 包及其在 `@raxium/vue` 中的消费模式  
> **目标**: 统一设计哲学、提高可扩展性、简化 crafts 自定义/继承机制

---

## 目录

1. [当前架构概览](#1-当前架构概览)
2. [核心问题诊断](#2-核心问题诊断)
3. [设计哲学对标：Panda CSS vs 当前方案](#3-设计哲学对标panda-css-vs-当前方案)
4. [建议一：统一设计哲学 — Token-Recipe-Layer 三层模型](#4-建议一统一设计哲学--token-recipe-layer-三层模型)
5. [建议二：提高 tailwind-variants 可扩展性](#5-建议二提高-tailwind-variants-可扩展性)
6. [建议三：简化 crafts 自定义与继承](#6-建议三简化-crafts-自定义与继承)
7. [实施路线图](#7-实施路线图)
8. [附录：文件清单与代码量统计](#8-附录文件清单与代码量统计)

---

## 1. 当前架构概览

### 1.1 数据流

```
RUIConfigProvider (全局配置，含 theme + 组件级 config)
  ↓ provide/inject
ThemeProvider (祖先上下文，可嵌套)
  ↓ provide/inject
useTheme() composable (三层合并)
  ├─ 1. 默认 crafts (来自 @raxium/themes/default)
  ├─ 2. configCrafts  (来自 RUIConfigProvider)
  ├─ 3. contextCrafts (来自最近的 ThemeProvider)
  └─ 4. propsCrafts   (来自组件 theme prop，通过 resolvePropsCrafts 智能解析)
      ↓
组件内: crafts.root({ variant, color, size, ...theme })
      ↓
tailwind-variants 解析变体 → 输出 class 字符串
      ↓
CSS 层 (@layer components) 通过 .rui-* 选择器 + data-* 属性注入颜色/皮肤样式
```

### 1.2 关键模块

| 模块 | 文件 | 职责 | 复杂度 |
|------|------|------|--------|
| tv() 包装器 | `src/utils/tv.ts` (91行) | 包装 tailwind-variants，注入 `unstyled` 变体 + `ruiConfig` class 前缀 | 高 |
| cn/cx 工具 | `src/utils/cn.ts` (18行) | clsx + twMerge 合并 class | 低 |
| 34 个 crafts | `src/default/crafts/*.ts` | 组件样式定义 (slots/variants/compoundVariants) | 中 |
| 共享常量 | `src/default/crafts/_shared.ts` | POPOVER_MOTION 动画类 | 低 |
| CSS 主题层 | `src/razer/components/*.css` (34个) | Razer 主题颜色/交互通过 `@layer components` + data-* 选择器 | 高 |
| CSS 预设 | `src/razer/preset.css` + `src/css/static.css` | 全局 token (颜色、z-index、字号) | 中 |
| useTheme | `composables/useTheme.ts` (91行) | 三层合并 config→context→props | 高 |
| ThemeCrafts 类型 | `theme-props.ts` (48行) | 从 craft 定义推导自定义 prop 类型 | 非常高 |
| RUIConfigProvider | `RUIConfigProvider.vue` (146行) | 全局配置根 | 中 |

### 1.3 当前优势

- ✅ **层级化主题注入**: Global → Context → Props 三级覆盖机制完善
- ✅ **类型安全**: craft 变体自动推导 prop 类型 (`VariantProps<typeof tvButton>`)
- ✅ **unstyled 模式**: tv() 包装器优雅地实现了 unstyled 变体注入
- ✅ **CSS 与 JS 分离**: 结构性样式在 crafts (JS)，颜色/皮肤在 CSS
- ✅ **Ark UI 集成**: data-* 属性驱动的 CSS 选择器与 Ark UI 状态管理天然契合

---

## 2. 核心问题诊断

### 🔴 P0: Crafts 变体为空值，所有视觉样式依赖 CSS

**当前状态**: Button craft 中 `variant` 和 `color` 的值全是空字符串：

```ts
// packages/themes/src/default/crafts/button.ts
variants: {
  variant: {
    solid: '',      // ← 空！
    outlined: '',   // ← 空！
    filled: '',     // ← 空！
  },
  color: {
    primary: '',    // ← 空！
    danger: '',     // ← 空！
  },
}
```

**实际样式来源**: `src/razer/components/button.css` 通过 CSS 选择器：
```css
.rui-btn[data-variant='solid'][data-color='primary'] {
  @apply bg-rz-green text-h00 border-rz-green-border;
}
```

**问题**:
- 开发者看到 craft 定义无法理解实际外观 → 两处维护、认知割裂
- TypeScript 无法校验 CSS 变量是否存在
- 新建主题必须同时编写 JS crafts (结构) + CSS 文件 (颜色)，无法仅通过 crafts 完成主题化
- `tv()` 的 extend 机制只能扩展 JS 层，无法扩展 CSS 层

### 🔴 P0: 创建新主题需要大量重复

**当前状态**: Razer 主题的 `crafts/index.ts` 是空的：

```ts
// packages/themes/src/razer/crafts/index.ts
export {}  // 没有任何 craft！
```

所有主题差异都在 34 个 CSS 文件中，且每个文件都要为每个 `variant × color` 组合手写完整样式。仅 `button.css` 就有 240 行，覆盖 6 个 variant × 5 个 color = 30 种组合。

**影响**: 新增一个主题 ≈ 复制 34 个 CSS 文件 + 修改所有颜色值，无法通过继承/覆盖来减少工作量。

### 🔴 P0: crafts prop 自定义过于复杂

**当前用法**（修改 Button 的 size 变体）：

```vue
<Button
  :theme="{
    crafts: {
      variants: {
        size: {
          base: {
            root: 'h-10 text-xs',
          },
        },
      },
    },
  }"
/>
```

**问题**:
1. 嵌套层级过深 (theme → crafts → variants → size → base → root)
2. 必须精确知道 craft 内部结构 (slot 名、variant 名)
3. 模板内无自动补全 (CraftInput 类型推导在模板中失效)
4. `resolvePropsCrafts` 的三种输入格式 (Partial craft / Function / Full Crafts) 行为隐晦，传错格式会静默失败

### 🟡 P1: ui prop 接口不一致

```ts
// Button: 对象包裹
ui?: { root?: { class?: HTMLAttributes['class'] }, loading?: { class?: HTMLAttributes['class'] } }

// Input: 直接字符串
ui?: { root?: HTMLAttributes['class'], input?: HTMLAttributes['class'] }

// Accordion: 又是直接字符串
ui?: { root?: HTMLAttributes['class'], indicator?: HTMLAttributes['class'] }
```

有的用 `{ class: string }` 包裹，有的直接是 `string`，无法形成统一的 slot 覆盖范式。

### 🟡 P1: 颜色 Token 命名非语义化

```css
--color-h00: oklch(0% 0 0);        /* 什么是 h00？*/
--color-h4f: oklch(42.76% 0 0);    /* 什么是 h4f？*/
--color-h9b: oklch(68.95% 0 0);    /* 什么是 h9b？*/
```

hex 灰阶简写作为变量名严重降低可读性和可维护性。

### 🟡 P1: CSS @layer 策略不完整

当前只有 `@layer components` 用于 Razer 组件样式，但没有完整的层级体系。当用户自定义样式时，优先级不可预测。

### 🟡 P2: Compound Variants 冗长

```ts
// radio-group.ts - 4 个几乎相同的条目
compoundVariants: [
  { size: 'xs', variant: 'checkbox', class: { itemIndicator: 'size-2' } },
  { size: 'sm', variant: 'checkbox', class: { itemIndicator: 'size-2.5' } },
  { size: 'base', variant: 'checkbox', class: { itemIndicator: 'size-3' } },
  { size: 'lg', variant: 'checkbox', class: { itemIndicator: 'size-3.5' } },
]
```

### 🟡 P2: 子组件重复 useTheme() 调用

每个子组件（AccordionTrigger, AccordionContent, DialogContent 等）都要独立调用 `useTheme()`，尽管父组件已经通过 `ThemeProvider` 注入了主题。

---

## 3. 设计哲学对标：Panda CSS vs 当前方案

### Panda CSS 三层架构

```
┌─────────────────────────────────────────────┐
│  Layer 1: Design Tokens (设计令牌)           │
│  颜色、间距、字号、圆角等原子值               │
│  → @theme CSS 变量                           │
├─────────────────────────────────────────────┤
│  Layer 2: Recipes (配方)                     │
│  组件样式 = base + variants + compoundVariants│
│  → CSS class (零运行时)                       │
├─────────────────────────────────────────────┤
│  Layer 3: Slot Recipes (多部件配方)          │
│  多 slot 组件样式定义                         │
│  → 每个 slot 生成独立 CSS class              │
└─────────────────────────────────────────────┘
```

### 对比表

| 维度 | Raxium 当前 | Panda CSS | 差距分析 |
|------|------------|-----------|---------|
| **Token 管理** | CSS 变量散落在 preset.css，非语义化命名 | 配置驱动，自动生成 CSS 变量，语义化 | 🔴 缺乏正式 Token 层 |
| **样式定义位置** | JS crafts (结构) + CSS files (颜色)，二元割裂 | 单一 Recipe 配置，全部在 JS/TS 中 | 🔴 心智模型割裂 |
| **变体解析** | 运行时 tv() 函数调用 | 编译时生成 CSS | 🟡 运行时开销可接受但非最优 |
| **主题扩展** | 复制 34 个 CSS 文件 | Token 覆盖即可 | 🔴 扩展成本过高 |
| **类型安全** | 部分 (variant 类型安全，token 不安全) | 全量 (token 引用也类型安全) | 🟡 |
| **CSS 层级管理** | 仅用 `@layer components` | 完整 `@layer` 体系 (reset/tokens/recipes/utilities) | 🟡 |
| **自定义方式** | 3 种格式 (partial/function/full) | 统一 `extend` 语法 | 🟡 |

### 核心差距

Raxium 当前是 **"结构与皮肤分离"** 模型 (crafts 管结构，CSS 管颜色)，而 Panda CSS 是 **"Token 驱动一体化"** 模型。Raxium 的分离带来了：
- 新建主题的高成本
- 开发者需要同时理解两套系统
- 无法仅通过 JS API 完成完整主题定制

---

## 4. 建议一：统一设计哲学 — Token-Recipe-Layer 三层模型

### 4.1 引入正式的 Design Token 层

**目标**: 将所有散落的 CSS 变量统一为有层级的语义化 Token 体系。

```
tokens/
  ├── _primitives.css    # 原始值 (oklch 颜色、px 值)
  ├── _semantic.css      # 语义映射 (--color-primary → --rz-green)
  ├── default.css        # default 主题 Token
  └── razer.css          # razer 主题 Token (覆盖 semantic)
```

**示例**:

```css
/* tokens/_primitives.css */
@theme {
  --color-green-500: oklch(76.87% 0.2343 141.32);
  --color-green-600: oklch(47.48% 0.2343 141.32);
  --color-green-400: oklch(82.45% 0.2343 141.32);
  --color-neutral-500: oklch(54.52% 0 0);
  --color-neutral-400: oklch(58.48% 0 0);
  --color-neutral-600: oklch(33.68% 0 0);
}

/* tokens/_semantic.css */
:root {
  /* 语义令牌：主题通过覆盖这些变量来切换皮肤 */
  --rui-color-primary: var(--color-green-500);
  --rui-color-primary-hover: var(--color-green-400);
  --rui-color-primary-active: var(--color-green-600);
  --rui-color-primary-border: var(--color-green-border);
  --rui-color-primary-fg: var(--color-black);

  --rui-color-danger: var(--color-red-500);
  --rui-color-danger-hover: var(--color-red-400);
  --rui-color-danger-active: var(--color-red-600);
  --rui-color-danger-fg: var(--color-white);

  --rui-color-surface-bg: var(--color-neutral-900);
  --rui-color-surface-fg: var(--color-neutral-100);
  --rui-color-surface-border: var(--color-neutral-700);

  --rui-radius-sm: 0.25rem;
  --rui-radius-base: 0.375rem;
  --rui-radius-lg: 0.5rem;

  --rui-disabled-opacity: 0.5;
}

/* tokens/razer.css — 只覆盖差异 */
[data-theme-skin="razer"] {
  --rui-color-primary: var(--color-rz-green);
  --rui-color-primary-hover: var(--color-rz-green-light);
  --rui-color-primary-active: var(--color-rz-green-dark);
  --rui-color-primary-border: var(--color-rz-green-border);
  --rui-color-primary-fg: var(--color-h00);
}
```

**效果**: 新建主题只需创建一个 CSS 文件覆盖语义 Token，无需触碰 34 个组件 CSS。

### 4.2 将颜色变体从 CSS 回收到 Crafts

**目标**: 让 craft 定义成为唯一的样式真相源，使用 Token 引用代替空字符串。

```ts
// 改造后的 button craft
export const tvButton = tv({
  slots: {
    root: [
      'inline-flex', 'items-center', 'justify-center',
      'rounded', 'border', 'transition-all',
      'disabled:pointer-events-none',
      'disabled:opacity-[var(--rui-disabled-opacity)]',
    ],
    loading: 'size-[1lh] animate-spin',
  },
  variants: {
    variant: {
      solid: {
        root: 'bg-[var(--rui-btn-bg)] text-[var(--rui-btn-fg)] border-[var(--rui-btn-border)] hover:bg-[var(--rui-btn-bg-hover)] active:bg-[var(--rui-btn-bg-active)]',
      },
      outlined: {
        root: 'bg-transparent text-[var(--rui-btn-fg)] border-[var(--rui-btn-border)] hover:border-[var(--rui-btn-border-hover)] hover:text-[var(--rui-btn-fg-hover)]',
      },
      filled: {
        root: 'bg-[var(--rui-btn-bg)]/15 text-[var(--rui-btn-fg)] border-transparent hover:bg-[var(--rui-btn-bg-hover)]/30',
      },
      // ...
    },
    color: {
      primary: {
        root: [
          '[--rui-btn-bg:var(--rui-color-primary)]',
          '[--rui-btn-fg:var(--rui-color-primary-fg)]',
          '[--rui-btn-border:var(--rui-color-primary-border)]',
          '[--rui-btn-bg-hover:var(--rui-color-primary-hover)]',
          '[--rui-btn-bg-active:var(--rui-color-primary-active)]',
        ].join(' '),
      },
      danger: {
        root: [
          '[--rui-btn-bg:var(--rui-color-danger)]',
          '[--rui-btn-fg:var(--rui-color-danger-fg)]',
          // ...
        ].join(' '),
      },
    },
    size: { /* 不变 */ },
  },
}, { slots: { root: 'rui-btn', loading: 'rui-btn-loading' } })
```

**优势**:
- Craft 成为完整的样式定义，开发者不需要去查 CSS 文件
- 新主题只需覆盖 Token CSS 变量，crafts 不需要重写
- `tv({ extend: tvButton })` 可以真正做到增量扩展

### 4.3 建立 CSS @layer 层级体系

```css
/* 推荐的 layer 顺序 */
@layer reset, tokens, base, recipes, components, utilities, overrides;

/* tokens 层 */
@layer tokens {
  :root { --rui-color-primary: ...; }
  [data-theme-skin="razer"] { --rui-color-primary: ...; }
}

/* recipes 层 — crafts 生成的 class */
@layer recipes {
  .rui-btn { /* base styles from tv() */ }
}

/* components 层 — 主题特定覆盖（最终目标是消除这一层） */
@layer components {
  /* 迁移期间保留，最终所有样式应在 recipes + tokens 中 */
}

/* overrides 层 — 用户自定义 */
@layer overrides {
  /* 用户通过 ui prop 注入的 class 自动提升到此层 */
}
```

---

## 5. 建议二：提高 tailwind-variants 可扩展性

### 5.1 Craft 预设 (Presets) 机制

**问题**: 当前主题切换只能替换整个 crafts 对象或逐个覆盖，无法做组合式扩展。

**方案**: 引入 `definePreset` + `mergePresets` 工具函数：

```ts
// packages/themes/src/utils/preset.ts
import { tv } from './tv'
import type { Crafts } from '../default/crafts'

export interface CraftPreset {
  name: string
  /** 基于哪个预设扩展 */
  extend?: CraftPreset
  /** 覆盖的 crafts (只写差异部分) */
  crafts: Partial<{
    [K in keyof Crafts]: Parameters<typeof tv>[0]
  }>
}

export function definePreset(config: CraftPreset): CraftPreset {
  return config
}

export function resolvePreset(preset: CraftPreset, baseCrafts: Crafts): Partial<Crafts> {
  const base = preset.extend ? resolvePreset(preset.extend, baseCrafts) : {}
  const resolved: Partial<Crafts> = { ...base }

  for (const [key, overrides] of Object.entries(preset.crafts)) {
    const craftKey = key as keyof Crafts
    const baseCraft = resolved[craftKey] ?? baseCrafts[craftKey]
    resolved[craftKey] = tv({
      extend: baseCraft,
      ...overrides,
    }) as any
  }

  return resolved
}
```

**使用方式**:

```ts
// 用户自定义主题
const myPreset = definePreset({
  name: 'enterprise',
  extend: defaultPreset,
  crafts: {
    tvButton: {
      variants: {
        size: {
          base: { root: 'h-10 px-6 text-sm' },
        },
      },
      defaultVariants: {
        variant: 'outlined',
      },
    },
    tvDialog: {
      variants: {
        size: {
          base: { content: 'max-w-[600px]' },
        },
      },
    },
  },
})

// 在 RUIConfigProvider 中使用
<RUIConfig :theme="{ crafts: resolvePreset(myPreset, defaultCrafts) }">
```

### 5.2 共享 Slot 模式 (Shared Slot Recipes)

**问题**: backdrop、positioner、content 等 slot 在 Dialog、Drawer、HoverCard、Popover 中重复定义。

**方案**: 抽取可复用的 slot recipe 片段：

```ts
// packages/themes/src/utils/shared-recipes.ts

/** 浮层类组件共享的 backdrop + positioner + content 基础样式 */
export const overlaySlots = {
  backdrop: [
    'fixed', 'inset-0',
    'data-[state=open]:motion-opacity-in',
    'data-[state=closed]:motion-opacity-out',
  ],
  positioner: [
    'fixed', 'inset-0', 'flex', 'items-center', 'justify-center',
  ],
  content: [
    'relative', 'border', 'rounded',
    'data-[state=open]:motion-opacity-in',
    'data-[state=closed]:motion-opacity-out',
  ],
} as const

/** 浮层类组件的 size 变体 (padding/text 尺寸映射) */
export function overlaySizeVariants(config: {
  paddingScale?: Record<string, string>
}) {
  // ... 返回标准 size 变体定义
}
```

```ts
// dialog.ts — 使用共享模式
import { overlaySlots } from '../../utils/shared-recipes'

export const tvDialog = tv({
  slots: {
    ...overlaySlots,
    // Dialog 特有的 slots
    close: '',
    header: ['flex', 'items-center', 'justify-between'],
    title: [],
    body: ['flex-1', 'overflow-y-auto'],
    footer: ['flex', 'items-center', 'justify-end'],
  },
  // ...
})
```

### 5.3 Variant Mapping 辅助工具

**问题**: compound variants 逐个 size 重复书写过于冗长。

**方案**: 提供 `mapVariant` 工具函数：

```ts
// packages/themes/src/utils/variant-helpers.ts

/** 将 variant 值映射到对应的 class，减少 compoundVariants 数量 */
export function mapSizeToSlot(
  slot: string,
  mapping: Record<string, string>,
): Array<Record<string, any>> {
  return Object.entries(mapping).map(([size, cls]) => ({
    size,
    class: { [slot]: cls },
  }))
}

// 使用
compoundVariants: [
  ...mapSizeToSlot('itemIndicator', {
    xs: 'size-2',
    sm: 'size-2.5',
    base: 'size-3',
    lg: 'size-3.5',
  }),
]
```

---

## 6. 建议三：简化 crafts 自定义与继承

### 6.1 简化 theme prop API

**当前**（深嵌套，不直观）：

```vue
<Button
  :theme="{
    crafts: {
      variants: { size: { base: { root: 'h-10' } } },
    },
  }"
/>
```

**建议**: 引入 `craft` prop 作为 `theme.crafts` 的快捷方式：

```ts
// props.ts
export interface ButtonProps extends ThemeCrafts<'tvButton'> {
  // ... 其他 props

  /** 快捷 craft 覆盖，等价于 theme.crafts 但更简洁 */
  craft?: CraftShorthand<'tvButton'>
}

// CraftShorthand 类型定义
type CraftShorthand<K extends keyof Crafts> = {
  /** 追加到 root slot 的 class */
  class?: string
  /** 按 slot 追加 class */
  slots?: Partial<Record<SlotKeysOf<Crafts[K]>, string>>
  /** 覆盖 variant 默认值 */
  defaults?: Partial<VariantsOf<Crafts[K]>>
  /** 扩展变体定义 */
  extend?: CraftInput<Crafts[K]>
}
```

**使用对比**:

```vue
<!-- Before: 深嵌套 -->
<Button :theme="{ crafts: { variants: { size: { base: { root: 'h-10' } } } } }" />

<!-- After: 扁平化快捷方式 -->
<Button :craft="{ class: 'h-10' }" />

<!-- 按 slot 覆盖 -->
<Button :craft="{ slots: { root: 'h-10', loading: 'size-6' } }" />

<!-- 修改默认变体 -->
<Button :craft="{ defaults: { variant: 'outlined', size: 'lg' } }" />

<!-- 深度扩展（保留完整能力） -->
<Button :craft="{ extend: { variants: { size: { xl: { root: 'h-12 text-xl' } } } } }" />
```

### 6.2 统一 ui prop 接口

**方案**: 统一为 `Record<SlotName, ClassValue>` 格式：

```ts
// 统一接口 (不再混用 { class: string } 和 string)
export interface ButtonProps {
  ui?: {
    root?: ClassValue     // 统一为直接 ClassValue
    loading?: ClassValue
  }
}

export interface DialogProps {
  ui?: {
    backdrop?: ClassValue
    positioner?: ClassValue
    content?: ClassValue
    header?: ClassValue
    body?: ClassValue
    footer?: ClassValue
    close?: ClassValue
    title?: ClassValue
  }
}
```

**工具类型**:

```ts
// packages/vue/core/src/providers/theme/ui-types.ts

/** 从 craft 定义自动推导 ui prop 类型 */
type UIProps<K extends keyof Crafts> = Partial<
  Record<SlotKeysOf<Crafts[K]>, ClassValue>
>

// 使用
export interface ButtonProps extends ThemeCrafts<'tvButton'> {
  ui?: UIProps<'tvButton'>  // 自动包含 root, loading
}
```

### 6.3 子组件自动继承主题

**方案**: 提供 `useInheritedTheme` 用于子组件，减少模板代码：

```ts
// packages/vue/core/src/composables/useInheritedTheme.ts

/**
 * 用于复合组件的子部件 (如 AccordionTrigger, DialogContent)
 * 自动从最近的 ThemeProvider 继承主题，无需重复 useTheme 完整逻辑
 */
export function useInheritedTheme(
  props?: MaybeRefOrGetter<Partial<ThemeNoCrafts['theme']> | undefined>,
): UseThemeReturn {
  const parentTheme = injectThemeContext()

  if (!props) return parentTheme

  return computed(() => ({
    ...parentTheme.value,
    ...omitBy(toValue(props) ?? {}, isNil),
  }))
}
```

```vue
<!-- AccordionTrigger.vue — 简化后 -->
<script setup lang="ts">
const { theme: propsTheme } = defineProps<AccordionTriggerProps>()
// 比 useTheme 更轻量：直接继承父组件主题，仅合并 props 覆盖
const theme = useInheritedTheme(() => propsTheme)
const crafts = computed(() => theme.value.crafts.tvAccordion())
</script>
```

### 6.4 DevTools 调试支持

**方案**: 在开发环境下为主题合并提供可追溯信息：

```ts
// useTheme.ts 增加调试输出
if (__DEV__) {
  const vm = getCurrentInstance()
  watch(mergedTheme, (theme) => {
    vm?.proxy?.$el?.setAttribute?.(
      'data-rui-theme-source',
      JSON.stringify({
        config: !!configCrafts,
        context: !!contextCrafts,
        props: !!propsCrafts,
        resolved: {
          skin: theme.skin,
          surface: theme.surface,
          size: theme.size,
        },
      }),
    )
  })
}
```

---

## 7. 实施路线图

### Phase 1: 基础改进（低风险、高回报） ✅ 已完成

- [x] **统一 ui prop 接口**: 全部改为 `ClassValue` 格式，迁移 Button 等使用 `{ class: string }` 的组件
- [x] **语义化 Token 命名**: 将 `--color-h4f` 等替换为 `--color-gray-4f` 等标尺名与 `--color-rui-*` 语义层
- [x] **抽取共享 slot 常量**: 将 POPOVER_MOTION 扩展为更完整的共享 recipe 模式
- [x] **添加 mapVariant/mapVariant2d 工具**: 减少 compoundVariants 模板代码

### Phase 2: Token 层建设（中风险、高回报） ✅ 已完成

- [x] **建立 Token 层级**: `tokens/_primitives.css` → `tokens/_semantic.css` → `preset.css`
- [x] **建立 @layer 体系**: `components → overrides` (Tailwind v4 自带 `theme → base → components → utilities`)
- [x] **组件 CSS 语义化**: 14+ 组件 CSS 迁移到使用 `rui-surface-*`, `rui-text-*`, `rui-primary-*` 等语义 Token
- [x] **验证 Razer 主题**: 构建通过，新主题只需覆盖 `_semantic.css` 中的 Token 变量

### Phase 3: API 简化（中风险、高回报）

- [x] **引入 craft prop 快捷方式**: 提供扁平化的 class 覆盖 API
- [x] **引入 useInheritedTheme**: 简化子组件主题继承
- [x] **UIProps 自动推导**: 从 craft slot 定义自动生成 ui prop 类型
- [x] **DevTools 调试信息**: 开发环境下展示主题合并来源

### Phase 4: 扩展性增强（低风险、中回报）

- [x] **Preset 机制**: `definePreset` + `resolvePreset` 支持组合式主题扩展
- [x] **文档**: 编写主题自定义指南，覆盖 Token 覆盖 / Preset 创建 / 单组件 craft 覆盖三种场景

---

## 8. 附录：文件清单与代码量统计

### 主题包文件结构

```
packages/themes/src/
├── css/                           # 全局 CSS 基础
│   ├── index.css                  # 入口 (导入 animations + static)
│   ├── animations.css             # 动画定义
│   ├── animation-easing.css       # 缓动函数
│   └── static.css                 # z-index 层级 + 自定义 utility
├── default/                       # 默认主题
│   ├── index.ts                   # 导出所有 crafts
│   ├── index.css                  # Tailwind 入口 + source 配置
│   └── crafts/                    # 34 个组件 craft 定义
│       ├── _shared.ts             # 共享动画常量 (POPOVER_MOTION)
│       ├── button.ts              # 85 行
│       ├── dialog.ts              # 110 行
│       ├── input.ts               # 50 行
│       ├── select.ts              # ~120 行
│       └── ... (30 个更多)
├── razer/                         # Razer 主题
│   ├── index.ts                   # 导出 crafts (当前为空)
│   ├── index.css                  # Tailwind 入口 + imports
│   ├── preset.css                 # Token 定义 (颜色、字号、间距)
│   ├── components.css             # 导入 34 个组件 CSS
│   ├── crafts/
│   │   └── index.ts               # 空文件，注释说明 extend 用法
│   └── components/                # 34 个组件的颜色/交互样式
│       ├── button.css             # 240 行 (6 variant × 5 color)
│       ├── dialog.css
│       ├── input.css
│       └── ... (31 个更多)
└── utils/                         # 工具函数
    ├── index.ts                   # 导出 tv, cn, cx, clsx
    ├── tv.ts                      # 91 行，自定义 tv() 包装器
    └── cn.ts                      # 18 行，class 合并
```

### 主题消费端关键文件

```
packages/vue/core/src/
├── composables/
│   ├── useTheme.ts                # 91 行，三层主题合并
│   └── useConfig.ts               # 20 行，组件级配置注入
├── providers/
│   ├── theme/
│   │   ├── theme-props.ts         # 48 行，ThemeCrafts/CraftInput 类型
│   │   ├── ThemeProvider.vue       # 14 行，context provider
│   │   └── ThemeContext.vue        # 13 行，render slot
│   └── config/
│       ├── rui-config-context.ts   # 67 行，RUIConfigContext 接口
│       └── RUIConfigProvider.vue   # 146 行，全局配置根
```

### 代码量统计

| 模块 | 文件数 | 总行数 (估) |
|------|--------|------------|
| craft 定义 (default) | 35 | ~2,500 |
| 组件 CSS (razer) | 34 | ~4,000 |
| Token/预设 CSS | 4 | ~300 |
| 工具函数 (utils) | 3 | ~120 |
| 主题消费端 (vue) | 7 | ~400 |
| **合计** | **83** | **~7,300** |

---

*报告完毕。建议从 Phase 1 (统一 ui prop + 语义化 Token) 开始，这些改动风险低、收益高，可以在不破坏现有 API 的前提下逐步推进。*
