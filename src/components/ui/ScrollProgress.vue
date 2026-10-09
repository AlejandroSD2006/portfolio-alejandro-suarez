<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'

const progress = ref(0)
let frame = 0
function update() {
  frame = 0
  const scrollable = document.documentElement.scrollHeight - window.innerHeight
  progress.value = scrollable > 0 ? window.scrollY / scrollable : 0
}
function onScroll() {
  if (!frame) frame = requestAnimationFrame(update)
}
onMounted(() => {
  update()
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', onScroll, { passive: true })
})
onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('resize', onScroll)
  if (frame) cancelAnimationFrame(frame)
})
</script>

<template><div class="scroll-progress" aria-hidden="true"><span :style="{ transform: `scaleX(${progress})` }"></span></div></template>

<style scoped>
.scroll-progress { position: fixed; z-index: 20; top: 0; left: 0; right: 0; height: 2px; pointer-events: none; }
.scroll-progress span { display: block; width: 100%; height: 100%; position: relative; transform-origin: left; background: var(--green); }
.scroll-progress span::after { content: ''; position: absolute; right: 0; top: -1px; width: 4px; height: 4px; border-radius: 50%; background: var(--lime); }
</style>
