<template lang="pug">
v-layout(column, style='width: 100vw; min-height: 90vh')
  v-layout#home-1.justify-center.align-center(
    style='height: 70vh',
    v-intersect='onIntersect'
  )
    v-flex(xs1, sm2)
    v-flex.mt-12(xs10, sm8)
      transition(name='fade', appear, appear-active-class='fade-enter-active')
        v-col(style='flex-wrap: nowrap')
          span.sf.text-h3.black--text ProDDG&nbsp;
          span.text-h3.black--text – browse mutations and analyze datasets
      v-row.justify-center.pt-3
        p.mt-0.mb-0(style='width: 100%')
          span.font-weight-bold Analyze&nbsp;
          span datasets before downloading them,
        p.mt-0.mb-0(style='width: 100%')
          span.font-weight-bold Filter&nbsp;
          span and merge data from different sources,
        p(style='width: 100%') 
          span.font-weight-bold Explore&nbsp;
          span state-of-the-art predictors and get datasets for the ranking task
      v-row.justify-center.pt-12
        v-flex(xs0, sm2)
        v-flex(xs12, sm8)
          v-btn.white--text#greeting-btn(
            x-large,
            block,
            color='primary',
            @click='$router.push(`/proddg/datasets?type=click&btn_id=greeting_btn&timestamp=${Date.now()}`)'
          ) Get Started
        v-flex(xs0, sm2)
    v-flex(xs1, sm2)
  //- v-layout.justify-center.align-center(style='height: 70vh')
  //-   v-flex(xs0, sm2)
  //-   v-flex.mt-12(xs12, sm8)
  //-     p abcde
  //-   v-flex(xs0, sm2)
</template>
<script lang="ts">
import { Action } from '@/models/Action'
import Vue from 'vue'
import Component from 'vue-class-component'
import { namespace } from 'vuex-class'

const ActionStore = namespace('ActionStore')

@Component
export default class Home extends Vue {
  @ActionStore.Mutation pushAction!: (action: object) => void

  loaded = false

  onIntersect(entries, observer) {
    // More information about these options
    // is located here: https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
    // console.log(entries[0])
    if (entries[0].isIntersecting == false) return;
    this.pushAction({
      type: 'intersect',
      page_href: this.$router.currentRoute.path,
      timestamp: Date.now(),
      intersect_id: entries[0].target.id,
    })
  }

  mounted() {
    document.title = "Home page | " + this.$t('title')

    window.setTimeout(() => {
      this.loaded = true
    }, 1000)
  }
}
</script>
<style scoped>
span.text-h3 {
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
