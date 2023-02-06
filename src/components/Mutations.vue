<template lang="pug">
.d-flex(style='overflow: hidden')
  v-navigation-drawer(
    v-if='showFilters && filters.length',
    permanent,
    width='420',
    style='position: sticky; height: 100vh; min-width: 280px',
    absolute=false,
    color='background'
  )
    //- Filters
    .pa-4(
      style='border-radius: var(--v-borderRadius) var(--v-borderRadius) 0 0'
    )
      .text-h5.font-weight-bold(style='color: var(--v-text)') Filters
    v-list.pa-4(
      color='transparent',
      v-for='filter in filters',
      :key='filter.title'
    )
      v-list-item-title.font-weight-bold {{ filter.title }}
      small.v-text.text--darken-2 {{ filter.subtitle }}
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
            @end='filterData()',
            :step='filter.step',
            :max='filter.max',
            :min='filter.min',
            track-color='#d9ebe9',
            track-fill-color='text',
            color='text'
          )
          v-layout.mt-n11
            v-text-field.pa-2(
              v-model='filter.range[0]',
              @input='filterData()',
              hide-details,
              filled,
              dense,
              label='min',
              type='number',
              color='text'
            )
            v-text-field.pa-2(
              v-model='filter.range[1]',
              @input='filterData()',
              hide-details,
              filled,
              dense,
              label='max',
              type='number',
              color='text'
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
            @input='filterData()',
            mandatory,
            disabled
          )
            v-tooltip(
              bottom,
              v-for='(item, chip_id) in filter.items',
              :key='item.label',
              :disabled='typeof item.description == typeof undefined',
              max-width='275'
            )
              template(v-slot:activator='{ on, attrs }')
                v-chip.pa-4(v-on='on', v-bind='attrs', :outlined='filter.selected == chip_id ? false : true', color='primary') {{ item.label }}
              span {{ item.description }}
        v-layout.text-left(col, v-else)
          v-skeleton-loader.mx-auto(type='chip')
          v-skeleton-loader.mx-auto(type='chip')
      v-list-item-content(v-if='filter.type === "autocomplete"')
        div(v-if='data.length')
          v-autocomplete(
            v-model='filter.selected',
            @input='filterData()',
            :items='filter.items',
            auto-select-first,
            chips,
            clearable,
            dense,
            deletable-chips,
            filled,
            multiple,
            :label='filter.title',
            disabled
          )
        v-layout.text-left(col, v-else)
          v-skeleton-loader.mx-auto(type='card-heading')
      v-divider.mt-4
  v-container.ma-6.ml-md-0(width='100%', height='100%', flat)
    v-card-title.pb-2
      v-col.pb-2.pl-0.pr-0
        v-row.pa-2.mb-1.justify-space-between(v-if='showDownloadBtn')
          div
          v-menu(
            v-if='dataVisible.length',
            background-color='accent'
            offset-y,
            v-model='downloadMenu',
            transition='slide-y-transition',
            bottom,
            :close-on-content-click='false'
          )
            template(v-slot:activator='{ on: on, attrs }')
              v-btn.no-scale(
                color='primary',
                v-bind='attrs',
                v-on='on'
              )
                span.font-weight-regular Manage filtered
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
                  link,
                  target='_blank',
                  :href='linkToMutationSet'
                ) 
                  v-icon mdi-download-outline
                  span Download .tsv

        v-text-field.search(
          v-model='search',
          dense,
          rounded,
          @input='filterData()',
          prepend-inner-icon='mdi-magnify',
          label='Type mutation id, protein...',
          single-line,
          background-color='accent',
          hide-details,
          filled,
          :autofocus='autofocus',
          color='primary',
          clearable,
          disabled
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
        :loading='!data.length || isFiltering',
        :headers='headers',
        :items='dataVisible',
        item-key='hash',
        :search='stringFilterFlag',
        checkbox-color='primary',
        multi-sort,
        calculate-widths,
        style='overflow-x: auto; overflow-y: hidden',
        :footer-props=footerPropsOps,
      )
        template(v-slot:top='')
          span.d-flex.ml-4.mb-3.mt-0 Showing {{dataVisible.length}} of {{ mutationsCount }} results
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
        template(v-slot:item.protein='{ item }')
          span(style='display: block; min-width: 150px') {{ item.protein }}
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
        template(v-slot:item.organism='{ item }')
          span(style='display: block; min-width: 250px') {{ item.organism }}
        template(v-slot:item.mutation='{ item }')
          v-chip.primary--text.text--accent-2.font-weight-bold(
            outlined,
            label,
            color='primary'
          ) {{ item.mutation }}
</template>
<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Watch } from 'vue-property-decorator'
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
    customFiltrationId: {
      type: String,
      default: '',
    },
    mutationsCount: {
      type: Number,
      default: 0,
    },
    showFilters: {
      type: Boolean,
      default: false,
    },
    showDownloadBtn: {
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
  chunks: Array<Array<Object>> = []
  chunksNum: number = 4
  dataVisible: Array<Object> = []
  isFiltering = false

  headers!: Array<Object>
  filters!: Filter[]
  showFilters!: boolean
  showDownloadBtn!: boolean
  autofocus!: boolean
  mutationsCount!: number
  customFiltrationId?: string

  downloadMenu = false

  search: String = ''

  footerPropsOps = {'items-per-page-options': [15, 150]}

  get linkToMutationSet() {
    return `https://api.ivankovlab.ru/download_mutations?record_id=${this.customFiltrationId}`
  }

  get calcMutationsCount() {
    if (!this.mutationsCount) return 60000
    return this.mutationsCount
  }

  isLinkToMutationSetCopied = false
  copyLinkToMutationSet() {
    if (!this.downloadMenu) return
    let textfield = document.getElementById(
      'linkToMutationSet'
    ) as HTMLTextAreaElement
    textfield.select()
    textfield.setSelectionRange(0, 99999)

    navigator.clipboard.writeText(textfield.value)

    this.isLinkToMutationSetCopied = true
    window.setTimeout(() => {
      this.isLinkToMutationSetCopied = false
    }, 1500)
  }

  filterChangeFlag = 0
  get stringFilterFlag() {
    return this.filterChangeFlag.toString()
  }

  async filterData() {
    this.onFiltersChange()
    if (!this.chunks || !this.chunks.length) return []

    // // @ts-ignore
    // const actions = Array.apply(null, { length: this.chunksNum }).map(
    //   (_, index) => {
    //     return {
    //       message: `func${index}`,
    //       func: (chunk, search, filters, showFilters) => {
    //         let result = chunk

    //         if (!(search == null || search == '0' || search == ''))
    //           result = result.filter((el) =>
    //             Object.values(el).some((_el) => {
    //               if (typeof _el != typeof '') return false
    //               // @ts-ignore
    //               return _el.toLowerCase().includes(search.toLowerCase())
    //             })
    //           )

    //         if (!showFilters) return result

    //         filters.forEach((filter) => {
    //           switch (filter.type) {
    //             case 'range':
    //               if (
    //                 filter.min < filter.range[0] ||
    //                 filter.max > filter.range[1]
    //               )
    //                 result = result.filter(
    //                   (el) =>
    //                     el[filter.value] > filter.range[0] &&
    //                     el[filter.value] < filter.range[1]
    //                 )
    //               break
    //             case 'chip':
    //               if (filter.selected != 0)
    //                 result = result.filter(
    //                   (el) =>
    //                     el[filter.value] ==
    //                     filter[0].items[filter[0].selected as number].fieldToBe
    //                 )
    //               break
    //             case 'autocomplete':
    //               if ((filter.selected as string[]).length)
    //                 result = result.filter((el) =>
    //                   (filter.selected as string[]).includes(
    //                     el[filter.value] as string
    //                   )
    //                 )
    //               break

    //             default:
    //               break
    //           }
    //         })

    //         return result
    //       },
    //     }
    //   },
    //   Number
    // )

    /**
     * We can use filtering function just in one thread
     * But using web-workers time-to-see-first-results is 2-3x lower
     * So that service appear to work faster
     */

    // @ts-ignore
    let worker = this.$worker.create(actions)
    this.dataVisible = []
    this.isFiltering = true

    let result = []
    for (let i = 0; i < this.chunksNum; i++) {
      worker
        .postMessage(`func${i}`, [
          this.chunks[i],
          this.search,
          this.filters,
          this.showFilters,
        ])
        // @ts-ignore
        .then((filtered) => result.push(...filtered))
        .catch(console.error)
    }
    worker = null
    this.isFiltering = false
    this.dataVisible = result
  }

  getGradient(min, max, range, step) {
    let color = this.$vuetify.theme.themes[this.$vuetify.theme.dark ? 'dark' : 'light']['primary']
    let colorDisabled = this.$vuetify.theme.dark ? '#364d53' :'#d9ebe9'
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
      if (item.type === 'range' && item.range) {
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
    this.filterData()
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
    this.$vuetify.theme.themes[this.$vuetify.theme.dark ? 'dark' : 'light'].sidebar_size = '42ch'
  }

  onFiltersChange() {
    // this.filterChangeFlag += 1
    console.log('onFiltersChange')
    this.isFiltering = true
    if (this.showFilters) this.$emit('filterChange', this.filters)
    // this.filterData()
  }

  @Watch('data')
  onDataChange(prev, current) {
    this.isFiltering = false
    if (prev != current && this.data.length) {
      this.dataVisible = this.data
      const chunkSize = Math.round(this.data.length / this.chunksNum + 1)
      for (let i = 0; i < this.chunksNum; i++)
        this.chunks.push(
          this.data.slice(
            chunkSize * i,
            chunkSize * (i + 1) < this.data.length
              ? chunkSize * (i + 1)
              : this.data.length
          )
        )
      // this.filterData()
    }
  }
}
</script>
<style scoped>
.v-data-table__wrapper {
  overflow-x: auto;
  overflow-y: hidden;
}
</style>
