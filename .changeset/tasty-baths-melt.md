---
"@raxium/vue-addons-v-title": patch
"@raxium/vue-addons-v-lazy": patch
---

Fix detached DOM leak when using v-lazy or v-title in large v-for lists.  
- Resolved issue where DOM nodes were retained in memory after navigating away, leading to detached elements accumulating in Chrome DevTools.  
- Now the DOM is properly cleaned up on component unmount.  
（修复 detached dom 泄漏问题）
