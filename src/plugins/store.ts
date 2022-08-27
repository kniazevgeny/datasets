// Dependencies
import Vue from 'vue'
import Vuex from 'vuex'
import { User } from '@/models/user'
import createPersistedState from 'vuex-persistedstate'
// import c from "@/plugins/console";
// import * as api from "../utils/api";

export interface State {
  user?: User
  snackbar: SnackbarState
  language?: string
  dark: boolean
}

interface LocalizedError {
  en: string
  ru: string
}

interface SnackbarState {
  message: string | LocalizedError
  active: boolean
  color: string
}

function isEmpty(obj) {
  return JSON.stringify(obj) === JSON.stringify({})
}

// @ts-ignore
const storeOptions = {
  state: {
    user: undefined,
    snackbar: {
      message: '',
      active: false,
      color: 'success',
    },
    language: 'ru',
    dark: false,
  },
  mutations: {
    setUser(state: State, user: User) {
      state.user = user
    },
    setSnackbar(state: State, snackbar: SnackbarState) {
      state.snackbar = snackbar
    },
    setLanguage(state: State, language: string) {
      state.language = language
    },
    setDark(state: State, dark: boolean) {
      state.dark = dark
    },
  },
  getters: {
    user: (state: State) => state.user,
    snackbar: (state: State) => state.snackbar,
    language: (state: State) => state.language,
    dark: (state: State) => state.dark,
  },
  plugins: [createPersistedState()],
  actions: {},
}

export const store = new Vuex.Store<State>(storeOptions)

// Getters
const getters = store.getters

export const user = () => getters.user as User | undefined
export const snackbar = () => getters.snackbar as SnackbarState

export const language = () => getters.language as string
export const dark = () => getters.dark as boolean

// Mutations
export const setUser = (user: {
  language: string
}) => {
  store.commit('setUser', user)
}
export const setSnackbar = (snackbar: SnackbarState) => {
  store.commit('setSnackbar', snackbar)
}
export const setCurrentAsset = (asset: string) => {
  store.commit('setCurrentAsset', asset)
}
export const hideSnackbar = () => {
  store.commit('setSnackbar', { ...store.state.snackbar, active: false })
}
export const setLanguage = (language: string) => {
  store.commit('setLanguage', language)
}
export const setDark = (dark: boolean) => {
  store.commit('setDark', dark)
}
