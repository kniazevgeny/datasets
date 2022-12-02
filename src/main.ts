import '@/tailwind.css'
import '@/styles/main.scss'
import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router/'
import store from '@/store'
import { i18n } from '@/plugins/i18n'
import vuetify from '@/plugins/vuetify'
import { loadFonts } from '@/plugins/webfontloader'
import VueWorker from 'vue-worker'
Vue.use(VueWorker)

loadFonts()

Vue.config.productionTip = true

new Vue({
  router,
  store,
  i18n,
  vuetify,
  render: (h) => h(App),
}).$mount('#app')