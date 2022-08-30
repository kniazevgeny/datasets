<template lang="pug">
v-app()
  Snackbar
  Navbar
  //- v-img.h-4.aspect-square(alt="Vue logo" :src="require('./assets/logo.png')")
  //- HelloWorld(msg="Welcome to Your Vue.js + TypeScript App")
  router-view.mt-12(v-slot="{ Component }")
    transition(:name="transitionName" mode="out-in")
      component.child-view(:is="Component")
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import { Watch } from 'vue-property-decorator'
import Navbar from './components/Navbar.vue'
import Snackbar from './components/Snackbar.vue'

@Options({
  components: {
    Navbar,
    Snackbar,
  },
})
export default class App extends Vue {
  transitionName: String = 'slide-left'

  @Watch('$route')
  onRouteChange(to, from) {
    let routes: Array<String> = [
      '/datasets',
      '/datasets/browse',
      '/datasets/predictors',
    ]
    let toPath = to.path
    let fromPath = from.path

    // Fix '/' in the end of the line
    if (toPath[toPath.length - 1] === '/') toPath = toPath.slice(0, -1)
    if (fromPath[fromPath.length - 1] === '/') fromPath = fromPath.slice(0, -1)

    // Process reload (F5)
    if (fromPath === '') {
      console.log('empty')
      this.transitionName = 'fade'
      return 1
    }

    let depthTo: Number = routes.indexOf(toPath)
    let depthFrom: Number = routes.indexOf(fromPath)

    // Process 404
    if (depthFrom < 0) depthFrom = 99
    if (depthTo < 0) depthTo = 99

    console.log(typeof fromPath === 'string' && fromPath === '', toPath, depthFrom, depthTo)
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
  margin-top: 60px;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.175s ease-out;
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
.child-view {
  position: absolute;
  transition: all 0.175s cubic-bezier(0.44, 0.05, 0.3, 1);
}
</style>
