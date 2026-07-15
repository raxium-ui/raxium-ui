---
"@raxium/vue": minor
"@raxium/themes": minor
---

Refine overlay depth stacking: unify z-index via `--rui-z-index`, stabilize owner lifecycle, and fix nested dialog inert conflicts.

### @raxium/vue

- Drive overlay z-index through a single CSS custom property (`--rui-z-index`) instead of inline `zIndex` styles, avoiding conflicts between inline values and theme classes.
- `useDepthOwner`: keep owners registered for their full mount lifecycle; re-activation only calls `bringToFront()` instead of unregistering, preventing closed-but-mounted overlays (`unmountOnExit=false`) from jumping above active layers.
- Add `depth` config to `RUIConfigContext` (`baseZIndex`, `step`) for global depth-stack tuning.
- Update Dialog, Popover, Menu, HoverCard, Tooltip, and DatePicker content components to set `--rui-z-index`; Tooltip applies it on `Content` rather than `Positioner`.
- `DialogBackdrop`: switch prop merging to Vue `mergeProps`.
- Replace `@zag-js/dismissable` patch with `@zag-js/aria-hidden` patch — fixes nested Dialogs becoming unclickable when an outer layer leaves stale `inert` / `aria-hidden` on a sibling positioner.

### @raxium/themes

- Dialog backdrop/positioner crafts use `z-(--rui-z-index)` as the sole z-index source (remove zag `--layer-index` fallback from class strings).
- `POPOVER_CONTENT_BASE` adds `z-(--rui-z-index)` so Popover, Menu, HoverCard, Tooltip, and DatePicker share the same depth-aware stacking pattern.
- DatePicker content craft switches from `z-popover` to `z-(--rui-z-index)`.
