<script setup lang="ts">
import { fakerEN } from '@faker-js/faker'
import { Button } from '../../button'
import {
  Dialog,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogTrigger,
  TriggerFrom,
} from '../index'

const content = fakerEN.lorem.sentences(4)
</script>

<template>
  <div class="w-full flex flex-wrap items-center gap-4">
    <Dialog>
      <DialogTrigger as-child>
        <Button variant="outline">
          No header (auto close in content)
        </Button>
      </DialogTrigger>
      <DialogContent class="w-120">
        <DialogBody>
          {{ content }}
        </DialogBody>
        <DialogFooter />
      </DialogContent>
    </Dialog>

    <Dialog>
      <DialogTrigger as-child>
        <Button variant="outline">
          Custom close slot
        </Button>
      </DialogTrigger>
      <DialogContent class="w-120" :show-close="false">
        <DialogBody>
          {{ content }}
        </DialogBody>
        <DialogFooter />

        <template #close>
          <DialogCloseTrigger as-child :from="TriggerFrom.CLOSE_TRIGGER">
            <Button class="absolute top-2 right-2" variant="text">
              Close
            </Button>
          </DialogCloseTrigger>
        </template>
      </DialogContent>
    </Dialog>
  </div>
</template>
