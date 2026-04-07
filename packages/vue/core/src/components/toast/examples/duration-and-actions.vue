<script setup lang="tsx">
import { Button } from '../../button'
import { ToastActionTrigger, ToastCloseTrigger, useToast } from '../index'

const { toast } = useToast()

function createShortDuration() {
  toast.create({
    type: 'info',
    placement: 'top-end',
    title: '短时提示',
    description: '1.2 秒后自动关闭',
    duration: 1200,
  })
}

function createPersistentWithActions() {
  toast.create({
    type: 'warning',
    placement: 'top-end',
    duration: Infinity,
    render: () => (
      <div class="flex items-center gap-3">
        <div class="space-y-0.5">
          <p class="text-sm font-medium">检测到未保存内容</p>
          <p class="text-xs opacity-80">可继续编辑，或立即提交变更。</p>
        </div>
        <ToastActionTrigger>
          <button class="text-xs underline underline-offset-2">立即提交</button>
        </ToastActionTrigger>
        <ToastCloseTrigger>
          <button class="text-xs underline underline-offset-2">关闭</button>
        </ToastCloseTrigger>
      </div>
    ),
  })
}
</script>

<template>
  <div class="flex flex-wrap items-center gap-2">
    <Button :theme="{ size: 'sm' }" @click="createShortDuration">
      duration=1200ms
    </Button>
    <Button :theme="{ size: 'sm' }" variant="outlined" @click="createPersistentWithActions">
      操作按钮与手动关闭
    </Button>
  </div>
</template>
