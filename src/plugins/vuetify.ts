import Vue from 'vue'
// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/dist/vuetify.min.css'
import '@/styles/main.scss'

// Vuetify
import Vuetify from 'vuetify/lib'
import * as components from 'vuetify/lib/components'
import * as directives from 'vuetify/lib/directives'

Vue.use(Vuetify, {
  components: components,
  directives: directives,
  customProperties: true,
})

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#3D5AFE',
        darken: '#1E1E1E',
        secondary: '#e5ebff',
        accent: '#f41224',
        warning: '#FF7E36',
        externalLink: '#2dd65c',
        borderRadius: '15px',
      },
      dark: {},
    },
  },
  icons: {
    iconfont: 'mdi',
  },
})
