<template lang="pug">
v-layout.unavailable(style='width: 100%')
  Mutations(
    :headers='mutations_headers',
    :data='data',
    :filters='filters',
    @filterChange='',
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
  get mutations_headers() {
    return this.$t('mutations_headers')
  }

  getGradient(min, max, range, step) {
    let color = this.$vuetify.theme.themes[this.$vuetify.theme.dark ? 'dark' : 'light']['primary']
    let colorDisabled = '#d9ebe9'
    if (isNaN(range[0]) || typeof range[0] === 'string') return [colorDisabled]
    let gradient: Array<String> = []
    for (let i = min; i < max; i += step) {
      if (i < range[0]) gradient.push(colorDisabled)
      if (i > range[0] && i < range[1]) gradient.push(color as String)
      if (i > range[1]) gradient.push(colorDisabled)
    }

    return gradient
  }

  getMutationsByFilters(filters) {
    getMutations(filters).then((response) => {
      console.log(response)
      
    })
  }

  mounted() {
    document.title = 'Browse Mutations | ' + this.$t('title')

    getMutations(this.filters).then((response) => {
      this.data = response.mutations
      this.filters = response.filters
    })
  }

  filters = [
    {
      title: 'ΔΔG',
      value: 'ddG',
      subtitle: 'Number of data points in a dataset.',
      type: 'range',
      min: 0,
      max: 0,
      step: 0.1,
      tickLabels: [],
      range: [0, 0],
      hint: 'Im a hint',
    },
    {
      title: 'Temperature',
      value: 'T',
      subtitle: 'Number of data points in a dataset.',
      type: 'range',
      min: 0,
      max: 0,
      step: 1,
      tickLabels: [],
      range: [0, 0],
      hint: 'Im a hint',
    },
    {
      title: 'pH',
      value: 'pH',
      subtitle: 'Number of data points in a dataset.',
      type: 'range',
      min: 0,
      max: 0,
      step: 0.1,
      tickLabels: [],
      range: [0, 0],
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
