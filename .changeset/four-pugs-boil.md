---
"@raxium/vue-addons-v-lazy": patch
---

Fix memory issue caused by v-lazy listener bindings.
Ensure listeners are properly cleaned up to prevent memory leaks.
