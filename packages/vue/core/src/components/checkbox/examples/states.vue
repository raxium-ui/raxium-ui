<script lang="ts" setup>
import type { CheckedState } from '../index'
import { ref } from 'vue'
import { Checkbox } from '../index'

const checked = ref<CheckedState>(true)
</script>

<template>
  <!-- id 是因为在story doc 中渲染多个组件时，需要有唯一的 id来使浏览器默认form行为进行区分 -->
  <div class="w-full flex flex-col gap-3">
    <div class="flex items-center gap-3">
      <Checkbox
        v-model:checked="checked"
        label="Controlled (v-model)"
      />
      <span class="text-sm text-hff">checked: {{ checked }}</span>
    </div>

    <div class="flex items-center gap-3">
      <Checkbox
        default-checked="indeterminate"
        label="Default indeterminate"
      />
      <Checkbox
        :default-checked="false"
        label="Default unchecked"
      />
      <Checkbox
        :default-checked="true"
        label="Default checked"
      />
    </div>

    <div class="flex items-center gap-3">
      <Checkbox
        label="Disabled"
        disabled
      />
      <Checkbox
        default-checked="indeterminate"
        label="Disabled indeterminate"
        disabled
      />
      <Checkbox
        :default-checked="true"
        label="Disabled checked"
        disabled
      />
    </div>
  </div>
</template>
