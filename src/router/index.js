// // import Vue from 'vue'
// import VueRouter from 'vue-router'

// // Vue.use(VueRouter)

import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

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

export const constantRoutes = [
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: '/home',
        name: 'home',
        component: () =>
            import( /* webpackChunkName: "home" */ '../views/Home.vue'),
        meta: {
            showTabbar: true // true :缓存  false :不缓存
        }
    },
    {
        path: '/login',
        name: 'login',
        component: () =>
            import( /* webpackChunkName: "login" */ '../views/Login.vue'),
        meta: {
            showTabbar: false // true :缓存  false :不缓存
        }
    },
    {
        path: '/about',
        name: 'about',
        component: () =>
            import( /* webpackChunkName: "about" */ '../views/About.vue'),
        meta: {
            showTabbar: true // true :缓存  false :不缓存
        }
    },
    {
        path: '/down',
        name: 'down',
        component: () =>
            import( /* webpackChunkName: "down" */ '../views/DownImg.vue')
    },
    {
        path: '/index',
        name: 'Index',
        component: () =>
            import( /* webpackChunkName: "Index" */ '../views/Index.vue'),
        meta: {
            showTabbar: true // true :缓存  false :不缓存
        }
    },
    {
        path: '/slot',
        name: 'Slot',
        component: () =>
            import( /* webpackChunkName: "Slot" */ '../views/SlotPage.vue')
    },
    // 路由解耦模式
    // 1、布尔模式
    {
        path: '/route1/:id/:name',
        name: 'Route1',
        component: () =>
            import( /* webpackChunkName: "route" */ '../views/Route1.vue'),
        props: true
    },
    // 2、对象模式
    {
        path: '/route2/:id',
        name: 'Route2',
        component: () =>
            import( /* webpackChunkName: "route" */ '../views/Route2.vue'),
        props: {
            name: 'wq'
        }
    },
    // 3、函数模式
    {
        path: '/route3/:id',
        name: 'Route3',
        component: () =>
            import( /* webpackChunkName: "route" */ '../views/Route3.vue'),
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
            import( /* webpackChunkName: "echarts" */ '../views/ECharts/Pic1.vue')
    },
    //柱状图
    {
        path: '/pic2',
        name: 'pic2',
        component: () =>
            import( /* webpackChunkName: "echarts" */ '../views/ECharts/Pic2.vue')
    },
    //饼图
    {
        path: '/pic3',
        name: 'pic3',
        component: () =>
            import( /* webpackChunkName: "echarts" */ '../views/ECharts/Pic3.vue')
    },
    //雷达图
    {
        path: '/pic4',
        name: 'pic4',
        component: () =>
            import( /* webpackChunkName: "echarts" */ '../views/ECharts/Pic4.vue')
    },
    //地图
    {
        path: '/map',
        name: 'map',
        component: () =>
            import( /* webpackChunkName: "echarts" */ '../views/ECharts/Map.vue')
    },
    //K线图
    {
        path: '/k-line',
        name: 'k-line',
        component: () =>
            import( /* webpackChunkName: "echarts" */ '../views/ECharts/Pic5.vue')
    },
    // 高德地图
    {
        path: '/gd-map',
        name: 'gd-map',
        component: () =>
            import( /* webpackChunkName: "echarts" */ '../views/Map.vue')
    },
    //css 媒体查询使用
    {
        path: '/media',
        name: 'media',
        component: () =>
            import( /* webpackChunkName: "echarts" */ '../views/Medias.vue')
    },
    //自定义事件
    {
        path: '/evt',
        name: 'events',
        component: () =>
            import( /* webpackChunkName: "echarts" */ '../views/Events.vue')
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
            import( /* webpackChunkName: "echarts" */ '../views/Keys.vue')
    },
    {
        path: '/page1',
        name: 'page1',
        component: () =>
            import('../views/RefreshPages/Page1.vue'),
        meta: {
            keepAlive: true // true :缓存  false :不缓存
        }
    },
    {
        path: '/page2',
        name: 'page2',
        component: () =>
            import('../views/RefreshPages/Page2.vue'),
        meta: {
            keepAlive: true, // true :缓存  false :不缓存
            isBack: false, //用于判断上一个页面是哪个
        }
    },
    {
        path: '/page3',
        name: 'page3',
        component: () =>
            import('../views/RefreshPages/Page3.vue'),
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
            import('../views/times/list.vue'),
        meta: {
            keepAlive: true, // true :缓存  false :不缓存
            isBack: false, //用于判断上一个页面是哪个
        }
    },
    {
        path: '/detail/:id',
        name: 'detail',
        component: () =>
            import('../views/times/detail.vue'),
        meta: {
            keepAlive: false, // true :缓存  false :不缓存
            isBack: false, //用于判断上一个页面是哪个
        }
    },
    // 虚拟列表
    {
        path: '/vlist',
        name: 'vlist',
        component: () =>
            import('../views/virtulScroll/VirtualList.vue'),
        meta: {
            keepAlive: false, // true :缓存  false :不缓存
            isBack: false, //用于判断上一个页面是哪个
        }
    },
    {
        path: '/vlist2',
        name: 'vlist2',
        component: () =>
            import('../views/virtulScroll/VirtualList2.vue'),
        meta: {
            keepAlive: false, // true :缓存  false :不缓存
            isBack: false, //用于判断上一个页面是哪个
        }
    },
    // 下拉刷新
    {
        path: '/refresh',
        name: 'refresh',
        component: () =>
            import('../views/Refresh.vue'),
        meta: {
            keepAlive: false, // true :缓存  false :不缓存
            isBack: false, //用于判断上一个页面是哪个
        }
    },
    // socket
    {
        path: '/joinchat',
        name: 'joinchat',
        component: () =>
            import('../views/chat/JoinChat.vue'),
        meta: {
            keepAlive: false, // true :缓存  false :不缓存
            isBack: false, //用于判断上一个页面是哪个
            showTabbar: true
        }
    },
    {
        path: '/chat/:username/:img',
        name: 'chat',
        component: () =>
            import('../views/chat/Chat.vue'),
        meta: {
            keepAlive: false, // true :缓存  false :不缓存
            isBack: false, //用于判断上一个页面是哪个
        }
    },
    // mock 使用
    {
        path: '/mock',
        name: 'mock',
        component: () =>
            import('../views/mock/Test01.vue'),
        meta: {
            keepAlive: false, // true :缓存  false :不缓存
            isBack: false, //用于判断上一个页面是哪个
        }
    },
    {
        path: '/cart',
        name: 'cart',
        component: () =>
            import('../views/DotScrollToBottom.vue'),
        meta: {
            keepAlive: false, // true :缓存  false :不缓存
            isBack: false, //用于判断上一个页面是哪个
            showTabbar: true
        }
    },
    // 测试 created mounted watch computed执行顺序问题
    {
        path: '/vuesort',
        name: 'vuesort',
        component: () =>
            import('../views/vuesort.vue'),
        meta: {
            keepAlive: false, // true :缓存  false :不缓存
            isBack: false, //用于判断上一个页面是哪个
            showTabbar: false
        }
    },
    // 瀑布流
    {
        path: '/waterful',
        name: 'waterful',
        component: () =>
            import('../views/Waterful.vue'),
        meta: {
            keepAlive: false, // true :缓存  false :不缓存
            isBack: false, //用于判断上一个页面是哪个
            showTabbar: false
        }
    },
    {
        path: '/scroll',
        name: 'scroll',
        component: () =>
            import('../views/Scroll.vue'),
        meta: {
            keepAlive: false, // true :缓存  false :不缓存
            isBack: false, //用于判断上一个页面是哪个
            showTabbar: false
        }
    },
    // vue列表动画
    {
        path: '/animation',
        name: 'animation',
        component: () =>
            import('../views/AnimationList.vue')
    },
    // html5 API
    {
        path: '/html5',
        name: 'HTML5',
        component: () =>
            import('../views/Html5Api.vue')
    },
    // 图书翻页效果
    {
        path: '/book',
        name: 'TurnBook',
        component: () =>
            import('../views/TurnBook.vue')
    },
    // 图片验证码
    {
        path: '/verification',
        name: 'Verification',
        component: () =>
            import('../views/Verification.vue')
    },
    // better-scroll使用
    {
        path: '/bscroll',
        name: 'Bscroll',
        component: () =>
            import('../views/better-scroll/BetterScroll.vue')
    },
    // scss 换肤功能
    {
        path: '/vars',
        name: 'Variables',
        component: () =>
            import('../views/CssVariables.vue')
    },
    // 404 页面找不到
    {
        path: '/404',
        name: 'notfound',
        component: () =>
            import('../views/Notfound.vue')
    }
]

export const asyncRoute = [
    {
        path: '/add1',
        name: 'add1',
        component: () =>
            import('@/views/addRoutes/add1.vue')
    },
    {
        path: '/add2',
        name: 'add2',
        component: () =>
            import('@/views/addRoutes/add2.vue')
    },
    { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new VueRouter({
    mode: 'hash',
    base: process.env.BASE_URL,
    routes: constantRoutes,
    scrollBehavior(to, from, savedPosition) {
        // console.log(savedPosition)
        // if (savedPosition) {
        //     return savedPosition
        // } else {
        //     return {
        //         x: 0,
        //         y: 0
        //     }
        // }
        if (savedPosition) {
            // savedPosition is only available for popstate navigations.
            return savedPosition
        } else {
            const position = {}
            // new navigation.
            // scroll to anchor by returning the selector
            if (to.hash) {
                position.selector = to.hash
            }
            // 如果meta中有scrollTop
            if (to.matched.some(m => m.meta.scrollToTop)) {
                // cords will be used if no selector is provided,
                // or if the selector didn't match any element.
                position.x = 0
                position.y = 0
            }
            // if the returned position is falsy or an empty object,
            // will retain current scroll position.
            return position
        }
    }
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router