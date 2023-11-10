import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    meta: { layout: 'DefaultLayout' },
    component: () => import('../views/home')
  },
  {
    path: '/register',
    meta: { layout: 'DefaultLayout' },
    component: () => import('../views/register')
  },
  {
    path: '/support',
    meta: { layout: 'DefaultLayout' },
    component: () => import('../views/support')
  },
  {
    path: '/search-partners',
    meta: { layout: 'DefaultLayout' },
    component: () => import('../views/search-partners')
  }
]

export default createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
