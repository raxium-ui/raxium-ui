<script setup lang="tsx">
import { Button } from '../../button'
import { dialog } from '../index'

function openBasic() {
  dialog({
    title: 'Functional Dialog',
    content: 'This dialog is opened via the dialog() API.',
    onOk: () => {
      console.log('functional ok')
    },
    onCancel: () => {
      console.log('functional cancel')
    },
    onOpenChange: (details) => {
      console.log('functional openChange', details)
    },
  })
}

function openCustomRender() {
  dialog({
    render: () => (
      <div class="flex flex-col gap-3">
        <div class="text-sm text-hff">Custom render</div>
        <div class="text-sm text-hcc">
          You can fully control the content using a render function.
        </div>
      </div>
    ),
    footer: false,
    widget: {
      content: { class: 'w-120' },
    },
  })
}
</script>

<template>
  <div class="flex items-center gap-4">
    <Button @click="openBasic">
      Open Functional Dialog
    </Button>
    <Button variant="outline" @click="openCustomRender">
      Open Custom Render
    </Button>
  </div>
</template>
