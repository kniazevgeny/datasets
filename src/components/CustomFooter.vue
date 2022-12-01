<template lang="pug">
v-footer(dark bottom padless).mt-12
  v-card.lighten-1.white--text.text-center(flat, tile, style='width: 100vw')
    v-card-text
      a(href="https://t.me/kniazevgeny")
        v-btn.mx-4.white--text(@click='')
          v-img(:src='require("@/assets/telegram.svg")')
          span &nbsp;&nbsp;Contact Us
    v-card-text.white--text.pt-0.pb-0 A Skoltech project 
    v-card-text.white--text.pt-0 Made with ❤️ by kniazevgeny
    v-divider
    v-card-text.white--text {{ new Date().getFullYear() }} —
      strong &nbsp;Datasets Project 
</template>
<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component
export default class CustomFoter extends Vue {}
</script>
