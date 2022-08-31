<template lang="pug">
v-layout
  v-navigation-drawer(width="420" permanent style="position: sticky" absolute=false)
    //- Filters
    span.text-h5.font-weight-bold Filters!
    v-list(two-lines color="transparent" v-for='filter in filters' :key='filter.title')
      v-list-item(:title="filter.title" :subtitle="filter.subtitle") 
      p -
      v-divider
  v-card(width="100%" height="100%")
    v-card-title
      v-text-field(
          v-model="search"
          append-icon="mdi-magnify"
          label="Type mutation id, protein, variation..."
          single-line
          hide-details)
    v-table(fixed-header)
      template(v-slot:default)
        thead
          tr
            th.text-left Name
            th.text-left Calories
        tbody
          tr(v-for="item in desserts", :key="item.name")
            td {{ item.name }}
            td {{ item.calories }}
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'

@Options({
  props: {},
})
export default class Browse extends Vue {
  filters = [
    {
      title: 'Variation',
      subtitle:
        'Mutation studied in the experiment. Residue numbering corresponds to that in the PDB structure. If no PDB structure is available, the residue is numbered according to the sequence specifieed in "Sequence" column.',
    },
    {
      title: 'ddg',
      subtitle: 'Free energy change of folding, kcal/mol. Negative values denote stabilization.',
    },
    {
      title: 'Mutation',
      subtitle:
        'Mutation context',
    },
    {
      title: 'T',
      subtitle: 'Temperature of the experiment in kelvins.',
    },
    {
      title: 'pH',
      subtitle:
        'pH of the experiment.',
    },
    {
      title: 'Method',
      subtitle: 'Method of measuring the folding free energy change in the experiment.',
    },
  ]
  search: String = ''
  desserts = [
    {
      name: 'Frozen Yogurt',
      calories: 159,
    },
    {
      name: 'Ice cream sandwich',
      calories: 237,
    },
    {
      name: 'Eclair',
      calories: 262,
    },
    {
      name: 'Cupcake',
      calories: 305,
    },
    {
      name: 'Gingerbread',
      calories: 356,
    },
    {
      name: 'Jelly bean',
      calories: 375,
    },
    {
      name: 'Lollipop',
      calories: 392,
    },
    {
      name: 'Honeycomb',
      calories: 408,
    },
    {
      name: 'Donut',
      calories: 452,
    },
    {
      name: 'KitKat',
      calories: 518,
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
