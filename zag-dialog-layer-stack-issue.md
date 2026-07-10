---
name: Report a bug 🐛
about: Something isn't working as expected? Here is the right place to report.
---

# 🐛 Bug report

When stacked dialogs are used, closing the top dialog can make its content exit animation visually disappear. The Presence state and CSS animation events still run correctly, but the closing dialog's `positioner` loses its layer CSS variables during `layerStack.remove()`, causing its z-index to collapse while the node is still mounted for the exit animation.

## 💥 Steps to reproduce

1. Render two or more nested/stacked dialogs.
2. Open Dialog 1, then open Dialog 2 above it.
3. Close Dialog 2 while Dialog 1 remains open.
4. Observe that Dialog 2 content exit animation is not visible, or appears hidden behind the lower dialog/backdrop.

## 💻 Link to reproduction

CodeSandbox reproduction: pending

## 🧐 Expected behavior

The closing top dialog should keep its resolved stacking order until its exit animation completes. Its content and backdrop should remain visible while `data-state="closed"` animations are running.

## 🧭 Possible Solution

Freeze the resolved z-index before clearing layer style metadata in `layerStack.remove()`.

```ts
layer.styleTargets?.forEach((getTarget) => {
  const target = getTarget()
  if (target) {
    const { zIndex } = getComputedStyle(target)
    if (zIndex && zIndex !== 'auto') {
      target.style.setProperty('z-index', zIndex)
    }
    clearLayerStyleMirror(target)
  }
})
```

Then clear the frozen inline z-index when the layer is active again in `syncLayers()`:

```ts
target.style.removeProperty('z-index')
applyLayerStackMetadata(layer, index, target)
```

## 🌍 System information

| Software         | Version(s) |
| ---------------- | ---------- |
| Zag Version      | 1.41.1 |
| Browser          | Chrome |
| Operating System | Windows |

## 📝 Additional information

Investigation notes:

1. Presence was instrumented and confirmed to receive valid close state, non-zero animation duration, and normal animation names.
2. `animationstart` and `animationend` fire for the dialog content, so the exit animation is running.
3. The visual issue happens because `layerStack.remove()` clears `--layer-index` / layer metadata from backdrop and positioner immediately at close start, before the closing dialog unmounts.
4. A component-level workaround that mirrors `--layer-index` with `MutationObserver` was tested but did not reliably solve the issue.
5. Patching `layerStack.remove()` to preserve the resolved z-index during exit animation fixed the issue in the consuming Vue dialog implementation.
