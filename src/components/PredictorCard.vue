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
  v-card-text.pt-0
    v-col
      v-row
        a.pr-2.text-left(v-if='typeof doi == "string"', :href='doi') {{reference}}
      v-row.pt-2
        span.pr-2 Input: {{ input }}
        span.pr-2 -
        span.pr-2 Algorithm: {{ algorithm_0 }}
        span.pr-2(v-if='typeof algorithm_1 == "string"') {{ algorithm_1 }}
      v-row.pt-2
        span.pr-2(v-if='typeof meta == "boolean"') Meta-predictor: {{ meta ? 'yes' : 'no' }}
        span.pr-2 -
        span.pr-2(v-if='typeof multiple_point_mutations == "boolean"') Muptilpe-point mutations: {{ multiple_point_mutations ? 'yes' : 'no' }}
        span.pr-2 -
        span.pr-2(v-if='typeof complexes == "boolean"') Mutations in protein complexes: {{ complexes ? 'yes' : 'no' }}
        span.pr-2 -
        span.pr-2(v-if='typeof T == "boolean"') Setting temperature: {{ T ? 'yes' : 'no' }}
        span.pr-2 -
        span.pr-2(v-if='typeof ph == "boolean"') Setting pH: {{ ph ? 'yes' : 'no' }}
      v-row.pt-2
        span.pr-2(v-if='typeof cv == "string"') Validation procedure: {{ cv }}
        span.pr-2 -
        span.pr-2(v-if='typeof hrm_dataset == "boolean"') Symmetrized training set: {{ hrm_dataset ? 'yes' : 'no' }}
        span.pr-2 -
        span.pr-2(v-if='typeof hrm_check == "boolean"') Reverse mutation check: {{ hrm_check ? 'yes' : 'no' }}
      v-row.pt-2
        span.pr-2(v-if='typeof compared_tools == "string"').text-left Compared to predictors: {{ compared_tools }}
        span.pr-2 -
        span.pr-2(v-if='typeof metrics == "string"') Comparison metrics: {{ metrics }}
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
  props: {
    title: String,
    _id: String,
    input: String,
    algorithm_0: String,
    algorithm_1: String,
    datasets: Object,
    meta: Boolean,
    cv: String,
    multiple_point_mutations: Boolean,
    complexes: Boolean,
    hrm_dataset: Boolean,
    hrm_check: Boolean,
    compared_tools: String,
    metrics: String,
    T: Boolean,
    ph: Boolean,
    author: String,
    year: Number,
    doi: String,
    reference: String,
    download: String,
    server: String,
  },
  components: {
  }
})
export default class PredictorCard extends Vue {
  title!: String
  _id!: String
  input!: string
  algorithm_0!: string
  algorithm_1!: string
  datasets!: object
  meta!: boolean
  cv?: string
  multiple_point_mutations!: boolean
  complexes!: boolean
  hrm_dataset!: boolean
  hrm_check!: boolean
  compared_tools?: string
  metrics?: string
  T!: boolean
  ph!: boolean
  author!: string
  year!: number
  doi!: string
  reference!: string
  download?: string
  server?: string

  dialog = false

  closeDialog() {
    this.dialog = false
  }
}
</script>

<style scoped></style>
