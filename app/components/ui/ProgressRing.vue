<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { prefersReducedMotion } from '../../composables/useMotion.js'

const props = defineProps({ value: { type: Number, required: true } })
const element = ref(null)
const progress = ref(0)
let observer

function reveal() {
  progress.value = Math.min(100, Math.max(0, props.value))
}

onMounted(() => {
  if (prefersReducedMotion() || !('IntersectionObserver' in window)) {
    reveal()
    return
  }
  observer = new IntersectionObserver(([entry]) => {
    if (!entry.isIntersecting) return
    reveal()
    observer.disconnect()
  }, { threshold: .35 })
  observer.observe(element.value)
})
onBeforeUnmount(() => observer?.disconnect())
</script>

<template>
  <div ref="element" class="progress-ring" :style="{ '--progress': progress }">
    <svg viewBox="0 0 100 100" aria-hidden="true">
      <circle class="ring-track" cx="50" cy="50" r="42" />
      <circle class="ring-value" cx="50" cy="50" r="42" :style="{ strokeDashoffset: 264 - 264 * progress / 100 }" />
    </svg>
    <div class="ring-content"><slot /></div>
  </div>
</template>

<style scoped>
.progress-ring { width: min(56%, 245px); aspect-ratio: 1; position: relative; color: currentColor; }
.progress-ring svg { display: block; width: 100%; height: 100%; transform: rotate(-90deg); }
.progress-ring circle { fill: none; stroke-width: 1.25; }
.ring-track { stroke: currentColor; opacity: .2; }
.ring-value { stroke: currentColor; stroke-linecap: round; stroke-dasharray: 264; transition: stroke-dashoffset 1.2s var(--ease); }
.ring-content { position: absolute; inset: 0; display: grid; place-items: center; }
</style>
