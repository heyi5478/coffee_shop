import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    component: () => import('../views/FrontView.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('../views/FrontView/HomeView.vue'),
      },
      {
        path: 'about',
        name: 'About',
        component: () => import('../views/FrontView/AboutView.vue'),
      },
      {
        path: 'product/:id',
        component: () => import('../views/FrontView/ProductView.vue'),
      },
      {
        path: 'products',
        component: () => import('../views/FrontView/ProductsView.vue'),
      },
      {
        path: 'checkout',
        component: () => import('../views/FrontView/CheckoutView.vue'),
      },
      {
        path: 'orderSuccess',
        component: () => import('../views/FrontView/OrderSuccessView.vue'),
      },
    ],
  },
  {
    path: '/login',
    component: () => import('../views/LoginView.vue'),
  },
  {
    path: '/admin',
    component: () => import('../views/DashboardView/AdminDashboard.vue'),
    children: [
      {
        path: 'products',
        component: () => import('../views/DashboardView/AdminProducts.vue'),
      },
      {
        path: 'orders',
        component: () => import('../views/DashboardView/AdminOrders.vue'),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  linkActiveClass: 'active',
  routes,
});

export default router;
