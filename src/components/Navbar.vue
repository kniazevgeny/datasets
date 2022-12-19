<template lang="pug">
v-app-bar(fixed, flat, height=60)
  v-btn-toggle.mb-n2.pb-0(ref='navToggle', v-model='toggle')
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
  button.vt-switch.vt-switch-appearance(
    type='button',
    role='switch',
    aria-label='Toggle dark mode',
    @click='toggleMode'
  )
    span.vt-switch-check
      span.vt-switch-icon
        svg.vt-switch-appearance-sun(
          xmlns='http://www.w3.org/2000/svg',
          aria-hidden='true',
          focusable='false',
          viewBox='0 0 24 24',
          :style='$vuetify.theme.dark ? "opacity: 0" : "opacity: 1"'
        )
          path(
            d='M12,18c-3.3,0-6-2.7-6-6s2.7-6,6-6s6,2.7,6,6S15.3,18,12,18zM12,8c-2.2,0-4,1.8-4,4c0,2.2,1.8,4,4,4c2.2,0,4-1.8,4-4C16,9.8,14.2,8,12,8z'
          )
          path(
            d='M12,4c-0.6,0-1-0.4-1-1V1c0-0.6,0.4-1,1-1s1,0.4,1,1v2C13,3.6,12.6,4,12,4z'
          )
          path(
            d='M12,24c-0.6,0-1-0.4-1-1v-2c0-0.6,0.4-1,1-1s1,0.4,1,1v2C13,23.6,12.6,24,12,24z'
          )
          path(
            d='M5.6,6.6c-0.3,0-0.5-0.1-0.7-0.3L3.5,4.9c-0.4-0.4-0.4-1,0-1.4s1-0.4,1.4,0l1.4,1.4c0.4,0.4,0.4,1,0,1.4C6.2,6.5,5.9,6.6,5.6,6.6z'
          )
          path(
            d='M19.8,20.8c-0.3,0-0.5-0.1-0.7-0.3l-1.4-1.4c-0.4-0.4-0.4-1,0-1.4s1-0.4,1.4,0l1.4,1.4c0.4,0.4,0.4,1,0,1.4C20.3,20.7,20,20.8,19.8,20.8z'
          )
          path(
            d='M3,13H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h2c0.6,0,1,0.4,1,1S3.6,13,3,13z'
          )
          path(
            d='M23,13h-2c-0.6,0-1-0.4-1-1s0.4-1,1-1h2c0.6,0,1,0.4,1,1S23.6,13,23,13z'
          )
          path(
            d='M4.2,20.8c-0.3,0-0.5-0.1-0.7-0.3c-0.4-0.4-0.4-1,0-1.4l1.4-1.4c0.4-0.4,1-0.4,1.4,0s0.4,1,0,1.4l-1.4,1.4C4.7,20.7,4.5,20.8,4.2,20.8z'
          )
          path(
            d='M18.4,6.6c-0.3,0-0.5-0.1-0.7-0.3c-0.4-0.4-0.4-1,0-1.4l1.4-1.4c0.4-0.4,1-0.4,1.4,0s0.4,1,0,1.4l-1.4,1.4C18.9,6.5,18.6,6.6,18.4,6.6z'
          )
        svg.vt-switch-appearance-moon(
          xmlns='http://www.w3.org/2000/svg',
          aria-hidden='true',
          focusable='false',
          viewBox='0 0 24 24',
          :style='$vuetify.theme.dark ? "opacity: 1" : "opacity: 0"'
        )
          path(
            d='M12.1,22c-0.3,0-0.6,0-0.9,0c-5.5-0.5-9.5-5.4-9-10.9c0.4-4.8,4.2-8.6,9-9c0.4,0,0.8,0.2,1,0.5c0.2,0.3,0.2,0.8-0.1,1.1c-2,2.7-1.4,6.4,1.3,8.4c2.1,1.6,5,1.6,7.1,0c0.3-0.2,0.7-0.3,1.1-0.1c0.3,0.2,0.5,0.6,0.5,1c-0.2,2.7-1.5,5.1-3.6,6.8C16.6,21.2,14.4,22,12.1,22zM9.3,4.4c-2.9,1-5,3.6-5.2,6.8c-0.4,4.4,2.8,8.3,7.2,8.7c2.1,0.2,4.2-0.4,5.8-1.8c1.1-0.9,1.9-2.1,2.4-3.4c-2.5,0.9-5.3,0.5-7.5-1.1C9.2,11.4,8.1,7.7,9.3,4.4z'
          )

    //- v-switch(inset, icon, color='grey', )
      //- v-icon(small) mdi-white-balance-sunny
      //- v-icon(small) mdi-weather-night
</template>
<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Watch } from 'vue-property-decorator'

import { namespace } from 'vuex-class'
const AppStore = namespace('AppStore')

@Component
export default class Navbar extends Vue {
  @AppStore.State dark!: boolean
  @AppStore.Mutation setDark!: (dark: boolean) => void

  toggle = 0

  toggleMode() {
    this.setDark(!this.dark)
    ;(this.$vuetify.theme as any).dark = this.dark
  }

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
.vt-switch {
  position: relative;
  border-radius: 20px;
  display: block;
  width: 72px;
  height: 36px;
  flex-shrink: 0;
  border: 1px solid var(--vt-c-divider);
  transition: border-color 0.25s, background-color 0.25s;
}
.vt-switch-check {
  position: absolute;
  top: 1px;
  left: 1px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  box-shadow: var(--vt-shadow-1);
  transition: background-color 0.25s, transform 0.25s;
}
.theme--dark .vt-switch-check {
  background-color: #1c1c1c;
}
.theme--dark .vt-switch {
  background-color: #424242;
}
.theme--light .vt-switch {
  background-color: #d9d9d9;
}
.theme--light .vt-switch-check {
  background-color: #fff;
}

.vt-switch-icon {
  position: relative;
  display: block;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  overflow: hidden;
}
.vt-switch-icon svg {
  position: absolute;
  top: 4px;
  left: 4px;
  width: 24px;
  height: 24px;
}
.theme--dark .vt-switch-appearance .vt-switch-check {
  transform: translate(36px);
}
.theme--dark .vt-switch-icon svg {
  fill: darkslateblue;
  transition: opacity 0.25s, fill 0.25s;
}
.theme--light .vt-switch-icon svg {
  fill: burlywood;
  transition: opacity 0.25s, fill 0.25s;
}
</style>
