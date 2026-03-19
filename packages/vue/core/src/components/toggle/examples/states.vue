<script setup lang="ts">
import { Toggle } from '../index'
</script>

<template>
  <div class="w-full flex flex-wrap items-center gap-4">
    <Toggle>
      Default (off)
    </Toggle>
    <Toggle pressed>
      Pressed (on)
    </Toggle>
    <Toggle disabled>
      Disabled
    </Toggle>
    <Toggle disabled pressed>
      Disabled + pressed
    </Toggle>
  </div>
</template>

