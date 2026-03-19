<script setup lang="ts">
import type { SwiperExpose } from '../index'
import { Scrollbar } from 'swiper/modules'
import { ref } from 'vue'
import { Swiper, SwiperScrollbar, SwiperSlide } from '../index'

const modules = [Scrollbar]
const swiperRef = ref<SwiperExpose>()
</script>

<template>
  <div class="w-full flex flex-col items-center gap-3">
    <p class="pb-2 text-[#00ff9f]">
      带滚动条的 Swiper
    </p>

    <p class="text-sm text-[#999]">
      {{ `SwiperScrollbar in <Swiper>` }}
    </p>

    <Swiper
      :modules="modules"
      class="relative w-full max-w-96"
    >
      <SwiperSlide
        v-for="i in 8"
        :key="i"
        class="flex items-center justify-center h-48 bg-[#555555] text-white rounded-lg"
      >
        Slide {{ i }}
      </SwiperSlide>
      <template #container-end>
        <SwiperScrollbar class="h-1 mt-2" :draggable="true" />
      </template>
    </Swiper>

    <p class="text-sm mt-4 text-[#999]">
      {{ `SwiperScrollbar out <Swiper>` }}
    </p>
    <Swiper ref="swiperRef" :modules="modules" class="relative w-full max-w-96">
      <SwiperSlide
        v-for="i in 8"
        :key="i"
        class="flex items-center justify-center h-48 bg-[#555555] text-white rounded-lg"
      >
        Slide {{ i }}
      </SwiperSlide>
    </Swiper>
    <SwiperScrollbar
      class="w-96 h-1 mt-2"
      :draggable="true"
      :swiper="swiperRef?.swiper"
    />
  </div>
</template>
