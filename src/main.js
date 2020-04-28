import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 引入 v-charts图标插件
import VCharts from 'v-charts'
Vue.use(VCharts)

import Toast from './components/Toast/Toast'
Vue.use(Toast,{
  timing:1500,
  type:'success'
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
