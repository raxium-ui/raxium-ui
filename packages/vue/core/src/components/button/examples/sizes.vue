<script lang="ts" setup>
import { Button } from '../index'
</script>

<template>
  <div class="w-full flex items-center gap-4">
    <Button :theme="{ size: 'xs' }">
      xs
    </Button>
    <Button :theme="{ size: 'sm' }">
      Small
    </Button>
    <Button :theme="{ size: 'base' }">
      Base
    </Button>
    <Button :theme="{ size: 'lg' }">
      Large
    </Button>
  </div>
</template>
