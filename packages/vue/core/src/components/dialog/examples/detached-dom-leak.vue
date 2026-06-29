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

const open = ref(false)
const cycles = ref(0)

async function autoCycle(times: number) {
  for (let i = 0; i < times; i++) {
    open.value = true
    await new Promise(r => setTimeout(r, 120))
    open.value = false
    await new Promise(r => setTimeout(r, 120))
    cycles.value++
  }
}
</script>

<template>
  <div class="w-full flex flex-col gap-4">
    <div class="rounded border border-gray-44 p-3 text-sm text-gray-cc">
      <div class="mb-2 font-semibold text-gray-ff">
        Reproduction: Chromium detached DOM leak via Dialog auto-focus on native form control
      </div>
      <ol class="ml-4 list-decimal space-y-1">
        <li>Open Chrome DevTools → <b>Memory</b> tab.</li>
        <li>Click <b>Run 10 open/close cycles</b> (or manually open/close ~10 times).</li>
        <li>Click the <b>Collect garbage</b> (trash) icon in DevTools.</li>
        <li>Take a <b>Heap Snapshot</b> and filter for <code>Detached &lt;input&gt;</code>.</li>
        <li>Expected: 0 detached nodes. Actual: ~10 detached <code>&lt;input&gt;</code> nodes accumulate.</li>
      </ol>
      <div class="mt-2 text-xs opacity-80">
        Retainer chain shows <code>C++ Persistent roots</code> — the leak is browser-side, not a JS listener leak.
        Variant A (leaks) auto-focuses the inner <code>&lt;input&gt;</code>.
        Variant B (no leak) bypasses auto-focus via <code>:initial-focus-el="() => null"</code>.
        Variant C (no leak) renders an <code>&lt;input type="hidden"&gt;</code> instead of a focusable control.
      </div>
    </div>

    <div class="flex items-center gap-3">
      <Button @click="autoCycle(10)">
        Run 10 open/close cycles
      </Button>
      <span class="text-xs opacity-75">cycles: {{ cycles }}</span>
    </div>

    <div class="flex flex-wrap items-center gap-3">
      <!-- Variant A: leaks — auto-focus targets the <input> -->
      <Dialog
        v-model:open="open"
        lazy-mount
        unmount-on-exit
      >
        <DialogTrigger as-child>
          <Button variant="outlined">
            A. Leaks (auto-focus input)
          </Button>
        </DialogTrigger>
        <DialogContent class="w-120">
          <DialogHeader> Leaking Dialog </DialogHeader>
          <DialogBody>
            <input
              type="text"
              placeholder="auto-focused on open"
              class="w-full border border-gray-44 px-2 py-1"
            >
          </DialogBody>
          <DialogFooter />
        </DialogContent>
      </Dialog>

      <!-- Variant B: workaround — disable initial focus -->
      <Dialog
        lazy-mount
        unmount-on-exit
        :initial-focus-el="() => null"
      >
        <DialogTrigger as-child>
          <Button variant="outlined">
            B. No leak (initial-focus-el = null)
          </Button>
        </DialogTrigger>
        <DialogContent class="w-120">
          <DialogHeader> Workaround Dialog </DialogHeader>
          <DialogBody>
            <input
              type="text"
              placeholder="not auto-focused"
              class="w-full border border-gray-44 px-2 py-1"
            >
            <div class="mt-2 text-xs opacity-70">
              Note: if the user manually clicks into this input, the leak still occurs on close.
            </div>
          </DialogBody>
          <DialogFooter />
        </DialogContent>
      </Dialog>

      <!-- Variant C: control — non-focusable form control, no leak -->
      <Dialog
        lazy-mount
        unmount-on-exit
      >
        <DialogTrigger as-child>
          <Button variant="outlined">
            C. No leak (input type=hidden)
          </Button>
        </DialogTrigger>
        <DialogContent class="w-120">
          <DialogHeader> Control Dialog </DialogHeader>
          <DialogBody>
            <input
              type="hidden"
              value="not focusable"
            >
            <div class="text-sm">
              No focusable form control inside; auto-focus falls back to the content container.
            </div>
          </DialogBody>
          <DialogFooter />
        </DialogContent>
      </Dialog>
    </div>
  </div>
</template>
