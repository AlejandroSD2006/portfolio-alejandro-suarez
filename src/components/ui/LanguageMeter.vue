<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { prefersReducedMotion } from '../../composables/useMotion.js'

const element = ref(null)
const visible = ref(false)
let observer
const languages = [
  { name: 'Spanish', level: 'Native', score: 6 },
  { name: 'English', level: 'B2', score: 4 },
]
onMounted(() => {
  if (prefersReducedMotion() || !('IntersectionObserver' in window)) {
    visible.value = true
    return
  }
  observer = new IntersectionObserver(([entry]) => {
    if (!entry.isIntersecting) return
    visible.value = true
    observer.disconnect()
  }, { threshold: .25 })
  observer.observe(element.value)
})
onBeforeUnmount(() => observer?.disconnect())
</script>

<template>
  <div ref="element" class="language-meter" :class="{ 'is-visible': visible }">
    <div v-for="language in languages" :key="language.name" class="language-row" role="meter" :aria-label="`${language.name}: ${language.level}`" :aria-valuemin="0" :aria-valuemax="6" :aria-valuenow="language.score">
      <div class="language-label"><strong>{{ language.name }}</strong><span>{{ language.level }}</span></div>
      <div class="language-segments" aria-hidden="true">
        <span v-for="segment in 6" :key="segment" :class="{ filled: segment <= language.score }" :style="{ '--segment-index': segment - 1 }"></span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.language-meter { display: grid; gap: 15px; }
.language-row { display: grid; grid-template-columns: 1fr auto; align-items: center; gap: 12px; }
.language-label { display: flex; align-items: baseline; justify-content: space-between; gap: 10px; grid-column: 1 / -1; font-size: 11px; }
.language-label strong { font-weight: 600; }
.language-label span { color: var(--muted); font: 9px var(--mono); }
.language-segments { display: grid; grid-template-columns: repeat(6, 1fr); gap: 5px; grid-column: 1 / -1; }
.language-segments span { height: 5px; background: var(--line); transform: scaleX(.45); transform-origin: left; opacity: .5; transition: transform .35s var(--ease), opacity .3s ease, background-color .3s; transition-delay: calc(var(--segment-index) * 70ms); }
.language-segments span.filled { background: var(--green); }
.is-visible .language-segments span { transform: scaleX(1); opacity: 1; }
</style>
