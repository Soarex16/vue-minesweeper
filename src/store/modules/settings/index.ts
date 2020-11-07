import { Module } from 'vuex';

import gameModes, { MAX_FIELD_FILL_COEFF } from '@/config';
import { RootState } from '@/store/types';
import { GAME_MODE_CUSTOM, GameMode, SettingsState } from '@/store/modules/settings/types';
import SettingsMutationTypes from '@/store/modules/settings/mutation-types';
import SettingsActionTypes from '@/store/modules/settings/action-types';

const settingsModule: Module<SettingsState, RootState> = {
  namespaced: true,
  state: () => ({
    currentGameMode: {
      name: 'beginner',
      label: 'Новичок',
      fieldSize: 10,
      time: 5 * 60,
      bombsNum: 20,
      points: {
        empty: 1,
        bomb: 5,
      },
    },
  }),
  mutations: {
    [SettingsMutationTypes.CHANGE_GAME_MODE](state, newGmName: string) {
      const newGm = gameModes.find((gm) => gm.name === newGmName);

      // клонируем объект, потому что иначе присвоим ссылку
      const gmCopy = { ...newGm } as GameMode;
      if (newGmName === GAME_MODE_CUSTOM) {
        gmCopy.time = state.currentGameMode.time;
        gmCopy.fieldSize = state.currentGameMode.fieldSize;
        gmCopy.bombsNum = state.currentGameMode.bombsNum;
      }
      state.currentGameMode = gmCopy;
    },
    [SettingsMutationTypes.CHANGE_FIELD_SIZE](state, newFieldSize) {
      state.currentGameMode.fieldSize = newFieldSize;
    },
    [SettingsMutationTypes.CHANGE_BOMBS_NUM](state, newBombsNum: number) {
      state.currentGameMode.bombsNum = newBombsNum;
    },
    [SettingsMutationTypes.CHANGE_TIME](state, newTime: number) {
      state.currentGameMode.time = newTime;
    },
  },
  actions: {
    [SettingsActionTypes.UPDATE_FIELD_SIZE]({ state, getters, commit }, newFieldSize: number) {
      commit(SettingsMutationTypes.CHANGE_FIELD_SIZE, newFieldSize);

      if (state.currentGameMode.bombsNum > getters.maxBombsNum) {
        commit(SettingsMutationTypes.CHANGE_BOMBS_NUM, getters.maxBombsNum);
      }
    },
  },
  getters: {
    maxBombsNum(state) {
      return Math.trunc(state.currentGameMode.fieldSize ** 2 * MAX_FIELD_FILL_COEFF);
    },
    gameModeName(state) {
      return state.currentGameMode.name;
    },
  },
};

export default settingsModule;
