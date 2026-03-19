<script setup lang="ts">
import { Autoplay, Pagination } from 'swiper/modules'
import { Swiper, SwiperPagination, SwiperSlide } from '../index'

const modules = [Autoplay, Pagination]
</script>

<template>
  <div class="w-full flex flex-col items-center gap-3">
    <p class="pb-2 text-[#00ff9f]">
      自动播放 + 进度条分页
    </p>
    <Swiper
      :modules="modules"
      :autoplay="{ delay: 3000, disableOnInteraction: false }"
      class="relative w-full max-w-96"
    >
      <SwiperSlide
        v-for="i in 5"
        :key="i"
        class="flex items-center justify-center h-48 bg-[#555555] text-white rounded-lg"
      >
        Slide {{ i }}
      </SwiperSlide>
      <template #container-end>
        <SwiperPagination type="autoplay-bullets" />
      </template>
    </Swiper>
  </div>
</template>
