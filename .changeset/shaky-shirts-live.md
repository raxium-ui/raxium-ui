---
"@raxium/vue-addons-v-title": patch
"@raxium/vue-addons-v-lazy": patch
---

Fix detached DOM leak issue with v-lazy and v-title directives:
- Fixed memory leak where DOM nodes were retained when using v-lazy or v-title inside large v-for lists.
- Now, DOM is properly cleaned up on component unmount, preventing detached elements in Chrome DevTools.
（修复 v-lazy 和 v-title 在大 v-for 列表中导致的 detached dom 泄漏问题）
