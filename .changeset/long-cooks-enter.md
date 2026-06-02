---
"@raxium/vue": patch
---

### Added

- Support for resuming dialog close sequence with a `resumeBeforeClose` method in the dialog API (`Dialog.vue`). This allows dialogs that use a `beforeClose` hook to be manually continued without auto-closing, giving more control over the close flow.
