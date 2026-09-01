# Raxium UI

[English](./README.md) | 中文

基于 [Ark UI](https://ark-ui.com) 与 [Tailwind CSS](https://tailwindcss.com) 的 React / Vue 组件库。两套框架共用同一套主题模型（`RUIConfig`、tokens、crafts）。

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)
[![@raxium/react](https://img.shields.io/npm/v/@raxium/react?label=%40raxium%2Freact)](https://www.npmjs.com/package/@raxium/react)
[![@raxium/vue](https://img.shields.io/npm/v/@raxium/vue?label=%40raxium%2Fvue)](https://www.npmjs.com/package/@raxium/vue)

| 包 | 职责 |
| --- | --- |
| [`@raxium/react`](./packages/react/core) | React 组件 |
| [`@raxium/vue`](./packages/vue/core) | Vue 组件 |
| [`@raxium/themes`](./packages/themes) | Tokens、crafts、皮肤 CSS（`default`、`razer`） |
| [`@raxium/shared`](./packages/shared) | 框架无关工具 |
| [`@raxium/mcp`](./packages/mcp) | 提供组件文档与示例的 MCP server |

仅 Vue 的附加能力（Swiper、虚拟列表、指令）在 [`packages/vue/addons`](./packages/vue/addons)。

## 安装

Peer 版本：React `>=18.3` + `@ark-ui/react` `^5.35`，或 Vue `^3.5` + `@ark-ui/vue` `^5.35`。样式需要 Tailwind CSS v4。

```bash
pnpm add @raxium/react @ark-ui/react
# 或
pnpm add @raxium/vue @ark-ui/vue
```

`@raxium/themes` 会随框架包一起安装。在 Tailwind 之后导入一套皮肤：

```css
@import 'tailwindcss';
@import '@raxium/themes/default/index.css';
```

换成 Razer 皮肤时用 `@raxium/themes/razer/index.css`（以及对应的 `preset.css`）。完整说明见 [主题定制指南](./packages/themes/THEME-CUSTOMIZATION-GUIDE.md) / [中文版](./packages/themes/THEME-CUSTOMIZATION-GUIDE.zh-CN.md)。

## 用法

用 `RUIConfig` 包住应用。复合写法（`Accordion.Item`）与具名导出（`AccordionItem`）是同一个组件，React 与 Vue 均支持。

```tsx
import { Accordion, RUIConfig } from '@raxium/react'
import '@raxium/themes/default/index.css'

export function App() {
  return (
    <RUIConfig>
      <Accordion defaultValue={['a']}>
        <Accordion.Item value="a">
          <Accordion.Trigger>Section A</Accordion.Trigger>
          <Accordion.Content>Content for section A</Accordion.Content>
        </Accordion.Item>
      </Accordion>
    </RUIConfig>
  )
}
```

```vue
<script setup lang="ts">
import { Accordion, RUIConfig } from '@raxium/vue'
import '@raxium/themes/default/index.css'
</script>

<template>
  <RUIConfig>
    <Accordion :default-value="['a']">
      <Accordion.Item value="a">
        <Accordion.Trigger>Section A</Accordion.Trigger>
        <Accordion.Content>Content for section A</Accordion.Content>
      </Accordion.Item>
    </Accordion>
  </RUIConfig>
</template>
```

按需引入：

```ts
import { Button } from '@raxium/react/components/button'
import { useTheme } from '@raxium/react/hooks'
```

```ts
import { Button } from '@raxium/vue/components/button'
```

示例在各组件目录下（`packages/*/core/src/components/<name>/examples`）。Storybook：Vue 端口 `4399`；React playground 为 `http://localhost:4397`（`pnpm --filter @raxium/playground-react dev`）。

## 主题

多数应用只用这三档：

| 范围 | API |
| --- | --- |
| 整应用 | `RUIConfig` 的 tokens（`skin`、`surface`、`size`、`bordered`）+ CSS 变量 |
| 一块区域 | `ThemeProvider`（仅 tokens） |
| 单个实例 | `class` / `className` 与 `ui` |

不要先动 `craft` / `theme.crafts`，除非 [指南](./packages/themes/THEME-CUSTOMIZATION-GUIDE.zh-CN.md) 明确要求。皮肤包走 `RUIConfig` 的 `preset`。

## MCP

[`@raxium/mcp`](./packages/mcp) 通过 stdio 提供组件文档与示例（`list-components`、`list-examples`、`get-example`、`list-documents`、`get-document`），React 与 Vue 都支持。

```bash
npx -y @raxium/mcp
```

客户端配置与环境变量见 [packages/mcp/README.md](./packages/mcp/README.md)。远程 HTTP 数据源的部署（文档快照 + sparse clone）见 [website/apis/README.md](./website/apis/README.md)。

## 仓库结构

```
packages/react/core    @raxium/react
packages/vue/core      @raxium/vue
packages/vue/addons    Vue 附加包
packages/themes        @raxium/themes
packages/shared        @raxium/shared
packages/mcp           @raxium/mcp
playground/            本地 React / Vue 沙箱
website/apis           MCP 远程数据 API
```

## 开发

需要 **Node.js 22+** 和 **pnpm**（见根目录 `package.json` 的 `packageManager`）。

```bash
pnpm install
pnpm build
pnpm dev
pnpm test
pnpm lint
```

发版使用 [Changesets](https://github.com/changesets/changesets)。用户可见的改动请加 changeset：

```bash
pnpm changeset
pnpm changeset:fill   # 可选，补 changelog 正文
```

changeset 合入 `main` 后会开 Version Packages PR；合并该 PR 即由 CI 发布。

## 许可证

[MIT](./LICENSE) © Hwacc
