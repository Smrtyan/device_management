import VueRouter from 'vue-router'
import Home from '@/pages/Home'
import store from "@/store";
import SignIn from "@/pages/SignIn";
import SignUp from "@/pages/SignUp";
import Upload from "@/pages/Upload";
const ifAuthenticated = (to, from, next) => {
    if (store.getters['auth/isAuthenticated']) {
        next()
        return
    }
    next()
    // next('/login')
}
const routes = [
    {
        path: "/",
        component: Home,
        beforeEnter: ifAuthenticated
    },
    {
        path: "/login", component: SignIn
    },
    {
        path: "/signup", component: SignUp
    },
    {
        path: '/upload',
        component: Upload,
        beforeEnter: ifAuthenticated
    },
    {
        path: '*',
        beforeEnter: (to, from, next) => {
            next('/');
        }
    }
]
const router = new VueRouter({
    mode: 'history',
    routes
})
router.safeNavigate = function(route, dest) {
    if (route.name != dest) this.push({ name: dest });
}
export default router