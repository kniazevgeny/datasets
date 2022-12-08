<template lang="pug">
v-layout.justify-center.align-center(column style='min-height: 90vh')
  h1.font-accent {{ $t('notFound') }}
  router-link(to="/proddg") ProDDG project
  router-link(to="/") About Ivankov Lab
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component
export default class NotFound extends Vue {  
}
</script>
