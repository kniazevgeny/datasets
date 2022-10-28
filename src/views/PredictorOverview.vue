<template lang="pug">
v-layout(style='width: 100%')
  v-navigation-drawer(fixed, right, tag='div')
    v-list(v-if='predictor.datasets', dense)
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
  v-col(width='80%')
    v-row.ma-4.d-flex.align-center
      span.heading-1.float-left
        span.font-weight-bold {{ predictor.predictor }}
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
    v-row.ma-4.d-flex
      span.text-left(v-html='sources')
    v-row(v-if='predictor.datasets')
      DatasetOverview(
        v-for='(train, i) in predictor.datasets.train',
        :name='train',
        :class='"train-" + i + ` section-${i + 1}`',
        v-intersect='{ handler: onIntersect }'
      )
      DatasetOverview(
        v-for='(test, i) in predictor.datasets.test',
        :name='test',
        :class='"test-" + i + ` section-${i + predictor.datasets.train.length + 2}`',
        v-intersect='{ handler: onIntersect }'
      )
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { putActions } from '@/utils/api'
import { Dataset } from '@/models/Dataset'
import DatasetOverview from '@/views/DatasetOverview.vue'
import { namespace } from 'vuex-class'
import { Predictor } from '@/models/Predictor'
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

  predictor: Predictor = {}

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
    const navClass = Array.from(e[0].target.classList).filter(
      (el) => el.includes('train-') || el.includes('test-')
    )[0]
    // 0 for train, 1 for test
    const navSection = navClass.includes('test-')
    let startingPos = 1
    if (navSection) startingPos = this.contents.indexOf('Test') + 1
    const currentPos = parseInt(navClass.slice(-1))
    this.currentSection = startingPos + currentPos
    this.scrollContentsIntoView()
  }

  scrollContentsIntoView() {
    document.getElementById('list-item-' + this.currentSection).scrollIntoView()
    // should be { behavior: 'smooth' }, but it doesn't work
  }

  scrollToContent(scrollToSection: number) {
    this.$vuetify.goTo('.section-' + scrollToSection, {
      duration: 300,
      offset: 50,
      easing: 'easeInOutCubic',
    })
  }

  get sources() {
    if (typeof this.predictor.source == typeof undefined) return ''
    const splitted = this.predictor.source.split(',')
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
    // downloadDataset(this.id as string)
    putActions()
  }

  setTitle() {
    document.title = this.name
  }

  mounted() {
    // Get Dataset Info from the store
    if (typeof this.predictorByName != typeof undefined)
      this.predictor = this.predictorByName
  }
}
</script>

<style scoped>
div.v-navigation-drawer {
  height: 100px !important;
}

div.v-navigation-drawer:hover {
  height: 300px !important;
  transition: all 0.2s ease-out;
}
</style>
