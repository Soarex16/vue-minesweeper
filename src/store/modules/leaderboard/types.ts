export interface LeaderboardEntry {
  user: string;
  score: number;
}

export interface LeaderboardState {
  results: LeaderboardEntry[];
}
