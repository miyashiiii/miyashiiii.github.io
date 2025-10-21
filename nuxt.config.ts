// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ["~/assets/css/main.scss"],
  modules: ["nuxt-quasar-ui"],

  quasar: {
    extras: {
      fontIcons: ["fontawesome-v6"],
    },
  },

  runtimeConfig: {
    supabaseUrl: process.env.SUPABASE_URL,
    supabaseKey: process.env.SUPABASE_KEY,
  },

  compatibilityDate: "2025-02-09",
});
