// import Vue from 'vue'
import Vuex from 'vuex'
// Vue.use(Vuex)
import user from './user'
import createPersistedState from 'vuex-persistedstate'

//使用scss的变量
import variables from '@/styles/variables.scss'

import { constantRoutes, asyncRoute } from '../router/index.js'

export default new Vuex.Store({
  state: {
    token: '',
    refresh_token: '',
    // 换肤功能测试
    textcolor: variables.menuText,
    bgcolor:variables.menuBg,
    // 路由
    routes: []
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
    },
    // 换颜色
    CHANGE_COLOR(state, color){
      state.bgcolor = color
    },
    // 添加路由
    SET_ROUTES: (state, routes) => {
      state.routes = constantRoutes.concat(routes)
    }
  },
  actions:{
    generateRoutes({ commit }) {
      return new Promise(resolve => {
        commit('SET_ROUTES', asyncRoute)
        resolve(asyncRoute)
      })
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
          // routes: val.routes,
          user: {
            count: val.user.count,
            userinfo: val.user.userinfo
          }
        }
      }
    })
  ]
})
