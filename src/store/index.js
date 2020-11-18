// import Vue from 'vue'
import Vuex from 'vuex'
// Vue.use(Vuex)
import user from './user'
import createPersistedState from 'vuex-persistedstate'
// console.log('tag', user)

export default new Vuex.Store({
  state: {
    token: '',
    refresh_token: ''
  },
  getters: {
    getToken(state, getters) {
      // console.log('state:',state)
      // console.table('getters:',getters['user/getTestData'])
      return state.token
    }
  },
  mutations: {
    updateToken(state, token) {
      state.token = token
    },
    setRefreshToken(state, reToken) {
      state.refresh_token = reToken
    }
  },
  modules: {
    user
  },
  plugins: [
    createPersistedState({
      storage: window.localStorage,
      reducer(val) {
        // console.log('所有state:', val)
        return {
          token: val.token,
          refresh_token: val.refresh_token,
          user: {
            count: val.user.count,
            userinfo: val.user.userinfo
          }
        }
      }

    })
  ]
})
