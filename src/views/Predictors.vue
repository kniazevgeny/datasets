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
      .text-h5.font-weight-bold.font-accent Filters
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
    v-card-title.pb-2
      v-col.pb-2
        v-text-field(
          v-model='searchVisible',
          append-icon='mdi-magnify',
          label='Type predictor name, algorithm, author...',
          single-line,
          hide-details,
          filled,
          color='primary',
          @input='updateSearchReal'
        )
        //- Mirror filters in v-chips
        v-expand-transition
          v-card.mx-auto.mt-3.float-left(flat)
            v-chip-group(column)
              TransitionGroup(name='scale-w', mode='in-out', tag='div')
                v-chip(
                  color='warning',
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
        PredictorCard.mb-2(
          v-for='card in dataVisible',
          :key='card.name',
          :title='card.name',
          :_id='card.name',
          :externalLink='card.externalLink',
          :originalPredictor='card.originalPredictor',
          :isOriginal='card.isOriginal',
          :size='card.size',
          :doubled='card.doubled',
          :source='card.source',
          :type='card.type',
          :proteins='card.proteins',
          :doi='card.doi'
        )
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import PredictorCard from '@/components/PredictorCard.vue'

// import { getPredictors } from '@/utils/api'
import { Predictor } from '@/models/Predictor'

@Component({
  props: {},
  components: {
    PredictorCard,
  },
})
export default class Predictors extends Vue {
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
    if (param == 'size') {
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
      console.log(currentFilter[0].title, current)
      // check each type
      if (currentFilter[0].type === 'range')
        if (
          item[current] < currentFilter[0].range[0] ||
          item[current] > currentFilter[0].range[1]
        )
          return false
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
  }

  resetRangeSlider(i) {
    // solves reactivity problem
    Vue.set(this.filters[i].range, 0, this.filters[i].min)
    Vue.set(this.filters[i].range, 1, this.filters[i].max)
  }

  getFilterDescription(filter: typeof this.filters[2]) {
    if (filter.type === 'range')
      return (
        (filter.range[0] == filter.min ? 'min' : filter.range[0]) +
        '→' +
        (filter.range[1] == filter.max ? 'max' : filter.range[1])
      )
  }

  mounted() {
    // getPredictors().then((response) => {
    //   this.data = response
    //   this.filters[2].tickLabels = this.tickLabelsByData('size')
    //   console.log(this.filters[2].tickLabels)
    //   // this.filters[6].tickLabels = this.tickLabelsByData('proteins')
    //   this.filters[8].tickLabels = this.tickLabelsByData('year')
    // })
  }

  // TODO: hide subtitles inside tooltips
  filters = [
    {
      title: 'Original predictor',
      subtitle:
        'Mutation studied in the experiment. Residue numbering corresponds to that in the PDB structure. If no PDB structure is available, the residue is numbered according to the sequence specifieed in "Sequence" column',
      type: 'input',
    },
    {
      title: 'Origin',
      subtitle:
        'Original - compiled from scratch. Processed - processed original dataset.',
      type: 'select',
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
      subtitle:
        'Single - contains only single point mutations. Multiple - contains only multiple point mutations. Mixed - contains both single and multiple point mutations.',
      type: 'select',
    },
    {
      title: 'Proteins',
      value: 'proteins',
      subtitle: 'Number of proteins in a dataset.',
      type: 'range',
      min: 0,
      max: 500,
      step: 1,
      range: [0, 500],
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

  data: Predictor[] = [
    {
      predictor: 'Rosetta',
      input: '3D',
      algorithm_0: 'energy function',
      algorithm_1: 'EP',
      datasets: {
        'Rosetta-2156': 'test',
        'Rosetta-1210': 'test',
      },
      meta: '0',
      cv: '',
      multiple_point_mutations: '0',
      complexes: '0',
      hrm_dataset: '0',
      hrm_check: '0',
      compared_tools: '',
      metrics: '',
      T: 0,
      ph: 1,
      author: 'Kellog',
      year: 2011,
      doi: 'https://doi.org/10.1002/prot.22921',
      reference:
        'Kellogg, E. H., Leaver-Fay, A., & Baker, D. (2010). Role of conformational sampling in computing mutation-induced changes in protein structure and stability. Proteins: Structure, Function, and Bioinformatics, 79(3), 830–838. Portico. https://doi.org/10.1002/prot.22921',
      download: '',
      server: '',
    },
    {
      predictor: 'I-Mutant-2.0',
      input: '1D',
      algorithm_0: 'ML',
      algorithm_1: 'SVM',
      datasets: {
        'I-Mutant-2.0-2087': 'train',
        'I-Mutant-2.0-1948': 'train',
      },
      meta: '0',
      cv: '',
      multiple_point_mutations: '0',
      complexes: '0',
      hrm_dataset: '0',
      hrm_check: '0',
      compared_tools: '',
      metrics: '',
      T: 1,
      ph: 1,
      author: 'Capriotti',
      year: 2005,
      doi: 'https://doi.org/10.1093/nar/gki375',
      reference:
        'Capriotti, E., Fariselli, P., & Casadio, R. (2005). I-Mutant2.0: predicting stability changes upon mutation from the protein sequence or structure. Nucleic Acids Research, 33(Web Server), W306–W310. https://doi.org/10.1093/nar/gki375',
      download: '',
      server:
        'http://gpcr2.biocomp.unibo.it/~emidio/I-Mutant2.0/I-Mutant2.0_Details.html',
    },
    {
      predictor: 'I-Mutant-3.0',
      input: '1D',
      algorithm_0: 'ML',
      algorithm_1: 'SVM',
      datasets: {
        'I-Mutant-3.0-DBSEQ': 'train',
        'I-Mutant-3.0-DB3D': 'train',
        'I-Mutant-3.0-NewDB': 'test',
      },
      meta: '0',
      cv: '',
      multiple_point_mutations: '0',
      complexes: '0',
      hrm_dataset: '1',
      hrm_check: '0',
      compared_tools: '',
      metrics: '',
      T: 1,
      ph: 1,
      author: 'Capriotti',
      year: 2008,
      doi: 'https://dx.doi.org/10.1186%2F1471-2105-9-S2-S6',
      reference:
        'Capriotti, E., Fariselli, P., Rossi, I., & Casadio, R. (2008). A three-state prediction of single point mutations on protein stability changes. BMC Bioinformatics, 9(S2). https://doi.org/10.1186/1471-2105-9-s2-s6',
      download: '',
      server:
        'http://gpcr2.biocomp.unibo.it/cgi/predictors/I-Mutant3.0/I-Mutant3.0.cgi',
    },
    {
      predictor: 'PoPMuSiC',
      input: '3D',
      algorithm_0: 'energy function',
      algorithm_1: 'SP',
      datasets: {
        'PoPMuSiC-S2298': 'train',
        'PoPMuSiC-S350': 'test',
      },
      meta: '0',
      cv: '5-fold, 10-fold',
      multiple_point_mutations: '0',
      complexes: '0',
      hrm_dataset: '0',
      hrm_check: '0',
      compared_tools: 'AUTO-MUTE,CUPSAT,Dmutant,Eris,I-Mutant-2.0,PoPMuSiC-1.0',
      metrics: 'PCC,RMSE',
      T: 0,
      ph: 0,
      author: 'Dehouck',
      year: 2009,
      doi: 'https://doi.org/10.1093/bioinformatics/btp445',
      reference:
        'Dehouck, Y., Grosfils, A., Folch, B., Gilis, D., Bogaerts, P., & Rooman, M. (2009). Fast and accurate predictions of protein stability changes upon mutations using statistical potentials and neural networks: PoPMuSiC-2.0. Bioinformatics, 25(19), 2537–2543. https://doi.org/10.1093/bioinformatics/btp445',
      download: '',
      server: 'http://dezyme.com/',
    },
    {
      predictor: 'CUPSAT',
      input: '3D',
      algorithm_0: 'energy function',
      algorithm_1: 'KB',
      datasets: {
        'CUPSAT-1538': 'test',
        'CUPSAT-1603': 'test',
      },
      meta: '0',
      cv: 'Split-sample validation, jack-knife test, 3-, 4- and 5-fold',
      multiple_point_mutations: '0',
      complexes: '0',
      hrm_dataset: '0',
      hrm_check: '0',
      compared_tools: '',
      metrics: 'PCC, Accuracy',
      T: 0,
      ph: 0,
      author: 'Parthiban',
      year: 2006,
      doi: 'https://doi.org/10.1093/nar/gkl190',
      reference:
        'Parthiban, V., Gromiha, M. M., & Schomburg, D. (2006). CUPSAT: prediction of protein stability upon point mutations. Nucleic Acids Research, 34(Web Server), W239–W242. https://doi.org/10.1093/nar/gkl190',
      download: '',
      server: 'http://cupsat.tu-bs.de/',
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

.scale-w-enter,
.scale-w-enter-from,
.scale-w-leave,
.scale-w-leave-to {
  transform: scaleX(0.5);
  /* -webkit-transform: translate(-100px, 0); */
  /* transform: translate(-100px, 0); */
}
.scale-w-enter-active,
.scale-w-leave-active,
.scale-w-move {
  transition: all 0.2s ease;
}
.scale-w-leave-active {
  position: absolute;
}
</style>
