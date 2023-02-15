<template lang="pug">
v-layout(style='width: 100%')
  v-col(style='width: 100%')
    v-row.ma-4.d-flex.align-center(v-if='typeof id == "string"')
      v-col(cols=9)
        span.heading-1.float-left
          span.font-weight-bold {{ dataset.fileName }}
          //- span ({{ dataset.fileSize }})
        v-btn.ml-2(
          outlined,
          large,
          :href='`/proddg/datasets/${datasetId}`',
          @click='expandDataset()',
          target='_blank',
          text
        )
          span Show more
          v-icon mdi-open-in-new
        v-btn.ml-2(
          outlined,
          large,
          :href='`https://api.ivankovlab.ru/files/${dataset.fileName}`',
          text,
          @click='download()',
          :disabled='typeof dataset.fileName == undefined'
        )
          span Download
          v-icon mdi-download-outline
      v-col(cols=3)
        v-btn(outlined, large, text, @click='$emit("closeDialog")')
          v-icon mdi-close
    v-row.ma-4.d-flex.align-center(v-else)
      span.text-h4.float-left
        span(v-if='dataset.fileName').font-weight-bold {{ dataset.fileName }}
        span(v-else).font-weight-bold {{ dataset.name }}
        //- span ({{ dataset.fileSize }})
      v-spacer
      v-btn.ml-2(
        outlined,
        large,
        :href='`https://api.ivankovlab.ru/files/${dataset.fileName}`',
        text,
        @click='download()'
        :disabled='!dataset.fileName'
      )
        span Download
        v-icon mdi-download-outline
    v-row.ma-4.d-flex
      span.text-left(v-html='sources')
    v-row.ma-4
      v-simple-table.mt-6.ml-6(dense)
        template(v-slot:default)
          thead
            tr
              th
              th.text-center(v-for='title in amkTableHeaders', :key='title') {{ title }}
          tbody
            tr(v-for='(items, i) in amkTable', :key='i')
              td {{ amkTableHeaders[i] }}
              td(
                v-for='(item, j) in items',
                :key='j',
                :style='getMuationColor(item)'
              ) {{ i == j ? '' : item }}
      Bar#bar-chart.mx-auto(
        :chart-options='chartOptions',
        :chart-data='chartData',
        width='600',
        dataset-id-key='label',
        v-if='chartData.datasets[0].data.length'
      )
    v-row.ma-4(v-if='typeof id == "undefined"')
      //- Mutations component here
      Mutations(
        :data='data_sample.data',
        :headers='mutations_headers',
        :filters='filters',
        :autofocus='false'
      )
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { downloadDataset, putActions } from '@/utils/api'
import { namespace } from 'vuex-class'
import { Dataset } from '@/models/Dataset'
import { getDatasetOverview } from '@/utils/api'

import { Bar } from 'vue-chartjs/legacy'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js'
import Mutations from '../components/Mutations.vue'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const AppStore = namespace('AppStore')
const ActionStore = namespace('ActionStore')
const SnackbarStore = namespace('SnackbarStore')

@Component({
  props: {
    id: String,
    name: String,
  },
  components: {
    Bar: Bar,
    Mutations,
  },
})
export default class Datasets extends Vue {
  @AppStore.State datasets?: Dataset[] | undefined

  @ActionStore.Mutation pushAction!: (action: object) => void
  @SnackbarStore.Mutation setSnackbarError!: (message: string) => void

  id?: string | undefined
  name?: string | undefined
  name_: string | null = null

  get mutations_headers() {
    return this.$t('mutations_headers')
  }

  dataset: Dataset = {
    showSkeleton: false,
    _id: '63232465f613478fd2aa8c29',
    name: 'not found',
    fileName: undefined,
    origin: 'original',
    size: 1615,
    source: 'Protherm',
    mutations: 'single',
    symmetrized: false,
    available: true,
    doi: 'https://doi.org/10.1093/bioinformatics/bth928',
    author: 'Capriotti',
    year: 2004,
    reference:
      'Capriotti, E., Fariselli, P., & Casadio, R. (2004). A neural-network-based method for predicting protein stability changes upon single point mutations. Bioinformatics, 20(Suppl 1), i63–i68. https://doi.org/10.1093/bioinformatics/bth928',
    proteins: 41,
  }

  amkTableHeaders = [
    'A',
    'R',
    'N',
    'D',
    'C',
    'E',
    'Q',
    'G',
    'H',
    'I',
    'L',
    'K',
    'M',
    'F',
    'P',
    'S',
    'T',
    'W',
    'Y',
    'V',
  ]

  amkTable: number[][] = []

  get mutationsMax() {
    let maxRow = this.amkTable.map(function (row) {
      return Math.max.apply(Math, row)
    })
    return Math.max.apply(null, maxRow)
  }

  tickLabelsByData(param: string) {
    const values = this.data_sample.data.map((el) => el[param])
    // Group near values or data-augmentation
    let valuesProcessed
    if (param == 'size' || param == 'proteins' || param == 'T') {
      valuesProcessed = values.map((el) => Math.round(el / 50) * 50)
    } else if (param == 'ddG' || param == 'pH') 
      valuesProcessed = values.map((el) => Math.round(el / 1.5) * 1.5)
    else valuesProcessed = values
    const valuesReduced: Map<
      number,
      Map<number, number>
    > = valuesProcessed.reduce(
      (acc, e) => acc.set(e, (acc.get(e) || 0) + 1),
      new Map()
    )
    return [...valuesReduced.values()]
  }

  get sources() {
    if (typeof this.dataset.source == typeof undefined) return ''
    //@ts-ignore
    const splitted = this.dataset.source.split(',')
    let result = 'Sources: '
    for (let i = 0; i < splitted.length; i++) {
      if (splitted[i].indexOf('https://doi.org') + 1)
        result += `<a href="${splitted[i]}" target='_blank'>${splitted[i].slice(
          splitted[i].indexOf('https://doi.org') + 16
        )}</a>, `
      else result += `${splitted[i]}, `
    }
    if (result.slice(-2) == ', ') result = result.slice(0, -2)
    return result
  }

  get datasetByName() {
    if (typeof this.datasets == typeof undefined) return undefined
    return (this.datasets as Dataset[]).filter(
      (dataset) => dataset.name == this.datasetName
    )[0]
  }

  getMuationColor(n: number) {
    let style = `background: hsl(175deg 60% 40% / ${
      (n / this.mutationsMax) * 100
    }%)`
    if (!n) return style.concat(`;color: #888`)
    return style
  }

  chartData = {
    labels: [],
    datasets: [
      {
        label: 'Number of entries',
        borderColor: 'rgba(255,255,0,1)',
        data: [],
      },
    ],
  }
  chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: 'ΔΔG (kcal/mol)',
      },
    },
    scales: {
      x: {
        grid: {
          color: () => {
            return this.$vuetify.theme.themes[this.$vuetify.theme.dark ? 'dark' : 'light']['lineAccent']
          }
        }
      },
      y: {
        grid: {
          color: () => {
            return this.$vuetify.theme.themes[this.$vuetify.theme.dark ? 'dark' : 'light']['lineAccent']
          }
        }
      }
    },
  }

  expandDataset() {
    this.pushAction({
      type: 'click',
      timestamp: Number(Date.now()),
      btn_id: '#open-dataset-in-new',
      page_href: this.$router.currentRoute.path,
    })
  }

  download() {
    this.pushAction({
      type: 'download',
      timestamp: Number(Date.now()),
      btn_id: '#download',
      page_href: this.$router.currentRoute.path,
    })
    // downloadDataset(this.id as string)
    putActions()
  }

  // TODO: make everything sortable except 'chain'

  data_sample = {
    data: [],
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
      title: 'Organism',
      value: 'organism',
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

  get datasetName() {
    if (typeof this.name != typeof undefined) return this.name
    if (typeof this.name_ != typeof null) return this.name_
    return this.$router.currentRoute.path.split('/').pop()
  }

  get datasetId() {
    if (typeof this.id != typeof undefined) return this.id
    if (typeof this.name != typeof undefined && this.datasets)
      return this.datasets.filter((el) => el.name == this.name)[0]._id
    if (this.datasets)
      return this.datasets.filter(
        (el) => el.name == this.$router.currentRoute.path.split('/').pop()
      )[0]._id
  }

  async getDatasetOverview() {
    // api request
    let resp = await getDatasetOverview(this.datasetId as string)
    // console.log(resp)
    this.dataset = resp.meta
    // check if there's a file form the dataset
    if (typeof resp.data == typeof undefined) return
    this.amkTable = resp.amkTable
    this.chartData.labels = resp.ddg.headers
    //@ts-ignore
    this.chartData.datasets[0].backgroundColor = this.$vuetify.theme.themes[this.$vuetify.theme.dark ? 'dark' : 'light']['primary'] as string
    this.chartData.datasets[0].borderColor = this.$vuetify.theme.themes[this.$vuetify.theme.dark ? 'dark' : 'light']['accent'] as string
    //@ts-ignore
    this.chartData.datasets[0].data = resp.ddg.data as number[]
    //@ts-ignore
    this.data_sample.data = resp.data as object[]
    const generateTicks = ['ddG', 'pH', 'T']
    generateTicks.forEach((fieldName) => {
      this.filters[
        this.filters.findIndex((el) => el.value == fieldName)
      ].tickLabels = this.tickLabelsByData(fieldName)
    })
    // console.log(this.chartData)
    // return this.data_sample
  }

  setTitle() {
    document.title = this.dataset.name
  }

  mounted() {
    // get dataset id
    if (typeof this.name == typeof undefined) {
      if (typeof this.datasetName == typeof undefined)
        this.setSnackbarError('dataset id is not valid')
    } else this.name_ = this.name as string

    // Get Dataset Info from the store
    if (typeof this.datasetName != typeof undefined)
      if (typeof this.datasetByName != typeof undefined)
        this.dataset = this.datasetByName as Dataset

    this.getDatasetOverview().then(() => {
      // this is not a passed prop, so it's a new page
      if (typeof this.name == typeof undefined) this.setTitle()

      // @ts-ignore
      this.filters[
        this.filters.findIndex((el) => el.value == 'organism')
      ].items = [...new Set(this.data_sample.data.map((el: any) => el.organism))]
    })
    console.log(this.dataset)
  }
}
</script>

<style scoped>
#bar-chart {
  max-width: 50vw;
  background: var(--v-accent);
}
</style>
