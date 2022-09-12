<template lang="pug">
v-app-bar(absolute, color='iris60', flat, height=60)
  v-btn-toggle.mb-n2.pb-0(ref='navToggle', v-model='toggle', background-color='#ddd' active-class='bg-primary')
    v-btn(text, x-large, rounded, @click='$router.push("/datasets/browse")') browse
    v-btn(text, x-large, @click='$router.push("/datasets/datasets")') datasets
    v-btn(text, x-large, @click='$router.push("/datasets/predictors")') predictors
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
