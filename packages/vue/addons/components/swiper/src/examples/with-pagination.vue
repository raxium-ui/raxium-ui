<script setup lang="ts">
import type { SwiperExpose } from '../index'
import { Navigation, Pagination } from 'swiper/modules'
import { ref } from 'vue'
import { Swiper, SwiperPagination, SwiperSlide } from '../index'

const modules = [Navigation, Pagination]
const swiperRef = ref<SwiperExpose>()
</script>

<template>
  <div class="w-full flex flex-col items-center gap-3">
    <p class="pb-2 text-[#00ff9f]">
      带分页器的 Swiper
    </p>

    <p class="text-sm text-[#999]">
      {{ `SwiperPagination in <Swiper>` }}
    </p>

    <Swiper
      :modules="modules"
      class="relative w-full max-w-96 rounded-lg"
    >
      <SwiperSlide
        v-for="i in 5"
        :key="i"
        class="flex items-center justify-center h-48 bg-[#555555] text-white rounded-lg"
      >
        Slide {{ i }}
      </SwiperSlide>
      <template #container-end>
        <SwiperPagination
          class="flex justify-center items-center py-2"
          type="bullets"
          :clickable="true"
        />
      </template>
    </Swiper>

    <p class="text-sm mt-4 text-[#999]">
      {{ `SwiperPagination out <Swiper>` }}
    </p>
    <Swiper ref="swiperRef" :modules="modules" class="relative w-full max-w-96 rounded-lg">
      <SwiperSlide
        v-for="i in 5"
        :key="i"
        class="flex items-center justify-center h-48 bg-[#555555] text-white rounded-lg"
      >
        Slide {{ i }}
      </SwiperSlide>
    </Swiper>
    <SwiperPagination
      class="flex justify-center items-center py-2"
      type="bullets"
      :clickable="true"
      :swiper="swiperRef?.swiper"
    />
  </div>
</template>
