import React from 'react';
import { useGame } from '../context/GameContext';
import { Music, Volume2, Plus, Sparkles } from 'lucide-react';
import { sound } from '../utils/audio';

export const TopBar: React.FC = () => {
  const {
    stars,
    level,
    exp,
    expNeeded,
    soundSettings,
    updateSoundSettings,
    setIsAudioSettingsOpen,
    claimDailyBlessing,
    dailyBlessingClaimed,
    setScreen,
    currentScreen
  } = useGame();

  const handleMusicToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    sound.playSfx('click');
    updateSoundSettings({ music: !soundSettings.music });
  };

  const handleOpenAudioSettings = (e: React.MouseEvent) => {
    e.stopPropagation();
    sound.playSfx('click');
    setIsAudioSettingsOpen(true);
  };

  const handlePlusClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!dailyBlessingClaimed) {
      claimDailyBlessing();
    } else {
      setScreen('shop');
    }
  };

  const progressPercent = Math.min(100, Math.round((exp / expNeeded) * 100));

  return (
    <header className="relative z-30 w-full px-3 pt-2.5 pb-1 flex items-center justify-between gap-1.5 max-w-lg mx-auto select-none">
      {/* Left Pill: Avatar + Star Counter (Matching Master Sheet Frames 1, 2, 3, 7) */}
      <div 
        onClick={handlePlusClick}
        className="flex items-center gap-1.5 pl-1.5 pr-2 py-1 bg-sky-900/60 backdrop-blur-md border-2 border-sky-300/80 rounded-full shadow-md cursor-pointer hover:bg-sky-900/75 transition-all active:scale-95"
      >
        <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-sky-400 to-sky-100 p-0.5 border border-white shadow-inner flex items-center justify-center shrink-0">
          <span className="text-sm">🧑‍🚀</span>
        </div>
        <span className="text-amber-300 text-xs">⭐</span>
        <span className="text-white font-black text-xs md:text-sm tabular-nums tracking-wide">
          {stars}
        </span>
        <div className="w-4 h-4 rounded-full bg-sky-400 text-white font-black text-[10px] flex items-center justify-center shadow-inner ml-0.5">
          {dailyBlessingClaimed ? <Sparkles size={9} /> : <Plus size={10} strokeWidth={3} />}
        </div>
      </div>

      {/* Right Controls: Level Pill & Audio Toggles */}
      <div className="flex items-center gap-1.5 shrink-0">
        {/* Level Pill: Lv. 3 with Star & EXP Progress (Matching Master Sheet) */}
        <div 
          onClick={() => setScreen('achievements')}
          className="flex items-center gap-1.5 px-2.5 py-1 bg-sky-900/60 backdrop-blur-md border-2 border-sky-300/80 rounded-full shadow-md cursor-pointer hover:bg-sky-900/75 transition-all active:scale-95"
        >
          <span className="text-amber-400 text-xs">⭐</span>
          <span className="text-amber-300 font-black text-xs font-bubbly">
            Lv.{level}
          </span>
          <div className="w-14 h-2 bg-sky-950/70 rounded-full overflow-hidden p-0.5 border border-sky-400/40">
            <div
              className="h-full bg-gradient-to-r from-sky-300 to-amber-300 rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Music Button */}
        <button
          onClick={handleMusicToggle}
          title={soundSettings.music ? "Matikan Musik" : "Nyalakan Musik"}
          className={`w-7 h-7 md:w-8 md:h-8 rounded-full border-2 border-white shadow-md flex items-center justify-center transition-all active:scale-90 ${
            soundSettings.music
              ? 'bg-gradient-to-b from-sky-400 to-sky-600 text-white shadow-sky-400/40'
              : 'bg-sky-200/80 text-sky-700 opacity-60'
          }`}
        >
          <Music size={14} strokeWidth={2.5} />
        </button>

        {/* Audio / SFX & Settings Button */}
        <button
          onClick={handleOpenAudioSettings}
          title="Pengaturan Suara"
          className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-gradient-to-b from-sky-400 to-sky-600 text-white border-2 border-white shadow-md shadow-sky-400/40 flex items-center justify-center hover:brightness-105 active:scale-90 transition-all"
        >
          <Volume2 size={14} strokeWidth={2.5} />
        </button>
      </div>
    </header>
  );
};
