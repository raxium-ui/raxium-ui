<script setup lang="ts">
import { Icon } from '../../icon'
import { Input } from '../index'
</script>

<template>
  <div class="w-full flex flex-col gap-3">
    <Input
      class="w-70"
      placeholder="Search..."
      :ui="{ base: 'border-rz-green', inner: 'text-hff' }"
    >
      <template #prefix>
        <Icon icon="lucide:search" class="text-hcc" />
      </template>
      <template #suffix>
        <Icon icon="lucide:corner-down-left" class="text-h55" />
      </template>
    </Input>

    <Input class="w-70" placeholder="Clearable with custom clear icon size" clearable :ui="{ clearable: 'text-rz-green' }">
      <template #prefix>
        <Icon icon="lucide:mail" class="text-hcc" />
      </template>
    </Input>
  </div>
</template>
