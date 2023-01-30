<template lang="pug">
v-footer.mt-12(bottom, padless)
  v-card.lighten-1.text-center(flat, tile, style='width: 100vw')
    v-divider
    v-card-text {{ new Date().getFullYear() }} —
      strong &nbsp;Ivankov Lab
    v-card-text.pt-0
      span Made with ❤️ by&nbsp;
      a(href='https://kniazevgeny.github.io' ) Evgeny Kniazev
      span &nbsp;&&nbsp;
      a(href='https://t.me/igorabramkin') Igor Abramkin
</template>
<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component
export default class CustomFoter extends Vue {}
</script>
<style scoped>
a.no-link-decoration {
  text-decoration: none;
}
.contact-btn > .v-btn__content > span {
  font-size: 14px;
}
</style>
