<template lang="pug">
v-layout(style='width: 100%')
  v-col
    v-row(v-if='typeof id == "string"').ma-4.d-flex.align-center
      span.heading-1.float-left
        span.font-weight-bold {{ overview_sample.fileName }}
        span ({{ overview_sample.fileSize }})
      v-btn(outlined large text @click='$router.push(`/datasets/datasets/${datasetId}`)').ml-2
        v-icon mdi-open-in-new 
      v-btn(outlined large text @click='download()').ml-2
        v-icon mdi-download-outline
      v-spacer
      v-btn(outlined large text @click='$emit("closeDialog")')
        v-icon mdi-close
    v-row(v-else).ma-4.d-flex.align-center
      span.heading-1.float-left
        span.font-weight-bold {{ overview_sample.fileName }}
        span ({{ overview_sample.fileSize }})
      v-spacer
      v-btn(outlined large text @click='download()').ml-2
        v-icon mdi-download-outline
    v-row.ma-4 
      v-simple-table(dense).unavailable
        template(v-slot:default)
          thead
            tr
              th
              th.text-left(v-for='title in mutations_headers', :key='title') {{ title }}
          tbody
            tr(v-for='(items, i) in mutations_sample', :key='i')
              td {{mutations_headers[i]}}
              td.font-weight-bold(v-for='(item, j) in items', :key='j', :style='getMuationColor(item)') {{ item == -1 ? '' : item }}
      //- Charts here
      //- vue-chart-js for ddg perpesentation
      //- v-simple-table with reactive color set-up
    v-row.ma-4(v-if='typeof id == "undefined"')
      v-data-table(
        fixed-header,
        :headers='data_sample.headers',
        :items='data_sample.data',
        item-key='name',
        checkbox-color='primary',
        multi-sort
      ).unavailable
</template>

<script lang="ts">
import router from '@/router'
import Vue from 'vue'
import Component from 'vue-class-component'
import { putActions } from '@/utils/api'

@Component({
  props: {
    id: String,
    name: String,
  },
})
export default class Datasets extends Vue {
  id?: String | undefined
  name!: String

  overview_sample = {
    fileName: `${this.name}-dataset-file-name.csv`,
    doiDescription:
      'Pires, D. E. V., Ascher, D. B., & Blundell, T. L. (2013). mCSM: predicting the effects of mutations in proteins using graph-based signatures. Bioinformatics, 30(3), 335–342',
    doiLink: 'https://doi.org/10.1093/bioinformatics/btt691',
    originalPredictor: {
      title: 'CSM',
      path: '',
    },
    isOriginal: true,
    size: 42,
    doubled: false,
    symmetrized: false,
    source: '',
    type: 'single',
    proteins: 1,
    fileSize: '52.4 kB',
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

  getMuationColor(n: number) {
    return `background: hsl(231deg 100% 66% / ${n/165*100}%)`
  }

  geterateMutationsSample() {
    for (let i = 0; i < 20; i++) {
      let arr: number[] = []
      const anchor = Math.round(Math.random() * 155) + 10
      for (let j = 0; j < 20; j++) {
        if (i == j) arr.push(-1)
        else arr.push(Math.round(Math.random() * 20 - 10 + anchor))
      }
      this.mutations_sample.push(arr)
    }
  }
  
  download() {
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
    return router.currentRoute.path.split('/').pop()
  }

  async getDatasetOverview() {
    // api request
    return this.data_sample
  }

  mounted() {
    console.log(this.datasetId)
    this.geterateMutationsSample()
  }
}
</script>

<style scoped></style>
