import React, { useEffect } from 'react';
import { GameProvider, useGame } from './context/GameContext';
import { CosmicBackground } from './components/CosmicBackground';
import { TopBar } from './components/TopBar';
import { BottomNav } from './components/BottomNav';
import { HomeScreen } from './components/screens/HomeScreen';
import { MapScreen } from './components/screens/MapScreen';
import { MiniGamesScreen } from './components/screens/MiniGamesScreen';
import { DiscoverZodiacScreen } from './components/screens/DiscoverZodiacScreen';
import { CollectionScreen } from './components/screens/CollectionScreen';
import { AchievementsScreen } from './components/screens/AchievementsScreen';
import { ShopScreen } from './components/screens/ShopScreen';
import { AudioSettingsModal } from './components/modals/AudioSettingsModal';
import { sound } from './utils/audio';

const MainGameContent: React.FC = () => {
  const { currentScreen, soundSettings } = useGame();

  // Initialize Web Audio context on first user interaction to comply with browser autoplay policies
  useEffect(() => {
    const unlockAudio = () => {
      sound.playSfx('magic');
      if (soundSettings.music) {
        sound.startBgm();
      }
      window.removeEventListener('pointerdown', unlockAudio);
      window.removeEventListener('keydown', unlockAudio);
    };

    window.addEventListener('pointerdown', unlockAudio, { once: true });
    window.addEventListener('keydown', unlockAudio, { once: true });

    return () => {
      window.removeEventListener('pointerdown', unlockAudio);
      window.removeEventListener('keydown', unlockAudio);
    };
  }, [soundSettings.music]);

  const renderActiveScreen = () => {
    switch (currentScreen) {
      case 'map':
        return <MapScreen />;
      case 'games':
      case 'guess':
      case 'memory':
      case 'cosmic_quiz':
      case 'who_am_i':
        return <MiniGamesScreen />;
      case 'discover':
        return <DiscoverZodiacScreen />;
      case 'collection':
        return <CollectionScreen />;
      case 'achievements':
        return <AchievementsScreen />;
      case 'shop':
        return <ShopScreen />;
      case 'home':
      default:
        return <HomeScreen />;
    }
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between overflow-x-hidden">
      {/* Dynamic Cosmic Fantasy Background */}
      <CosmicBackground />

      {/* Main Top Header Bar */}
      <TopBar />

      {/* Primary Viewport Screen */}
      <main className="relative z-10 flex-1 flex flex-col justify-start">
        {renderActiveScreen()}
      </main>

      {/* Floating Bottom Navigation Bar */}
      <BottomNav />

      {/* Audio Settings & Help Modal */}
      <AudioSettingsModal />
    </div>
  );
};

export default function App() {
  return (
    <GameProvider>
      <MainGameContent />
    </GameProvider>
  );
}
