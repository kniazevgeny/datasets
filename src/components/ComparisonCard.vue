<template lang="pug">
v-card(color='accent', id='comparison')
  .d-flex.flex-column(v-if='items.length == 2')
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

  swap() {
    this.$emit('swap')
  }

  @Watch('items') 
  onItemsChange() {
    if (!this.items || this.items.length != 2) return
    // get data for each dataset from store
    this.dataset1 = this.datasets?.find(el => el._id == this.items[0]._id) as Dataset
    this.dataset2 = this.datasets?.find(el => el._id == this.items[1]._id) as Dataset

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
  position: fixed;
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
</style>