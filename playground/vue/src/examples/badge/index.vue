<script lang="ts" setup>
import { Badge } from '@raxium/vue/components/badge'
</script>

<template>
  <div class="flex gap-2">
    <div class="flex items-center gap-2">
      <Badge variant="default">
        Default
      </Badge>
    </div>
    <div class="flex items-center gap-2">
      <Badge variant="secondary">
        Secondary
      </Badge>
    </div>
    <div class="flex items-center">
      Dot
      <Badge
        variant="dot"
        as="sup"
      />
    </div>
  </div>
</template>
