// Styles
import '@mdi/font/css/materialdesignicons.css'
import '@/styles/main.scss'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

// Vuetify
import { createVuetify } from 'vuetify'

export default createVuetify({
  components,
  directives,
  theme: {
    themes: {
      light: {
        colors: {
          primary: "#a5a6f6", // D6DDF7
          secondary: "#F5F7FD",
          accent: "#E7EBFA"
        }
      },
      dark: {

      }
    }
  }
})
