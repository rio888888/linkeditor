import { createRouter, createWebHistory } from 'vue-router'
import appRoutes from './modules'

import { useUserState } from '../store/user'
const userState = useUserState()

const routes = [
  {
    path: '/',
    name: 'root',
    redirect: '/home',
    component: () => import('@/views/layout/index.vue'),
    children: appRoutes,
    meta: {
      isAuth: true
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {

  if (to.name === 'login' && userState.value.sessionToken !== '') {
    next({ name: 'home' })
    return
  }

  if (to.meta.isAuth && userState.value.sessionToken === '') {
    next({ name: 'login' })
    return
  }

  next()
})


export default router