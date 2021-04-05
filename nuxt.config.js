export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "Бк Лидер",
    htmlAttrs: {
      lang: "ru"
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" }
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      { rel: "preconnect", href: "https://fonts.gstatic.com" },
      {
        rel: "stylesheet",
        href:
          "https://fonts.googleapis.com/css2?family=Fira+Sans+Condensed:wght@400;500;600;700&display=swap"
      },
      {
        rel: "stylesheet",
        href: "https://unpkg.com/vue2-animate/dist/vue2-animate.min.css"
      }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-cssnpm
  css: ["~assets/scss/settings.scss"],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [{ src: "~/plugins/fullpage", mode: "client" }],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: ["@nuxt/components"],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ["@nuxtjs/axios", "@nuxtjs/style-resources", "nuxt-fullpage.js"],

  styleResources: {
    scss: ["./assets/scss/*.scss"]
  },

  axios: {
    baseURL: "http://leader/wp-json/acf/v3",
    timeout: 5000,
    headers: {
      "Content-Type": "application/json"
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
  loading: {
    height: "2px",
    color: "crimson",
    failed: "red",
    throttle: 200,
    duration: 2000,
    continuous: true,
    css: true
  },
  ssr: true,
  target: "server"
};
