<script lang="ts" setup>
import { Icon } from '../../icon'
import { Button } from '../index'
</script>

<template>
  <div class="w-full flex items-center gap-4">
    <Button>Default</Button>
    <Button variant="normal">
      Normal
    </Button>
    <Button loading>
      Loading
    </Button>
    <Button variant="outline">
      Outline
    </Button>
    <Button variant="text">
      Text
    </Button>
    <Button variant="icon">
      <Icon icon="lucide:plus" />
    </Button>
    <Button ripple>
      Ripple
    </Button>
  </div>
</template>
