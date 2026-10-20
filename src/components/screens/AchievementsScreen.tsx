import React from 'react';
import { useGame } from '../../context/GameContext';
import { ArrowLeft, Trophy, Star, CheckCircle, Award, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { sound } from '../../utils/audio';

export const AchievementsScreen: React.FC = () => {
  const {
    setScreen,
    level,
    exp,
    expNeeded,
    stars,
    stats,
    achievements,
    claimAchievement
  } = useGame();

  const progressPercent = Math.min(100, Math.round((exp / expNeeded) * 100));

  const handleClaim = (id: string) => {
    claimAchievement(id);
  };

  return (
    <div className="relative w-full max-w-lg mx-auto min-h-[calc(100vh-65px)] pb-28 px-4 select-none">
      {/* Top Header */}
      <div className="flex items-center justify-between py-3">
        <button
          onClick={() => setScreen('home')}
          className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/90 border-2 border-sky-300 text-sky-900 font-bold text-xs shadow-md active:scale-95 transition-transform"
        >
          <ArrowLeft size={16} />
          <span>Home</span>
        </button>

        <div className="text-center">
          <h1 className="text-lg md:text-xl font-black text-sky-950 font-bubbly drop-shadow-sm">
            Prestasi & Level Pemain
          </h1>
          <p className="text-[11px] font-bold text-sky-700">
            Klaim Hadiah Bintang dari Pencapaianmu!
          </p>
        </div>

        <div className="w-16" />
      </div>

      {/* Player Level Banner Card */}
      <div className="p-4 rounded-3xl bg-gradient-to-r from-sky-100 via-white to-amber-50 border-3 border-sky-300 shadow-xl flex items-center gap-4 mt-1">
        <div className="relative w-16 h-16 rounded-full bg-gradient-to-tr from-sky-400 to-sky-100 p-1 border-3 border-white shadow-md flex items-center justify-center shrink-0">
          <span className="text-3xl">🧑‍🚀</span>
          <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-amber-400 border-2 border-white flex items-center justify-center text-xs font-black text-amber-950 shadow">
            ★
          </div>
        </div>

        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-black text-sky-950 font-bubbly">
              Pemain Kosmik
            </h2>
            <span className="text-xs font-black text-amber-600 bg-amber-100 px-2.5 py-0.5 rounded-full border border-amber-300">
              Level {level}
            </span>
          </div>

          <div className="mt-2">
            <div className="flex items-center justify-between text-[11px] font-bold text-sky-800 mb-1">
              <span>EXP Kemajuan:</span>
              <span className="font-mono">{exp} / {expNeeded} EXP</span>
            </div>
            <div className="w-full h-2.5 bg-sky-200 rounded-full overflow-hidden p-0.5 border border-sky-300">
              <div
                className="h-full bg-gradient-to-r from-sky-400 to-amber-400 rounded-full transition-all"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Stats Quick Summary */}
      <div className="grid grid-cols-3 gap-2 mt-3 text-center">
        <div className="p-2.5 bg-white rounded-2xl border-2 border-sky-200 shadow-sm">
          <span className="text-base">⭐</span>
          <p className="text-xs font-black text-sky-950 mt-0.5">{stars}</p>
          <span className="text-[9px] font-bold text-sky-600">Bintang Saat Ini</span>
        </div>
        <div className="p-2.5 bg-white rounded-2xl border-2 border-sky-200 shadow-sm">
          <span className="text-base">💙</span>
          <p className="text-xs font-black text-sky-950 mt-0.5">{stats.blooTouches}</p>
          <span className="text-[9px] font-bold text-sky-600">Sapaan ke Bloo</span>
        </div>
        <div className="p-2.5 bg-white rounded-2xl border-2 border-sky-200 shadow-sm">
          <span className="text-base">🗺️</span>
          <p className="text-xs font-black text-sky-950 mt-0.5">{stats.islandsVisited.length}</p>
          <span className="text-[9px] font-bold text-sky-600">Pulau Dikunjungi</span>
        </div>
      </div>

      {/* Achievements List */}
      <h3 className="text-sm font-black text-sky-950 font-bubbly mt-4 mb-2 flex items-center gap-1.5 px-1">
        <Award size={18} className="text-amber-500" />
        <span>Daftar Lencana Bintang:</span>
      </h3>

      <div className="flex flex-col gap-2.5">
        {achievements.map((ach) => {
          const isDone = ach.current >= ach.target;

          return (
            <motion.div
              key={ach.id}
              whileHover={{ scale: 1.01 }}
              className={`p-3.5 rounded-2xl border-2 flex items-center justify-between gap-3 shadow-sm ${
                ach.claimed
                  ? 'bg-sky-50/70 border-sky-200 opacity-70'
                  : isDone
                  ? 'bg-amber-50/80 border-amber-300 shadow-amber-200/40'
                  : 'bg-white border-sky-200'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-sky-100 border-2 border-sky-200 flex items-center justify-center text-xl shrink-0 shadow-inner">
                  {ach.icon}
                </div>
                <div>
                  <h4 className="text-xs md:text-sm font-black text-sky-950 font-bubbly leading-snug">
                    {ach.title}
                  </h4>
                  <p className="text-[10px] text-sky-700 font-semibold leading-relaxed">
                    {ach.description}
                  </p>
                  <div className="flex items-center gap-2 mt-1 text-[10px] font-bold text-sky-600">
                    <span>Kemajuan: {ach.current} / {ach.target}</span>
                  </div>
                </div>
              </div>

              {/* Claim / Status Button */}
              <div className="shrink-0">
                {ach.claimed ? (
                  <span className="text-[10px] font-black text-sky-600 bg-sky-100 px-2.5 py-1 rounded-full flex items-center gap-1">
                    <CheckCircle size={12} className="text-sky-600" /> Diklaim
                  </span>
                ) : isDone ? (
                  <button
                    onClick={() => handleClaim(ach.id)}
                    className="btn-gold-3d px-3 py-1.5 rounded-full text-[10px] font-black text-amber-950 flex items-center gap-1 shadow active:scale-95"
                  >
                    <Sparkles size={11} />
                    <span>Klaim (+{ach.rewardStars}⭐)</span>
                  </button>
                ) : (
                  <span className="text-[10px] font-extrabold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                    +{ach.rewardStars} ⭐
                  </span>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
