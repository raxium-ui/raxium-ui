<script setup lang="ts">
import { vTitle } from '../index'
</script>

<template>
  <div class="flex flex-col gap-4">
    <div v-title="'Test Title'" class="w-fit">
      Test Title
    </div>
    <div v-title.lg="'Test Title'" class="w-fit">
      Large Title
    </div>
    <div v-title.unstyled="'Test Title'" class="w-fit">
      Unstyled Title
    </div>
    <div v-title:dark="'Test Title'" class="w-fit">
      Dark Title
    </div>
  </div>
</template>
