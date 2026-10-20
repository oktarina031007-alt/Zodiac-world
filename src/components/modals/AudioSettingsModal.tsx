import React, { useState } from 'react';
import { useGame } from '../../context/GameContext';
import { ArrowLeft, Music, Volume2, Smile, RotateCcw } from 'lucide-react';
import { motion } from 'motion/react';
import { sound } from '../../utils/audio';
import { BlooMascot } from '../BlooMascot';

export const AudioSettingsModal: React.FC = () => {
  const {
    isAudioSettingsOpen,
    setIsAudioSettingsOpen,
    soundSettings,
    updateSoundSettings,
    blooDialogue,
    speakBlooText,
    resetGame
  } = useGame();

  const [confirmReset, setConfirmReset] = useState(false);

  if (!isAudioSettingsOpen) return null;

  const handleClose = () => {
    sound.playSfx('click');
    setIsAudioSettingsOpen(false);
    setConfirmReset(false);
  };

  const handleRepeatVoice = () => {
    sound.playSfx('click');
    speakBlooText(blooDialogue);
  };

  const handleDoReset = () => {
    resetGame();
    setConfirmReset(false);
    setIsAudioSettingsOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-sky-950/60 backdrop-blur-sm select-none">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="relative w-full max-w-sm bg-white/95 rounded-3xl border-3 border-sky-300 shadow-2xl p-5 overflow-hidden max-h-[92vh] overflow-y-auto"
      >
        {/* Header with < Back Arrow and "Pengaturan" (Matching Frame 8) */}
        <div className="flex items-center justify-between pb-3">
          <button
            onClick={handleClose}
            className="w-8 h-8 rounded-full bg-sky-500 border-2 border-white text-white flex items-center justify-center shadow active:scale-90"
          >
            <ArrowLeft size={18} />
          </button>

          <h2 className="text-xl font-black text-sky-950 font-bubbly drop-shadow-sm">
            Pengaturan
          </h2>

          <div className="w-8" />
        </div>

        {/* 3 Main Settings Rows (Matching Frame 8 in Master Sheet) */}
        <div className="space-y-4 mt-3">
          {/* Row 1: Musik */}
          <div className="p-3 bg-sky-50/80 rounded-2xl border-2 border-sky-200 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-sky-500 text-white flex items-center justify-center shadow">
                  <Music size={18} />
                </div>
                <span className="text-xs font-black text-sky-950 font-bubbly">
                  Musik
                </span>
              </div>

              {/* ON/OFF Pill Toggle (Matching Frame 8) */}
              <button
                onClick={() => updateSoundSettings({ music: !soundSettings.music })}
                className={`px-3 py-1 rounded-full text-xs font-black border-2 transition-all active:scale-95 shadow-sm flex items-center gap-1 ${
                  soundSettings.music
                    ? 'bg-sky-500 text-white border-white'
                    : 'bg-slate-200 text-slate-600 border-slate-300'
                }`}
              >
                <span>{soundSettings.music ? 'ON' : 'OFF'}</span>
                <span>{soundSettings.music ? '▷' : '◁'}</span>
              </button>
            </div>

            {/* Slider */}
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={soundSettings.music ? soundSettings.volume : 0}
              onChange={(e) => updateSoundSettings({ volume: parseFloat(e.target.value) })}
              className="w-full accent-sky-500 cursor-pointer h-2 bg-sky-200 rounded-full"
            />
          </div>

          {/* Row 2: Efek Suara */}
          <div className="p-3 bg-sky-50/80 rounded-2xl border-2 border-sky-200 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-sky-500 text-white flex items-center justify-center shadow">
                  <Volume2 size={18} />
                </div>
                <span className="text-xs font-black text-sky-950 font-bubbly">
                  Efek Suara
                </span>
              </div>

              {/* ON/OFF Pill Toggle */}
              <button
                onClick={() => updateSoundSettings({ sfx: !soundSettings.sfx })}
                className={`px-3 py-1 rounded-full text-xs font-black border-2 transition-all active:scale-95 shadow-sm flex items-center gap-1 ${
                  soundSettings.sfx
                    ? 'bg-sky-500 text-white border-white'
                    : 'bg-slate-200 text-slate-600 border-slate-300'
                }`}
              >
                <span>{soundSettings.sfx ? 'ON' : 'OFF'}</span>
                <span>{soundSettings.sfx ? '▷' : '◁'}</span>
              </button>
            </div>

            {/* Slider */}
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={soundSettings.sfx ? soundSettings.volume : 0}
              onChange={(e) => updateSoundSettings({ volume: parseFloat(e.target.value) })}
              className="w-full accent-sky-500 cursor-pointer h-2 bg-sky-200 rounded-full"
            />
          </div>

          {/* Row 3: Suara Karakter (Bloo) */}
          <div className="p-3 bg-sky-50/80 rounded-2xl border-2 border-sky-200 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-sky-500 text-white flex items-center justify-center shadow">
                  <Smile size={18} />
                </div>
                <span className="text-xs font-black text-sky-950 font-bubbly">
                  Suara Karakter (Bloo)
                </span>
              </div>

              {/* ON/OFF Pill Toggle */}
              <button
                onClick={() => updateSoundSettings({ voice: !soundSettings.voice })}
                className={`px-3 py-1 rounded-full text-xs font-black border-2 transition-all active:scale-95 shadow-sm flex items-center gap-1 ${
                  soundSettings.voice
                    ? 'bg-sky-500 text-white border-white'
                    : 'bg-slate-200 text-slate-600 border-slate-300'
                }`}
              >
                <span>{soundSettings.voice ? 'ON' : 'OFF'}</span>
                <span>{soundSettings.voice ? '▷' : '◁'}</span>
              </button>
            </div>

            {/* Slider */}
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={soundSettings.voice ? soundSettings.volume : 0}
              onChange={(e) => updateSoundSettings({ volume: parseFloat(e.target.value) })}
              className="w-full accent-sky-500 cursor-pointer h-2 bg-sky-200 rounded-full"
            />
          </div>

          {/* Big Sky-Blue Button: Ulangi Ucapan Bloo (Matching Frame 8) */}
          <button
            onClick={handleRepeatVoice}
            className="btn-sky-3d w-full py-3 rounded-full text-white font-black text-xs md:text-sm flex items-center justify-center gap-2 active:scale-95 shadow-md"
          >
            <RotateCcw size={16} />
            <span>Ulangi Ucapan Bloo</span>
          </button>

          {/* Bloo below with Dialogue Bubble (Matching Frame 8 in Master Sheet) */}
          <div className="mt-4 flex items-center justify-center gap-3">
            <BlooMascot size={90} showDialogue={false} interactive={true} />
            <div className="relative p-3 bg-white rounded-2xl border-2 border-sky-300 shadow-md text-xs font-bold text-sky-900 font-sans max-w-[210px]">
              "Kalau ada yang mau diubah, tinggal atur di sini ya 💙"
              <div className="absolute top-1/2 -left-2 -translate-y-1/2 w-0 h-0 border-y-6 border-y-transparent border-r-8 border-r-white" />
            </div>
          </div>

          {/* Reset progress option */}
          <div className="pt-2 border-t border-sky-100 text-center">
            {!confirmReset ? (
              <button
                onClick={() => setConfirmReset(true)}
                className="text-[11px] font-bold text-rose-500 hover:text-rose-700"
              >
                Reset Progres Game
              </button>
            ) : (
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-2xl">
                <p className="text-xs font-bold text-rose-950 mb-2">
                  Yakin ingin mengulang progres dari awal?
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => setConfirmReset(false)}
                    className="flex-1 py-1 rounded-full bg-slate-200 text-slate-700 text-xs font-bold"
                  >
                    Batal
                  </button>
                  <button
                    onClick={handleDoReset}
                    className="flex-1 py-1 rounded-full bg-rose-600 text-white text-xs font-black shadow"
                  >
                    Ya, Reset
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};
