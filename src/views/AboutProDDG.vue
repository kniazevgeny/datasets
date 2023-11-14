<template lang="pug">
v-row
  v-flex(xs1)
  v-flex.text-left(xs10).mt-n12
    ServiceDescription(itemsPath='proddgAbout')
        
</template>
<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { namespace } from 'vuex-class'

import ServiceDescription from '@/components/ServiceDescription.vue'

@Component({
  components: {
    ServiceDescription: ServiceDescription
  }
})
export default class AboutProDDG extends Vue {
  created() {
    document.title = 'About | ' + this.$t('title')
    ;(document.querySelector(
      'meta[name="description"]'
    ) as HTMLElement).setAttribute(
      'content',
      this.$t('laboratorySlogan') as string
    )
  }
}
</script>