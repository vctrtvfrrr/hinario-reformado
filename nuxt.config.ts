// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxt/ui', '@pinia/nuxt', '@nuxt/eslint', 'nuxt-auth-utils'],
  runtimeConfig: {
    rootDir: __dirname,
    database: process.env.DATABASE || 'server/database/db.sqlite',
  },
  tailwindcss: {
    viewer: false,
  },
})
