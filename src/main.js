import { createApp } from 'vue'
import App from './App.vue'

import router from './router'
import store from './store'
import api from './plugins/api'
import Maska from 'maska'

import './assets/scss/index.scss'

createApp(App)
  .use(router)
  .use(store)
  .use(api)
  .use(Maska)
  .mount('#app')
