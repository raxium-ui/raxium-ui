<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '../../button'
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from '../index'

const openBaseline = ref(false)
const openPatched = ref(false)
const cyclesBaseline = ref(0)
const cyclesPatched = ref(0)
const log = ref<string[]>([])

function push(msg: string) {
  log.value = [...log.value, `[${new Date().toLocaleTimeString()}] ${msg}`].slice(-10)
}

/**
 * Workaround idea:
 * Before the dialog actually closes, move focus to a freshly-created
 * <button> appended to <body>. Buttons do not establish the same
 * UA-shadow-root / IME / autofill C++ Persistent that input/select/textarea do,
 * so when the dialog content (and its <input>) gets unmounted afterwards,
 * the input is no longer the focused element when teardown runs.
 *
 * After the dialog closes we drop the temp button.
 */
function transferFocusBeforeClose(): Promise<void> {
  return new Promise((resolve) => {
    const sink = document.createElement('button')
    sink.type = 'button'
    sink.tabIndex = -1
    // visually invisible but still focusable
    sink.style.cssText
      = 'position:fixed;top:0;left:0;width:1px;height:1px;opacity:0;pointer-events:none;'
    sink.setAttribute('aria-hidden', 'true')
    sink.dataset.role = 'focus-sink'
    document.body.appendChild(sink)
    sink.focus({ preventScroll: true })

    // Give the browser a frame to commit the focus change, then resolve.
    // We also delay sink removal until after the dialog content has unmounted.
    requestAnimationFrame(() => {
      resolve()
      setTimeout(() => sink.remove(), 500)
    })
  })
}

async function autoCycle(target: 'baseline' | 'patched', times: number) {
  const ref = target === 'baseline' ? openBaseline : openPatched
  const counter = target === 'baseline' ? cyclesBaseline : cyclesPatched
  for (let i = 0; i < times; i++) {
    ref.value = true
    await new Promise(r => setTimeout(r, 200))
    ref.value = false
    await new Promise(r => setTimeout(r, 400))
    counter.value++
  }
  push(`${target}: ran ${times} cycles`)
}
</script>

<template>
  <div class="w-full flex flex-col gap-4">
    <div class="rounded border border-gray-44 p-3 text-sm text-gray-cc">
      <div class="mb-2 font-semibold text-gray-ff">
        Verify workaround: transfer focus to a temp &lt;button&gt; before close
      </div>
      <ol class="ml-4 list-decimal space-y-1">
        <li>DevTools → <b>Memory</b>.</li>
        <li>
          Run <b>Baseline ×10</b>, then <b>Collect garbage</b>, take a snapshot, filter
          <code>Detached &lt;input&gt;</code> → expect ~10.
        </li>
        <li>Reload the page (to clear retained roots).</li>
        <li>Run <b>Patched ×10</b>, GC, snapshot → expect 0 (or sharply reduced).</li>
        <li>If counts match, the workaround is viable.</li>
      </ol>
      <div class="mt-2 text-xs opacity-80">
        Patched path: <code>before-close</code> creates a hidden <code>&lt;button&gt;</code> in
        <code>document.body</code>, focuses it, then calls <code>done()</code>. The temp button is
        removed 500ms later (after Ark UI's unmount transition).
      </div>
    </div>

    <div class="flex flex-wrap items-center gap-3">
      <Button @click="autoCycle('baseline', 10)">
        Baseline ×10
      </Button>
      <span class="text-xs opacity-75">baseline cycles: {{ cyclesBaseline }}</span>
      <Button @click="autoCycle('patched', 10)">
        Patched ×10
      </Button>
      <span class="text-xs opacity-75">patched cycles: {{ cyclesPatched }}</span>
    </div>

    <div class="flex flex-wrap items-center gap-3">
      <!-- Baseline: leaks -->
      <Dialog
        v-model:open="openBaseline"
        lazy-mount
        unmount-on-exit
      >
        <DialogTrigger as-child>
          <Button variant="outlined">
            Open Baseline (leaks)
          </Button>
        </DialogTrigger>
        <DialogContent class="w-120">
          <input
            type="text"
            placeholder="auto-focused; will leak"
            class="w-full border border-gray-44 px-2 py-1"
          >
          <DialogBody>
            <input
              type="text"
              placeholder="auto-focused; will leak"
              class="w-full border border-gray-44 px-2 py-1"
            >
          </DialogBody>
          <DialogFooter />
        </DialogContent>
      </Dialog>

      <!-- Patched: transfer focus before close -->
      <Dialog
        v-model:open="openPatched"
        lazy-mount
        unmount-on-exit
      >
        <DialogTrigger as-child>
          <Button variant="outlined">
            Open Patched (focus sink)
          </Button>
        </DialogTrigger>
        <DialogContent class="w-120">
          <DialogHeader> Patched Dialog </DialogHeader>
          <DialogBody>
            <input
              type="text"
              placeholder="auto-focused; focus is moved to temp button before close"
              class="w-full border border-gray-44 px-2 py-1"
            >
          </DialogBody>
          <DialogFooter />
        </DialogContent>
      </Dialog>
    </div>

    <div class="font-mono text-xs text-gray-cc">
      <div
        v-for="(line, i) in log"
        :key="i"
      >
        {{ line }}
      </div>
    </div>
  </div>
</template>
