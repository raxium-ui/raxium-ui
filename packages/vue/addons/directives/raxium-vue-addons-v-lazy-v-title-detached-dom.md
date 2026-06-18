# Detached DOM leak when `v-lazy` / `v-title` are used inside large `v-for` lists

> **Packages:** `@raxium/vue-addons-v-lazy@0.1.5`, `@raxium/vue-addons-v-title@0.1.3`  
> **Reporter context:** Razer Cortex WebView (Vue 3.5 SPA), reproduced in Game Booster process list (`ProcessPanel.vue`)  
> **中文摘要：** 在 `v-for` 长列表中对每项使用 `v-lazy:src` 或 `v-title` 时，路由离开后面板 DOM 无法被 GC，DevTools「Detached elements」中累积整页子树；去掉这两项并改用原生 `loading="lazy"` / `title` 后泄漏消失。根因是 addon 全局单例强引用宿主 DOM，卸载时清理不完整。

---

## Summary

Using **`v-lazy`** and/or **`v-title`** on **many repeated list items** (`v-for`) causes **detached DOM nodes to accumulate** after the host route/component unmounts. Each navigation away from the page leaves another copy of the page subtree retained in memory.

This is **not** a Vue Router or `<Transition>` issue. Bisection in our app isolated the leak to these two directives.

---

## Environment

| Item | Value |
|------|--------|
| Vue | 3.5.x |
| `@raxium/vue-addons-v-lazy` | 0.1.5 |
| `@raxium/vue-addons-v-title` | 0.1.3 |
| Plugin registration | `app.use(vLazyPlugin, { dispatchEvent: true })`, `app.directive('title', vTitle)` |
| Repro scale | ~20–80 process rows in a scrollable grid (`v-for`) |

---

## Reproduction (minimal pattern)

1. Render a scrollable list with **`v-for` (N ≥ 20)**.
2. On each row, bind:
   - `v-lazy:src="url"` on an `<img>`, **and/or**
   - `v-title="'tooltip text'"` on a hover target.
3. Mount the list (e.g. open Game Booster → expand Processes).
4. Navigate away (SPA route change) **5+ times**.
5. Chrome DevTools → **Memory** → **Collect garbage**.
6. Search detached nodes for the page root class / component markup.

**Expected:** No detached nodes from the unmounted page.  
**Actual:** Detached `<div>` / `<img>` subtree grows by ~1 page per visit. Retainers chain:

```
Detached DOM
  ← __vnode
  ← __vueParentComponent (live Vue instance)
  ← … component tree up to page root
```

---

## Bisection results (our app)

| Configuration | Leak? |
|---------------|-------|
| `v-lazy` + `<Tooltip>` portal (Raxium) | Yes |
| `v-lazy` + `v-title` (no Tooltip) | Yes |
| No `v-lazy`, `v-title` on list items | Yes (v-title still present) |
| No `v-lazy`, native HTML `title` attribute | **No** |
| No `v-lazy`, no `v-title`, keep `<Tooltip>` portal | **No** |

**Conclusion:** Both **`v-lazy`** and **`v-title`** are root causes when used per item in a large `v-for`. Raxium `<Tooltip>` portal alone did **not** reproduce the leak once lazy/title directives were removed.

---

## Root cause analysis

### `@raxium/vue-addons-v-lazy`

**Architecture (from `dist/index.js`):**

- App-wide singleton `LazyEx` with a global **`ListenerQueue`**.
- Each `ReactiveListener` **strongly references** `el` (the host element) and `$parent` (scroll container from `scrollParent(el)`).
- With default options (we do **not** pass `observer: true`), mode is **`event`**: registers throttled handlers on **`window`** and **scroll parent** for `scroll`, `wheel`, `resize`, etc.

**Leak mechanism:**

1. On route unmount, directive `unmounted` calls `lazy.remove(el)` — this *should* purge the listener.
2. With **batch unmount of N list items**, async paths remain problematic:
   - `add()` defers work via `nextTick`; race with simultaneous `remove()`.
   - `_lazyLoadHandler` may call `load()` on elements already queued for purge in the same tick.
   - Async `Image` load callbacks and `loadingDelayTimers` (`Map<HTMLElement, …>`) hold `el` in closures.
3. While **`ListenerQueue` retains `el`**, the DOM node stays reachable → Vue’s `__vueParentComponent` retains the **entire component subtree** (not just the `<img>`).

**Suspicious code paths:**

```js
// _lazyLoadHandler: detached nodes may still hit load() before freeList cleanup
this.ListenerQueue.forEach((listener) => {
  if (!listener.el || !listener.el.parentNode || listener.state.loaded) freeList.push(listener);
  if (!listener.el || listener.destroyed) return;
  // … may still call listener.load() on detached el in same iteration
  listener.load();
});
```

```js
// unmounted hook (good), but depends on every el getting remove()
unmounted: lazy.remove.bind(lazy)
```

---

### `@raxium/vue-addons-v-title`

**Architecture (from `dist/index.js`):**

- Global singleton `TitleTooltip` with one floating node appended to **`document.body`**.
- Per host: `bindingMap` (WeakMap), `mouseenter` / `mouseleave` listeners.
- Show path: `setTimeout(500ms)` → async `@floating-ui/vue` **`computePosition(el, …)`** → **`IntersectionObserver.observe(el)`**.

**Leak mechanism:**

1. **`mouseleave` does not fire** when elements are removed during SPA navigation (mouse can still be “over” the row).
2. `unmounted` calls `dismissForReference(el)` — correct direction, but races with:
   - pending `showTimer` closure capturing `el`;
   - in-flight `computePosition` promise capturing `el`;
   - `activeEl` + IO still observing `el`.
3. Token invalidation (`this.token++`) helps but does not cover all async windows when **dozens of elements unmount in one frame**.
4. Each list item adds listeners; any missed cleanup on one host keeps that **detached element** (and thus Vue component chain) alive.

**Relevant code:**

```js
unmounted(el) {
  bindingMap.delete(el);
  el.removeEventListener('mouseenter', onVTitleEnter);
  el.removeEventListener('mouseleave', onVTitleLeave);
  instance.dismissForReference(el);
}
```

```js
// Singleton IO only tracks one activeEl; async computePosition still closes over el
this.io = new IntersectionObserver(/* … */);
this.io.observe(el);
```

---

## Suggested fixes (upstream)

### `vue-addons-v-lazy`

1. In `_lazyLoadHandler`, **`continue` immediately** for listeners already in `freeList` / with `!el?.isConnected` — never call `load()` on detached hosts.
2. Store element refs as **`WeakRef<HTMLElement>`** in `ReactiveListener`; purge queue entries when `deref()` is undefined or `!isConnected`.
3. On `remove(el)`, cancel **all** timers, in-flight images, and observer entries for that el.
4. Consider **`observer: true` by default** (with guaranteed `unobserve` in `remove`) to reduce per-item scroll listener ref-counting on shared scroll containers.
5. Add vitest: **mount 100 `v-lazy` imgs in `v-for` → unmount parent → assert `ListenerQueue.length === 0`**.

### `vue-addons-v-title`

1. Use **`AbortController`** (or equivalent) per show cycle; abort on `dismissForReference` / `unmounted`.
2. Hold `activeEl` / `pendingForEl` as **`WeakRef`**, check `isConnected` before any DOM / floating-ui work.
3. In IO callback: if `!entry.target.isConnected` → `disconnect()` immediately.
4. Document: **do not use on large `v-for` lists**; or provide a “single floating tooltip + current target” API instead of per-element directive instances.

---

## Workaround (consumer apps)

Until upstream fixes land:

```vue
<!-- ❌ Avoid in v-for -->
<img v-lazy:src="url" />
<div v-title="tooltip" />

<!-- ✅ Use instead -->
<img :src="url" loading="lazy" />
<div :title="tooltip" />
<!-- Or one shared Tooltip / hover row pattern -->
```

---

## References

- Repro page: Game Booster `ProcessPanel.vue` — grid of process items with icons + hover details.
- Packages inspected: `node_modules/@raxium/vue-addons-v-lazy@0.1.5/dist/index.js`, `node_modules/@raxium/vue-addons-v-title@0.1.3/dist/index.js`.
- Upstream repo (package author): https://github.com/raxium-ui/raxium-ui (per `package.json` author URL).

---

## Checklist for upstream issue

- [ ] Title: `Detached DOM leak: v-lazy / v-title in large v-for lists`
- [ ] Labels: `bug`, `vue-addons`
- [ ] Attach this markdown or link to internal repro branch
- [ ] Optional: heap snapshot screenshot with `__vueParentComponent` retainers
