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
      ) {{ title }}
    v-card.white()
      //- DatasetOverview(:id='_id' @closeDialog='closeDialog')
  v-card-title(v-else)
    a.external-link(:href='externalLink') {{ title }}
    v-icon(small) mdi-open-in-new
  v-card-subtitle.pt-0.text-left(v-if='typeof source == "string"') Source: {{ source }}
  v-card-text
    v-col
      v-row
        span.pr-2 Original predictor: {{ originalPredictor }}
        span.pr-2 -
        span.pr-2(v-if='typeof isOriginal == "boolean"') Origin: {{ isOriginal ? 'original' : 'processed' }}
      v-row
        span.pr-2(v-if='typeof doubled == "boolean"') Doubled: {{ doubled ? 'yes' : 'no' }}
        span.pr-2 -
        span.pr-2(v-if='typeof type == "string"') Type: {{ type }}
      v-row
        span.pr-2 Size: {{ size }}
        span.pr-2 -
        span.pr-2(v-if='typeof proteins == "number"') Proteins: {{ proteins }}
        span.pr-2(v-if='typeof proteins == "number"') -
        a.pr-2(v-if='typeof doi == "string"', :href='doi') doi
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
  props: {
    title: String,
    _id: String,
    externalLink: String,
    originalPredictor: String,
    isOriginal: Boolean,
    size: Number,
    doubled: Boolean,
    source: String,
    type: String,
    proteins: Number,
    doi: String,
  },
  components: {
  }
})
export default class PredictorCard extends Vue {
  title!: String
  _id!: String
  externalLink?: String
  originalPredictor?: String
  isOriginal?: Boolean
  size?: Number
  doubled?: Boolean
  source?: String
  type?: String
  proteins?: Number
  doi?: String

  dialog = false

  closeDialog() {
    this.dialog = false
  }
}
</script>

<style scoped></style>
