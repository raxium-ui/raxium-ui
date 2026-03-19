<script setup lang="ts">
import { THEME_SIZE } from '@raxium/shared/constant'
import { ref } from 'vue'
import { Editable, EditableInput, EditablePreview } from '../index'

const value = ref('Size demo')
</script>

<template>
  <div class="w-full flex flex-col gap-4">
    <Editable
      v-for="size in THEME_SIZE"
      :key="size"
      v-model="value"
      :theme="{ size }"
      :placeholder="size"
    >
      <EditableInput clearable />
      <EditablePreview />
    </Editable>
  </div>
</template>
