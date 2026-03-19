<script lang="ts" setup>
import { Badge } from '../index'
</script>

<template>
  <div class="flex flex-wrap items-center gap-4">
    <Badge
      variant="default"
      :theme="{ size: 'xs' }"
    >
      xs
    </Badge>
    <Badge
      variant="default"
      :theme="{ size: 'sm' }"
    >
      sm
    </Badge>
    <Badge
      variant="default"
      :theme="{ size: 'base' }"
    >
      base
    </Badge>
    <Badge
      variant="default"
      :theme="{ size: 'lg' }"
    >
      Large
    </Badge>
  </div>
</template>
