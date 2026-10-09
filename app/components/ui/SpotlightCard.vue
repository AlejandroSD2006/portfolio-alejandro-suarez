<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { canHover } from '../../composables/useMotion.js'

const card = ref(null)
let frame = 0
let pendingEvent

function update() {
  const bounds = card.value.getBoundingClientRect()
  const x = (pendingEvent.clientX - bounds.left) / bounds.width
  const y = (pendingEvent.clientY - bounds.top) / bounds.height
  const rotateY = (x - .5) * 12
  const rotateX = (.5 - y) * 12
  card.value.style.setProperty('--mx', `${x * 100}%`)
  card.value.style.setProperty('--my', `${y * 100}%`)
  card.value.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
  frame = 0
}
function onPointerMove(event) {
  if (event.pointerType !== 'mouse') return
  pendingEvent = event
  if (!frame) frame = requestAnimationFrame(update)
}
function reset() {
  if (frame) cancelAnimationFrame(frame)
  frame = 0
  card.value.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg)'
}

onMounted(() => {
  if (!canHover()) return
  card.value.addEventListener('pointermove', onPointerMove)
  card.value.addEventListener('pointerleave', reset)
})
onBeforeUnmount(() => {
  if (card.value) {
    card.value.removeEventListener('pointermove', onPointerMove)
    card.value.removeEventListener('pointerleave', reset)
  }
  if (frame) cancelAnimationFrame(frame)
})
</script>

<template><div ref="card" class="spotlight-card"><slot /></div></template>

<style scoped>
.spotlight-card { position: relative; transform-style: preserve-3d; transition: transform .35s var(--ease); }
.spotlight-card::before { content: ''; position: absolute; z-index: 1; inset: 0; border-radius: inherit; pointer-events: none; opacity: 0; background: radial-gradient(240px circle at var(--mx, 50%) var(--my, 50%), var(--lime-soft), transparent 72%); transition: opacity .2s; }
.spotlight-card:hover::before { opacity: 1; }
</style>
