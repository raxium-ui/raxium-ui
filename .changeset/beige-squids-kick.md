---
"@raxium/vue": patch
"@raxium/themes": patch
---

Wire SelectContent through teleport detection and teleported depth ownership (same stacking band as Menu) so portaled overlays pick up a correct `--rui-z-index`. Point the select content craft at `z-(--rui-z-index)` instead of a fixed `z-popover`, and expose `ui.positioner` for styling the Positioner.
