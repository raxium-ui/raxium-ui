import type { DirectiveBinding } from 'vue'

interface ElementExband extends Element {
  __aria_keydown__?: (event: KeyboardEvent) => void
}

function apply(el: ElementExband, binding: DirectiveBinding) {
  if (!binding.value || !el)
    return
  const { index = 0, action, role, pt, ...rest } = binding.value

  let targetEl: ElementExband = el
  if (pt && typeof pt === 'string') {
    targetEl = (el.querySelector(pt) as ElementExband) || el
  }
  else if (pt) {
    // 兼容旧行为：未提供 selector 时，尽量命中可聚焦元素
    targetEl = (el.querySelector('[tabindex]') as ElementExband) || el
  }

  targetEl.setAttribute('tabindex', binding.arg ?? index)
  if (role)
    targetEl.setAttribute('role', role)

  if (action) {
    targetEl.__aria_keydown__ = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        event.preventDefault()
        binding.modifiers.stop && event.stopPropagation()
        action(event)
      }
    }
    targetEl.addEventListener('keydown', targetEl.__aria_keydown__ as any)
  }

  for (const key in rest) {
    if (key.startsWith('aria-')) {
      targetEl.setAttribute(key, rest[key])
    }
    else {
      targetEl.setAttribute(`aria-${key}`, rest[key])
    }
  }
}

function cleanup(el: ElementExband) {
  if (el && el.__aria_keydown__) {
    el.removeEventListener('keydown', el.__aria_keydown__ as any)
    delete el.__aria_keydown__
  }
}

const vAria = {
  // Vue 3 hooks
  mounted(el: ElementExband, binding: DirectiveBinding) {
    apply(el, binding)
  },
  updated(el: ElementExband, binding: DirectiveBinding) {
    cleanup(el)
    apply(el, binding)
  },
  unmounted(el: ElementExband) {
    cleanup(el)
  },

  // Vue 2 compat hooks (保留以兼容旧用法)
  inserted(el: ElementExband, binding: DirectiveBinding) {
    apply(el, binding)
  },
  update(el: ElementExband, binding: DirectiveBinding) {
    cleanup(el)
    apply(el, binding)
  },
  unbind(el: ElementExband) {
    cleanup(el)
  },
}

export { vAria }
