<script setup>
import { skills } from '../../data/skills.js'
</script>

<template>
  <div class="marquee-strip" aria-label="Technologies">
    <div class="marquee-track">
      <div class="marquee-group">
        <span v-for="skill in skills" :key="skill.id">{{ skill.name }} <i>✳</i></span>
      </div>
      <div class="marquee-group" aria-hidden="true">
        <span v-for="skill in skills" :key="skill.id">{{ skill.name }} <i>✳</i></span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.marquee-strip { overflow: hidden; border-top: 1px solid var(--line); border-bottom: 1px solid var(--line); margin-top: 14px; mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent); }
.marquee-track { display: flex; width: max-content; animation: marquee 40s linear infinite; }
.marquee-group { flex: 0 0 auto; display: flex; align-items: center; gap: 22px; padding: 14px 11px; }
.marquee-group span { white-space: nowrap; color: var(--muted); font: 10px var(--mono); }
.marquee-group i { margin-left: 18px; color: var(--green); font-style: normal; }
.marquee-strip:hover .marquee-track { animation-play-state: paused; }
@keyframes marquee { to { transform: translateX(-50%); } }
@media (prefers-reduced-motion: reduce) { .marquee-track { animation: none; } }
</style>
