import axios from 'axios'
import store from '@/store'
import { User } from '@/models/User'
import { Dataset } from '@/models/Dataset'
import { namespace } from 'vuex-class'

const base = 'http://192.168.31.242:1337'

function logUserAction() {}

export function test() {
//   console.log(store.state.AppStore.user)
}

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
  ).data.data as Dataset[]
  // c.logserv('api.balance', response)
  // response.balance = removeBackZeroes(response.balance)
  return response
}
