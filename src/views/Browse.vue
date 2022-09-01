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
  v-card.ma-6(width='100%', height='100%', flat)
    v-card-title
      v-text-field(
        v-model='search',
        append-icon='mdi-magnify',
        label='Type mutation id, protein, variation...',
        single-line,
        hide-details
      )
    v-data-table.elevation-1(
      v-model='selected',
      fixed-header,
      :headers='headers',
      :items='desserts',
      :search='search',
      item-key='name',
      show-select,
      checkbox-color='indigo accent-2'
    )
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component
export default class Browse extends Vue {
  search: String = ''
  selected = []
  headers = [
    {
      text: 'Dessert (100g serving)',
      align: 'start',
      sortable: false,
      value: 'name',
    },
    { text: 'Calories', value: 'calories' },
    { text: 'Fat (g)', value: 'fat' },
    { text: 'Carbs (g)', value: 'carbs' },
    { text: 'Protein (g)', value: 'protein' },
    { text: 'Iron (%)', value: 'iron' },
  ]
  desserts = [
    {
      name: 'Frozen Yogurt',
      calories: 159,
      fat: 6.0,
      carbs: 24,
      protein: 4.0,
      iron: '1%',
    },
    {
      name: 'Ice cream sandwich',
      calories: 237,
      fat: 9.0,
      carbs: 37,
      protein: 4.3,
      iron: '1%',
    },
    {
      name: 'Eclair',
      calories: 262,
      fat: 16.0,
      carbs: 23,
      protein: 6.0,
      iron: '7%',
    },
    {
      name: 'Cupcake',
      calories: 305,
      fat: 3.7,
      carbs: 67,
      protein: 4.3,
      iron: '8%',
    },
    {
      name: 'Gingerbread',
      calories: 356,
      fat: 16.0,
      carbs: 49,
      protein: 3.9,
      iron: '16%',
    },
    {
      name: 'Jelly bean',
      calories: 375,
      fat: 0.0,
      carbs: 94,
      protein: 0.0,
      iron: '0%',
    },
    {
      name: 'Lollipop',
      calories: 392,
      fat: 0.2,
      carbs: 98,
      protein: 0,
      iron: '2%',
    },
    {
      name: 'Honeycomb',
      calories: 408,
      fat: 3.2,
      carbs: 87,
      protein: 6.5,
      iron: '45%',
    },
    {
      name: 'Donut',
      calories: 452,
      fat: 25.0,
      carbs: 51,
      protein: 4.9,
      iron: '22%',
    },
    {
      name: 'KitKat',
      calories: 518,
      fat: 26.0,
      carbs: 65,
      protein: 7,
      iron: '6%',
    },
  ]
  filters = [
    {
      title: 'Variation',
      subtitle:
        'Mutation studied in the experiment. Residue numbering corresponds to that in the PDB structure. If no PDB structure is available, the residue is numbered according to the sequence specifieed in "Sequence" column.',
    },
    {
      title: 'ddg',
      subtitle:
        'Free energy change of folding, kcal/mol. Negative values denote stabilization.',
    },
    {
      title: 'Mutation',
      subtitle: 'Mutation context',
    },
    {
      title: 'T',
      subtitle: 'Temperature of the experiment in kelvins.',
    },
    {
      title: 'pH',
      subtitle: 'pH of the experiment.',
    },
    {
      title: 'Method',
      subtitle:
        'Method of measuring the folding free energy change in the experiment.',
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
