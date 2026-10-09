import { createApp } from 'vue'
import Particles from '@tsparticles/vue3'
import { loadBasic } from '@tsparticles/basic'
import App from './App.vue'
import './style.css'
import { magnetic } from './directives/magnetic.js'
import { reveal } from './directives/reveal.js'

const app = createApp(App)
app.use(Particles, { init: loadBasic })
app.directive('reveal', reveal)
app.directive('magnetic', magnetic)
app.mount('#app')