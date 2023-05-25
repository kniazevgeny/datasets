<template lang="pug">
v-app-bar.ml-4.mr-4(color='background', flat, height=60)
  v-btn-toggle.pb-0(ref='navToggle', v-model='toggle', background-color='accent', dense, style='min-width: fit-content;')
    v-btn(
      icon,
      height=36,
      rounded,
      @click='$router.push(`/proddg?type=click&btn_id=navbar_browse&timestamp=${Date.now()}`)'
    ) 
      v-icon(color='text') mdi-home-outline
    v-btn.px-3(
      text,
      min-height=36,
      rounded,
      @click='$router.push(`/proddg/browse?type=click&btn_id=navbar_browse&timestamp=${Date.now()}`)'
    ) 
      router-link.no-link-decoration(to='/proddg/browse') browse mutations
    v-btn.px-3(
      text,
      min-height=36,
      rounded,
      @click='$router.push(`/proddg/datasets?type=click&btn_id=navbar_datasets&timestamp=${Date.now()}`)'
    ) 
      router-link.no-link-decoration(to='/proddg/datasets') datasets
    v-btn.px-3(
      text,
      min-height=36,
      rounded,
      @click='$router.push(`/proddg/predictors?type=click&btn_id=navbar_predictors&timestamp=${Date.now()}`)'
    ) 
      router-link.no-link-decoration(to='/proddg/predictors') predictors
    v-btn.px-3(
      text,
      min-height=36,
      rounded,
      @click='$router.push(`/proddg/about?type=click&btn_id=navbar_about&timestamp=${Date.now()}`)'
    ) 
      router-link.no-link-decoration(to='/proddg/about') about
  v-spacer()
  ThemeSwitcher.ml-6.mr-4
  v-btn#visit-our-website.no-link-decaration(dark color='primary' to='/') Ivankov Lab
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

    this.$root.$on('route-update', () => {
      this.onRouteChange({}, {})
    })
  }
  
  @Watch('$router')
  onRouteChange(to, from) {
    console.log('route change detected')
    let routes: Array<String> = [
      '/proddg',
      '/proddg/browse',
      '/proddg/datasets',
      '/proddg/predictors',
      '/proddg/about',
    ]
    let path = this.$router.currentRoute.path
    if (path[path.length - 1] === '/') path = path.slice(0, -1)
    this.toggle = routes.indexOf(path)
  }
}
</script>
<style>
.v-toolbar__content {
  width: 100vw;
}
</style>
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
#visit-our-website {
  box-shadow: -2px 2px 8px rgba(0, 0, 0, 0.15);
  border-radius: 8px;
  color: white !important;
  text-decoration: none !important;
}
#visit-our-website > .v-btn__content {
  font-weight: 400;
  font-size: 20px;
  line-height: 24px;
}
</style>
