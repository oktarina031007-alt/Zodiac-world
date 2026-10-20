export type ScreenType = 
  | 'home' 
  | 'map' 
  | 'games' 
  | 'guess' 
  | 'memory' 
  | 'cosmic_quiz' 
  | 'who_am_i' 
  | 'discover' 
  | 'collection' 
  | 'achievements' 
  | 'shop';

export type BlooMood = 
  | 'idle' 
  | 'greeting' 
  | 'happy' 
  | 'funny' 
  | 'dance' 
  | 'sleep' 
  | 'talking' 
  | 'touch';

export interface ZodiacSign {
  id: string;
  name: string;
  symbol: string;
  dates: string;
  startMonth: number;
  startDay: number;
  endMonth: number;
  endDay: number;
  element: 'Api' | 'Tanah' | 'Udara' | 'Air';
  title: string;
  tagline: string;
  description: string;
  traits: string[];
  luckyColor: string;
  luckyStone: string;
  luckyNumber: number;
  quote: string;
  cost: number;
  island: {
    name: string;
    description: string;
    theme: string;
    challengeTitle: string;
    challengeQuestion: string;
    options: string[];
    correctIndex: number;
    rewardStars: number;
  };
}

export interface Accessory {
  id: string;
  name: string;
  cost: number;
  description: string;
  category: 'hat' | 'wand' | 'cape' | 'charm';
  icon: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  rewardStars: number;
  icon: string;
  current: number;
  target: number;
  unlocked: boolean;
  claimed: boolean;
}

export interface SoundSettings {
  music: boolean;
  sfx: boolean;
  voice: boolean;
  volume: number;
}

export interface PlayerStats {
  totalGamesPlayed: number;
  correctAnswers: number;
  starsEarned: number;
  blooTouches: number;
  islandsVisited: string[];
  memoryBestTime: number;
}
