<script setup lang="ts">
import { THEME_SIZE } from '@raxium/shared/constant'
import { Tabs, TabsContent, TabsIndicator, TabsList, TabsTrigger } from '../index'
</script>

<template>
  <div class="w-full flex flex-col gap-6">
    <Tabs
      v-for="size in THEME_SIZE"
      :key="size"
      default-value="tab-1"
      :theme="{ size }"
      class="w-100"
    >
      <TabsList>
        <TabsTrigger value="tab-1">
          {{ size }}
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
        size={{ size }}
      </TabsContent>
      <TabsContent value="tab-2">
        Content 2
      </TabsContent>
      <TabsContent value="tab-3">
        Content 3
      </TabsContent>
    </Tabs>
  </div>
</template>
