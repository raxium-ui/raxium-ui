---
"@raxium/vue": minor
---

Expose compound component accessors on Vue roots so `Accordion.Item`, `Dialog.Content`, `Menu.Trigger`, and the same pattern on other composites match the React API. Named exports such as `AccordionItem` remain unchanged and point at the same component instances, so existing templates keep working while the dotted form is now available.
