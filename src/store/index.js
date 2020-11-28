// // import Vue from 'vue'
// import Vuex from 'vuex'
// // Vue.use(Vuex)

import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import user from './user'
import createPersistedState from 'vuex-persistedstate'

//使用scss的变量
import variables from '@/styles/variables.scss'

import { constantRoutes, asyncRoute } from '../router/index.js'

import { getToken } from '@/utils/auth.js'

export default new Vuex.Store({
  state: {
    // token: getToken(),
    token: '',
    refresh_token: '',
    // 换肤功能测试
    textcolor: variables.menuText,
    bgcolor: variables.menuBg,
    // 路由
    routes: [],
    addRoutes: [],
    roles: ''
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
    CHANGE_COLOR(state, color) {
      state.bgcolor = color
    },
    // 添加路由--模拟使用
    SET_ROUTES(state, routes) {
      state.addRoutes = routes
      state.routes = constantRoutes.concat(routes)
    },
    SET_RULES(state, roles) {
      state.roles = roles
    }
  },
  actions: {
    generateRoutes({ commit }, roles) {
      return new Promise(resolve => {
        commit('SET_ROUTES', asyncRoute)
        resolve(asyncRoute)
      })
    },
    // 这里面的 admin 先写死一个
    setRoles({ commit }) {
      return new Promise(resolve => {
        setTimeout(() => {
          commit('SET_RULES', 'admin')
          resolve('admin')
        }, 1000)
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