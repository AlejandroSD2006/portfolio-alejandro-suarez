import { onBeforeUnmount, onMounted, ref } from 'vue'

export function useAppReady() {
  const ready = ref(false)
  const onReady = () => { ready.value = true }

  onMounted(() => {
    if (document.documentElement.dataset.ready === 'true') {
      ready.value = true
      return
    }
    window.addEventListener('app:ready', onReady, { once: true })
  })

  onBeforeUnmount(() => {
    if (import.meta.client) window.removeEventListener('app:ready', onReady)
  })
  return ready
}