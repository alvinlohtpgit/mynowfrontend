import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Dashboard from './views/Dashboard'
import Viewusernow from './views/Viewusernow'
import CreateNewPage from "./views/CreateNewPage";
import Authcallback from "./views/Authcallback";
import { authGuard } from "./auth";

Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/about',
            name: 'about',
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
        },
        {
            path: '/dashboard',
            name: 'dashboard',
            component: Dashboard
        },
        {
            path: '/create',
            name: 'createpage',
            component:CreateNewPage
        },
        {
            path:'/authcallback',
            name:'authcallback',
            component: Authcallback,
            beforeEnter: authGuard
        },
        {
            path:'/now',
            name:'now',
            component: Viewusernow
        }
]
})
