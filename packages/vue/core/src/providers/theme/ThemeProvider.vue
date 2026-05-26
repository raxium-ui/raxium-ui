<script setup lang="ts" generic="T = ThemeProps">
import type { ThemeProps } from '.'
import { computed } from 'vue'
import { provideScopeTheme } from './theme-props'

const props = defineProps<{ value?: T }>()

// User-facing ThemeProvider: always provides Scope Theme so all descendant
// components receive the user's explicit intent (highest-priority scope).
provideScopeTheme(computed(() => props.value ?? {}))
</script>

<template>
  <slot />
</template>
