<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { prefersReducedMotion } from '../../composables/useMotion.js'

const props = defineProps({
  to: { type: Number, required: true },
  suffix: { type: String, default: '' },
  duration: { type: Number, default: 1400 },
})
const element = ref(null)
const value = ref(0)
let observer
let frame = 0

function start() {
  if (prefersReducedMotion()) {
    value.value = props.to
    return
  }
  const startedAt = performance.now()
  const tick = (now) => {
    const progress = Math.min((now - startedAt) / props.duration, 1)
    value.value = Math.round(props.to * (1 - (1 - progress) ** 3))
    if (progress < 1) frame = requestAnimationFrame(tick)
  }
  frame = requestAnimationFrame(tick)
}

onMounted(() => {
  if (prefersReducedMotion() || !('IntersectionObserver' in window)) {
    start()
    return
  }
  observer = new IntersectionObserver(([entry]) => {
    if (!entry.isIntersecting) return
    start()
    observer.disconnect()
  }, { threshold: .35 })
  observer.observe(element.value)
})
onBeforeUnmount(() => {
  observer?.disconnect()
  if (frame) cancelAnimationFrame(frame)
})
</script>

<template><span ref="element">{{ value }}{{ suffix }}</span></template>
