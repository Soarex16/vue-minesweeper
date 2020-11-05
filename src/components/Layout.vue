<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <router-link to="/">
        <div class="d-flex align-center">
          <v-img
            alt="Minesweeper Logo"
            class="shrink mr-2"
            contain
            :src="require('@/assets/minesweeper.png')"
            transition="scale-transition"
            width="40"
          />

          <div
            :class="['white--text', 'text-h5']"
          >
            Игра "Сапер"
          </div>
        </div>
      </router-link>

      <v-spacer />

      <v-btn
        text
        v-if="loggedIn"
        @click="logout"
      >
        <v-icon>mdi-logout</v-icon>
        <span class="ml-2">Выйти</span>
      </v-btn>
    </v-app-bar>

    <v-main>
      <v-container fill-height>
        <v-row align="center" justify="center">
          <slot></slot>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters } from 'vuex';

import RootActionTypes from '@/store/action-types';

export default Vue.extend({
  name: 'Layout',
  computed: mapGetters(['loggedIn']),
  methods: {
    logout() {
      this.$store.dispatch(RootActionTypes.LOGOUT);
      this.$router.push('/login');
    },
  },
});
</script>
