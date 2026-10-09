<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { prefersReducedMotion } from '../composables/useMotion.js'
import { education } from '../data/education.js'

const element = ref(null)
const visible = ref(false)
let observer
onMounted(() => {
  if (prefersReducedMotion() || !('IntersectionObserver' in window)) {
    visible.value = true
    return
  }
  observer = new IntersectionObserver(([entry]) => {
    if (!entry.isIntersecting) return
    visible.value = true
    observer.disconnect()
  }, { threshold: .2 })
  observer.observe(element.value)
})
onBeforeUnmount(() => observer?.disconnect())
</script>

<template>
  <ol ref="element" class="education-timeline" :class="{ 'is-visible': visible }">
    <li v-for="(item, index) in education" :key="item.title" v-reveal="{ delay: index * 100 }" :class="{ 'is-current': item.current }">
      <span class="timeline-point" aria-hidden="true"></span>
      <strong>{{ item.title }}</strong>
      <span v-if="item.current" class="timeline-detail"><span class="timeline-period">{{ item.period }}</span> · {{ item.detail }}</span>
      <span v-else class="timeline-detail">{{ item.detail }} · <span class="timeline-period">{{ item.period }}</span></span>
    </li>
  </ol>
</template>

<style scoped>
.education-timeline { list-style: none; display: grid; gap: 22px; position: relative; margin: 0; padding: 0 0 0 18px; }
.education-timeline::before { content: ''; position: absolute; top: 5px; bottom: 5px; left: 3px; width: 1px; background: var(--line); transform: scaleY(0); transform-origin: top; transition: transform .75s var(--ease); }
.education-timeline.is-visible::before { transform: scaleY(1); }
.education-timeline li { display: grid; gap: 4px; position: relative; }
.timeline-point { position: absolute; left: -19px; top: 4px; width: 9px; height: 9px; border: 1px solid var(--green); border-radius: 50%; background: var(--paper); }
.is-current .timeline-point { border-color: var(--lime); background: var(--lime); box-shadow: 0 0 0 0 var(--lime-soft); animation: timeline-pulse 2.2s ease-out infinite; }
.timeline-period { color: var(--muted); font: 9px var(--mono); }
.education-timeline strong { font-size: 12px; font-weight: 600; }
.timeline-detail { color: var(--muted); font-size: 10px; line-height: 1.6; }
@keyframes timeline-pulse { 70%, 100% { box-shadow: 0 0 0 6px transparent; } }
@media (prefers-reduced-motion: reduce) { .is-current .timeline-point { animation: none; } }
</style>
