<script setup lang="ts">
import { Switch, SwitchLabel } from '@raxium/vue/components/switch'
import { ref } from 'vue'

const checked = ref(false)
</script>

<template>
  <div class="flex items-center gap-2">
    <p>Switch: {{ checked ? 'checked' : 'unchecked' }}</p>
    <Switch v-model:checked="checked" />
    <Switch size="sm" />
    <Switch size="lg" />
    <Switch disabled />
    <Switch disabled checked />
    <Switch>
      <SwitchLabel>Switch with label</SwitchLabel>
    </Switch>
  </div>
</template>
