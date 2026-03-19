/**
 * Message is a special toast, it pin position at the top center of the screen. and with icon and description.
 */
export { default as Message } from './Message.vue'
export { default as Messager } from './Messager.vue'
export * from './props'
export { useMessage } from './use-message'
export {
  ToastActionTrigger as MessageActionTrigger,
  ToastCloseTrigger as MessageCloseTrigger,
  ToastDescription as MessageDescription,
} from '@ark-ui/vue/toast'
