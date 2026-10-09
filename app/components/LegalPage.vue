<script setup>
defineProps({
  eyebrow: { type: String, required: true },
  title: { type: String, required: true },
  accent: { type: String, required: true },
  sections: { type: Array, required: true },
  lastUpdated: { type: String, required: true },
})
</script>

<template>
  <main class="legal-page wrap">
    <p class="eyebrow">LEGAL / {{ eyebrow }}</p>
    <h1>{{ title }} <span class="serif-accent">{{ accent }}</span></h1>
    <p class="legal-updated">Last updated: {{ lastUpdated }}</p>
    <nav v-if="sections.length > 4" class="legal-index" aria-label="Page contents">
      <a v-for="section in sections" :key="section.id" :href="`#${section.id}`">{{ section.title }}</a>
    </nav>
    <article class="legal-content"><slot /></article>
    <NuxtLink class="legal-back" :to="{ path: '/', hash: '#home' }">← Back to home</NuxtLink>
  </main>
</template>