<script setup>
defineProps({ value: { type: String, default: '' } })
</script>

<template>
  <span v-if="value">{{ value }}</span>
  <mark v-else class="todo">[TO BE COMPLETED]</mark>
</template>