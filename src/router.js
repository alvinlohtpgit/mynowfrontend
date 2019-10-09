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
            component: Home,
            meta: {
                title: 'MyNow.page'
            }
        },
        {
            path: '/dashboard',
            name: 'dashboard',
            component: Dashboard,
            meta: {
                title: 'MyNow.page Dashboard'
            }
        },
        {
            path: '/create',
            name: 'createpage',
            component:CreateNewPage,
            meta: {
                title: 'MyNow.page Create New Page'
            }
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
            component: Viewusernow,
            meta: {
                title: 'MyNow.page'
            }
        }
]
})
