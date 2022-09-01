<template lang="pug">
v-layout(style='width: 100%')
  v-navigation-drawer(
    width='420',
    permanent,
    style='position: sticky',
    absolute=false
  )
    //- Filters
    span.text-h5.font-weight-bold Filters!
    v-list(
      color='transparent',
      v-for='filter in filters',
      :key='filter.title'
    ).pa-4
      v-list-item-title.mb-n1 {{filter.title}} 
      small.grey--text.text--darken-2 {{filter.subtitle}} 
      v-list-item-content 
      v-divider
  v-card(width='100%', height='100%' flat).ma-6
    v-card-title
      v-text-field(
        v-model='search',
        append-icon='mdi-magnify',
        label='Type dataset name, year, author...',
        single-line,
        hide-details,
        filled
      )
    v-col
      DatasetCard.mb-2(
        v-for='card in datasetCards',
        :key='card.title',
        :title='card.title'
      )
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import DatasetCard from '@/components/DatasetCard.vue'

@Component({
  props: {},
  components: {
    DatasetCard
  }
})
export default class Datasets extends Vue {

  filters = [
    {
      title: 'Origin',
      subtitle:
        'Original - compiled from scratch. Processed - processed original dataset.',
    },
    {
      title: 'Size',
      subtitle: 'Number of data points in a dataset.',
    },
    {
      title: 'Doubled',
      subtitle:
        'A dataset is symmetrized if it contains both forward and reverse mutations.',
    },
    {
      title: 'Source',
      subtitle: 'Original dataset for processed datasets.',
    },
    {
      title: 'Type',
      subtitle:
        'Single - contains only single point mutations. Multiple - contains only multiple point mutations. Mixed - contains both single and multiple point mutations.',
    },
    {
      title: 'Proteins',
      subtitle: 'Number of proteins in a dataset.',
    },
  ]
  search: String = ''

  datasetCards = [
    {
      title: 'Card 1'
    },
    {
      title: 'Card 2'
    },
    {
      title: 'Card 3'
    },
    {
      title: 'Card 4'
    },
    {
      title: 'Card 5'
    },
  ]
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
</style>
