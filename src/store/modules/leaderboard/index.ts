import { Module } from 'vuex';

import { RootState } from '@/store/types';
import { LeaderboardEntry, LeaderboardState } from '@/store/modules/leaderboard/types';
import LeaderboardMutationTypes from '@/store/modules/leaderboard/mutation-types';

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
    sortedResults(state): LeaderboardEntry[] {
      const results: LeaderboardEntry[] = [...state.results];
      return results.sort((a, b) => b.score - a.score);
    },
  },
};

export default leaderboardModule;
