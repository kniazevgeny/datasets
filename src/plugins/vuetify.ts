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
        white: '#F3F8FF',
        gray: '#D9D9D9',
        tableActive: '#EDEDED',
        red: '#FF4E4E',
        pinkComparison: '#FF4079',
        blueComparison: '#6E9DFD',
        secondary: '#e5ebff',
        accent: '#FFF',
        warning: '#FF7E36',
        externalLink: '#2dd65c',
        borderRadius: '15px',
        sidebar_size: '30ch'
      },
      dark: {
        primary: '#29A89D',
        // primary: '#3D5AFE',
        darken: '#1E1E1E',
        text: '#D7DCE3',
        background: '#0D1621',
        white: '#F3F8FF',
        gray: '#222B36',
        tableActive: '#222B36',
        lineAccent: '#222B36',
        red: '#FF4E4E',
        pinkComparison: '#FF4079',
        blueComparison: '#6E9DFD',
        secondary: '#e5ebff',
        accent: '#060F1A',
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
