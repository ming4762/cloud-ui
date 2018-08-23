import Vue from 'vue'
import Vuex from 'vuex'

import user from './modules/user'
import { Config } from '@/store/modules/Config'
import System from '@/store/modules/System'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    user,
    Config,
    System
  }
})

export default store
