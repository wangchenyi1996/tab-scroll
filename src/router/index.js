import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue')
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/down',
    name: 'down',
    component: () => import(/* webpackChunkName: "down" */ '../views/DownImg.vue')
  },
  {
    path: '/index',
    name: 'Index',
    component: () => import(/* webpackChunkName: "Index" */ '../views/Index.vue')
  },
  {
    path: '/slot',
    name: 'Slot',
    component: () => import(/* webpackChunkName: "Slot" */ '../views/SlotPage.vue')
  },
  // 路由解耦模式
  // 1、布尔模式
  {
    path: '/route1/:id/:name',
    name: 'Route1',
    component: () => import(/* webpackChunkName: "route" */ '../views/Route1.vue'),
    props:true
  },
  // 2、对象模式
  {
    path: '/route2/:id',
    name: 'Route2',
    component: () => import(/* webpackChunkName: "route" */ '../views/Route2.vue'),
    props:{
      name:'wq'
    }
  },
   // 3、函数模式
   {
    path: '/route3/:id',
    name: 'Route3',
    component: () => import(/* webpackChunkName: "route" */ '../views/Route3.vue'),
    props:(route)=>(
      // console.log('tag', route),
      {
        name: "wq",
        id: route.params.id
      }
    )
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
