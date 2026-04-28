<script setup lang="ts">
import { ref, watch } from 'vue'
import { Button } from '../../button'
import { Tabs, TabsContent, TabsIndicator, TabsList, TabsTrigger } from '../index'

const value = ref('tab-1')
const showTab2 = ref(true)
const showTab3 = ref(true)

watch([value, showTab2, showTab3], () => {
  if (value.value === 'tab-2' && !showTab2.value)
    value.value = 'tab-1'
  if (value.value === 'tab-3' && !showTab3.value)
    value.value = 'tab-1'
})
</script>

<template>
  <div class="w-full flex flex-col gap-3">
    <div class="flex flex-wrap items-center gap-2">
      <Button
        variant="outlined"
        @click="showTab2 = !showTab2"
      >
        {{ showTab2 ? 'Hide' : 'Show' }} Tab 2
      </Button>
      <Button
        variant="outlined"
        @click="showTab3 = !showTab3"
      >
        {{ showTab3 ? 'Hide' : 'Show' }} Tab 3
      </Button>
      <span class="text-sm text-hff">value: {{ value }}</span>
    </div>

    <Tabs v-model="value">
      <TabsList class="w-80">
        <TabsTrigger value="tab-1">
          Tab 1
        </TabsTrigger>
        <TabsTrigger v-if="showTab2" value="tab-2">
          Tab 2
        </TabsTrigger>
        <TabsTrigger v-if="showTab3" value="tab-3">
          Tab 3
        </TabsTrigger>
        <TabsTrigger value="tab-4">
          Tab 4
        </TabsTrigger>
        <TabsIndicator />
      </TabsList>

      <TabsContent value="tab-1">
        Content 1 (always visible)
      </TabsContent>
      <TabsContent value="tab-2">
        Content 2
      </TabsContent>
      <TabsContent value="tab-3">
        Content 3
      </TabsContent>
      <TabsContent value="tab-4">
        Content 4 (always visible)
      </TabsContent>
    </Tabs>
  </div>
</template>
