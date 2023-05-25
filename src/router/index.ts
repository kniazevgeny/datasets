import Vue from 'vue'
import Router from 'vue-router'
import Datasets from '../views/Datasets.vue'
import DatasetOverview from '../views/DatasetOverview.vue'
import Browse from '../views/Browse.vue'
import Predictors from '../views/Predictors.vue'
import Home from '@/views/Home.vue'
import store from '@/store'
import Landing from '@/views/Landing.vue'
import PredictorOverview from '@/views/PredictorOverview.vue'
import ProDDG from '@/components/ProDDG.vue'
import AboutProDDG from '@/views/AboutProDDG.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'landing',
      component: Landing,
    },
    {
      path: '/proddg',
      component: ProDDG,
      children: [
        {
          path: '/',
          name: 'home',
          component: Home,
        },
        {
          path: 'about',
          name: 'about-proddg',
          component: AboutProDDG,
        },
        {
          path: 'browse',
          name: 'browse',
          component: Browse,
        },
        {
          path: 'datasets',
          name: 'datasets',
          component: Datasets,
        },
        {
          path: 'dataset/:name',
          name: 'dataset-overview',
          component: DatasetOverview,
        },
        {
          path: 'predictors',
          name: 'predictors',
          component: Predictors,
        },
        {
          path: 'predictor/:name',
          name: 'predictors-overview',
          component: PredictorOverview,
        },
      ],
    },
    {
      path: '*',
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
      query: to.query,
    })
    return
  }
  next()
})

export default router
