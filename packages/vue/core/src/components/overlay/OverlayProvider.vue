<!--
  * OverlayProvider
  * @description Source codes from nuxt-ui OverlayProvider
  * @see https://github.com/nuxt/ui/blob/v3/src/runtime/components/OverlayProvider.vue
-->
<script setup lang="ts">
import type { Overlay } from '@raxium/vue/composables/useOverlay'
import { useOverlay } from '@raxium/vue/composables/useOverlay'
import { computed } from 'vue'

const { overlays, unmount, close } = useOverlay()

const mountedOverlays = computed(() => overlays.filter((overlay: Overlay) => overlay.isMounted))

function onExitComplete(id: symbol) {
  unmount(id)
}

function onClose(id: symbol) {
  close(id)
}
</script>

<template>
  <component
    :is="overlay.component"
    v-for="overlay in mountedOverlays"
    :key="overlay.id"
    v-bind="overlay.props"
    v-model:open="overlay.isOpen"
    @open-change="({ open } : {open: boolean}) => !open && onClose(overlay.id)"
    @exit-complete="onExitComplete(overlay.id)"
  />
</template>
