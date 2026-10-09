import { magnetic } from '~/directives/magnetic.js'
import { reveal } from '~/directives/reveal.js'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('reveal', reveal)
  nuxtApp.vueApp.directive('magnetic', magnetic)
})