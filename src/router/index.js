import Vue from 'vue'
import Router from 'vue-router'

const About = resolve => require(['@/views/About'], resolve)
const Home = resolve => require(['@/views/Home'], resolve)
const CategoryDetail = resolve => require(['@/views/CategoryDetail'], resolve)
const Help = resolve => require(['@/views/Help'], resolve)
const Settings = resolve => require(['@/views/Settings'], resolve)

const OauthCallback = resolve => require(['@/views/oauth/Callback'], resolve)
const Error404 = resolve => require(['@/views/error/Error404'], resolve)

const ArticleDetail = resolve => require(['@/views/article/Detail'], resolve)
const ArticleAdd = resolve => require(['@/views/article/ArticleAdd'], resolve)

Vue.use(Router)

let routes = [
    {
        path: '/',
        component: Home
    },
    // 文章相关
    {
        path: '/articles/add',
        component: ArticleAdd
    },
    {
        path: '/articles/:id',
        component: ArticleDetail
    },
    {
        path: '/categories/:id',
        component: CategoryDetail
    },
    {
        path: '/settings',
        component: Settings
    },
    {
        path: '/oauth/callback',
        component: OauthCallback
    },
    {
        path: '/about',
        component: About
    },
    {
        path: '/help',
        component: Help
    },
    {
        path: '*',
        component: Error404
    }
]

let router = new Router({
    mode: 'history',
    routes: routes,
    scrollBehavior (to, from, savedPosition) {
        return {
            x: 0,
            y: 0
        }
    }
})

router.beforeEach((to, from, next) => {
    next()
})

export default router
