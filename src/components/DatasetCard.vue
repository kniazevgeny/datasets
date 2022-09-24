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
        @mouseDown.middle='$router.push(`/datasets/datasets/${_id}`)'
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
        span.pr-2 Original predictor: {{ originalPredictor }}
        span.pr-2 -
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
        span.pr-2(v-if='typeof author == "string"') Author: {{ author }}
        span.pr-2(v-if='typeof author == "string"') -
        span.pr-2(v-if='typeof year == "number"') {{ year }}
        span.pr-2(v-if='typeof year == "number"') -
        a.pr-2(v-if='typeof doi == "string"', :href='doi', target="_blank") doi
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import DatasetOverview from '../views/DatasetOverview.vue'

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
  },
  components: {
    DatasetOverview
  }
})
export default class DatasetCard extends Vue {
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

  dialog = false

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
