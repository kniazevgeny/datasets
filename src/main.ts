import '@/tailwind.css'
// import '@/styles/main.scss'
import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router/index'
import { store } from './plugins/store'
// import { i18n } from './plugins/i18n'
import { loadFonts } from './plugins/webfontloader'

loadFonts()

createApp(App)
  .use(router)
  .use(vuetify)
  .use(store)
  // .use(i18n)
  .mount('#app')
