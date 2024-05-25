export default defineNuxtConfig({
  devtools: { enabled: true },
  runtimeConfig: {},
  app: {
    head: {
      charset: "utf-8",
      title: "Country+ | Find your country",
      link: [
        {
          rel: "icon",
          type: "image/x-icon",
          href: "favicon.ico",
        },
      ],
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
