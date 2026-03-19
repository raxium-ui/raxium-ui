<script setup lang="ts">
import { ref } from 'vue'
import { useMuuri } from '../useMuuri'

const items = ref([
  { id: 1, title: 'Todo A' },
  { id: 2, title: 'Todo B' },
  { id: 3, title: 'Todo C' },
  { id: 4, title: 'Todo D' },
])

const moveText = ref('还没有拖拽')
const dragState = ref('idle')

useMuuri('.demo-muuri-grid-events', items, {
  onDragStart() {
    dragState.value = 'dragging'
  },
  onDragEnd() {
    dragState.value = 'idle'
  },
  onMove(data) {
    moveText.value = `from ${data.fromIndex} -> ${data.toIndex}`
  },
})
</script>

<template>
  <div class="demo-muuri">
    <div class="demo-muuri-panel">
      <span>状态: {{ dragState }}</span>
      <span>最近移动: {{ moveText }}</span>
    </div>

    <div class="demo-muuri-grid-events rui-muuri-grid">
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
            <span>试试拖动并观察上面的回调输出</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
