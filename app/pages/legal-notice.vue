<!-- Borrador generado con IA: el titular debe revisarlo (idealmente con un profesional legal) antes de publicar. -->
<script setup>
import { legal } from '~/data/legal.js'

const sections = [
  { id: 'owner', title: 'Owner identification' },
  { id: 'purpose', title: 'Purpose' },
  { id: 'terms', title: 'Terms of use' },
  { id: 'property', title: 'Intellectual and industrial property' },
  { id: 'liability', title: 'Liability disclaimer' },
  { id: 'links', title: 'External links' },
  { id: 'law', title: 'Governing law' },
]

useSeoMeta({ title: 'Legal Notice', description: 'Legal information about Alejandro Suárez Durán’s portfolio website.' })
</script>

<template>
  <LegalPage eyebrow="NOTICE" title="Legal" accent="Notice" :sections="sections" :last-updated="legal.lastUpdated">
    <section id="owner"><h2>Owner identification</h2><p>Owner: {{ legal.owner }}<br />Tax identification number: <LegalValue :value="legal.taxId" /><br />Postal address: <LegalValue :value="legal.address" /><br />Email: <a :href="`mailto:${legal.email}`">{{ legal.email }}</a><br />Website: <LegalValue :value="legal.domain" /></p></section>
    <section id="purpose"><h2>Purpose</h2><p>This personal portfolio showcases professional experience, skills and contact details.</p></section>
    <section id="terms"><h2>Terms of use</h2><p>Use this website lawfully and do not interfere with its operation or other visitors’ rights.</p></section>
    <section id="property"><h2>Intellectual and industrial property</h2><p>Website content and design © Alejandro Suárez Durán. Technology logos belong to their respective owners and are used only to identify those technologies. Interface icons are provided by Lucide.</p><h3>Image credits</h3><p>The authorship and licences for the nebula and Jupiter test images must be confirmed before publication: <mark class="todo">[TO BE COMPLETED]</mark></p></section>
    <section id="liability"><h2>Liability disclaimer</h2><p>Information is provided for general purposes. The owner does not guarantee uninterrupted availability or that all information is complete and up to date.</p></section>
    <section id="links"><h2>External links</h2><p>This website may link to third-party services, including LinkedIn. Their operators are responsible for their own content and privacy practices.</p></section>
    <section id="law"><h2>Governing law</h2><p>Spanish law applies. Disputes are subject to the Spanish courts, without prejudice to any consumer rights that may apply.</p></section>
  </LegalPage>
</template>