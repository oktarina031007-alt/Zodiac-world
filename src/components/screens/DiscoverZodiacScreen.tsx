import React, { useState } from 'react';
import { useGame } from '../../context/GameContext';
import { ZODIAC_LIST } from '../../data/zodiacs';
import { ZodiacSign } from '../../types/game';
import { ZodiacAvatar } from '../ZodiacAvatars';
import { ArrowLeft, Sparkles, Gift, Check, Volume2, VolumeX } from 'lucide-react';
import { motion } from 'motion/react';
import { sound } from '../../utils/audio';

const MONTHS = [
  { value: 0, label: '01 (Januari)' },
  { value: 1, label: '02 (Februari)' },
  { value: 2, label: '03 (Maret)' },
  { value: 3, label: '04 (April)' },
  { value: 4, label: '05 (Mei)' },
  { value: 5, label: '06 (Juni)' },
  { value: 6, label: '07 (Juli)' },
  { value: 7, label: '08 (Agustus)' },
  { value: 8, label: '09 (September)' },
  { value: 9, label: '10 (Oktober)' },
  { value: 10, label: '11 (November)' },
  { value: 11, label: '12 (Desember)' }
];

export const DiscoverZodiacScreen: React.FC = () => {
  const {
    setScreen,
    soundSettings,
    updateSoundSettings,
    claimDailyBlessing,
    dailyBlessingClaimed,
    setBlooMood,
    speakBlooText
  } = useGame();

  const [selectedDay, setSelectedDay] = useState<number>(12);
  const [selectedMonth, setSelectedMonth] = useState<number>(7); // Agustus (index 7 = 08)
  const [resultSign, setResultSign] = useState<ZodiacSign>(() => ZODIAC_LIST.find(z => z.id === 'leo') || ZODIAC_LIST[4]);

  const computeZodiac = (day: number, monthIndex: number): ZodiacSign => {
    const month = monthIndex + 1; // 1 to 12

    if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) {
      return ZODIAC_LIST.find(z => z.id === 'aries')!;
    } else if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) {
      return ZODIAC_LIST.find(z => z.id === 'taurus')!;
    } else if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) {
      return ZODIAC_LIST.find(z => z.id === 'gemini')!;
    } else if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) {
      return ZODIAC_LIST.find(z => z.id === 'cancer')!;
    } else if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) {
      return ZODIAC_LIST.find(z => z.id === 'leo')!;
    } else if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) {
      return ZODIAC_LIST.find(z => z.id === 'virgo')!;
    } else if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) {
      return ZODIAC_LIST.find(z => z.id === 'libra')!;
    } else if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) {
      return ZODIAC_LIST.find(z => z.id === 'scorpio')!;
    } else if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) {
      return ZODIAC_LIST.find(z => z.id === 'sagittarius')!;
    } else if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) {
      return ZODIAC_LIST.find(z => z.id === 'capricorn')!;
    } else if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) {
      return ZODIAC_LIST.find(z => z.id === 'aquarius')!;
    } else {
      return ZODIAC_LIST.find(z => z.id === 'pisces')!;
    }
  };

  const handleCalculate = () => {
    sound.playSfx('magic');
    const matched = computeZodiac(selectedDay, selectedMonth);
    setResultSign(matched);
    setBlooMood('happy');
    speakBlooText(`Wah! Kamu dinaungi oleh rasi bintang ${matched.name} (${matched.symbol})! Teman kosmik yang sangat istimewa! ⭐`);
  };

  return (
    <div className="relative w-full max-w-lg mx-auto min-h-[calc(100vh-65px)] pb-28 px-4 select-none">
      {/* Header (Matching Frame 6) */}
      <div className="flex items-center justify-between py-2">
        <div className="w-8" />
        <div className="text-center">
          <h1 className="text-xl md:text-2xl font-black text-sky-950 font-bubbly drop-shadow-sm">
            Discover My Zodiac
          </h1>
          <p className="text-xs font-bold text-sky-700">
            Masukkan tanggal lahir kamu
          </p>
        </div>
        <button
          onClick={() => updateSoundSettings({ voice: !soundSettings.voice })}
          className="w-8 h-8 rounded-full bg-sky-500 border-2 border-white text-white flex items-center justify-center shadow active:scale-90"
        >
          {soundSettings.voice ? <Volume2 size={16} /> : <VolumeX size={16} />}
        </button>
      </div>

      {/* Date Selector Box (Matching Frame 6) */}
      <div className="p-4 rounded-3xl bg-white/95 border-3 border-sky-300 shadow-xl mt-1">
        <div className="grid grid-cols-2 gap-3">
          {/* Day Selector */}
          <div>
            <label className="block text-[11px] font-bold text-sky-700 mb-1">
              Tanggal
            </label>
            <select
              value={selectedDay}
              onChange={(e) => setSelectedDay(Number(e.target.value))}
              className="w-full p-2.5 rounded-2xl bg-sky-50 border-2 border-sky-200 text-sky-950 font-black text-xs md:text-sm focus:outline-none focus:border-sky-400"
            >
              {Array.from({ length: 31 }, (_, i) => i + 1).map((d) => (
                <option key={d} value={d}>
                  {d < 10 ? `0${d}` : d}
                </option>
              ))}
            </select>
          </div>

          {/* Month Selector */}
          <div>
            <label className="block text-[11px] font-bold text-sky-700 mb-1">
              Bulan
            </label>
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(Number(e.target.value))}
              className="w-full p-2.5 rounded-2xl bg-sky-50 border-2 border-sky-200 text-sky-950 font-black text-xs md:text-sm focus:outline-none focus:border-sky-400"
            >
              {MONTHS.map((m) => (
                <option key={m.value} value={m.value}>
                  {m.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Cari Zodiak Button */}
        <button
          onClick={handleCalculate}
          className="mt-3.5 btn-sky-3d w-full py-3 rounded-full text-white font-black text-xs md:text-sm flex items-center justify-center gap-1.5 active:scale-95 shadow"
        >
          <span>Cari Zodiak</span>
        </button>
      </div>

      {/* Result Display Card (Matching Frame 6 in Master Sheet) */}
      {resultSign && (
        <motion.div
          key={resultSign.id}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-4 p-5 rounded-3xl bg-white/95 border-3 border-sky-300 shadow-2xl flex flex-col items-center text-center"
        >
          {/* Avatar and Zodiac Symbol badge */}
          <div className="relative">
            <div className="p-2.5 rounded-2xl bg-sky-50 border-2 border-sky-200">
              <ZodiacAvatar id={resultSign.id} size={84} showCrown={resultSign.id === 'leo'} />
            </div>
            <div className="absolute -bottom-1 -right-2 w-7 h-7 rounded-full bg-sky-500 border-2 border-white text-white flex items-center justify-center font-black text-xs shadow">
              {resultSign.symbol}
            </div>
          </div>

          <h2 className="text-lg md:text-xl font-black text-sky-950 font-bubbly mt-2.5">
            {resultSign.name}
          </h2>
          <p className="text-xs font-bold text-sky-700">
            ({resultSign.dates})
          </p>

          {/* 3 Trait pills */}
          <div className="flex flex-wrap justify-center gap-1.5 mt-2.5">
            {resultSign.traits.slice(0, 3).map((t) => (
              <span
                key={t}
                className="text-[10px] font-bold px-3 py-1 rounded-full bg-sky-100 text-sky-800 border border-sky-200"
              >
                {t}
              </span>
            ))}
          </div>

          {/* Inspiring positive personality description */}
          <p className="text-xs text-sky-800 font-medium leading-relaxed mt-3 px-2">
            Kamu adalah sosok yang berani, penuh semangat, dan selalu membawa keceriaan. Jangan lupa untuk tetap menjadi diri sendiri, ya!
          </p>

          {/* Disclaimer box (Matching Frame 6) */}
          <div className="mt-3.5 p-3 rounded-2xl bg-amber-50/80 border border-amber-200 text-[10px] text-amber-900 font-medium leading-relaxed text-center">
            Informasi astrologi ini hanya untuk hiburan dan bukan penilaian ilmiah terhadap kepribadian seseorang.
          </div>
        </motion.div>
      )}

      {/* Daily Cosmic Blessing Claim Box */}
      <div className="mt-3 p-3.5 rounded-2xl bg-gradient-to-r from-amber-50 via-white to-sky-50 border-2 border-amber-300 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Gift size={20} className="text-amber-500" />
          <span className="text-xs font-black text-sky-950 font-bubbly">
            Berkah Kosmik Harian (+20 ⭐)
          </span>
        </div>
        <button
          disabled={dailyBlessingClaimed}
          onClick={claimDailyBlessing}
          className={`px-3 py-1 rounded-full text-xs font-black transition-all ${
            dailyBlessingClaimed
              ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
              : 'btn-gold-3d text-amber-950'
          }`}
        >
          {dailyBlessingClaimed ? <span className="flex items-center gap-1"><Check size={11} /> Sudah Klaim</span> : 'Klaim'}
        </button>
      </div>

      {/* Bottom Back Button: < Kembali (Matching Frame 6) */}
      <div className="mt-3 flex justify-start">
        <button
          onClick={() => setScreen('home')}
          className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-gradient-to-r from-sky-400 to-sky-600 text-white font-extrabold text-xs shadow-md border-2 border-white active:scale-95 transition-transform"
        >
          <ArrowLeft size={16} />
          <span>Kembali</span>
        </button>
      </div>
    </div>
  );
};
