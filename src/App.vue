<template lang="pug">
v-app(:style='cssProps', style='height: 100%')
  Navbar
  Snackbar
  v-layout.Cookie.Cookie--bottom()
    v-flex(xs1 sm2 md4)
    v-flex(xs10 sm8 md4)
      CookieLaw(
        :buttonText='$t("cookieButton")',
        :message='$t("cookieMessage")',
        style='position: relative',
        buttonClass='v-btn v-btn__content v-btn--outlined theme--dark elevation-2 v-btn--block'
      ).pa-3.pl-5.pr-5
    v-flex(xs1 sm2 md4)
  //- v-img.h-4.aspect-square(alt="Vue logo" :src="require('./assets/logo.png')")
  //- HelloWorld(msg="Welcome to Your Vue.js + TypeScript App")
  transition(:name='transitionName')
    router-view.view.mt-12.pt-12(fluid)
  CustomFooter
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Watch } from 'vue-property-decorator'
import Navbar from './components/Navbar.vue'
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
    Navbar,
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

  transitionName: String = 'slide-left'

  get cssProps() {
    var themeColors = {}
    Object.keys(this.$vuetify.theme.themes.light).forEach((color) => {
      themeColors[`--v-${color}`] = this.$vuetify.theme.themes.light[color]
    })
    return themeColors
  }

  get newUid() {
    // first 8 chars represent date
    return Date.now().toString(36) + Math.random().toString(36).substr(2)
  }

  setOrGetUid() {
    if (typeof this.user == 'undefined') {
      const uid: string = this.newUid
      this.setUser({ _id: uid })
      // console.log(`set user with id ${this.user._id}`)
    }
    // else console.log(`identified user with id ${this.user._id}`)
  }

  mounted() {
    this.setOrGetUid()
  }

  @Watch('$route')
  onRouteChange(to, from) {
    let routes: Array<String> = [
      '/datasets', // for animation to work correctly
      '/datasets/browse',
      '/datasets/datasets',
      '/datasets/predictors',
    ]
    let toPath = to.path
    let fromPath = from.path

    // Fix '/' in the end of the line
    if (toPath[toPath.length - 1] === '/') toPath = toPath.slice(0, -1)
    if (fromPath[fromPath.length - 1] === '/') fromPath = fromPath.slice(0, -1)

    // Process reload (F5)
    if (fromPath === '') {
      // console.log('empty')
      this.transitionName = 'fade'
      return 1
    }

    let depthTo: Number = routes.indexOf(toPath)
    let depthFrom: Number = routes.indexOf(fromPath)

    // Process 404
    if (depthFrom < 0) depthFrom = 99
    if (depthTo < 0) depthTo = 99

    // console.log(fromPath, toPath, depthFrom, depthTo)
    this.transitionName = depthTo < depthFrom ? 'slide-right' : 'slide-left'
  }
}
</script>

<style>
#app {
  /* font-family: Inter, Avenir, Helvetica, Arial, sans-serif; */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
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

.slide-left-enter,
.slide-right-leave-active,
.slide-left-enter-active {
  opacity: 0;
  -webkit-transform: translate(100px, 0);
  transform: translate(100px, 0);
}
.slide-left-leave-active,
.slide-right-enter,
.slide-right-enter-active {
  opacity: 0;
  -webkit-transform: translate(-100px, 0);
  transform: translate(-100px, 0);
}
.view {
  transition: all 0.175s cubic-bezier(0.44, 0.05, 0.3, 1);
}
</style>
