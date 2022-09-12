<template lang="pug">
v-layout(column).justify-center.align-center(style='min-height: 90vh')
  h1 {{ $t('notFound') }}
  router-link(to="/datasets") Home page
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component
export default class NotFound extends Vue {  
}
</script>
