<script setup lang="ts">
import { Tabs, TabsContent, TabsIndicator, TabsList, TabsTrigger } from '../index'
</script>

<template>
  <Tabs default-value="tab-1">
    <TabsList class="w-80">
      <TabsTrigger value="tab-1">
        Tab 1
      </TabsTrigger>
      <TabsTrigger value="tab-2">
        Tab 2
      </TabsTrigger>
      <TabsTrigger value="tab-3">
        Tab 3
      </TabsTrigger>
      <TabsIndicator />
    </TabsList>

    <TabsContent value="tab-1">
      Content 1
    </TabsContent>
    <TabsContent value="tab-2">
      Content 2
    </TabsContent>
    <TabsContent value="tab-3">
      Content 3
    </TabsContent>
  </Tabs>
</template>
