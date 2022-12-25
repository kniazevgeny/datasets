<template lang="pug">
v-app-bar(color='background', fixed, flat, height=60)
  v-btn-toggle.mb-n2.pb-0(ref='navToggle', v-model='toggle', background-color='accent')
    v-btn(
      icon,
      x-large,
      rounded,
      @click='$router.push(`/proddg?type=click&btn_id=navbar_browse&timestamp=${Date.now()}`)'
    ) 
      v-icon(color='text') mdi-home-outline
    v-btn(
      text,
      x-large,
      rounded,
      @click='$router.push(`/proddg/browse?type=click&btn_id=navbar_browse&timestamp=${Date.now()}`)'
    ) 
      a.no-link-decoration(href='/proddg/browse') browse mutations
    v-btn.ml-2(
      text,
      x-large,
      rounded,
      @click='$router.push(`/proddg/datasets?type=click&btn_id=navbar_datasets&timestamp=${Date.now()}`)'
    ) 
      a.no-link-decoration(href='/proddg/datasets') datasets
    v-btn.ml-2(
      text,
      x-large,
      rounded,
      @click='$router.push(`/proddg/predictors?type=click&btn_id=navbar_predictors&timestamp=${Date.now()}`)'
    ) 
      a.no-link-decoration(href='/proddg/predictors') predictors
  v-spacer 
  ThemeSwitcher
</template>
<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Watch } from 'vue-property-decorator'

import ThemeSwitcher from './ThemeSwitcher.vue'

@Component({
  components: {
    ThemeSwitcher
  }
})
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
.v-btn-toggle > .v-btn--active::before {
  opacity: 0;
}
.v-btn-toggle > button.v-btn, .v-btn-toggle > button > span > a {
  color: var(--v-text);
  font-weight: 400;
  opacity: 1;
}
.v-btn-toggle >.v-btn--active > span > a {
  color: var(--v-primary);
}
button:not(.v-btn--disabled) > span > a.no-link-decoration {
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
