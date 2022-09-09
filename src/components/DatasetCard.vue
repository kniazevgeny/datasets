<template lang="pug">
v-card(flat outlined)
  v-card-title(@click='$router.push(`/datasets/datasets/${_id}`)').link {{ title }}
  v-card-subtitle(v-if='typeof source == "string"').text-left Source: {{ source }}
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
        a.pr-2(v-if='typeof doi == "string"' :href="doi") doi
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
})
export default class Datasets extends Vue {
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
}
</script>

<style scoped></style>
