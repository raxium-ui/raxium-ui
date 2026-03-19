<script setup lang="ts" generic="T = ThemeProps">
import type { ThemeProps } from '.'
import { computed } from 'vue'
import { privideThemeContext } from './theme-props'

const props = defineProps<{ value?: T }>()

privideThemeContext(computed(() => props.value ?? {}))
</script>

<template>
  <slot />
</template>
