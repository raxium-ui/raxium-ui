<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '../../button'
import { Switch, SwitchLabel } from '../index'

const checked = ref(false)
</script>

<template>
  <div class="w-full flex flex-col gap-3">
    <div class="flex items-center gap-2">
      <Button variant="outline" @click="checked = false">
        Set false
      </Button>
      <Button variant="outline" @click="checked = true">
        Set true
      </Button>
      <span class="text-sm text-hff">checked: {{ checked }}</span>
    </div>

    <Switch v-model:checked="checked">
      <SwitchLabel>Controlled</SwitchLabel>
    </Switch>
  </div>
</template>
