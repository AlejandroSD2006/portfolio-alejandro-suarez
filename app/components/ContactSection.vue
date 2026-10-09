<script setup>
import { ArrowUpRight, Send } from 'lucide-vue-next'
import { computed, ref } from 'vue'

const message = ref('')
const emailAddress = 'asuadur14@gmail.com'
const mailtoLink = computed(() => {
  const subject = encodeURIComponent('Hello from your portfolio')
  const body = encodeURIComponent(message.value.trim())
  return `mailto:${emailAddress}?subject=${subject}&body=${body}`
})
</script>

<template>
  <section id="contact" class="contact-section">
    <div class="contact-inner wrap">
      <div class="contact-copy" v-reveal.fade>
        <p class="eyebrow">04 / YOUR TURN</p>
        <h2>Let’s make systems<br /><span class="serif-accent">work better.</span></h2>
        <p>For opportunities in cloud infrastructure, systems administration or web development, get in touch.</p>
        <a class="email-link" :href="`mailto:${emailAddress}`">{{ emailAddress }} <ArrowUpRight :size="16" /></a>
        <a class="contact-detail" href="tel:+34644706491">+34 644 70 64 91</a>
        <a class="contact-detail" href="https://www.linkedin.com/in/alejandro-su%C3%A1rez-dur%C3%A1n-a21151405" target="_blank" rel="noreferrer">LinkedIn profile <ArrowUpRight :size="14" /></a>
      </div>
      <form class="message-form" v-reveal.left @submit.prevent>
        <label for="message">A NOTE, A QUESTION, A HELLO</label>
        <textarea id="message" v-model="message" name="message" rows="5" placeholder="Start wherever you like..."></textarea>
        <a class="send-button" v-magnetic :href="mailtoLink"><span>Open in your email app</span><Send :size="16" /></a>
        <p class="form-note">Your message opens in your email app, ready to send.</p>
        <p class="form-note">I only use your details to reply to you. See the <NuxtLink to="/privacy-policy">Privacy Policy</NuxtLink>.</p>
      </form>
    </div>
  </section>
</template>