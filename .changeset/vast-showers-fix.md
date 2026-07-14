---
"@raxium/vue": minor
"@raxium/themes": minor
---

Add unified overlay depth management for stacked teleported layers (Dialog, Popover, Menu, HoverCard, Tooltip, DatePicker, FloatingPanel).

### @raxium/vue

- Add `useDepthOwner`, `useTeleportedDepth`, and `useTeleportedDepthOwner` composables to coordinate backdrop/content/floating z-index via `--rui-z-index` and parent-child depth injection.
- Add `useTeleportDetection` composable to detect when a positioner is teleported to `body`, so z-index is only applied when needed.
- Integrate depth stacking into `DialogContent` / `DialogBackdrop`, `PopoverContent`, `MenuContent`, `HoverCardContent`, `TooltipContent`, `DatePickerContent`, and `FloatingPanelContent` (with `bringToFront` on topmost panel).
- Patch `@zag-js/dismissable` to freeze inline z-index during layer close/exit animation, preventing lower layers from painting over the closing overlay.
- Add Storybook examples: FloatingPanel multiple panels / with Dialog, Tooltip teleport z-index.

### @raxium/themes

- Dialog backdrop/positioner/content crafts now read `z-[var(--rui-z-index, …)]` for depth-aware stacking while preserving the previous zag `--layer-index` fallback.
- DatePicker positioner craft adds popover-layer z-index baseline.
- Razer DatePicker: fix table cell hover styles (`:not()` selectors chained with AND instead of OR).
- FloatingPanel: slightly reduce header control trigger size (`0.875lh`).
