<script setup lang="ts">
import { ref } from 'vue'
import {
  Slider,
  SliderMarker,
  SliderMarkerGroup,
  SliderTooltipMarker,
  SliderTooltipThumb,
} from '../index'

const value = ref([40])
</script>

<template>
  <div class="w-full flex flex-col gap-3">
    <div class="text-sm text-hff">
      value: {{ value[0] }}
    </div>

    <div class="flex flex-col gap-40">
      <Slider v-model="value" class="w-90" :theme="{ size: 'lg' }" :min="0" :max="100" :step="1">
        <SliderTooltipThumb :index="0" :theme="{ surface: 'razer' }" />
        <template #suffix>
          <SliderMarkerGroup>
            <SliderMarker :value="0" />
            <SliderMarker :value="25" />
            <SliderTooltipMarker :value="50" :theme="{ surface: 'razer' }">
              <template #content>
                Mid: 50
              </template>
            </SliderTooltipMarker>
            <SliderMarker :value="75" />
            <SliderMarker :value="100" />
          </SliderMarkerGroup>
        </template>
      </Slider>

      <Slider v-model="value" class="w-90" :theme="{ size: 'lg' }">
        <SliderTooltipThumb
          :index="0"
          :open="() => true"
          :positioning="{
            strategy: 'fixed',
          }"
        />
        <template #suffix>
          <SliderMarkerGroup>
            <SliderMarker :value="10" />
            <SliderTooltipMarker :value="20" :theme="{ surface: 'razer' }" />
            <SliderTooltipMarker :value="50" :theme="{ surface: value[0] >= 50 ? 'razer' : 'dark' }" />
          </SliderMarkerGroup>
        </template>
      </Slider>
    </div>
  </div>
</template>
