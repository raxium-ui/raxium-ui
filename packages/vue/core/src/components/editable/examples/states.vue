<script setup lang="ts">
import { ref } from 'vue'
import { Editable, EditableInput, EditablePreview } from '../index'

const value = ref('')
</script>

<template>
  <div class="w-full flex flex-col gap-4">
    <Editable v-model="value" placeholder="Empty value shows placeholder" clearable>
      <EditableInput clearable />
      <EditablePreview />
    </Editable>

    <Editable default-value="Default value" placeholder="Edit me" disabled>
      <EditableInput clearable />
      <EditablePreview />
    </Editable>

    <Editable default-value="Read only" placeholder="Edit me" read-only>
      <EditableInput clearable />
      <EditablePreview />
    </Editable>
  </div>
</template>

