<script setup lang="ts">
import { Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperNavigationNext, SwiperNavigationPrev, SwiperPagination, SwiperSlide } from '../index'

const modules = [Navigation, Pagination]
</script>

<template>
  <div class="w-full flex flex-col items-center gap-3">
    <p class="pb-2 text-[#00ff9f]">
      循环模式 Swiper
    </p>
    <Swiper
      :modules="modules"
      :loop="true"
      class="relative w-full max-w-96"
    >
      <SwiperSlide
        v-for="i in 5"
        :key="i"
        class="flex items-center justify-center h-48 bg-[#555555] text-white rounded-lg"
      >
        Slide {{ i }}
      </SwiperSlide>
      <template #container-start>
        <SwiperNavigationPrev class="absolute left-2 z-10" />
        <SwiperNavigationNext class="absolute right-2 z-10" />
      </template>
      <template #container-end>
        <SwiperPagination type="bullets" :clickable="true" />
      </template>
    </Swiper>
  </div>
</template>
