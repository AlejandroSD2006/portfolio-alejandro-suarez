<!-- Borrador generado con IA: el titular debe revisarlo (idealmente con un profesional legal) antes de publicar. -->
<script setup>
import { legal } from '~/data/legal.js'
import { consentCategories, consentItems } from '~/data/consent.js'
import { useConsent } from '~/composables/useConsent.js'

const { openPreferences } = useConsent()

const sections = [
  { id: 'storage', title: 'Cookies and local storage' },
  { id: 'items', title: 'Storage used by this website' },
  { id: 'categories', title: 'Categories' },
  { id: 'choices', title: 'Changing your choice' },
  { id: 'third-parties', title: 'Third-party cookies' },
  { id: 'updates', title: 'Updates' },
]

useSeoMeta({ title: 'Cookie Policy', description: 'Storage used by this portfolio and how to manage cookie consent.' })
</script>

<template>
  <LegalPage eyebrow="COOKIES" title="Cookie" accent="Policy" :sections="sections" :last-updated="legal.lastUpdated">
    <section id="storage"><h2>Cookies and local storage</h2><p>Cookies are small files stored by a website in your browser. Local storage is a separate browser feature that lets a website retain a small amount of information on your device.</p></section>
    <section id="items"><h2>Storage used by this website</h2><div class="legal-table-wrap"><table class="legal-table"><thead><tr><th>Name</th><th>Type</th><th>Purpose</th><th>Category</th><th>Duration</th></tr></thead><tbody><tr v-for="item in consentItems" :key="item.name"><td>{{ item.name }}</td><td>{{ item.type }}</td><td>{{ item.purpose }}</td><td>{{ item.category }}</td><td>{{ item.duration }}</td></tr></tbody></table></div></section>
    <section id="categories"><h2>Categories</h2><p v-for="category in consentCategories" :key="category.id"><strong>{{ category.label }}:</strong> {{ category.description }}</p><p>Analytics, if configured in the future, is off by default and only enabled with your permission. Confirm whether an analytics tool will be used and identify it: <mark class="todo">[TO BE COMPLETED]</mark></p></section>
    <section id="choices"><h2>Changing your choice</h2><p>Use <button class="legal-inline-button" type="button" @click="openPreferences">Cookie settings</button> in the footer to change or withdraw your choice at any time. You can also delete this website’s local storage in your browser settings.</p></section>
    <section id="third-parties"><h2>Third-party cookies</h2><p>This website currently does not load third-party cookies.</p></section>
    <section id="updates"><h2>Updates</h2><p>This policy may be updated if the website’s storage changes. Please check this page for the latest information.</p></section>
  </LegalPage>
</template>