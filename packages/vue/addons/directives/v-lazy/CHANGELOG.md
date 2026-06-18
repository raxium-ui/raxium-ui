# @raxium/vue-addons-v-lazy

## 0.1.7

### Patch Changes

- bb48028: Fix detached DOM leak issue with v-lazy and v-title directives:
  - Fixed memory leak where DOM nodes were retained when using v-lazy or v-title inside large v-for lists.
  - Now, DOM is properly cleaned up on component unmount, preventing detached elements in Chrome DevTools.
    （修复 v-lazy 和 v-title 在大 v-for 列表中导致的 detached dom 泄漏问题）

## 0.1.6

### Patch Changes

- 6a3290a: Fix detached DOM leak when using v-lazy or v-title in large v-for lists.
  - Resolved issue where DOM nodes were retained in memory after navigating away, leading to detached elements accumulating in Chrome DevTools.
  - Now the DOM is properly cleaned up on component unmount.
    （修复 detached dom 泄漏问题）

## 0.1.5

### Patch Changes

- ccffc0f: Fix memory issue caused by v-lazy listener bindings.
  Ensure listeners are properly cleaned up to prevent memory leaks.

## 0.1.4

### Patch Changes

- 86fb2a8: fix: improve gradient image handling in v-lazy directive
  - Enhanced logic for background gradients during loading and error states
  - Ensured correct fallback to placeholders when gradients or images are missing
  - Fixed some edge cases affecting natural size reporting in lazy-loaded elements

## 0.1.3

### Patch Changes

- 41dd6ba: FIX: v-lazy bugs

## 0.1.2

### Patch Changes

- 045752d: FIX: v-lazy handle empty src

## 0.1.1

### Patch Changes

- 32a6cd2: PUBLISH FIRST VERSION
