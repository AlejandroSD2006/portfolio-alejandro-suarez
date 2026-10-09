import { canHover } from '../composables/useMotion.js'

export const magnetic = {
  getSSRProps: () => ({}),
  mounted(element) {
    if (!canHover()) return

    let frame = 0
    let pointerEvent
    const move = (event) => {
      pointerEvent = event
      if (frame) return
      frame = requestAnimationFrame(() => {
        const bounds = element.getBoundingClientRect()
        const offsetX = ((pointerEvent.clientX - bounds.left) / bounds.width - .5) * 16
        const offsetY = ((pointerEvent.clientY - bounds.top) / bounds.height - .5) * 16
        element.style.transform = `translate(${offsetX}px, ${offsetY}px)`
        frame = 0
      })
    }
    const leave = () => {
      if (frame) cancelAnimationFrame(frame)
      frame = 0
      element.style.transform = 'translate(0, 0)'
    }

    element.style.transition = 'transform .3s var(--ease)'
    element.addEventListener('pointermove', move)
    element.addEventListener('pointerleave', leave)
    element.__magneticCleanup = () => {
      element.removeEventListener('pointermove', move)
      element.removeEventListener('pointerleave', leave)
      if (frame) cancelAnimationFrame(frame)
    }
  },
  unmounted(element) {
    element.__magneticCleanup?.()
    delete element.__magneticCleanup
  },
}
