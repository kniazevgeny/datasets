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
      name: 'datasets',
      component: Datasets,
    },
    {
      path: '/datasets/browse',
      name: 'browse',
      component: Browse,
    },
    {
      path: '/datasets/*',
      name: 'notFound',
      component: () =>
        import(/* webpackChunkName: "about" */ '../views/NotFound.vue'),
    },
  ],
})

export default router
