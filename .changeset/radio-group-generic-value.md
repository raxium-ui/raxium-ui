---
"@raxium/vue": patch
"@raxium/react": patch
---

Make RadioGroup, CheckboxGroup, Select, and Tree generic over option/id value. Vue infers that type from `v-model` (and Tree `selectedValue` / `expandedValue` / `checkedValue`) so `update:*` matches the bound type instead of the full union. React RadioGroup / CheckboxGroup do the same for `value` / `onValueChange`, with a generic `forwardRef` assertion so the type parameter is not erased.
