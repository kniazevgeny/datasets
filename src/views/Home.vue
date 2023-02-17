<template lang="pug">
v-row
  v-flex(xs1)
  v-flex.text-left(xs10).mt-n12
    ServiceDescription(itemsPath='proddgLanding')
    
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
