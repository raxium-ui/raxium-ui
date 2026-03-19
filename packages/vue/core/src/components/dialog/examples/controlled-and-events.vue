<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '../../button'
import {
  Dialog,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
  TriggerFrom,
} from '../index'

const open = ref(false)
const lastFrom = ref<string | null | undefined>(undefined)
</script>

<template>
  <div class="w-full flex flex-col gap-4">
    <div class="flex items-center gap-3">
      <Button @click="open = true">
        Open (v-model)
      </Button>
      <span class="text-sm text-hff">open: {{ open }}</span>
      <span class="text-xs opacity-75">lastFrom: {{ lastFrom }}</span>
    </div>

    <Dialog
      v-model:open="open"
      lazy-mount
      unmount-on-exit
      @open-change="(d) => { lastFrom = d.from }"
      @escape-key-down="() => { lastFrom = TriggerFrom.ESCAPE }"
      @interact-outside="() => { lastFrom = TriggerFrom.OUTSIDE }"
      @exit-complete="() => { /* just to show event exists */ }"
    >
      <DialogTrigger as-child>
        <Button variant="outline">
          Open via Trigger
        </Button>
      </DialogTrigger>

      <DialogContent class="w-120">
        <DialogHeader>
          Controlled Dialog
        </DialogHeader>
        <DialogBody>
          <div class="flex flex-col gap-2">
            <div class="text-sm text-hcc">
              This example tracks the trigger source via <code class="text-hff">openChange.details.from</code>.
            </div>
            <div class="flex items-center gap-3">
              <DialogCloseTrigger as-child :from="TriggerFrom.CLOSE_TRIGGER">
                <Button variant="text">
                  Close (close trigger)
                </Button>
              </DialogCloseTrigger>
              <DialogCloseTrigger as-child from="custom_from">
                <Button variant="text">
                  Close (custom from)
                </Button>
              </DialogCloseTrigger>
            </div>
          </div>
        </DialogBody>
        <DialogFooter
          @ok="() => { lastFrom = TriggerFrom.OK_BUTTON }"
          @cancel="() => { lastFrom = TriggerFrom.CANCEL_BUTTON }"
        />
      </DialogContent>
    </Dialog>
  </div>
</template>
