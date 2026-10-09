<script setup>
import { onBeforeUnmount, ref, watch } from 'vue'
import { useAppReady } from '~/composables/useAppReady.js'
import { useConsent } from '~/composables/useConsent.js'

const ready = useAppReady()
const { initialized, hasDecided, acceptAll, rejectAll, openPreferences } = useConsent()
const visible = ref(false)
let timer

watch([ready, initialized, hasDecided], ([isReady, isInitialized, decided]) => {
  clearTimeout(timer)
  if (!isReady || !isInitialized || decided) {
    visible.value = false
    return
  }
  timer = window.setTimeout(() => { visible.value = true }, 400)
}, { immediate: true })

onBeforeUnmount(() => clearTimeout(timer))
</script>

<template>
  <aside v-if="visible && !hasDecided" class="cookie-banner" role="dialog" aria-labelledby="cookie-banner-title" aria-modal="false">
    <p id="cookie-banner-title" class="eyebrow">COOKIES</p>
    <p class="cookie-copy">I use only the storage this site needs to work, plus optional analytics if you allow it. You can change your choice at any time. <NuxtLink to="/cookie-policy">Cookie policy</NuxtLink>.</p>
    <div class="cookie-actions">
      <button type="button" class="cookie-choice-button" @click="rejectAll">Reject all</button>
      <button type="button" class="cookie-choice-button" @click="acceptAll">Accept all</button>
      <button type="button" class="cookie-settings-link" @click="openPreferences">Settings</button>
    </div>
  </aside>
</template>