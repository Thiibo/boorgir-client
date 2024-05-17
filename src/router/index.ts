import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import HomeView from '@/views/front/HomeView.vue'
import { profileData } from '@/modules/api-services/auth';

function defineRoutes(routes: RouteRecordRaw[], globalRouteProperties: (route: RouteRecordRaw) => Object): RouteRecordRaw[] {
    routes.forEach(route => Object.assign(route, globalRouteProperties(route)));
    return routes;
}

const frontRoutes = defineRoutes(
  [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/order',
      name: 'order',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('@/views/front/OrderView.vue')
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
  ],
  
  // Properties that are applied to all routes
  () => ({
    meta: {
      isFront: true
    }
  })
);

const backOfficeRoutes = defineRoutes(
  [
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
  ],
  
  // Properties that are applied to all routes
  route => ({
    path: "/admin" + (route.path as string), // Prefix all with '/admin'
    meta: {
      isFront: false
    }
  })
);

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    ...frontRoutes,
    ...backOfficeRoutes
  ]
});

router.beforeEach(async (to, _, next) => {
  if (!to.meta.isFront && !profileData.value?.is_admin) {
    next({ path: '/' });
  } else {
    next();
  }
});

export default router
