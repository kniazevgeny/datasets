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
        primary: '#a5a6f6',
        base: '#D6DDF7',
        secondary: '#F5F7FD',
        accent: '#E7EBFA',
        indigoA2: '#536DFE',
        indigoA3: '#3D5AFE',
        borderRadius: '15px',
      },
      dark: {},
    },
  },
  icons: {
    iconfont: 'mdi',
  },
})
