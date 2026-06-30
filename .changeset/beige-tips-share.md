---
"@raxium/vue": patch
---

Fix an issue where the Dialog component did not properly emit a "change" event before closing. The "beforeclose" event now correctly triggers a change event to notify listeners.
