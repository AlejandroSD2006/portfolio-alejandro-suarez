<script setup>
import SkillIcon from './SkillIcon.vue'
import SpotlightCard from './ui/SpotlightCard.vue'

const props = defineProps({ skill: { type: Object, required: true } })
const categoryLabels = {
  cloud: 'CLOUD & SYSTEMS',
  data: 'DATA & ML',
  web: 'WEB & DEV',
  network: 'NETWORKING',
}
</script>

<template>
  <SpotlightCard class="skill-spotlight">
    <article class="skill-card" :style="{ '--brand': props.skill.icon.kind === 'brand' ? `#${props.skill.icon.data?.hex}` : 'var(--green)' }">
      <div class="skill-tile"><SkillIcon :icon="skill.icon" /></div>
      <span class="skill-category">{{ categoryLabels[skill.category] }}</span>
      <h3>{{ skill.name }}</h3>
      <p v-if="skill.usedIn" class="skill-used-in">{{ skill.usedIn }}</p>
      <span v-if="skill.status === 'in-progress'" class="skill-status">IN PROGRESS</span>
    </article>
  </SpotlightCard>
</template>

<style scoped>
.skill-card { min-width: 0; min-height: 204px; position: relative; padding: 16px; border: 1px solid var(--line); background: #fbfaf6; border-radius: 3px; }
.skill-spotlight { border-radius: 3px; }
.skill-tile { width: 46px; height: 46px; display: grid; place-items: center; margin-bottom: 17px; border-radius: 8px; background: color-mix(in srgb, var(--brand) 14%, transparent); }
.skill-card:hover .skill-icon, .skill-card:focus-within .skill-icon { color: color-mix(in srgb, var(--brand) 70%, var(--ink)); }
.skill-category { font: 8px var(--mono); color: var(--muted); }
.skill-card h3 { margin: 6px 0 0; font-size: 14px; line-height: 1.35; font-weight: 600; }
.skill-used-in { color: var(--muted); font-size: 10px; line-height: 1.5; margin: 6px 0 0; }
.skill-status { display: inline-block; margin-top: 9px; border: 1px solid var(--line); padding: 4px 6px; border-radius: 30px; font: 7px var(--mono); }
</style>
