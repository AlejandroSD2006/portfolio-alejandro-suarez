<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { prefersReducedMotion } from '../../composables/useMotion.js'

const props = defineProps({ phrases: { type: Array, required: true } })
const text = ref('')
let timer
let phraseIndex = 0
let deleting = false

function step() {
  const phrase = props.phrases[phraseIndex] ?? ''
  text.value = deleting ? phrase.slice(0, text.value.length - 1) : phrase.slice(0, text.value.length + 1)
  let delay = deleting ? 38 : 68
  if (!deleting && text.value === phrase) {
    deleting = true
    delay = 1450
  } else if (deleting && text.value === '') {
    deleting = false
    phraseIndex = (phraseIndex + 1) % props.phrases.length
    delay = 280
  }
  timer = window.setTimeout(step, delay)
}

onMounted(() => {
  if (prefersReducedMotion()) {
    text.value = props.phrases[0] ?? ''
    return
  }
  timer = window.setTimeout(step, 350)
})
onBeforeUnmount(() => window.clearTimeout(timer))
</script>

<template>
  <span class="typewriter">
    <span class="sr-only">{{ phrases.join(', ') }}</span>
    <span aria-hidden="true" class="typewriter-visible">{{ text }}</span>
  </span>
</template>

<style scoped>
.typewriter-visible { border-right: 1px solid currentColor; padding-right: 3px; animation: cursor-blink .8s steps(1) infinite; }
@keyframes cursor-blink { 50% { border-color: transparent; } }
@media (prefers-reduced-motion: reduce) { .typewriter-visible { border: 0; animation: none; } }
</style>
