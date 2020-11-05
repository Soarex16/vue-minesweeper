import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';

import { RootState } from '@/store/types';
import RootMutationTypes from '@/store/mutation-types';
import RootActionTypes from '@/store/action-types';

import settings from '@/store/modules/settings';

Vue.use(Vuex);

const store: StoreOptions<RootState> = {
  state: {
    username: '',
  },
  getters: {
    loggedIn(state): boolean {
      return !!state.username;
    },
  },
  mutations: {
    [RootMutationTypes.CHANGE_USERNAME](state, newUsername: string) {
      state.username = newUsername;
    },
  },
  actions: {
    [RootActionTypes.LOGIN]({ commit }, username: string) {
      commit(RootMutationTypes.CHANGE_USERNAME, username);
    },
    [RootActionTypes.LOGOUT]({ commit }) {
      commit(RootMutationTypes.CHANGE_USERNAME, '');
    },
  },
  modules: {
    settings,
  },
  // не даем стрелять себе в ногу плохим стилем
  strict: process.env.NODE_ENV !== 'production',
};

export default new Vuex.Store<RootState>(store);
