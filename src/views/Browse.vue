<template lang="pug">
v-layout(style='width: 100%')
  v-navigation-drawer(
    width='420',
    permanent,
    style='position: sticky',
    absolute=false
  )
    //- Filters
    .base.pa-5(
      style='border-radius: var(--v-borderRadius) var(--v-borderRadius) 0 0'
    )
      .text-h5.font-weight-bold Filters!
    v-list.accent.pa-4(
      color='transparent',
      v-for='filter in filters',
      :key='filter.title'
    )
      v-list-item-title.mb-n1 {{ filter.title }}
      small.grey--text.text--darken-2 {{ filter.subtitle }}
      v-list-item-content(v-if='filter.type === "range"') 
        //- span {{ filter.min }} {{ filter.max }}{{ filter.step }}
        HistogramSlider(
          :width='200',
          :bar-height='100',
          :data='tickLabels(filter.min, filter.max, 1)',
          :prettify='prettify',
          :drag-interval='true',
          :force-edges='true',
          :colors='["#4566f6", "#7149ee"]',
          :step='filter.step',
          :min='filter.min',
          :max='filter.max',
          @change='sliderChange',
          primaryColor='DarkGray',
          labelColor='DimGray',
          holderColor='DarkGray',
          :keyboard='false'
        )
          //- v-range-slider(
        //-   color='grey darken-1',
        //-   :min='filter.min',
        //-   :max='filter.max',
        //-   v-model='filter.range',
        //-   persistent-hint,
        //-   :hint='filter.hint',
        //-   ticks="always"
        //- )
        //- template(v-slot:thumb-label="props")
        //-   span {{ props.value }}  
      v-divider
  v-card.ma-6(width='100%', height='100%', flat)
    v-card-title
      v-text-field(
        v-model='search',
        append-icon='mdi-magnify',
        label='Type mutation id, protein, variation...',
        single-line,
        hide-details,
        color='primary'
      )
    v-data-table(
      v-model='selected',
      fixed-header,
      :headers='headers',
      :items='data',
      :search='search',
      item-key='name',
      show-select,
      checkbox-color='indigo accent-2',
      multi-sort
    )
      template(v-slot:item.mutation='{ item }')
        v-chip.indigo--text.text--accent-2.font-weight-bold(
          outlined,
          label,
          color='blue lighten-1',
          dark
        ) {{ item.mutation }}
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import HistogramSlider from 'vue-histogram-slider'
//https://www.vuescript.com/beautiful-histogram-range-slider/
import 'vue-histogram-slider/dist/histogram-slider.css'

@Component({
  components: {
    HistogramSlider,
  },
})
export default class Browse extends Vue {
  search: String = ''

  prettify(n) {
    return Math.round(n * 10) / 10
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
    let result: Array<number> = []
    for(let i = 0; i< 200; i++) result.push(this.randn_bm(start, end, 1)); 
    return result
  }
  
  sliderChange(e) {
    // console.log(e, e.from, e.to)
  }

  mounted() {
    
  }

  filters = [
    {
      title: 'Variation',
      subtitle:
        'Mutation studied in the experiment. Residue numbering corresponds to that in the PDB structure. If no PDB structure is available, the residue is numbered according to the sequence specifieed in "Sequence" column.',
    },
    {
      title: 'ddg',
      subtitle:
        'Free energy change of folding, kcal/mol. Negative values denote stabilization.',
      type: 'range',
      min: -10,
      max: 10,
      step: 0.5,
      range: [-10, 10],
      hint: 'Im a hint',
    },
    {
      title: 'Mutation',
      subtitle: 'Mutation context',
    },
    {
      title: 'T',
      subtitle: 'Temperature of the experiment in kelvins.',
      type: 'range',
      min: 250,
      max: 590,
      step: 10,
      range: [250, 590],
      hint: 'Im a hint',
    },
    {
      title: 'pH',
      subtitle: 'pH of the experiment.',
      type: 'range',
      min: 0,
      max: 12,
      step: 0.5,
      range: [0, 12],
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
    { text: 'T', value: 't' },
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
      t: 198,
      ph: 1,
    },
    {
      name: 'Q104P',
      ddg: -0.11,
      pdb: '2ocj',
      chain: 'A',
      uniprot: 'P04637',
      mutation: 'wt',
      protein: 'DNA-binding domain of human p53',
      t: 198,
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
      t: 198,
      ph: 1,
    },
    {
      name: 'A129D',
      ddg: 0.7,
      pdb: '2ocj',
      chain: 'A',
      uniprot: 'P04637',
      mutation: 'wt',
      protein: 'DNA-binding domain of human p53',
      t: 198,
      ph: 1,
    },
    {
      name: 'A129E',
      ddg: 0.38,
      pdb: '2ocj',
      chain: 'A',
      uniprot: 'P04637',
      mutation: 'wt',
      protein: 'DNA-binding domain of human p53',
      t: 198,
      ph: 1,
    },
    {
      name: 'A129S',
      ddg: 0.19,
      pdb: '2ocj',
      chain: 'A',
      uniprot: 'P04637',
      mutation: 'wt',
      protein: 'DNA-binding domain of human p53',
      t: 198,
      ph: 1,
    },
    {
      name: 'M133L',
      ddg: -0.3,
      pdb: '2ocj',
      chain: 'A',
      uniprot: 'P04637',
      mutation: 'wt',
      protein: 'DNA-binding domain of human p53',
      t: 198,
      ph: 1,
    },
    {
      name: 'F134L',
      ddg: 4.78,
      pdb: '2ocj',
      chain: 'A',
      uniprot: 'P04637',
      mutation: 'wt',
      protein: 'DNA-binding domain of human p53',
      t: 198,
      ph: 1,
    },
    {
      name: 'V143A',
      ddg: 3.5,
      pdb: '2ocj',
      chain: 'A',
      uniprot: 'P04637',
      mutation: 'wt',
      protein: 'DNA-binding domain of human p53',
      t: 198,
      ph: 1,
    },
    {
      name: 'L145Q',
      ddg: 2.98,
      pdb: '2ocj',
      chain: 'A',
      uniprot: 'P04637',
      mutation: 'wt',
      protein: 'DNA-binding domain of human p53',
      t: 198,
      ph: 1,
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
