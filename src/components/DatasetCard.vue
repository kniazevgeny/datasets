<template lang="pug">
v-card(flat, outlined, style='background: var(--v-accent)')
  //- v-dialog(
    v-model='dialog',
    width='1000',
    :fullscreen='isMobile',
    v-if='typeof externalLink == "undefined"'
  //- )
  //-   template(v-slot:activator='{ on, attrs }')
  //-     v-card-title.mb-0.link(
  //-       v-bind='attrs',
  //-       v-on='on',
  //-       @click.middle='$router.push(`/proddg/proddg/${_id}`)'
        
  //-       :class='fileName ? "" : "v-btn--disabled disabled"'
  //-     ) {{ name }}
  //-   v-card.white()
  //-     DatasetOverview(:id='_id' :name='name' :fileName='fileName' @closeDialog='closeDialog')
  v-card-title.mb-0(v-if='typeof externalLink == "undefined"' :class='typeof fileName != typeof undefined ? "" : "v-btn--disabled disabled no-underline"')
    v-simple-checkbox.mt-1(v-model='selected' color='primary' @click='onCardSelected')
    a(:href='`/proddg/dataset/${name}`' target="_blank") {{ name }}
  v-card-title(v-else)
    a.external-link(:href='externalLink') {{ name }}
    v-icon(small) mdi-open-in-new
  //- v-card-subtitle.pt-0.text-left(v-if='typeof source == "string"') Source: {{ source }}
  v-card-text.pt-0
    v-col(v-if='!showSkeleton').v-text
      v-row
        span.pr-2(v-if='typeof origin == "string"') Origin: {{ origin }}
        //- span.pr-2(v-if='typeof symmetrized == "boolean"') Symmetrized: {{ symmetrized ? 'yes' : 'no' }}
        span.pr-2 •
        span.pr-2(v-if='typeof mutations == "string"') {{ mutations }} mutations
        span.pr-2 •
        span.pr-2 {{ size }} entries
        span.pr-2 •
        span.pr-2(v-if='typeof proteins == "number"') {{ proteins }} proteins
      v-row
        span.pr-2(v-if='typeof author == "string"').text-left {{ authorProcessed }}
        span.pr-2 •
        span.pr-2(v-if='typeof year == "number"').text-left {{year}}
      v-row
        span.pr-2(v-if='predictors.train.length' ).text-left Used for train:&nbsp;
        a.pr-2(v-if='predictors.train.length' v-for='train in predictors.train' :href='"https://ivankovlab.ru/proddg/predictor/" + train.predictor' target='_blank').text-left {{ train.predictor }}
      v-row
        span.pr-2(v-if='predictors.test.length' ).text-left Used for test:&nbsp;
        a.pr-2(v-if='predictors.test.length' v-for='test in predictors.test' :href='"https://ivankovlab.ru/proddg/predictor/" + test.predictor' target='_blank').text-left {{ test.predictor }}
      v-row
        a.pr-2(v-if='typeof doi == "string"', :href='doi', target="_blank").text-left {{ doiProcessed }}
    v-col(v-else)
      v-skeleton-loader.mx-auto(type='article' min-height='100px')
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import DatasetOverview from '../views/DatasetOverview.vue'
import { namespace } from 'vuex-class'
import { Watch } from 'vue-property-decorator'

const ActionStore = namespace('ActionStore')

@Component({
  props: {
    showSkeleton: Boolean,
    name: String,
    _id: String,
    fileName: String,
    externalLink: String,
    originalPredictor: String,
    origin: String,
    size: Number,
    symmetrized: Boolean,
    available: Boolean,
    source: String,
    mutations: String,
    proteins: Number,
    predictors: Object,
    year: Number,
    author: String,
    doi: String,
    reference: String,
    _selected: Boolean,
  },
  components: {
    DatasetOverview
  }
})
export default class DatasetCard extends Vue {
  @ActionStore.Mutation pushAction!: (action: object) => void

  showSkeleton?: Boolean

  name!: String
  _id!: String
  fileName?: String | undefined
  externalLink?: string
  originalPredictor?: String
  origin?: String
  size?: Number
  symmetrized?: Boolean
  available?: Boolean
  source?: String
  mutations?: String
  proteins?: Number
  year?: Number
  author?: string
  doi?: String
  reference?: String
  _selected?: Boolean

  dialog = false

  selected = false

  get isMobile() {
    return window.innerWidth < 500
  }

  get doiProcessed() {
    return (this.doi as string).slice(16, )
  }

  get authorProcessed() {
    //@ts-ignore
    if (this.author.indexOf('&') + 1 || this.author.indexOf('and') + 1) return this.author
    return this.author + ' et al.'
  }

  openDatasetOverview() {
    this.pushAction({
      type: 'click',
      timestamp: Number(Date.now()),
      btn_id: '#open-dataset-overview',
      page_href: this.$router.currentRoute.path,
    })
  }

  mounted() {
  }
  
  closeDialog() {
    this.dialog = false
  }
  
  onCardSelected() {
    this.$emit('cardSelected', this._id)
  }
  @Watch('_selected')
  onSelectionChange() {
    this.selected = this._selected as boolean
  }
}
</script>

<style scoped>
  .disabled {
    filter: contrast(0.5)
  }

  .v-card {
    padding: 8px 6px;
    border-radius: 16px !important;
    box-shadow: -2px 2px 24px rgba(0, 0, 0, 0.05) !important;
  }

</style>
