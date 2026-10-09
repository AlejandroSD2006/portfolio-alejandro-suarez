export default defineNuxtConfig({
  compatibilityDate: '2026-10-09',
  devServer: { port: 5173 },
  modules: ['@nuxt/image', '@nuxt/fonts'],
  components: [{ path: '~/components', pathPrefix: false }],
  css: ['~/assets/css/main.css'],
  routeRules: { '/**': { prerender: true } },
  image: { format: ['avif', 'webp'], quality: 80 },
  nitro: { externals: { inline: ['nuxt'] } },
  fonts: {
    families: [
      { name: 'Manrope', provider: 'google', weights: [400, 500, 600, 700, 800] },
      { name: 'DM Mono', provider: 'google', weights: [400, 500] },
    ],
  },
  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      title: 'Alejandro Suárez Durán — Cloud & Systems',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
        { name: 'theme-color', content: '#f3f0e7' },
        { name: 'description', content: 'A personal portfolio of selected work, experience, and ideas.' },
      ],
    },
  },
})