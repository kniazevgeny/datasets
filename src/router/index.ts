import Vue from 'vue'
import Router from 'vue-router'
import Datasets from '../views/Datasets.vue'
import Browse from '../views/Browse.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/datasets',
      name: 'browse',
      component: Browse,
    },
    {
      path: '/datasets/datasets',
      name: 'datasets',
      component: Datasets,
    },
    // TODO: add page for each dataset (with graphs, stats etc)
    // {
    //   path: '/datasets/datasets/:id',
    //   name: 'dataset-overview',
    //   component: DatasetView,
    // },
    {
      path: '/datasets/*',
      name: 'notFound',
      component: () =>
        import(/* webpackChunkName: "about" */ '../views/NotFound.vue'),
    },
  ],
})

export default router
