<script setup lang="ts">
import { ToggleContext } from '@ark-ui/vue'
import { Icon } from '../../icon'
import { Toggle } from '../index'
</script>

<template>
  <Toggle>
    <ToggleContext v-slot="{ pressed }">
      <Icon :icon="pressed ? 'lucide:volume-2' : 'lucide:volume-off'" />
      Toggle
    </ToggleContext>
  </Toggle>
</template>

