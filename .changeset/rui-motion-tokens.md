---
'@raxium/themes': patch
'@raxium/vue': patch
'@raxium/react': patch
---

Add `--rui-motion-*` CSS tokens and a `motion` craft variant (`default` | `fade` | `none`) with `defineMotionPreset` so overlay, dialog, collapse, tabs, and radio share one duration/recipe instead of hard-coded animation classes. Give Dialog backdrop its own presence so stacked dialogs fade the overlay independently of content, and fold backdrop opacity into the blur keyframes so the dimmer actually animates. Drive Tabs panel motion from `data-direction` / `data-orientation` instead of craft variants, and assign `--motion-duration` on every element so `tailwindcss-motion`’s non-inheriting `@property` default (700ms) no longer wins over `--rui-motion-duration`.
