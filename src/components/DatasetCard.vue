<template lang="pug">
v-card
  v-card-title {{ title }}

</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'

@Options({
  props: {
    title: String,
  },
})
export default class Datasets extends Vue {
  title!: String
}
</script>

<style scoped></style>
