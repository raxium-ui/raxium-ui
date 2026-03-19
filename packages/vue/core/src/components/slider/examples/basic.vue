<script setup lang="ts">
import { ref } from 'vue'
import { Slider, SliderTooltipThumb } from '../index'

const value = ref([30])
</script>

<template>
  <div class="w-full flex flex-col gap-3">
    <div class="text-sm text-hff">
      value: {{ value[0] }}
    </div>

    <Slider v-model="value" class="w-80" :min="0" :max="100" :step="1">
      <SliderTooltipThumb :index="0" />
    </Slider>
  </div>
</template>

