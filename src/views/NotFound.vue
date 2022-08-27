<template lang="pug">
.about
  h1 {{ $t('notFound') }}
  router-link.underline.text-sky-600(class="hover:text-blue-400" to="/") Home page
</template>

<script lang="ts">
import { Vue } from 'vue-class-component'
export default class NotFound extends Vue {  
  
  mounted() {
  }
}
</script>
