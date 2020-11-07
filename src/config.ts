import { GAME_MODE_CUSTOM, GameMode } from '@/store/modules/settings/types';

export const MAX_FIELD_FILL_COEFF = 0.6;

const gameModes: GameMode[] = [
  {
    name: 'beginner',
    label: 'Новичок',
    fieldSize: 10,
    time: 5,
    bombsNum: 20,
    points: {
      empty: 1,
      bomb: 5,
    },
  },
  {
    name: 'advanced',
    label: 'Продвинутый',
    fieldSize: 20,
    time: 4,
    bombsNum: 100,
    points: {
      empty: 3,
      bomb: 8,
    },
  },
  {
    name: 'master',
    label: 'Мастер',
    fieldSize: 30,
    time: 3,
    bombsNum: 500,
    points: {
      empty: 5,
      bomb: 10,
    },
  },
  {
    name: GAME_MODE_CUSTOM,
    disabled: false,
    label: 'Свой режим',
    fieldSize: 0,
    time: 0,
    bombsNum: 0,
    points: {
      empty: 2,
      bomb: 6,
    },
  },
];

export default gameModes;
