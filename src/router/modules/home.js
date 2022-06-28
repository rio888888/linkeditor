export default {
  path: 'home',
  name: 'home',
  component: () => import('@/views/home/index.vue'),
  meta: {
    locale: '首页',
    isAuth: true
  }
}