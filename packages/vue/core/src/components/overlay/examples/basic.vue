<script setup lang="ts">
import { useOverlay } from '@raxium/vue/composables/useOverlay'
import { Button } from '../../button'
import BasicDialog from './components/BasicDialog.vue'

/**
 * UseOverlay with default options, will create a overlay list to manage the overlays
 * Be careful when overlay close, the overlay object will still be in the list,
 * its not be released totally
 */
const overlay = useOverlay()
const basicDialog = overlay.create(BasicDialog)
function handleOpenDialog() {
  basicDialog.open({
    title: 'Overlay Dialog',
    content: 'Overlay Dialog Content',
  })
}

/**
 * UseOverlay with destroyOnClose option, it will will release the resource when overlay close
 * but we shuold create a new one every time we open the dialog
 */
function handleOpenDestroyOnCloseDialog() {
  const destroyOnCloseDialog = overlay.create(BasicDialog, {
    destroyOnClose: true,
  })
  destroyOnCloseDialog.open({
    title: 'Overlay Dialog',
    content: 'Overlay Dialog Destroy On Close',
  })
}
</script>

<template>
  <div class="w-full flex flex-col gap-3">
    <Button class="w-fit" @click="handleOpenDialog">
      Open Dialog
    </Button>
    <Button class="w-fit" @click="handleOpenDestroyOnCloseDialog">
      Open Destroy On Close Dialog
    </Button>
  </div>
</template>
