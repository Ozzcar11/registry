import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import auth from './modules/auth'
import checkboxTree from './modules/checkboxTree'

export default createStore({
  plugins: [createPersistedState({
    paths: ['auth']
  })],
  modules: {
    auth,
    checkboxTree
  }
})
