---
"@raxium/vue": patch
---

Expose a `trigger` slot on ReadMore so consumers can fully customize the expand/collapse control. The slot receives `show`, `open`, `text`, and `className`, while the default CollapsibleTrigger remains as the fallback when the slot is unused.
