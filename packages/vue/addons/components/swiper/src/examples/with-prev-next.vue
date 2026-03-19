<script setup lang="ts">
import type { SwiperExpose } from '../index'
import { ref } from 'vue'
import { Swiper, SwiperNext, SwiperPrev, SwiperSlide } from '../index'

const swiperRef = ref<SwiperExpose>()
</script>

<template>
  <div class="w-full flex flex-col items-center gap-3">
    <p class="pb-2 text-[#00ff9f]">
      使用 SwiperPrev / SwiperNext 自定义导航
    </p>

    <p class="text-sm text-[#999]">
      {{ `SwiperPrev / SwiperNext in <Swiper>` }}
    </p>

    <Swiper class="relative w-full max-w-96">
      <SwiperSlide
        v-for="i in 5"
        :key="i"
        class="flex items-center justify-center h-48 bg-[#555555] text-white rounded-lg"
      >
        Slide {{ i }}
      </SwiperSlide>
      <template #container-end>
        <div class="flex justify-center items-center mt-2 gap-2">
          <SwiperPrev class="px-3 py-1 rounded bg-[#555555] hover:bg-[#666666] cursor-pointer text-sm">
            Prev
          </SwiperPrev>
          <SwiperNext class="px-3 py-1 rounded bg-[#555555] hover:bg-[#666666] cursor-pointer text-sm">
            Next
          </SwiperNext>
        </div>
      </template>
    </Swiper>

    <p class="text-sm mt-4 text-[#999]">
      {{ `SwiperPrev / SwiperNext out <SwiperSlide>` }}
    </p>
    <div class="flex justify-center items-center mt-2 gap-2">
      <SwiperPrev
        class="px-3 py-1 rounded bg-[#555555] hover:bg-[#666666] cursor-pointer text-sm"
        :swiper="swiperRef?.swiper"
      >
        Prev
      </SwiperPrev>
      <SwiperNext
        class="px-3 py-1 rounded bg-[#555555] hover:bg-[#666666] cursor-pointer text-sm"
        :swiper="swiperRef?.swiper"
      >
        Next
      </SwiperNext>
    </div>
    <Swiper ref="swiperRef" class="relative w-full max-w-96">
      <SwiperSlide v-for="i in 5" :key="i" class="flex items-center justify-center h-48 bg-[#555555] text-white rounded-lg">
        Slide {{ i }}
      </SwiperSlide>
    </Swiper>
  </div>
</template>
