<script setup lang="ts">
import { Button } from '@raxium/vue/components/button'
import {
  Editable,
  EditableCancelTrigger,
  EditableControl,
  EditableEditTrigger,
  EditableInput,
  EditablePreview,
  EditableSubmitTrigger,
} from '@raxium/vue/components/editable'
import { Check, Pencil, X } from 'lucide-vue-next'
import { ref } from 'vue'

const text = ref('')
const size = ref<'base' | 'sm' | 'lg'>('base')
</script>

<template>
  <div class="flex gap-4">
    <p>{{ text }}</p>
    <Editable v-model="text" placeholder="Edit me" :size="size">
      <EditableInput clearable />
      <EditablePreview />
    </Editable>

    <Editable
      placeholder="Edit me"
      class="flex gap-2"
      activation-mode="none"
      :size="size"
    >
      <EditableInput />
      <EditablePreview />
      <template #suffix="{ editing }">
        <EditableControl class="flex items-center gap-2">
          <EditableEditTrigger v-if="!editing" as-child>
            <Button class="p-0 size-5" variant="text">
              <Pencil class="size-3" />
            </Button>
          </EditableEditTrigger>
          <EditableSubmitTrigger v-if="editing" as-child>
            <Button class="p-0 size-5">
              <Check class="size-3" />
            </Button>
          </EditableSubmitTrigger>
          <EditableCancelTrigger v-if="editing" as-child>
            <Button variant="text" class="p-0 size-5">
              <X class="size-3" />
            </Button>
          </EditableCancelTrigger>
        </EditableControl>
      </template>
    </Editable>
  </div>
</template>
