import { createRouter, createWebHistory } from 'vue-router'
export * from './asyncRouter'

export const constantRoutes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue')
  }
]

function makeRouter() {
  return createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: constantRoutes
  })
}

const router = makeRouter()

export function clearRouter(routes) {
    console.log('[golden:]',routes);
  if (Array.isArray(routes)) {
    routes.forEach((route) => {
      router.removeRoute(route.name)
    })
  }
}

export default router
