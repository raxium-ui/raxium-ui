<script setup lang="ts">
import { ref } from 'vue'
import { useMuuri } from '../useMuuri'

const items = ref([
  { id: 1, title: 'Card A', desc: '通过左侧手柄拖拽排序' },
  { id: 2, title: 'Card B', desc: '列表顺序会自动同步到 ref' },
  { id: 3, title: 'Card C', desc: '默认只允许 Y 轴拖拽' },
  { id: 4, title: 'Card D', desc: '默认开启占位符效果' },
  { id: 5, title: 'Card E', desc: '把我拖到顶部试试' },
])

useMuuri('.demo-muuri-grid', items)
</script>

<template>
  <div class="demo-muuri">
    <div class="demo-muuri-grid rui-muuri-grid">
      <div
        v-for="item in items"
        :key="item.id"
        class="rui-muuri-item"
      >
        <div class="rui-muuri-item-content">
          <button
            type="button"
            class="rui-muuri-handle"
            aria-label="拖拽手柄"
          >
            ⠿
          </button>
          <div class="demo-muuri-text">
            <strong>{{ item.title }}</strong>
            <span>{{ item.desc }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
