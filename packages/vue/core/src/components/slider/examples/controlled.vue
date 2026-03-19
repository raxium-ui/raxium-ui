<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '../../button'
import { Slider, SliderTooltipThumb } from '../index'

const value = ref([10])
</script>

<template>
  <div class="w-full flex flex-col gap-3">
    <div class="flex items-center gap-2">
      <Button variant="outline" @click="value = [0]">
        Set 0
      </Button>
      <Button variant="outline" @click="value = [50]">
        Set 50
      </Button>
      <Button variant="outline" @click="value = [100]">
        Set 100
      </Button>
      <span class="text-sm text-hff">value: {{ value[0] }}</span>
    </div>

    <Slider v-model="value" class="w-90" :min="0" :max="100" :step="1">
      <SliderTooltipThumb :index="0" />
    </Slider>
  </div>
</template>
