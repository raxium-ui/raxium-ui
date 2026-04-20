<script setup lang="tsx">
import { Button } from '../../button'
import { dialog, TriggerFrom, useDialog } from '../index'

// 在 setup 中调用，自动捕获当前 App 的 appContext（插件、全局组件等）
const { dialog: dialogFn } = useDialog()

/** 使用 useDialog() 唤起弹窗，自动继承 App 上下文（vue-i18n、pinia、全局组件等） */
function openWithContext() {
  dialogFn.open({
    title: 'useDialog()（继承 App 上下文）',
    content:
      '此弹窗通过 useDialog() 唤起。相比直接调用 dialog()，useDialog() 在 setup 内调用时会自动将当前 App 的 appContext 注入到弹窗，使弹窗内容可访问 vue-i18n、vue-router、pinia 及全局注册的组件。',
    onOk: () => {
      console.log('useDialog ok')
    },
  })
}

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

/** 与声明式 `<Dialog before-close />` 相同：`done()` 执行后才真正关闭 */
function openWithBeforeClose() {
  dialog({
    title: 'beforeClose（函数式）',
    content:
      '在 beforeClose 内约 2000ms 后调用 done()；此前弹窗会保持打开。请打开控制台查看 from。',
    beforeClose: ({ from, done }) => {
      console.log('functional beforeClose', from)
      if (from === TriggerFrom.OK_BUTTON) {
        console.log('functional beforeClose ok')
        window.setTimeout(done, 2000)
      }
      else {
        console.log('functional beforeClose cancel')
        done()
      }
    },
    onOpenChange: (details) => {
      console.log('functional openChange', details)
    },
  })
}
</script>

<template>
  <div class="flex flex-wrap items-center gap-4">
    <Button @click="openBasic">
      Open Functional Dialog
    </Button>
    <Button variant="outlined" @click="openCustomRender">
      Open Custom Render
    </Button>
    <Button variant="outlined" @click="openWithBeforeClose">
      Open with beforeClose
    </Button>
    <Button variant="outlined" @click="openWithContext">
      Open with useDialog()
    </Button>
  </div>
</template>
