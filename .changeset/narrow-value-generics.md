---
"@raxium/vue": patch
"@raxium/react": patch
---

Fix value generic inference for radio groups, checkbox groups, selects, and trees so consumer callbacks retain narrow model value types. Vue named, compound, and globally registered components now infer string and number models without requiring manual type guards, while React generic defaults no longer widen callback values.
