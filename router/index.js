import { createRouter, createMemoryHistory } from 'vue-router'
import Login from '../src/views/Login.vue'
import Delivery from '../src/views/Delivery.vue'
import Profile from '../src/views/profile/index.vue'
import ProfileInfo from '../src/views/profile/Info.vue'
import Withdrawal from '../src/views/profile/Withdrawal.vue'
import OrderDetails from '../src/views/OrderDetails.vue'
import { useUserStore } from '../stores/user'

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
    history: createMemoryHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    const isAuthenticated = localStorage.getItem('riderToken')
    // 原 - 判断stroage是否为空 - 通过id获取
    // 改 - 判断session是否过期 - 通过session获取
    if (to.meta.requiresAuth && !isAuthenticated) {
        next('/login')
    } else {
        next()
    }
})

export default router