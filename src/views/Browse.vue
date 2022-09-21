<template lang="pug">
v-layout(style='width: 100%')
  v-navigation-drawer(
    width='420',
    permanent,
    style='position: sticky',
    absolute=false
  )
    //- Filters
    .pa-4(
      style='border-radius: var(--v-borderRadius) var(--v-borderRadius) 0 0'
    )
      .text-h5.font-weight-bold Filters
    v-list.pa-4(
      color='transparent',
      v-for='filter in filters',
      :key='filter.title'
    )
      v-list-item-title.mb-n1.font-weight-bold {{ filter.title }}
      small.grey--text.text--darken-2 {{ filter.subtitle }}
      v-list-item-content(v-if='filter.type === "range"') 
        v-sparkline(
          :fill='true',
          :gradient='getGradient(filter.min, filter.max, filter.range, filter.step)',
          gradient-direction='left',
          :line-width='2',
          :padding='8',
          :smooth=25,
          :value='filter.tickLabels'
        )
        //- TODO: make filters less reactive (or take 0.1s to updage results)
        //- instant changes are unnecessary but they kill performance
        v-range-slider.mt-n11(
          v-model='filter.range',
          :step='filter.step',
          :max='filter.max',
          :min='filter.min',
          track-color='DimGray',
          track-fill-color='primary',
          color='primary'
        )
        v-layout.mt-n11
          v-text-field.pa-2(
            v-model='filter.range[0]',
            hide-details,
            filled,
            dense,
            label='min',
            type='number',
            color='primary'
          )
          v-text-field.pa-2(
            v-model='filter.range[1]',
            hide-details,
            filled,
            dense,
            label='max',
            type='number',
            color='primary'
          )
      v-divider.mt-4
  v-card.ma-6(width='100%', height='100%', flat)
    v-card-title.pl-0.pr-0
      v-text-field(
        v-model='searchVisible',
        append-icon='mdi-magnify',
        label='Type mutation id, protein, variation...',
        single-line,
        hide-details,
        filled,
        color='primary',
        @input='updateSearchReal'
      )
    //- TODO: duplicate active filters on top of the table
    v-data-table(
      v-model='selected',
      fixed-header,
      :headers='headers',
      :items='data',
      :search='searchReal',
      item-key='name',
      show-select,
      checkbox-color='primary',
      multi-sort,
      :customFilter='customFilter'
    ).unavailable
      template(v-slot:item.mutation='{ item }')
        v-chip.primary--text.text--accent-2.font-weight-bold(
          outlined,
          label,
          color='blue lighten-1',
          dark
        ) {{ item.mutation }}
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({})
export default class Browse extends Vue {
  searchVisible: String = ''
  searchReal: String = '-1'

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

  mounted() {}

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
      title: 'Variation',
      subtitle:
        'Mutation studied in the experiment. Residue numbering corresponds to that in the PDB structure. If no PDB structure is available, the residue is numbered according to the sequence specifieed in "Sequence" column.',
    },
    {
      title: 'ddg',
      vaule: 'ddg',
      subtitle:
        'Free energy change of folding, kcal/mol. Negative values denote stabilization.',
      type: 'range',
      min: -10,
      max: 10,
      step: 0.1,
      range: [-10, 10],
      tickLabels: this.tickLabels(-10, 10, 0.5),
      hint: 'Im a hint',
    },
    {
      title: 'Mutation',
      vaule: 'mutation',
      subtitle: 'Mutation context',
    },
    {
      title: 'T',
      vaule: 'temperature',
      subtitle: 'Temperature of the experiment in kelvins.',
      type: 'range',
      min: 250,
      max: 590,
      step: 1,
      tickLabels: this.tickLabels(250, 590, 20),
      range: [250, 590],
      hint: 'Im a hint',
    },
    {
      title: 'pH',
      vaule: 'ph',
      subtitle: 'pH of the experiment.',
      type: 'range',
      min: 0,
      max: 12,
      step: 0.5,
      range: [0, 12],
      tickLabels: this.tickLabels(0, 12, 0.5),
      hint: 'Im a hint',
    },
    {
      title: 'Method',
      subtitle:
        'Method of measuring the folding free energy change in the experiment.',
    },
  ]

  selected = []

  headers = [
    {
      text: 'Variation',
      align: 'start',
      sortable: false,
      value: 'name',
    },
    { text: 'ddg', value: 'ddg' },
    { text: 'pdb', value: 'pdb', sortable: false, align: 'start' },
    { text: 'Chain', value: 'chain', sortable: false, align: 'start' },
    { text: 'Uniprot', value: 'uniprot' },
    { text: 'Mutation', value: 'mutation', sortable: false, align: 'start' },
    {
      text: 'Protein Name',
      value: 'protein',
      sortable: false,
      align: 'start',
      width: '200',
    },
    { text: 'T', value: 'temperature' },
    { text: 'pH', value: 'ph' },
  ]
  data = [
    {
      name: 'Q104H',
      ddg: -0.24,
      pdb: '2ocj',
      chain: 'A',
      uniprot: 'P04637',
      mutation: 'wt',
      protein: 'DNA-binding domain of human p53',
      temperature: 275,
      ph: 2,
    },
    {
      name: 'Q104P',
      ddg: -0.11,
      pdb: '2ocj',
      chain: 'A',
      uniprot: 'P04637',
      mutation: 'wt',
      protein: 'DNA-binding domain of human p53',
      temperature: 250,
      ph: 1,
    },
    {
      name: 'T123A',
      ddg: 0.13,
      pdb: '2ocj',
      chain: 'A',
      uniprot: 'P04637',
      mutation: 'wt',
      protein: 'DNA-binding domain of human p53',
      temperature: 275,
      ph: 2,
    },
    {
      name: 'A129D',
      ddg: 0.7,
      pdb: '2ocj',
      chain: 'A',
      uniprot: 'P04637',
      mutation: 'wt',
      protein: 'DNA-binding domain of human p53',
      temperature: 300,
      ph: 3,
    },
    {
      name: 'A129E',
      ddg: 0.38,
      pdb: '2ocj',
      chain: 'A',
      uniprot: 'P04637',
      mutation: 'wt',
      protein: 'DNA-binding domain of human p53',
      temperature: 325,
      ph: 4,
    },
    {
      name: 'A129S',
      ddg: 0.19,
      pdb: '2ocj',
      chain: 'A',
      uniprot: 'P04637',
      mutation: 'wt',
      protein: 'DNA-binding domain of human p53',
      temperature: 350,
      ph: 5,
    },
    {
      name: 'M133L',
      ddg: -0.3,
      pdb: '2ocj',
      chain: 'A',
      uniprot: 'P04637',
      mutation: 'wt',
      protein: 'DNA-binding domain of human p53',
      temperature: 375,
      ph: 6,
    },
    {
      name: 'F134L',
      ddg: 4.78,
      pdb: '2ocj',
      chain: 'A',
      uniprot: 'P04637',
      mutation: 'wt',
      protein: 'DNA-binding domain of human p53',
      temperature: 400,
      ph: 7,
    },
    {
      name: 'V143A',
      ddg: 3.5,
      pdb: '2ocj',
      chain: 'A',
      uniprot: 'P04637',
      mutation: 'wt',
      protein: 'DNA-binding domain of human p53',
      temperature: 425,
      ph: 8,
    },
    {
      name: 'L145Q',
      ddg: 2.98,
      pdb: '2ocj',
      chain: 'A',
      uniprot: 'P04637',
      mutation: 'wt',
      protein: 'DNA-binding domain of human p53',
      temperature: 450,
      ph: 9,
    },
  ]
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.theme--light.v-data-table.v-data-table--fixed-header thead th {
  background-color: '#a5a6f6' !important;
}
</style>
