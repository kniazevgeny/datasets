import createPersistedState from 'vuex-persistedstate'

export default createPersistedState({
  paths: ['AppStore.user', 'AppStore.datasets', 'AppStore.predictors', 'AppStore.language', 'AppStore.dark'],
})
