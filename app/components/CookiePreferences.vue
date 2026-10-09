<script setup>
import { nextTick, onBeforeUnmount, ref, watch } from 'vue'
import { X } from 'lucide-vue-next'
import { consentCategories } from '~/data/consent.js'
import { useConsent } from '~/composables/useConsent.js'

const { consent, preferencesOpen, save, rejectAll, acceptAll } = useConsent()
const dialog = ref(null)
const closeButton = ref(null)
const analyticsAllowed = ref(false)
let previousFocus

watch(preferencesOpen, async (isOpen) => {
  if (typeof document === 'undefined') return
  if (isOpen) {
    previousFocus = document.activeElement
    analyticsAllowed.value = consent.value?.categories?.analytics === true
    await nextTick()
    closeButton.value?.focus()
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
    await nextTick()
    previousFocus?.focus?.()
  }
})

function close() {
  preferencesOpen.value = false
}

function saveChoices() {
  save({ necessary: true, analytics: analyticsAllowed.value })
}

function trapFocus(event) {
  if (event.key === 'Escape') {
    close()
    return
  }
  if (event.key !== 'Tab' || !dialog.value) return
  const focusable = [...dialog.value.querySelectorAll('button:not(:disabled), input:not(:disabled), a[href]')]
  if (!focusable.length) return
  const first = focusable[0]
  const last = focusable[focusable.length - 1]
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault()
    last.focus()
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault()
    first.focus()
  }
}

onBeforeUnmount(() => {
  if (import.meta.client) document.body.style.overflow = ''
})
</script>

<template>
  <Teleport to="body">
    <div v-if="preferencesOpen" class="cookie-modal-backdrop" @click.self="close">
      <section ref="dialog" class="cookie-preferences" role="dialog" aria-labelledby="cookie-preferences-title" aria-modal="true" tabindex="-1" @keydown="trapFocus">
        <div class="cookie-preferences-heading">
          <div><p class="eyebrow">COOKIE SETTINGS</p><h2 id="cookie-preferences-title">Your preferences</h2></div>
          <button ref="closeButton" class="icon-button" type="button" aria-label="Close cookie settings" @click="close"><X :size="18" /></button>
        </div>
        <div class="consent-category-list">
          <label v-for="category in consentCategories" :key="category.id" class="consent-category">
            <span class="consent-category-copy"><strong>{{ category.label }}</strong><small>{{ category.description }}</small></span>
            <input v-if="category.required" type="checkbox" checked disabled aria-label="Strictly necessary, always active" />
            <input v-else v-model="analyticsAllowed" type="checkbox" :aria-label="`${category.label} cookies`" />
          </label>
        </div>
        <div class="cookie-actions cookie-modal-actions">
          <button type="button" class="cookie-choice-button" @click="saveChoices">Save preferences</button>
          <button type="button" class="cookie-choice-button" @click="rejectAll">Reject all</button>
          <button type="button" class="cookie-choice-button" @click="acceptAll">Accept all</button>
        </div>
      </section>
    </div>
  </Teleport>
</template>