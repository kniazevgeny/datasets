<template lang="pug">
v-card
  v-card-title {{ title }}

</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
  props: {
    title: String,
  },
})
export default class Datasets extends Vue {
  title!: String
}
</script>

<style scoped></style>
