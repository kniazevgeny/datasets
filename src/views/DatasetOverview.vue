<template lang="pug">
v-layout(style='width: 100%')
  v-col
    //- TODO: add licence plate
    v-row.ma-4.d-flex.align-center(v-if='typeof id == "string"')
      span.heading-1.float-left
        span.font-weight-bold {{ fileName }}
        //- span ({{ dataset.fileSize }})
      v-btn.ml-2(
        outlined,
        large,
        :href='`/datasets/datasets/${datasetId}`',
        @click='expandDataset()',
        target='_blank',
        text
      )
        span Show more
        v-icon mdi-open-in-new
      v-btn.ml-2(
        outlined,
        large,
        :href='`https://api.ivankovlab.ru/files/${fileName}`',
        text,
        @click='download()',
        :disabled='typeof fileName == "undefined"'
      )
        span Download
        v-icon mdi-download-outline
      v-spacer
      v-btn(outlined, large, text, @click='$emit("closeDialog")')
        v-icon mdi-close
    v-row.ma-4.d-flex.align-center(v-else)
      span.heading-1.float-left
        span.font-weight-bold {{ dataset.fileName }}
        //- span ({{ dataset.fileSize }})
      v-spacer
      v-btn.ml-2(
        outlined,
        large,
        :href='`https://api.ivankovlab.ru/files/${fileName_}`',
        text,
        @click='download()'
      )
        span Download
        v-icon mdi-download-outline
    v-row.ma-4 
      v-simple-table(dense)
        template(v-slot:default)
          thead
            tr
              th
              th.text-center(v-for='title in amkTableHeaders', :key='title') {{ title }}
          tbody
            tr(v-for='(items, i) in amkTable', :key='i')
              td {{ amkTableHeaders[i] }}
              td.font-weight-bold(
                v-for='(item, j) in items',
                :key='j',
                :style='getMuationColor(item)'
              ) {{ i == j ? '' : item }}
      //- Charts here
      //- vue-chart-js for ddg perpesentation
      //- v-simple-table with reactive color set-up
    v-row.ma-4 
      Bar(
        :chart-options='chartOptions',
        :chart-data='chartData',
        dataset-id-key='label',
        v-if='chartData.datasets[0].data.length'
      )
    v-row.ma-4(v-if='typeof id == "undefined"')
      v-data-table(
        fixed-header,
        :headers='data_sample.headers',
        :items='data_sample.data',
        item-key='name',
        checkbox-color='primary',
        multi-sort
      )
        template(v-slot:item.pdb='{ item }')
          a(:href='`https://www.rcsb.org/structure/${item.pdb}`' target="_blank") {{ item.pdb }}
        template(v-slot:item.uniprot='{ item }')
          a(:href='`https://www.uniprot.org/uniprotkb/${item.uniprot}`' target="_blank") {{ item.uniprot }}
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

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const AppStore = namespace('AppStore')
const ActionStore = namespace('ActionStore')
const SnackbarStore = namespace('SnackbarStore')

@Component({
  props: {
    id: String,
    fileName: String,
    name: String,
  },
  components: {
    Bar: Bar,
  },
})
export default class Datasets extends Vue {
  @AppStore.State datasets?: Dataset[] | undefined

  @ActionStore.Mutation pushAction!: (action: object) => void
  @SnackbarStore.Mutation setSnackbarError!: (message: string) => void

  id?: string | undefined
  id_: string | null = null
  fileName?: string | undefined
  fileName_: string | null = null
  name!: string
  name_: string | null = null

  dataset: Dataset = {
    showSkeleton: false,
    _id: '63232465f613478fd2aa8c29',
    name: 'I-Mutant-S1615',
    fileName: '',
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

  get datasetById() {
    if (typeof this.datasets == typeof undefined) return undefined
    return (this.datasets as Dataset[]).filter(
      (dataset) => dataset._id == this.datasetId
    )
  }

  getMuationColor(n: number) {
    let style = `background: hsl(231deg 100% 66% / ${
      (n / this.mutationsMax) * 100
    }%)`
    if (!n) return style.concat(`;color: #888`)
    return style
  }

  geterateMutationsSample() {
    // enable if backend if unavailable
    return
    for (let i = 0; i < 20; i++) {
      let arr: number[] = []
      const anchor = Math.round(Math.random() * 155) + 10
      for (let j = 0; j < 20; j++) {
        if (i == j) arr.push(-1)
        else arr.push(Math.round(Math.random() * 20 - 10 + anchor))
      }
      this.amkTable.push(arr)
    }
    console.log(this.amkTable)
  }

  chartData = {
    labels: [],
    datasets: [
      {
        label: 'ddg',
        backgroundColor: '#14c',
        data: [],
      },
    ],
  }
  chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
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
    headers: [
      {
        text: 'Variation',
        value: 'mutation',
        align: 'start',
        sortable: false,
      },
      { text: 'ddg', value: 'ddG', sortable: true },
      { text: 'pdb', value: 'pdb', sortable: false, align: 'start' },
      { text: 'chain', value: 'chain', sortable: false, align: 'start' },
      { text: 'uniprot', value: 'uniprot', sortable: false },
      { text: 'mutation', value: 'mutation', sortable: false, align: 'start' },
      { text: 'organism', value: 'organism', sortable: false, align: 'start' },
      {
        text: 'protein name',
        value: 'protein',
        sortable: false,
        align: 'start',
      },
    ],
  }

  get datasetId() {
    if (typeof this.id != typeof undefined) return this.id
    if (typeof this.id_ != typeof null) return this.id_
    return this.$router.currentRoute.path.split('/').pop()
  }

  async getDatasetOverview() {
    // api request
    let resp = await getDatasetOverview(this.datasetId as string)
    // console.log(resp)
    this.amkTable = resp.amkTable
    this.chartData.labels = resp.ddg.headers
    this.chartData.datasets[0].backgroundColor = this.$vuetify.theme.themes
      .light['primary'] as string
    this.chartData.datasets[0].data = resp.ddg.data as number[]
    this.data_sample.data = resp.data as object[]
    this.dataset = resp.meta
    // console.log(this.chartData)
    // return this.data_sample
  }

  setTitle() {
    document.title = this.dataset.name
  }

  mounted() {
    // get dataset id
    if (typeof this.id == typeof undefined) {
      if (typeof this.datasetId == typeof undefined)
        this.setSnackbarError('dataset id is not valid')
    } else this.id_ = this.id

    // Get Dataset Info from the store
    if (typeof this.datasetId != typeof undefined)
      if (typeof this.datasetById != typeof undefined)
        this.dataset = this.datasetById

    this.getDatasetOverview().then(() => {
      // this is not a passed prop, so it's a new page
      if (typeof this.id == typeof undefined) this.setTitle()
    })
    this.geterateMutationsSample()
  }
}
</script>

<style scoped></style>
