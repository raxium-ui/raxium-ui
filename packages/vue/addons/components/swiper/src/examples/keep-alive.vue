<script setup lang="ts">
import { Autoplay, Pagination } from 'swiper/modules'
import { defineComponent, ref } from 'vue'
import { Swiper, SwiperPagination, SwiperSlide } from '../index'

const modules = [Autoplay, Pagination]

const ListPanel = defineComponent({
  name: 'ListPanel',
  template: `
    <div class="w-full max-w-96 rounded-lg bg-[#333] p-6 text-white">
      <p class="text-sm text-[#aaa]">
        切换到「Swiper 页」时，下方轮播会重新初始化；反复切换可在 DevTools Memory 中观察 detached 节点是否稳定。
      </p>
    </div>
  `,
})

const SwiperPanel = defineComponent({
  name: 'SwiperPanel',
  // eslint-disable-next-line vue/no-unused-components
  components: { Swiper, SwiperSlide, SwiperPagination },
  setup() {
    return { modules }
  },
  template: `
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
  `,
})

const activeTab = ref<'list' | 'swiper'>('swiper')
</script>

<template>
  <div class="w-full flex flex-col items-center gap-4">
    <p class="pb-2 text-[#00ff9f]">
      Keep-Alive 切换：Swiper 在 tab 隐藏时销毁，再次显示时重建
    </p>

    <div class="flex gap-2">
      <button
        type="button"
        class="px-4 py-2 rounded-lg text-sm"
        :class="
          activeTab === 'list'
            ? 'bg-[#00ff9f] text-black'
            : 'bg-[#333] text-white'
        "
        @click="activeTab = 'list'"
      >
        列表页
      </button>
      <button
        type="button"
        class="px-4 py-2 rounded-lg text-sm"
        :class="
          activeTab === 'swiper'
            ? 'bg-[#00ff9f] text-black'
            : 'bg-[#333] text-white'
        "
        @click="activeTab = 'swiper'"
      >
        Swiper 页
      </button>
    </div>

    <KeepAlive>
      <ListPanel v-if="activeTab === 'list'" />
      <SwiperPanel v-else />
    </KeepAlive>
  </div>
</template>
