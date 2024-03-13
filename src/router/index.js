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
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  linkActiveClass: 'active',
  routes,
});

export default router;
