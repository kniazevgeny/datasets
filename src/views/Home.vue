<template lang="pug">
v-row.pt-12
  v-flex(xs1)
  v-flex.text-left(xs10)
    #first(style='height: 50vh')
      h1#service-name.sf.text-md-h2.text-sm-h3 ProDDG
      #service-slogan
        h5.sf.text-md-h5.text-sm-h6(style='display: inline-block') ProDDG is a web-service for developers, assessors and users of tools for predicting the effect of protein mutations. ProDDG provides all datasets on protein stability changes upon mutations (∆∆G) that were used for training, testing, and assessment of popular ∆∆G predictors. ProDDG allows you to access and analyze ∆∆G data, compile leakage-free datasets for evaluating predictors, and discover the latest and most accurate ∆∆G predictors.
    ServiceDescription(itemsPath='proddgLanding')
        //- span.d-flex.mt-11(
        //-   :style='$vuetify.breakpoint.mobile ? "flex-direction: column" : "flex-direction: row"'
        //- )
        //-   v-btn#contact.no-scale(
        //-     @click='$router.push("/proddg/browse")',
        //-     text,
        //-     x-large,
        //-     dark,
        //-     depressed
        //-   )
        //-     span.sf.font-weight-regular Visit ProDDG service
        //-     v-icon.pl-2 mdi-arrow-right-circle
        //-   p.pl-xs-0.pl-sm-8.pt-1.v-text
        //-     span Browse mutations
        //-     br
        //-     span and analyze datasets
    
</template>
<script lang="ts">
import { Action } from '@/models/Action'
import Vue from 'vue'
import Component from 'vue-class-component'
import { namespace } from 'vuex-class'

import ServiceDescription from '@/components/ServiceDescription.vue'

const ActionStore = namespace('ActionStore')

@Component({
  components: {
    ServiceDescription: ServiceDescription
  }
})
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
#service-name {
    font-style: normal;
    font-weight: 700;
    font-size: 40px;
    line-height: 127%;
    /* identical to box height, or 51px */

    display: flex;
    align-items: center;
    text-align: center;
    letter-spacing: -0.02em;

    color: var(--v-text);
}

#service-slogan {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-content: center;
    align-self: center;
    /* align-items: center; */
    height: 60vh;
    font-size: 28px;
}

#service-slogan > h5 {
    white-space: pre-line;
    font-style: normal;
    font-weight: 400;
    line-height: 115%;
    /* or 74px */

    display: flex;
    align-items: center;
    letter-spacing: 0.02em;

    color: var(--v-text);

    text-shadow: -2px 2px 8px rgba(0, 0, 0, 0.18);
}
#service-slogan > h5 > a {
  text-shadow: none;
}
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

a#greeting-btn:hover {
  color: white !important;
  text-decoration: none;

}
</style>
