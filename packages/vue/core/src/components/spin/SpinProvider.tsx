import type { SlotsType, VNode } from 'vue'
import type { SpinRenderProps } from '.'
import { ark } from '@ark-ui/vue/factory'
import { LoaderCircle } from 'lucide-vue-next'
import { computed, defineComponent, provide } from 'vue'

/**
 * TODO: rslib无法解析<script setup lang="tsx">的组件, 会解析为虚拟请求(?vue), 导致解析链断掉
 * 继续使用bundle:false, 需要直接解析tsx文件
 */
type Slots = {
  default: () => VNode
  icon: (props: SpinRenderProps) => VNode | null | undefined
}
export default defineComponent({
  name: 'SpinProvider',
  slots: Object as SlotsType<Slots>,
  setup(_, { slots }) {
    function renderIcon(props: SpinRenderProps) {
      const icon = slots?.icon?.(props)
      const crafts = computed(() => props.theme?.crafts?.tvSpin?.())
      if (icon) {
        return (
          <ark.span
            class={crafts.value?.icon({
              class: props.class,
              ...props.theme,
            })}
            as-child
            data-variant="custom"
          >
            {icon}
          </ark.span>
        )
      }
      return (
        <LoaderCircle
          class={crafts.value?.icon({
            class: ['animate-spin', props.class],
            ...props.theme,
          })}
          data-variant="default"
        />
      )
    }
    provide('SpinProvider', { renderIcon })

    // render
    return () => slots.default?.()
  },
})
