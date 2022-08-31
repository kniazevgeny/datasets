import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Datasets from '../views/Datasets.vue'
import Browse from '../views/Browse.vue'

const routes: Array<RouteRecordRaw> = [
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
    path: '/datasets/:pathMatch(.*)*',
    name: 'notFound',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/NotFound.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
