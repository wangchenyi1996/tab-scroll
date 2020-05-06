import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
Vue.config.productionTip = false

// 引入 v-charts图标插件
import VCharts from 'v-charts'
Vue.use(VCharts)

//引入自定义插件
import Toast from './components/Toast/Toast'
Vue.use(Toast,{
  timing:1500,
  type:'success'
})

//引入地图
import VueAMap from 'vue-amap'
Vue.use(VueAMap);
// 初始化vue-amap
VueAMap.initAMapApiLoader({
    // 高德的key
    key: 'e22dc483de15177245f84cf6ec987ebe',
    // 插件集合
    plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor', 'AMap.Geolocation'],
    v: '1.4.4'
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
