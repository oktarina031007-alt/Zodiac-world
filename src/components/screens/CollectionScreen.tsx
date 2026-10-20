import React, { useState } from 'react';
import { useGame } from '../../context/GameContext';
import { ZODIAC_LIST } from '../../data/zodiacs';
import { ZodiacSign } from '../../types/game';
import { ZodiacAvatar } from '../ZodiacAvatars';
import { CharacterDetailModal } from '../modals/CharacterDetailModal';
import { Lock, Sparkles, CheckCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { sound } from '../../utils/audio';

export const CollectionScreen: React.FC = () => {
  const {
    unlockedZodiacs,
    unlockZodiac,
    trackAchievementProgress,
    selectedZodiacDetail,
    setSelectedZodiacDetail
  } = useGame();

  const handleCardClick = (zodiac: ZodiacSign) => {
    sound.playSfx('click');
    setSelectedZodiacDetail(zodiac);
  };

  const handleUnlockClick = (e: React.MouseEvent, zodiac: ZodiacSign) => {
    e.stopPropagation();
    const success = unlockZodiac(zodiac.id);
    if (success) {
      trackAchievementProgress('unlock_characters', 1);
    }
  };

  return (
    <div className="relative w-full max-w-lg mx-auto min-h-[calc(100vh-65px)] pb-28 px-4 select-none">
      {/* Header (Matching Frame 7 in Master Sheet) */}
      <div className="text-center py-2">
        <h1 className="text-xl md:text-2xl font-black text-sky-950 font-bubbly drop-shadow-sm">
          Zodiac Collection
        </h1>
        <p className="text-xs font-bold text-sky-700">
          Kumpulkan semua karakter zodiak!
        </p>
      </div>

      {/* 4 Rows x 3 Columns Grid of 12 Zodiac Characters (Matching Frame 7) */}
      <div className="grid grid-cols-3 gap-2.5 mt-2">
        {ZODIAC_LIST.map((zodiac) => {
          const isUnlocked = unlockedZodiacs.includes(zodiac.id);

          return (
            <motion.div
              key={zodiac.id}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => handleCardClick(zodiac)}
              className={`relative rounded-3xl p-2.5 border-3 cursor-pointer shadow-md transition-all flex flex-col items-center text-center ${
                isUnlocked
                  ? 'bg-gradient-to-b from-white via-sky-50 to-white border-sky-300 shadow-sky-200/50'
                  : 'bg-sky-100/70 border-sky-200 opacity-90'
              }`}
            >
              {/* Avatar Frame Container */}
              <div className="relative w-full h-20 rounded-2xl bg-sky-50/70 flex items-center justify-center overflow-hidden">
                <div className={isUnlocked ? '' : 'filter grayscale contrast-75 opacity-70'}>
                  <ZodiacAvatar id={zodiac.id} size={58} showCrown={zodiac.id === 'leo'} />
                </div>

                {!isUnlocked && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-sky-950/20 backdrop-blur-[0.5px]">
                    <div className="w-7 h-7 rounded-full bg-sky-900/80 text-amber-300 flex items-center justify-center shadow">
                      <Lock size={14} />
                    </div>
                  </div>
                )}
              </div>

              {/* Character Name */}
              <h3 className="text-xs font-black text-sky-950 font-bubbly mt-1.5 truncate w-full">
                {zodiac.name}
              </h3>

              {/* Quick Action / Status */}
              {isUnlocked ? (
                <span className="text-[9px] font-bold text-sky-600 truncate w-full mt-0.5">
                  {zodiac.symbol} {zodiac.title}
                </span>
              ) : (
                <button
                  onClick={(e) => handleUnlockClick(e, zodiac)}
                  className="mt-1 w-full py-1 rounded-full btn-gold-3d text-amber-950 text-[9px] font-black flex items-center justify-center gap-0.5 active:scale-95 shadow"
                >
                  <span>Buka (⭐{zodiac.cost})</span>
                </button>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Character Detail Modal */}
      <CharacterDetailModal
        zodiac={selectedZodiacDetail}
        onClose={() => setSelectedZodiacDetail(null)}
      />
    </div>
  );
};
