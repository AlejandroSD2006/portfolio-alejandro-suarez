<script setup>
import { computed } from 'vue'

const props = defineProps({
  icon: { type: Object, required: true },
})

const brand = computed(() => props.icon.kind === 'brand' ? `#${props.icon.data.hex}` : 'currentColor')
</script>

<template>
  <span class="skill-icon" :style="{ '--brand': brand }">
    <svg v-if="icon.kind === 'brand'" viewBox="0 0 24 24" role="img" :aria-label="icon.data.title" focusable="false">
      <path :d="icon.data.path" fill="currentColor" />
    </svg>
    <span v-else-if="icon.kind === 'multi'" class="skill-icon-multi">
      <svg v-for="item in icon.items" :key="item.title" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path :d="item.path" fill="currentColor" /></svg>
    </span>
    <component :is="icon.component" v-else :size="28" :stroke-width="1.7" aria-hidden="true" />
  </span>
</template>

<style scoped>
.skill-icon { color: var(--ink); display: grid; place-items: center; width: 100%; height: 100%; transition: color .2s var(--ease); }
.skill-icon > svg, .skill-icon-multi svg { width: 28px; height: 28px; }
.skill-icon-multi { display: flex; align-items: center; gap: 3px; }
.skill-icon-multi svg { width: 20px; height: 20px; }
</style>
