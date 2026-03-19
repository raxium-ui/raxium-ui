<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '../../button'
import { Tabs, TabsContent, TabsIndicator, TabsList, TabsTrigger } from '../index'

const value = ref('tab-7')
</script>

<template>
  <div class="w-full flex flex-col gap-3">
    <div class="flex items-center gap-2">
      <Button variant="outline" @click="value = 'tab-1'">
        Tab 1
      </Button>
      <Button variant="outline" @click="value = 'tab-7'">
        Tab 7
      </Button>
      <Button variant="outline" @click="value = 'tab-10'">
        Tab 10
      </Button>
      <span class="text-sm text-hff">value: {{ value }}</span>
    </div>

    <Tabs v-model="value">
      <TabsList class="w-90">
        <TabsTrigger v-for="index in 10" :key="index" :value="`tab-${index}`">
          Tab {{ index }}
        </TabsTrigger>
        <TabsIndicator />
      </TabsList>

      <TabsContent v-for="index in 10" :key="index" :value="`tab-${index}`">
        Content {{ index }}
      </TabsContent>
    </Tabs>
  </div>
</template>
