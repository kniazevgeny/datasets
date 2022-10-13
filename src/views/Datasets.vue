<template lang="pug">
v-layout(style='width: 100%')
  div(style='position: sticky; width: 420px')
    //- Filters
    .pa-4(
      style='border-radius: var(--v-borderRadius) var(--v-borderRadius) 0 0'
    )
      .text-h5.font-weight-bold.font-accent.text-left Filters
    v-list.pa-4(
      color='transparent',
      v-for='filter in filters',
      :key='filter.title'
    )
      v-list-item-title.font-weight-bold {{ filter.title }}
      small.grey--text.text--darken-2 {{ filter.subtitle }}
      v-list-item-content(v-if='filter.type === "range"')
        div(v-if='data.length')
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
            track-color='DimGray',
            track-fill-color='black',
            color='black'
          )
          v-layout.mt-n11
            v-text-field.pa-2(
              v-model='filter.range[0]',
              hide-details,
              filled,
              dense,
              label='min',
              type='number',
              color='black'
            )
            v-text-field.pa-2(
              v-model='filter.range[1]',
              hide-details,
              filled,
              dense,
              label='max',
              type='number',
              color='black'
            )
        v-skeleton-loader.mx-auto(
          v-else,
          type='card, actions',
          max-height='100px'
        )
      v-list-item-content(v-if='filter.type === "chip"')
        div(v-if='data.length')
          v-chip-group(
            v-model='filter.selected',
            mandatory,
            active-class='v-chip--dark'
          )
            v-tooltip(bottom v-for='item in filter.items', :key='item.label', :disabled='typeof item.description == typeof undefined', max-width='275')
              template(v-slot:activator="{ on, attrs }")
                v-chip.pa-4(v-on='on' v-bind='attrs') {{ item.label }}
              span {{ item.description }}
        v-layout.text-left(col, v-else)
          v-skeleton-loader.mx-auto(type='chip')
          v-skeleton-loader.mx-auto(type='chip')
      v-list-item-content(v-if='filter.type === "autocomplete"')
        div(v-if='data.length')
          v-autocomplete(
            v-model='filter.selected',
            :items='filter.items',
            auto-select-first,
            chips,
            clearable,
            deletable-chips,
            filled,
            multiple,
            :label='filter.title'
          )
        v-layout.text-left(col, v-else)
          v-skeleton-loader.mx-auto(type='card-heading')
      v-divider.mt-4
  v-card.ma-6(width='100%', height='100%', flat)
    v-card-title.pb-2
      v-col.pb-2
        v-text-field(
          v-model='searchVisible',
          prepend-inner-icon='mdi-magnify',
          label='Type dataset name, year, author...',
          single-line,
          hide-details,
          filled,
          autofocus
          color='primary',
          @input='updateSearchReal',
          clearable,
        )
        //- Mirror filters in v-chips
        v-expand-transition
          v-card.mx-auto.mt-3.float-left(flat)
            v-chip-group(column)
              TransitionGroup(name='scale-w', mode='out-in', tag='div')
                v-chip(
                  color='primary',
                  v-for='(filter, i) in filterChips',
                  :key='i',
                  clearable,
                  @click='resetFilterByChipId(i)',
                  @click:close='resetFilterByChipId(i)',
                  close
                )
                  span.font-weight-light(v-if='filter') {{ filter.title + ': ' }}
                  span.pl-1 {{ getFilterDescription(filter) }}
        v-card.mt-3.float-right(flat, width='250')
          v-select(
            v-model='select',
            clearable,
            outlined,
            label='Sort by',
            :items='headers.filter((item) => item.sortable != false)',
            @input='sortItems'
          )
            template(v-slot:prepend)
              v-icon(@click='flipSortOrder()', v-if='select', color='DarkGray') {{ isSortDescending ? 'mdi-arrow-down' : 'mdi-arrow-up' }}
    v-card-text.pb-2
      v-col
        //- id should be id, not name
        DatasetCard.mb-2(
          v-for='card in dataVisible',
          :key='card._id',
          :showSkeleton='card.showSkeleton',
          :name='card.name',
          :_id='card._id',
          :fileName='card.fileName',
          :externalLink='card.externalLink',
          :originalPredictor='card.originalPredictor',
          :origin='card.origin',
          :size='card.size',
          :symmetrized='card.symmetrized',
          :source='card.source',
          :mutations='card.mutations',
          :proteins='card.proteins',
          :year='card.year',
          :author='card.author',
          :doi='card.doi',
          :reference='card.reference'
        )
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import DatasetCard from '@/components/DatasetCard.vue'

import { getDatasets } from '@/utils/api'
import { Dataset } from '@/models/Dataset'
import { namespace } from 'vuex-class'

const AppStore = namespace('AppStore')

@Component({
  props: {},
  components: {
    DatasetCard,
  },
})
export default class Datasets extends Vue {
  @AppStore.Mutation setDatasets!: (datasets: Dataset[]) => void

  searchVisible: String = ''
  searchReal: String = '-1'

  select = 0

  isSortDescending = true

  get dataVisible() {
    // Apply filters
    let result = this.data.filter((item) =>
      this.customFilter('', this.searchReal, item)
    )

    // Values are already sorted in this.sortItems
    // With datasets > 10 000 that approach may affect performance

    // if no data, show skeleton
    if (!result.length)
      for (let i = 0; i < 5; i++)
        result.push({
          showSkeleton: true,
          name: '',
          _id: '',
          fileName: '',
          origin: '',
          size: 0,
          symmetrized: false,
          available: false,
          mutations: '',
          proteins: 0,
          year: 0,
        })
    return result
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

  tickLabelsByData(param: string) {
    const values = this.data.map((el) => el[param])
    // Group near values or data-augmentation
    let valuesProcessed
    if (param == 'size' || param == 'proteins') {
      valuesProcessed = values.map((el) => Math.round(el / 50) * 50)
    } else valuesProcessed = values
    const valuesReduced: Map<
      number,
      Map<number, number>
    > = valuesProcessed.reduce(
      (acc, e) => acc.set(e, (acc.get(e) || 0) + 1),
      new Map()
    )
    return [...valuesReduced.values()]
  }

  getGradient(min, max, range, step) {
    //    let color = this.$vuetify.theme.themes.light['primary']
    let color = 'black'
    let colorDisabled = '#b0b0b0'
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

  customFilter(value: any, search: String | null, item: object) {
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
      let currentFilter = this.filters.filter((f) => f.value === current)
      if (currentFilter.length == 0) return true
      // check each type
      if (currentFilter[0].type === 'range')
        if (
          item[current] < currentFilter[0].range[0] ||
          item[current] > currentFilter[0].range[1]
        )
          return false
      if (currentFilter[0].type === 'chip') {
        // if we selected 'any'
        if (currentFilter[0].selected == 0) return true
        if (
          item[current] !=
          currentFilter[0].items[currentFilter[0].selected].fieldToBe
        )
          return false
      }
      if (currentFilter[0].type === 'autocomplete') {
        // if nothing selected
        if (!(currentFilter[0].selected as string[]).length) return true
        if (!(currentFilter[0].selected as string[]).includes(item[current] as string))
          return false
      }
      return true
    }, result)
  }

  sortItems(value) {
    let factor = this.isSortDescending ? 1 : -1
    this.data.sort((a, b) => factor * (b[value] - a[value]))
  }

  flipSortOrder() {
    this.isSortDescending = !this.isSortDescending
    if (this.select) this.sortItems(this.select)
  }

  get filterChips() {
    return this.filters.filter((item) => {
      if (item.type === 'range') {
        if (item.min < item.range[0]) return true
        if (item.range[1] < item.max) return true
      }
      if (item.type === 'chip') {
        if (item.selected) return true
      }
      if (item.type === 'autocomplete') {
        if ((item.selected as string[]).length) return true
      }
      // TBD for other filter types
      return false
    })
  }

  resetFilterByChipId(chipId) {
    // console.log(this.filterChips[chipId])
    let originalIndex = this.filters.indexOf(this.filterChips[chipId])
    if (this.filters[originalIndex].type === 'range') {
      this.resetRangeSlider(originalIndex)
    }
    if (this.filters[originalIndex].type === 'chip')
      this.filters[originalIndex].selected = 0
    if (this.filters[originalIndex].type === 'autocomplete')
      this.filters[originalIndex].selected = []
  }

  resetRangeSlider(i) {
    // solves reactivity problem
    Vue.set(this.filters[i].range, 0, this.filters[i].min)
    Vue.set(this.filters[i].range, 1, this.filters[i].max)
  }

  getFilterDescription(
    filter: typeof this.filters[0] | typeof this.filters[1]
  ) {
    if (filter.type === 'range')
      return (
        (filter.range[0] == filter.min ? 'min' : filter.range[0]) +
        '→' +
        (filter.range[1] == filter.max ? 'max' : filter.range[1])
      )
    if (filter.type === 'chip') return filter.items[filter.selected].label
    if (filter.type === 'autocomplete') return filter.selected.join(', ')
  }

  mounted() {
    getDatasets().then((response) => {
      this.data = response
      this.setDatasets(response)
      const generateTicks = ['size', 'proteins', 'year']
      generateTicks.forEach((fieldName) => {
        this.filters[
          this.filters.findIndex((el) => el.value == fieldName)
        ].tickLabels = this.tickLabelsByData(fieldName)
      })
      // @ts-ignore
      this.filters[this.filters.findIndex((el) => el.value == 'author')].items 
      = [...new Set(this.data.map((el: Dataset) => el.author))]
      console.log(this.filters)
    })
  }

  // TODO: hide subtitles inside tooltips
  filters = [
    {
      title: 'Origin',
      subtitle: '',
      value: 'origin',
      type: 'chip',
      items: [
        { label: 'Any', fieldToBe: undefined, description: undefined },
        { label: 'Original', fieldToBe: 'original', description: 'Original - a dataset compiled from Protherm or literature sources.' },
        { label: 'Processed', fieldToBe: 'processed', description: 'Processed - original dataset(s) after processing procedure (filtration, redundancy reduction, etc.)' },
        { label: 'Subset', fieldToBe: 'subset', description: 'Subset - a subset of existing dataset' },
      ],
      selected: 0,
    },
    {
      title: 'Size',
      value: 'size',
      subtitle: 'Number of data points in a dataset.',
      type: 'range',
      min: 0,
      max: 2000,
      step: 1,
      tickLabels: this.tickLabels(0, 2000, 25),
      range: [0, 2000],
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
        { label: 'Single', fieldToBe: 'single', description: 'Single - contains only single point mutations.' },
        { label: 'Multiple', fieldToBe: 'multiple', description: 'Multiple - contains only multiple point mutations.' },
        { label: 'Mixed', fieldToBe: 'mixed', description: 'Mixed - contains both single and multiple point mutations.' },
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
      text: 'Dataset',
      align: 'start',
      sortable: false,
      value: 'name',
    },
    {
      text: 'Original predictor',
      value: 'originalPredictor',
      sortable: false,
      align: 'start',
    },
    { text: 'Origin', value: 'isOriginal', sortable: false, align: 'start' },
    { text: 'Size', value: 'size' },
    { text: 'Doubled', value: 'doubled', sortable: false },
    { text: 'Source', value: 'source', sortable: false, align: 'start' },
    {
      text: 'Type',
      value: 'type',
      sortable: false,
      align: 'start',
    },
    { text: 'Proteins', value: 'proteins' },
    { text: 'Year', value: 'year' },
    { text: 'doi', value: 'doi', sortable: false, align: 'start', width: '10' },
  ]

  data: Dataset[] = [
    // {
    //   name: 'Q3488',
    //   _id: 'Q3488',
    //   originalPredictor: 'ThermoNet',
    //   isOriginal: false,
    //   size: 1744,
    //   doubled: true,
    //   source: 'Q3421',
    //   type: 'single',
    //   proteins: 43,
    //   year: 2000,
    //   doi: 'https://dx.doi.org/10.1371/journal.pcbi.1008291',
    // },
    // {
    //   name: 'p53',
    //   _id: 'p53',
    //   originalPredictor: 'CSM',
    //   isOriginal: true,
    //   size: 42,
    //   doubled: false,
    //   type: 'single',
    //   proteins: 41,
    //   year: 2000,
    //   doi: 'https://dx.doi.org/10.1093/bioinformatics/btt691',
    // },
    // {
    //   name: 'Card 3',
    //   _id: 'card3',
    //   externalLink: 'https://google.com',
    //   originalPredictor: 'originalPredictor',
    //   isOriginal: true,
    //   size: 0,
    //   doubled: false,
    //   type: 'type',
    //   proteins: 0,
    //   year: 2000,
    //   doi: 'https://dx.doi.org/',
    // },
    // {
    //   name: 'Card 4',
    //   _id: 'card4',
    //   originalPredictor: 'originalPredictor',
    //   isOriginal: true,
    //   size: 0,
    //   doubled: false,
    //   type: 'type',
    //   year: 2000,
    //   proteins: 0,
    //   doi: 'https://dx.doi.org/',
    // },
    // {
    //   name: 'Card 5',
    //   externalLink: 'https://google.com/a',
    //   _id: 'card5',
    //   originalPredictor: 'originalPredictor',
    //   isOriginal: true,
    //   size: 0,
    //   doubled: false,
    //   year: 2000,
    //   type: 'type',
    //   proteins: 0,
    //   doi: 'https://dx.doi.org/',
    // },
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

.scale-w-enter,
.scale-w-enter-from {
  transform: scaleX(0.5);
}
.scale-w-leave,
.scale-w-leave-to {
  /* transform: translateY(-100px); */
  opacity: 0;
  /* -webkit-transform: translate(-100px, 0); */
  /* transform: translate(-100px, 0); */
}
.scale-w-enter-active,
.scale-w-leave-active {
  transition: all 0.2s ease;
}
.scale-w-leave-active {
  position: relative;
}
</style>
