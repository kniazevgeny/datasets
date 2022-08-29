<template lang="pug">
v-app()
  Snackbar
  Navbar
  //- v-img.h-4.aspect-square(alt="Vue logo" :src="require('./assets/logo.png')")
  //- HelloWorld(msg="Welcome to Your Vue.js + TypeScript App")
  router-view.mt-12(v-slot="{ Component }")
    transition(name="fade" mode="out-in")
      component(:is="Component")
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import Navbar from './components/Navbar.vue'
import Snackbar from './components/Snackbar.vue'

@Options({
  components: {
    Navbar,
    Snackbar,
  },
})
export default class App extends Vue {}
</script>

<style>
#app {
  /* font-family: Inter, Avenir, Helvetica, Arial, sans-serif; */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.175s ease-out;
}
</style>
