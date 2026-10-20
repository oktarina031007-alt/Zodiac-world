import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { ScreenType, BlooMood, ZodiacSign, SoundSettings, PlayerStats, Achievement } from '../types/game';
import { ZODIAC_LIST, ACCESSORIES, ACHIEVEMENTS, BLOO_TOUCH_DIALOGUES, BLOO_GREETING_LINES } from '../data/zodiacs';
import { sound } from '../utils/audio';
import confetti from 'canvas-confetti';

interface GameContextType {
  stars: number;
  level: number;
  exp: number;
  expNeeded: number;
  unlockedZodiacs: string[];
  equippedAccessories: Record<string, string>;
  unlockedAccessories: string[];
  soundSettings: SoundSettings;
  stats: PlayerStats;
  achievements: Achievement[];
  currentScreen: ScreenType;
  blooMood: BlooMood;
  blooDialogue: string;
  isBlooSpeaking: boolean;
  isAudioSettingsOpen: boolean;
  selectedZodiacDetail: ZodiacSign | null;
  dailyBlessingClaimed: boolean;
  
  // Actions
  setScreen: (screen: ScreenType) => void;
  addStars: (amount: number) => void;
  spendStars: (amount: number) => boolean;
  addExp: (amount: number) => void;
  unlockZodiac: (id: string) => boolean;
  buyAccessory: (id: string) => boolean;
  equipAccessory: (id: string) => void;
  trackAchievementProgress: (id: string, amount: number) => void;
  claimAchievement: (id: string) => void;
  claimDailyBlessing: () => boolean;
  setBlooMood: (mood: BlooMood) => void;
  setBlooDialogue: (text: string) => void;
  triggerBlooTouch: () => void;
  triggerBlooGreeting: () => void;
  speakBlooText: (text: string) => void;
  setIsAudioSettingsOpen: (open: boolean) => void;
  setSelectedZodiacDetail: (zodiac: ZodiacSign | null) => void;
  updateSoundSettings: (newSettings: Partial<SoundSettings>) => void;
  resetGame: () => void;
  fireConfetti: () => void;
}

const STORAGE_KEY = 'zodiac_world_save_v2';

const initialSoundSettings: SoundSettings = {
  music: true,
  sfx: true,
  voice: true,
  volume: 0.8
};

const initialStats: PlayerStats = {
  totalGamesPlayed: 0,
  correctAnswers: 0,
  starsEarned: 100,
  blooTouches: 0,
  islandsVisited: [],
  memoryBestTime: 0
};

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load saved state or default
  const [stars, setStars] = useState<number>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_stars`);
      return saved ? JSON.parse(saved) : 100; // starts with 100 as shown in image
    } catch {
      return 100;
    }
  });

  const [level, setLevel] = useState<number>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_level`);
      return saved ? JSON.parse(saved) : 1;
    } catch {
      return 1;
    }
  });

  const [exp, setExp] = useState<number>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_exp`);
      return saved ? JSON.parse(saved) : 25; // level 1 with 25 exp
    } catch {
      return 25;
    }
  });

  const [unlockedZodiacs, setUnlockedZodiacs] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_unlockedZodiacs`);
      return saved ? JSON.parse(saved) : ['aries', 'taurus'];
    } catch {
      return ['aries', 'taurus'];
    }
  });

  const [equippedAccessories, setEquippedAccessories] = useState<Record<string, string>>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_equippedAcc`);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [unlockedAccessories, setUnlockedAccessories] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_unlockedAcc`);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [soundSettings, setSoundSettings] = useState<SoundSettings>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_sound`);
      return saved ? JSON.parse(saved) : initialSoundSettings;
    } catch {
      return initialSoundSettings;
    }
  });

  const [stats, setStats] = useState<PlayerStats>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_stats`);
      return saved ? JSON.parse(saved) : initialStats;
    } catch {
      return initialStats;
    }
  });

  const [achievements, setAchievements] = useState<Achievement[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_achievements`);
      return saved ? JSON.parse(saved) : ACHIEVEMENTS;
    } catch {
      return ACHIEVEMENTS;
    }
  });

  const [dailyBlessingDate, setDailyBlessingDate] = useState<string>(() => {
    try {
      return localStorage.getItem(`${STORAGE_KEY}_dailyBlessing`) || '';
    } catch {
      return '';
    }
  });

  // UI state
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('home');
  const [blooMood, setBlooMood] = useState<BlooMood>('greeting');
  const [blooDialogue, setBlooDialogue] = useState<string>(BLOO_GREETING_LINES[0]);
  const [isBlooSpeaking, setIsBlooSpeaking] = useState<boolean>(false);
  const [isAudioSettingsOpen, setIsAudioSettingsOpen] = useState<boolean>(false);
  const [selectedZodiacDetail, setSelectedZodiacDetail] = useState<ZodiacSign | null>(null);

  const expNeeded = level * 100;

  // Persist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_stars`, JSON.stringify(stars));
      localStorage.setItem(`${STORAGE_KEY}_level`, JSON.stringify(level));
      localStorage.setItem(`${STORAGE_KEY}_exp`, JSON.stringify(exp));
      localStorage.setItem(`${STORAGE_KEY}_unlockedZodiacs`, JSON.stringify(unlockedZodiacs));
      localStorage.setItem(`${STORAGE_KEY}_equippedAcc`, JSON.stringify(equippedAccessories));
      localStorage.setItem(`${STORAGE_KEY}_unlockedAcc`, JSON.stringify(unlockedAccessories));
      localStorage.setItem(`${STORAGE_KEY}_sound`, JSON.stringify(soundSettings));
      localStorage.setItem(`${STORAGE_KEY}_stats`, JSON.stringify(stats));
      localStorage.setItem(`${STORAGE_KEY}_achievements`, JSON.stringify(achievements));
      localStorage.setItem(`${STORAGE_KEY}_dailyBlessing`, dailyBlessingDate);
    } catch {
      // storage unavailable
    }
  }, [stars, level, exp, unlockedZodiacs, equippedAccessories, unlockedAccessories, soundSettings, stats, achievements, dailyBlessingDate]);

  // Sync sound settings with audio engine
  useEffect(() => {
    sound.setMusicEnabled(soundSettings.music);
    sound.setSfxEnabled(soundSettings.sfx);
    sound.setVoiceEnabled(soundSettings.voice);
    sound.setMasterVolume(soundSettings.volume);
  }, [soundSettings]);

  const fireConfetti = useCallback(() => {
    try {
      confetti({
        particleCount: 45,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#38bdf8', '#0284c7', '#facc15', '#fef08a', '#ffffff'] // Sky blue, ocean blue, gold yellow, white
      });
    } catch {
      // ignore
    }
  }, []);

  const addStars = useCallback((amount: number) => {
    setStars(prev => {
      const next = prev + amount;
      sound.playSfx('star');
      return next;
    });
    setStats(prev => ({
      ...prev,
      starsEarned: prev.starsEarned + amount
    }));
  }, []);

  const spendStars = useCallback((amount: number): boolean => {
    if (stars < amount) {
      sound.playSfx('wrong');
      return false;
    }
    setStars(prev => prev - amount);
    sound.playSfx('click');
    return true;
  }, [stars]);

  const addExp = useCallback((amount: number) => {
    setExp(prevExp => {
      let currentExp = prevExp + amount;
      let currentLvl = level;
      let needed = currentLvl * 100;

      while (currentExp >= needed) {
        currentExp -= needed;
        currentLvl += 1;
        needed = currentLvl * 100;
        sound.playSfx('levelUp');
        fireConfetti();
      }

      if (currentLvl !== level) {
        setLevel(currentLvl);
      }
      return currentExp;
    });
  }, [level, fireConfetti]);

  const unlockZodiac = useCallback((id: string): boolean => {
    const zodiac = ZODIAC_LIST.find(z => z.id === id);
    if (!zodiac) return false;
    if (unlockedZodiacs.includes(id)) return true;

    if (spendStars(zodiac.cost)) {
      setUnlockedZodiacs(prev => [...prev, id]);
      sound.playSfx('unlock');
      fireConfetti();
      setBlooMood('dance');
      setBlooDialogue(`Waaah! Kita punya teman baru: ${zodiac.name}! Selamat, kamu berhasil membuka karakter baru! 💙⭐`);
      return true;
    }
    return false;
  }, [unlockedZodiacs, spendStars, fireConfetti]);

  const buyAccessory = useCallback((id: string): boolean => {
    const item = ACCESSORIES.find(a => a.id === id);
    if (!item) return false;
    if (unlockedAccessories.includes(id)) return true;

    if (spendStars(item.cost)) {
      setUnlockedAccessories(prev => [...prev, id]);
      sound.playSfx('unlock');
      fireConfetti();
      return true;
    }
    return false;
  }, [unlockedAccessories, spendStars, fireConfetti]);

  const equipAccessory = useCallback((id: string) => {
    const item = ACCESSORIES.find(a => a.id === id);
    if (!item) return;
    setEquippedAccessories(prev => {
      const current = prev[item.category];
      if (current === id) {
        // unequip
        const next = { ...prev };
        delete next[item.category];
        return next;
      }
      return { ...prev, [item.category]: id };
    });
    sound.playSfx('click');
  }, []);

  const trackAchievementProgress = useCallback((id: string, amount: number) => {
    setAchievements(prev => prev.map(ach => {
      if (ach.id === id) {
        const nextCur = Math.min(ach.target, ach.current + amount);
        const unlocked = nextCur >= ach.target;
        return {
          ...ach,
          current: nextCur,
          unlocked: ach.unlocked || unlocked
        };
      }
      return ach;
    }));
  }, []);

  const claimAchievement = useCallback((id: string) => {
    setAchievements(prev => prev.map(ach => {
      if (ach.id === id && ach.unlocked && !ach.claimed) {
        addStars(ach.rewardStars);
        sound.playSfx('levelUp');
        fireConfetti();
        return { ...ach, claimed: true };
      }
      return ach;
    }));
  }, [addStars, fireConfetti]);

  const claimDailyBlessing = useCallback((): boolean => {
    const today = new Date().toDateString();
    if (dailyBlessingDate === today) {
      sound.playSfx('wrong');
      return false;
    }
    setDailyBlessingDate(today);
    addStars(20);
    addExp(30);
    sound.playSfx('magic');
    fireConfetti();
    setBlooMood('happy');
    setBlooDialogue("Yeay! Berkah Kosmik Hari Ini berhasil diklaim: +20 Bintang Emas! ⭐");
    return true;
  }, [dailyBlessingDate, addStars, addExp, fireConfetti]);

  const speakBlooText = useCallback((text: string) => {
    setBlooDialogue(text);
    setIsBlooSpeaking(true);
    setBlooMood('talking');

    sound.speakBloo(
      text,
      () => {
        setIsBlooSpeaking(true);
        setBlooMood('talking');
      },
      () => {
        setIsBlooSpeaking(false);
        setBlooMood('idle');
      }
    );
  }, []);

  // Bloo touch interaction debounce
  const [lastTouchTime, setLastTouchTime] = useState<number>(0);
  const triggerBlooTouch = useCallback(() => {
    const now = Date.now();
    if (now - lastTouchTime < 900) return; // prevent spamming
    setLastTouchTime(now);

    const randomDialog = BLOO_TOUCH_DIALOGUES[Math.floor(Math.random() * BLOO_TOUCH_DIALOGUES.length)];
    sound.playSfx('blooGiggle');
    setBlooMood('touch');
    setBlooDialogue(randomDialog);

    // Track touch stat & achievement
    setStats(prev => ({ ...prev, blooTouches: prev.blooTouches + 1 }));
    trackAchievementProgress('bloo_pet', 1);

    speakBlooText(randomDialog);

    setTimeout(() => {
      setBlooMood('idle');
    }, 2800);
  }, [lastTouchTime, speakBlooText, trackAchievementProgress]);

  // Greeting sequence
  const triggerBlooGreeting = useCallback(() => {
    let index = 0;
    setBlooMood('greeting');
    sound.playSfx('magic');

    const speakNext = () => {
      if (index >= BLOO_GREETING_LINES.length) {
        setIsBlooSpeaking(false);
        setBlooMood('idle');
        return;
      }
      const line = BLOO_GREETING_LINES[index];
      index++;
      setBlooDialogue(line);
      setIsBlooSpeaking(true);
      setBlooMood('talking');

      sound.speakBloo(
        line,
        () => {
          setIsBlooSpeaking(true);
          setBlooMood('talking');
        },
        () => {
          // brief pause between lines
          setTimeout(() => {
            speakNext();
          }, 450);
        }
      );
    };

    speakNext();
  }, []);

  const updateSoundSettings = useCallback((newSettings: Partial<SoundSettings>) => {
    setSoundSettings(prev => ({ ...prev, ...newSettings }));
  }, []);

  const resetGame = useCallback(() => {
    setStars(100);
    setLevel(1);
    setExp(25);
    setUnlockedZodiacs(['aries', 'taurus']);
    setEquippedAccessories({});
    setUnlockedAccessories([]);
    setSoundSettings(initialSoundSettings);
    setStats(initialStats);
    setAchievements(ACHIEVEMENTS);
    setDailyBlessingDate('');
    setCurrentScreen('home');
    setBlooMood('idle');
    sound.playSfx('click');
  }, []);

  const setScreen = useCallback((screen: ScreenType) => {
    sound.playSfx('click');
    sound.stopSpeaking();
    setIsBlooSpeaking(false);
    setCurrentScreen(screen);

    if (screen === 'home') {
      setBlooMood('idle');
    }
  }, []);

  const dailyBlessingClaimed = dailyBlessingDate === new Date().toDateString();

  return (
    <GameContext.Provider
      value={{
        stars,
        level,
        exp,
        expNeeded,
        unlockedZodiacs,
        equippedAccessories,
        unlockedAccessories,
        soundSettings,
        stats,
        achievements,
        currentScreen,
        blooMood,
        blooDialogue,
        isBlooSpeaking,
        isAudioSettingsOpen,
        selectedZodiacDetail,
        dailyBlessingClaimed,
        setScreen,
        addStars,
        spendStars,
        addExp,
        unlockZodiac,
        buyAccessory,
        equipAccessory,
        trackAchievementProgress,
        claimAchievement,
        claimDailyBlessing,
        setBlooMood,
        setBlooDialogue,
        triggerBlooTouch,
        triggerBlooGreeting,
        speakBlooText,
        setIsAudioSettingsOpen,
        setSelectedZodiacDetail,
        updateSoundSettings,
        resetGame,
        fireConfetti
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};
