<template lang="pug">
v-layout
  v-navigation-drawer(width="420" permanent)
    //- Filters
    span.text-h5.font-weight-bold Filters!
    v-list(two-lines color="transparent")
      v-list-item(title="Origin" subtitle="Original - compiled from scratch. Processed - processed original dataset.") 
        v-list-content() smth here
      v-list-item(title="Size")
      v-list-item(title="Doubled")
      v-list-item(title="Source")
      v-list-item(title="Type")
      v-list-item(title="Proteins")
  router-link.underline(to="/datasets/about") aaaa
  v-spacer
  h1.float-right abc
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'

@Options({
  props: {},
})
export default class HelloWorld extends Vue {
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
</style>
