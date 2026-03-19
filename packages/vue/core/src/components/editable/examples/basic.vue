<script setup lang="ts">
import { ref } from 'vue'
import { Editable, EditableInput, EditablePreview } from '../index'

const value = ref('Editable text')
</script>

<template>
  <div class="w-full flex flex-col gap-3">
    <div class="text-sm text-hff">
      value: {{ value }}
    </div>

    <Editable v-model="value" placeholder="Edit me">
      <EditableInput clearable />
      <EditablePreview />
    </Editable>
  </div>
</template>

