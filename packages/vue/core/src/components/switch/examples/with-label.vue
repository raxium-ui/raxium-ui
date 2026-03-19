<script setup lang="ts">
import { Switch, SwitchLabel } from '../index'
</script>

<template>
  <div class="w-full flex flex-col gap-4">
    <Switch>
      <SwitchLabel>Switch with label</SwitchLabel>
    </Switch>

    <Switch :theme="{ size: 'lg' }">
      <SwitchLabel class="font-medium">
        Large switch label
      </SwitchLabel>
    </Switch>
  </div>
</template>
