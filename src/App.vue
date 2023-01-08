<template lang="pug">
v-app(:dark='dark', :style='cssProps', style='height: 100%')
  Snackbar
  v-layout.Cookie.Cookie--bottom
    v-flex(xs1, sm2, md4)
    v-flex(xs10, sm8, md4)
      CookieLaw.pa-3.pl-5.pr-5(
        :buttonText='$t("cookieButton")',
        :message='$t("cookieMessage")',
        style='position: relative',
        buttonClass='v-btn v-btn__content v-btn--outlined theme--dark elevation-2 v-btn--block'
      )
    v-flex(xs1, sm2, md4)
  //- v-img.h-4.aspect-square(alt="Vue logo" :src="require('./assets/logo.png')")
  transition(name='fade')
    router-view.view
  CustomFooter
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Watch } from 'vue-property-decorator'
import Snackbar from './components/Snackbar.vue'
import CustomFooter from './components/CustomFooter.vue'

import CookieLaw from 'vue-cookie-law'
import { i18n } from '@/plugins/i18n'
import { namespace } from 'vuex-class'
import { User } from '@/models/User'

const AppStore = namespace('AppStore')
const SnackbarStore = namespace('SnackbarStore')

@Component({
  components: {
    Snackbar,
    CustomFooter,
    CookieLaw,
  },
})
export default class App extends Vue {
  @AppStore.State dark!: boolean
  @AppStore.State user!: User | undefined
  @AppStore.Mutation setUser!: (user: User) => void
  @SnackbarStore.Mutation hideSnackbar!: () => void

  get cssProps() {
    var themeColors = {}
    Object.keys(
      this.$vuetify.theme.themes[this.$vuetify.theme.dark ? 'dark' : 'light']
    ).forEach((color) => {
      themeColors[`--v-${color}`] = this.$vuetify.theme.themes[
        this.$vuetify.theme.dark ? 'dark' : 'light'
      ][color]
    })
    return themeColors
  }

  get newUid() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2)
  }

  setOrGetUid() {
    if (typeof this.user == 'undefined') {
      const uid: string = this.newUid
      this.setUser({ _id: uid })
    }
  }

  fixRandomMarginRight() {
    let root = document.getElementsByTagName('html')[0]
    root.style.position = 'fixed'
    window.setTimeout(() => {
      root.style.position = ''
    }, 25)
  }

  mounted() {
    ;(this.$vuetify.theme as any).dark = this.dark
    document.getElementsByTagName('html')[0].classList.remove(!this.dark ? 'theme--dark' : 'theme--light')
    document.getElementsByTagName('html')[0].classList.add(this.dark ? 'theme--dark' : 'theme--light')
    
    this.setOrGetUid()
    this.fixRandomMarginRight()
  }

  @Watch('$route')
  onRouteChenge() {
    this.fixRandomMarginRight()
  }
}
</script>

<style>
#app {
  /* font-family: Inter, Avenir, Helvetica, Arial, sans-serif; */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  /* color: #2c3e50; */
  height: 100%;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.view {
  transition: all 0.175s cubic-bezier(0.44, 0.05, 0.3, 1);
}
</style>
