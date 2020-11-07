import { Module } from 'vuex';

import { RootState } from '@/store/types';
import { GameState } from '@/store/modules/game/types';

const gameModule: Module<GameState, RootState> = {
  namespaced: true,
  state: () => ({
    score: 0,
  }),
  /*
  mutations: {
  },
  actions: {
  },
  getters: {
  },
  */
};

export default gameModule;
