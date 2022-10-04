import Vue from 'vue'
import Router from 'vue-router'
import Datasets from '../views/Datasets.vue'
import DatasetOverview from '../views/DatasetOverview.vue'
import Browse from '../views/Browse.vue'
import Predictors from '../views/Predictors.vue'
import Home from '@/views/Home.vue'
import store from '@/store'
import Root from '@/views/Root.vue'

Vue.use(Router)

const router = new Router({
  mode: 'hash',
  routes: [
    {
      path: '/',
      name: 'root',
      component: Root,
    },
    {
      path: '/datasets',
      name: 'home',
      component: Home,
    },
    {
      path: '/datasets/browse',
      name: 'browse',
      component: Browse,
    },
    {
      path: '/datasets/datasets',
      name: 'datasets',
      component: Datasets,
    },
    {
      path: '/datasets/datasets/:id',
      name: 'dataset-overview',
      component: DatasetOverview,
    },
    {
      path: '/datasets/predictors',
      name: 'predictors',
      component: Predictors,
    },
    {
      path: '/datasets/*',
      name: 'notFound',
      component: () =>
        import(/* webpackChunkName: "about" */ '../views/NotFound.vue'),
    },
  ],
})

router.beforeEach((to, from, next) => {
  // gather analytical data
  const queryToAction = ['type', 'timestamp', 'btn_id']
  if (Object.keys(to.query).some((el) => queryToAction.includes(el))) {
    store.commit(
      'ActionStore/pushAction',
      {
        type: to.query.type,
        timestamp: to.query.timestamp,
        btn_id: to.query.btn_id,
        page_href: from.path,
      },
      { root: true }
    )
    // Del analytical query
    queryToAction.forEach((element) => {
      if (to.query[element] != 'undefined') delete to.query[element]
    })
    // Dunno why this throws an error
    // May be solved in vue3 router
    next({
      path: to.path,
      query: to.query
    })
    return
  }
  next()
})

export default router
