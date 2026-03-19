<script setup lang="ts">
import { Slider, SliderMarker, SliderMarkerGroup, SliderThumb, SliderTooltipMarker, SliderTooltipThumb } from '@raxium/vue/components/slider'
import { ref, useTemplateRef } from 'vue'

const testValue = ref([0])
const sliderRef = useTemplateRef('slider')
</script>

<template>
  <div class="flex items-center gap-2">
    <Slider ref="slider" v-model="testValue" class="w-75">
      <SliderTooltipThumb :index="0" />
    </Slider>

    <Slider class="w-75" size="sm" :default-value="[10, 20]">
      <SliderThumb :index="0" />
      <SliderThumb :index="1" />
    </Slider>
    <Slider v-model="testValue" class="w-75" size="lg">
      <SliderTooltipThumb
        :index="0"
        :open="() => true"
        skin="razer"
        :positioning="{
          strategy: 'fixed',
        }"
      />
      <template #suffix>
        <SliderMarkerGroup>
          <SliderMarker :value="10" />
          <SliderTooltipMarker :value="20" skin="razer" />
          <SliderTooltipMarker :value="50" :skin="testValue[0] >= 50 ? 'razer' : 'dark'" />
        </SliderMarkerGroup>
      </template>
    </Slider>
  </div>
</template>
