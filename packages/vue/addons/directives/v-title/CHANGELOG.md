# @raxium/vue-addons-v-title

## 0.1.5

### Patch Changes

- bb48028: Fix detached DOM leak issue with v-lazy and v-title directives:
  - Fixed memory leak where DOM nodes were retained when using v-lazy or v-title inside large v-for lists.
  - Now, DOM is properly cleaned up on component unmount, preventing detached elements in Chrome DevTools.
    （修复 v-lazy 和 v-title 在大 v-for 列表中导致的 detached dom 泄漏问题）

## 0.1.4

### Patch Changes

- 6a3290a: Fix detached DOM leak when using v-lazy or v-title in large v-for lists.
  - Resolved issue where DOM nodes were retained in memory after navigating away, leading to detached elements accumulating in Chrome DevTools.
  - Now the DOM is properly cleaned up on component unmount.
    （修复 detached dom 泄漏问题）

## 0.1.3

### Patch Changes

- 1770607: FIX: Optimize the performance of v-title, and fix the issue where the popper does not disappear when the reference is removed.

## 0.1.2

### Patch Changes

- 8c53b5a: FIX: hide v-title when content is empty
- ca72dfc: FIX: remove addons css `@layer`, to avoid these @layer pollute tailwind css layer structure when `@import tailwindcss` do not on the top of css

## 0.1.1

### Patch Changes

- 32a6cd2: PUBLISH FIRST VERSION
