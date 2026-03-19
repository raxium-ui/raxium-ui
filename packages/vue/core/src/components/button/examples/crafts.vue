<script lang="ts" setup>
import { Button } from '../index'
</script>

<template>
  <Button
    :theme="{
      crafts: {
        variants: {
          size: {
            base: {
              root: 'size-10 text-xs',
            },
          },
        },
      },
    }"
  >
    Crafts
  </Button>
</template>
