import React from 'react';
import { ZodiacSign } from '../../types/game';
import { ZodiacAvatar } from '../ZodiacAvatars';
import { useGame } from '../../context/GameContext';
import { X, Sparkles, Volume2, Shield } from 'lucide-react';
import { motion } from 'motion/react';
import { sound } from '../../utils/audio';

interface CharacterDetailModalProps {
  zodiac: ZodiacSign | null;
  onClose: () => void;
}

export const CharacterDetailModal: React.FC<CharacterDetailModalProps> = ({
  zodiac,
  onClose
}) => {
  const { unlockedZodiacs, speakBlooText } = useGame();

  if (!zodiac) return null;

  const isUnlocked = unlockedZodiacs.includes(zodiac.id);

  const handlePlayVoice = () => {
    sound.playSfx('magic');
    speakBlooText(`Halo, aku ${zodiac.name}! ${zodiac.quote}`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-sky-950/60 backdrop-blur-sm select-none">
      <motion.div
        initial={{ scale: 0.88, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.88, opacity: 0 }}
        className="relative w-full max-w-sm bg-white rounded-3xl border-3 border-sky-300 shadow-2xl p-5 max-h-[92vh] overflow-y-auto"
      >
        {/* Header with Close */}
        <div className="flex items-center justify-between pb-2 border-b border-sky-100">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-black text-sky-800 font-bubbly">
              {zodiac.symbol}
            </span>
            <div>
              <h2 className="text-base font-black text-sky-950 font-bubbly leading-none">
                {zodiac.name}
              </h2>
              <span className="text-[10px] font-bold text-sky-600">
                {zodiac.title} · {zodiac.dates}
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-sky-100 text-sky-800 font-bold flex items-center justify-center hover:bg-sky-200 active:scale-95"
          >
            <X size={15} />
          </button>
        </div>

        {/* Character Visual Showcase */}
        <div className="my-3 p-4 rounded-3xl bg-gradient-to-b from-sky-100 via-sky-50 to-white border-2 border-sky-200 flex flex-col items-center text-center">
          <div className="relative">
            <ZodiacAvatar id={zodiac.id} size={100} showCrown={zodiac.id === 'leo'} />
            <div className="absolute -top-1 -right-2 text-amber-400">
              <Sparkles size={20} />
            </div>
          </div>

          <span className="text-xs font-black text-sky-700 bg-sky-100 px-3 py-0.5 rounded-full mt-2">
            Elemen: {zodiac.element}
          </span>

          <p className="text-xs text-sky-900 font-bold italic mt-2">
            "{zodiac.quote}"
          </p>

          {/* Voice button */}
          <button
            onClick={handlePlayVoice}
            className="mt-2.5 px-3.5 py-1.5 rounded-full bg-sky-500 hover:bg-sky-600 text-white font-extrabold text-[11px] flex items-center gap-1.5 shadow active:scale-95 transition-all"
          >
            <Volume2 size={13} />
            <span>Dengarkan Suara Karakter</span>
          </button>
        </div>

        {/* Personality & Lore */}
        <div className="space-y-2 text-xs">
          <div className="p-3 bg-sky-50 rounded-2xl border border-sky-200">
            <h4 className="text-[11px] font-black text-sky-900 mb-1 font-bubbly">
              Kisah Karakter:
            </h4>
            <p className="text-sky-800 leading-relaxed text-[11px]">
              {zodiac.description}
            </p>
          </div>

          {/* Traits */}
          <div className="p-3 bg-white rounded-2xl border border-sky-200">
            <h4 className="text-[11px] font-black text-sky-900 mb-1.5 font-bubbly">
              Ciri Khas & Kepribadian:
            </h4>
            <div className="flex flex-wrap gap-1">
              {zodiac.traits.map(trait => (
                <span
                  key={trait}
                  className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-sky-100 text-sky-800 border border-sky-200"
                >
                  ⭐ {trait}
                </span>
              ))}
            </div>
          </div>

          {/* Lucky attributes */}
          <div className="grid grid-cols-2 gap-2 text-[11px]">
            <div className="p-2 rounded-xl bg-sky-50 border border-sky-200">
              <span className="text-sky-500 font-bold block">Warna Hoki:</span>
              <span className="font-black text-sky-950">{zodiac.luckyColor}</span>
            </div>
            <div className="p-2 rounded-xl bg-sky-50 border border-sky-200">
              <span className="text-sky-500 font-bold block">Batu Bintang:</span>
              <span className="font-black text-sky-950">{zodiac.luckyStone}</span>
            </div>
          </div>
        </div>

        {/* Bottom Close */}
        <button
          onClick={onClose}
          className="mt-4 w-full py-2.5 rounded-full bg-sky-200 hover:bg-sky-300 text-sky-900 font-black text-xs transition-colors"
        >
          Tutup Profil
        </button>
      </motion.div>
    </div>
  );
};
