<script setup lang="ts">
import type { DialogTriggerFrom } from '../dialog-intercept-context'
import { ref } from 'vue'
import { Button } from '../../button'
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
  TriggerFrom,
} from '../index'

const openSync = ref(false)
const openAsync = ref(false)
const log = ref<string[]>([])

function push(msg: string) {
  log.value = [...log.value, msg].slice(-8)
}

async function handleBeforeClose({ from, done }: { from: DialogTriggerFrom, done: () => void }) {
  console.log('from', from)
  if (from === TriggerFrom.OK_BUTTON) {
    push('beforeClose (async)')
    await new Promise(resolve => setTimeout(resolve, 2000))
    done()
  }
  else {
    push('beforeClose (cancel)')
    done()
  }
}
</script>

<template>
  <div class="w-full flex flex-col gap-4">
    <div class="flex flex-wrap items-center gap-3">
      <Dialog
        v-model:open="openSync"
        lazy-mount
        unmount-on-exit
        :before-close="
          ({ from, done }) => {
            console.log('from', from)
            push('beforeClose (call done() to close)')
            done()
          }
        "
        @open-change="(d) => push(`openChange open=${d.open}`)"
      >
        <DialogTrigger as-child>
          <Button>beforeClose 同步 done</Button>
        </DialogTrigger>
        <DialogContent class="w-120">
          <DialogHeader>同步关闭</DialogHeader>
          <DialogBody>
            <p class="text-sm text-hcc">
              本例在 <code class="text-hff">beforeClose</code> 内立即调用
              <code class="text-hff">done()</code>。
            </p>
          </DialogBody>
          <DialogFooter />
        </DialogContent>
      </Dialog>

      <Dialog
        v-model:open="openAsync"
        lazy-mount
        unmount-on-exit
        :before-close="handleBeforeClose"
      >
        <DialogTrigger as-child>
          <Button variant="outlined">
            beforeClose 异步 done
          </Button>
        </DialogTrigger>
        <DialogContent class="w-120">
          <DialogHeader>异步关闭</DialogHeader>
          <DialogBody>
            <p class="text-sm text-hcc">
              点击OK后约 2000ms 后调用 <code class="text-hff">done()</code> 才真正关闭。
            </p>
          </DialogBody>
          <DialogFooter />
        </DialogContent>
      </Dialog>
    </div>

    <div class="text-xs font-mono text-hcc">
      <div
        v-for="(line, i) in log"
        :key="i"
      >
        {{ line }}
      </div>
    </div>
  </div>
</template>
