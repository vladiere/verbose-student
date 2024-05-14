import { createRouter, createWebHistory } from 'vue-router'
import useAuthStore from '../stores/auth.store';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      meta: { auth: true },
      component: () => import('../layouts/MainLayout.vue'),
      children: [
        {
          path: '',
          name: 'home',
          meta: { auth: true },
          component: () => import('../views/HomeView.vue')
        },
        {
          path: '/create',
          name: 'create',
          meta: { auth: true },
          component: () => import('../views/CreateTodoView.vue')
        },
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/RegisterView.vue'),
    },
    {
      path: '/:cathAll(.*)',
      component: () => import('../views/NotFoundView.vue'),
    }
  ]
})

router.beforeEach((to, from, next) => {
  const auth = useAuthStore();
  if (to.meta.auth && !auth.isAuthenticated) {
    next({ name: 'login' })
  } else if (!to.meta.auth && auth.isAuthenticated) {
    next({ name: 'home' })
  } else {
    next();
  }
})

export default router
