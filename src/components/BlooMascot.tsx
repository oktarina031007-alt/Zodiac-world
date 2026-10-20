import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, TargetAndTransition } from 'motion/react';
import { BlooMood } from '../types/game';
import { useGame } from '../context/GameContext';
import { Volume2, VolumeX, RotateCcw, Sparkles } from 'lucide-react';

interface BlooMascotProps {
  mood?: BlooMood;
  size?: number;
  showDialogue?: boolean;
  interactive?: boolean;
  className?: string;
  feedbackText?: string | null;
  onBlooClick?: () => void;
}

export const BlooMascot: React.FC<BlooMascotProps> = ({
  mood = 'idle',
  size = 200,
  showDialogue = true,
  interactive = true,
  className = '',
  feedbackText = null,
  onBlooClick
}) => {
  const {
    blooDialogue,
    isBlooSpeaking,
    triggerBlooTouch,
    soundSettings,
    updateSoundSettings,
    speakBlooText,
    equippedAccessories
  } = useGame();

  const [isBlinking, setIsBlinking] = useState(false);
  const [mouthOpen, setMouthOpen] = useState(false);
  const [touchParticles, setTouchParticles] = useState<{ id: number; x: number; y: number }[]>([]);
  const [idleSleepy, setIdleSleepy] = useState(false);

  // Inactivity sleep timer
  const inactivityTimerRef = useRef<number | null>(null);

  const resetInactivity = () => {
    setIdleSleepy(false);
    if (inactivityTimerRef.current) {
      window.clearTimeout(inactivityTimerRef.current);
    }
    inactivityTimerRef.current = window.setTimeout(() => {
      setIdleSleepy(true);
    }, 28000); // 28s of inactivity -> sleep mode
  };

  useEffect(() => {
    resetInactivity();
    const handleActivity = () => resetInactivity();
    window.addEventListener('pointerdown', handleActivity);
    window.addEventListener('keydown', handleActivity);

    return () => {
      window.removeEventListener('pointerdown', handleActivity);
      window.removeEventListener('keydown', handleActivity);
      if (inactivityTimerRef.current) {
        window.clearTimeout(inactivityTimerRef.current);
      }
    };
  }, []);

  // Natural blink loop every 3.5 - 5.5 seconds
  useEffect(() => {
    let blinkTimeout: number;
    const scheduleBlink = () => {
      const delay = 3200 + Math.random() * 2200;
      blinkTimeout = window.setTimeout(() => {
        setIsBlinking(true);
        setTimeout(() => {
          setIsBlinking(false);
          scheduleBlink();
        }, 180);
      }, delay);
    };

    scheduleBlink();
    return () => clearTimeout(blinkTimeout);
  }, []);

  // Talking mouth animation loop
  useEffect(() => {
    if (!isBlooSpeaking && mood !== 'talking') {
      setMouthOpen(false);
      return;
    }

    const interval = window.setInterval(() => {
      setMouthOpen(prev => !prev);
    }, 130);

    return () => clearInterval(interval);
  }, [isBlooSpeaking, mood]);

  // Handle tap on Bloo
  const handleTap = (e: React.MouseEvent<HTMLDivElement>) => {
    resetInactivity();
    if (!interactive) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newParticles = Array.from({ length: 4 }).map((_, i) => ({
      id: Date.now() + i,
      x: x + (Math.random() * 36 - 18),
      y: y + (Math.random() * 36 - 18)
    }));
    setTouchParticles(prev => [...prev, ...newParticles]);

    setTimeout(() => {
      setTouchParticles(prev => prev.filter(p => !newParticles.some(np => np.id === p.id)));
    }, 900);

    if (onBlooClick) {
      onBlooClick();
    } else {
      triggerBlooTouch();
    }
  };

  const currentEffectiveMood: BlooMood = idleSleepy && mood === 'idle' ? 'sleep' : mood;

  // Exact animations matching the master sheet
  const getMascotAnimation = (): TargetAndTransition => {
    switch (currentEffectiveMood) {
      case 'greeting':
        return {
          y: [0, -16, 0, -10, 0],
          rotate: [0, -5, 5, -2, 0],
          scale: [1, 1.07, 1, 1.03, 1],
          transition: { duration: 1.4, repeat: Infinity, ease: 'easeInOut' as const }
        };

      case 'happy':
        // Melompat kegirangan dan bergoyang (Melompat state)
        return {
          y: [0, -32, 0, -22, 0],
          scale: [1, 1.16, 0.94, 1.1, 1],
          rotate: [0, -8, 8, -4, 0],
          transition: { duration: 0.9, repeat: Infinity, ease: 'easeOut' as const }
        };

      case 'funny':
        // Salah state: Bloo memiringkan kepala dan menunjukkan ekspresi bingung bergoyang kecil
        return {
          rotate: [0, -18, -14, -22, -18],
          y: [0, -5, 0, -3, 0],
          scale: [1, 1.04, 1, 1.02, 1],
          transition: { duration: 1.2, repeat: Infinity, ease: 'easeInOut' as const }
        };

      case 'dance':
        // Menari state: berputar dan menari dengan musik
        return {
          rotate: [0, 15, -15, 20, -20, 360],
          y: [0, -14, 0, -14, 0],
          scale: [1, 1.08, 0.98, 1.08, 1],
          transition: { duration: 2.2, repeat: Infinity, ease: 'easeInOut' as const }
        };

      case 'sleep':
        // Tertidur state: tertidur di awan dengan Zzz
        return {
          y: [0, 4, 0, 4, 0],
          scale: [1, 0.96, 1, 0.96, 1],
          rotate: [0, -3, 0, -3, 0],
          transition: { duration: 3.5, repeat: Infinity, ease: 'easeInOut' as const }
        };

      case 'touch':
        return {
          scale: [1, 1.2, 0.92, 1.08, 1],
          y: [0, -22, 0, -10, 0],
          rotate: [0, 10, -10, 5, 0],
          transition: { duration: 0.75, ease: 'easeOut' as const }
        };

      case 'talking':
        return {
          y: [0, -6, 0, -4, 0],
          rotate: [0, -3, 3, -2, 0],
          scale: [1, 1.03, 1, 1.02, 1],
          transition: { duration: 0.8, repeat: Infinity, ease: 'easeInOut' as const }
        };

      case 'idle':
      default:
        return {
          y: [0, -9, 0],
          rotate: [-2, 2, -2],
          transition: { duration: 3.6, repeat: Infinity, ease: 'easeInOut' as const }
        };
    }
  };

  const hasCrown = !!equippedAccessories['hat'];
  const hasWand = !!equippedAccessories['wand'];
  const hasCape = !!equippedAccessories['cape'];
  const hasHalo = !!equippedAccessories['charm'];

  return (
    <div className={`relative flex flex-col items-center justify-center select-none ${className}`}>
      {/* Feedback Badge (e.g. "YEAY! JAWABAN BENAR! ✨" or "UPS! COBA LAGI! 💙") */}
      <AnimatePresence>
        {feedbackText && (
          <motion.div
            initial={{ opacity: 0, scale: 0.7, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className={`z-30 mb-2 px-4 py-1.5 rounded-full border-2 shadow-lg text-xs md:text-sm font-black font-bubbly flex items-center gap-1.5 ${
              feedbackText.includes('BENAR') || feedbackText.includes('YEAY')
                ? 'bg-gradient-to-r from-amber-200 via-amber-300 to-amber-400 text-amber-950 border-white shadow-amber-300/50 animate-bounce'
                : 'bg-gradient-to-r from-sky-100 via-sky-200 to-sky-300 text-sky-950 border-white shadow-sky-300/50'
            }`}
          >
            {feedbackText.includes('BENAR') || feedbackText.includes('YEAY') ? '✨' : '🫧'}
            <span>{feedbackText}</span>
            {feedbackText.includes('BENAR') || feedbackText.includes('YEAY') ? '⭐' : '💙'}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Speech Bubble Dialog */}
      <AnimatePresence>
        {showDialogue && blooDialogue && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.85 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            className="relative z-20 mb-3 max-w-[340px] px-4 py-3 bg-white/95 rounded-3xl shadow-xl border-3 border-sky-300 text-sky-950 backdrop-blur-sm"
          >
            <div className="flex items-start gap-2.5">
              <div className="shrink-0 w-6 h-6 rounded-full bg-sky-100 flex items-center justify-center text-sky-600 mt-0.5">
                <Sparkles size={14} className="animate-spin" style={{ animationDuration: '6s' }} />
              </div>
              <p className="text-xs md:text-sm font-bold leading-relaxed tracking-wide text-sky-900 font-sans">
                {blooDialogue}
              </p>
            </div>

            {/* Bubble arrow pointing down */}
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-0 h-0 border-x-8 border-x-transparent border-t-8 border-t-sky-300" />
            <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 w-0 h-0 border-x-7 border-x-transparent border-t-7 border-t-white" />

            {/* Speech quick controls */}
            <div className="mt-2 pt-2 border-t border-sky-100 flex items-center justify-between text-[11px] text-sky-600">
              <span className="font-extrabold flex items-center gap-1 font-bubbly text-sky-800">
                ⭐ Bloo
              </span>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => speakBlooText(blooDialogue)}
                  title="Ulangi Suara Bloo"
                  className="hover:text-sky-900 transition-colors p-1"
                >
                  <RotateCcw size={13} />
                </button>
                <button
                  onClick={() => updateSoundSettings({ voice: !soundSettings.voice })}
                  title={soundSettings.voice ? "Matikan Suara Karakter" : "Nyalakan Suara Karakter"}
                  className="hover:text-sky-900 transition-colors p-1"
                >
                  {soundSettings.voice ? <Volume2 size={13} /> : <VolumeX size={13} />}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Sleeping 'Zzz' Animation */}
      {currentEffectiveMood === 'sleep' && (
        <div className="absolute -top-6 right-8 z-30 pointer-events-none">
          <motion.div
            animate={{
              y: [-5, -30],
              x: [0, 15],
              opacity: [0, 1, 0],
              scale: [0.8, 1.3]
            }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeOut' }}
            className="text-sky-500 font-extrabold text-lg select-none font-bubbly drop-shadow"
          >
            Zzz...
          </motion.div>
        </div>
      )}

      {/* Floating Cute Bubbles for "Salah / Wrong" state (animasi gelembung kecil) */}
      {currentEffectiveMood === 'funny' && (
        <div className="absolute inset-0 pointer-events-none z-30 overflow-visible">
          <motion.div
            animate={{ y: [0, -45], x: [-10, -25], opacity: [0, 0.9, 0], scale: [0.6, 1.2] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeOut' }}
            className="absolute top-8 left-4 text-sky-400 text-lg select-none"
          >
            🫧
          </motion.div>
          <motion.div
            animate={{ y: [0, -50], x: [10, 22], opacity: [0, 0.8, 0], scale: [0.5, 1.1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut', delay: 0.4 }}
            className="absolute top-12 right-6 text-sky-400 text-base select-none"
          >
            🫧
          </motion.div>
          <motion.div
            animate={{ y: [0, -35], x: [0, -8], opacity: [0, 0.7, 0], scale: [0.4, 0.9] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: 'easeOut', delay: 0.8 }}
            className="absolute top-6 left-12 text-sky-300 text-sm select-none"
          >
            🫧
          </motion.div>
        </div>
      )}

      {/* Floating Golden Stars for "Melompat / Happy" state */}
      {currentEffectiveMood === 'happy' && (
        <div className="absolute inset-0 pointer-events-none z-30 overflow-visible">
          <motion.div
            animate={{ y: [0, -40], x: [-15, -30], opacity: [0, 1, 0], scale: [0.8, 1.4], rotate: [0, 90] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: 'easeOut' }}
            className="absolute top-6 left-2 text-amber-400 text-xl drop-shadow select-none"
          >
            ⭐
          </motion.div>
          <motion.div
            animate={{ y: [0, -45], x: [15, 30], opacity: [0, 1, 0], scale: [0.8, 1.4], rotate: [0, -90] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: 'easeOut', delay: 0.2 }}
            className="absolute top-4 right-2 text-amber-400 text-xl drop-shadow select-none"
          >
            ⭐
          </motion.div>
          <motion.div
            animate={{ y: [0, -30], opacity: [0, 1, 0], scale: [0.5, 1.2] }}
            transition={{ duration: 0.9, repeat: Infinity, ease: 'easeOut', delay: 0.5 }}
            className="absolute -top-4 left-1/2 -translate-x-1/2 text-amber-300 text-lg drop-shadow select-none"
          >
            ✨
          </motion.div>
        </div>
      )}

      {/* Musical notes for "Menari / Dance" state */}
      {currentEffectiveMood === 'dance' && (
        <div className="absolute inset-0 pointer-events-none z-30 overflow-visible">
          <motion.div
            animate={{ y: [0, -35], x: [-10, -20], opacity: [0, 1, 0], scale: [0.8, 1.2] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeOut' }}
            className="absolute top-8 left-4 text-sky-500 text-lg select-none"
          >
            🎵
          </motion.div>
          <motion.div
            animate={{ y: [0, -35], x: [10, 20], opacity: [0, 1, 0], scale: [0.8, 1.2] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeOut', delay: 0.5 }}
            className="absolute top-8 right-4 text-amber-500 text-lg select-none"
          >
            🎶
          </motion.div>
        </div>
      )}

      {/* Touch particles */}
      <div className="absolute inset-0 pointer-events-none z-30 overflow-visible">
        {touchParticles.map(p => (
          <motion.div
            key={p.id}
            initial={{ opacity: 1, scale: 0.6, y: p.y, x: p.x }}
            animate={{ opacity: 0, scale: 1.5, y: p.y - 45, x: p.x + (Math.random() * 30 - 15) }}
            transition={{ duration: 0.85, ease: 'easeOut' }}
            className="absolute text-amber-400 drop-shadow-md select-none font-bold text-lg"
          >
            ⭐
          </motion.div>
        ))}
      </div>

      {/* Bloo Interactive Animated Container */}
      <motion.div
        animate={getMascotAnimation()}
        onClick={handleTap}
        className={`relative ${interactive ? 'cursor-pointer' : ''}`}
        style={{ width: size, height: size }}
        whileHover={interactive ? { scale: 1.05 } : {}}
        whileTap={interactive ? { scale: 0.95 } : {}}
      >
        <svg
          viewBox="0 0 200 200"
          width={size}
          height={size}
          className="w-full h-full drop-shadow-2xl select-none"
        >
          <defs>
            {/* Bloo vibrant sky-to-ocean blue body gradient */}
            <radialGradient id="blooBodyGrad" cx="45%" cy="40%" r="65%">
              <stop offset="0%" stopColor="#7dd3fc" />
              <stop offset="50%" stopColor="#38bdf8" />
              <stop offset="85%" stopColor="#0ea5e9" />
              <stop offset="100%" stopColor="#0284c7" />
            </radialGradient>

            {/* Golden Star Gradient for Forehead Star & Belly Star */}
            <linearGradient id="goldStarGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="40%" stopColor="#facc15" />
              <stop offset="100%" stopColor="#ca8a04" />
            </linearGradient>

            {/* Inner glow filter */}
            <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Optional Cape accessory */}
          {hasCape && (
            <path
              d="M 55 125 C 20 185, 45 195, 75 190 C 100 175, 125 175, 150 190 C 180 195, 175 180, 145 125 Z"
              fill="#0369a1"
              stroke="#075985"
              strokeWidth="3"
            />
          )}

          {/* Optional Halo / Planet Ring accessory */}
          {hasHalo && (
            <ellipse
              cx="100"
              cy="25"
              rx="45"
              ry="14"
              fill="none"
              stroke="#facc15"
              strokeWidth="4"
              strokeDasharray="14 4"
              className="animate-spin"
              style={{ transformOrigin: '100px 25px', animationDuration: '8s' }}
            />
          )}

          {/* Starlight Aura / Glow */}
          <circle cx="100" cy="105" r="75" fill="#38bdf8" opacity="0.22" filter="url(#softGlow)" />

          {/* Bloo Cute Star Body */}
          <path
            d="M 100 24 
               C 112 56, 128 72, 166 76
               C 180 77, 185 92, 174 102
               C 144 128, 140 148, 152 184
               C 156 198, 142 206, 130 196
               C 100 172, 90 172, 60 196
               C 48 206, 34 198, 38 184
               C 50 148, 46 128, 16 102
               C 5 92, 10 77, 24 76
               C 62 72, 78 56, 90 24
               C 94 12, 106 12, 100 24 Z"
            fill="url(#blooBodyGrad)"
            stroke="#ffffff"
            strokeWidth="4"
            strokeLinejoin="round"
          />

          {/* Left Little Arm / Hand */}
          <path
            d="M 44 116 C 26 120, 22 136, 36 140 C 44 138, 48 128, 44 116 Z"
            fill="#38bdf8"
            stroke="#ffffff"
            strokeWidth="2.5"
          />

          {/* Right Little Arm / Hand (Waves during greeting or talking!) */}
          {currentEffectiveMood === 'greeting' || currentEffectiveMood === 'talking' ? (
            <path
              d="M 156 116 C 182 100, 186 116, 170 134 C 160 132, 154 124, 156 116 Z"
              fill="#38bdf8"
              stroke="#ffffff"
              strokeWidth="2.5"
            />
          ) : (
            <path
              d="M 156 116 C 174 120, 178 136, 164 140 C 156 138, 152 128, 156 116 Z"
              fill="#38bdf8"
              stroke="#ffffff"
              strokeWidth="2.5"
            />
          )}

          {/* Optional Wand in Hand */}
          {hasWand && (
            <g transform="translate(165, 95) rotate(-25)">
              <line x1="0" y1="35" x2="0" y2="0" stroke="#ca8a04" strokeWidth="4" strokeLinecap="round" />
              <polygon
                points="0,-12 4,-3 12,-3 6,2 8,11 0,6 -8,11 -6,2 -12,-3 -4,-3"
                fill="#facc15"
                stroke="#ca8a04"
                strokeWidth="1"
              />
            </g>
          )}

          {/* Forehead Little Golden Star Badge (As in original art!) */}
          <polygon
            points="100,32 103,42 113,42 105,48 108,58 100,52 92,58 95,48 87,42 97,42"
            fill="url(#goldStarGrad)"
            stroke="#ffffff"
            strokeWidth="1.5"
            filter="url(#softGlow)"
          />

          {/* Belly Little Golden Star Badge */}
          <polygon
            points="100,140 102,147 109,147 104,151 106,158 100,154 94,158 96,151 91,147 98,147"
            fill="url(#goldStarGrad)"
            stroke="#ffffff"
            strokeWidth="1.2"
          />

          {/* Eyes Section */}
          {currentEffectiveMood === 'sleep' ? (
            // Sleeping closed eyes (u u)
            <g>
              <path d="M 72 98 Q 82 108 92 98" stroke="#075985" strokeWidth="3.5" fill="none" strokeLinecap="round" />
              <path d="M 108 98 Q 118 108 128 98" stroke="#075985" strokeWidth="3.5" fill="none" strokeLinecap="round" />
            </g>
          ) : isBlinking ? (
            // Blinking closed lines (Berkedip state)
            <g>
              <path d="M 72 96 Q 82 104 92 96" stroke="#075985" strokeWidth="3.5" fill="none" strokeLinecap="round" />
              <path d="M 108 96 Q 118 104 128 96" stroke="#075985" strokeWidth="3.5" fill="none" strokeLinecap="round" />
            </g>
          ) : currentEffectiveMood === 'funny' ? (
            // Salah state: Bloo memiringkan kepala, ekspresi bingung lucu
            <g>
              {/* Left eye curious round */}
              <ellipse cx="80" cy="94" rx="9" ry="12" fill="#082f49" />
              <circle cx="78" cy="90" r="3.5" fill="#ffffff" />
              {/* Right eye wondering squint */}
              <ellipse cx="120" cy="95" rx="8" ry="7" fill="#082f49" />
              <circle cx="119" cy="93" r="2.5" fill="#ffffff" />
              {/* Little questioning eyebrow */}
              <path d="M 112 84 Q 120 80 128 86" stroke="#075985" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            </g>
          ) : currentEffectiveMood === 'happy' ? (
            // Melompat / Jawaban Benar state: Mata Bloo terlihat berbinar!
            <g>
              {/* Left Eye with Sparkling Stars */}
              <ellipse cx="80" cy="94" rx="12" ry="16" fill="#082f49" />
              <ellipse cx="80" cy="98" rx="9" ry="6" fill="#38bdf8" opacity="0.8" />
              {/* Big sparkling starlight inside left pupil */}
              <polygon
                points="79,84 81,89 86,89 82,92 84,97 79,94 74,97 76,92 72,89 77,89"
                fill="#ffffff"
              />
              <circle cx="84" cy="101" r="2.5" fill="#ffffff" />

              {/* Right Eye with Sparkling Stars */}
              <ellipse cx="120" cy="94" rx="12" ry="16" fill="#082f49" />
              <ellipse cx="120" cy="98" rx="9" ry="6" fill="#38bdf8" opacity="0.8" />
              {/* Big sparkling starlight inside right pupil */}
              <polygon
                points="119,84 121,89 126,89 122,92 124,97 119,94 114,97 116,92 112,89 117,89"
                fill="#ffffff"
              />
              <circle cx="124" cy="101" r="2.5" fill="#ffffff" />
            </g>
          ) : (
            // Big Beautiful Expressive Anime Eyes (Menyapa / Idle state)
            <g>
              {/* Left Eye */}
              <ellipse cx="80" cy="94" rx="11" ry="15" fill="#082f49" />
              <circle cx="77" cy="88" r="4.5" fill="#ffffff" />
              <circle cx="83" cy="99" r="2.5" fill="#ffffff" />
              <ellipse cx="80" cy="98" rx="8" ry="5" fill="#38bdf8" opacity="0.65" />

              {/* Right Eye */}
              <ellipse cx="120" cy="94" rx="11" ry="15" fill="#082f49" />
              <circle cx="117" cy="88" r="4.5" fill="#ffffff" />
              <circle cx="123" cy="99" r="2.5" fill="#ffffff" />
              <ellipse cx="120" cy="98" rx="8" ry="5" fill="#38bdf8" opacity="0.65" />
            </g>
          )}

          {/* Adorable Soft Pink Blush Cheeks */}
          <ellipse cx="64" cy="108" rx="10" ry="6" fill="#f472b6" opacity="0.75" />
          <ellipse cx="136" cy="108" rx="10" ry="6" fill="#f472b6" opacity="0.75" />

          {/* Cheerful Expressive Mouth */}
          {currentEffectiveMood === 'sleep' ? (
            <ellipse cx="100" cy="116" rx="3" ry="2.5" fill="#0c4a6e" />
          ) : mouthOpen || currentEffectiveMood === 'talking' ? (
            // Animated talking open mouth
            <g>
              <path
                d="M 91 110 Q 100 126 109 110 Z"
                fill="#fda4af"
                stroke="#075985"
                strokeWidth="2"
              />
              <path d="M 94 116 Q 100 124 106 116 Z" fill="#f43f5e" />
            </g>
          ) : currentEffectiveMood === 'happy' ? (
            // Big joyful laugh mouth
            <path
              d="M 88 108 Q 100 128 112 108 Z"
              fill="#fda4af"
              stroke="#075985"
              strokeWidth="2.5"
            />
          ) : currentEffectiveMood === 'funny' ? (
            // Cute small questioning mouth
            <ellipse cx="98" cy="114" rx="4.5" ry="5.5" fill="#fda4af" stroke="#075985" strokeWidth="2" />
          ) : (
            // Gentle warm smile
            <path
              d="M 92 110 Q 100 120 108 110"
              stroke="#075985"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
            />
          )}

          {/* Optional Golden Crown accessory */}
          {hasCrown && (
            <g transform="translate(0, -6)">
              <polygon
                points="84,28 90,10 100,20 110,10 116,28"
                fill="url(#goldStarGrad)"
                stroke="#ca8a04"
                strokeWidth="2.5"
              />
              <circle cx="100" cy="16" r="3.5" fill="#38bdf8" />
            </g>
          )}
        </svg>

        {/* Mascot Sparkles overlay */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-2 left-6 text-amber-300 animate-star-shimmer text-xs">✨</div>
          <div className="absolute bottom-6 right-6 text-sky-200 animate-star-shimmer text-xs" style={{ animationDelay: '1s' }}>⭐</div>
          <div className="absolute top-8 right-8 text-amber-200 animate-star-shimmer text-xs" style={{ animationDelay: '1.8s' }}>✨</div>
        </div>
      </motion.div>
    </div>
  );
};
