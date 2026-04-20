# Raxium UI — Copilot Instructions

Raxium is a Vue 3 UI component library built on [Ark UI](https://ark-ui.com) and [Tailwind CSS](https://tailwindcss.com), using a `tailwind-variants`-based theming system called **crafts**.

## Commands

All commands are run from the repo root with **pnpm** and orchestrated by **Turborepo**.

```bash
pnpm build          # build all packages (respects dependency order)
pnpm dev            # start all dev servers in parallel
pnpm test           # run all tests
pnpm lint           # lint all packages

# Scoped commands
pnpm --filter @raxium/vue build
pnpm --filter @raxium/vue test

# Run a single test file
pnpm --filter @raxium/vue exec vitest run src/utils/__test__/foo.test.ts

# Storybook dev server (component playground)
pnpm --filter @raxium/vue-storybook dev   # http://localhost:4399

# MCP server
pnpm --filter @raxium/mcp build
pnpm --filter @raxium/mcp smoke:inspector  # verify all 5 MCP tools
```

## Monorepo Layout

```
packages/
  vue/
    core/          → @raxium/vue         (published component library)
    addons/
      components/  → per-addon packages  (virtual list, swiper, …)
  themes/          → @raxium/themes      (crafts / tv definitions, CSS)
  shared/          → @raxium/shared      (utilities: css, dom, color, animate)
  mcp/             → @raxium/mcp         (MCP server for AI tooling)
playground/vue/    → Rsbuild playground app
website/           → docs site
```

## Component Architecture

### File layout per component (`packages/vue/core/src/components/<name>/`)

| File | Purpose |
|---|---|
| `Component.vue` | Runtime implementation |
| `props.ts` | TypeScript prop interface |
| `index.ts` | Re-exports component + props |
| `<name>.stories.ts` | Storybook stories |
| `<name>.doc.mdx` | Human-readable Storybook MDX docs |
| `<name>.ai.json` | Machine-readable AI doc (see spec below) |
| `examples/*.vue` | Standalone example files (excluded from build) |

Stories, examples, `.md`, and `.ai.json` files are excluded from the library build (see `rslib.config.ts`).

### Theme System (crafts)

Components are styled through `tailwind-variants` wrapped in a custom `tv()` function from `@raxium/themes/utils`.

- **crafts** = one `tv()` instance per component (e.g., `tvButton`), defined in `packages/themes/src/default/crafts/`
- Each craft has `slots`, `variants`, `compoundVariants`, and `defaultVariants`
- The custom `tv()` wrapper injects an `unstyled` variant automatically; the second argument (`ruiConfig`) sets the CSS class prefix (e.g., `rui-btn`)

Theme resolution order (lowest → highest priority):
1. Global config (`useConfig('theme')`)
2. Context (`<ThemeProvider>` / `ThemeContext`)
3. Per-component `theme` prop

The `useTheme()` composable merges all three levels and returns resolved `crafts` + theme state (`skin`, `surface`, `size`, `unstyled`, `bordered`).

### Component Props Pattern

```ts
// props.ts
export interface ButtonProps extends ThemeCrafts<'tvButton'> {
  variant?: ButtonVariants['variant']
  class?: HTMLAttributes['class']
  ui?: {
    root?: { class?: HTMLAttributes['class'] }
    loading?: { class?: HTMLAttributes['class'] }
  }
}
```

- Extend `ThemeCrafts<'tvXxx'>` for themed components; `ThemeNoCrafts` for unthemed ones
- `ui` prop provides per-slot class overrides (never put `.ui.*` in the `Props` API table — put it in UI Configuration)
- `theme` prop accepts full `ThemeProps` or a craft shorthand object for the component's own craft

### Vue Component Pattern

```vue
<script setup lang="ts">
const { variant = 'solid', class: propsClass, theme: propsTheme, ui } = defineProps<ButtonProps>()
const theme = useTheme(() => propsTheme)
const crafts = computed(() => theme.value.crafts.tvButton())
</script>

<template>
  <ark.button
    :class="crafts.root({ variant, class: clsx(ui?.root?.class, propsClass), ...theme })"
    :data-variant="variant"
    :data-surface="theme.surface"
  >
    <slot />
  </ark.button>
</template>
```

- Use Ark UI `ark.*` factory primitives (not standalone Ark components) for base elements
- Spread `...theme` into craft calls so `skin`, `surface`, `size`, `unstyled`, `bordered` flow into variants
- Expose `data-variant`, `data-color`, `data-surface`, `data-size` attributes for CSS hooks
- Use `useForwardExpose()` from `@ark-ui/vue` for ref forwarding

### Addon Components

Components under `packages/vue/addons/components/` are independent packages. Differences from core:
- May have their own `index.css` that consumers must import explicitly
- Doc MDX uses `## Implementation References` instead of `## ARK UI Link`
- `*.ai.json` includes a `cssImport` field (core components do not)

## Test Conventions

- Test files live in a `__test__/` subdirectory co-located with the source file
- Pattern: `src/utils/foo.ts` → `src/utils/__test__/foo.test.ts`
- Vitest is configured with `include: ['src/**/__test__/**/*.test.ts']` (node environment)

## AI Documentation (`.ai.json`)

Every component should have a `<name>.ai.json` alongside its implementation. Use `packages/vue/core/src/components/button/button.ai.json` as the structural reference. Key rules:

- `schemaVersion: "2.0.0"`
- Required top-level fields (in order): `schemaVersion`, `docId`, `component`, `contracts`, `behaviorModel`, `examples`, `generationHints`, `provenance`
- Addon-only field: `cssImport`
- Do **not** include a `quality` field in the file itself
- Each `examples[].mcp` entry must have `{ server, tool, args, exampleId }` for direct MCP tool invocation
- `provenance.precedence` defaults to `["runtime", "type", "doc"]`

The Cursor agent specs in `.cursor/agents/` (`component-ai-json.md`, `component-doc.md`, `addons-doc.md`) contain the full authoring rules for these files.

## MCP Server (`@raxium/mcp`)

Provides 5 tools over stdio: `list-components`, `list-examples`, `get-example`, `list-documents`, `get-document`. Currently supports `framework=vue` only. Follows a remote-first strategy with local fallback scanning `packages/vue/core/src/components`.

## Changesets & Releases

This repo uses `@changesets/cli`. Add a changeset with `pnpm changeset` before PRs that change published packages. CI workflows: `quality.yml` (lint/test), `version-pr.yml` (bumps), `release.yml` (publishes).
