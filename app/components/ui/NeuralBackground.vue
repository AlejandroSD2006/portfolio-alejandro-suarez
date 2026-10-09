<script setup>
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { prefersReducedMotion } from '../../composables/useMotion.js'
import { useAppReady } from '../../composables/useAppReady.js'

const canvas = ref(null)
const ready = useAppReady()
let resizeObserver
let intersectionObserver
let parent
let context
let frame = 0
let visible = true
let reduced = false
let nodes = []
let width = 0
let height = 0
let pixelRatio = 1
let pointer = null

function createNodes() {
  let count = Math.max(28, Math.min(70, Math.round(width * height / 14000)))
  if (width < 620) count = Math.max(18, Math.round(count * .65))
  nodes = Array.from({ length: count }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - .5) * .24,
    vy: (Math.random() - .5) * .24,
  }))
}

function resize() {
  const bounds = canvas.value.getBoundingClientRect()
  width = bounds.width
  height = bounds.height
  if (!width || !height) return
  pixelRatio = Math.min(window.devicePixelRatio || 1, 2)
  canvas.value.width = Math.round(width * pixelRatio)
  canvas.value.height = Math.round(height * pixelRatio)
  context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)
  createNodes()
  if (reduced) draw(false)
  else if (ready.value) start()
}

function draw(moveNodes = true) {
  if (!context || !width || !height) return
  context.clearRect(0, 0, width, height)
  for (const node of nodes) {
    if (moveNodes) {
      node.x += node.vx
      node.y += node.vy
      if (node.x < 0 || node.x > width) node.vx *= -1
      if (node.y < 0 || node.y > height) node.vy *= -1
      node.x = Math.max(0, Math.min(width, node.x))
      node.y = Math.max(0, Math.min(height, node.y))
      if (pointer) {
        const dx = node.x - pointer.x
        const dy = node.y - pointer.y
        const distance = Math.hypot(dx, dy)
        if (distance > 0 && distance < 105) {
          const force = (105 - distance) / 105 * .008
          node.vx += dx / distance * force
          node.vy += dy / distance * force
          node.vx *= .995
          node.vy *= .995
        }
      }
    }
  }
  for (let first = 0; first < nodes.length; first += 1) {
    for (let second = first + 1; second < nodes.length; second += 1) {
      const distance = Math.hypot(nodes[first].x - nodes[second].x, nodes[first].y - nodes[second].y)
      if (distance >= 120) continue
      context.strokeStyle = `rgba(255,255,255,${.18 * (1 - distance / 120)})`
      context.lineWidth = 1
      context.beginPath()
      context.moveTo(nodes[first].x, nodes[first].y)
      context.lineTo(nodes[second].x, nodes[second].y)
      context.stroke()
    }
  }
  context.fillStyle = 'rgba(212,229,118,.85)'
  for (const node of nodes) {
    context.beginPath()
    context.arc(node.x, node.y, 1.7, 0, Math.PI * 2)
    context.fill()
  }
}

function animate() {
  frame = 0
  if (!visible || document.hidden || reduced) return
  draw()
  frame = requestAnimationFrame(animate)
}
function start() {
  if (!visible || document.hidden || reduced || frame) return
  frame = requestAnimationFrame(animate)
}
function stop() {
  if (frame) cancelAnimationFrame(frame)
  frame = 0
}
function updateVisibility() {
  if (ready.value && visible && !document.hidden && !reduced) start()
  else stop()
}
function onPointerMove(event) {
  const bounds = canvas.value.getBoundingClientRect()
  pointer = { x: event.clientX - bounds.left, y: event.clientY - bounds.top }
}
function onPointerLeave() { pointer = null }

onMounted(() => {
  context = canvas.value.getContext('2d')
  if (!context) return
  watch(ready, updateVisibility, { immediate: true })
  reduced = prefersReducedMotion()
  parent = canvas.value.parentElement
  resizeObserver = new ResizeObserver(resize)
  resizeObserver.observe(parent)
  intersectionObserver = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting
    updateVisibility()
  })
  intersectionObserver.observe(canvas.value)
  document.addEventListener('visibilitychange', updateVisibility)
  if (!reduced) {
    parent.addEventListener('pointermove', onPointerMove, { passive: true })
    parent.addEventListener('pointerleave', onPointerLeave)
  }
})
onBeforeUnmount(() => {
  stop()
  resizeObserver?.disconnect()
  intersectionObserver?.disconnect()
  document.removeEventListener('visibilitychange', updateVisibility)
  parent?.removeEventListener('pointermove', onPointerMove)
  parent?.removeEventListener('pointerleave', onPointerLeave)
})
</script>

<template><canvas ref="canvas" class="neural-background" aria-hidden="true"></canvas></template>

<style scoped>
.neural-background { position: absolute; z-index: 1; inset: 0; width: 100%; height: 100%; pointer-events: none; }
</style>
