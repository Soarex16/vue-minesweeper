export interface GameMode {
  // id режима игры
  name: string;
  // название режима игры
  label: string;
  // доступен для выбора
  disabled?: boolean;
  // размер поля (поле игры квадратное)
  fieldSize: number;
  // время одной игры (в минутах)
  time: number;
  // количество бомб
  bombsNum: number;
  // количество начисляемых очков
  points: {
    // за открытую ячейки
    empty: number;
    // за бомбу
    bomb: number;
  };
}

export const GAME_MODE_CUSTOM = 'custom';

export interface SettingsState {
  currentGameMode: GameMode;
}
