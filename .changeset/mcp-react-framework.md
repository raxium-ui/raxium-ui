---
"@raxium/mcp": minor
---

Add React framework support to the MCP server. The `framework` argument on every tool (`list-components`, `list-examples`, `get-example`, `list-documents`, `get-document`) now accepts `react` in addition to `vue`, resolving component sources from `packages/react/core` with `.tsx` examples. The local-fallback provider and the backing data API were made framework-aware so React components, examples, and docs are served through the same interface as Vue.
