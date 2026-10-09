import { prefersReducedMotion } from '../composables/useMotion.js'

export const reveal = {
  mounted(element, binding) {
    if (prefersReducedMotion() || !('IntersectionObserver' in window)) return

    element.style.opacity = '0'
    element.style.transform = 'translateY(24px)'
    element.style.transition = 'opacity .65s var(--ease), transform .65s var(--ease)'
    element.style.transitionDelay = `${binding.value?.delay ?? 0}ms`

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      element.style.opacity = '1'
      element.style.transform = 'translateY(0)'
      observer.disconnect()
    }, { threshold: .15 })

    element.__revealObserver = observer
    observer.observe(element)
  },
  unmounted(element) {
    element.__revealObserver?.disconnect()
    delete element.__revealObserver
  },
}
