<script setup lang="ts">
import { Pagination } from 'swiper/modules'
import { Swiper, SwiperPagination, SwiperSlide } from '../index'

const modules = [Pagination]
</script>

<template>
  <div class="w-full flex flex-col items-center gap-3">
    <p class="pb-2 text-[#00ff9f]">
      多幻灯片同时显示
    </p>
    <Swiper
      :modules="modules"
      :slides-per-view="3"
      :space-between="16"
      class="relative w-full max-w-96"
    >
      <SwiperSlide
        v-for="i in 9"
        :key="i"
        class="flex items-center h-48 justify-center bg-[#555555] text-white rounded-lg"
      >
        {{ i }}
      </SwiperSlide>
      <template #container-end>
        <SwiperPagination
          type="bullets"
          :clickable="true"
        />
      </template>
    </Swiper>
  </div>
</template>
