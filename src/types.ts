export type Tier = 'S+' | 'S' | 'A' | 'B' | 'C' | 'D' | 'E';

export interface Player {
  id: string;
  name: string;
  uuid: string;
  tier: Tier;
  rank: number;
  category: string;
  winRate?: number;
  matches?: number;
  lastActive?: string;
}

export interface Category {
  id: string;
  name: string;
  icon?: string;
}
