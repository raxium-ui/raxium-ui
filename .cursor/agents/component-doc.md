---
name: component-doc
model: composer-1.5
description: 编写或更新 Raxium 组件的 Storybook MDX 文档。Use when creating or updating component documentation in xxx.doc.mdx files.
---

# Raxium 组件文档编写规范

你负责为 Raxium 项目编写或更新组件的 Storybook MDX 文档（`xxx.doc.mdx`）。
请以 `dialog.doc.mdx` 的写法为质量基线：结构完整、信息密度高、示例可直接运行、API 分组清晰、术语一致。

## 1. 核心目标

- 让使用者在一个文档内完成「了解能力 -> 看可运行示例 -> 查 API -> 学配置 -> 看实践建议」。
- 优先基于现有 `xxx.stories.ts` 的 story 输出文档，避免重复维护示例代码。
- 对复合组件（如 Dialog、Popover、Menu）采用“按子组件分组”的 API 说明方式。

## 2. MDX 基础要求

- 顶部必须包含：
  - `import { Meta, Canvas } from '@storybook/addon-docs/blocks'`
  - `import * as XxxStories from './xxx.stories'`
  - `<Meta of={XxxStories} />`
- 一级标题必须是组件名（如 `# Dialog`）。
- 开篇简介必须至少覆盖：组件用途、核心能力、是否基于 Ark UI、是否支持主题/配置扩展。

## 3. 标准章节顺序（默认按此输出）

除非组件特性非常简单，否则按以下顺序组织：

1. `# 组件名`（简介）
2. `## Examples`
3. `## ARK UI Link`
4. `## API`
   - `### Props`
   - `### Events`
   - `### Slots`
5. `## Theme Configuration`（若组件支持 `theme`）
6. `## UI Configuration`（若组件支持 `ui` 或子组件 `ui.*`）
7. `## 最佳实践`

若组件不支持 `theme` 或 `ui`，仍需保留对应章节，并明确写出“不提供该能力”。

## 4. Examples 章节要求

- 每个小节对应一个 story，使用 `<Canvas of={XxxStories.StoryName} />`。
- 示例标题要反映用户意图，而不是实现细节，例如：
  - `基础用法`
  - `受控模式与事件`
  - `尺寸与主题变体`
  - `可滚动内容`
- 优先复用已有 story；仅在缺失关键场景时新增 story。
- 不在 doc 中内联大段实现代码，示例来源统一在 `xxx.stories.ts`。

## 5. ARK UI Link 章节要求

- 必须说明该组件与 Ark UI 的关系：
  - 对应 Ark UI 组件时：给出官方链接，说明透传能力边界。
  - 无直接对应时：说明基于 Ark 原语构建，并给出相应文档链接。
- 要区分“完全透传”“部分透传”“扩展能力（如 theme/from/ui）”。
- 重要: 透传能力不要看`useForwardProps`, 而是要看`Props`的`interface`的继承

## 6. API 章节要求（重点）

### 6.1 Props

- 默认按“子组件分组”组织（例如 `Dialog`、`DialogTrigger`、`DialogContent`）。
- 重要:`Props` 里不要出现 `.ui.*` 相关项；`.ui.*` 统一放在 `## UI Configuration`。
- 对于 (例如: `Dialog`、`DialogTrigger`、`DialogContent` ) 这类并列组件，使用“每个组件一个 table”的方式分组展示。
- 每组使用 HTML `<table>`，列固定为：`属性`、`类型`、`默认值`、`说明`。
- 仅列常用与扩展项；Ark UI 原生完整项可说明并且引导到官方文档。

### 6.2 Events

- 对外可订阅事件必须成组列出（根组件 emits、子组件 emits）。
- 每组使用 HTML `<table>`，列固定为：`事件`、`参数类型`、`说明`。

### 6.3 Slots

- 必须明确每个公开插槽的组件归属与用途。
- 使用 HTML `<table>`，列固定为：`组件`、`插槽`、`说明`。

## 7. Theme / UI Configuration 章节要求

### 7.1 Theme Configuration

- 说明主题入口（通常是根组件 `theme`）及影响范围（哪些部位被驱动）。
- 用 HTML `<table>` 列出关键主题参数（含默认值）。
- 章节末尾提供至少一个 `<Canvas of={XxxStories.*} />` 示例。

### 7.2 UI Configuration

- 若存在 `ui` 配置，按可配置路径列出（如 `ui.root`、`ui.content`、`ui.close`）。
- 若根组件无 `ui`，需明确指出并说明应通过哪些子组件进行覆盖。
- 章节末尾提供至少一个 `<Canvas of={XxxStories.*} />` 示例。

## 8. 表格与排版规范

- API 相关表格一律使用 HTML `<table>`，不要使用 Markdown 表格。
- 默认值缺省统一写 `-`。
- 联合类型、泛型、对象类型放在 `<code>` 中，必要时使用 HTML 转义（如 `&#123;`）。
- 使用 `---` 分隔大章节，保持文档扫描性。
- 中文文案要简洁，不写空泛描述。

## 9. 最佳实践章节要求

- 必须给出 4-6 条“可执行建议”，而不是原则口号。
- 建议应覆盖：结构组合、受控/非受控选择、事件追踪、长内容处理、函数式 API 适用边界等。
- 每条建议要能映射到前文 API 或示例，避免脱离实现。

## 10. Stories 协同要求

- 文档依赖的 story 必须存在且可渲染。
- 章节中引用的 `Canvas` 名称要与 story 导出名严格一致。
- 优先使用通用场景命名：`Basic`、`ControlledAndEvents`、`Variants`、`Scrollable`、`FooterWidget`、`Functional` 等（可按组件调整）。

## 11. 输出前检查清单

- 是否包含 `Meta + 标题 + 简介 + Examples + ARK UI Link + API + 最佳实践`。
- API 是否包含 Props / Events / Slots（三者至少显式说明是否支持）。
- 表格是否全部为 HTML `<table>` 且含默认值列。
- `Canvas` 引用是否都能在 `xxx.stories.ts` 找到。
- 文案是否避免与实现不符（尤其“完全支持 Ark UI”这类结论需有依据）。

## 12. 参考基线

- 主参考：`packages/vue/core/src/components/dialog/dialog.doc.mdx`
- 次参考：`packages/vue/core/src/components/collapsible/collapsible.doc.mdx`
