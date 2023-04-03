import axios from 'axios'
import store from '@/store'
import { User } from '@/models/User'
import { Dataset } from '@/models/Dataset'
import router from '@/router'
import { Predictor } from '@/models/Predictor'

let base = 'https://api.ivankovlab.ru'
if (process.env.VUE_APP_MODE === 'dev') base = 'http://localhost:1337'

export {base};

function getHeaders() {
  if (store.state.AppStore.user == undefined) return {}
  return {
    uid: (store.state.AppStore.user as User)._id,
  }
}

function setSnackbar(err) {
  let message
  if (err.response != undefined) message = err.response.data.message
  else message = 'Internal Server Error'
  // @ts-ignore
  if (
    process.env.VUE_APP_MODE == 'beta' ||
    process.env.VUE_APP_MODE == 'release'
  )
    message = 'Internal Server Error' // will be replaced at Snackbar
  
  // check for internet connection
  if (!window.navigator.onLine) message = '🌐 Looks like you\'re offline'
  console.log(message)
  store.commit(
    'SnackbarStore/setSnackbar',
    {
      message: message,
      color: 'error',
      active: true,
    },
    { root: true }
  )
}

export async function putActions() {
  // Do not send empty arrays
  if (Object(store.state.ActionStore._actions).length != 0)
  await axios
    .put(
      `${base}/actions/${(store.state.AppStore.user as User)._id}`,
      {
        actions: store.state.ActionStore._actions,
      },
      { headers: getHeaders() }
    )
    .then((response) => {
      // console.log(response)
      // Reset _actions, because it's additive at backend
      if (response.status == 200 || response.status == 204)
        store.dispatch('ActionStore/clearActions', null, { root: true })
    })
}

export async function getDatasets() {
  // if (checkInternetConnection()) throw "error";
  let response = (
    await axios
      .get(`${base}/datasets`, {
        headers: getHeaders(),
      })
      .catch((err) => {
        setSnackbar(err)
        return err
      })
  ).data as Dataset[]
  // c.logserv('api.balance', response)
  // response.balance = removeBackZeroes(response.balance)
  return response
}

export async function getPredictors() {
  // if (checkInternetConnection()) throw "error";
  let response = (
    await axios
      .get(`${base}/predictors`, {
        headers: getHeaders(),
      })
      .catch((err) => {
        setSnackbar(err)
        return err
      })
  ).data as Predictor[]
  // c.logserv('api.balance', response)
  // response.balance = removeBackZeroes(response.balance)
  return response
}

export async function getMutations(filters: object[]) {
  // if (checkInternetConnection()) throw "error";

  let fiters_copy = []
  // @ts-ignore
  filters.forEach(val => fiters_copy.push(Object.assign({}, val)));
  let tmp_filters: object[] = []
  // Preprocess filters, store unnecessary info
  // TODO: make that code more readable and compact
  fiters_copy.forEach(el => {
    tmp_filters.push({
      // @ts-ignore
      value: el.value,
      // @ts-ignore
      title: el.title,
      // @ts-ignore
      subtitle: el.subtitle,
      // @ts-ignore
      hints: el.hints,
      // @ts-ignore
      tickLabels: el.tickLabels,
      // @ts-ignore
      items: el.items,
    })
    // @ts-ignore
    delete el.title;
    // @ts-ignore
    delete el.subtitle;
    // @ts-ignore
    delete el.hints;
    // @ts-ignore
    delete el.tickLabels;
    // @ts-ignore
    delete el.items;
  })
  let response = (
    await axios
      .get(`${base}/mutations`, 
        {
          params: {
            filters: JSON.stringify(fiters_copy)
          },
          headers: getHeaders(),
      },)
      .catch((err) => {
        setSnackbar(err)
        return err
      })
      .then(resp => {
        if (resp.data.filters)
          resp.data.filters.forEach(el => {
            // @ts-ignore
            const id = tmp_filters.findIndex(tmp_el => el.value == tmp_el.value)
            // @ts-ignore
            if (!el.title) el.title = tmp_filters[id].title
            // @ts-ignore
            if (!el.subtitle) el.subtitle = tmp_filters[id].subtitle
            // @ts-ignore
            if (!el.hints) el.hints = tmp_filters[id].hints
            // @ts-ignore
            if (!el.tickLabels) el.tickLabels = tmp_filters[id].tickLabels
            // @ts-ignore
            if (!el.items) el.items = tmp_filters[id].items
          });
        return resp
      })
  ).data
  return response
}

export async function getDatasetOverview(id: string) {
  // if (checkInternetConnection()) throw "error";
  let response = (
    await axios
      .get(`${base}/dataset/${id}`, {
        headers: getHeaders(),
      })
      .catch((err) => {
        setSnackbar(err)
        return err
      })
  ).data
  // c.logserv('api.balance', response)
  // response.balance = removeBackZeroes(response.balance)
  return response
}

export async function downloadDataset(id: string) {
  // if (checkInternetConnection()) throw "error";
  window.open(`${base}/download?ids=${id}`, '_blank')
  store.commit(
    'ActionStore/pushAction',
    {
      type: 'download',
      timestamp: Number(Date.now()),
      btn_id: '#download',
      page_href: router.currentRoute.path,
    },
    { root: true }
  )
}

export async function calculateOverlap(dataset1_name: string, dataset2_name: string, pident: number) {
  return await axios
    .put(
      `${base}/overlaps`,
      {
        dataset1_name: dataset1_name,
        dataset2_name: dataset2_name,
        pident: pident,
      },
      { headers: getHeaders() }
    )
    .then((response) => {
      return response
    })
}
