<template lang="pug">
v-layout(style='width: 100%')
  v-col
    v-row.ma-4.d-flex.align-center(v-if='typeof id == "string"')
      v-col(cols=9)
        span.heading-1.float-left
          span.font-weight-bold {{ dataset.fileName }}
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
      span.heading-1.float-left
        span.font-weight-bold {{ dataset.fileName }}
        //- span ({{ dataset.fileSize }})
      v-spacer
      v-btn.ml-2(
        outlined,
        large,
        :href='`https://api.ivankovlab.ru/files/${dataset.fileName}`',
        text,
        @click='download()'
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
              td.font-weight-bold(
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
      v-data-table(
        fixed-header,
        :headers='data_sample.headers',
        :items='data_sample.data',
        item-key='name',
        checkbox-color='primary',
        multi-sort,
      )
        template(v-slot:header.protein='{ header }')
          v-tooltip(top, max-width='475')
            template(v-slot:activator='{ on, attrs }')
              span(v-on='on', v-bind='attrs') {{ header.text }}
            span {{ header.description }}
        template(v-slot:header.mutation='{ header }')
          v-tooltip(top, max-width='475')
            template(v-slot:activator='{ on, attrs }')
              span(v-on='on', v-bind='attrs') {{ header.text }}
            span {{ header.description }}
        template(v-slot:header.ddG='{ header }')
          v-tooltip(top, max-width='475')
            template(v-slot:activator='{ on, attrs }')
              span(v-on='on', v-bind='attrs') {{ header.text }}
            span {{ header.description }}
        template(v-slot:header.sequence='{ header }')
          v-tooltip(top, max-width='475')
            template(v-slot:activator='{ on, attrs }')
              span(v-on='on', v-bind='attrs') {{ header.text }}
            span {{ header.description }}
        template(v-slot:header.pdb='{ header }')
          v-tooltip(top, max-width='475')
            template(v-slot:activator='{ on, attrs }')
              span(v-on='on', v-bind='attrs') {{ header.text }}
            span {{ header.description }}
        template(v-slot:header.chain='{ header }')
          v-tooltip(top, max-width='475')
            template(v-slot:activator='{ on, attrs }')
              span(v-on='on', v-bind='attrs') {{ header.text }}
            span {{ header.description }}
        template(v-slot:header.uniprot='{ header }')
          v-tooltip(top, max-width='475')
            template(v-slot:activator='{ on, attrs }')
              span(v-on='on', v-bind='attrs') {{ header.text }}
            span {{ header.description }}
        template(v-slot:header.alphafolddb='{ header }')
          v-tooltip(top, max-width='475')
            template(v-slot:activator='{ on, attrs }')
              span(v-on='on', v-bind='attrs') {{ header.text }}
            span {{ header.description }}
        template(v-slot:header.T='{ header }')
          v-tooltip(top, max-width='475')
            template(v-slot:activator='{ on, attrs }')
              span(v-on='on', v-bind='attrs') {{ header.text }}
            span {{ header.description }}
        template(v-slot:header.pH='{ header }')
          v-tooltip(top, max-width='475')
            template(v-slot:activator='{ on, attrs }')
              span(v-on='on', v-bind='attrs') {{ header.text }}
            span {{ header.description }}
        template(v-slot:header.method='{ header }')
          v-tooltip(top, max-width='475')
            template(v-slot:activator='{ on, attrs }')
              span(v-on='on', v-bind='attrs') {{ header.text }}
            span {{ header.description }}
        template(v-slot:header.measure='{ header }')
          v-tooltip(top, max-width='475')
            template(v-slot:activator='{ on, attrs }')
              span(v-on='on', v-bind='attrs') {{ header.text }}
            span {{ header.description }}
        template(v-slot:header.doi='{ header }')
          v-tooltip(top, max-width='475')
            template(v-slot:activator='{ on, attrs }')
              span(v-on='on', v-bind='attrs') {{ header.text }}
            span {{ header.description }}
        template(v-slot:item.pdb='{ item }')
          a(
            :href='`https://www.rcsb.org/structure/${item.pdb}`',
            target='_blank'
          ) {{ item.pdb }}
        template(v-slot:item.uniprot='{ item }')
          a(
            :href='`https://www.uniprot.org/uniprotkb/${item.uniprot}`',
            target='_blank'
          ) {{ item.uniprot }}
        template(v-slot:item.alphafolddb='{ item }')
          a(
            :href='`https://alphafold.ebi.ac.uk/entry/${item.uniprot}`',
            target='_blank'
          ) {{ item.uniprot }}
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
  name?: string | undefined
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

  get sources() {
    if (typeof this.dataset.source == typeof undefined) return ''
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
        label: 'Number of entries',
        backgroundColor: '#14c',
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
        text: 'protein name',
        value: 'protein',
        description: 'Name of the protein studied in the experiment.',
        sortable: true,
        align: 'start',
      },
      {
        text: 'Mutation',
        value: 'mutation',
        description:
          'Mutation studied in the experiment. Residue numbering corresponds to that in the PDB structure. If no PDB structure is available, the residue is numbered according to the sequence specifieed in "Sequence" column.',
        align: 'start',
        sortable: true,
      },
      {
        text: 'ΔΔG',
        value: 'ddG',
        description:
          'Free energy change of folding, kcal/mol. Negative values denote stabilization.',
        sortable: true,
      },
      {
        text: 'Sequence',
        value: 'sequence',
        description: 'The sequence of the protein used in the experiment.',
        sortable: true,
      },
      {
        text: 'PDB ID',
        value: 'pdb',
        description: 'PDB ID of the protein structure if available.',
        sortable: true,
        align: 'start',
      },
      {
        text: 'chain',
        value: 'chain',
        description: 'Chain identifier of the protein structure.',
        sortable: false,
        align: 'start',
      },
      {
        text: 'uniprot',
        value: 'uniprot',
        description: 'Chain identifier of the protein structure.',
        sortable: true,
      },
      {
        text: 'AlphaFold DB',
        value: 'alphafolddb',
        description: 'Protein model in AlphaFold database.',
        sortable: true,
      },
      // { text: 'organism', value: 'organism', sortable: true, align: 'start' },
      {
        text: 'Temperature',
        value: 'T',
        description: 'Temperature of the experiment in kelvins.',
        sortable: true,
      },
      {
        text: 'pH',
        value: 'pH',
        description: 'pH of the experiment.',
        sortable: true,
      },
      {
        text: 'method',
        value: 'method',
        description:
          'Method of measuring the folding free energy change in the experiment.',
        sortable: true,
      },
      {
        text: 'measure',
        value: 'measure',
        description: 'Signal measured in the experiment.',
        sortable: true,
      },
      {
        text: 'reference',
        value: 'doi',
        description: 'Experiment reference.',
        sortable: true,
      },
    ],
  }

  get datasetName() {
    if (typeof this.name != typeof undefined) return this.name
    if (typeof this.name_ != typeof null) return this.name_
    return this.$router.currentRoute.path.split('/').pop()
  }

  get datasetId() {
    if (typeof this.id != typeof undefined) return this.id
    if (typeof this.name != typeof undefined)
      return this.datasets.filter((el) => el.name == this.name)[0]._id
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
    this.chartData.datasets[0].backgroundColor = this.$vuetify.theme.themes
      .light['primary'] as string
    this.chartData.datasets[0].data = resp.ddg.data as number[]
    this.data_sample.data = resp.data as object[]
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
    } else this.name_ = this.name

    // Get Dataset Info from the store
    if (typeof this.datasetName != typeof undefined)
      if (typeof this.datasetByName != typeof undefined)
        this.dataset = this.datasetByName

    this.getDatasetOverview().then(() => {
      // this is not a passed prop, so it's a new page
      if (typeof this.name == typeof undefined) this.setTitle()
    })
    this.geterateMutationsSample()
  }
}
</script>

<style scoped>
#bar-chart {
  max-width: 50vw;
}
</style>
