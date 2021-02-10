import { Module } from 'vuex';

import { RootState } from '@/store/types';
import { LeaderboardEntry, LeaderboardState } from '@/store/modules/leaderboard/types';
import LeaderboardMutationTypes from '@/store/modules/leaderboard/mutation-types';
import LeaderboardActionTypes from '@/store/modules/leaderboard/action-types';

const leaderboardModule: Module<LeaderboardState, RootState> = {
  namespaced: true,
  state: () => ({
    results: [],
  }),
  mutations: {
    [LeaderboardMutationTypes.ADD_RESULT](state, result: LeaderboardEntry) {
      state.results.push(result);
    },
    [LeaderboardMutationTypes.RESET](state) {
      state.results = [];
    },
  },
  getters: {
    topTen(state): LeaderboardEntry[] {
      const results: LeaderboardEntry[] = state.results.slice(0, 10);
      return results.sort((a, b) => b.score - a.score);
    },
  },
  actions: {
    [LeaderboardActionTypes.ADD_RESULT]({ commit, rootState }, score: number) {
      const currentUser = rootState.username;

      commit(LeaderboardMutationTypes.ADD_RESULT, {
        user: currentUser,
        score,
      });
    },
  },
};

export default leaderboardModule;
