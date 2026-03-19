<script setup lang="ts">
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../index'
</script>

<template>
  <Tabs default-value="tab-1">
    <TabsList class="w-80">
      <TabsTrigger value="tab-1">
        Tab 1
      </TabsTrigger>
      <TabsTrigger value="tab-2" disabled>
        Tab 2 (disabled)
      </TabsTrigger>
      <TabsTrigger value="tab-3">
        Tab 3
      </TabsTrigger>
    </TabsList>

    <TabsContent value="tab-1">
      Content 1
    </TabsContent>
    <TabsContent value="tab-2">
      You shouldn't see this
    </TabsContent>
    <TabsContent value="tab-3">
      Content 3
    </TabsContent>
  </Tabs>
</template>
