---
"@raxium/vue": patch
"@raxium/react": patch
---

Align Input value events to `string`. Clear now commits `''` instead of `undefined`, so `v-model` / `onValueChange` match `ref<string>` and `useState('')` without `| undefined`.
