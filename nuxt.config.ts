// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/supabase",
    "@nuxtjs/tailwindcss",
    "@nuxt/eslint",
    "@nuxt/image",
    "@nuxt/icon",
    "@vueuse/motion/nuxt",
  ],
  components: [
    { path: "~/components/orders", pathPrefix: false },
    { path: "~/components/common", pathPrefix: false },
  ],
  css: ["~/assets/css/main.css"],
  supabase: {
    redirect: false,
    url: process.env.SUPABASE_URL,
    key: process.env.SUPABASE_KEY,
  },
});
