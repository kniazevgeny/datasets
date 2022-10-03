<template lang="pug">
v-layout.justify-center.align-center(column style='min-height: 90vh')
  h1.font-accent Ivankovlab
  router-link(to='/datasets') Datasets project
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component
export default class Root extends Vue {}
</script>
