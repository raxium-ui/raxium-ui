<script setup lang="ts">
import type { SwiperExpose } from '../index'
import { Pagination } from 'swiper/modules'
import { ref } from 'vue'
import { Swiper, SwiperPagination, SwiperSlide } from '../index'

const modules = [Pagination]

const swiperRef = ref<SwiperExpose>()
</script>

<template>
  <div class="w-full flex flex-col items-center gap-3">
    <p class="pb-2 text-[#00ff9f]">
      垂直方向 Swiper
    </p>
    <div class="flex items-center justify-center gap-2 relative">
      <Swiper
        ref="swiperRef"
        :modules="modules"
        direction="vertical"
        class="relative w-full max-w-96 h-64"
      >
        <SwiperSlide
          v-for="i in 5"
          :key="i"
          class="flex items-center w-84 justify-center bg-[#555555] text-white rounded-lg"
        >
          Slide {{ i }}
        </SwiperSlide>
      </Swiper>
      <SwiperPagination
        class="absolute w-fit -right-4 top-[50%] origin-top-left flex flex-col items-center"
        :swiper="swiperRef?.swiper"
        type="bullets"
        :clickable="true"
      />
    </div>
  </div>
</template>
