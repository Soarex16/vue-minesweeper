import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';

import store from '@/store';

import Home from '@/views/MainMenu.vue';
import Login from '@/views/Login.vue';
import Settings from '@/views/Settings.vue';
import Game from '@/views/Game.vue';
import Leaderboard from '@/views/Leaderboard.vue';

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
    path: '/game',
    name: 'Game',
    component: Game,
  },
  {
    path: '/leaderboard',
    name: 'Leaderboard',
    component: Leaderboard,
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
