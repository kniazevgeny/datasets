<template lang="pug">
v-app-bar(absolute, color='#fff', flat, height=60)
  v-btn-toggle.mb-n2.pb-0(ref='navToggle', v-model='toggle')
    v-btn(text, x-large, disabled, rounded, @click='$router.push(`/datasets/browse?type=click&btn_id=navbar_browse&timestamp=${Date.now()}`)') browse mutations
    v-btn.ml-2(text, x-large, :disabled='toggle == 1', @click='$router.push(`/datasets/datasets?type=click&btn_id=navbar_datasets&timestamp=${Date.now()}`)') datasets
    v-btn.ml-2(text, x-large, disabled, @click='$router.push(`/datasets/predictors?type=click&btn_id=navbar_predictors&timestamp=${Date.now()}`)') predictors
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
