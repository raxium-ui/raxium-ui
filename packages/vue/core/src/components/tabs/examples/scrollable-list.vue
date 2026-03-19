<script setup lang="ts">
import { Tabs, TabsContent, TabsIndicator, TabsList, TabsTrigger } from '../index'
</script>

<template>
  <Tabs default-value="tab-7">
    <TabsList class="w-80">
      <TabsTrigger v-for="index in 12" :key="index" :value="`tab-${index}`">
        Tab {{ index }}
      </TabsTrigger>
      <TabsIndicator />
    </TabsList>
    <TabsContent v-for="index in 12" :key="index" :value="`tab-${index}`">
      Content {{ index }}
    </TabsContent>
  </Tabs>
</template>
