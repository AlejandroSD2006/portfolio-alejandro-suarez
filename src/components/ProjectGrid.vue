<script setup>
import { projects } from '../data/projects.js'
import CountUp from './ui/CountUp.vue'
import ProgressRing from './ui/ProgressRing.vue'
import StatsStrip from './ui/StatsStrip.vue'
</script>

<template>
  <section id="work" class="work-section wrap" aria-labelledby="work-title">
    <div class="section-topline"><p class="eyebrow">01 / EXPERIENCE</p><span>CLOUD <span class="topline-dot">✳</span> SYSTEMS <span class="topline-dot">✳</span> DATA</span></div>
    <div class="work-heading" v-reveal><h2 id="work-title">Experience in cloud.<br /><span class="serif-accent">A growing focus on data.</span></h2><p>Infrastructure, automation<br />and web maintenance.</p></div>
    <StatsStrip />
    <div class="project-grid">
      <article v-for="project in projects" :key="project.number" v-reveal="{ delay: project.number === '02' ? 120 : 0 }" class="project-card" :class="project.theme">
        <div class="project-art" aria-hidden="true">
          <ProgressRing v-if="project.number === '01'" :value="99"><span class="project-mark"><CountUp :to="99" suffix="%" /></span></ProgressRing>
          <div v-else-if="project.number === '02'" class="browser-window">
            <div class="browser-toolbar"><i></i><i></i><i></i></div>
            <div class="browser-lines"><span v-for="line in 4" :key="line"></span></div>
          </div>
          <span v-else class="project-mark internship-mark">{{ project.mark }}</span>
          <span class="art-orbit orbit-one"></span><span class="art-orbit orbit-two"></span>
          <span class="art-object"></span>
          <span class="art-label">EXPERIENCE / {{ project.number }}</span>
        </div>
        <div class="project-info"><div><span class="eyebrow">{{ project.category }}</span><h3>{{ project.name }}</h3><p>{{ project.description }}</p></div><span class="project-year">{{ project.year }}</span></div>
      </article>
    </div>
  </section>
</template>