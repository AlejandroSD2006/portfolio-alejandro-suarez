<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'

const preloaderDone = useState('preloaderDone', () => false)
const heroImageLoaded = useState('heroImageLoaded', () => false)
const progress = ref(0)
const target = ref(0)
const entered = ref(false)
const exiting = ref(false)
const visible = ref(!preloaderDone.value)
const digits = computed(() => String(Math.floor(progress.value)).padStart(3, '0'))
const firstName = Array.from('ALEJANDRO')
const lastName = Array.from('Suárez Durán')
const fontsLoaded = ref(false)
const heroLoaded = ref(heroImageLoaded.value)
const pageLoaded = ref(false)

useHead({
  htmlAttrs: { class: 'is-loading' },
  noscript: [{ innerHTML: '<style>.preloader,.cookie-banner{display:none!important}html.is-loading{overflow:auto!important}</style>' }],
})

let frame = 0
let heroTimeout
let startedAt = 0

function animateProgress() {
  frame = 0
  progress.value += (target.value - progress.value) * .12
  if (Math.abs(target.value - progress.value) < .1) progress.value = target.value
  else frame = requestAnimationFrame(animateProgress)
}

function markTaskComplete(completed) {
  completed.value = true
  target.value = [fontsLoaded.value, heroLoaded.value, pageLoaded.value].filter(Boolean).length / 3 * 100
  if (!frame) frame = requestAnimationFrame(animateProgress)
}

function waitForHero() {
  return new Promise((resolve) => {
    if (heroImageLoaded.value) {
      resolve()
      return
    }
    const stop = watch(heroImageLoaded, (loaded) => {
      if (!loaded) return
      stop()
      clearTimeout(heroTimeout)
      resolve()
    })
    heroTimeout = window.setTimeout(() => {
      stop()
      resolve()
    }, 4000)
  })
}

function waitForPageLoad() {
  if (document.readyState === 'complete') return Promise.resolve()
  return new Promise((resolve) => window.addEventListener('load', resolve, { once: true }))
}

function delay(milliseconds) {
  return new Promise((resolve) => window.setTimeout(resolve, milliseconds))
}

async function finish() {
  const tasks = [
    (document.fonts?.ready ?? Promise.resolve()).then(() => markTaskComplete(fontsLoaded)),
    waitForHero().then(() => markTaskComplete(heroLoaded)),
    waitForPageLoad().then(() => markTaskComplete(pageLoaded)),
  ]
  await Promise.race([Promise.all(tasks), delay(6000)])
  await delay(Math.max(0, 1600 - (performance.now() - startedAt)))
  target.value = 100
  progress.value = 100
  exiting.value = true
  await delay(matchMedia('(prefers-reduced-motion: reduce)').matches ? 220 : 820)
  document.documentElement.classList.remove('is-loading')
  document.documentElement.dataset.ready = 'true'
  window.dispatchEvent(new Event('app:ready'))
  preloaderDone.value = true
  visible.value = false
}

onMounted(() => {
  startedAt = performance.now()
  requestAnimationFrame(() => { entered.value = true })
  finish()
})

onBeforeUnmount(() => {
  if (frame) cancelAnimationFrame(frame)
  clearTimeout(heroTimeout)
})
</script>

<template>
  <div v-if="visible" class="preloader" :class="{ 'is-entered': entered, 'is-exiting': exiting }" role="status" aria-live="polite">
    <span class="sr-only">Loading Alejandro Suárez Durán's portfolio</span>
    <div class="preloader-meta"><span>PORTFOLIO — 2026</span><span>CLOUD · SYSTEMS · DATA</span></div>
    <div class="preloader-center">
      <div class="preloader-mark" aria-hidden="true">
        <svg viewBox="0 0 64 64"><circle cx="32" cy="32" r="30" /></svg>
        <span>AS</span>
      </div>
      <div class="preloader-name" aria-hidden="true">
        <div class="preloader-name-line"><span v-for="(letter, index) in firstName" :key="`first-${index}`" :style="{ '--i': index }">{{ letter }}</span></div>
        <div class="preloader-name-line serif-accent"><span v-for="(letter, index) in lastName" :key="`last-${index}`" :style="{ '--i': index + firstName.length }">{{ letter === ' ' ? '\u00a0' : letter }}</span></div>
      </div>
    </div>
    <div class="preloader-progress"><span class="preloader-bar"><i :style="{ transform: `scaleX(${progress / 100})` }"></i></span><span>{{ digits }} <span aria-hidden="true">→</span> 100</span></div>
  </div>
</template>