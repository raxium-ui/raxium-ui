<script setup lang="ts">
import { ref } from 'vue'
import { Slider, SliderTooltipThumb } from '../index'

const verticalValue = ref([60])
</script>

<template>
  <div class="w-full flex flex-wrap items-start gap-8">
    <div class="flex flex-col gap-2">
      <div class="text-sm text-hff">
        vertical: {{ verticalValue[0] }}
      </div>
      <Slider
        v-model="verticalValue"
        orientation="vertical"
        class="h-60"
        :ui="{
          root: 'h-60',
          control: 'h-60 w-8 justify-center',
          track: 'h-full w-1',
          range: 'w-full',
        }"
      >
        <SliderTooltipThumb
          :index="0"
          :positioning="{
            placement: 'right',
          }"
        />
      </Slider>
    </div>

    <div class="flex flex-col gap-2">
      <div class="text-sm text-hff">
        disabled
      </div>
      <Slider class="w-80" :default-value="[30]" disabled>
        <SliderTooltipThumb :index="0" :open="() => true" />
      </Slider>
    </div>
  </div>
</template>
