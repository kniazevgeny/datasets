import axios from 'axios'
import store from '@/store'
import { User } from '@/models/User'
import { Dataset } from '@/models/Dataset'
import { namespace } from 'vuex-class'

let base = 'https://api.ivankovlab.ru'
if (process.env.VUE_APP_MODE === 'dev') base = 'http://192.168.31.242:1337'

function getHeaders(token?: string) {
    return { uid: token != undefined ? token : (store.state.AppStore.user as User)._id }
}

function setSnackbar(err) {
  let message = err.response.data.message
  // @ts-ignore
  if (
    process.env.VUE_APP_MODE == 'beta' ||
    process.env.VUE_APP_MODE == 'release'
  )
    message = 'Internal Server Error' // will be replaced at Snackbar
  // store.setSnackbar({
  //   message: message,
  //   color: 'error',
  //   active: true
  // });
}

export async function putActions() { 
  await axios
    .put(`${base}/actions/${(store.state.AppStore.user as User)._id}`, {
      actions: store.state.ActionStore._actions
    })
    .then((response) => {
      console.log(response)
      // Reset _actions, because it's additive at backend
      if (response.status == 200 || response.status == 204) store.state.AppStore.clearActions()
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
        // c.logerrserv('api.balance', err)
        // if (isInvalidToken(err)) return 1
        setSnackbar(err)
        return err
      })
  ).data as Dataset[]
  // c.logserv('api.balance', response)
  // response.balance = removeBackZeroes(response.balance)
  return response
}
