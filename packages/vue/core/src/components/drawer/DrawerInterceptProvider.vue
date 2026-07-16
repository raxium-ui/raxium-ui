<script setup lang="ts">
import type { DrawerInterceptContext } from './drawer-intercept-context'
import { computed } from 'vue'
import { provideDrawerInterceptContext } from './drawer-intercept-context'

const props = defineProps<{
  value: DrawerInterceptContext
}>()

provideDrawerInterceptContext(computed(() => props.value))
</script>

<template>
  <slot />
</template>
