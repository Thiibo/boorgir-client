import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import HomeView from '@/views/front/HomeView.vue'

function defineRoutes(routes: RouteRecordRaw[], globalRouteProperties: (route: RouteRecordRaw) => Object): RouteRecordRaw[] {
    routes.forEach(route => Object.assign(route, globalRouteProperties(route)));
    return routes;
}

const frontRoutes: RouteRecordRaw[] = defineRoutes(
  // Routes
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

const backOfficeRoutes: RouteRecordRaw[] = defineRoutes(
  // Routes
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

export default router
