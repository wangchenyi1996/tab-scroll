import router, { constantRoutes } from './router'
import store from './store'

import NProgress from 'nprogress'
NProgress.inc(0.2)
NProgress.configure({ easing: 'ease', speed: 500, showSpinner: false })

// import { getToken } from '@/utils/auth.js'

// 每次页面刷新都会执行该钩子函数
// router.onReady(async () => {
//     console.log('onReady')
//     //   const roles = await store.dispatch('setRoles')
//     //   let accessRoutes = await store.dispatch("generateRoutes", roles)
//     //   router.addRoutes(accessRoutes)
//     //   router.options.routes = [...constantRoutes, ...accessRoutes]
// })

// 白名单
const whiteList = ['/login']
router.beforeEach(async (to, from, next) => {
    // 开启进度条
    NProgress.start()

    // to: Route: 即将要进入的目标 路由对象
    // from: Route: 当前导航正要离开的路由
    // next: Function: 一定要调用该方法来 resolve 这个钩子。
    // to.path 可以表示历史记录功能
    let historyList = store.state.user.historyList
    if (!historyList.includes(to.path)) {
        store.commit('user/addHistory', to.path)
    }

    const hasToken = store.state.token
    //   const hasToken = getToken()

    if (hasToken) {
        if (to.path === '/login') {
            next({ path: '/' })
            NProgress.done()
        } else {
            const hasRoles = store.state.roles
            if (hasRoles) {
                console.log('有角色权限')
                next()
            } else {
                console.log('无角色权限')
                try {
                    const roles = await store.dispatch('setRoles')
                    let accessRoutes = await store.dispatch("generateRoutes", roles)
                    router.options.routes = [...constantRoutes, ...accessRoutes]
                    router.addRoutes(accessRoutes)
                    next({ ...to, replace: true })
                } catch (error) {
                    next(`/login?redirect=${to.path}`)
                    NProgress.done()
                }
            }
        }
    } else {
        if (whiteList.indexOf(to.path) !== -1) {
            next()
        } else {
            next(`/login?redirect=${to.path}`)
            NProgress.done()
        }
    }
})

router.afterEach((to, from) => {
    // 关闭进度条
    NProgress.done()
})
