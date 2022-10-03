<template lang="pug">
v-layout(style='width: 100%')
  v-col
    //- TODO: add licence plate
    v-row.ma-4.d-flex.align-center(v-if='typeof id == "string"')
      span.heading-1.float-left
        span.font-weight-bold {{ fileName }}
        //- span ({{ overview_sample.fileSize }})
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
        span.font-weight-bold {{ overview_sample.fileName }}
        //- span ({{ overview_sample.fileSize }})
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
              th.text-center(v-for='title in mutations_headers', :key='title') {{ title }}
          tbody
            tr(v-for='(items, i) in mutations_sample', :key='i')
              td {{ mutations_headers[i] }}
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
      v-data-table.unavailable(
        fixed-header,
        :headers='data_sample.headers',
        :items='data_sample.data',
        item-key='name',
        checkbox-color='primary',
        multi-sort
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

  overview_sample: Dataset = {
    _id: '632abe3f48aa669c4a139310',
    author: 'Parthiban',
    available: false,
    doi: 'https://doi.org/10.1093/nar/gkl190',
    mutations: 'single',
    name: 'CUPSAT-1603',
    origin: 'original',
    reference:
      'Parthiban, V., Gromiha, M. M., & Schomburg, D. (2006). CUPSAT: prediction of protein stability upon point mutations. Nucleic Acids Research, 34(Web Server), W239–W242. https://doi.org/10.1093/nar/gkl190',
    size: 1603,
    source:
      'Protherm, https://doi.org/10.1093/protein/10.1.7, https://doi.org/10.1002/pro.5560070117, https://doi.org/10.1073/pnas.84.13.4441',
    symmetrized: false,
    year: 2006,
    overview: {},
  }

  mutations_headers = [
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

  mutations_sample: number[][] = []

  get mutations_max() {
    let maxRow = this.mutations_sample.map(function (row) {
      return Math.max.apply(Math, row)
    })
    return Math.max.apply(null, maxRow)
  }

  getMuationColor(n: number) {
    let style = `background: hsl(231deg 100% 66% / ${
      (n / this.mutations_max) * 100
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
      this.mutations_sample.push(arr)
    }
    console.log(this.mutations_sample)
  }

  chartData = {
    labels: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ],
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

  data_sample = {
    data: [
      {
        variation: 'Q104H',
        ddg: -0.24,
        pdb: '2ocj',
        chain: 'A',
        uniprot: 'P04637',
        mutation: 'wt',
        proteinName: 'DNA-binding domain of human p53',
        sequence:
          'SSSVPSQKTYQGSYGFRLGFLHSGTAKSVTCTYSPALNKMFCQLAKTCPVQLWVDSTPPPGTRVRAMAIYKQSQHMTEVVRRCPHHERCSDSDGLAPPQHLIRVEGNLRVEYLDDRNTFRHSVVVPYEPPEVGSDCTTIHYNYMCNSSCMGGMNRRPILTIITLEDSSGNLLGRNSFEVRVCACPGRDRRTEEENLRKKGEPHHELPPGSTKRALPNNT',
      },
      {
        variation: 'Q104P',
        ddg: -0.11,
        pdb: '2ocj',
        chain: 'A',
        uniprot: 'P04637',
        mutation: 'wt',
        proteinName: 'DNA-binding domain of human p53',
        sequence:
          'SSSVPSQKTYQGSYGFRLGFLHSGTAKSVTCTYSPALNKMFCQLAKTCPVQLWVDSTPPPGTRVRAMAIYKQSQHMTEVVRRCPHHERCSDSDGLAPPQHLIRVEGNLRVEYLDDRNTFRHSVVVPYEPPEVGSDCTTIHYNYMCNSSCMGGMNRRPILTIITLEDSSGNLLGRNSFEVRVCACPGRDRRTEEENLRKKGEPHHELPPGSTKRALPNNT',
      },
      {
        variation: 'T123A',
        ddg: 0.13,
        pdb: '2ocj',
        chain: 'A',
        uniprot: 'P04637',
        mutation: 'wt',
        proteinName: 'DNA-binding domain of human p53',
        sequence:
          'SSSVPSQKTYQGSYGFRLGFLHSGTAKSVTCTYSPALNKMFCQLAKTCPVQLWVDSTPPPGTRVRAMAIYKQSQHMTEVVRRCPHHERCSDSDGLAPPQHLIRVEGNLRVEYLDDRNTFRHSVVVPYEPPEVGSDCTTIHYNYMCNSSCMGGMNRRPILTIITLEDSSGNLLGRNSFEVRVCACPGRDRRTEEENLRKKGEPHHELPPGSTKRALPNNT',
      },
      {
        variation: 'A129D',
        ddg: 0.7,
        pdb: '2ocj',
        chain: 'A',
        uniprot: 'P04637',
        mutation: 'wt',
        proteinName: 'DNA-binding domain of human p53',
        sequence:
          'SSSVPSQKTYQGSYGFRLGFLHSGTAKSVTCTYSPALNKMFCQLAKTCPVQLWVDSTPPPGTRVRAMAIYKQSQHMTEVVRRCPHHERCSDSDGLAPPQHLIRVEGNLRVEYLDDRNTFRHSVVVPYEPPEVGSDCTTIHYNYMCNSSCMGGMNRRPILTIITLEDSSGNLLGRNSFEVRVCACPGRDRRTEEENLRKKGEPHHELPPGSTKRALPNNT',
      },
      {
        variation: 'A129E',
        ddg: 0.38,
        pdb: '2ocj',
        chain: 'A',
        uniprot: 'P04637',
        mutation: 'wt',
        proteinName: 'DNA-binding domain of human p53',
        sequence:
          'SSSVPSQKTYQGSYGFRLGFLHSGTAKSVTCTYSPALNKMFCQLAKTCPVQLWVDSTPPPGTRVRAMAIYKQSQHMTEVVRRCPHHERCSDSDGLAPPQHLIRVEGNLRVEYLDDRNTFRHSVVVPYEPPEVGSDCTTIHYNYMCNSSCMGGMNRRPILTIITLEDSSGNLLGRNSFEVRVCACPGRDRRTEEENLRKKGEPHHELPPGSTKRALPNNT',
      },
      {
        variation: 'A129S',
        ddg: 0.19,
        pdb: '2ocj',
        chain: 'A',
        uniprot: 'P04637',
        mutation: 'wt',
        proteinName: 'DNA-binding domain of human p53',
        sequence:
          'SSSVPSQKTYQGSYGFRLGFLHSGTAKSVTCTYSPALNKMFCQLAKTCPVQLWVDSTPPPGTRVRAMAIYKQSQHMTEVVRRCPHHERCSDSDGLAPPQHLIRVEGNLRVEYLDDRNTFRHSVVVPYEPPEVGSDCTTIHYNYMCNSSCMGGMNRRPILTIITLEDSSGNLLGRNSFEVRVCACPGRDRRTEEENLRKKGEPHHELPPGSTKRALPNNT',
      },
      {
        variation: 'M133L',
        ddg: -0.3,
        pdb: '2ocj',
        chain: 'A',
        uniprot: 'P04637',
        mutation: 'wt',
        proteinName: 'DNA-binding domain of human p53',
        sequence:
          'SSSVPSQKTYQGSYGFRLGFLHSGTAKSVTCTYSPALNKMFCQLAKTCPVQLWVDSTPPPGTRVRAMAIYKQSQHMTEVVRRCPHHERCSDSDGLAPPQHLIRVEGNLRVEYLDDRNTFRHSVVVPYEPPEVGSDCTTIHYNYMCNSSCMGGMNRRPILTIITLEDSSGNLLGRNSFEVRVCACPGRDRRTEEENLRKKGEPHHELPPGSTKRALPNNT',
      },
      {
        variation: 'F134L',
        ddg: 4.78,
        pdb: '2ocj',
        chain: 'A',
        uniprot: 'P04637',
        mutation: 'wt',
        proteinName: 'DNA-binding domain of human p53',
        sequence:
          'SSSVPSQKTYQGSYGFRLGFLHSGTAKSVTCTYSPALNKMFCQLAKTCPVQLWVDSTPPPGTRVRAMAIYKQSQHMTEVVRRCPHHERCSDSDGLAPPQHLIRVEGNLRVEYLDDRNTFRHSVVVPYEPPEVGSDCTTIHYNYMCNSSCMGGMNRRPILTIITLEDSSGNLLGRNSFEVRVCACPGRDRRTEEENLRKKGEPHHELPPGSTKRALPNNT',
      },
      {
        variation: 'V143A',
        ddg: 3.5,
        pdb: '2ocj',
        chain: 'A',
        uniprot: 'P04637',
        mutation: 'wt',
        proteinName: 'DNA-binding domain of human p53',
        sequence:
          'SSSVPSQKTYQGSYGFRLGFLHSGTAKSVTCTYSPALNKMFCQLAKTCPVQLWVDSTPPPGTRVRAMAIYKQSQHMTEVVRRCPHHERCSDSDGLAPPQHLIRVEGNLRVEYLDDRNTFRHSVVVPYEPPEVGSDCTTIHYNYMCNSSCMGGMNRRPILTIITLEDSSGNLLGRNSFEVRVCACPGRDRRTEEENLRKKGEPHHELPPGSTKRALPNNT',
      },
      {
        variation: 'L145Q',
        ddg: 2.98,
        pdb: '2ocj',
        chain: 'A',
        uniprot: 'P04637',
        mutation: 'wt',
        proteinName: 'DNA-binding domain of human p53',
        sequence:
          'SSSVPSQKTYQGSYGFRLGFLHSGTAKSVTCTYSPALNKMFCQLAKTCPVQLWVDSTPPPGTRVRAMAIYKQSQHMTEVVRRCPHHERCSDSDGLAPPQHLIRVEGNLRVEYLDDRNTFRHSVVVPYEPPEVGSDCTTIHYNYMCNSSCMGGMNRRPILTIITLEDSSGNLLGRNSFEVRVCACPGRDRRTEEENLRKKGEPHHELPPGSTKRALPNNT',
      },
      {
        variation: 'D148E',
        ddg: 0.43,
        pdb: '2ocj',
        chain: 'A',
        uniprot: 'P04637',
        mutation: 'wt',
        proteinName: 'DNA-binding domain of human p53',
        sequence:
          'SSSVPSQKTYQGSYGFRLGFLHSGTAKSVTCTYSPALNKMFCQLAKTCPVQLWVDSTPPPGTRVRAMAIYKQSQHMTEVVRRCPHHERCSDSDGLAPPQHLIRVEGNLRVEYLDDRNTFRHSVVVPYEPPEVGSDCTTIHYNYMCNSSCMGGMNRRPILTIITLEDSSGNLLGRNSFEVRVCACPGRDRRTEEENLRKKGEPHHELPPGSTKRALPNNT',
      },
      {
        variation: 'D148S',
        ddg: -0.22,
        pdb: '2ocj',
        chain: 'A',
        uniprot: 'P04637',
        mutation: 'wt',
        proteinName: 'DNA-binding domain of human p53',
        sequence:
          'SSSVPSQKTYQGSYGFRLGFLHSGTAKSVTCTYSPALNKMFCQLAKTCPVQLWVDSTPPPGTRVRAMAIYKQSQHMTEVVRRCPHHERCSDSDGLAPPQHLIRVEGNLRVEYLDDRNTFRHSVVVPYEPPEVGSDCTTIHYNYMCNSSCMGGMNRRPILTIITLEDSSGNLLGRNSFEVRVCACPGRDRRTEEENLRKKGEPHHELPPGSTKRALPNNT',
      },
      {
        variation: 'T150P',
        ddg: 0.08,
        pdb: '2ocj',
        chain: 'A',
        uniprot: 'P04637',
        mutation: 'wt',
        proteinName: 'DNA-binding domain of human p53',
        sequence:
          'SSSVPSQKTYQGSYGFRLGFLHSGTAKSVTCTYSPALNKMFCQLAKTCPVQLWVDSTPPPGTRVRAMAIYKQSQHMTEVVRRCPHHERCSDSDGLAPPQHLIRVEGNLRVEYLDDRNTFRHSVVVPYEPPEVGSDCTTIHYNYMCNSSCMGGMNRRPILTIITLEDSSGNLLGRNSFEVRVCACPGRDRRTEEENLRKKGEPHHELPPGSTKRALPNNT',
      },
      {
        variation: 'P151S',
        ddg: 4.49,
        pdb: '2ocj',
        chain: 'A',
        uniprot: 'P04637',
        mutation: 'wt',
        proteinName: 'DNA-binding domain of human p53',
        sequence:
          'SSSVPSQKTYQGSYGFRLGFLHSGTAKSVTCTYSPALNKMFCQLAKTCPVQLWVDSTPPPGTRVRAMAIYKQSQHMTEVVRRCPHHERCSDSDGLAPPQHLIRVEGNLRVEYLDDRNTFRHSVVVPYEPPEVGSDCTTIHYNYMCNSSCMGGMNRRPILTIITLEDSSGNLLGRNSFEVRVCACPGRDRRTEEENLRKKGEPHHELPPGSTKRALPNNT',
      },
      {
        variation: 'V157F',
        ddg: 3.88,
        pdb: '2ocj',
        chain: 'A',
        uniprot: 'P04637',
        mutation: 'wt',
        proteinName: 'DNA-binding domain of human p53',
        sequence:
          'SSSVPSQKTYQGSYGFRLGFLHSGTAKSVTCTYSPALNKMFCQLAKTCPVQLWVDSTPPPGTRVRAMAIYKQSQHMTEVVRRCPHHERCSDSDGLAPPQHLIRVEGNLRVEYLDDRNTFRHSVVVPYEPPEVGSDCTTIHYNYMCNSSCMGGMNRRPILTIITLEDSSGNLLGRNSFEVRVCACPGRDRRTEEENLRKKGEPHHELPPGSTKRALPNNT',
      },
      {
        variation: 'Q165K',
        ddg: 1.27,
        pdb: '2ocj',
        chain: 'A',
        uniprot: 'P04637',
        mutation: 'wt',
        proteinName: 'DNA-binding domain of human p53',
        sequence:
          'SSSVPSQKTYQGSYGFRLGFLHSGTAKSVTCTYSPALNKMFCQLAKTCPVQLWVDSTPPPGTRVRAMAIYKQSQHMTEVVRRCPHHERCSDSDGLAPPQHLIRVEGNLRVEYLDDRNTFRHSVVVPYEPPEVGSDCTTIHYNYMCNSSCMGGMNRRPILTIITLEDSSGNLLGRNSFEVRVCACPGRDRRTEEENLRKKGEPHHELPPGSTKRALPNNT',
      },
      {
        variation: 'Q167E',
        ddg: 0.43,
        pdb: '2ocj',
        chain: 'A',
        uniprot: 'P04637',
        mutation: 'wt',
        proteinName: 'DNA-binding domain of human p53',
        sequence:
          'SSSVPSQKTYQGSYGFRLGFLHSGTAKSVTCTYSPALNKMFCQLAKTCPVQLWVDSTPPPGTRVRAMAIYKQSQHMTEVVRRCPHHERCSDSDGLAPPQHLIRVEGNLRVEYLDDRNTFRHSVVVPYEPPEVGSDCTTIHYNYMCNSSCMGGMNRRPILTIITLEDSSGNLLGRNSFEVRVCACPGRDRRTEEENLRKKGEPHHELPPGSTKRALPNNT',
      },
      {
        variation: 'H168R',
        ddg: 2.75,
        pdb: '2ocj',
        chain: 'A',
        uniprot: 'P04637',
        mutation: 'wt',
        proteinName: 'DNA-binding domain of human p53',
        sequence:
          'SSSVPSQKTYQGSYGFRLGFLHSGTAKSVTCTYSPALNKMFCQLAKTCPVQLWVDSTPPPGTRVRAMAIYKQSQHMTEVVRRCPHHERCSDSDGLAPPQHLIRVEGNLRVEYLDDRNTFRHSVVVPYEPPEVGSDCTTIHYNYMCNSSCMGGMNRRPILTIITLEDSSGNLLGRNSFEVRVCACPGRDRRTEEENLRKKGEPHHELPPGSTKRALPNNT',
      },
      {
        variation: 'R174K',
        ddg: 0.22,
        pdb: '2ocj',
        chain: 'A',
        uniprot: 'P04637',
        mutation: 'wt',
        proteinName: 'DNA-binding domain of human p53',
        sequence:
          'SSSVPSQKTYQGSYGFRLGFLHSGTAKSVTCTYSPALNKMFCQLAKTCPVQLWVDSTPPPGTRVRAMAIYKQSQHMTEVVRRCPHHERCSDSDGLAPPQHLIRVEGNLRVEYLDDRNTFRHSVVVPYEPPEVGSDCTTIHYNYMCNSSCMGGMNRRPILTIITLEDSSGNLLGRNSFEVRVCACPGRDRRTEEENLRKKGEPHHELPPGSTKRALPNNT',
      },
      {
        variation: 'R175A',
        ddg: 0.73,
        pdb: '2ocj',
        chain: 'A',
        uniprot: 'P04637',
        mutation: 'wt',
        proteinName: 'DNA-binding domain of human p53',
        sequence:
          'SSSVPSQKTYQGSYGFRLGFLHSGTAKSVTCTYSPALNKMFCQLAKTCPVQLWVDSTPPPGTRVRAMAIYKQSQHMTEVVRRCPHHERCSDSDGLAPPQHLIRVEGNLRVEYLDDRNTFRHSVVVPYEPPEVGSDCTTIHYNYMCNSSCMGGMNRRPILTIITLEDSSGNLLGRNSFEVRVCACPGRDRRTEEENLRKKGEPHHELPPGSTKRALPNNT',
      },
      {
        variation: 'R175H',
        ddg: 3.52,
        pdb: '2ocj',
        chain: 'A',
        uniprot: 'P04637',
        mutation: 'wt',
        proteinName: 'DNA-binding domain of human p53',
        sequence:
          'SSSVPSQKTYQGSYGFRLGFLHSGTAKSVTCTYSPALNKMFCQLAKTCPVQLWVDSTPPPGTRVRAMAIYKQSQHMTEVVRRCPHHERCSDSDGLAPPQHLIRVEGNLRVEYLDDRNTFRHSVVVPYEPPEVGSDCTTIHYNYMCNSSCMGGMNRRPILTIITLEDSSGNLLGRNSFEVRVCACPGRDRRTEEENLRKKGEPHHELPPGSTKRALPNNT',
      },
      {
        variation: 'C182S',
        ddg: -0.16,
        pdb: '2ocj',
        chain: 'A',
        uniprot: 'P04637',
        mutation: 'wt',
        proteinName: 'DNA-binding domain of human p53',
        sequence:
          'SSSVPSQKTYQGSYGFRLGFLHSGTAKSVTCTYSPALNKMFCQLAKTCPVQLWVDSTPPPGTRVRAMAIYKQSQHMTEVVRRCPHHERCSDSDGLAPPQHLIRVEGNLRVEYLDDRNTFRHSVVVPYEPPEVGSDCTTIHYNYMCNSSCMGGMNRRPILTIITLEDSSGNLLGRNSFEVRVCACPGRDRRTEEENLRKKGEPHHELPPGSTKRALPNNT',
      },
      {
        variation: 'I195T',
        ddg: 4.12,
        pdb: '2ocj',
        chain: 'A',
        uniprot: 'P04637',
        mutation: 'wt',
        proteinName: 'DNA-binding domain of human p53',
        sequence:
          'SSSVPSQKTYQGSYGFRLGFLHSGTAKSVTCTYSPALNKMFCQLAKTCPVQLWVDSTPPPGTRVRAMAIYKQSQHMTEVVRRCPHHERCSDSDGLAPPQHLIRVEGNLRVEYLDDRNTFRHSVVVPYEPPEVGSDCTTIHYNYMCNSSCMGGMNRRPILTIITLEDSSGNLLGRNSFEVRVCACPGRDRRTEEENLRKKGEPHHELPPGSTKRALPNNT',
      },
      {
        variation: 'L201P',
        ddg: -0.35,
        pdb: '2ocj',
        chain: 'A',
        uniprot: 'P04637',
        mutation: 'wt',
        proteinName: 'DNA-binding domain of human p53',
        sequence:
          'SSSVPSQKTYQGSYGFRLGFLHSGTAKSVTCTYSPALNKMFCQLAKTCPVQLWVDSTPPPGTRVRAMAIYKQSQHMTEVVRRCPHHERCSDSDGLAPPQHLIRVEGNLRVEYLDDRNTFRHSVVVPYEPPEVGSDCTTIHYNYMCNSSCMGGMNRRPILTIITLEDSSGNLLGRNSFEVRVCACPGRDRRTEEENLRKKGEPHHELPPGSTKRALPNNT',
      },
      {
        variation: 'V203A',
        ddg: -0.49,
        pdb: '2ocj',
        chain: 'A',
        uniprot: 'P04637',
        mutation: 'wt',
        proteinName: 'DNA-binding domain of human p53',
        sequence:
          'SSSVPSQKTYQGSYGFRLGFLHSGTAKSVTCTYSPALNKMFCQLAKTCPVQLWVDSTPPPGTRVRAMAIYKQSQHMTEVVRRCPHHERCSDSDGLAPPQHLIRVEGNLRVEYLDDRNTFRHSVVVPYEPPEVGSDCTTIHYNYMCNSSCMGGMNRRPILTIITLEDSSGNLLGRNSFEVRVCACPGRDRRTEEENLRKKGEPHHELPPGSTKRALPNNT',
      },
      {
        variation: 'L206S',
        ddg: 0.1,
        pdb: '2ocj',
        chain: 'A',
        uniprot: 'P04637',
        mutation: 'wt',
        proteinName: 'DNA-binding domain of human p53',
        sequence:
          'SSSVPSQKTYQGSYGFRLGFLHSGTAKSVTCTYSPALNKMFCQLAKTCPVQLWVDSTPPPGTRVRAMAIYKQSQHMTEVVRRCPHHERCSDSDGLAPPQHLIRVEGNLRVEYLDDRNTFRHSVVVPYEPPEVGSDCTTIHYNYMCNSSCMGGMNRRPILTIITLEDSSGNLLGRNSFEVRVCACPGRDRRTEEENLRKKGEPHHELPPGSTKRALPNNT',
      },
      {
        variation: 'Y220C',
        ddg: 3.98,
        pdb: '2ocj',
        chain: 'A',
        uniprot: 'P04637',
        mutation: 'wt',
        proteinName: 'DNA-binding domain of human p53',
        sequence:
          'SSSVPSQKTYQGSYGFRLGFLHSGTAKSVTCTYSPALNKMFCQLAKTCPVQLWVDSTPPPGTRVRAMAIYKQSQHMTEVVRRCPHHERCSDSDGLAPPQHLIRVEGNLRVEYLDDRNTFRHSVVVPYEPPEVGSDCTTIHYNYMCNSSCMGGMNRRPILTIITLEDSSGNLLGRNSFEVRVCACPGRDRRTEEENLRKKGEPHHELPPGSTKRALPNNT',
      },
      {
        variation: 'D228E',
        ddg: -0.05,
        pdb: '2ocj',
        chain: 'A',
        uniprot: 'P04637',
        mutation: 'wt',
        proteinName: 'DNA-binding domain of human p53',
        sequence:
          'SSSVPSQKTYQGSYGFRLGFLHSGTAKSVTCTYSPALNKMFCQLAKTCPVQLWVDSTPPPGTRVRAMAIYKQSQHMTEVVRRCPHHERCSDSDGLAPPQHLIRVEGNLRVEYLDDRNTFRHSVVVPYEPPEVGSDCTTIHYNYMCNSSCMGGMNRRPILTIITLEDSSGNLLGRNSFEVRVCACPGRDRRTEEENLRKKGEPHHELPPGSTKRALPNNT',
      },
      {
        variation: 'I232T',
        ddg: 3.19,
        pdb: '2ocj',
        chain: 'A',
        uniprot: 'P04637',
        mutation: 'wt',
        proteinName: 'DNA-binding domain of human p53',
        sequence:
          'SSSVPSQKTYQGSYGFRLGFLHSGTAKSVTCTYSPALNKMFCQLAKTCPVQLWVDSTPPPGTRVRAMAIYKQSQHMTEVVRRCPHHERCSDSDGLAPPQHLIRVEGNLRVEYLDDRNTFRHSVVVPYEPPEVGSDCTTIHYNYMCNSSCMGGMNRRPILTIITLEDSSGNLLGRNSFEVRVCACPGRDRRTEEENLRKKGEPHHELPPGSTKRALPNNT',
      },
      {
        variation: 'Y236F',
        ddg: -0.27,
        pdb: '2ocj',
        chain: 'A',
        uniprot: 'P04637',
        mutation: 'wt',
        proteinName: 'DNA-binding domain of human p53',
        sequence:
          'SSSVPSQKTYQGSYGFRLGFLHSGTAKSVTCTYSPALNKMFCQLAKTCPVQLWVDSTPPPGTRVRAMAIYKQSQHMTEVVRRCPHHERCSDSDGLAPPQHLIRVEGNLRVEYLDDRNTFRHSVVVPYEPPEVGSDCTTIHYNYMCNSSCMGGMNRRPILTIITLEDSSGNLLGRNSFEVRVCACPGRDRRTEEENLRKKGEPHHELPPGSTKRALPNNT',
      },
      {
        variation: 'M237I',
        ddg: 3.18,
        pdb: '2ocj',
        chain: 'A',
        uniprot: 'P04637',
        mutation: 'wt',
        proteinName: 'DNA-binding domain of human p53',
        sequence:
          'SSSVPSQKTYQGSYGFRLGFLHSGTAKSVTCTYSPALNKMFCQLAKTCPVQLWVDSTPPPGTRVRAMAIYKQSQHMTEVVRRCPHHERCSDSDGLAPPQHLIRVEGNLRVEYLDDRNTFRHSVVVPYEPPEVGSDCTTIHYNYMCNSSCMGGMNRRPILTIITLEDSSGNLLGRNSFEVRVCACPGRDRRTEEENLRKKGEPHHELPPGSTKRALPNNT',
      },
      {
        variation: 'N239Y',
        ddg: -1.49,
        pdb: '2ocj',
        chain: 'A',
        uniprot: 'P04637',
        mutation: 'wt',
        proteinName: 'DNA-binding domain of human p53',
        sequence:
          'SSSVPSQKTYQGSYGFRLGFLHSGTAKSVTCTYSPALNKMFCQLAKTCPVQLWVDSTPPPGTRVRAMAIYKQSQHMTEVVRRCPHHERCSDSDGLAPPQHLIRVEGNLRVEYLDDRNTFRHSVVVPYEPPEVGSDCTTIHYNYMCNSSCMGGMNRRPILTIITLEDSSGNLLGRNSFEVRVCACPGRDRRTEEENLRKKGEPHHELPPGSTKRALPNNT',
      },
      {
        variation: 'C242S',
        ddg: 3.07,
        pdb: '2ocj',
        chain: 'A',
        uniprot: 'P04637',
        mutation: 'wt',
        proteinName: 'DNA-binding domain of human p53',
        sequence:
          'SSSVPSQKTYQGSYGFRLGFLHSGTAKSVTCTYSPALNKMFCQLAKTCPVQLWVDSTPPPGTRVRAMAIYKQSQHMTEVVRRCPHHERCSDSDGLAPPQHLIRVEGNLRVEYLDDRNTFRHSVVVPYEPPEVGSDCTTIHYNYMCNSSCMGGMNRRPILTIITLEDSSGNLLGRNSFEVRVCACPGRDRRTEEENLRKKGEPHHELPPGSTKRALPNNT',
      },
      {
        variation: 'G245S',
        ddg: 1.21,
        pdb: '2ocj',
        chain: 'A',
        uniprot: 'P04637',
        mutation: 'wt',
        proteinName: 'DNA-binding domain of human p53',
        sequence:
          'SSSVPSQKTYQGSYGFRLGFLHSGTAKSVTCTYSPALNKMFCQLAKTCPVQLWVDSTPPPGTRVRAMAIYKQSQHMTEVVRRCPHHERCSDSDGLAPPQHLIRVEGNLRVEYLDDRNTFRHSVVVPYEPPEVGSDCTTIHYNYMCNSSCMGGMNRRPILTIITLEDSSGNLLGRNSFEVRVCACPGRDRRTEEENLRKKGEPHHELPPGSTKRALPNNT',
      },
      {
        variation: 'R248Q',
        ddg: 1.87,
        pdb: '2ocj',
        chain: 'A',
        uniprot: 'P04637',
        mutation: 'wt',
        proteinName: 'DNA-binding domain of human p53',
        sequence:
          'SSSVPSQKTYQGSYGFRLGFLHSGTAKSVTCTYSPALNKMFCQLAKTCPVQLWVDSTPPPGTRVRAMAIYKQSQHMTEVVRRCPHHERCSDSDGLAPPQHLIRVEGNLRVEYLDDRNTFRHSVVVPYEPPEVGSDCTTIHYNYMCNSSCMGGMNRRPILTIITLEDSSGNLLGRNSFEVRVCACPGRDRRTEEENLRKKGEPHHELPPGSTKRALPNNT',
      },
      {
        variation: 'R249S',
        ddg: 1.92,
        pdb: '2ocj',
        chain: 'A',
        uniprot: 'P04637',
        mutation: 'wt',
        proteinName: 'DNA-binding domain of human p53',
        sequence:
          'SSSVPSQKTYQGSYGFRLGFLHSGTAKSVTCTYSPALNKMFCQLAKTCPVQLWVDSTPPPGTRVRAMAIYKQSQHMTEVVRRCPHHERCSDSDGLAPPQHLIRVEGNLRVEYLDDRNTFRHSVVVPYEPPEVGSDCTTIHYNYMCNSSCMGGMNRRPILTIITLEDSSGNLLGRNSFEVRVCACPGRDRRTEEENLRKKGEPHHELPPGSTKRALPNNT',
      },
      {
        variation: 'I255F',
        ddg: 3.29,
        pdb: '2ocj',
        chain: 'A',
        uniprot: 'P04637',
        mutation: 'wt',
        proteinName: 'DNA-binding domain of human p53',
        sequence:
          'SSSVPSQKTYQGSYGFRLGFLHSGTAKSVTCTYSPALNKMFCQLAKTCPVQLWVDSTPPPGTRVRAMAIYKQSQHMTEVVRRCPHHERCSDSDGLAPPQHLIRVEGNLRVEYLDDRNTFRHSVVVPYEPPEVGSDCTTIHYNYMCNSSCMGGMNRRPILTIITLEDSSGNLLGRNSFEVRVCACPGRDRRTEEENLRKKGEPHHELPPGSTKRALPNNT',
      },
      {
        variation: 'S260P',
        ddg: 0.32,
        pdb: '2ocj',
        chain: 'A',
        uniprot: 'P04637',
        mutation: 'wt',
        proteinName: 'DNA-binding domain of human p53',
        sequence:
          'SSSVPSQKTYQGSYGFRLGFLHSGTAKSVTCTYSPALNKMFCQLAKTCPVQLWVDSTPPPGTRVRAMAIYKQSQHMTEVVRRCPHHERCSDSDGLAPPQHLIRVEGNLRVEYLDDRNTFRHSVVVPYEPPEVGSDCTTIHYNYMCNSSCMGGMNRRPILTIITLEDSSGNLLGRNSFEVRVCACPGRDRRTEEENLRKKGEPHHELPPGSTKRALPNNT',
      },
      {
        variation: 'N268D',
        ddg: -1.21,
        pdb: '2ocj',
        chain: 'A',
        uniprot: 'P04637',
        mutation: 'wt',
        proteinName: 'DNA-binding domain of human p53',
        sequence:
          'SSSVPSQKTYQGSYGFRLGFLHSGTAKSVTCTYSPALNKMFCQLAKTCPVQLWVDSTPPPGTRVRAMAIYKQSQHMTEVVRRCPHHERCSDSDGLAPPQHLIRVEGNLRVEYLDDRNTFRHSVVVPYEPPEVGSDCTTIHYNYMCNSSCMGGMNRRPILTIITLEDSSGNLLGRNSFEVRVCACPGRDRRTEEENLRKKGEPHHELPPGSTKRALPNNT',
      },
      {
        variation: 'F270C',
        ddg: 4.54,
        pdb: '2ocj',
        chain: 'A',
        uniprot: 'P04637',
        mutation: 'wt',
        proteinName: 'DNA-binding domain of human p53',
        sequence:
          'SSSVPSQKTYQGSYGFRLGFLHSGTAKSVTCTYSPALNKMFCQLAKTCPVQLWVDSTPPPGTRVRAMAIYKQSQHMTEVVRRCPHHERCSDSDGLAPPQHLIRVEGNLRVEYLDDRNTFRHSVVVPYEPPEVGSDCTTIHYNYMCNSSCMGGMNRRPILTIITLEDSSGNLLGRNSFEVRVCACPGRDRRTEEENLRKKGEPHHELPPGSTKRALPNNT',
      },
      {
        variation: 'R273H',
        ddg: 0.45,
        pdb: '2ocj',
        chain: 'A',
        uniprot: 'P04637',
        mutation: 'wt',
        proteinName: 'DNA-binding domain of human p53',
        sequence:
          'SSSVPSQKTYQGSYGFRLGFLHSGTAKSVTCTYSPALNKMFCQLAKTCPVQLWVDSTPPPGTRVRAMAIYKQSQHMTEVVRRCPHHERCSDSDGLAPPQHLIRVEGNLRVEYLDDRNTFRHSVVVPYEPPEVGSDCTTIHYNYMCNSSCMGGMNRRPILTIITLEDSSGNLLGRNSFEVRVCACPGRDRRTEEENLRKKGEPHHELPPGSTKRALPNNT',
      },
      {
        variation: 'R282W',
        ddg: 3.3,
        pdb: '2ocj',
        chain: 'A',
        uniprot: 'P04637',
        mutation: 'wt',
        proteinName: 'DNA-binding domain of human p53',
        sequence:
          'SSSVPSQKTYQGSYGFRLGFLHSGTAKSVTCTYSPALNKMFCQLAKTCPVQLWVDSTPPPGTRVRAMAIYKQSQHMTEVVRRCPHHERCSDSDGLAPPQHLIRVEGNLRVEYLDDRNTFRHSVVVPYEPPEVGSDCTTIHYNYMCNSSCMGGMNRRPILTIITLEDSSGNLLGRNSFEVRVCACPGRDRRTEEENLRKKGEPHHELPPGSTKRALPNNT',
      },
    ],
    headers: [
      {
        text: 'Variation',
        value: 'variation',
        align: 'start',
        sortable: false,
      },
      { text: 'ddg', value: 'ddg', sortable: true },
      { text: 'pdb', value: 'pdb', sortable: false, align: 'start' },
      { text: 'chain', value: 'chain', sortable: false, align: 'start' },
      { text: 'uniprot', value: 'uniprot', sortable: false },
      { text: 'mutation', value: 'mutation', sortable: false, align: 'start' },
      {
        text: 'protein name',
        value: 'proteinName',
        sortable: false,
        align: 'start',
      },
    ],
  }

  get datasetId() {
    if (typeof this.id != 'undefined') return this.id
    if (this.id_ != null) return this.id_
    return this.$router.currentRoute.path.split('/').pop()
  }

  async getDatasetOverview() {
    // api request
    if (typeof this.id_ == null) return 1
    let resp = await getDatasetOverview(this.id_ as string)
    // console.log(resp)
    this.mutations_sample = resp.amkTable
    this.chartData.labels = resp.ddg.headers
    this.chartData.datasets[0].backgroundColor = this.$vuetify.theme.themes
      .light['primary'] as string
    this.chartData.datasets[0].data = resp.ddg.data as number[]
    // console.log(this.chartData)
    // return this.data_sample
  }

  mounted() {
    // get dataset id
    if (typeof this.id == 'undefined') {
      if (typeof this.datasetId != 'undefined') {
        // check if there's information in da store
        if (typeof this.datasets != 'undefined') {
          const current = this.datasets.filter(
            (el) => el._id == this.datasetId
          )[0]
          this.overview_sample = current
          this.fileName_ = current.fileName
          this.id_ = current._id
          this.name_ = current.name
        } else {
          // api request on that one dataset
        }
        // if this is expanded page, request more info
        // TODO: api method to findOne({id: id})
      } else this.setSnackbarError('dataset id is not valid')
    } else {
      this.id_ = this.id
      this.fileName_ = this.fileName
      this.name_ = this.name
    }
    this.getDatasetOverview()
    this.geterateMutationsSample()

    // get dataset id
  }
}
</script>

<style scoped></style>
