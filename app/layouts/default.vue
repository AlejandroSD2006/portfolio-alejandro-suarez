<script setup>
import { ArrowUpRight, Menu, X } from 'lucide-vue-next'
import { ref } from 'vue'
import ScrollProgress from '~/components/ui/ScrollProgress.vue'
import { useScrollSpy } from '~/composables/useScrollSpy.js'
import { useConsent } from '~/composables/useConsent.js'

const menuOpen = ref(false)
const activeSection = useScrollSpy(['work', 'skills', 'about', 'contact'])
const preloaderDone = useState('preloaderDone', () => false)
const { openPreferences } = useConsent()

function closeMenu() {
  menuOpen.value = false
}
</script>

<template>
  <div>
    <AppPreloader v-if="!preloaderDone" />
    <ScrollProgress />
    <header class="site-header wrap">
      <NuxtLink class="wordmark" :to="{ path: '/', hash: '#home' }" aria-label="Alejandro Suárez Durán, home" @click="closeMenu">
        <span class="wordmark-mark">AS</span>
        <span class="wordmark-name">ALEJANDRO<br />SUÁREZ DURÁN</span>
      </NuxtLink>

      <button class="menu-toggle icon-button" type="button" :aria-expanded="menuOpen" aria-label="Toggle navigation" @click="menuOpen = !menuOpen">
        <X v-if="menuOpen" :size="19" />
        <Menu v-else :size="19" />
      </button>

      <nav class="main-nav" :class="{ 'is-open': menuOpen }" aria-label="Main navigation">
        <NuxtLink :to="{ path: '/', hash: '#work' }" :class="{ 'is-active': activeSection === 'work' }" :aria-current="activeSection === 'work' ? 'location' : undefined" @click="closeMenu">Work</NuxtLink>
        <NuxtLink :to="{ path: '/', hash: '#skills' }" :class="{ 'is-active': activeSection === 'skills' }" :aria-current="activeSection === 'skills' ? 'location' : undefined" @click="closeMenu">Skills</NuxtLink>
        <NuxtLink :to="{ path: '/', hash: '#about' }" :class="{ 'is-active': activeSection === 'about' }" :aria-current="activeSection === 'about' ? 'location' : undefined" @click="closeMenu">About</NuxtLink>
        <NuxtLink :to="{ path: '/', hash: '#contact' }" :class="{ 'is-active': activeSection === 'contact' }" :aria-current="activeSection === 'contact' ? 'location' : undefined" @click="closeMenu">Contact</NuxtLink>
        <a class="nav-resume" href="/Curriculum-Alejandro.pdf" target="_blank" rel="noreferrer" aria-label="View CV (opens PDF in a new tab)" @click="closeMenu">View CV <ArrowUpRight :size="14" /></a>
      </nav>
    </header>

    <slot />

    <footer class="site-footer wrap">
      <NuxtLink class="wordmark footer-wordmark" :to="{ path: '/', hash: '#home' }"><span class="wordmark-mark">AS</span><span class="wordmark-name">ALEJANDRO<br />SUÁREZ DURÁN</span></NuxtLink>
      <p>Cloud infrastructure · Systems · Web</p>
      <NuxtLink :to="{ path: '/', hash: '#home' }" class="back-to-top">BACK TO TOP <ArrowUpRight :size="14" /></NuxtLink>
      <span class="copyright">© 2026 ALEJANDRO SUÁREZ DURÁN</span>
      <nav class="legal-footer-links" aria-label="Legal and cookie settings">
        <NuxtLink to="/privacy-policy">Privacy Policy</NuxtLink>
        <NuxtLink to="/legal-notice">Legal Notice</NuxtLink>
        <NuxtLink to="/cookie-policy">Cookie Policy</NuxtLink>
        <button type="button" @click="openPreferences">Cookie settings</button>
      </nav>
    </footer>
    <CookieBanner />
    <CookiePreferences />
  </div>
</template>