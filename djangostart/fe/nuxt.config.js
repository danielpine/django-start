module.exports = {
  /*
   ** Headers of the page
   */
  head: {
    title: 'starter',
    meta: [
      {
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: 'Nuxt.js project'
      }
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico'
      }
      // ,
      // , {
      //   rel: 'stylesheet',
      //   type: 'text/css',
      //   href: '/css/index.css'
      // }
      // {
      //   rel: 'stylesheet',
      //   type: 'text/css',
      //   href: '/css/index_mod_fx.css'
      // }
    ],
    script: [
      {
        type: 'text/javascript',
        charset: 'utf-8',
        src: '/deri-web/loginController.do?bookinfo'
      },
      {
        type: 'text/javascript',
        charset: 'utf-8',
        src: '/js/clear.js'
      }
    ]
  },
  /*
   ** Global CSS
   */
  css: [
    '~/assets/css/main.css',
    'element-ui/lib/theme-chalk/index.css',
    '~/assets/css/index_mod_fx.css',
    'quill/dist/quill.snow.css',
    'quill/dist/quill.bubble.css',
    'quill/dist/quill.core.css'
  ],

  /*
   ** Add element-ui in our app, see plugins/element-ui.js file
   */
  plugins: [
    '@/plugins/element-ui',
    { src: '~plugins/nuxt-quill-plugin.js', ssr: false }
  ],
  /*
   ** Add axios globally
   */
  build: {
    vendor: ['axios', 'jquery'],
    /*
     ** Run ESLINT on save
     */
    extend (config, ctx) {
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
  serverMiddleware: [
    // API middleware
    '~/api/index.js'
  ]
}
