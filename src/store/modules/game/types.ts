export enum CellValue {
  Bomb = 0,
  Empty = 1,
  Opened = 42,
}

export interface GameState {
  score: number;
}
