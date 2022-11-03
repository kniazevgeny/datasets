<template lang="pug">
v-app-bar(fixed, color='#fff', flat, height=60)
  v-btn-toggle.mb-n2.pb-0(ref='navToggle', v-model='toggle')
    v-btn(icon, x-large, :disabled='toggle == 0', rounded, @click='$router.push(`/datasets?type=click&btn_id=navbar_browse&timestamp=${Date.now()}`)') 
      v-icon() mdi-home
    v-btn(text, x-large, :disabled='toggle == 1', rounded, @click='$router.push(`/datasets/browse?type=click&btn_id=navbar_browse&timestamp=${Date.now()}`)') 
      a.no-link-decoration(href='/datasets/browse') browse mutations
    v-btn.ml-2(text, x-large, :disabled='toggle == 2', @click='$router.push(`/datasets/datasets?type=click&btn_id=navbar_datasets&timestamp=${Date.now()}`)') 
      a.no-link-decoration(href='/datasets/datasets') datasets
    v-btn.ml-2(text, x-large, :disabled='toggle == 3', @click='$router.push(`/datasets/predictors?type=click&btn_id=navbar_predictors&timestamp=${Date.now()}`)') 
      a.no-link-decoration(href='/datasets/predictors') predictors
</template>
<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Watch } from 'vue-property-decorator'

@Component
export default class Navbar extends Vue {
  toggle = 0

  mounted() {
    this.onRouteChange({}, {})
  }

  @Watch('$route')
  onRouteChange(to, from) {
    let routes: Array<String> = [
      '/datasets',
      '/datasets/browse',
      '/datasets/datasets',
      '/datasets/predictors',
    ]
    let path = this.$router.currentRoute.path
    if (path[path.length - 1] === '/') path = path.slice(0, -1)
    this.toggle = routes.indexOf(path)
  }
}
</script>
<style scoped>
button:not(.v-btn--disabled) > span > a.no-link-decoration {
  color: #000 !important;
  text-decoration: none !important;
}
button.v-btn--disabled > span > a.no-link-decoration {
  color: rgba(0, 0, 0, 0.4) !important;
  text-decoration: none !important;
}
a.no-link-decoration:hover {
  color: #000;
}
</style>