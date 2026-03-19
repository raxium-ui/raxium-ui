<script setup lang="ts">
import { ref } from 'vue'
import { Slider, SliderThumb } from '../index'

const value = ref([20, 70])
</script>

<template>
  <div class="w-full flex flex-col gap-3">
    <div class="text-sm text-hcc">
      defaultValue: [20, 70]
      value: {{ value }}
    </div>

    <Slider v-model="value" class="w-80" :min="0" :max="100" :step="5" :default-value="[20, 70]">
      <SliderThumb :index="0" />
      <SliderThumb :index="1" />
    </Slider>
  </div>
</template>
