<template lang="pug">
v-app-bar(absolute, elevation='1')
  v-btn-toggle.mb-0.pb-0(ref='navToggle', v-model='toggle', active-class='bg-primary')
    v-btn(text, rounded, @click='$router.push("/datasets/")') datasets
    v-btn(text, @click='$router.push("/datasets/browse")') browse
    v-btn(text, @click='$router.push("/datasets/predictors")') predictors
</template>
<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Watch } from 'vue-property-decorator'

@Component
export default class Navbar extends Vue {
  toggle = 0

  @Watch('$route')
  onRouteChange(to, from) {
    let routes: Array<String> = [
      '/datasets',
      '/datasets/browse',
      '/datasets/predictors',
    ]
    let path = this.$router.currentRoute.path
    if (path[path.length - 1] === '/') path = path.slice(0, -1)
    this.toggle = routes.indexOf(path)
  }
}
</script>
