import pkg from  './package'
import environmentConfig from './config/env.config.js'

let envConfig = environmentConfig[process.env.NODE_ENV]
console.log(envConfig)
// console.log(process.env)

export default {
  mode: 'spa',
  env: envConfig,

  /*
   ** Headers of the page
   */
  head: {
    title: envConfig.appName,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Montserrat&display=swap'}
    ]
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: [
    '~/node_modules/font-awesome/css/font-awesome.min.css',
    '~/node_modules/simple-line-icons/css/simple-line-icons.css',
    '~/assets/css/style.css'
  ],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    { src: '~/plugins/axios.js', ssr: false },
    { src: '~/plugins/installer.js', ssr: false },
    { src: '~/plugins/toastConfig.js', ssr: false }
  ],

  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://bootstrap-vue.js.org/docs/
    'bootstrap-vue/nuxt',
    '@nuxtjs/pwa',
    '@nuxtjs/proxy',
  ],
  axios: {
    proxy: true // Can be also an object with default options
  },
  proxy: {
    '/api/*/info.0.json': {
      target: 'https://xkcd.com',
      pathRewrite: { '^/api' : '/' } 
    },
    changeOrigin: true
  },
  manifest: {
    name: 'COMICS',
    short_name: 'Comics',
    lang: 'es',
    theme_color: '#e8e8e8'
  },

  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
          options: {
            fix: true
          }
        })
      }
    }
  },
  router: {
    // es opcional
    base: envConfig.appBaseDir
  }
}
