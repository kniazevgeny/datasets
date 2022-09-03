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
        v-sparkline(
          :fill='true',
          :gradient='getGradient(filter.min, filter.max, filter.range, filter.step)',
          gradient-direction='left',
          :line-width='2',
          :padding='8',
          :smooth=25,
          :value='filter.tickLabels'
        )
        v-range-slider.mt-n11(
          v-model='filter.range',
          :step='filter.step',
          :max='filter.max',
          :min='filter.min',
          track-color='DimGray'
          track-fill-color='indigoA2',
          color='indigoA2'
        )
        v-layout.mt-n11
          v-text-field.pa-2(
            v-model='filter.range[0]',
            hide-details,
            filled,
            dense,
            label='min',
            type="number",
            color='indigo accent-2'
          )
          v-text-field.pa-2(
            v-model='filter.range[1]',
            hide-details,
            filled,
            dense,
            label='max',
            color='indigo accent-2'
          )
      v-divider
  v-card(width='100%', height='100%' flat).ma-6
    v-card-title
      v-text-field(
        v-model='search',
        append-icon='mdi-magnify',
        label='Type dataset name, year, author...',
        single-line,
        hide-details,
        filled,
        color='indigo accent-2'
      )
    v-col
      DatasetCard.mb-2(
        v-for='card in datasetCards',
        :key='card.title',
        :title='card.title'
      )
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import DatasetCard from '@/components/DatasetCard.vue'

@Component({
  props: {},
  components: {
    DatasetCard
  }
})
export default class Datasets extends Vue {

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
    let color = this.$vuetify.theme.themes.light['indigoA2']
    let colorDisabled = 'DimGray'
    if (isNaN(range[0]) || typeof(range[0]) === 'string') return [colorDisabled]
    // if (min == -10) console.log(range)

    let gradient: Array<String> = []
    for (let i = min; i < max; i += step) {
      if (i < range[0]) gradient.push(colorDisabled)
      if (i > range[0] && i < range[1]) gradient.push(color as String)
      if (i > range[1]) gradient.push(colorDisabled)
    }

    return gradient
  }

  // TODO: hide subtitles inside tooltips
  filters = [
  {
      title: 'Original predictor',
      subtitle:
        'Mutation studied in the experiment. Residue numbering corresponds to that in the PDB structure. If no PDB structure is available, the residue is numbered according to the sequence specifieed in "Sequence" column',
      type: 'input'
    },
    {
      title: 'Origin',
      subtitle:
        'Original - compiled from scratch. Processed - processed original dataset.',
      type: 'select',
    },
    {
      title: 'Size',
      subtitle: 'Number of data points in a dataset.',
      type: 'range',
      min: 1,
      max: 500,
      step: 1,
      tickLabels: this.tickLabels(1, 500, 10),
      range: [1, 500],
      hint: 'Im a hint',
    },
    {
      title: 'Doubled',
      subtitle:
        'A dataset is symmetrized if it contains both forward and reverse mutations.',
      type: 'select',
    },
    {
      title: 'Source',
      subtitle: '',
      type: 'select',
    },
    {
      title: 'Type',
      subtitle: 'Single - contains only single point mutations. Multiple - contains only multiple point mutations. Mixed - contains both single and multiple point mutations.',
      type: 'select',
    },
    {
      title: 'Proteins',
      subtitle: 'Number of proteins in a dataset.',
      type: 'range',
      min: 1,
      max: 500,
      step: 1,
      range: [1, 500],
      tickLabels: this.tickLabels(1, 500, 10),
      hint: 'Im a hint',
    },
    {
      title: 'Author',
      subtitle: '',
      type: 'select',
    },
    {
      title: 'Year',
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
  search: String = ''

  datasetCards = [
    {
      title: 'Card 1'
    },
    {
      title: 'Card 2'
    },
    {
      title: 'Card 3'
    },
    {
      title: 'Card 4'
    },
    {
      title: 'Card 5'
    },
  ]
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
</style>
