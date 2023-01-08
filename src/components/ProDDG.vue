<template lang="pug">
div
  Navbar
  transition(:name='transitionName')
    router-view.view.mt-12.pt-12.ml-4.pr-4(fluid)
</template>
<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Watch } from 'vue-property-decorator'
import Navbar from './Navbar.vue'

@Component({
  components: { Navbar },
})
export default class ProDDG extends Vue {
  transitionName: String = 'slide-left'

  @Watch('$route')
  onRouteChange(to, from) {
    let routes: Array<String> = [
      '/proddg', // for animation to work correctly
      '/proddg/browse',
      '/proddg/datasets',
      '/daproddgtasets/predictors',
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
</style>