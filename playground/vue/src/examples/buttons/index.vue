<script setup lang="ts">
import { ToggleContext } from '@ark-ui/vue'
import { Button } from '@raxium/vue/components/button'
import { Icon } from '@raxium/vue/components/icon'
import { Toggle } from '@raxium/vue/components/toggle'
import { ToggleGroup, ToggleGroupItem } from '@raxium/vue/components/toggle-group'
</script>

<template>
  <div class="w-full flex flex-col items-center gap-4">
    <div class="w-full flex items-center gap-4">
      <Button> Default </Button>
      <Button variant="normal">
        Normal
      </Button>
      <Button loading>
        Loading
      </Button>
      <Button variant="outline">
        Outline
      </Button>
      <Button variant="text">
        Text
      </Button>
      <Button variant="icon">
        <Icon icon="lucide:plus" />
      </Button>
      <Button ripple>
        Ripple
      </Button>
    </div>
    <div class="w-full flex items-center gap-4">
      <Button size="sm">
        Small
      </Button>
      <Button size="base">
        Base
      </Button>
      <Button size="lg">
        Large
      </Button>
    </div>
    <div class="w-full flex items-center gap-4">
      <Toggle>
        <ToggleContext v-slot="{ pressed }">
          <Icon :icon="pressed ? 'lucide:volume-2' : 'lucide:volume-off'" />
          Toggle
        </ToggleContext>
      </Toggle>

      <ToggleGroup>
        <ToggleGroupItem value="a">
          A
        </ToggleGroupItem>
        <ToggleGroupItem value="b">
          B
        </ToggleGroupItem>
        <ToggleGroupItem value="c">
          C
        </ToggleGroupItem>
      </ToggleGroup>

      <ToggleGroup orientation="vertical">
        <ToggleGroupItem value="a">
          A
        </ToggleGroupItem>
        <ToggleGroupItem value="b">
          B
        </ToggleGroupItem>
        <ToggleGroupItem value="c">
          C
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  </div>
</template>
