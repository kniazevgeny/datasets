<template lang="pug">
v-card(flat, outlined)
  v-dialog(
    v-model='dialog',
    width='1000',
    v-if='typeof externalLink == "undefined"'
  )
    template(v-slot:activator='{ on, attrs }')
      v-card-title.mb-0.link(
        v-bind='attrs',
        v-on='on',
        @click.middle='$router.push(`/datasets/datasets/${_id}`)'

        :class='fileName ? "" : "v-btn--disabled disabled"'
      ) {{ name }}
    v-card.white()
      DatasetOverview(:id='_id' :name='name' :fileName='fileName' @closeDialog='closeDialog')
  v-card-title(v-else)
    a.external-link(:href='externalLink') {{ name }}
    v-icon(small) mdi-open-in-new
  v-card-subtitle.pt-0.text-left(v-if='typeof source == "string"') Source: {{ source }}
  v-card-text
    v-col
      v-row
        span.pr-2(v-if='typeof origin == "string"') Origin: {{ origin }}
      v-row
        span.pr-2(v-if='typeof symmetrized == "boolean"') Symmetrized: {{ symmetrized ? 'yes' : 'no' }}
        span.pr-2 -
        span.pr-2(v-if='typeof mutations == "string"') Mutations: {{ mutations }}
      v-row
        span.pr-2 Size: {{ size }}
        span.pr-2 -
        span.pr-2(v-if='typeof proteins == "number"') Proteins: {{ proteins }}
        span.pr-2(v-if='typeof proteins == "number"') -
        a.pr-2(v-if='typeof doi == "string"', :href='doi', target="_blank").text-left {{reference}}
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import DatasetOverview from '../views/DatasetOverview.vue'
import { namespace } from 'vuex-class'

const ActionStore = namespace('ActionStore')

@Component({
  props: {
    name: String,
    _id: String,
    fileName: String,
    externalLink: String,
    originalPredictor: String,
    origin: String,
    size: Number,
    symmetrized: Boolean,
    available: Boolean,
    source: String,
    mutations: String,
    proteins: Number,
    year: Number,
    author: String,
    doi: String,
    reference: String,
  },
  components: {
    DatasetOverview
  }
})
export default class DatasetCard extends Vue {
  @ActionStore.Mutation pushAction!: (action: object) => void

  name!: String
  _id!: String
  fileName?: String
  externalLink?: string
  originalPredictor?: String
  origin?: String
  size?: Number
  symmetrized?: Boolean
  available?: Boolean
  source?: String
  mutations?: String
  proteins?: Number
  year?: Number
  author?: string
  doi?: String
  reference?: String

  dialog = false

  openDatasetOverview() {
    this.pushAction({
      type: 'click',
      timestamp: Number(Date.now()),
      btn_id: '#open-dataset-overview',
      page_href: this.$router.currentRoute.path,
    })
  }

  closeDialog() {
    this.dialog = false
  }
}
</script>

<style scoped>
  .disabled {
    filter: grayscale(1)
  }
</style>
