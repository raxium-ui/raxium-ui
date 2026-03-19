<script lang="ts">
import { createContext } from '@ark-ui/vue'

type Boundary = 'clippingAncestors' | Element | Array<Element>
const [provideSliderBoundaryContext, injectSliderBoundaryContext]
  = createContext<ComputedRef<Boundary>>('SliderBoundaryProvider')

export { injectSliderBoundaryContext }
</script>

<script setup lang="ts">
import type { ComputedRef } from 'vue'
import { computed } from 'vue'

const props = defineProps<{
  boundary: Boundary
}>()
provideSliderBoundaryContext(computed(() => props.boundary))
</script>

<template>
  <slot />
</template>
