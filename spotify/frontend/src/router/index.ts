import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth.store';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      meta: { auth: true },
      component: () => import('../layouts/MainLayout.vue'),
      children: [
        { path: '', name: 'home_view', meta: { auth: true }, component: () => import('../views/HomeView.vue') },
        { path: '/room/', name: 'chat', meta: { auth: true }, component: () => import('../views/ChatView.vue') },
        { path: '/musics', name: 'musics', meta: { auth: true }, component: () => import('../views/MusicsView.vue') },
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/RegisterView.vue')
    },
    {
      path: '/:catchAll(.*)*',
      component: () => import('../views/NotFoundView.vue')
    }
  ]
})

router.beforeEach((to: any, from: any, next: any) => {
  const auth = useAuthStore();
  if (to.meta.auth && !auth.isAuthenticated) {
    next({ name: 'login' })
  } else {
    next()
  }
})

export default router
