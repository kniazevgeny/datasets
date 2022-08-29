<template lang="pug">
v-container
  v-snackbar(app v-model='active' :timeout='4000' top :color='color' flat)
    span {{text}}
    v-btn(color='white' text @click='active = false') {{$t('close')}}

</template>

<script lang="ts">
import { Vue } from 'vue-class-component'
import * as store from '../plugins/store'

export default class Snackbar extends Vue {
  get active() {
    return store.snackbar().active
  }

  set active(newValue: boolean) {
    store.hideSnackbar()
  }

  get color() {
    return store.snackbar().color
  }

  get text() {
    console.log('aa')
    // console.log(typeof i18n)
    return 'abc';
    // const msg = store.snackbar().message
    // if (typeof msg === 'string' && msg === 'Internal Server Error')
    //   return i18n.t('errors.internal')
    // if (typeof msg === 'string' && msg === 'Internal Site Error')
    //   return i18n.t('errors.internalSite')
    // return typeof msg === 'string'
    //   ? i18n.t(store.snackbar().message.toString())
    //   : (msg as any)[i18n.locale]
  }
}
</script>
