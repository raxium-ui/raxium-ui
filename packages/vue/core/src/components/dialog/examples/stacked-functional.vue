<script setup lang="tsx">
import { Button } from '../../button'
import { useDialog } from '../index'

const { dialog: dialogFn } = useDialog()

function openDialog3() {
  dialogFn.open({
    title: 'Dialog 3',
    widget: { content: { class: 'w-80' } },
    render: () => (
      <div class="flex flex-col gap-3">
        <p class="text-sm opacity-75 mb-1">第三层弹窗。完整层叠顺序（低 → 高）：</p>
        <ul class="text-xs font-mono space-y-1.5">
          <li class="flex justify-between">
            <span class="opacity-60">Overlay 1</span>
            <code>z-900</code>
          </li>
          <li class="flex justify-between">
            <span class="opacity-60">Dialog 1</span>
            <code>z-901</code>
          </li>
          <li class="flex justify-between">
            <span class="opacity-60">Overlay 2</span>
            <code>z-902</code>
          </li>
          <li class="flex justify-between">
            <span class="opacity-60">Dialog 2</span>
            <code>z-903</code>
          </li>
          <li class="flex justify-between font-semibold">
            <span class="opacity-60">Overlay 3 ← 当前</span>
            <code>z-904</code>
          </li>
          <li class="flex justify-between font-semibold">
            <span class="opacity-60">Dialog 3 ← 当前</span>
            <code>z-905</code>
          </li>
        </ul>
      </div>
    ),
    footer: false,
  })
}

function openDialog2() {
  dialogFn.open({
    title: 'Dialog 2',
    widget: { content: { class: 'w-96' } },
    render: () => (
      <div class="flex flex-col gap-4">
        <p class="text-sm opacity-75">
          第二层弹窗。此遮罩层（z-902）正确覆盖在 Dialog 1 内容（z-901）之上。
          点击此弹窗背景仅关闭 Dialog 2，Dialog 1 保持打开。
        </p>
        <Button variant="text" theme={{ size: 'sm' }} onClick={openDialog3}>
          打开 Dialog 3
        </Button>
      </div>
    ),
    footer: false,
  })
}

function openDialog1() {
  dialogFn.open({
    title: 'Dialog 1',
    widget: { content: { class: 'w-110' } },
    render: () => (
      <div class="flex flex-col gap-4">
        <p class="text-sm opacity-75">
          第一层弹窗，当前是栈顶。点击下方按钮继续叠加 Dialog 2。
        </p>
        <Button variant="outlined" onClick={openDialog2}>
          打开 Dialog 2
        </Button>
      </div>
    ),
    footer: false,
  })
}
</script>

<template>
  <Button @click="openDialog1">
    打开 Dialog 1
  </Button>
</template>
