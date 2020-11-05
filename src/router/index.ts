import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';

import store from '@/store';

import Home from '@/views/Home.vue';
import Login from '@/views/Login.vue';
import Settings from '@/views/Settings.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      anonymous: true,
    },
    beforeEnter(to, from, next) {
      if (store.getters.loggedIn) {
        next('/');
        return;
      }

      next();
    },
  },
  {
    path: '/settings',
    name: 'Settings',
    component: Settings,
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

// global nav guard for redirecting to login
router.beforeEach((to, from, next) => {
  if (to.meta.anonymous) {
    next();
    return;
  }

  if (!store.getters.loggedIn) {
    next('/login');
    return;
  }

  next();
});

export default router;
