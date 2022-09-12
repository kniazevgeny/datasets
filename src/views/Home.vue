<template lang="pug">
v-layout(column style='width: 100vw; min-height: 90vh')
  v-layout.justify-center.align-center(style='height: 70vh')
    v-flex(xs1, sm2)
    v-flex.mt-12(xs10, sm8)
      transition(name='fade', appear, appear-active-class="fade-enter-active")
        v-col(style="flex-wrap: nowrap")
          span.text-h3.indigoA3--text Datasets project&nbsp;
          span.text-h3.black--text – browse mutations and analyze datasets
      v-row.justify-center.pt-3
        p.mt-0.mb-0(style='width: 100%')
          span.font-weight-bold.indigoA3--text Analyze&nbsp;
          span datasets before downloading them, 
        p.mt-0.mb-0(style='width: 100%')
          span.font-weight-bold.indigoA3--text Filter&nbsp;
          span and merge data from different sources,
        p(style='width: 100%') 
          span.font-weight-bold.indigoA3--text Explore&nbsp;
          span state-of-the-art predictors and get datasets for the ranking task 
      v-row.justify-center.pt-12
        v-flex(xs0 sm2)
        v-flex(xs12 sm8)
          v-btn.white--text(
            x-large,
            block,
            color='indigoA3',
            @click='$router.push("/datasets/browse")'
          ) Get Started
        v-flex(xs0 sm2)
    v-flex(xs1, sm2)
  //- v-layout.justify-center.align-center(style='height: 70vh')
  //-   v-flex(xs0, sm2)
  //-   v-flex.mt-12(xs12, sm8)
  //-     p abcde
  //-   v-flex(xs0, sm2)

</template>
<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component
export default class Home extends Vue {
  loaded = false

  mounted() {
    window.setTimeout(() => {
      this.loaded = true
    }, 1000)
  }
}
</script>
<style scoped>
span.text-h3 {
  font-family: 'Alegreya Sans' !important;
  font-weight: 700;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
