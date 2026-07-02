<script setup lang="ts">
import { Icon } from '../../icon'
import { Input } from '../index'
</script>

<template>
  <div class="w-full flex flex-col gap-3">
    <Input
      class="w-70"
      placeholder="Search..."
      :ui="{ root: 'border-rz-green', input: 'text-gray-ff' }"
    >
      <template #prefix>
        <Icon
          icon="lucide:search"
          class="text-gray-cc"
        />
      </template>
      <template #suffix>
        <Icon
          icon="lucide:corner-down-left"
          class="text-gray-55"
        />
      </template>
    </Input>

    <Input
      class="w-70"
      placeholder="Clearable with custom clear icon size"
      clearable
      :ui="{ clearable: 'text-rz-green' }"
    >
      <template #prefix>
        <Icon
          icon="lucide:mail"
          class="text-gray-cc"
        />
      </template>
    </Input>
  </div>
</template>
