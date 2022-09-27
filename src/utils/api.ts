import axios from 'axios'
import store from '@/store'
import { User } from '@/models/User'
import { Dataset } from '@/models/Dataset'
import { namespace } from 'vuex-class'
import router from '@/router'

let base = 'https://api.ivankovlab.ru'
if (process.env.VUE_APP_MODE === 'dev') base = 'http://10.16.161.39:1337'

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

export async function downloadDataset(id: string) {
  // if (checkInternetConnection()) throw "error";
  window.open(`${base}/download/${id}`, '_blank')
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
