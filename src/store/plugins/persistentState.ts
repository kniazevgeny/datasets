import createPersistedState from 'vuex-persistedstate'

export default createPersistedState({
  paths: ['AppStore.user', 'AppStore.datasets', 'AppStore.language', 'AppStore.dark'],
})
