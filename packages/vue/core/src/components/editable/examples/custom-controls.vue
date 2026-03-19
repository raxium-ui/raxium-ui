<script setup lang="ts">
import { Check, Pencil, X } from 'lucide-vue-next'
import { Button } from '../../button'
import {
  Editable,
  EditableCancelTrigger,
  EditableControl,
  EditableEditTrigger,
  EditableInput,
  EditablePreview,
  EditableSubmitTrigger,
} from '../index'
</script>

<template>
  <Editable
    placeholder="Edit me"
    class="flex gap-2"
    activation-mode="none"
  >
    <EditableInput clearable />
    <EditablePreview />
    <template #suffix="{ editing }">
      <EditableControl class="flex items-center gap-2">
        <EditableEditTrigger
          v-if="!editing"
          as-child
        >
          <Button
            class="p-0 size-5"
            variant="text"
          >
            <Pencil class="size-3" />
          </Button>
        </EditableEditTrigger>
        <EditableSubmitTrigger
          v-if="editing"
          as-child
        >
          <Button class="p-0 size-5">
            <Check class="size-3" />
          </Button>
        </EditableSubmitTrigger>
        <EditableCancelTrigger
          v-if="editing"
          as-child
        >
          <Button
            variant="text"
            class="p-0 size-5"
          >
            <X class="size-3" />
          </Button>
        </EditableCancelTrigger>
      </EditableControl>
    </template>
  </Editable>
</template>
