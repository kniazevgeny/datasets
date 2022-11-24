<template lang="pug">
v-layout(style='width: 100%')
  Mutations(
    :headers='mutations_headers',
    :data='data',
    :filters='filters',
    showFilters,
    selectable
  )
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import { getMutations } from '@/utils/api'
import Mutations from '../components/Mutations.vue'

@Component({
  components: {
    Mutations,
  },
})
export default class Browse extends Vue {
  searchVisible: String = ''
  searchReal: String = '-1'

  get mutations_headers() {
    return this.$t('mutations_headers')
  }

  updateSearchReal() {
    if (this.searchVisible != '') this.searchReal = this.searchVisible
    else this.searchReal = '-1'
  }

  randn_bm(min, max, skew) {
    let u = 0,
      v = 0
    while (u === 0) u = Math.random()
    while (v === 0) v = Math.random()
    let num = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v)

    num = num / 10.0 + 0.5
    if (num > 1 || num < 0) num = this.randn_bm(min, max, skew)
    else {
      num = Math.pow(num, skew)
      num *= max - min
      num += min
    }
    return num
  }

  tickLabels(start: number, end: number, step: number) {
    let rand: Array<number> = []
    for (let i = 0; i < step * 1000; i++)
      rand.push(Math.round(this.randn_bm(start, end, 1) * step * 2) / step / 2)
    rand = rand.sort(function (a, b) {
      return a - b
    })
    let randReduced: Map<number, Map<number, number>> = rand.reduce(
      (acc, e) => acc.set(e, (acc.get(e) || 0) + 1),
      new Map()
    )
    return [...randReduced.values()]
  }

  getGradient(min, max, range, step) {
    let color = this.$vuetify.theme.themes.light['primary']
    let colorDisabled = 'DimGray'
    if (isNaN(range[0]) || typeof range[0] === 'string') return [colorDisabled]
    let gradient: Array<String> = []
    for (let i = min; i < max; i += step) {
      if (i < range[0]) gradient.push(colorDisabled)
      if (i > range[0] && i < range[1]) gradient.push(color as String)
      if (i > range[1]) gradient.push(colorDisabled)
    }

    return gradient
  }

  mounted() {
    getMutations().then((response) => {
      this.data = response

      // @ts-ignore
      this.filters[
        this.filters.findIndex((el) => el.value == 'organism')
      ].items = [
        ...new Set(this.data.map((el: any) => el.organism).filter((el) => el)),
      ].sort()

      // set border values
      this.filters.forEach((filter, i) => {
        if (filter.type == 'range') {
          const values = this.data
            .filter((el) => !!el[filter.value])
            .map((el) => parseFloat(el[filter.value]))
          this.filters[i].min = values.reduce((prev, current) => {
            if (prev < current) return prev
            else return current
          }, 250) as number
          this.filters[i].max = values.reduce((prev, current) => {
            if (prev > current) return prev
            else return current as number
          }, -10)
          this.filters[i].range = [
            this.filters[i].min as number,
            this.filters[i].max as number,
          ]
        }
      })
    })
  }

  filters = [
    {
      title: 'ΔΔG',
      value: 'ddG',
      subtitle: 'Number of data points in a dataset.',
      type: 'range',
      min: -14,
      max: 10,
      step: 0.1,
      tickLabels: this.tickLabels(-10, 14, 1),
      range: [-14, 10],
      hint: 'Im a hint',
    },
    {
      title: 'Temperature',
      value: 'T',
      subtitle: 'Number of data points in a dataset.',
      type: 'range',
      min: 0,
      max: 590,
      step: 1,
      tickLabels: this.tickLabels(0, 590, 1),
      range: [0, 590],
      hint: 'Im a hint',
    },
    {
      title: 'pH',
      value: 'pH',
      subtitle: 'Number of data points in a dataset.',
      type: 'range',
      min: 1,
      max: 12,
      step: 0.1,
      tickLabels: this.tickLabels(1, 12, 0.1),
      range: [1, 12],
      hint: 'Im a hint',
    },
    {
      title: 'Organism',
      value: 'organism',
      subtitle: '',
      type: 'autocomplete',
      items: [],
      selected: [],
    },
  ]

  selected = []

  headers = [
    {
      text: 'Variation',
      align: 'start',
      sortable: false,
      value: 'muatation',
    },
    { text: 'ddg', value: 'ddG' },
    { text: 'pdb', value: 'pdb', sortable: false, align: 'start' },
    { text: 'Chain', value: 'chain', sortable: false, align: 'start' },
    { text: 'Uniprot', value: 'uniprot' },
    {
      text: 'Protein Name',
      value: 'protein',
      sortable: false,
      align: 'start',
      width: '200',
    },
    { text: 'T', value: 'T' },
    { text: 'pH', value: 'pH' },
  ]
  data: object[] = []
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.theme--light.v-data-table.v-data-table--fixed-header thead th {
  background-color: '#a5a6f6' !important;
}
</style>
