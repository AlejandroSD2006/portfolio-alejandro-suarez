import { onBeforeUnmount, onMounted, ref } from 'vue'

export function useScrollSpy(ids) {
  const activeId = ref(ids[0] ?? '')
  let observer

  onMounted(() => {
    if (!('IntersectionObserver' in window)) return
    const sections = ids.map((id) => document.getElementById(id)).filter(Boolean)
    observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting)
      if (!visible.length) return
      visible.sort((a, b) => Math.abs(a.boundingClientRect.top - window.innerHeight / 2)
        - Math.abs(b.boundingClientRect.top - window.innerHeight / 2))
      activeId.value = visible[0].target.id
    }, { rootMargin: '-40% 0px -55% 0px' })
    sections.forEach((section) => observer.observe(section))
  })

  onBeforeUnmount(() => observer?.disconnect())
  return activeId
}
