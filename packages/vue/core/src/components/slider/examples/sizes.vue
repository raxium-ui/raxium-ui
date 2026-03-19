<script setup lang="ts">
import { THEME_SIZE } from '@raxium/shared/constant'
import { Slider, SliderTooltipThumb } from '../index'
</script>

<template>
  <div class="w-full flex flex-col gap-4">
    <Slider
      v-for="size in THEME_SIZE"
      :key="String(size)"
      class="w-80"
      :theme="{ size }"
      :default-value="[25]"
    >
      <SliderTooltipThumb :index="0" :open="() => true" />
    </Slider>
  </div>
</template>
