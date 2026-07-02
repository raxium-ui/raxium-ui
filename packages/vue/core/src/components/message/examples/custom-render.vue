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
          <div class="text-sm text-gray-ff">Custom description</div>
          <div class="text-xs opacity-75">
            type:
            {' '}
            {ctx.type}
            , placement:
            {' '}
            {ctx.placement}
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
          <div class="text-sm text-gray-ff">
            Fully custom render (
            {ctx.type}
            )
          </div>
          <MessageCloseTrigger>
            <button class="text-xs text-rz-green">Close</button>
          </MessageCloseTrigger>
        </div>
      )
    },
  })
}

// Pass per-message `props` (2nd arg) to customize the <Message> instance for this call only.
function openWithProps() {
  message.create(
    {
      type: 'info',
      description: 'This message overrides theme.size and adds classes per call.',
      showClose: true,
    },
    {
      class: 'ring-2 ring-primary',
      theme: { size: 'lg' },
      ui: {
        description: 'font-bold italic',
      },
    },
  )
}

// `update` also accepts a `props` argument (merged onto existing per-message props).
function openThenUpdate() {
  const result = message.create(
    {
      type: 'loading',
      description: 'Loading, updating soon...',
      duration: Number.POSITIVE_INFINITY,
    },
    { class: 'ring-2 ring-warning' },
  )
  if (!result)
    return
  const { messageId, messager } = result
  setTimeout(() => {
    messager.update(
      messageId,
      { type: 'success', description: 'Done! props merged with previous ones', duration: 3000 },
      { class: 'ring-2 ring-success' },
    )
  }, 1500)
}
</script>

<template>
  <div class="flex flex-wrap items-center gap-3">
    <Button @click="openCustomDescription">
      Custom description()
    </Button>
    <Button variant="outlined" @click="openRender">
      render()
    </Button>
    <Button @click="openWithProps">
      Create with props
    </Button>
    <Button variant="outlined" @click="openThenUpdate">
      Create then update props
    </Button>
  </div>
</template>
