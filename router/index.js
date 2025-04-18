import { createRouter, createWebHistory } from 'vue-router'
import Login from '../src/views/Login.vue'
import Delivery from '../src/views/Delivery.vue'
import Profile from '../src/views/profile/index.vue'
import ProfileInfo from '../src/views/profile/Info.vue'
import Withdrawal from '../src/views/profile/Withdrawal.vue'
import OrderDetails from '../src/views/OrderDetails.vue'

const routes = [
    {
        path: '/',
        redirect: '/delivery'
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/delivery',
        name: 'Delivery',
        component: Delivery,
        meta: { requiresAuth: true }
    },
    {
        path: '/profile',
        name: 'Profile',
        component: Profile,
        meta: { requiresAuth: true }
    },
    {
        path: '/profile/info',
        name: 'ProfileInfo',
        component: ProfileInfo
    },
    {
        path: '/profile/withdrawal',
        name: 'Withdrawal',
        component: Withdrawal
    },
    {
        path: '/orderDetails',
        name: 'OrderDetails',
        component: OrderDetails
    },
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

router.beforeEach((to, from, next) => {
    const isAuthenticated = localStorage.getItem('riderToken')
    if (to.meta.requiresAuth && !isAuthenticated) {
        next('/login')
    } else {
        next()
    }
})

export default router