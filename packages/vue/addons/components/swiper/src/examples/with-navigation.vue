<script setup lang="ts">
import type { SwiperExpose } from '../index'
import { Navigation } from 'swiper/modules'
import { ref } from 'vue'
import { Swiper, SwiperNavigationNext, SwiperNavigationPrev, SwiperSlide } from '../index'

const modules = [Navigation]
const swiperRef = ref<SwiperExpose>()
</script>

<template>
  <div class="w-full flex flex-col items-center gap-3">
    <p class="pb-2 text-[#00ff9f]">
      带左右导航按钮的 Swiper
    </p>

    <p class="text-sm text-[#999]">
      {{ `SwiperNavigationPrev / SwiperNavigationNext in <Swiper>` }}
    </p>

    <Swiper
      :modules="modules"
      class="relative w-full max-w-96"
    >
      <SwiperSlide
        v-for="i in 5"
        :key="i"
        class="flex items-center h-48 justify-center bg-[#555555] text-white rounded-lg"
      >
        Slide {{ i }}
      </SwiperSlide>
      <template #container-start>
        <SwiperNavigationPrev
          class="absolute left-2 z-10 text-[#999] hover:text-white hover:bg-white/10"
        />
        <SwiperNavigationNext
          class="absolute right-2 z-10 text-[#999] hover:text-white hover:bg-white/10"
        />
      </template>
    </Swiper>

    <p class="text-sm mt-4 text-[#999]">
      {{ `SwiperNavigationPrev / SwiperNavigationNext out <Swiper>` }}
    </p>
    <div class="relative w-full max-w-96">
      <Swiper ref="swiperRef" :modules="modules" class="relative w-full">
        <SwiperSlide
          v-for="i in 5"
          :key="i"
          class="flex items-center h-48 justify-center bg-[#555555] text-white rounded-lg"
        >
          Slide {{ i }}
        </SwiperSlide>
      </Swiper>
      <SwiperNavigationPrev
        class="absolute left-2 top-1/2 -translate-y-1/2 z-10 text-[#999] hover:text-white hover:bg-white/10"
        :swiper="swiperRef?.swiper"
      />
      <SwiperNavigationNext
        class="absolute right-2 top-1/2 -translate-y-1/2 z-10 text-[#999] hover:text-white hover:bg-white/10"
        :swiper="swiperRef?.swiper"
      />
    </div>
  </div>
</template>
