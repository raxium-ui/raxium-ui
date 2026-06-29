---
"@raxium/vue-addons-v-lazy": patch
---

Fix a memory leak issue by ensuring that components are properly deregistered and cleaned up when unmounted or when their source changes, preventing retained references in internal lazy-loading queues.
