<script setup>
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { prefersReducedMotion } from '../../composables/useMotion.js'
import { useAppReady } from '../../composables/useAppReady.js'

const props = defineProps({
  to: { type: Number, required: true },
  suffix: { type: String, default: '' },
  duration: { type: Number, default: 1400 },
})
const element = ref(null)
const value = ref(props.to)
const ready = useAppReady()
let observer
let frame = 0
let intersected = false

function start() {
  if (prefersReducedMotion()) {
    value.value = props.to
    return
  }
  value.value = 0
  const startedAt = performance.now()
  const tick = (now) => {
    const progress = Math.min((now - startedAt) / props.duration, 1)
    value.value = Math.round(props.to * (1 - (1 - progress) ** 3))
    if (progress < 1) frame = requestAnimationFrame(tick)
  }
  frame = requestAnimationFrame(tick)
}

onMounted(() => {
  const reduced = prefersReducedMotion()
  const maybeStart = () => {
    if (!ready.value || (!intersected && !reduced)) return
    start()
  }
  watch(ready, maybeStart)
  if (reduced || !('IntersectionObserver' in window)) {
    intersected = true
    maybeStart()
  } else {
    observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      intersected = true
      maybeStart()
      observer.disconnect()
    }, { threshold: .35 })
    observer.observe(element.value)
  }
})
onBeforeUnmount(() => {
  observer?.disconnect()
  if (frame) cancelAnimationFrame(frame)
})
</script>

<template><span ref="element">{{ value }}{{ suffix }}</span></template>
