---
"@raxium/vue": patch
---

Annotate Accordion and PinInput `$api` / default-slot types with Ark `Use*Return` aliases so vue-tsc declaration emit does not leak non-portable `@zag-js/*` pnpm paths (TS2742).
