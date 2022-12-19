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
        primary: '#7FD2CB',
        // primary: '#3D5AFE',
        darken: '#1E1E1E',
        text: '#3c3c3c',
        background: '#F7F7F7',
        secondary: '#e5ebff',
        accent: '#f41224',
        warning: '#FF7E36',
        externalLink: '#2dd65c',
        borderRadius: '15px',
        sidebar_size: '30ch'
      },
      dark: {
        primary: '#7FD2CB',
        // primary: '#3D5AFE',
        darken: '#1E1E1E',
        text: '#c2c2c2',
        background: '#1C1C1C',
        secondary: '#e5ebff',
        accent: '#f41224',
        warning: '#FF7E36',
        externalLink: '#2dd65c',
        borderRadius: '15px',
        sidebar_size: '30ch'
      },
    },
  },
  icons: {
    iconfont: 'mdi',
  },
})
