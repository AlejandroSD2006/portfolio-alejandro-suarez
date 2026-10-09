<script setup>
import { ArrowDown, ArrowRight, ArrowUpRight, Menu, X } from 'lucide-vue-next'
import { ref } from 'vue'
import resumeUrl from '../Curriculum-Alejandro.pdf?url'
import profileArtwork from '../img-prueba/jupiter.jpeg'
import EducationTimeline from './components/EducationTimeline.vue'
import ProjectGrid from './components/ProjectGrid.vue'
import SkillsSection from './components/SkillsSection.vue'
import ContactSection from './components/ContactSection.vue'
import CountUp from './components/ui/CountUp.vue'
import MarqueeStrip from './components/ui/MarqueeStrip.vue'
import NeuralBackground from './components/ui/NeuralBackground.vue'
import ScrollProgress from './components/ui/ScrollProgress.vue'
import SignalStage from './components/ui/SignalStage.vue'
import TypewriterText from './components/ui/TypewriterText.vue'
import LanguageMeter from './components/ui/LanguageMeter.vue'
import { prefersReducedMotion } from './composables/useMotion.js'
import { useScrollSpy } from './composables/useScrollSpy.js'

const menuOpen = ref(false)
const activeSection = useScrollSpy(['work', 'skills', 'about', 'contact'])
const reducedMotion = prefersReducedMotion()
const particlesOptions = {
  fullScreen: { enable: false },
  fpsLimit: 50,
  detectRetina: true,
  particles: {
    color: { value: ['#d4e576', '#f0a27f', '#7dbbd0', '#b9a0e0'] },
    move: { direction: 'none', enable: !reducedMotion, outModes: { default: 'out' }, random: true, speed: .38, straight: false },
    number: { value: 62 },
    opacity: { value: { min: .2, max: .72 } },
    shape: { type: 'circle' },
    size: { value: { min: 1, max: 3 } },
  },
}

function closeMenu() {
  menuOpen.value = false
}
</script>

<template>
  <main>
    <ScrollProgress />
    <header class="site-header wrap">
      <a class="wordmark" href="#home" aria-label="Alejandro Suárez Durán, home" @click="closeMenu">
        <span class="wordmark-mark">AS</span>
        <span class="wordmark-name">ALEJANDRO<br />SUÁREZ DURÁN</span>
      </a>

      <button class="menu-toggle icon-button" type="button" :aria-expanded="menuOpen" aria-label="Toggle navigation" @click="menuOpen = !menuOpen">
        <X v-if="menuOpen" :size="19" />
        <Menu v-else :size="19" />
      </button>

      <nav class="main-nav" :class="{ 'is-open': menuOpen }" aria-label="Main navigation">
        <a href="#work" :class="{ 'is-active': activeSection === 'work' }" :aria-current="activeSection === 'work' ? 'location' : undefined" @click="closeMenu">Work</a>
        <a href="#skills" :class="{ 'is-active': activeSection === 'skills' }" :aria-current="activeSection === 'skills' ? 'location' : undefined" @click="closeMenu">Skills</a>
        <a href="#about" :class="{ 'is-active': activeSection === 'about' }" :aria-current="activeSection === 'about' ? 'location' : undefined" @click="closeMenu">About</a>
        <a href="#contact" :class="{ 'is-active': activeSection === 'contact' }" :aria-current="activeSection === 'contact' ? 'location' : undefined" @click="closeMenu">Contact</a>
        <a class="nav-resume" v-magnetic :href="resumeUrl" target="_blank" rel="noreferrer" @click="closeMenu">Résumé <ArrowUpRight :size="14" /></a>
      </nav>
    </header>

    <section id="home" class="hero wrap" aria-labelledby="hero-title">
      <div class="hero-copy panel">
        <p class="eyebrow"><span class="status-dot"></span> MACHINE LEARNING <span class="eyebrow-divider">/</span> DATA <span class="eyebrow-divider">/</span> SYSTEMS</p>
        <h1 id="hero-title">Machine<br />learning.<br /><span class="serif-accent">Data, decoded.</span></h1>
        <p class="hero-intro">I’m <strong>Alejandro Suárez Durán</strong>, currently specializing in Machine Learning and the world of data, with a foundation in systems, private cloud and web development.</p>
        <p class="hero-specialty"><span aria-hidden="true">&gt; </span><TypewriterText :phrases="['private cloud infrastructure', 'automation with Ansible', 'machine learning & data', 'web development']" /></p>
        <a class="pill-link" v-magnetic href="#work">Explore my experience <span><ArrowRight :size="17" /></span></a>
        <div class="hero-footnote"><span>VMWARE VSPHERE</span><span>ANSIBLE · WINDOWS SERVER</span></div>
      </div>

      <div class="landscape-panel">
        <VueParticles v-if="!reducedMotion" id="hero-particles" :options="particlesOptions" aria-hidden="true" />
        <div class="landscape-caption">
          <div><span class="caption-index">MACHINE LEARNING / DATA</span><h2>From data<br />to understanding.</h2></div>
          <a href="#about" class="round-arrow" v-magnetic aria-label="Read about me"><ArrowDown :size="18" /></a>
        </div>
        <span class="landscape-coordinate">DATA · MACHINE LEARNING</span>
      </div>

      <a class="hero-note panel" href="#work">
        <span class="note-symbol"><CountUp :to="99" suffix="%" /></span>
        <span class="note-copy"><strong>356 CIS controls,<br />audited and remediated.</strong><small>Automated with Ansible for Windows Server 2025.</small><span class="text-link">VIEW EXPERIENCE <ArrowRight :size="13" /></span></span>
      </a>
    </section>

    <MarqueeStrip />
  <SignalStage />
    <ProjectGrid />
    <SkillsSection />

    <section id="about" class="about-section wrap">
      <div class="section-heading" v-reveal>
        <p class="eyebrow">03 / PROFILE & EDUCATION</p>
        <h2>Grounded in systems.<br /><span class="serif-accent">Always learning.</span></h2>
        <figure class="profile-visual">
          <img :src="profileArtwork" alt="Jupiter and its cloud bands, including the Great Red Spot" loading="lazy" decoding="async" />
          <figcaption>LEARNING SYSTEMS · UNDERSTANDING DATA</figcaption>
        </figure>
      </div>
      <div class="about-body" v-reveal>
        <p class="about-lede">My current focus is Machine Learning and the world of data, building on a technical background in Systems, Web Development and private cloud infrastructure.</p>
        <p class="about-copy">I’m pursuing a Machine Learning Specialization with a focus on data management and model training. My previous experience includes VMware cloud infrastructure, automation, web maintenance and technical support.</p>
        <div class="profile-details">
          <div class="profile-block">
            <h3>Education</h3>
            <EducationTimeline />
          </div>
          <div class="profile-block languages-block">
            <h3>Languages</h3>
            <LanguageMeter />
          </div>
        </div>
      </div>
    </section>

    <ContactSection />

    <footer class="site-footer wrap">
      <a class="wordmark footer-wordmark" href="#home"><span class="wordmark-mark">AS</span><span class="wordmark-name">ALEJANDRO<br />SUÁREZ DURÁN</span></a>
      <p>Cloud infrastructure · Systems · Web</p>
      <a href="#home" class="back-to-top">BACK TO TOP <ArrowUpRight :size="14" /></a>
      <span class="copyright">© 2026 ALEJANDRO SUÁREZ DURÁN</span>
    </footer>
  </main>
</template>