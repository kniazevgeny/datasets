<template lang="pug">
v-app-bar(fixed, color='#fff', flat, height=60)
  v-btn-toggle.mb-n2.pb-0(ref='navToggle', v-model='toggle')
    v-btn(icon, x-large, rounded, @click='$router.push(`/proddg?type=click&btn_id=navbar_browse&timestamp=${Date.now()}`)') 
      v-icon() mdi-home
    v-btn(text, x-large, rounded, @click='$router.push(`/proddg/browse?type=click&btn_id=navbar_browse&timestamp=${Date.now()}`)') 
      a.no-link-decoration(href='/proddg/browse') browse mutations
    v-btn.ml-2(text, x-large, rounded, @click='$router.push(`/proddg/datasets?type=click&btn_id=navbar_datasets&timestamp=${Date.now()}`)') 
      a.no-link-decoration(href='/proddg/datasets') datasets
    v-btn.ml-2(text, x-large, rounded, @click='$router.push(`/proddg/predictors?type=click&btn_id=navbar_predictors&timestamp=${Date.now()}`)') 
      a.no-link-decoration(href='/proddg/predictors') predictors
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
      '/proddg',
      '/proddg/browse',
      '/proddg/datasets',
      '/proddg/predictors',
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