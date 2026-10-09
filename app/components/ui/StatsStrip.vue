<script setup>
import { skills } from '../../data/skills.js'
import CountUp from './CountUp.vue'

const stats = [
  { to: 356, suffix: '', label: 'CIS CONTROLS AUDITED' },
  { to: 99, suffix: '%', label: 'COMPLIANCE ON WINDOWS SERVER 2025' },
  { to: skills.length, suffix: '', label: 'TECHNOLOGIES' },
]
</script>

<template>
  <div class="stats-strip">
    <div v-for="(stat, index) in stats" :key="stat.label" v-reveal="{ delay: index * 100 }" class="stat-item">
      <strong><CountUp :to="stat.to" :suffix="stat.suffix" /></strong>
      <span>{{ stat.label }}</span>
    </div>
  </div>
</template>

<style scoped>
.stats-strip { display: grid; grid-template-columns: repeat(3, 1fr); border-top: 1px solid var(--line); border-bottom: 1px solid var(--line); margin: 0 0 30px; }
.stat-item { display: grid; gap: 6px; padding: 17px 19px 17px 0; }
.stat-item + .stat-item { border-left: 1px solid var(--line); padding-left: 19px; }
.stat-item strong { font: 24px var(--mono); font-weight: 400; }
.stat-item span { color: var(--muted); font: 8px var(--mono); line-height: 1.5; }
@media (max-width: 620px) {
  .stats-strip { margin-bottom: 25px; }
  .stat-item { padding: 13px 8px 13px 0; }
  .stat-item + .stat-item { padding-left: 8px; }
  .stat-item strong { font-size: 19px; }
  .stat-item span { font-size: 7px; }
}
</style>
