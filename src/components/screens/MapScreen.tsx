import React, { useState } from 'react';
import { useGame } from '../../context/GameContext';
import { ZODIAC_LIST, BLOO_CORRECT_SPEECH, BLOO_WRONG_SPEECH } from '../../data/zodiacs';
import { ZodiacSign } from '../../types/game';
import { ZodiacAvatar } from '../ZodiacAvatars';
import { BlooMascot } from '../BlooMascot';
import { ArrowLeft, Lock, Star, Sparkles, CheckCircle2, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { sound } from '../../utils/audio';

export const MapScreen: React.FC = () => {
  const {
    setScreen,
    unlockedZodiacs,
    unlockZodiac,
    addStars,
    addExp,
    trackAchievementProgress,
    stats,
    setBlooMood,
    speakBlooText
  } = useGame();

  const [selectedIsland, setSelectedIsland] = useState<ZodiacSign | null>(null);
  const [challengeAnswered, setChallengeAnswered] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [wrongOptions, setWrongOptions] = useState<number[]>([]);
  const [challengeResult, setChallengeResult] = useState<'correct' | 'wrong' | null>(null);

  const handleOpenIsland = (zodiac: ZodiacSign) => {
    sound.playSfx('click');
    setSelectedIsland(zodiac);
    setChallengeAnswered(false);
    setSelectedOption(null);
    setWrongOptions([]);
    setChallengeResult(null);

    if (!stats.islandsVisited.includes(zodiac.id)) {
      stats.islandsVisited.push(zodiac.id);
      trackAchievementProgress('island_explorer', 1);
    }
  };

  const handleAnswerChallenge = (index: number) => {
    if (!selectedIsland || challengeAnswered || wrongOptions.includes(index)) return;

    const isCorrect = index === selectedIsland.island.correctIndex;
    if (isCorrect) {
      setSelectedOption(index);
      setChallengeAnswered(true);
      setChallengeResult('correct');
      sound.playSfx('correct');
      addStars(selectedIsland.island.rewardStars);
      addExp(35);
      setBlooMood('happy');
      speakBlooText(BLOO_CORRECT_SPEECH);
    } else {
      setWrongOptions(prev => [...prev, index]);
      setChallengeResult('wrong');
      sound.playSfx('wrong');
      setBlooMood('funny');
      speakBlooText(BLOO_WRONG_SPEECH);
      setTimeout(() => {
        setChallengeResult(null);
      }, 2500);
    }
  };

  const handleUnlockIsland = (zodiac: ZodiacSign) => {
    const success = unlockZodiac(zodiac.id);
    if (success) {
      sound.playSfx('unlock');
    }
  };

  return (
    <div className="relative w-full max-w-lg mx-auto min-h-[calc(100vh-65px)] pb-28 px-4 select-none">
      {/* Title Header (Matching Frame 2 in Master Sheet) */}
      <div className="text-center py-2 flex items-center justify-between">
        <div className="w-8" />
        <div>
          <h1 className="text-xl md:text-2xl font-black text-sky-950 font-bubbly drop-shadow-sm">
            Peta Dunia Zodiak
          </h1>
          <p className="text-xs font-bold text-sky-700">
            Jelajahi 12 pulau zodiak!
          </p>
        </div>
        <button
          onClick={() => {
            sound.playSfx('click');
            speakBlooText("Setiap pulau zodiak dijaga oleh karakter imut! Buka pulau dan selesaikan tantangannya untuk meraih bintang! ⭐");
          }}
          className="w-8 h-8 rounded-full bg-white/90 border-2 border-sky-300 text-sky-700 flex items-center justify-center shadow-sm"
        >
          <HelpCircle size={16} />
        </button>
      </div>

      {/* Floating Islands Grid (3 columns matching Frame 2) */}
      <div className="grid grid-cols-3 gap-2.5 mt-2">
        {ZODIAC_LIST.map((zodiac, index) => {
          const isUnlocked = unlockedZodiacs.includes(zodiac.id);
          const isVisited = stats.islandsVisited.includes(zodiac.id);

          return (
            <motion.div
              key={zodiac.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.03 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => handleOpenIsland(zodiac)}
              className={`relative rounded-3xl p-2.5 border-3 cursor-pointer shadow-lg transition-all flex flex-col items-center text-center ${
                isUnlocked
                  ? 'bg-gradient-to-b from-white via-sky-50 to-sky-100 border-sky-300 shadow-sky-300/30'
                  : 'bg-sky-200/60 border-sky-300/60 opacity-90'
              }`}
            >
              {/* Island illustration / Avatar container */}
              <div className="relative w-full h-20 rounded-2xl bg-gradient-to-b from-sky-200/50 to-sky-300/30 border border-sky-200/60 flex items-center justify-center overflow-hidden">
                {/* Floating Clouds beneath island */}
                <div className="absolute -bottom-2 w-full text-white/70 text-center text-lg pointer-events-none">
                  ☁️☁️
                </div>

                <ZodiacAvatar id={zodiac.id} size={54} showCrown={zodiac.id === 'leo'} />

                {!isUnlocked && (
                  <div className="absolute inset-0 bg-sky-950/45 backdrop-blur-[1px] rounded-2xl flex flex-col items-center justify-center text-white">
                    <Lock size={16} className="text-amber-300 mb-0.5" />
                    <span className="text-[9px] font-black text-amber-200 flex items-center gap-0.5">
                      ⭐ {zodiac.cost}
                    </span>
                  </div>
                )}

                {isVisited && isUnlocked && (
                  <div className="absolute top-1 right-1 bg-emerald-500 text-white rounded-full p-0.5 shadow">
                    <CheckCircle2 size={11} />
                  </div>
                )}
              </div>

              {/* Island Name */}
              <p className="text-xs font-black text-sky-950 truncate w-full font-bubbly mt-1.5">
                {zodiac.name}
              </p>
              <span className="text-[9px] font-bold text-sky-600 truncate w-full">
                {zodiac.symbol} {zodiac.element}
              </span>
            </motion.div>
          );
        })}
      </div>

      {/* Bottom Back Button: < Kembali (Matching Frame 2) */}
      <div className="mt-4 flex justify-start">
        <button
          onClick={() => setScreen('home')}
          className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-gradient-to-r from-sky-400 to-sky-600 text-white font-extrabold text-xs shadow-md border-2 border-white active:scale-95 transition-transform"
        >
          <ArrowLeft size={16} />
          <span>Kembali</span>
        </button>
      </div>

      {/* Island Detail & Challenge Modal */}
      <AnimatePresence>
        {selectedIsland && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-sky-950/60 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              className="relative w-full max-w-sm bg-white rounded-3xl border-3 border-sky-300 shadow-2xl p-5 overflow-hidden max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between pb-3 border-b border-sky-100">
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-black text-sky-800 font-bubbly">
                    {selectedIsland.symbol}
                  </span>
                  <div>
                    <h2 className="text-base font-black text-sky-950 font-bubbly leading-tight">
                      {selectedIsland.island.name}
                    </h2>
                    <p className="text-[11px] font-bold text-sky-600">
                      Penjaga: {selectedIsland.title}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedIsland(null)}
                  className="w-7 h-7 rounded-full bg-sky-100 text-sky-800 font-bold flex items-center justify-center hover:bg-sky-200 active:scale-95"
                >
                  ✕
                </button>
              </div>

              {/* Island Center Showcase */}
              <div className="my-3 p-3.5 rounded-2xl bg-gradient-to-b from-sky-100 via-sky-50 to-white border-2 border-sky-200 flex flex-col items-center text-center">
                <div className="relative">
                  <ZodiacAvatar id={selectedIsland.id} size={80} showCrown={selectedIsland.id === 'leo'} />
                  <div className="absolute -top-1 -right-2 text-amber-400">
                    <Sparkles size={16} />
                  </div>
                </div>
                <p className="text-xs font-bold text-sky-900 mt-2 italic">
                  "{selectedIsland.quote}"
                </p>
                <p className="text-[11px] text-sky-700 mt-1 leading-relaxed">
                  {selectedIsland.island.description}
                </p>
              </div>

              {/* Locked vs Unlocked */}
              {!unlockedZodiacs.includes(selectedIsland.id) ? (
                <div className="p-4 rounded-2xl bg-sky-50 border-2 border-sky-200 text-center">
                  <p className="text-xs font-bold text-sky-900 mb-2">
                    Pulau ini masih berkabut! Buka pulau dan karakternya dengan bintang emas:
                  </p>
                  <button
                    onClick={() => handleUnlockIsland(selectedIsland)}
                    className="btn-gold-3d px-6 py-2.5 rounded-full font-black text-amber-950 text-xs flex items-center justify-center gap-1.5 mx-auto active:scale-95"
                  >
                    <Star size={16} className="fill-amber-400" />
                    <span>Buka Pulau (⭐ {selectedIsland.cost})</span>
                  </button>
                </div>
              ) : (
                /* Interactive Island Challenge with Correct / Wrong Feedback */
                <div className="p-3.5 rounded-2xl bg-sky-50/80 border-2 border-sky-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-black text-sky-950 font-bubbly flex items-center gap-1">
                      ⭐ {selectedIsland.island.challengeTitle}
                    </span>
                    <span className="text-[10px] font-extrabold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">
                      Hadiah: +{selectedIsland.island.rewardStars} ⭐
                    </span>
                  </div>

                  <p className="text-xs font-bold text-sky-900 mb-3">
                    {selectedIsland.island.challengeQuestion}
                  </p>

                  <div className="flex flex-col gap-2">
                    {selectedIsland.island.options.map((opt, idx) => {
                      const isCorrect = idx === selectedIsland.island.correctIndex;
                      const isWrong = wrongOptions.includes(idx);
                      const isSelected = selectedOption === idx;

                      let btnStyle = "bg-white text-sky-950 border-sky-200 hover:bg-sky-100";
                      if (challengeAnswered && isCorrect) {
                        btnStyle = "bg-emerald-100 text-emerald-950 border-emerald-500 font-black";
                      } else if (isWrong) {
                        btnStyle = "bg-rose-100 text-rose-950 border-rose-300 opacity-60";
                      }

                      return (
                        <button
                          key={idx}
                          disabled={challengeAnswered || isWrong}
                          onClick={() => handleAnswerChallenge(idx)}
                          className={`w-full py-2.5 px-3 rounded-xl border-2 text-xs font-bold text-left transition-all active:scale-98 flex items-center justify-between ${btnStyle}`}
                        >
                          <span>
                            <span className="text-sky-600 font-extrabold mr-1.5 font-bubbly">
                              {String.fromCharCode(65 + idx)}.
                            </span>
                            {opt}
                          </span>
                          {challengeAnswered && isCorrect && <CheckCircle2 size={16} className="text-emerald-600" />}
                        </button>
                      );
                    })}
                  </div>

                  {/* Feedback Banner */}
                  {challengeResult && (
                    <div className="mt-3 text-center">
                      {challengeResult === 'correct' ? (
                        <div className="p-2 bg-emerald-100 border border-emerald-400 rounded-xl text-xs font-black text-emerald-900 font-bubbly animate-bounce">
                          ✨ YEAY! JAWABAN BENAR! (+{selectedIsland.island.rewardStars} ⭐) ✨
                        </div>
                      ) : (
                        <div className="p-2 bg-sky-100 border border-sky-300 rounded-xl text-xs font-black text-sky-900 font-bubbly">
                          🫧 UPS! COBA LAGI! Coba pilihan lainnya! 💙
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              <button
                onClick={() => setSelectedIsland(null)}
                className="mt-4 w-full py-2.5 rounded-full bg-sky-200 hover:bg-sky-300 text-sky-900 font-extrabold text-xs transition-colors"
              >
                Kembali ke Peta
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
