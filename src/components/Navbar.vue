<template lang="pug">
v-app-bar(absolute elevation="1")
  v-btn-toggle.mb-0.pb-0(v-model="toggle" selected-class="bg-primary")
    v-btn(flat rounded @click="$router.push('/datasets/')") datasets
    v-btn(flat @click="$router.push('/datasets/browse')") browse
    v-btn(flat @click="$router.push('/datasets/predictors')") predictors
</template>
<script lang="ts">
import { Options, Vue } from 'vue-class-component'
export default class Navbar extends Vue {

  get toggle() {
    let routes:Array<String> = ["/datasets", "/datasets/browse", "/datasets/predictors"]
    let path = this.$router.currentRoute.value.path
    if (path[path.length-1] === "/") 
      path = path.slice(0,-1)
    return routes.indexOf(path)
  }

}
</script>
