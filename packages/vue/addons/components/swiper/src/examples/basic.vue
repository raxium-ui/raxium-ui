<script setup lang="ts">
import { Swiper, SwiperSlide } from '../index'
</script>

<template>
  <div class="w-full flex flex-col items-center gap-3">
    <p class="pb-2 text-[#00ff9f]">
      基础 Swiper
    </p>
    <Swiper class="w-full max-w-96">
      <SwiperSlide
        v-for="i in 5"
        :key="i"
        class="flex items-center justify-center h-48 bg-[#555555] text-white rounded-lg"
      >
        Slide {{ i }}
      </SwiperSlide>
    </Swiper>
  </div>
</template>
