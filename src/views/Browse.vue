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
        hide-details,
        color='primary'
      )
    v-data-table(
      v-model='selected',
      fixed-header,
      :headers='headers',
      :items='data',
      :search='search',
      item-key='name',
      show-select,
      checkbox-color='indigo accent-2',
      multi-sort)
      template(v-slot:item.mutation="{ item }")
        v-chip(
          outlined
          label
          color="blue lighten-1"
          dark).indigo--text.text--accent-2.font-weight-bold {{ item.mutation }}
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
      text: 'Variation',
      align: 'start',
      sortable: false,
      value: 'name',
    },
    { text: 'ddg', value: 'ddg' },
    { text: 'pdb', value: 'pdb', sortable: false, align: 'start' },
    { text: 'Chain', value: 'chain', sortable: false, align: 'start' },
    { text: 'Uniprot', value: 'uniprot' },
    { text: 'Mutation', value: 'mutation', sortable: false, align: 'start' },
    { text: 'Protein Name', value: 'protein', sortable: false, align: 'start', width: '200' },
    { text: 'T', value: 't' },
    { text: 'pH', value: 'ph' },
  ]
  data = [
    {
      name: 'Q104H',
      ddg: -0.24,
      pdb: '2ocj',
      chain: 'A',
      uniprot: 'P04637',
      mutation: 'wt',
      protein: 'DNA-binding domain of human p53',
      t: 198,
      ph: 1,
    },
    {
      name: 'Q104P',
      ddg: -0.11,
      pdb: '2ocj',
      chain: 'A',
      uniprot: 'P04637',
      mutation: 'wt',
      protein: 'DNA-binding domain of human p53',
      t: 198,
      ph: 1,
    },
    {
      name: 'T123A',
      ddg: 0.13,
      pdb: '2ocj',
      chain: 'A',
      uniprot: 'P04637',
      mutation: 'wt',
      protein: 'DNA-binding domain of human p53',
      t: 198,
      ph: 1,
    },
    {
      name: 'A129D',
      ddg: 0.7,
      pdb: '2ocj',
      chain: 'A',
      uniprot: 'P04637',
      mutation: 'wt',
      protein: 'DNA-binding domain of human p53',
      t: 198,
      ph: 1,
    },
    {
      name: 'A129E',
      ddg: 0.38,
      pdb: '2ocj',
      chain: 'A',
      uniprot: 'P04637',
      mutation: 'wt',
      protein: 'DNA-binding domain of human p53',
      t: 198,
      ph: 1,
    },
    {
      name: 'A129S',
      ddg: 0.19,
      pdb: '2ocj',
      chain: 'A',
      uniprot: 'P04637',
      mutation: 'wt',
      protein: 'DNA-binding domain of human p53',
      t: 198,
      ph: 1,
    },
    {
      name: 'M133L',
      ddg: -0.3,
      pdb: '2ocj',
      chain: 'A',
      uniprot: 'P04637',
      mutation: 'wt',
      protein: 'DNA-binding domain of human p53',
      t: 198,
      ph: 1,
    },
    {
      name: 'F134L',
      ddg: 4.78,
      pdb: '2ocj',
      chain: 'A',
      uniprot: 'P04637',
      mutation: 'wt',
      protein: 'DNA-binding domain of human p53',
      t: 198,
      ph: 1,
    },
    {
      name: 'V143A',
      ddg: 3.5,
      pdb: '2ocj',
      chain: 'A',
      uniprot: 'P04637',
      mutation: 'wt',
      protein: 'DNA-binding domain of human p53',
      t: 198,
      ph: 1,
    },
    {
      name: 'L145Q',
      ddg: 2.98,
      pdb: '2ocj',
      chain: 'A',
      uniprot: 'P04637',
      mutation: 'wt',
      protein: 'DNA-binding domain of human p53',
      t: 198,
      ph: 1,
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

.theme--light.v-data-table.v-data-table--fixed-header thead th {
  background-color: "#a5a6f6" !important;
}
</style>
