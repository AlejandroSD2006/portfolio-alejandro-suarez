import { computed, onMounted } from 'vue'
import { CONSENT_VERSION, consentCategories } from '~/data/consent.js'

const CONSENT_KEY = 'portfolio-cookie-consent'
const callbacks = new Map()

function isCurrentConsent(record) {
  if (record.version !== CONSENT_VERSION || !Number.isFinite(record.timestamp) || record.categories?.necessary !== true) return false
  const expiresAt = new Date(record.timestamp)
  expiresAt.setMonth(expiresAt.getMonth() + 12)
  return Date.now() < expiresAt.getTime()
}

export function useConsent() {
  const consent = useState('cookieConsent', () => null)
  const initialized = useState('cookieConsentInitialized', () => false)
  const preferencesOpen = useState('cookiePreferencesOpen', () => false)
  const hasDecided = computed(() => consent.value !== null)

  function load() {
    if (!import.meta.client || initialized.value) return
    try {
      const stored = localStorage.getItem(CONSENT_KEY)
      if (stored) {
        const parsed = JSON.parse(stored)
        if (isCurrentConsent(parsed)) consent.value = parsed
        else localStorage.removeItem(CONSENT_KEY)
      }
    } catch {
      consent.value = null
    }
    initialized.value = true
  }

  onMounted(load)

  function notify() {
    for (const [category, listeners] of callbacks) {
      if (!consent.value?.categories?.[category]) continue
      for (const callback of listeners) callback()
      listeners.clear()
    }
  }

  function save(categories) {
    const record = {
      version: CONSENT_VERSION,
      timestamp: Date.now(),
      categories: Object.fromEntries(consentCategories.map(({ id, required }) => [id, required || categories[id] === true])),
    }
    consent.value = record
    if (import.meta.client) {
      try {
        localStorage.setItem(CONSENT_KEY, JSON.stringify(record))
      } catch {
        consent.value = null
      }
    }
    preferencesOpen.value = false
    notify()
  }

  function acceptAll() {
    save(Object.fromEntries(consentCategories.map(({ id }) => [id, true])))
  }

  function rejectAll() {
    save({ necessary: true, analytics: false })
  }

  function openPreferences() {
    preferencesOpen.value = true
  }

  function onConsent(category, callback) {
    if (consent.value?.categories?.[category]) callback()
    else {
      if (!callbacks.has(category)) callbacks.set(category, new Set())
      callbacks.get(category).add(callback)
    }
    return () => callbacks.get(category)?.delete(callback)
  }

  return { consent, initialized, preferencesOpen, hasDecided, acceptAll, rejectAll, save, openPreferences, onConsent }
}