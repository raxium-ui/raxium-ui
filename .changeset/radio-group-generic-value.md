---
"@raxium/vue": patch
"@raxium/react": patch
---

Make RadioGroup and CheckboxGroup generic over option value (`T`). Vue infers `T` from `v-model` so `update:modelValue` matches the bound type instead of the full union. React does the same for `value` / `onValueChange`, with a generic `forwardRef` assertion so `T` is not erased.
