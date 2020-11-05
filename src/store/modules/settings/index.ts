import { Module } from 'vuex';

import gameModes, { MAX_FIELD_FILL_COEFF } from '@/config';
import { RootState } from '@/store/types';
import { GAME_MODE_CUSTOM, GameMode, SettingsState } from '@/store/modules/settings/types';
import SettingsMutationTypes from '@/store/modules/settings/mutation-types';
import SettingsActionTypes from '@/store/modules/settings/action-types';

const settingsModule: Module<SettingsState, RootState> = {
  // namespaced: true,
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
    [SettingsMutationTypes.CHANGE_FIELD_SIZE](state, { newFieldSize, maxBombsNum }) {
      state.currentGameMode.fieldSize = newFieldSize;

      // при уменьшении размера сетки слайдер количества бомб улетает вправо и превышает 50%
      // проверяем максимально допустимое количество и при необходимости обновляем
      const bombsNum = Math.min(state.currentGameMode.bombsNum, maxBombsNum);
      if (bombsNum !== state.currentGameMode.bombsNum) {
        state.currentGameMode.bombsNum = bombsNum;
      }
    },
    [SettingsMutationTypes.CHANGE_BOMBS_NUM](state, newBombsNum: number) {
      state.currentGameMode.bombsNum = newBombsNum;
    },
    [SettingsMutationTypes.CHANGE_TIME](state, newTime: number) {
      state.currentGameMode.time = newTime;
    },
  },
  actions: {
    [SettingsActionTypes.UPDATE_FIELD_SIZE](context, newFieldSize: number) {
      context.commit(SettingsMutationTypes.CHANGE_FIELD_SIZE, {
        newFieldSize,
        // https://github.com/vuejs/vuex/issues/640
        maxBombsNum: context.getters.maxBombsNum,
      });
    },
  },
  getters: {
    // 50% от общего числа ячеек
    maxBombsNum(state) {
      return Math.trunc(state.currentGameMode.fieldSize * state.currentGameMode.fieldSize
        * MAX_FIELD_FILL_COEFF);
    },
  },
};

export default settingsModule;
