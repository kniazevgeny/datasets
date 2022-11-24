<template lang="pug">
.d-flex(style='overflow: hidden')
  v-navigation-drawer(
    v-if='showFilters && filters.length',
    permanent,
    width='420',
    style='position: sticky; height: 100vh; min-width: 280px;',
    absolute=false
  )
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
            v-tooltip(
              bottom,
              v-for='item in filter.items',
              :key='item.label',
              :disabled='typeof item.description == typeof undefined',
              max-width='275'
            )
              template(v-slot:activator='{ on, attrs }')
                v-chip.pa-4(v-on='on', v-bind='attrs') {{ item.label }}
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
  v-container.ma-6.ml-md-0(width='100%', height='100%', flat)
    v-card-title.pb-2
      v-col.pb-2.pl-0.pr-0
        v-row(v-if='selectable').pa-2.mb-1.justify-space-between
          div
          v-menu(
            v-if='dataVisible.length',
            offset-y,
            v-model='downloadMenu',
            transition='slide-y-transition',
            bottom,
            :close-on-content-click='false'
          )
            template(v-slot:activator='{ on: on, attrs }')
              v-btn.no-scale(
                :disabled='!selected.length',
                color='primary',
                @click='requestDownloadSelected',
                v-bind='attrs',
                v-on='on'
              )
                span.font-weight-regular Manage selected
                v-icon mdi-menu-down-outline
            div
            v-card
              v-card-actions.d-flex(style='flex-direction: column')
                v-text-field#linkToMutationSet(
                  v-model='linkToMutationSet',
                  readonly,
                  dense,
                  outlined,
                  hint='A permanent link to that set of mutations',
                  persistent-hint,
                  :success='isLinkToMutationSetCopied',
                  :success-messages='isLinkToMutationSetCopied ? "Copied!" : ""'
                )
                  template(v-slot:append)
                    v-btn.mt-n1(
                      @click='copyLinkToMutationSet',
                      icon,
                      color='primary'
                    )
                      v-icon mdi-link-variant
                v-btn(
                  block,
                  outlined,
                  :loading='!isDownloadRequested',
                  link,
                  target='_blank',
                  :href='linkToMutationSet'
                ) 
                  v-icon mdi-download-outline
                  span Download .tsv

        v-text-field(
          v-model='search',
          prepend-inner-icon='mdi-magnify',
          label='Type mutation id, protein...',
          single-line,
          hide-details,
          filled,
          :autofocus='autofocus',
          color='primary',
          clearable
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
    v-card-text
      v-data-table(
        v-model='selected',
        :loading='!data.length',
        :headers='headers',
        :items='data',
        item-key='hash',
        :search='stringFilterFlag',
        :custom-filter='customFilter',
        :show-select='selectable',
        checkbox-color='primary',
        multi-sort,
        calculate-widths,
        style='overflow-x: auto; overflow-y: hidden',
        @toggle-select-all='selectAllRows()'
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
        template(v-slot:item.mutation='{ item }')
          v-chip.primary--text.text--accent-2.font-weight-bold(
            outlined,
            label,
            color='blue lighten-1'
          ) {{ item.mutation }}
</template>
<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Watch } from 'vue-property-decorator'
import { requestMutations } from '@/utils/api'
import { Md5 } from 'ts-md5'
import { namespace } from 'vuex-class'

const SnackbarStore = namespace('SnackbarStore')

interface Filter {
  title: string
  value: string
  subtitle: string
  type: string
  min: number
  max: number
  step: number
  tickLabels: number[]
  range: number[]
  selected: string[] | number[] | number
  items: { label: string; fieldToBe: string; description: string }[]
}

@Component({
  props: {
    headers: {
      type: Array,
      default: () => [],
    },
    filters: {
      type: Array,
      default: () => [],
    },
    data: {
      type: Array,
      default: () => [],
    },
    showFilters: {
      type: Boolean,
      default: false,
    },
    selectable: {
      type: Boolean,
      default: false,
    },
    autofocus: {
      type: Boolean,
      default: true,
    },
  },
})
export default class Mutations extends Vue {
  @SnackbarStore.Mutation setSnackbar!: (snackbarStore: object) => void

  data!: Array<Object>
  headers!: Array<Object>
  filters!: Filter[]
  showFilters!: boolean
  selectable!: boolean
  autofocus!: boolean

  downloadMenu = false

  search: String = ''

  selected: Array<Object> = []
  selectAllRows() {
    // originally, button affects only 5-10-15 visible elements
    this.selected = this.selected.length === this.dataVisible.length
        ? []
        : this.dataVisible
  }

  isDownloadRequested = false
  requestDownloadSelected() {
    this.isDownloadRequested = false
    // @ts-ignore
    const hashes = this.selected.map((el) => el.hash)
    requestMutations(hashes).then((response) => {
      this.isDownloadRequested = true
    })
  }

  get linkToMutationSet() {
    // @ts-ignore
    const mutation_hashes = this.selected.map((el) => el.hash)
    const hash = Md5.hashStr(JSON.stringify(mutation_hashes.sort()))
    return `https://api.ivankovlab.ru/download_mutations?record_hash=${hash}`
  }

  isLinkToMutationSetCopied = false
  copyLinkToMutationSet() {
    if (!this.downloadMenu) return
    let textfield = document.getElementById(
      'linkToMutationSet'
    ) as HTMLTextAreaElement
    // Select the text field
    textfield.select()
    textfield.setSelectionRange(0, 99999) // For mobile devices

    // Copy the text inside the text field
    navigator.clipboard.writeText(textfield.value)

    // Display success message
    this.isLinkToMutationSetCopied = true
    window.setTimeout(() => {
      this.isLinkToMutationSetCopied = false
    }, 1500)
  }

  filterChangeFlag = 0
  get stringFilterFlag() {
    return this.filterChangeFlag.toString()
  }

  get dataVisible() {
    let result = this.data.filter((item) =>
      this.customFilter('', this.search, item)
    )

    return result
  }

  customFilter(value: any, search: String | null, item: object) {
    let result = false
    // TODO: use web-workers to acheive faster filtering
    // split 13k dataset into smaller parts and filter them async
    // https://www.uptech.team/blog/filter-1gb-json-on-frontend-and-not-crash-browser

    if (this.search == null || this.search == '0') result = true
    else
      result = Object.values(item)
        .filter((el) => typeof el == typeof '')
        .some((el) => {
          return el.toLowerCase().includes(this.search.toLowerCase())
        })

    if (!this.showFilters) return result

    return Object.keys(item).reduce((prev, current) => {
      if (prev === false) return false
      let currentFilter = this.filters.filter((f) => f.value === current)
      if (currentFilter.length == 0) return true
      if (currentFilter[0].type === 'range' && currentFilter[0].range)
        if (
          parseFloat(item[current]) < currentFilter[0]?.range[0] ||
          parseFloat(item[current]) > currentFilter[0]?.range[1]
        )
          return false
      if (currentFilter[0].type === 'chip') {
        if (currentFilter[0].selected == 0) return true
        if (
          currentFilter[0].items &&
          currentFilter[0].selected &&
          item[current] !=
            currentFilter[0].items[currentFilter[0].selected as number]
              .fieldToBe
        )
          return false
      }
      if (currentFilter[0].type === 'autocomplete') {
        if (!(currentFilter[0].selected as string[]).length) return true
        if (
          !(currentFilter[0].selected as string[]).includes(
            item[current] as string
          )
        )
          return false
      }
      return true
    }, result)
  }

  getGradient(min, max, range, step) {
    let color = 'black'
    let colorDisabled = '#b0b0b0'
    if (isNaN(range[0]) || typeof range[0] === 'string') return [colorDisabled]
    let gradient: Array<String> = []
    for (let i = min; i < max; i += step) {
      if (i < range[0]) gradient.push(colorDisabled)
      if (i > range[0] && i < range[1]) gradient.push(color as String)
      if (i > range[1]) gradient.push(colorDisabled)
    }

    return gradient
  }

  get filterChips() {
    return this.filters.filter((item) => {
      if (item.type === 'range' && item.min && item.max && item.range) {
        if (item.min < item.range[0]) return true
        if (item.range[1] < item.max) return true
      }
      if (item.type === 'chip') {
        if (item.selected) return true
      }
      if (item.type === 'autocomplete') {
        if ((item.selected as string[]).length) return true
      }
      return false
    })
  }

  resetFilterByChipId(chipId) {
    let originalIndex = (this.filters as Filter[]).indexOf(
      this.filterChips[chipId]
    )
    if ((this.filters as Filter[])[originalIndex].type === 'range') {
      this.resetRangeSlider(originalIndex)
    }
    if ((this.filters as Filter[])[originalIndex].type === 'chip')
      (this.filters as Filter[])[originalIndex].selected = 0
    if ((this.filters as Filter[])[originalIndex].type === 'autocomplete')
      (this.filters as Filter[])[originalIndex].selected = []
  }

  resetRangeSlider(i) {
    Vue.set(this.filters[i].range, 0, this.filters[i].min)
    Vue.set(this.filters[i].range, 1, this.filters[i].max)
  }

  getFilterDescription(
    filter: typeof this.filters[0] | typeof this.filters[1]
  ) {
    if (filter.type === 'range' && filter.range)
      return (
        (filter.range[0] == filter.min ? 'min' : filter.range[0]) +
        '→' +
        (filter.range[1] == filter.max ? 'max' : filter.range[1])
      )
    if (filter.type === 'chip' && filter.items)
      // @ts-ignore
      return filter.items[filter.selected].label
    if (filter.type === 'autocomplete' && filter.selected)
      // @ts-ignore
      return filter.selected.join(', ')
  }

  mounted() {
    this.$vuetify.theme.themes.light.sidebar_size = '42ch'
  }

  @Watch('filters')
  onFiltersChange() {
    this.filterChangeFlag += 1
  }
}
</script>
<style scoped>
.v-data-table__wrapper {
  overflow-x: auto;
  overflow-y: hidden;
}
</style>
