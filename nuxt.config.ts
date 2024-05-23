// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      CEPAPI_BASE_URL: process.env.CEPAPI_BASE_URL,
      RESTCOUNTRY_BASE_URL: process.env.RESTCOUNTRY_BASE_URL,
    },
  },
  srcDir: "src/",
  modules: ["@nuxtjs/color-mode", "@nuxt/ui", "@nuxt/image", "@vueuse/nuxt"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  colorMode: {
    classSuffix: "",
  },
  tailwindcss: {
    cssPath: "src/assets/scss/main.scss",
  },
});