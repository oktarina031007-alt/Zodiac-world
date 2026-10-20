import React from 'react';
import { useGame } from '../context/GameContext';
import { Home, Map, Gamepad2, Award, Sparkles } from 'lucide-react';
import { ScreenType } from '../types/game';
import { sound } from '../utils/audio';

export const BottomNav: React.FC = () => {
  const { currentScreen, setScreen } = useGame();

  const handleNavClick = (screen: ScreenType) => {
    sound.playSfx('click');
    setScreen(screen);
  };

  const navItems = [
    { id: 'home' as ScreenType, label: 'Home', icon: Home },
    { id: 'map' as ScreenType, label: 'Peta', icon: Map },
    { id: 'games' as ScreenType, label: 'Game', icon: Gamepad2 },
    // Collection with cute bear icon handled in sequence
    { id: 'collection' as ScreenType, label: 'Collection', isBear: true },
    { id: 'achievements' as ScreenType, label: 'Achievement', icon: Award },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 max-w-lg mx-auto px-4 pb-2 pt-1 pointer-events-auto select-none">
      {/* Curved glossy bottom cloud bar (Matching Frame 7 in Master Sheet) */}
      <div className="relative bg-white/95 backdrop-blur-md rounded-3xl border-3 border-sky-200 shadow-2xl px-2 py-1.5 flex items-center justify-around">
        {navItems.map((item) => {
          const isActive =
            currentScreen === item.id ||
            (item.id === 'games' && ['games', 'guess', 'memory', 'cosmic_quiz', 'who_am_i'].includes(currentScreen));

          return (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`flex flex-col items-center justify-center min-w-[56px] py-1 rounded-2xl transition-all active:scale-95 ${
                isActive
                  ? 'text-sky-600 font-extrabold'
                  : 'text-sky-700/65 hover:text-sky-900 font-bold'
              }`}
            >
              <div
                className={`w-9 h-9 rounded-2xl flex items-center justify-center transition-all ${
                  isActive
                    ? 'bg-gradient-to-b from-sky-400 to-sky-600 text-white shadow-md shadow-sky-400/40 border border-white'
                    : 'text-sky-600'
                }`}
              >
                {item.isBear ? (
                  <span className="text-base select-none">🐻</span>
                ) : item.icon ? (
                  <item.icon size={19} strokeWidth={isActive ? 2.5 : 2} />
                ) : null}
              </div>
              <span className="text-[10px] tracking-tight mt-0.5 font-bubbly">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
