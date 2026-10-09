<!-- Borrador generado con IA: el titular debe revisarlo (idealmente con un profesional legal) antes de publicar. -->
<script setup>
import { legal } from '~/data/legal.js'

const sections = [
  { id: 'controller', title: 'Data controller' },
  { id: 'data', title: 'Data and purposes' },
  { id: 'website', title: 'What this website does not do' },
  { id: 'retention', title: 'Retention' },
  { id: 'recipients', title: 'Recipients and international transfers' },
  { id: 'rights', title: 'Your rights' },
  { id: 'security', title: 'Security' },
  { id: 'changes', title: 'Changes' },
  { id: 'contact', title: 'Contact' },
]

useSeoMeta({ title: 'Privacy Policy', description: 'How this portfolio handles personal data and how to exercise your rights.' })
</script>

<template>
  <LegalPage eyebrow="PRIVACY" title="Privacy" accent="Policy" :sections="sections" :last-updated="legal.lastUpdated">
    <section id="controller"><h2>Data controller</h2><p>{{ legal.owner }}<br />Tax identification number: <LegalValue :value="legal.taxId" /><br />Postal address: <LegalValue :value="legal.address" /><br />Email: <a :href="`mailto:${legal.email}`">{{ legal.email }}</a><br />Website: <LegalValue :value="legal.domain" /></p></section>
    <section id="data"><h2>Data and purposes</h2><p>If you email me, I process the details in your email and message to reply. The legal basis is your consent to send the message and my legitimate interest in responding (GDPR Articles 6(1)(a) and 6(1)(f)).</p><p>The hosting provider may process technical server logs, such as IP address, browser and date, for security and operation.</p></section>
    <section id="website"><h2>What this website does not do</h2><p>The contact form does not send data to a server; its link opens your email client using <code>mailto:</code>. Fonts are self-hosted, so the site does not contact Google to load them. This website does not run advertising or profiling.</p></section>
    <section id="retention"><h2>Retention</h2><p>Email correspondence is kept only for as long as needed to handle your enquiry, subject to any legal obligations that apply.</p></section>
    <section id="recipients"><h2>Recipients and international transfers</h2><p>The hosting provider is: <LegalValue :value="legal.hosting" />. Confirm whether it transfers data outside the European Economic Area and the safeguards used: <mark class="todo">[TO BE COMPLETED]</mark></p></section>
    <section id="rights"><h2>Your rights</h2><p>You may request access, rectification, erasure, restriction, portability or object to processing by emailing <a :href="`mailto:${legal.email}`">{{ legal.email }}</a>. You may also complain to the Spanish Data Protection Agency (AEPD) at <a href="https://www.aepd.es" target="_blank" rel="noreferrer">aepd.es</a>.</p></section>
    <section id="security"><h2>Security</h2><p>Personal data should be handled using appropriate security measures. No method of transmission or storage can be guaranteed completely secure.</p></section>
    <section id="changes"><h2>Changes</h2><p>This policy may be updated when the website or its data practices change. The latest update date appears above.</p></section>
    <section id="contact"><h2>Contact</h2><p>For privacy questions or requests, email <a :href="`mailto:${legal.email}`">{{ legal.email }}</a>.</p></section>
  </LegalPage>
</template>