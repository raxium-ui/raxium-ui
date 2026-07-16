<script setup lang="ts">
import type { DrawerTriggerFrom } from '../drawer-intercept-context'
import { ref } from 'vue'
import { Button } from '../../button'
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTrigger,
  TriggerFrom,
} from '../index'

const open = ref(false)
const log = ref<string[]>([])

function push(msg: string) {
  log.value = [...log.value, msg].slice(-8)
}

function handleBeforeClose({
  from,
  done,
}: {
  from: DrawerTriggerFrom
  done: () => void
}) {
  push(`beforeClose from=${from ?? 'unknown'}`)
  if (from === TriggerFrom.OK_BUTTON) {
    done()
    return
  }
  done()
}
</script>

<template>
  <div class="w-full flex flex-col gap-4">
    <div class="flex flex-wrap items-center gap-3">
      <Drawer
        v-model:open="open"
        :before-close="handleBeforeClose"
        @open-change="(d) => push(`openChange open=${d.open} from=${d.from ?? 'unknown'}`)"
      >
        <DrawerTrigger as-child>
          <Button>Controlled + beforeClose</Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>Confirm close</DrawerHeader>
          <DrawerBody>
            Closing runs <code>beforeClose</code> then emits <code>openChange</code> with
            <code>from</code>.
          </DrawerBody>
          <DrawerFooter />
        </DrawerContent>
      </Drawer>
      <Button
        variant="outlined"
        @click="open = !open"
      >
        Toggle open ({{ open }})
      </Button>
    </div>
    <div class="text-xs font-mono opacity-70">
      <div
        v-for="(line, i) in log"
        :key="i"
      >
        {{ line }}
      </div>
    </div>
  </div>
</template>
