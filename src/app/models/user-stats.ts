export interface UserStats {
  streak: number;
  lastCheckInDate: string;
  points: number;
}

export interface LeaderboardEntry extends UserStats {
  id: string;
}
