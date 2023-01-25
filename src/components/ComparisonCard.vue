<template lang="pug">
v-card(color='accent', id='comparison')
  .d-flex.flex-column(v-if='items.length == 2 && isDatasetsReady')
    v-simple-table(style='background-color: transparent !important')
      template(v-slot:default)
        thead
          tr
            th.pl-8(colspan=3)
              v-btn(@click='swap()' outlined, block) 
                v-icon mdi-swap-horizontal
          tr#comparison-names()
            th.comparison-dataset-name.sf.pl-8.text-right(colspan=2) {{ dataset1.name }}
            th.comparison-dataset-name.sf.text-center {{ dataset2.name }}
        v-spacer
        tbody
          tr.comparison-row(v-for='row in comparisonRows')
            td.text-left {{ row.param }}
            td {{ row.dataset1 }}
            td {{ row.dataset2 }}
    v-divider.py-2 
    .d-flex.flex-column.pl-4.text-left()
      span.overlap Overlaps
      span // Feature description
      span.mt-3(v-if='isDatasetsReady')
        span.font-weight-bold.blueComparison--text {{ dataset1.name }}&nbsp;
        span overlaps with
        span.font-weight-bold.pinkComparison--text &nbsp;{{ dataset2.name }}&nbsp;
        span at
        #pident.px-1
          v-text-field(v-model='pident', dense, outlined, hide-details, @change='resetOverlaps')
        span sequence identity
      .d-flex.flex-column(v-if='showOverlapsResult')
        span.mt-3
          span(v-if='all_overlap') All data overlap at {{pident}} cutoff.
          span(v-if='no_overlap') No overlap at {{pident}} cutoff.
          span(v-if='!all_overlap && !no_overlap') Percent of overlapping data: {{percent_of_overlapping}}
        span(v-if='overlappingProteinsLength') Overlapping proteins: {{ overlappingProteinsLength }}
        a(v-if='showOverlapsBtn', :href='`${base}/download_overlap?_id=${overlap_id}`') Download dataset without overlaps
        a(v-if='overlappingProteinsLength', :href='`${base}/download_overlapping_proteins?_id=${overlap_id}`') Download overlapping proteins
      v-btn.mt-2.mb-6(v-else, small, dense, width='25ch', color='primary', @click='calculateOverlaps') Calculate overlaps

  .d-flex.pa-4(v-else)
    //- explainer
    span.text-left Select 2 datasets to compare them and calculate overlaps
</template>
<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Watch } from 'vue-property-decorator'

import { namespace } from 'vuex-class'
const AppStore = namespace('AppStore')

import { Dataset } from '@/models/Dataset'

import { base, calculateOverlap } from '@/utils/api'

interface Selection {
  isSelected: boolean
  _id: string
}

@Component({
  props: {
    items: Array,
  },
})
export default class ComparisonCard extends Vue {
  @AppStore.State datasets?: Dataset[] | undefined

  items!: Selection[]

  dataset1: Dataset | undefined = undefined
  dataset2: Dataset | undefined = undefined

  comparisonRows: object[] = []

  showOverlapsResult = false 
  isDatasetsReady = false

  overlap_id = ''

  all_overlap = false
  no_overlap = false
  percent_of_overlapping = 0
  overlappingProteinsLength = 0
  showOverlapsBtn = false
  pident = 25

  get base() {
    return base
  }

  resetOverlaps() {
    this.showOverlapsResult = false
  }

  swap() {
    this.$emit('swap')
  }

  async calculateOverlaps() {
    if (typeof this.dataset1 == typeof undefined || typeof this.dataset2 == typeof undefined) return;
    const response = (await calculateOverlap((this.dataset1 as Dataset).name, (this.dataset2 as Dataset).name, this.pident)).data
    this.all_overlap = response.all_overlap
    this.no_overlap = response.no_overlap
    this.percent_of_overlapping = response.percent_of_overlapping
    this.overlappingProteinsLength = response.overlapping_proteins.length
    if (response.dataset1_data_no_overlap_hashes.length) this.showOverlapsBtn = true
    this.showOverlapsResult = true
    this.overlap_id = response._id
  }

  @Watch('items') 
  onItemsChange() {
    if (!this.items || this.items.length != 2) return
    // get data for each dataset from store
    this.dataset1 = this.datasets?.find(el => el._id == this.items[0]._id) as Dataset
    this.dataset2 = this.datasets?.find(el => el._id == this.items[1]._id) as Dataset

    // request overlaps info
    this.calculateOverlaps()
    this.isDatasetsReady = true

    // generate elements to display comparison
    if (typeof this.dataset1 == typeof undefined || typeof this.dataset2 == typeof undefined) return;
    // @ts-ignore
    const rowsToCompare = this.$t('rowsToCompareInDatasets').map(String)
    this.comparisonRows = []
    rowsToCompare.forEach(element => {
      this.comparisonRows.push({
        param: element,
        // @ts-ignore
        dataset1: this.dataset1[element],
        // @ts-ignore
        dataset2: this.dataset2[element]
      })
    });
  }
}
</script>
<style>
#comparison {
  position: sticky;
  top: 15vh;
  box-shadow: -2px 2px 24px rgba(0, 0, 0, 0.05);
  border-radius: 16px;
}
#comparison-names > th:nth-child(1) {
  color: var(--v-blueComparison)
}
#comparison-names > th:nth-child(2) {
  color: var(--v-pinkComparison)
}
.comparison-dataset-name {
  font-style: normal;
  font-weight: 700 !important;
  font-size: 18px !important;
  line-height: 24px;
  min-width: 150px;
}
.comparison-row > td {
  font-size: 12px;
  line-height: 14px;
}
.comparison-row > td:nth-child(1) {
  max-width: 110px;
}
.comparison-row > td:nth-child(2) {
  color: var(--v-blueComparison)
}
.comparison-row > td:nth-child(3) {
  color: var(--v-pinkComparison)
}
.overlap {
  font-size: 20px;
  line-height: 24px;
}
#comparison .v-data-table__wrapper {
  overflow-x: hidden;
}
#pident {
  display: inline-block;
  width: 5ch;
  font-size: 14px;
}
#pident .v-input__slot {
  padding: 0 6px;
  font-size: 14px;
}
#padding .v-text-field__slot {
  font-weight: 500;
}
#pident input {
  text-align: center;
  padding: 2px 0 2px;
}
</style>