export enum CellState {
  Closed = 0,
  Opened = 1,
  Marked = 2
}

export enum CellValue {
  Bomb = -1,
  Empty = 0,
}

export interface Cell {
  value: CellValue;
  state: CellState;
  bombsNear?: number;
}

export interface GameState {
  score: number;
}
