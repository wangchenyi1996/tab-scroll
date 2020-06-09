// import Vue from 'vue'
import VueRouter from 'vue-router'

// Vue.use(VueRouter)

// 命名视图 
/*
  <div class="container">
    <router-view name="header"></router-view>
    <div class="aa">
        <router-view name="left"></router-view>
        <router-view name="mian"></router-view>
    </div>
  </div>
*/
const Foo = { template: '<div>header</div>' }
const Bar = { template: '<div>left</div>' }
const Baz = { template: '<div>mian</div>' }

const routes = [{
        path: '/',
        name: 'home',
        component: () =>
            import ( /* webpackChunkName: "home" */ '../views/Home.vue')
    },
    {
        path: '/about',
        name: 'about',
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/About.vue')
    },
    {
        path: '/down',
        name: 'down',
        component: () =>
            import ( /* webpackChunkName: "down" */ '../views/DownImg.vue')
    },
    {
        path: '/index',
        name: 'Index',
        component: () =>
            import ( /* webpackChunkName: "Index" */ '../views/Index.vue')
    },
    {
        path: '/slot',
        name: 'Slot',
        component: () =>
            import ( /* webpackChunkName: "Slot" */ '../views/SlotPage.vue')
    },
    // 路由解耦模式
    // 1、布尔模式
    {
        path: '/route1/:id/:name',
        name: 'Route1',
        component: () =>
            import ( /* webpackChunkName: "route" */ '../views/Route1.vue'),
        props: true
    },
    // 2、对象模式
    {
        path: '/route2/:id',
        name: 'Route2',
        component: () =>
            import ( /* webpackChunkName: "route" */ '../views/Route2.vue'),
        props: {
            name: 'wq'
        }
    },
    // 3、函数模式
    {
        path: '/route3/:id',
        name: 'Route3',
        component: () =>
            import ( /* webpackChunkName: "route" */ '../views/Route3.vue'),
        props: (route) => (
            // console.log('tag', route),
            {
                name: "wq",
                id: route.params.id
            }
        )
    },
    // echarts 图表使用
    //折线图
    {
        path: '/pic1',
        name: 'pic1',
        component: () =>
            import ( /* webpackChunkName: "echarts" */ '../views/ECharts/Pic1.vue')
    },
    //柱状图
    {
        path: '/pic2',
        name: 'pic2',
        component: () =>
            import ( /* webpackChunkName: "echarts" */ '../views/ECharts/Pic2.vue')
    },
    //饼图
    {
        path: '/pic3',
        name: 'pic3',
        component: () =>
            import ( /* webpackChunkName: "echarts" */ '../views/ECharts/Pic3.vue')
    },
    //雷达图
    {
        path: '/pic4',
        name: 'pic4',
        component: () =>
            import ( /* webpackChunkName: "echarts" */ '../views/ECharts/Pic4.vue')
    },
    //地图
    {
        path: '/map',
        name: 'map',
        component: () =>
            import ( /* webpackChunkName: "echarts" */ '../views/ECharts/Map.vue')
    },
    //K线图
    {
        path: '/k-line',
        name: 'k-line',
        component: () =>
            import ( /* webpackChunkName: "echarts" */ '../views/ECharts/Pic5.vue')
    },
    // 高德地图
    {
        path: '/gd-map',
        name: 'gd-map',
        component: () =>
            import ( /* webpackChunkName: "echarts" */ '../views/Map.vue')
    },
    //css 媒体查询使用
    {
        path: '/media',
        name: 'media',
        component: () =>
            import ( /* webpackChunkName: "echarts" */ '../views/Medias.vue')
    },
    //自定义事件
    {
        path: '/evt',
        name: 'events',
        component: () =>
            import ( /* webpackChunkName: "echarts" */ '../views/Events.vue')
    },
    // 命名视图
    {
        path: '/other',
        components: {
            header: Baz,
            left: Bar,
            mian: Foo
        }
    },
    // 解释 v-for 为什么 要加上 key
    {
        path: '/keys',
        name: 'keys',
        component: () =>
            import ( /* webpackChunkName: "echarts" */ '../views/Keys.vue')
    },
    {
        path: '/page1',
        name: 'page1',
        component: () =>
            import ('../views/RefreshPages/Page1.vue'),
        meta: {
            keepAlive: true // true :缓存  false :不缓存
        }
    },
    {
        path: '/page2',
        name: 'page2',
        component: () =>
            import ('../views/RefreshPages/Page2.vue'),
        meta: {
            keepAlive: true, // true :缓存  false :不缓存
            isBack: false, //用于判断上一个页面是哪个
        }
    },
    {
        path: '/page3',
        name: 'page3',
        component: () =>
            import ('../views/RefreshPages/Page3.vue'),
        meta: {
            keepAlive: true, // true :缓存  false :不缓存
            isBack: false, //用于判断上一个页面是哪个
        }
    },
    //  模仿 商品列表的倒计时功能
    {
        path: '/list',
        name: 'list',
        component: () =>
            import ('../views/times/list.vue'),
        meta: {
            keepAlive: true, // true :缓存  false :不缓存
            isBack: false, //用于判断上一个页面是哪个
        }
    },
    {
        path: '/detail/:id',
        name: 'detail',
        component: () =>
            import ('../views/times/detail.vue'),
        meta: {
            keepAlive: false, // true :缓存  false :不缓存
            isBack: false, //用于判断上一个页面是哪个
        }
    },

]

const router = new VueRouter({
    mode: 'hash',
    base: process.env.BASE_URL,
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return {
                x: 0,
                y: 0
            }
        }
    }
})

export default router