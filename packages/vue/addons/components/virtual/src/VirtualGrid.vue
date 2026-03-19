<script lang="ts" generic="T" setup>
import type { HTMLAttributes } from 'vue'
import type { VirtualGridProps } from '.'
import { VirtualRoot } from '.'
import VirtualGridImpl from './VirtualGridImpl.vue'

const props = defineProps<
  VirtualGridProps<T> & {
    ui?: {
      viewport?: {
        class?: HTMLAttributes['class']
      }
      scroll?: {
        class?: HTMLAttributes['class']
      }
    }
  }
>()
defineSlots<{ default: () => any }>()
</script>

<template>
  <VirtualRoot>
    <VirtualGridImpl v-bind="{ ...props, ...$attrs }">
      <slot />
    </VirtualGridImpl>
  </VirtualRoot>
</template>
