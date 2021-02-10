import { Module } from 'vuex';

import { RootState } from '@/store/types';
import { GameState } from '@/store/modules/game/types';
import GameMutationTypes from './mutation-types';
import GameActionTypes from './action-types';

const gameModule: Module<GameState, RootState> = {
  namespaced: true,
  state: () => ({
    score: 0,
  }),
  mutations: {
    [GameMutationTypes.UPDATE_SCORE](state, increment: number) {
      state.score += increment;
    },
    [GameMutationTypes.RESET_SCORE](state) {
      state.score = 0;
    },
  },
  actions: {
    [GameActionTypes.OPEN_EMPTY_CELL]({ commit, rootState }) {
      const points = rootState.settings.currentGameMode.points.empty;
      commit(GameMutationTypes.UPDATE_SCORE, points);
    },
    [GameActionTypes.ADD_POINTS_FOR_BOMBS]({ commit, rootState }) {
      const points = rootState.settings.currentGameMode.points.bomb;
      commit(GameMutationTypes.UPDATE_SCORE, points);
    },
    [GameActionTypes.RESET_SCORE]({ commit }) {
      commit(GameMutationTypes.RESET_SCORE);
    },
  },
  getters: {
  },
};

export default gameModule;
