import React, { useState, useEffect, useRef } from 'react';
import { useGame } from '../../context/GameContext';
import {
  GUESS_ZODIAC_QUESTIONS,
  COSMIC_QUIZ_QUESTIONS,
  WHO_AM_I_ROSTER,
  ZODIAC_LIST,
  BLOO_CORRECT_SPEECH,
  BLOO_WRONG_SPEECH
} from '../../data/zodiacs';
import { ZodiacAvatar } from '../ZodiacAvatars';
import { BlooMascot } from '../BlooMascot';
import {
  ArrowLeft,
  Clock,
  RotateCcw,
  Trophy,
  Sparkles,
  Flame,
  Pause,
  Check,
  X as CloseIcon
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { sound } from '../../utils/audio';

type ActiveGame = 'menu' | 'guess' | 'memory' | 'cosmic_quiz' | 'who_am_i';

export const MiniGamesScreen: React.FC = () => {
  const {
    setScreen,
    stars,
    level,
    addStars,
    addExp,
    trackAchievementProgress,
    fireConfetti,
    setBlooMood,
    setBlooDialogue,
    speakBlooText
  } = useGame();

  const [activeGame, setActiveGame] = useState<ActiveGame>('menu');

  // ==========================================
  // GAME A: GUESS THE ZODIAC STATE
  // ==========================================
  const [guessIndex, setGuessIndex] = useState(0);
  const [guessScore, setGuessScore] = useState(0);
  const [guessSelectedOpt, setGuessSelectedOpt] = useState<number | null>(null);
  const [guessWrongAttempts, setGuessWrongAttempts] = useState<number[]>([]);
  const [guessAnswered, setGuessAnswered] = useState(false);
  const [guessFeedback, setGuessFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [guessFinished, setGuessFinished] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const startGuessGame = () => {
    setGuessIndex(0);
    setGuessScore(0);
    setGuessSelectedOpt(null);
    setGuessWrongAttempts([]);
    setGuessAnswered(false);
    setGuessFeedback(null);
    setGuessFinished(false);
    setIsPaused(false);
    setActiveGame('guess');
    sound.playSfx('click');
  };

  const handleGuessAnswer = (optionIdx: number) => {
    if (guessAnswered || guessWrongAttempts.includes(optionIdx)) return;

    const currentQ = GUESS_ZODIAC_QUESTIONS[guessIndex];
    const isCorrect = optionIdx === currentQ.correctIndex;

    if (isCorrect) {
      // 🔊 JIKA JAWABAN BENAR
      setGuessSelectedOpt(optionIdx);
      setGuessAnswered(true);
      setGuessFeedback('correct');

      // 1. Putar efek suara kemenangan yang ceria dan lucu
      sound.playSfx('correct');

      // 2. Bloo melompat kegirangan, mata berbinar, bintang emas
      setBlooMood('happy');

      // 3. Tambahkan poin pemain (+10 bintang emas)
      setGuessScore(prev => prev + 10);
      addStars(10);
      addExp(20);

      // 4. Bloo mengucapkan suara imut
      speakBlooText(BLOO_CORRECT_SPEECH);
    } else {
      // ❌ JIKA JAWABAN SALAH
      setGuessWrongAttempts(prev => [...prev, optionIdx]);
      setGuessFeedback('wrong');

      // 1. Putar efek suara lucu yang lembut "boop"
      sound.playSfx('wrong');

      // 2. Bloo memiringkan kepala, bingung bergoyang kecil, gelembung kecil
      setBlooMood('funny');

      // 3. Jangan mengurangi poin secara otomatis, berikan kesempatan mencoba kembali!
      speakBlooText(BLOO_WRONG_SPEECH);

      // Reset feedback banner after 2.5s while keeping wrong options marked
      setTimeout(() => {
        setGuessFeedback(null);
      }, 2500);
    }
  };

  const handleNextGuessQuestion = () => {
    sound.playSfx('click');
    if (guessIndex + 1 < GUESS_ZODIAC_QUESTIONS.length) {
      setGuessIndex(prev => prev + 1);
      setGuessSelectedOpt(null);
      setGuessWrongAttempts([]);
      setGuessAnswered(false);
      setGuessFeedback(null);
    } else {
      setGuessFinished(true);
      sound.playSfx('levelUp');
      fireConfetti();
      trackAchievementProgress('first_quiz', 1);
      setBlooMood('dance');
      setBlooDialogue("COSMIC AWESOME! Kamu menyelesaikan seluruh pertanyaan dengan luar biasa! ⭐");
    }
  };

  // ==========================================
  // GAME B: MEMORY STARS (Card Matching)
  // ==========================================
  interface MemoryCard {
    id: number;
    zodiacId: string;
    symbol: string;
    isFlipped: boolean;
    isMatched: boolean;
  }

  const [memoryCards, setMemoryCards] = useState<MemoryCard[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [memoryMoves, setMemoryMoves] = useState(0);
  const [memoryTime, setMemoryTime] = useState(0);
  const [memoryTimerActive, setMemoryTimerActive] = useState(false);
  const [memoryFinished, setMemoryFinished] = useState(false);
  const timerIntervalRef = useRef<number | null>(null);

  const startMemoryGame = () => {
    const selectedSigns = ['aries', 'taurus', 'gemini', 'cancer', 'leo', 'pisces'];
    const deck: MemoryCard[] = [];

    selectedSigns.forEach((signId, i) => {
      const z = ZODIAC_LIST.find(item => item.id === signId)!;
      deck.push({ id: i * 2, zodiacId: signId, symbol: z.symbol, isFlipped: false, isMatched: false });
      deck.push({ id: i * 2 + 1, zodiacId: signId, symbol: z.symbol, isFlipped: false, isMatched: false });
    });

    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }

    setMemoryCards(deck);
    setFlippedCards([]);
    setMemoryMoves(0);
    setMemoryTime(0);
    setMemoryTimerActive(true);
    setMemoryFinished(false);
    setActiveGame('memory');
    sound.playSfx('click');
  };

  useEffect(() => {
    if (memoryTimerActive && !memoryFinished) {
      timerIntervalRef.current = window.setInterval(() => {
        setMemoryTime(prev => prev + 1);
      }, 1000);
    } else {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    }
    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, [memoryTimerActive, memoryFinished]);

  const handleFlipCard = (cardIndex: number) => {
    const card = memoryCards[cardIndex];
    if (card.isFlipped || card.isMatched || flippedCards.length >= 2) return;

    sound.playSfx('click');
    const newCards = [...memoryCards];
    newCards[cardIndex].isFlipped = true;
    setMemoryCards(newCards);

    const newFlipped = [...flippedCards, cardIndex];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      setMemoryMoves(prev => prev + 1);
      const [idx1, idx2] = newFlipped;
      if (newCards[idx1].zodiacId === newCards[idx2].zodiacId) {
        sound.playSfx('correct');
        newCards[idx1].isMatched = true;
        newCards[idx2].isMatched = true;
        setMemoryCards(newCards);
        setFlippedCards([]);

        if (newCards.every(c => c.isMatched)) {
          setMemoryFinished(true);
          setMemoryTimerActive(false);
          sound.playSfx('levelUp');
          fireConfetti();
          addStars(40);
          addExp(50);
          trackAchievementProgress('memory_master', 1);
          setBlooMood('dance');
          speakBlooText(BLOO_CORRECT_SPEECH);
        }
      } else {
        sound.playSfx('wrong');
        setTimeout(() => {
          setMemoryCards(prev => {
            const resetDeck = [...prev];
            resetDeck[idx1].isFlipped = false;
            resetDeck[idx2].isFlipped = false;
            return resetDeck;
          });
          setFlippedCards([]);
        }, 850);
      }
    }
  };

  // ==========================================
  // GAME C: COSMIC QUIZ (Timed Rapid Fire)
  // ==========================================
  const [cosmicIdx, setCosmicIdx] = useState(0);
  const [cosmicScore, setCosmicScore] = useState(0);
  const [cosmicTimeLeft, setCosmicTimeLeft] = useState(15);
  const [cosmicAnswered, setCosmicAnswered] = useState(false);
  const [cosmicSelectedOpt, setCosmicSelectedOpt] = useState<number | null>(null);
  const [cosmicWrongAttempts, setCosmicWrongAttempts] = useState<number[]>([]);
  const [cosmicFeedback, setCosmicFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [cosmicFinished, setCosmicFinished] = useState(false);
  const cosmicTimerRef = useRef<number | null>(null);

  const startCosmicQuiz = () => {
    setCosmicIdx(0);
    setCosmicScore(0);
    setCosmicTimeLeft(15);
    setCosmicAnswered(false);
    setCosmicSelectedOpt(null);
    setCosmicWrongAttempts([]);
    setCosmicFeedback(null);
    setCosmicFinished(false);
    setActiveGame('cosmic_quiz');
    sound.playSfx('click');
  };

  useEffect(() => {
    if (activeGame === 'cosmic_quiz' && !cosmicAnswered && !cosmicFinished && !isPaused) {
      cosmicTimerRef.current = window.setInterval(() => {
        setCosmicTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(cosmicTimerRef.current!);
            handleCosmicTimeout();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (cosmicTimerRef.current) clearInterval(cosmicTimerRef.current);
    }
    return () => {
      if (cosmicTimerRef.current) clearInterval(cosmicTimerRef.current);
    };
  }, [activeGame, cosmicIdx, cosmicAnswered, cosmicFinished, isPaused]);

  const handleCosmicTimeout = () => {
    setCosmicAnswered(true);
    setCosmicFeedback('wrong');
    sound.playSfx('wrong');
    setBlooMood('funny');
    speakBlooText(BLOO_WRONG_SPEECH);
  };

  const handleCosmicAnswer = (optionIdx: number) => {
    if (cosmicAnswered || cosmicWrongAttempts.includes(optionIdx)) return;

    const q = COSMIC_QUIZ_QUESTIONS[cosmicIdx];
    const isCorrect = optionIdx === q.correctIndex;

    if (isCorrect) {
      setCosmicAnswered(true);
      setCosmicSelectedOpt(optionIdx);
      setCosmicFeedback('correct');

      sound.playSfx('correct');
      const timeBonus = cosmicTimeLeft * 2;
      const pts = 10 + timeBonus;
      setCosmicScore(prev => prev + pts);
      addStars(Math.round(pts / 2));
      addExp(pts);

      setBlooMood('happy');
      speakBlooText(BLOO_CORRECT_SPEECH);
    } else {
      setCosmicWrongAttempts(prev => [...prev, optionIdx]);
      setCosmicFeedback('wrong');
      sound.playSfx('wrong');
      setBlooMood('funny');
      speakBlooText(BLOO_WRONG_SPEECH);

      setTimeout(() => {
        setCosmicFeedback(null);
      }, 2500);
    }
  };

  const handleNextCosmicQ = () => {
    sound.playSfx('click');
    if (cosmicIdx + 1 < COSMIC_QUIZ_QUESTIONS.length) {
      setCosmicIdx(prev => prev + 1);
      setCosmicTimeLeft(15);
      setCosmicAnswered(false);
      setCosmicSelectedOpt(null);
      setCosmicWrongAttempts([]);
      setCosmicFeedback(null);
    } else {
      setCosmicFinished(true);
      sound.playSfx('levelUp');
      fireConfetti();
      trackAchievementProgress('speed_quizzer', cosmicScore);
      setBlooMood('dance');
      setBlooDialogue("COSMIC AWESOME! Kamu luar biasa cepat dan hebat! ⭐");
    }
  };

  // ==========================================
  // GAME D: WHO AM I? (Siapakah Aku?)
  // ==========================================
  const [whoRiddleIndex, setWhoRiddleIndex] = useState(0);
  const [whoCluesRevealed, setWhoCluesRevealed] = useState(1);
  const [whoSelectedSign, setWhoSelectedSign] = useState<string | null>(null);
  const [whoWrongSigns, setWhoWrongSigns] = useState<string[]>([]);
  const [whoResult, setWhoResult] = useState<'correct' | 'wrong' | null>(null);
  const [whoScore, setWhoScore] = useState(0);
  const [whoFinished, setWhoFinished] = useState(false);

  const startWhoAmIGame = () => {
    setWhoRiddleIndex(0);
    setWhoCluesRevealed(1);
    setWhoSelectedSign(null);
    setWhoWrongSigns([]);
    setWhoResult(null);
    setWhoScore(0);
    setWhoFinished(false);
    setActiveGame('who_am_i');
    sound.playSfx('click');
  };

  const handleRevealNextClue = () => {
    if (whoCluesRevealed < 3) {
      sound.playSfx('touch');
      setWhoCluesRevealed(prev => prev + 1);
    }
  };

  const handleGuessWho = (signId: string) => {
    if (whoResult === 'correct' || whoWrongSigns.includes(signId)) return;

    const currentRiddle = WHO_AM_I_ROSTER[whoRiddleIndex];
    const isCorrect = signId === currentRiddle.id;

    if (isCorrect) {
      setWhoSelectedSign(signId);
      setWhoResult('correct');
      sound.playSfx('correct');
      const pts = whoCluesRevealed === 1 ? 30 : whoCluesRevealed === 2 ? 20 : 10;
      setWhoScore(prev => prev + pts);
      addStars(pts);
      addExp(pts * 2);
      trackAchievementProgress('who_am_i_champ', 1);

      setBlooMood('happy');
      speakBlooText(BLOO_CORRECT_SPEECH);
    } else {
      setWhoWrongSigns(prev => [...prev, signId]);
      setWhoResult('wrong');
      sound.playSfx('wrong');
      setBlooMood('funny');
      speakBlooText(BLOO_WRONG_SPEECH);

      setTimeout(() => {
        setWhoResult(null);
      }, 2500);
    }
  };

  const handleNextWhoRiddle = () => {
    sound.playSfx('click');
    if (whoRiddleIndex + 1 < WHO_AM_I_ROSTER.length) {
      setWhoRiddleIndex(prev => prev + 1);
      setWhoCluesRevealed(1);
      setWhoSelectedSign(null);
      setWhoWrongSigns([]);
      setWhoResult(null);
    } else {
      setWhoFinished(true);
      sound.playSfx('levelUp');
      fireConfetti();
      setBlooMood('dance');
      setBlooDialogue("COSMIC AWESOME! Kamu adalah Detektif Zodiak terbaik! ⭐");
    }
  };

  const handleBackToGamesMenu = () => {
    sound.playSfx('click');
    setActiveGame('menu');
  };

  return (
    <div className="relative w-full max-w-lg mx-auto min-h-[calc(100vh-65px)] pb-28 px-4 select-none">
      {/* ============================================================== */}
      {/* 1. MENU PEMILIHAN MINI GAME (Matching Frame 3 in Master Sheet) */}
      {/* ============================================================== */}
      {activeGame === 'menu' && (
        <div className="flex flex-col gap-3 mt-1">
          {/* Header Title Bar */}
          <div className="text-center py-2">
            <h1 className="text-xl md:text-2xl font-black text-sky-950 font-bubbly drop-shadow-sm">
              Pilih Mini Game
            </h1>
            <p className="text-xs font-bold text-sky-700">
              Mainkan mini game favoritmu!
            </p>
          </div>

          {/* 4 Large Rounded Cards Grid (2x2) */}
          <div className="grid grid-cols-2 gap-3">
            {/* Card 1: Guess The Zodiac */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={startGuessGame}
              className="p-3.5 rounded-3xl bg-white/95 border-3 border-sky-200 shadow-xl cursor-pointer flex flex-col items-center text-center hover:border-sky-300 transition-all"
            >
              <div className="w-16 h-16 rounded-2xl bg-sky-50 border-2 border-sky-100 flex items-center justify-center p-1 shadow-inner">
                <ZodiacAvatar id="gemini" size={54} />
              </div>
              <h3 className="text-xs md:text-sm font-black text-sky-950 font-bubbly mt-2 leading-tight">
                Guess The Zodiac
              </h3>
              <p className="text-[10px] text-sky-700 font-semibold mt-0.5 leading-snug">
                Tebak zodiak berdasarkan petunjuk!
              </p>
            </motion.div>

            {/* Card 2: Memory Stars */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={startMemoryGame}
              className="p-3.5 rounded-3xl bg-white/95 border-3 border-sky-200 shadow-xl cursor-pointer flex flex-col items-center text-center hover:border-sky-300 transition-all"
            >
              <div className="w-16 h-16 rounded-2xl bg-sky-50 border-2 border-sky-100 flex items-center justify-center text-3xl shadow-inner">
                🃏
              </div>
              <h3 className="text-xs md:text-sm font-black text-sky-950 font-bubbly mt-2 leading-tight">
                Memory Stars
              </h3>
              <p className="text-[10px] text-sky-700 font-semibold mt-0.5 leading-snug">
                Cocokkan kartu simbol zodiak!
              </p>
            </motion.div>

            {/* Card 3: Cosmic Quiz */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={startCosmicQuiz}
              className="p-3.5 rounded-3xl bg-white/95 border-3 border-sky-200 shadow-xl cursor-pointer flex flex-col items-center text-center hover:border-sky-300 transition-all"
            >
              <div className="w-16 h-16 rounded-2xl bg-sky-50 border-2 border-sky-100 flex items-center justify-center text-3xl shadow-inner">
                ⏱️
              </div>
              <h3 className="text-xs md:text-sm font-black text-sky-950 font-bubbly mt-2 leading-tight">
                Cosmic Quiz
              </h3>
              <p className="text-[10px] text-sky-700 font-semibold mt-0.5 leading-snug">
                Jawab pertanyaan dalam waktu!
              </p>
            </motion.div>

            {/* Card 4: Who Am I? */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={startWhoAmIGame}
              className="p-3.5 rounded-3xl bg-white/95 border-3 border-sky-200 shadow-xl cursor-pointer flex flex-col items-center text-center hover:border-sky-300 transition-all"
            >
              <div className="w-16 h-16 rounded-2xl bg-sky-50 border-2 border-sky-100 flex items-center justify-center text-3xl shadow-inner">
                🔍
              </div>
              <h3 className="text-xs md:text-sm font-black text-sky-950 font-bubbly mt-2 leading-tight">
                Who Am I?
              </h3>
              <p className="text-[10px] text-sky-700 font-semibold mt-0.5 leading-snug">
                Tebak zodiak dari petunjuk Bloo!
              </p>
            </motion.div>
          </div>

          {/* Bloo below with Dialogue Bubble (As in Master Sheet Frame 3) */}
          <div className="mt-4 flex items-center justify-center gap-3">
            <BlooMascot size={90} showDialogue={false} interactive={true} />
            <div className="relative p-3 bg-white/95 rounded-2xl border-2 border-sky-300 shadow-md text-xs font-bold text-sky-900 font-sans max-w-[220px]">
              "Pilih game yang kamu suka, aku tungguin kamu! 💙"
              <div className="absolute top-1/2 -left-2 -translate-y-1/2 w-0 h-0 border-y-6 border-y-transparent border-r-8 border-r-white" />
            </div>
          </div>

          {/* Bottom Back Button: < Kembali */}
          <div className="mt-2 flex justify-start">
            <button
              onClick={() => setScreen('home')}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-gradient-to-r from-sky-400 to-sky-600 text-white font-extrabold text-xs shadow-md border-2 border-white active:scale-95 transition-transform"
            >
              <ArrowLeft size={16} />
              <span>Kembali</span>
            </button>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 2. GAME A: GUESS THE ZODIAC (Matching Frame 4 in Master Sheet) */}
      {/* ============================================================== */}
      {activeGame === 'guess' && (
        <div className="mt-1">
          {!guessFinished ? (
            <div className="flex flex-col gap-3">
              {/* Top In-Game HUD: Score, Streak flame, Pause button */}
              <div className="flex items-center justify-between px-1">
                {/* Star score pill (SO ⭐) */}
                <div className="flex items-center gap-1 px-3 py-1 bg-amber-400 border-2 border-white rounded-full shadow text-amber-950 font-black text-xs">
                  <span>⭐</span>
                  <span className="font-mono text-sm">{guessScore}</span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-amber-500 border-2 border-white flex items-center justify-center text-white shadow">
                    <Flame size={16} />
                  </div>
                  <button
                    onClick={() => setIsPaused(!isPaused)}
                    className="w-8 h-8 rounded-full bg-sky-500 border-2 border-white flex items-center justify-center text-white shadow active:scale-90"
                  >
                    <Pause size={16} />
                  </button>
                </div>
              </div>

              {/* Progress Bar with Question Counter (1/15) */}
              <div className="flex items-center gap-2 px-1">
                <span className="text-[11px] font-bold text-sky-800 font-mono">
                  {guessIndex + 1}/{GUESS_ZODIAC_QUESTIONS.length}
                </span>
                <div className="flex-1 h-3 bg-sky-200/80 rounded-full overflow-hidden p-0.5 border border-sky-300">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-400 to-sky-400 rounded-full transition-all duration-300"
                    style={{ width: `${((guessIndex + 1) / GUESS_ZODIAC_QUESTIONS.length) * 100}%` }}
                  />
                </div>
              </div>

              {/* Question Card with Character Illustration (Matching Frame 4) */}
              <div className="p-4 rounded-3xl bg-white/95 border-3 border-sky-300 shadow-xl flex flex-col items-center text-center">
                <h2 className="text-sm md:text-base font-black text-sky-950 font-bubbly leading-snug mb-3">
                  {GUESS_ZODIAC_QUESTIONS[guessIndex].question}
                </h2>

                {/* Celestial Character Illustration Frame */}
                <div className="relative w-full max-w-[260px] h-32 rounded-2xl bg-gradient-to-b from-sky-100 via-sky-50 to-white border-2 border-sky-200 flex items-center justify-center overflow-hidden shadow-inner">
                  {/* Fluffy clouds & starlight */}
                  <div className="absolute -bottom-1 w-full text-center text-white/80 text-xl pointer-events-none">
                    ☁️☁️☁️
                  </div>
                  <div className="absolute top-2 left-3 text-amber-300 text-xs">✨</div>
                  <div className="absolute top-3 right-4 text-sky-300 text-xs">⭐</div>

                  {/* Character Avatar */}
                  <ZodiacAvatar
                    id={GUESS_ZODIAC_QUESTIONS[guessIndex].characterId || 'leo'}
                    size={76}
                    showCrown={GUESS_ZODIAC_QUESTIONS[guessIndex].characterId === 'leo'}
                  />

                  {/* Circular Zodiac Symbol Badge */}
                  <div className="absolute bottom-2 right-4 w-7 h-7 rounded-full bg-sky-500 border-2 border-white text-white flex items-center justify-center text-xs font-black shadow">
                    {ZODIAC_LIST.find(z => z.id === GUESS_ZODIAC_QUESTIONS[guessIndex].characterId)?.symbol || '♌'}
                  </div>
                </div>
              </div>

              {/* 4 Options Buttons (Matching Frame 4) */}
              <div className="grid grid-cols-1 gap-2.5">
                {GUESS_ZODIAC_QUESTIONS[guessIndex].options.map((opt, idx) => {
                  const isCorrectAnswer = idx === GUESS_ZODIAC_QUESTIONS[guessIndex].correctIndex;
                  const isSelected = guessSelectedOpt === idx;
                  const isWrongAttempt = guessWrongAttempts.includes(idx);

                  let btnClasses = "btn-sky-3d text-white";
                  if (guessAnswered && isCorrectAnswer) {
                    btnClasses = "bg-gradient-to-r from-emerald-400 to-emerald-500 text-white border-3 border-white shadow-emerald-400/50";
                  } else if (isWrongAttempt) {
                    btnClasses = "bg-rose-400 text-white border-2 border-white/60 opacity-60";
                  }

                  return (
                    <motion.button
                      key={idx}
                      whileTap={{ scale: 0.98 }}
                      disabled={guessAnswered || isWrongAttempt}
                      onClick={() => handleGuessAnswer(idx)}
                      className={`w-full py-3 px-5 rounded-2xl font-black text-xs md:text-sm text-left transition-all flex items-center justify-between shadow-md ${btnClasses}`}
                    >
                      <span>
                        <span className="font-bubbly mr-2">
                          {String.fromCharCode(65 + idx)}.
                        </span>
                        {opt}
                      </span>

                      {/* Green Checkmark Badge if Correct */}
                      {guessAnswered && isCorrectAnswer && (
                        <div className="w-6 h-6 rounded-full bg-white text-emerald-600 flex items-center justify-center shadow">
                          <Check size={16} strokeWidth={3} />
                        </div>
                      )}

                      {/* Red cross if wrong */}
                      {isWrongAttempt && (
                        <div className="w-5 h-5 rounded-full bg-white/80 text-rose-600 flex items-center justify-center shadow">
                          <CloseIcon size={13} strokeWidth={3} />
                        </div>
                      )}
                    </motion.button>
                  );
                })}
              </div>

              {/* Bloo below reacting in real-time */}
              <div className="mt-1 flex flex-col items-center">
                <BlooMascot
                  mood={guessFeedback === 'correct' ? 'happy' : guessFeedback === 'wrong' ? 'funny' : 'idle'}
                  size={120}
                  showDialogue={true}
                  feedbackText={guessFeedback === 'correct' ? 'YEAY! JAWABAN BENAR! ✨' : guessFeedback === 'wrong' ? 'UPS! COBA LAGI! 💙' : null}
                  interactive={true}
                />

                {/* Correct Reward Gold Pill Badge (+10) */}
                {guessAnswered && (
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="mt-2 flex items-center gap-2"
                  >
                    <div className="px-4 py-1.5 rounded-full bg-amber-400 border-2 border-white text-amber-950 font-black text-sm flex items-center gap-1 shadow-md">
                      <span>⭐</span>
                      <span>+10</span>
                    </div>

                    <button
                      onClick={handleNextGuessQuestion}
                      className="btn-gold-3d px-6 py-2 rounded-full text-xs font-black text-amber-950 active:scale-95 shadow"
                    >
                      {guessIndex + 1 < GUESS_ZODIAC_QUESTIONS.length ? 'Lanjut >' : 'Selesai 🏆'}
                    </button>
                  </motion.div>
                )}
              </div>
            </div>
          ) : (
            /* ========================================================== */
            /* COSMIC AWESOME! (Frame 5 in Master Sheet)                 */
            /* ========================================================== */
            <div className="flex flex-col items-center text-center mt-2">
              {/* Giant 3D Title: COSMIC AWESOME! */}
              <motion.div
                initial={{ scale: 0.7, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="relative mb-2"
              >
                <h1 className="text-3xl md:text-4xl font-black text-sky-900 font-bubbly drop-shadow-[0_6px_0_#0284c7]">
                  <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-sky-200 to-sky-400 [-webkit-text-stroke:2px_#ffffff]">
                    COSMIC
                  </span>
                </h1>
                <h1 className="text-3xl md:text-4xl font-black text-amber-900 font-bubbly -mt-2 drop-shadow-[0_6px_0_#ca8a04]">
                  <span className="text-transparent bg-clip-text bg-gradient-to-b from-amber-100 via-amber-300 to-amber-500 [-webkit-text-stroke:2px_#ffffff]">
                    AWESOME!
                  </span>
                </h1>
              </motion.div>

              {/* Bloo Jumping in Sky with Stars */}
              <div className="my-1">
                <BlooMascot mood="dance" size={160} showDialogue={false} interactive={true} />
              </div>

              {/* White Score Card (Matching Frame 5) */}
              <div className="w-full p-5 rounded-3xl bg-white/95 border-3 border-sky-300 shadow-2xl flex flex-col items-center">
                <span className="text-xs font-bold text-sky-700">Skor Akhir</span>

                {/* Big Blue Score Pill Badge */}
                <div className="my-2 px-8 py-2 rounded-2xl bg-gradient-to-r from-sky-500 to-sky-700 text-white font-black text-2xl md:text-3xl font-bubbly shadow-md border-2 border-white">
                  {guessScore * 10}
                </div>

                <p className="text-xs font-bold text-sky-900 mt-1">
                  Kamu mendapat 3 bintang!
                </p>

                {/* 3 Golden Stars Rating */}
                <div className="flex items-center gap-2 my-2 text-2xl text-amber-400 filter drop-shadow">
                  <span>⭐</span>
                  <span>⭐</span>
                  <span>⭐</span>
                </div>

                <p className="text-xs text-sky-700 font-bold max-w-xs mt-1">
                  Kamu hebat! Terus bermain dan kumpulkan lebih banyak bintang!
                </p>

                {/* Buttons: MAIN LAGI > & KEMBALI KE BERANDA */}
                <div className="w-full flex flex-col gap-2.5 mt-5">
                  <button
                    onClick={startGuessGame}
                    className="btn-gold-3d w-full py-3 rounded-full text-amber-950 font-black text-sm tracking-wide active:scale-95 shadow"
                  >
                    MAIN LAGI &gt;
                  </button>

                  <button
                    onClick={handleBackToGamesMenu}
                    className="btn-sky-3d w-full py-3 rounded-full text-white font-black text-sm tracking-wide active:scale-95 shadow"
                  >
                    KEMBALI KE BERANDA
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ============================================================== */}
      {/* 3. GAME B: MEMORY STARS                                        */}
      {/* ============================================================== */}
      {activeGame === 'memory' && (
        <div className="mt-2">
          {!memoryFinished ? (
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between px-3 py-2 bg-white/90 rounded-2xl border-2 border-sky-200 text-xs font-black text-sky-900 shadow-sm">
                <span>🃏 Percobaan: <span className="text-sky-600">{memoryMoves}</span></span>
                <span className="flex items-center gap-1">
                  <Clock size={14} className="text-amber-500" />
                  <span>Waktu: {memoryTime}s</span>
                </span>
                <button onClick={startMemoryGame} className="p-1 text-sky-600 hover:text-sky-900">
                  <RotateCcw size={14} />
                </button>
              </div>

              <div className="grid grid-cols-3 gap-2.5">
                {memoryCards.map((card, index) => {
                  const showFront = card.isFlipped || card.isMatched;
                  return (
                    <motion.div
                      key={card.id}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleFlipCard(index)}
                      className="aspect-square cursor-pointer select-none"
                    >
                      <div
                        className={`w-full h-full rounded-2xl border-3 flex flex-col items-center justify-center transition-all duration-300 shadow-md ${
                          showFront
                            ? 'bg-gradient-to-b from-white via-sky-50 to-sky-100 border-sky-400 rotate-0'
                            : 'bg-gradient-to-b from-sky-400 to-sky-600 border-white hover:brightness-105'
                        }`}
                      >
                        {showFront ? (
                          <div className="flex flex-col items-center justify-center p-1">
                            <ZodiacAvatar id={card.zodiacId} size={48} />
                            <span className="text-[10px] font-black text-sky-900 font-bubbly mt-0.5">
                              {card.symbol}
                            </span>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center justify-center text-white">
                            <span className="text-2xl filter drop-shadow">⭐</span>
                            <span className="text-[8px] font-black tracking-widest uppercase mt-0.5 text-sky-100 font-bubbly">
                              ZODIAC
                            </span>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center text-center mt-2">
              <h1 className="text-3xl font-black text-sky-900 font-bubbly drop-shadow-[0_5px_0_#0284c7] mb-2">
                <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-sky-400 [-webkit-text-stroke:2px_#ffffff]">
                  COSMIC AWESOME!
                </span>
              </h1>
              <BlooMascot mood="dance" size={150} showDialogue={false} />
              <div className="w-full p-5 rounded-3xl bg-white border-3 border-sky-300 shadow-xl mt-2">
                <span className="text-xs font-bold text-sky-700">Skor Akhir</span>
                <div className="my-2 px-8 py-2 rounded-2xl bg-gradient-to-r from-sky-500 to-sky-700 text-white font-black text-2xl font-bubbly shadow inline-block">
                  {Math.max(100, 1000 - memoryTime * 15 - memoryMoves * 10)}
                </div>
                <div className="flex items-center justify-center gap-1.5 my-2 text-2xl text-amber-400">
                  <span>⭐</span><span>⭐</span><span>⭐</span>
                </div>
                <div className="w-full flex flex-col gap-2 mt-4">
                  <button onClick={startMemoryGame} className="btn-gold-3d w-full py-2.5 rounded-full text-amber-950 font-black text-xs active:scale-95">
                    MAIN LAGI &gt;
                  </button>
                  <button onClick={handleBackToGamesMenu} className="btn-sky-3d w-full py-2.5 rounded-full text-white font-black text-xs active:scale-95">
                    KEMBALI KE BERANDA
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ============================================================== */}
      {/* 4. GAME C: COSMIC QUIZ                                         */}
      {/* ============================================================== */}
      {activeGame === 'cosmic_quiz' && (
        <div className="mt-2">
          {!cosmicFinished ? (
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between px-3 py-2 bg-white/90 rounded-2xl border-2 border-sky-200 text-xs font-black text-sky-900 shadow-sm">
                <span>⭐ Skor: <span className="text-amber-600">{cosmicScore}</span></span>
                <span className={`flex items-center gap-1 font-black ${cosmicTimeLeft <= 4 ? 'text-rose-600 animate-pulse' : 'text-sky-700'}`}>
                  <Clock size={15} />
                  <span>00:{cosmicTimeLeft < 10 ? `0${cosmicTimeLeft}` : cosmicTimeLeft}</span>
                </span>
              </div>

              <div className="w-full h-2.5 bg-sky-200 rounded-full overflow-hidden p-0.5 border border-sky-300">
                <div
                  className={`h-full rounded-full transition-all duration-1000 ${cosmicTimeLeft <= 4 ? 'bg-rose-500' : 'bg-gradient-to-r from-sky-400 to-amber-400'}`}
                  style={{ width: `${(cosmicTimeLeft / 15) * 100}%` }}
                />
              </div>

              <div className="p-5 rounded-3xl bg-white border-3 border-sky-300 shadow-xl">
                <span className="text-[10px] font-extrabold text-sky-600 uppercase tracking-widest">
                  Soal #{cosmicIdx + 1}
                </span>
                <h2 className="text-base font-black text-sky-950 mt-1 leading-snug font-bubbly">
                  {COSMIC_QUIZ_QUESTIONS[cosmicIdx].question}
                </h2>
              </div>

              <div className="grid grid-cols-1 gap-2.5">
                {COSMIC_QUIZ_QUESTIONS[cosmicIdx].options.map((opt, idx) => {
                  const isCorrect = idx === COSMIC_QUIZ_QUESTIONS[cosmicIdx].correctIndex;
                  const isWrong = cosmicWrongAttempts.includes(idx);

                  let btnStyle = "btn-sky-3d text-white";
                  if (cosmicAnswered && isCorrect) {
                    btnStyle = "bg-emerald-500 text-white border-2 border-white shadow-emerald-400/50";
                  } else if (isWrong) {
                    btnStyle = "bg-rose-400 text-white opacity-60";
                  }

                  return (
                    <button
                      key={idx}
                      disabled={cosmicAnswered || isWrong}
                      onClick={() => handleCosmicAnswer(idx)}
                      className={`w-full py-3 px-4 rounded-2xl font-bold text-xs md:text-sm text-left transition-all active:scale-98 flex items-center justify-between ${btnStyle}`}
                    >
                      <span>
                        <span className="font-bubbly mr-2">{String.fromCharCode(65 + idx)}.</span>
                        {opt}
                      </span>
                      {cosmicAnswered && isCorrect && <Check size={16} strokeWidth={3} />}
                    </button>
                  );
                })}
              </div>

              <div className="mt-1 flex flex-col items-center">
                <BlooMascot
                  mood={cosmicFeedback === 'correct' ? 'happy' : cosmicFeedback === 'wrong' ? 'funny' : 'idle'}
                  size={110}
                  showDialogue={true}
                  feedbackText={cosmicFeedback === 'correct' ? 'YEAY! JAWABAN BENAR! ✨' : cosmicFeedback === 'wrong' ? 'UPS! COBA LAGI! 💙' : null}
                  interactive={true}
                />

                {cosmicAnswered && (
                  <button
                    onClick={handleNextCosmicQ}
                    className="mt-2 btn-gold-3d px-8 py-2 rounded-full text-xs font-black text-amber-950 active:scale-95 shadow"
                  >
                    {cosmicIdx + 1 < COSMIC_QUIZ_QUESTIONS.length ? 'Soal Berikutnya >' : 'Selesai 🏆'}
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center text-center mt-2">
              <h1 className="text-3xl font-black text-sky-900 font-bubbly drop-shadow-[0_5px_0_#0284c7] mb-2">
                <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-sky-400 [-webkit-text-stroke:2px_#ffffff]">
                  COSMIC AWESOME!
                </span>
              </h1>
              <BlooMascot mood="dance" size={150} showDialogue={false} />
              <div className="w-full p-5 rounded-3xl bg-white border-3 border-sky-300 shadow-xl mt-2">
                <span className="text-xs font-bold text-sky-700">Skor Akhir</span>
                <div className="my-2 px-8 py-2 rounded-2xl bg-gradient-to-r from-sky-500 to-sky-700 text-white font-black text-2xl font-bubbly shadow inline-block">
                  {cosmicScore * 10}
                </div>
                <div className="flex items-center justify-center gap-1.5 my-2 text-2xl text-amber-400">
                  <span>⭐</span><span>⭐</span><span>⭐</span>
                </div>
                <div className="w-full flex flex-col gap-2 mt-4">
                  <button onClick={startCosmicQuiz} className="btn-gold-3d w-full py-2.5 rounded-full text-amber-950 font-black text-xs active:scale-95">
                    MAIN LAGI &gt;
                  </button>
                  <button onClick={handleBackToGamesMenu} className="btn-sky-3d w-full py-2.5 rounded-full text-white font-black text-xs active:scale-95">
                    KEMBALI KE BERANDA
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ============================================================== */}
      {/* 5. GAME D: WHO AM I?                                           */}
      {/* ============================================================== */}
      {activeGame === 'who_am_i' && (
        <div className="mt-2">
          {!whoFinished ? (
            <div className="flex flex-col gap-3">
              <div className="p-4 rounded-3xl bg-white border-3 border-sky-300 shadow-xl">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-black text-sky-600 uppercase tracking-widest font-bubbly">
                    Teka-Teki #{whoRiddleIndex + 1}
                  </span>
                  <span className="text-[10px] font-extrabold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">
                    {whoCluesRevealed === 1 ? 'Nilai: 30 ⭐' : whoCluesRevealed === 2 ? 'Nilai: 20 ⭐' : 'Nilai: 10 ⭐'}
                  </span>
                </div>

                <div className="flex flex-col gap-2">
                  {WHO_AM_I_ROSTER[whoRiddleIndex].clues.slice(0, whoCluesRevealed).map((clue, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="p-2.5 rounded-xl bg-sky-50 border border-sky-200 text-xs font-bold text-sky-950 leading-relaxed"
                    >
                      {clue}
                    </motion.div>
                  ))}
                </div>

                {whoCluesRevealed < 3 && whoResult !== 'correct' && (
                  <button
                    onClick={handleRevealNextClue}
                    className="mt-3 text-xs font-bold text-sky-700 hover:text-sky-900 underline flex items-center gap-1"
                  >
                    <span>💡 Butuh petunjuk tambahan? (+Buka Petunjuk)</span>
                  </button>
                )}
              </div>

              {/* Roster of 12 Zodiacs */}
              <div className="p-3 bg-white/95 rounded-3xl border-2 border-sky-200 shadow-md">
                <p className="text-[11px] font-black text-sky-900 text-center mb-2 font-bubbly">
                  Tebak Zodiak yang Dimaksud Bloo:
                </p>
                <div className="grid grid-cols-4 gap-2">
                  {ZODIAC_LIST.map(z => {
                    const isSelected = whoSelectedSign === z.id;
                    const isCorrectSign = z.id === WHO_AM_I_ROSTER[whoRiddleIndex].id;
                    const isWrong = whoWrongSigns.includes(z.id);

                    let btnStyle = "bg-sky-50 border-sky-200 hover:bg-sky-100";
                    if (whoResult === 'correct' && isCorrectSign) {
                      btnStyle = "bg-emerald-100 border-emerald-500 font-black";
                    } else if (isWrong) {
                      btnStyle = "bg-rose-100 border-rose-300 opacity-60";
                    }

                    return (
                      <button
                        key={z.id}
                        disabled={whoResult === 'correct' || isWrong}
                        onClick={() => handleGuessWho(z.id)}
                        className={`p-2 rounded-2xl border-2 flex flex-col items-center justify-center transition-all active:scale-95 ${btnStyle}`}
                      >
                        <ZodiacAvatar id={z.id} size={36} />
                        <span className="text-[10px] font-black text-sky-950 truncate mt-0.5">
                          {z.name}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Bloo below */}
              <div className="mt-1 flex flex-col items-center">
                <BlooMascot
                  mood={whoResult === 'correct' ? 'happy' : whoResult === 'wrong' ? 'funny' : 'idle'}
                  size={110}
                  showDialogue={true}
                  feedbackText={whoResult === 'correct' ? 'YEAY! JAWABAN BENAR! ✨' : whoResult === 'wrong' ? 'UPS! COBA LAGI! 💙' : null}
                  interactive={true}
                />

                {whoResult === 'correct' && (
                  <button
                    onClick={handleNextWhoRiddle}
                    className="mt-2 btn-gold-3d px-8 py-2 rounded-full text-xs font-black text-amber-950 active:scale-95 shadow"
                  >
                    {whoRiddleIndex + 1 < WHO_AM_I_ROSTER.length ? 'Teka-Teki Berikutnya >' : 'Selesai 🏆'}
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center text-center mt-2">
              <h1 className="text-3xl font-black text-sky-900 font-bubbly drop-shadow-[0_5px_0_#0284c7] mb-2">
                <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-sky-400 [-webkit-text-stroke:2px_#ffffff]">
                  COSMIC AWESOME!
                </span>
              </h1>
              <BlooMascot mood="dance" size={150} showDialogue={false} />
              <div className="w-full p-5 rounded-3xl bg-white border-3 border-sky-300 shadow-xl mt-2">
                <span className="text-xs font-bold text-sky-700">Total Bintang</span>
                <div className="my-2 px-8 py-2 rounded-2xl bg-gradient-to-r from-sky-500 to-sky-700 text-white font-black text-2xl font-bubbly shadow inline-block">
                  +{whoScore} ⭐
                </div>
                <div className="flex items-center justify-center gap-1.5 my-2 text-2xl text-amber-400">
                  <span>⭐</span><span>⭐</span><span>⭐</span>
                </div>
                <div className="w-full flex flex-col gap-2 mt-4">
                  <button onClick={startWhoAmIGame} className="btn-gold-3d w-full py-2.5 rounded-full text-amber-950 font-black text-xs active:scale-95">
                    MAIN LAGI &gt;
                  </button>
                  <button onClick={handleBackToGamesMenu} className="btn-sky-3d w-full py-2.5 rounded-full text-white font-black text-xs active:scale-95">
                    KEMBALI KE BERANDA
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
