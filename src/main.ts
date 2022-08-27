import '@/tailwind.css'
// import '@/styles/main.scss'
import { createApp } from 'vue'
import App from './App.vue'
import { i18n } from './plugins/i18n'
import router from './router/index'
import vuetify from './plugins/vuetify'
import { store } from './plugins/store'
import { loadFonts } from './plugins/webfontloader'

loadFonts()

createApp(App)
  .use(i18n)
  .use(router)
  .use(vuetify)
  .use(store)
  .mount('#app')
