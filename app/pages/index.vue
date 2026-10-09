<script setup>
import { ArrowDown, ArrowRight } from 'lucide-vue-next'
import EducationTimeline from '~/components/EducationTimeline.vue'
import ProjectGrid from '~/components/ProjectGrid.vue'
import SkillsSection from '~/components/SkillsSection.vue'
import ContactSection from '~/components/ContactSection.vue'
import CountUp from '~/components/ui/CountUp.vue'
import MarqueeStrip from '~/components/ui/MarqueeStrip.vue'
import NeuralBackground from '~/components/ui/NeuralBackground.vue'
import SignalStage from '~/components/ui/SignalStage.vue'
import TypewriterText from '~/components/ui/TypewriterText.vue'
import LanguageMeter from '~/components/ui/LanguageMeter.vue'

const heroImageLoaded = useState('heroImageLoaded', () => false)

function markHeroImageLoaded() {
  heroImageLoaded.value = true
}
</script>

<template>
  <main>
    <section id="home" class="hero wrap" aria-labelledby="hero-title">
      <div class="hero-copy panel">
        <p class="eyebrow"><span class="status-dot"></span> MACHINE LEARNING <span class="eyebrow-divider">/</span> DATA <span class="eyebrow-divider">/</span> SYSTEMS</p>
        <h1 id="hero-title">Machine<br />learning.<br /><span class="serif-accent">Data, decoded.</span></h1>
        <p class="hero-intro">I’m <strong>Alejandro Suárez Durán</strong>, currently specializing in Machine Learning and the world of data, with a foundation in systems, private cloud and web development.</p>
        <p class="hero-specialty"><span aria-hidden="true">&gt; </span><TypewriterText :phrases="['private cloud infrastructure', 'automation with Ansible', 'machine learning & data', 'web development']" /></p>
        <NuxtLink class="pill-link" :to="{ path: '/', hash: '#work' }">Explore my experience <span><ArrowRight :size="17" /></span></NuxtLink>
        <div class="hero-footnote"><span>VMWARE VSPHERE</span><span>ANSIBLE · WINDOWS SERVER</span></div>
      </div>

      <div class="landscape-panel">
        <NuxtImg src="/img/nebulosa.avif" class="landscape-image" sizes="100vw md:55vw" format="avif,webp" :preload="{ fetchPriority: 'high' }" loading="eager" fetchpriority="high" placeholder placeholder-class="is-placeholder" alt="A colorful nebula surrounded by stars" @load="markHeroImageLoaded" />
        <ClientOnly><NeuralBackground /></ClientOnly>
        <div class="landscape-caption">
          <div><span class="caption-index">MACHINE LEARNING / DATA</span><h2>From data<br />to understanding.</h2></div>
          <NuxtLink :to="{ path: '/', hash: '#about' }" class="round-arrow" aria-label="Read about me"><ArrowDown :size="18" /></NuxtLink>
        </div>
        <span class="landscape-coordinate">DATA · MACHINE LEARNING</span>
      </div>

      <NuxtLink class="hero-note panel" :to="{ path: '/', hash: '#work' }">
        <span class="note-symbol"><CountUp :to="99" suffix="%" /></span>
        <span class="note-copy"><strong>356 CIS controls,<br />audited and remediated.</strong><small>Automated with Ansible for Windows Server 2025.</small><span class="text-link">VIEW EXPERIENCE <ArrowRight :size="13" /></span></span>
      </NuxtLink>
    </section>

    <MarqueeStrip />
    <SignalStage />
    <ProjectGrid />
    <SkillsSection />

    <section id="about" class="about-section wrap">
      <div class="section-heading" v-reveal.fade>
        <p class="eyebrow">03 / PROFILE & EDUCATION</p>
        <h2>Grounded in systems.<br /><span class="serif-accent">Always learning.</span></h2>
        <figure class="profile-visual">
          <NuxtPicture src="/img/jupiter.jpeg" format="avif,webp" sizes="100vw md:45vw" loading="lazy" placeholder alt="Jupiter and its cloud bands, including the Great Red Spot" />
          <figcaption>LEARNING SYSTEMS · UNDERSTANDING DATA</figcaption>
        </figure>
      </div>
      <div class="about-body" v-reveal.right>
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
  </main>
</template>