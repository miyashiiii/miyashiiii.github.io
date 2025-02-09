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

  compatibilityDate: "2025-02-09",
});