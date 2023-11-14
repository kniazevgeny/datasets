<template lang="pug">
v-layout(style='width: 100%')
  v-container.ml-0.mr-0(fluid, style='padding-right: 256px; position: initial')
    v-row.ma-4.d-flex.align-center
      span.text-h2.float-left
        span#predictor-name.font-weight-bold {{ predictor.predictor }}
        //- span ({{ predictor.fileSize }})
      v-spacer
      //- v-btn.ml-2(
        outlined,
        large,
        :href='`https://api.ivankovlab.ru/files/${dataset.fileName}`',
        text,
        @click='download()'
        //- )
        //- span Download
        //- v-icon mdi-download-outline
    v-row(v-if='predictor.datasets')
      DatasetOverview(
        v-for='(train, i) in predictor.datasets.train',
        :key='"train-" + i',
        :name='train',
        :class='"train-" + i + ` section-${i + 1}`',
        v-intersect='{ handler: onIntersect }'
      )
      DatasetOverview(
        v-for='(test, i) in predictor.datasets.test',
        :key='"test-" + i',
        :name='test',
        :class='"test-" + i + ` section-${i + predictor.datasets.train.length + 2}`',
        v-intersect='{ handler: onIntersect }'
      )
  v-navigation-drawer.accent(
    clipped,
    fixed,
    floating,
    permanent,
    right,
    tag='nav',
    style='z-index: 0; top: 64px; box-shadow: -2px 2px 24px rgba(0, 0, 0, 0.05); border-radius: 16px;'
  )
    template(v-slot:prepend)
      .d-flex.pa-4
        span#contents.pl-4.text-left.sf Contents
    v-list.pa-4.pt-0(v-if='predictor.datasets', dense)
      //- v-subheader Train
      v-list-item-group(v-model='currentSection', color='primary')
        v-list-item(
          v-for='(item, i) in contents',
          :key='i',
          :id='"list-item-" + i',
          :disabled='item == "Train" || item == "Test"',
          @click='scrollToContent(i)'
        ) {{ item }}
      //- v-subheader Test
      //- v-list-item-group(v-model='selectedItem', color='primary')
      //-   v-list-item(v-for='(item, i) in predictor.datasets.test', :key='i') {{ item }}
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { putActions } from '@/utils/api'
import { Dataset } from '@/models/Dataset'
import DatasetOverview from '@/views/DatasetOverview.vue'
import { namespace } from 'vuex-class'
import { Predictor } from '@/models/Predictor'
import { Watch } from 'vue-property-decorator'
const AppStore = namespace('AppStore')
const ActionStore = namespace('ActionStore')
const SnackbarStore = namespace('SnackbarStore')

@Component({
  props: {
    id: String,
    name: String,
  },
  components: {
    DatasetOverview,
  },
})
export default class PredictorOverview extends Vue {
  @AppStore.State predictors?: Predictor[] | undefined

  @ActionStore.Mutation pushAction!: (action: object) => void
  @SnackbarStore.Mutation setSnackbarError!: (message: string) => void

  id?: string
  name?: string

  currentSection = 1

  predictor: Predictor = {
    showSkeleton: true,
    predictor: '',
    input: '',
    algorithm_0: '',
    algorithm_1: '',
    datasets: {
      train: [],
      test: [],
    },
    meta: false,
    cv: '',
    multiple_point_mutations: false,
    complexes: false,
    hrm_dataset: false,
    hrm_check: false,
    compared_tools: '',
    metrics: '',
    T: false,
    ph: true,
    author: '',
    doi: '',
    reference: '',
    download: '',
    server: '',
    year: 2011,
  }

  get contents() {
    return [
      'Train',
      ...this.predictor.datasets.train,
      'Test',
      ...this.predictor.datasets.test,
    ]
  }

  onIntersect(e) {
    if (!e[0].isIntersecting) return
    const navClass = (Array.from(e[0].target.classList) as string[]).filter(
      (el) => el.includes('train-') || el.includes('test-')
    )[0] as string
    const navSection = navClass.includes('test-')
    let startingPos = 1
    if (navSection) startingPos = this.contents.indexOf('Test') + 1
    const currentPos = parseInt(navClass.slice(-1))
    this.currentSection = startingPos + currentPos
  }

  scrollToContent(scrollToSection: number) {
    this.$vuetify.goTo('.section-' + scrollToSection, {
      duration: 300,
      offset: 50,
      easing: 'easeInOutCubic',
    })
  }

  get predictorByName() {
    if (typeof this.name != typeof undefined) return this.name
    if (typeof this.predictors == typeof undefined) return undefined
    return (this.predictors as Predictor[]).filter(
      (predictor) =>
        predictor.predictor == this.$router.currentRoute.path.split('/').pop()
    )[0]
  }

  download() {
    this.pushAction({
      type: 'download',
      timestamp: Number(Date.now()),
      btn_id: '#download',
      page_href: this.$router.currentRoute.path,
    })
    putActions()
  }

  setTitle() {
    document.title = (this.predictorByName as Predictor).predictor as string
      ;(document.querySelector(
        'meta[name="description"]'
      ) as HTMLElement).setAttribute('content', 'Predictor overview')
  }

  mounted() {
    if (typeof this.predictorByName != typeof undefined) {
      this.predictor = this.predictorByName as Predictor
      this.setTitle()
    }
    window.setTimeout(() => {
      this.$vuetify.goTo('#predictor-name', { offset: 9999 })
    }, 350)
  }
}
</script>

<style scoped>
#contents {
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 29px;
}
</style>
