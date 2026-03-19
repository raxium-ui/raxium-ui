<script setup lang="tsx">
import { Button } from '../../button'
import { MessageCloseTrigger, useMessage } from '../index'

const { message } = useMessage()

function openCustomDescription() {
  message.create({
    type: 'success',
    showClose: true,
    description: (ctx) => {
      return (
        <div class="flex flex-col gap-1">
          <div class="text-sm text-hff">Custom description</div>
          <div class="text-xs opacity-75">
            type: {ctx.type}, placement: {ctx.placement}
          </div>
        </div>
      )
    },
  })
}

function openRender() {
  message.create({
    type: 'warning',
    showClose: false,
    render: (ctx) => {
      return (
        <div class="flex items-center gap-3">
          <div class="text-sm text-hff">
            Fully custom render ({ctx.type})
          </div>
          <MessageCloseTrigger>
            <button class="text-xs text-rz-green">Close</button>
          </MessageCloseTrigger>
        </div>
      )
    },
  })
}
</script>

<template>
  <div class="flex flex-wrap items-center gap-3">
    <Button @click="openCustomDescription">
      Custom description()
    </Button>
    <Button variant="outline" @click="openRender">
      render()
    </Button>
  </div>
</template>

