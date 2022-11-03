<template lang="pug">
v-layout(style='width: 100%')
  Mutations(:headers='mutations_headers', :data='data', :filters='filters')
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
    while (u === 0) u = Math.random() //Converting [0,1) to (0,1)
    while (v === 0) v = Math.random()
    let num = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v)

    num = num / 10.0 + 0.5 // Translate to 0 -> 1
    if (num > 1 || num < 0) num = this.randn_bm(min, max, skew)
    // resample between 0 and 1 if out of range
    else {
      num = Math.pow(num, skew) // Skew
      num *= max - min // Stretch to fill range
      num += min // offset to min
    }
    return num
  }

  tickLabels(start: number, end: number, step: number) {
    // That shuold be pre-computed on backend
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
    // if (min == -10) console.log(range)

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
      console.log(this.data.length)
    })
  }

  customFilter(value: any, search: string | null, item: object) {
    // in vue 2.6.9 works only if search string is provided
    // So, we need some magic for user to ignore that bug

    let result = false

    if (typeof search === 'string')
      if (search == '-1') result = true
      else
        result = Object.values(item).some((el) =>
          el.toString().toLowerCase().includes(search.toLowerCase())
        )

    return Object.keys(item).reduce((prev, current) => {
      if (prev === false) return false

      // get suitable filter object
      let currentFilter = this.filters.filter((f) => f.vaule === current)
      if (currentFilter.length == 0) return true
      if (currentFilter[0].type === 'range')
        if (
          item[current] < currentFilter[0].range[0] ||
          item[current] > currentFilter[0].range[1]
        )
          return false
      return true
    }, result)
  }

  filters = [
    {
      title: 'Origin',
      subtitle: '',
      value: 'origin',
      type: 'chip',
      items: [
        { label: 'Any', fieldToBe: undefined, description: undefined },
        {
          label: 'Original',
          fieldToBe: 'original',
          description:
            'Original - a dataset compiled from Protherm or literature sources.',
        },
        {
          label: 'Processed',
          fieldToBe: 'processed',
          description:
            'Processed - original dataset(s) after processing procedure (filtration, redundancy reduction, etc.)',
        },
        {
          label: 'Subset',
          fieldToBe: 'subset',
          description: 'Subset - a subset of existing dataset',
        },
      ],
      selected: 0,
    },
    {
      title: 'ΔΔG',
      value: 'ddG',
      subtitle: 'Number of data points in a dataset.',
      type: 'range',
      min: -10,
      max: 10,
      step: 0.1,
      tickLabels: this.tickLabels(-10, 10, 1),
      range: [-10, 10],
      hint: 'Im a hint',
    },
    {
      title: 'Temperature',
      value: 'T',
      subtitle: 'Number of data points in a dataset.',
      type: 'range',
      min: 250,
      max: 590,
      step: 1,
      tickLabels: this.tickLabels(250, 590, 1),
      range: [250, 590],
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
    // {
    //   title: 'Symmetrized',
    //   value: 'symmetrized',
    //   subtitle:
    //     'A dataset is symmetrized if it contains both forward and reverse mutations.',
    //   type: 'chip',
    //   items: [{label: 'Any', fieldToBe: undefined}, {label: 'Yes', fieldToBe: true}, {label: 'No', fieldToBe: false}],
    //   selected: 0
    // },
    {
      title: 'Source',
      subtitle: '',
      type: 'select',
    },
    {
      title: 'Type of mutations',
      value: 'mutations',
      subtitle: '',
      type: 'chip',
      items: [
        { label: 'Any', fieldToBe: undefined, description: undefined },
        {
          label: 'Single',
          fieldToBe: 'single',
          description: 'Single - contains only single point mutations.',
        },
        {
          label: 'Multiple',
          fieldToBe: 'multiple',
          description: 'Multiple - contains only multiple point mutations.',
        },
        {
          label: 'Mixed',
          fieldToBe: 'mixed',
          description:
            'Mixed - contains both single and multiple point mutations.',
        },
      ],
      selected: 0,
    },
    {
      title: 'Proteins',
      value: 'proteins',
      subtitle: 'Number of proteins in a dataset.',
      type: 'range',
      min: 0,
      max: 200,
      step: 1,
      range: [0, 200],
      tickLabels: this.tickLabels(1, 200, 10),
      hint: 'Im a hint',
    },
    {
      title: 'Author',
      value: 'author',
      subtitle: '',
      type: 'autocomplete',
      items: [],
      selected: [],
    },
    {
      title: 'Year',
      value: 'year',
      subtitle: '',
      type: 'range',
      min: 2000,
      max: 2022,
      step: 1,
      range: [2000, 2022],
      tickLabels: this.tickLabels(2000, 2022, 10),
      hint: 'Im a hint',
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
  data = [
    // {
    //   name: 'Q104H',
    //   ddg: -0.24,
    //   pdb: '2ocj',
    //   chain: 'A',
    //   uniprot: 'P04637',
    //   mutation: 'wt',
    //   protein: 'DNA-binding domain of human p53',
    //   temperature: 275,
    //   ph: 2,
    // },
    // {
    //   name: 'Q104P',
    //   ddg: -0.11,
    //   pdb: '2ocj',
    //   chain: 'A',
    //   uniprot: 'P04637',
    //   mutation: 'wt',
    //   protein: 'DNA-binding domain of human p53',
    //   temperature: 250,
    //   ph: 1,
    // },
    // {
    //   name: 'T123A',
    //   ddg: 0.13,
    //   pdb: '2ocj',
    //   chain: 'A',
    //   uniprot: 'P04637',
    //   mutation: 'wt',
    //   protein: 'DNA-binding domain of human p53',
    //   temperature: 275,
    //   ph: 2,
    // },
    // {
    //   name: 'A129D',
    //   ddg: 0.7,
    //   pdb: '2ocj',
    //   chain: 'A',
    //   uniprot: 'P04637',
    //   mutation: 'wt',
    //   protein: 'DNA-binding domain of human p53',
    //   temperature: 300,
    //   ph: 3,
    // },
    // {
    //   name: 'A129E',
    //   ddg: 0.38,
    //   pdb: '2ocj',
    //   chain: 'A',
    //   uniprot: 'P04637',
    //   mutation: 'wt',
    //   protein: 'DNA-binding domain of human p53',
    //   temperature: 325,
    //   ph: 4,
    // },
    // {
    //   name: 'A129S',
    //   ddg: 0.19,
    //   pdb: '2ocj',
    //   chain: 'A',
    //   uniprot: 'P04637',
    //   mutation: 'wt',
    //   protein: 'DNA-binding domain of human p53',
    //   temperature: 350,
    //   ph: 5,
    // },
    // {
    //   name: 'M133L',
    //   ddg: -0.3,
    //   pdb: '2ocj',
    //   chain: 'A',
    //   uniprot: 'P04637',
    //   mutation: 'wt',
    //   protein: 'DNA-binding domain of human p53',
    //   temperature: 375,
    //   ph: 6,
    // },
    // {
    //   name: 'F134L',
    //   ddg: 4.78,
    //   pdb: '2ocj',
    //   chain: 'A',
    //   uniprot: 'P04637',
    //   mutation: 'wt',
    //   protein: 'DNA-binding domain of human p53',
    //   temperature: 400,
    //   ph: 7,
    // },
    // {
    //   name: 'V143A',
    //   ddg: 3.5,
    //   pdb: '2ocj',
    //   chain: 'A',
    //   uniprot: 'P04637',
    //   mutation: 'wt',
    //   protein: 'DNA-binding domain of human p53',
    //   temperature: 425,
    //   ph: 8,
    // },
    // {
    //   name: 'L145Q',
    //   ddg: 2.98,
    //   pdb: '2ocj',
    //   chain: 'A',
    //   uniprot: 'P04637',
    //   mutation: 'wt',
    //   protein: 'DNA-binding domain of human p53',
    //   temperature: 450,
    //   ph: 9,
    // },
  ]
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.theme--light.v-data-table.v-data-table--fixed-header thead th {
  background-color: '#a5a6f6' !important;
}
</style>
