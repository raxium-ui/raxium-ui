<script setup lang="ts">
import type { DialogInterceptContext } from './dialog-intercept-context'
import { computed } from 'vue'
import { provideDialogInterceptContext } from './dialog-intercept-context'

const props = defineProps<{
  value: DialogInterceptContext
}>()

provideDialogInterceptContext(computed(() => props.value))
</script>

<template>
  <slot />
</template>
