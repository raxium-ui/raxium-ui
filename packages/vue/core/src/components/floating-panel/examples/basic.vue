<script setup lang="ts">
import { PopoverContext, SliderValueText } from '@ark-ui/vue'
import { Blend } from 'lucide-vue-next'
import { Button } from '../../button'
import { Popover, PopoverContent, PopoverTrigger } from '../../popover'
import { Slider, SliderThumb } from '../../slider'
import {
  FloatingPanel,
  FloatingPanelCloseTrigger,
  FloatingPanelContent,
  FloatingPanelHeader,
  FloatingPanelOpacityTrigger,
  FloatingPanelPinTrigger,
  FloatingPanelStageTrigger,
  FloatingPanelTrigger,
} from '../index'
</script>

<template>
  <FloatingPanel :min-size="{ width: 400, height: 400 }">
    <FloatingPanelTrigger as-child>
      <Button class="w-fit">
        Open FloatingPanel
      </Button>
    </FloatingPanelTrigger>
    <FloatingPanelContent>
      <FloatingPanelHeader>
        FloatingPanel Title
        <template #control>
          <FloatingPanelOpacityTrigger>
            <template #default="{ opacityGetter, setOpacity }">
              <Popover>
                <PopoverContext v-slot="{ open }">
                  <PopoverTrigger>
                    <Blend class="size-[1lh]" :class="[open && 'text-hff']" />
                  </PopoverTrigger>
                  <Teleport to="body">
                    <PopoverContent>
                      <div class="flex items-center gap-2">
                        <Slider
                          :model-value="[opacityGetter()]"
                          class="flex-row items-center gap-2"
                          :min="30"
                          :max="100"
                          :step="1"
                          :theme="{ size: 'xs' }"
                          @update:model-value="(value) => setOpacity(value[0])"
                        >
                          <SliderThumb :index="0" />
                          <template #suffix>
                            <SliderValueText class="text-xs" />
                          </template>
                        </Slider>
                      </div>
                    </PopoverContent>
                  </Teleport>
                </PopoverContext>
              </Popover>
            </template>
          </FloatingPanelOpacityTrigger>
          <FloatingPanelPinTrigger />
          <FloatingPanelStageTrigger stage="minimized" />
          <FloatingPanelStageTrigger stage="maximized" />
          <FloatingPanelStageTrigger stage="default" />
          <FloatingPanelCloseTrigger />
        </template>
      </FloatingPanelHeader>
      <div>floating panel content</div>
    </FloatingPanelContent>
  </FloatingPanel>
</template>
