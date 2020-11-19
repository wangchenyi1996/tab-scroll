import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

Vue.config.productionTip = false

// 引入 mockjs 数据
import './mockServer/mock'

//引入动画库、全局scss样式
// import './common/reset.scss'
import './common/style.scss'

// 引入 v-charts图标插件
import VCharts from 'v-charts'
Vue.use(VCharts)

//引入自定义插件
import Toast from './components/Toast/Toast'
Vue.use(Toast, {
    timing: 1500,
    type: 'success'
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

// socket
// import io from '@/assets/socket/socket.io.js'
// Vue.prototype.socket = io('http://192.168.1.156:9527')

// 图片懒加载
import VueLazyload from 'vue-lazyload' 
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: require('./assets/imgs/error.png'),
  loading: require('./assets/imgs/loading.png'),
  attempt: 2
})

// 滑动验证
import SlideVerify from "vue-monoplasty-slide-verify";
Vue.use(SlideVerify)

// 进度条
import "nprogress/nprogress.css";

// 引入滑动组件  只是测试使用
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/swiper.scss'
Vue.use(VueAwesomeSwiper)

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')