// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/ui',
    '@nuxt/eslint',
    '@nuxt/test-utils/module',
    '@pinia/nuxt',
    'nuxt-auth-utils',
  ],
  runtimeConfig: {
    rootDir: __dirname,
    database: process.env.DATABASE || 'server/database/db.sqlite',
  },
  tailwindcss: {
    viewer: false,
  },
})
