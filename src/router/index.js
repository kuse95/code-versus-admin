import { createRouter, createWebHistory } from 'vue-router'
export * from "./asyncRouter";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('@/views/login/index.vue')
    },
  ]
})

export default router
