<script setup>
import NeuralBackground from './NeuralBackground.vue'
</script>

<template>
  <section class="signal-stage" aria-label="Interactive network visualization">
    <NeuralBackground />
    <div class="signal-content wrap" v-reveal>
      <div class="signal-topline"><span>DATA SIGNAL</span><span>VMWARE VSPHERE · ANSIBLE</span></div>
      <div class="signal-flow"><span>PRIVATE CLOUD</span><span class="signal-track"><i></i></span><span>MACHINE LEARNING</span></div>
    </div>
  </section>
</template>

<style scoped>
.signal-stage { min-height: 154px; position: relative; display: grid; align-items: center; overflow: hidden; isolation: isolate; color: var(--paper); background: #20241e; }
.signal-stage::before { content: ''; position: absolute; inset: 0; z-index: 1; pointer-events: none; opacity: .24; background: repeating-linear-gradient(90deg, rgba(255,255,255,.08) 0 1px, transparent 1px 48px); }
.signal-content { position: relative; z-index: 2; display: grid; gap: 20px; }
.signal-topline { display: flex; justify-content: space-between; color: rgba(243,240,231,.68); font: 9px var(--mono); }
.signal-flow { display: grid; grid-template-columns: max-content minmax(32px, 1fr) max-content; align-items: center; gap: 18px; font: 10px var(--mono); }
.signal-track { height: 1px; position: relative; overflow: hidden; background: rgba(243,240,231,.28); }
.signal-track i { position: absolute; inset: 0 auto 0 0; width: 18%; background: var(--lime); transform: translateX(-120%); animation: signal-sweep 3.2s var(--ease) infinite; }
@keyframes signal-sweep { to { transform: translateX(650%); } }
@media (max-width: 620px) {
  .signal-stage { min-height: 132px; }
  .signal-content { gap: 18px; }
  .signal-topline { font-size: 8px; }
  .signal-flow { grid-template-columns: 1fr minmax(24px, .7fr) 1fr; gap: 10px; font-size: 8px; }
  .signal-flow span:last-child { text-align: right; }
}
</style>
