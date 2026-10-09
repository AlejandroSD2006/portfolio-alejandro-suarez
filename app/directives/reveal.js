import { prefersReducedMotion } from '../composables/useMotion.js'

let direction = 'down'
let previousY = 0
let activeElements = 0

function updateDirection() {
  const currentY = window.scrollY
  if (currentY !== previousY) direction = currentY > previousY ? 'down' : 'up'
  previousY = currentY
}

function startDirectionTracking() {
  if (activeElements++ === 0) {
    previousY = window.scrollY
    window.addEventListener('scroll', updateDirection, { passive: true })
  }
}

function stopDirectionTracking() {
  activeElements = Math.max(0, activeElements - 1)
  if (activeElements === 0) window.removeEventListener('scroll', updateDirection)
}

export const reveal = {
  getSSRProps: () => ({}),
  mounted(element, binding) {
    if (prefersReducedMotion() || !('IntersectionObserver' in window)) return

    const observe = () => {
      if (!element.isConnected) return
      const observer = new IntersectionObserver(([entry]) => {
        if (!entry.isIntersecting) {
          element.classList.remove('is-visible')
          return
        }
        element.dataset.dir = direction
        void element.offsetWidth
        requestAnimationFrame(() => element.classList.add('is-visible'))
      }, { threshold: .12, rootMargin: '0px 0px -6% 0px' })
      element.__revealObserver = observer
      observer.observe(element)
      element.__revealReadyCleanup = undefined
    }
    element.classList.add('reveal')
    for (const modifier of ['fade', 'left', 'right', 'zoom']) {
      if (binding.modifiers[modifier]) element.classList.add(`reveal-${modifier}`)
    }
    element.style.setProperty('--reveal-delay', `${binding.value?.delay ?? 0}ms`)
    startDirectionTracking()
    element.__revealDirectionCleanup = stopDirectionTracking
    if (document.documentElement.dataset.ready === 'true') observe()
    else {
      window.addEventListener('app:ready', observe, { once: true })
      element.__revealReadyCleanup = () => window.removeEventListener('app:ready', observe)
    }
  },
  unmounted(element) {
    element.__revealObserver?.disconnect()
    element.__revealReadyCleanup?.()
    element.__revealDirectionCleanup?.()
    delete element.__revealObserver
    delete element.__revealReadyCleanup
    delete element.__revealDirectionCleanup
  },
}
