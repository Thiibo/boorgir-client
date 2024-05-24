import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { profileData } from '@/modules/api-services/auth';
import Notification from '@/modules/core/notifications';

const frontRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    // route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('@/views/front/HomeView.vue')
  },
  {
    path: '/order',
    name: 'order',
    component: () => import('@/views/front/OrderView.vue'),
    meta: {
      authRequired: true
    }
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/front/RegisterView.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/front/LoginView.vue')
  }
];

frontRoutes.forEach(route => {
  route.meta = Object.assign(route.meta ?? {}, { isFront: true })
});

// ---------------------------------------------------------------

const backOfficeRoutes: RouteRecordRaw[] = [
  {
    path: '/ingredients',
    name: 'ingredients',
    component: () => import('@/views/back-office/IngredientsView.vue')
  },
  {
    path: '/burgers',
    name: 'burgers',
    component: () => import('@/views/back-office/BurgersView.vue')
  }
];

backOfficeRoutes.forEach(route => {
  route.meta = Object.assign(route.meta ?? {}, { isFront: false, authRequired: true });
  route.path = "/admin" + route.path; // Prefix all with '/admin'
});

// ---------------------------------------------------------------

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    ...frontRoutes,
    ...backOfficeRoutes
  ]
});

router.beforeEach(async (to, _, next) => {
  if (to.matched.length === 0) {
    next({ path: '/' });
    Notification.create('general.error.notfound', 'error');

  } else if (to.meta.authRequired && !profileData.value) {
    next({ path: '/login' });
    Notification.create('general.error.notloggedin', 'error');

  } else if (!to.meta.isFront && !profileData.value?.is_admin) {
    next({ path: '/' });
    Notification.create('general.error.unauthorized', 'error');

  } else {
    next();

  }
});

export default router
