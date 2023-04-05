<template lang="pug">
v-layout(style='width: 100%')
  Mutations(
    :headers='mutations_headers',
    :data='data',
    :filters='filters',
    @filterChange='getMutationsByFilters',
    :customFiltrationId='customFiltrationId',
    :mutationsCount='mutationsCount',
    showDownloadBtn,
    showFilters
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
  customFiltrationId = ''
  mutationsCount = 0

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
      this.data = response.mutations
      if (!!response.filters) this.filters = response.filters
      this.customFiltrationId = response.customFiltrationId
      this.mutationsCount = response.mutationsCount
    })
  }

  mounted() {
    document.title = 'Browse Mutations | ' + this.$t('title')

    this.getMutationsByFilters(this.filters)
  }

  filters = [
    {
      title: 'Variation',
      subtitle: 'Example: From "H" will show H32L, H32S, H32Y and so on',
      titleFrom: 'From',
      titleTo: 'To',
      value: 'mutation_pdb',
      type: 'variation',
      from: '',
      to: '',
      hint: 'Im a hint',
    },
    {
      title: 'ΔΔG',
      value: 'ddG',
      subtitle: 'Free energy change of folding, kcal/mol. Negative values denote stabilization.',
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
      subtitle: 'Temperature of the experiment in Celsius.',
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
      subtitle: 'pH of the experiment.',
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

  data: object[] = []
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.theme--light.v-data-table.v-data-table--fixed-header thead th {
  background-color: '#a5a6f6' !important;
}
</style>
