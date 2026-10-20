import React, { useState } from 'react';
import { useGame } from '../../context/GameContext';
import { ACCESSORIES } from '../../data/zodiacs';
import { BlooMascot } from '../BlooMascot';
import { ArrowLeft, ShoppingBag, Sparkles, Check, Star, Download, Heart } from 'lucide-react';
import { motion } from 'motion/react';
import { sound } from '../../utils/audio';

type ShopTab = 'accessories' | 'stickers' | 'merch';

export const ShopScreen: React.FC = () => {
  const {
    setScreen,
    stars,
    unlockedAccessories,
    equippedAccessories,
    buyAccessory,
    equipAccessory
  } = useGame();

  const [activeTab, setActiveTab] = useState<ShopTab>('accessories');
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  const handleBuy = (id: string) => {
    buyAccessory(id);
  };

  const handleEquip = (id: string) => {
    equipAccessory(id);
  };

  const handleDownloadSticker = (name: string) => {
    sound.playSfx('magic');
    setDownloadSuccess(name);
    setTimeout(() => setDownloadSuccess(null), 2500);
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
            Toko Aksesori & Kreatif
          </h1>
          <p className="text-[11px] font-bold text-sky-700">
            Hias Bloo & Jelajahi Merchandise Zodiac World!
          </p>
        </div>

        <div className="w-16" />
      </div>

      {/* Bloo Dressing Room Preview Box */}
      <div className="p-4 rounded-3xl bg-gradient-to-b from-sky-100 via-sky-50 to-white border-3 border-sky-300 shadow-xl flex flex-col items-center text-center mt-1">
        <span className="text-[10px] font-black text-sky-700 uppercase tracking-widest font-bubbly mb-1">
          Kamar Rias Bloo
        </span>
        <div className="scale-90">
          <BlooMascot size={150} showDialogue={false} interactive={true} />
        </div>
        <p className="text-[11px] font-bold text-sky-800 mt-1">
          Sentuh aksesori di bawah untuk memasang atau melepasnya pada Bloo!
        </p>
      </div>

      {/* Tabs: Aksesori Bloo | Stiker Digital | Ide Merchandise */}
      <div className="flex items-center gap-1 mt-3 p-1 bg-sky-200/50 rounded-2xl">
        <button
          onClick={() => {
            sound.playSfx('click');
            setActiveTab('accessories');
          }}
          className={`flex-1 py-1.5 text-xs font-bold rounded-xl transition-all ${
            activeTab === 'accessories'
              ? 'bg-white text-sky-900 shadow-sm font-black'
              : 'text-sky-700 hover:text-sky-950'
          }`}
        >
          Aksesori Virtual
        </button>
        <button
          onClick={() => {
            sound.playSfx('click');
            setActiveTab('stickers');
          }}
          className={`flex-1 py-1.5 text-xs font-bold rounded-xl transition-all ${
            activeTab === 'stickers'
              ? 'bg-white text-sky-900 shadow-sm font-black'
              : 'text-sky-700 hover:text-sky-950'
          }`}
        >
          Stiker Digital
        </button>
        <button
          onClick={() => {
            sound.playSfx('click');
            setActiveTab('merch');
          }}
          className={`flex-1 py-1.5 text-xs font-bold rounded-xl transition-all ${
            activeTab === 'merch'
              ? 'bg-white text-sky-900 shadow-sm font-black'
              : 'text-sky-700 hover:text-sky-950'
          }`}
        >
          Merchandise
        </button>
      </div>

      {/* TAB 1: AKSESORI VIRTUAL */}
      {activeTab === 'accessories' && (
        <div className="grid grid-cols-2 gap-3 mt-3">
          {ACCESSORIES.map((item) => {
            const isOwned = unlockedAccessories.includes(item.id);
            const isEquipped = equippedAccessories[item.category] === item.id;

            return (
              <motion.div
                key={item.id}
                whileHover={{ scale: 1.02 }}
                className={`p-3 rounded-3xl border-3 flex flex-col items-center text-center shadow-md ${
                  isEquipped
                    ? 'bg-amber-50/90 border-amber-400 shadow-amber-200/40'
                    : isOwned
                    ? 'bg-white border-sky-300'
                    : 'bg-sky-50 border-sky-200'
                }`}
              >
                <div className="w-12 h-12 rounded-2xl bg-sky-100 border-2 border-sky-200 flex items-center justify-center text-2xl mb-1 shadow-inner">
                  {item.icon}
                </div>

                <h4 className="text-xs font-black text-sky-950 font-bubbly leading-snug">
                  {item.name}
                </h4>
                <p className="text-[10px] text-sky-600 font-semibold my-1">
                  {item.description}
                </p>

                {isOwned ? (
                  <button
                    onClick={() => handleEquip(item.id)}
                    className={`mt-auto w-full py-1.5 rounded-full text-[10px] font-black transition-all active:scale-95 shadow ${
                      isEquipped
                        ? 'bg-amber-400 text-amber-950 border border-amber-500'
                        : 'bg-sky-500 text-white hover:bg-sky-600'
                    }`}
                  >
                    {isEquipped ? '✓ Terpasang di Bloo' : 'Pakai Aksesori'}
                  </button>
                ) : (
                  <button
                    onClick={() => handleBuy(item.id)}
                    disabled={stars < item.cost}
                    className={`mt-auto w-full py-1.5 rounded-full text-[10px] font-black flex items-center justify-center gap-1 transition-all active:scale-95 shadow ${
                      stars >= item.cost
                        ? 'btn-gold-3d text-amber-950'
                        : 'bg-sky-200 text-sky-500 cursor-not-allowed'
                    }`}
                  >
                    <Star size={11} className="fill-amber-400" />
                    <span>Beli (⭐ {item.cost})</span>
                  </button>
                )}
              </motion.div>
            );
          })}
        </div>
      )}

      {/* TAB 2: STIKER DIGITAL */}
      {activeTab === 'stickers' && (
        <div className="mt-3 space-y-3">
          <div className="p-3 bg-white/90 rounded-2xl border-2 border-sky-200 text-xs text-sky-800 leading-relaxed shadow-sm">
            Koleksi paket stiker digital kawaii resmi Zodiac World untuk WhatsApp, Telegram, dan media sosial!
          </div>

          <div className="grid grid-cols-2 gap-3">
            {[
              { id: 'stk_1', title: 'Bloo Ceria & Tertawa', icon: '⭐', desc: 'Ekspresi Bloo tertawa lepas.' },
              { id: 'stk_2', title: 'Bloo Menari Kosmik', icon: '🎉', desc: 'Bloo berputar gembira.' },
              { id: 'stk_3', title: 'Aries Semangat Membara', icon: '♈', desc: 'Domba kecil penuh api.' },
              { id: 'stk_4', title: 'Leo Mahkota Kemilau', icon: '♌', desc: 'Singa cub raja semesta.' },
              { id: 'stk_5', title: 'Pisces Ikan Berenang', icon: '♓', desc: 'Dua ikan melayang di awan.' },
              { id: 'stk_6', title: 'Bloo Mengantuk Zzz', icon: '💤', desc: 'Bloo tertidur pulas imut.' },
            ].map(sticker => (
              <div
                key={sticker.id}
                className="p-3.5 bg-white rounded-3xl border-2 border-sky-200 shadow-md flex flex-col items-center text-center"
              >
                <div className="w-14 h-14 rounded-2xl bg-sky-50 border-2 border-sky-200 flex items-center justify-center text-3xl mb-1.5 shadow-inner">
                  {sticker.icon}
                </div>
                <h4 className="text-xs font-black text-sky-950 font-bubbly">
                  {sticker.title}
                </h4>
                <p className="text-[10px] text-sky-600 font-semibold mb-2">
                  {sticker.desc}
                </p>
                <button
                  onClick={() => handleDownloadSticker(sticker.title)}
                  className="mt-auto w-full py-1.5 rounded-full bg-sky-100 hover:bg-sky-200 text-sky-900 font-extrabold text-[10px] flex items-center justify-center gap-1 active:scale-95 transition-colors"
                >
                  <Download size={12} />
                  <span>Simpan Stiker</span>
                </button>
              </div>
            ))}
          </div>

          {downloadSuccess && (
            <div className="p-3 bg-emerald-100 border-2 border-emerald-400 rounded-2xl text-center text-xs font-black text-emerald-900 animate-bounce">
              ✓ Stiker "{downloadSuccess}" siap digunakan untuk obrolanmu!
            </div>
          )}
        </div>
      )}

      {/* TAB 3: PELUANG BISNIS KREATIF & MERCHANDISE */}
      {activeTab === 'merch' && (
        <div className="mt-3 space-y-3">
          <div className="p-3.5 bg-gradient-to-r from-sky-50 via-white to-amber-50 rounded-2xl border-2 border-sky-200 text-xs text-sky-900 leading-relaxed shadow-sm">
            <h4 className="font-black text-sky-950 font-bubbly mb-1 flex items-center gap-1.5">
              <Sparkles size={14} className="text-amber-500" />
              <span>Konsep Merchandise Resmi Zodiac World</span>
            </h4>
            Rancangan merchandise eksklusif ramah anak dan remaja yang siap dikembangkan menjadi lini produk kreatif fisik maupun kolaborasi bisnis!
          </div>

          <div className="space-y-2.5">
            {[
              {
                title: 'Boneka Plushie Bloo (Ukuran 25cm)',
                desc: 'Boneka kain bulu super lembut berbahan premium dengan bintang emas bersulam di kepala dan perut.',
                tag: 'Pre-Production Concept',
                badge: '🧸 Plushie'
              },
              {
                title: 'Gantungan Kunci Akrilik 12 Karakter Zodiak',
                desc: 'Gantungan kunci akrilik 2 sisi dengan lapisan glitter hologram dan kait bintang emas.',
                tag: 'Komunitas & Koleksi',
                badge: '✨ Acrylic Keyring'
              },
              {
                title: 'Pin Logam Enamel Bintang Kosmik',
                desc: 'Pin logam bersepuh emas dengan cat enamel biru cerah untuk tas dan jaket.',
                tag: 'Fashion Aksesori',
                badge: '🎖️ Enamel Pin'
              },
              {
                title: 'Buku Jurnal & Stiker Planner Astrologi',
                desc: 'Buku harian cantik dengan ilustrasi pulau-pulau zodiak dan lembaran stiker warna-warni.',
                tag: 'Stationery Kreatif',
                badge: '📔 Journal Book'
              }
            ].map((item, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-2xl bg-white border-2 border-sky-200 shadow-sm flex items-start justify-between gap-3"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-black text-sky-700 bg-sky-100 px-2 py-0.5 rounded-full">
                      {item.badge}
                    </span>
                    <span className="text-[9px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full">
                      {item.tag}
                    </span>
                  </div>
                  <h4 className="text-xs md:text-sm font-black text-sky-950 font-bubbly">
                    {item.title}
                  </h4>
                  <p className="text-[11px] text-sky-700 leading-relaxed mt-0.5">
                    {item.desc}
                  </p>
                </div>
                <div className="shrink-0 text-amber-400 mt-1">
                  <Heart size={18} className="fill-amber-300 stroke-amber-500" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
