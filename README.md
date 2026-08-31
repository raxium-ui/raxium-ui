# Raxium UI

English | [中文](./README.zh-CN.md)

Accessible React and Vue components on [Ark UI](https://ark-ui.com), styled with [Tailwind CSS](https://tailwindcss.com). One theming model (`RUIConfig`, tokens, crafts) for both frameworks.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)
[![@raxium/react](https://img.shields.io/npm/v/@raxium/react?label=%40raxium%2Freact)](https://www.npmjs.com/package/@raxium/react)
[![@raxium/vue](https://img.shields.io/npm/v/@raxium/vue?label=%40raxium%2Fvue)](https://www.npmjs.com/package/@raxium/vue)

| Package | Role |
| --- | --- |
| [`@raxium/react`](./packages/react/core) | React components |
| [`@raxium/vue`](./packages/vue/core) | Vue components |
| [`@raxium/themes`](./packages/themes) | Tokens, crafts, and skin CSS (`default`, `razer`) |
| [`@raxium/shared`](./packages/shared) | Framework-agnostic helpers |
| [`@raxium/mcp`](./packages/mcp) | MCP server for component docs and examples |

Vue-only extras (Swiper, virtual list, directives) live under [`packages/vue/addons`](./packages/vue/addons).

## Install

Peer versions: React `>=18.3` + `@ark-ui/react` `^5.35`, or Vue `^3.5` + `@ark-ui/vue` `^5.35`. Tailwind CSS v4 is required for styles.

```bash
pnpm add @raxium/react @ark-ui/react
# or
pnpm add @raxium/vue @ark-ui/vue
```

`@raxium/themes` is installed with the framework package. Import a skin after Tailwind:

```css
@import 'tailwindcss';
@import '@raxium/themes/default/index.css';
```

Use `@raxium/themes/razer/index.css` (and `preset.css` if you follow the Razer skin) to switch packs. Full setup: [Theme customization guide](./packages/themes/THEME-CUSTOMIZATION-GUIDE.md).

## Usage

Wrap the app in `RUIConfig`. Compound parts (`Accordion.Item`) and named exports (`AccordionItem`) are the same component on both React and Vue.

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

Tree-shakeable entries:

```ts
import { Button } from '@raxium/react/components/button'
import { useTheme } from '@raxium/react/hooks'
```

```ts
import { Button } from '@raxium/vue/components/button'
```

Examples live next to each component (`packages/*/core/src/components/<name>/examples`). Storybook: Vue on port `4399`, React playground at `http://localhost:4397` (`pnpm --filter @raxium/playground-react dev`).

## Theming

Most apps only need these knobs:

| Scope | API |
| --- | --- |
| Whole app | `RUIConfig` tokens (`skin`, `surface`, `size`, `bordered`) + CSS variables |
| A region | `ThemeProvider` (tokens only) |
| One instance | `class` / `className` and `ui` |

Do not reach for `craft` / `theme.crafts` until the [guide](./packages/themes/THEME-CUSTOMIZATION-GUIDE.md) says so. Skin packs go on `RUIConfig` `preset`.

[中文主题指南](./packages/themes/THEME-CUSTOMIZATION-GUIDE.zh-CN.md)

## MCP

[`@raxium/mcp`](./packages/mcp) serves component docs and examples over stdio (`list-components`, `list-examples`, `get-example`, `list-documents`, `get-document`) for both React and Vue.

```bash
npx -y @raxium/mcp
```

Client config and env vars: [packages/mcp/README.md](./packages/mcp/README.md).

## Repository

```
packages/react/core    @raxium/react
packages/vue/core      @raxium/vue
packages/vue/addons    Vue add-ons
packages/themes        @raxium/themes
packages/shared        @raxium/shared
packages/mcp           @raxium/mcp
playground/            local React / Vue apps
website/apis           HTTP API used by the MCP remote provider
```

## Development

Requires **Node.js 22+** and **pnpm** (`packageManager` in `package.json`).

```bash
pnpm install
pnpm build
pnpm dev
pnpm test
pnpm lint
```

Releases use [Changesets](https://github.com/changesets/changesets). For a user-facing change:

```bash
pnpm changeset
pnpm changeset:fill   # optional changelog body
```

Merging changesets to `main` opens a Version Packages PR; merging that PR publishes via CI.

## License

[MIT](./LICENSE) © Hwacc
