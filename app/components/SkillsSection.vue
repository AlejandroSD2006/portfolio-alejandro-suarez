<script setup>
import { computed, ref } from 'vue'
import { skillCategories, skills } from '../data/skills.js'
import SkillCard from './SkillCard.vue'

const activeCategory = ref('all')
const filters = computed(() => [
  { id: 'all', label: 'All', count: skills.length },
  ...skillCategories.map((category) => ({
    ...category,
    count: skills.filter((skill) => skill.category === category.id).length,
  })),
])
const filteredSkills = computed(() => activeCategory.value === 'all'
  ? skills
  : skills.filter((skill) => skill.category === activeCategory.value))
</script>

<template>
  <section id="skills" class="skills-section wrap" aria-labelledby="skills-title">
    <div class="section-topline"><p class="eyebrow">02 / SKILLS</p><span>TOOLS <span class="topline-dot">✳</span> SYSTEMS <span class="topline-dot">✳</span> DATA</span></div>
    <div class="skills-heading" v-reveal.fade>
      <h2 id="skills-title">Tools I work with.<br /><span class="serif-accent">Always sharpening.</span></h2>
      <p>Grouped by what I use them for.</p>
    </div>
    <div class="skill-filters" role="group" aria-label="Filter skills by category">
      <button v-for="filter in filters" :key="filter.id" type="button" :aria-pressed="activeCategory === filter.id" :class="{ 'is-active': activeCategory === filter.id }" @click="activeCategory = filter.id">
        {{ filter.label }}<span>{{ filter.count }}</span>
      </button>
    </div>
    <TransitionGroup tag="div" name="skill-list" class="skill-list" v-reveal.zoom>
      <SkillCard v-for="skill in filteredSkills" :key="skill.id" :skill="skill" />
    </TransitionGroup>
    <p class="skills-count">{{ skills.length }} TECHNOLOGIES · {{ skillCategories.length }} AREAS</p>
  </section>
</template>

<style scoped>
.skills-section { padding: 0 0 122px; }
.skills-heading { display: flex; align-items: end; justify-content: space-between; padding: 36px 0 29px; }
.skills-heading h2 { font-size: clamp(40px, 5vw, 68px); letter-spacing: -.065em; line-height: 1.02; font-weight: 500; margin: 0; }
.skills-heading > p { color: var(--muted); font-size: 12px; margin: 0 7% 7px 20px; }
.skill-filters { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 17px; }
.skill-filters button { display: inline-flex; align-items: center; gap: 10px; border: 1px solid var(--line); border-radius: 30px; background: transparent; padding: 8px 11px; color: var(--ink); font-size: 10px; cursor: pointer; transition: color .2s, background .2s, border-color .2s; }
.skill-filters button span { font: 9px var(--mono); color: var(--muted); }
.skill-filters button.is-active { background: var(--ink); border-color: var(--ink); color: var(--paper); }
.skill-filters button.is-active span { color: var(--lime); }
.skill-list { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 14px; position: relative; }
.skill-list-move, .skill-list-enter-active, .skill-list-leave-active { transition: transform .24s var(--ease), opacity .2s ease; }
.skill-list-enter-from, .skill-list-leave-to { opacity: 0; transform: translateY(8px); }
.skill-list-leave-active { position: absolute; }
.skills-count { font: 9px var(--mono); color: var(--muted); margin: 18px 0 0; }
@media (max-width: 620px) {
  .skills-section { padding-bottom: 79px; }
  .skills-heading { display: block; padding: 31px 0 24px; }
  .skills-heading h2 { font-size: clamp(39px, 10vw, 55px); }
  .skills-heading > p { margin: 14px 0 0; }
  .skill-list { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 9px; }
  .skill-card { min-height: 194px; padding: 13px; }
}
</style>
