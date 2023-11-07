import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import user from './modules/user'
export const store = new Vuex.Store({
  namespaced:true,
  state: {
    count: 0
  },
  getters: {
    getAddCount(state) {
        return state.count+10
    }
  },
  mutations: {
    increment (state) {
      state.count++
    }
  },
  actions: {
    actionsincrement ({commit}) {
        setTimeout(() => {
            commit('increment')
        }, 2000);
      }
  },
  modules: {
    user
  }
})