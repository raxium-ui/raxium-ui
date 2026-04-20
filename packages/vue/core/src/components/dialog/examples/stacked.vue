<script setup lang="ts">
import { Button } from '../../button'
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from '../index'
</script>

<template>
  <!-- Dialog 1 ── layer-index: 0 → backdrop z-900 / positioner z-901 -->
  <Dialog lazy-mount unmount-on-exit>
    <DialogTrigger as-child>
      <Button>打开 Dialog 1</Button>
    </DialogTrigger>
    <DialogContent class="w-110">
      <DialogHeader>
        <span>Dialog 1</span>
        <span class="ml-2 text-xs font-mono opacity-50">backdrop z-900 · positioner z-901</span>
      </DialogHeader>
      <DialogBody class="flex flex-col gap-4">
        <p class="text-sm opacity-75">
          第一层弹窗，当前是栈顶。点击下方按钮继续叠加 Dialog 2。
        </p>

        <!-- Dialog 2 ── layer-index: 1 → backdrop z-902 / positioner z-903 -->
        <Dialog lazy-mount unmount-on-exit>
          <DialogTrigger as-child>
            <Button variant="outlined">打开 Dialog 2</Button>
          </DialogTrigger>
          <DialogContent class="w-96">
            <DialogHeader>
              <span>Dialog 2</span>
              <span class="ml-2 text-xs font-mono opacity-50">backdrop z-902 · positioner z-903</span>
            </DialogHeader>
            <DialogBody class="flex flex-col gap-4">
              <p class="text-sm opacity-75">
                第二层弹窗。此遮罩层（z-902）正确覆盖在 Dialog 1 内容（z-901）之上。
                点击此弹窗背景仅关闭 Dialog 2，Dialog 1 保持打开。
              </p>

              <!-- Dialog 3 ── layer-index: 2 → backdrop z-904 / positioner z-905 -->
              <Dialog lazy-mount unmount-on-exit>
                <DialogTrigger as-child>
                  <Button variant="text" size="sm">打开 Dialog 3</Button>
                </DialogTrigger>
                <DialogContent class="w-80">
                  <DialogHeader>
                    <span>Dialog 3</span>
                    <span class="ml-2 text-xs font-mono opacity-50">backdrop z-904 · positioner z-905</span>
                  </DialogHeader>
                  <DialogBody>
                    <p class="text-sm opacity-75 mb-3">
                      第三层弹窗。完整层叠顺序（低 → 高）：
                    </p>
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
                  </DialogBody>
                </DialogContent>
              </Dialog>
            </DialogBody>
          </DialogContent>
        </Dialog>
      </DialogBody>
    </DialogContent>
  </Dialog>
</template>
