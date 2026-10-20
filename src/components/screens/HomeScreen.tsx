import React, { useEffect, useState } from 'react';
import { useGame } from '../../context/GameContext';
import { BlooMascot } from '../BlooMascot';
import { ZodiacAvatar } from '../ZodiacAvatars';
import { ChevronRight, Star, Sparkles, Compass } from 'lucide-react';
import { motion } from 'motion/react';
import { sound } from '../../utils/audio';

export const HomeScreen: React.FC = () => {
  const { setScreen, triggerBlooGreeting, blooMood } = useGame();
  const [hasStartedGreeting, setHasStartedGreeting] = useState(false);

  useEffect(() => {
    // Trigger Bloo welcoming on first mount
    if (!hasStartedGreeting) {
      setHasStartedGreeting(true);
      const timer = setTimeout(() => {
        triggerBlooGreeting();
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [hasStartedGreeting, triggerBlooGreeting]);

  const handleStartAdventure = () => {
    sound.playSfx('click');
    setScreen('games');
  };

  const handleDiscoverZodiac = () => {
    sound.playSfx('click');
    setScreen('discover');
  };

  const handleOpenCollection = () => {
    sound.playSfx('click');
    setScreen('collection');
  };

  const handleOpenMap = () => {
    sound.playSfx('click');
    setScreen('map');
  };

  return (
    <div className="relative w-full max-w-lg mx-auto flex flex-col items-center justify-between min-h-[calc(100vh-65px)] pb-24 px-4 select-none">
      {/* Top 3D Logo & Tagline Header */}
      <motion.div
        initial={{ opacity: 0, y: -25, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="flex flex-col items-center text-center mt-2"
      >
        {/* 3D Bubbly Logo: ZODIAC WORLD */}
        <div className="relative">
          {/* Back shadow / outline layer for 3D effect */}
          <div className="text-3xl md:text-4xl font-black tracking-wider text-sky-900 font-bubbly drop-shadow-[0_5px_0_#0369a1]">
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-sky-100 via-sky-300 to-sky-500 [-webkit-text-stroke:2px_#ffffff]">
              ZODIAC
            </span>
          </div>
          <div className="text-2xl md:text-3xl font-black tracking-widest text-sky-900 font-bubbly -mt-1 drop-shadow-[0_5px_0_#ca8a04]">
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-amber-100 via-amber-300 to-amber-500 [-webkit-text-stroke:2px_#ffffff]">
              W⭐RLD
            </span>
          </div>

          {/* Sparkles on logo */}
          <div className="absolute -top-2 -right-4 text-amber-300 text-sm animate-spin" style={{ animationDuration: '5s' }}>
            ✨
          </div>
          <div className="absolute top-2 -left-3 text-sky-300 text-xs">
            ⭐
          </div>
        </div>

        {/* Curved Tagline Ribbon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="relative mt-1 px-4 py-1 bg-white/95 backdrop-blur-sm rounded-full border-2 border-sky-300 shadow-md flex items-center gap-1.5"
        >
          <span className="text-amber-400 text-xs">⭐</span>
          <span className="text-xs md:text-sm font-bold text-sky-900 tracking-wide font-bubbly">
            Welcome to Your Little Cosmic Universe!
          </span>
          <span className="text-amber-400 text-xs">⭐</span>
        </motion.div>
      </motion.div>

      {/* Center Hero: Bloo surrounded by floating chibi zodiac companions */}
      <div className="relative w-full flex items-center justify-center my-auto py-2">
        {/* Floating Aries Chibi (Top-Left) */}
        <motion.div
          animate={{ y: [0, -8, 0], rotate: [-4, 4, -4] }}
          transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute left-2 top-2 z-10 cursor-pointer hover:scale-110 active:scale-95 transition-transform"
          onClick={() => {
            sound.playSfx('touch');
            setScreen('collection');
          }}
          title="Aries si Domba Pemberani"
        >
          <div className="p-1 rounded-2xl bg-white/80 border-2 border-sky-200 shadow-lg">
            <ZodiacAvatar id="aries" size={62} />
          </div>
        </motion.div>

        {/* Floating Taurus Chibi (Bottom-Left) */}
        <motion.div
          animate={{ y: [0, 8, 0], rotate: [3, -3, 3] }}
          transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          className="absolute left-3 bottom-6 z-10 cursor-pointer hover:scale-110 active:scale-95 transition-transform"
          onClick={() => {
            sound.playSfx('touch');
            setScreen('collection');
          }}
          title="Taurus si Banteng Lucu"
        >
          <div className="p-1 rounded-2xl bg-white/80 border-2 border-sky-200 shadow-lg">
            <ZodiacAvatar id="taurus" size={60} />
          </div>
        </motion.div>

        {/* Floating Pisces/Aquarius Mermaid Chibi (Top-Right) */}
        <motion.div
          animate={{ y: [0, -9, 0], rotate: [4, -4, 4] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute right-2 top-2 z-10 cursor-pointer hover:scale-110 active:scale-95 transition-transform"
          onClick={() => {
            sound.playSfx('touch');
            setScreen('collection');
          }}
          title="Pisces si Ikan Ajaib"
        >
          <div className="p-1 rounded-2xl bg-white/80 border-2 border-sky-200 shadow-lg">
            <ZodiacAvatar id="pisces" size={62} />
          </div>
        </motion.div>

        {/* Floating Leo Chibi (Bottom-Right) */}
        <motion.div
          animate={{ y: [0, 7, 0], rotate: [-3, 3, -3] }}
          transition={{ duration: 4.0, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
          className="absolute right-3 bottom-6 z-10 cursor-pointer hover:scale-110 active:scale-95 transition-transform"
          onClick={() => {
            sound.playSfx('touch');
            setScreen('collection');
          }}
          title="Leo si Raja Singa Cilik"
        >
          <div className="p-1 rounded-2xl bg-white/80 border-2 border-sky-200 shadow-lg">
            <ZodiacAvatar id="leo" size={62} showCrown={true} />
          </div>
        </motion.div>

        {/* Master Mascot BLOO */}
        <div className="relative z-20">
          <BlooMascot mood={blooMood} size={220} showDialogue={true} interactive={true} />
        </div>
      </div>

      {/* 3 Large 3D Pill Navigation Action Buttons */}
      <div className="w-full flex flex-col gap-3 px-3 z-30">
        {/* 1. PLAY ADVENTURE (Golden 3D Button) */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleStartAdventure}
          className="btn-gold-3d w-full h-14 md:h-16 rounded-full flex items-center justify-between px-6 text-amber-950 font-black text-base md:text-lg tracking-wide shadow-xl cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-amber-200/80 border-2 border-white flex items-center justify-center text-amber-600 shadow-inner">
              <Star size={20} className="fill-amber-400 stroke-amber-600" />
            </div>
            <span className="font-bubbly drop-shadow-sm text-sky-950">
              PLAY ADVENTURE
            </span>
          </div>
          <div className="w-7 h-7 rounded-full bg-amber-400/60 border border-white flex items-center justify-center text-amber-950">
            <ChevronRight size={18} strokeWidth={3} />
          </div>
        </motion.button>

        {/* 2. DISCOVER MY ZODIAC (Sky Blue 3D Button) */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleDiscoverZodiac}
          className="btn-sky-3d w-full h-14 md:h-16 rounded-full flex items-center justify-between px-6 text-white font-black text-base md:text-lg tracking-wide shadow-xl cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-white/80 border-2 border-sky-200 flex items-center justify-center text-sky-600 shadow-inner">
              <Sparkles size={20} className="fill-sky-400 stroke-sky-600" />
            </div>
            <span className="font-bubbly drop-shadow-sm">
              DISCOVER MY ZODIAC
            </span>
          </div>
          <div className="w-7 h-7 rounded-full bg-sky-600/60 border border-white flex items-center justify-center text-white">
            <ChevronRight size={18} strokeWidth={3} />
          </div>
        </motion.button>

        {/* 3. ZODIAC COLLECTION (Ocean Blue 3D Button) */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleOpenCollection}
          className="btn-ocean-3d w-full h-14 md:h-16 rounded-full flex items-center justify-between px-6 text-white font-black text-base md:text-lg tracking-wide shadow-xl cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-white/80 border-2 border-sky-200 flex items-center justify-center text-sky-700 shadow-inner">
              <span className="text-xl">🐻</span>
            </div>
            <span className="font-bubbly drop-shadow-sm">
              ZODIAC COLLECTION
            </span>
          </div>
          <div className="w-7 h-7 rounded-full bg-sky-800/60 border border-white flex items-center justify-center text-white">
            <ChevronRight size={18} strokeWidth={3} />
          </div>
        </motion.button>

        {/* Explore Map shortcut button */}
        <button
          onClick={handleOpenMap}
          className="mx-auto mt-1 flex items-center gap-1.5 text-xs font-extrabold text-sky-800 bg-white/60 hover:bg-white/90 px-3 py-1 rounded-full border border-sky-200 transition-colors shadow-sm"
        >
          <Compass size={14} />
          <span>Jelajahi 12 Pulau Zodiak di Peta Kosmik</span>
        </button>
      </div>
    </div>
  );
};
