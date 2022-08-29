<template lang="pug">
.about
  h1 {{ $t('notFound') }}
  router-link.underline(to="/datasets") Home page
</template>

<script lang="ts">
import { Vue } from 'vue-class-component'
export default class NotFound extends Vue {  
  
  mounted() {
  }
}
</script>
