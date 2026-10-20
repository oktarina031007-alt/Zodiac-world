import React from 'react';

interface ZodiacAvatarProps {
  id: string;
  size?: number;
  className?: string;
  showCrown?: boolean;
  showCape?: boolean;
}

export const ZodiacAvatar: React.FC<ZodiacAvatarProps> = ({
  id,
  size = 80,
  className = '',
  showCrown = false,
  showCape = false
}) => {
  const renderAvatarContent = () => {
    switch (id) {
      case 'aries':
        // Domba Kecil Pemberani (Curly golden horns, fluffy fleece, pink blush)
        return (
          <g>
            {/* Fluffy sheep ears/fleece back */}
            <circle cx="28" cy="46" r="14" fill="#f0f9ff" />
            <circle cx="72" cy="46" r="14" fill="#f0f9ff" />
            <circle cx="36" cy="30" r="16" fill="#f0f9ff" />
            <circle cx="64" cy="30" r="16" fill="#f0f9ff" />
            <circle cx="50" cy="24" r="16" fill="#ffffff" />
            {/* Golden horns */}
            <path d="M 28 32 C 16 20, 8 38, 22 46 C 26 42, 28 36, 28 32 Z" fill="#facc15" stroke="#ca8a04" strokeWidth="2" />
            <path d="M 72 32 C 84 20, 92 38, 78 46 C 74 42, 72 36, 72 32 Z" fill="#facc15" stroke="#ca8a04" strokeWidth="2" />
            {/* Head */}
            <ellipse cx="50" cy="54" rx="26" ry="24" fill="#ffffff" stroke="#bae6fd" strokeWidth="2" />
            {/* Eyes */}
            <ellipse cx="40" cy="52" rx="4.5" ry="6" fill="#0c4a6e" />
            <circle cx="38.5" cy="50" r="2" fill="#ffffff" />
            <ellipse cx="60" cy="52" rx="4.5" ry="6" fill="#0c4a6e" />
            <circle cx="58.5" cy="50" r="2" fill="#ffffff" />
            {/* Pink blush */}
            <circle cx="32" cy="60" r="4.5" fill="#fbcfe8" opacity="0.85" />
            <circle cx="68" cy="60" r="4.5" fill="#fbcfe8" opacity="0.85" />
            {/* Nose/mouth */}
            <path d="M 47 58 Q 50 62 53 58" stroke="#38bdf8" strokeWidth="2" fill="none" strokeLinecap="round" />
            {/* Forehead sheep fleece puff */}
            <circle cx="50" cy="36" r="10" fill="#ffffff" />
            <circle cx="42" cy="38" r="8" fill="#ffffff" />
            <circle cx="58" cy="38" r="8" fill="#ffffff" />
            {/* Tiny gold bell */}
            <circle cx="50" cy="74" r="5" fill="#facc15" stroke="#ca8a04" strokeWidth="1.5" />
          </g>
        );

      case 'taurus':
        // Banteng Menggemaskan (Cute bull horns, sweet muzzle, clover)
        return (
          <g>
            {/* Golden curved horns */}
            <path d="M 26 38 C 16 24, 24 12, 34 22 C 30 28, 28 32, 26 38 Z" fill="#facc15" stroke="#ca8a04" strokeWidth="2" />
            <path d="M 74 38 C 84 24, 76 12, 66 22 C 70 28, 72 32, 74 38 Z" fill="#facc15" stroke="#ca8a04" strokeWidth="2" />
            {/* Ears */}
            <ellipse cx="22" cy="46" rx="8" ry="5" fill="#93c5fd" transform="rotate(-15 22 46)" />
            <ellipse cx="78" cy="46" rx="8" ry="5" fill="#93c5fd" transform="rotate(15 78 46)" />
            {/* Head */}
            <ellipse cx="50" cy="52" rx="28" ry="26" fill="#e0f2fe" stroke="#38bdf8" strokeWidth="2.5" />
            {/* Eyes */}
            <ellipse cx="38" cy="48" rx="4.5" ry="6" fill="#0c4a6e" />
            <circle cx="36.5" cy="46" r="2" fill="#ffffff" />
            <ellipse cx="62" cy="48" rx="4.5" ry="6" fill="#0c4a6e" />
            <circle cx="60.5" cy="46" r="2" fill="#ffffff" />
            {/* Soft pink snout */}
            <ellipse cx="50" cy="62" rx="15" ry="11" fill="#fed7aa" stroke="#fbbf24" strokeWidth="1.5" />
            <circle cx="45" cy="61" r="2" fill="#d97706" />
            <circle cx="55" cy="61" r="2" fill="#d97706" />
            <path d="M 47 67 Q 50 70 53 67" stroke="#b45309" strokeWidth="1.8" fill="none" strokeLinecap="round" />
            {/* Blush */}
            <circle cx="30" cy="58" r="4.5" fill="#fbcfe8" opacity="0.8" />
            <circle cx="70" cy="58" r="4.5" fill="#fbcfe8" opacity="0.8" />
            {/* Clover hair flower */}
            <circle cx="66" cy="30" r="4" fill="#38bdf8" />
            <circle cx="62" cy="27" r="4" fill="#38bdf8" />
            <circle cx="66" cy="24" r="4" fill="#38bdf8" />
            <circle cx="64" cy="28" r="2" fill="#facc15" />
          </g>
        );

      case 'gemini':
        // Sepasang Kembar Ceria
        return (
          <g>
            {/* Twin 1 (Left) */}
            <circle cx="36" cy="50" r="20" fill="#e0f2fe" stroke="#38bdf8" strokeWidth="2" />
            <ellipse cx="30" cy="48" rx="3.5" ry="4.5" fill="#0c4a6e" />
            <circle cx="29" cy="46.5" r="1.5" fill="#ffffff" />
            <ellipse cx="42" cy="48" rx="3.5" ry="4.5" fill="#0c4a6e" />
            <circle cx="41" cy="46.5" r="1.5" fill="#ffffff" />
            <path d="M 33 55 Q 36 58 39 55" stroke="#0284c7" strokeWidth="2" fill="none" strokeLinecap="round" />
            <circle cx="24" cy="54" r="3.5" fill="#fbcfe8" />
            {/* Star hat twin 1 */}
            <polygon points="36,20 40,28 48,29 42,35 44,43 36,38 28,43 30,35 24,29 32,28" fill="#facc15" stroke="#ca8a04" strokeWidth="1" transform="scale(0.6) translate(24, 10)" />

            {/* Twin 2 (Right) */}
            <circle cx="64" cy="52" r="20" fill="#f0f9ff" stroke="#38bdf8" strokeWidth="2" />
            <ellipse cx="58" cy="50" rx="3.5" ry="4.5" fill="#0c4a6e" />
            <circle cx="57" cy="48.5" r="1.5" fill="#ffffff" />
            <ellipse cx="70" cy="50" rx="3.5" ry="4.5" fill="#0c4a6e" />
            <circle cx="69" cy="48.5" r="1.5" fill="#ffffff" />
            <path d="M 61 57 Q 64 60 67 57" stroke="#0284c7" strokeWidth="2" fill="none" strokeLinecap="round" />
            <circle cx="76" cy="56" r="3.5" fill="#fbcfe8" />
            {/* Little starlight wand */}
            <circle cx="50" cy="38" r="4" fill="#38bdf8" />
          </g>
        );

      case 'cancer':
        // Kepiting Mutiara Pemalu
        return (
          <g>
            {/* Crab claws */}
            <path d="M 20 46 C 10 36, 12 22, 24 28 C 22 36, 26 40, 20 46 Z" fill="#38bdf8" stroke="#0284c7" strokeWidth="2" />
            <path d="M 80 46 C 90 36, 88 22, 76 28 C 78 36, 74 40, 80 46 Z" fill="#38bdf8" stroke="#0284c7" strokeWidth="2" />
            {/* Round Crab Body */}
            <ellipse cx="50" cy="55" rx="28" ry="23" fill="#bae6fd" stroke="#0284c7" strokeWidth="2.5" />
            {/* Stalk eyes */}
            <rect x="36" y="28" width="5" height="12" rx="2.5" fill="#38bdf8" />
            <circle cx="38.5" cy="27" r="7" fill="#ffffff" stroke="#0284c7" strokeWidth="2" />
            <circle cx="39" cy="27" r="4" fill="#0c4a6e" />
            <circle cx="37.5" cy="25.5" r="1.5" fill="#ffffff" />

            <rect x="59" y="28" width="5" height="12" rx="2.5" fill="#38bdf8" />
            <circle cx="61.5" cy="27" r="7" fill="#ffffff" stroke="#0284c7" strokeWidth="2" />
            <circle cx="61" cy="27" r="4" fill="#0c4a6e" />
            <circle cx="59.5" cy="25.5" r="1.5" fill="#ffffff" />

            {/* Pink cheeks */}
            <circle cx="32" cy="58" r="4.5" fill="#fbcfe8" />
            <circle cx="68" cy="58" r="4.5" fill="#fbcfe8" />
            {/* Cute shy mouth */}
            <ellipse cx="50" cy="60" rx="3.5" ry="3" fill="#0284c7" />
            {/* Belly pearl shell mark */}
            <circle cx="50" cy="68" r="4.5" fill="#ffffff" stroke="#facc15" strokeWidth="1.5" />
          </g>
        );

      case 'leo':
        // Singa Mahkota Emas
        return (
          <g>
            {/* Fluffy golden-orange mane */}
            <circle cx="50" cy="52" r="34" fill="#fed7aa" stroke="#f59e0b" strokeWidth="2" />
            <circle cx="28" cy="38" r="12" fill="#fbbf24" />
            <circle cx="72" cy="38" r="12" fill="#fbbf24" />
            <circle cx="22" cy="56" r="12" fill="#fbbf24" />
            <circle cx="78" cy="56" r="12" fill="#fbbf24" />
            <circle cx="32" cy="74" r="12" fill="#fbbf24" />
            <circle cx="68" cy="74" r="12" fill="#fbbf24" />
            {/* Face */}
            <ellipse cx="50" cy="55" rx="24" ry="22" fill="#fef3c7" stroke="#d97706" strokeWidth="2" />
            {/* Golden Crown */}
            <polygon points="40,26 44,14 50,22 56,14 60,26" fill="#facc15" stroke="#ca8a04" strokeWidth="1.5" />
            <circle cx="50" cy="18" r="2" fill="#38bdf8" />
            {/* Eyes */}
            <ellipse cx="41" cy="52" rx="4.5" ry="6" fill="#0c4a6e" />
            <circle cx="39.5" cy="50" r="2" fill="#ffffff" />
            <ellipse cx="59" cy="52" rx="4.5" ry="6" fill="#0c4a6e" />
            <circle cx="57.5" cy="50" r="2" fill="#ffffff" />
            {/* Cheeks */}
            <circle cx="33" cy="60" r="4.5" fill="#fbcfe8" />
            <circle cx="67" cy="60" r="4.5" fill="#fbcfe8" />
            {/* Muzzle */}
            <circle cx="50" cy="61" r="2.5" fill="#b45309" />
            <path d="M 46 64 Q 50 67 54 64" stroke="#b45309" strokeWidth="1.8" fill="none" strokeLinecap="round" />
          </g>
        );

      case 'virgo':
        // Peri Bintang Teliti
        return (
          <g>
            {/* Starlight fairy wings */}
            <ellipse cx="26" cy="46" rx="14" ry="20" fill="#e0f2fe" opacity="0.8" transform="rotate(-25 26 46)" />
            <ellipse cx="74" cy="46" rx="14" ry="20" fill="#e0f2fe" opacity="0.8" transform="rotate(25 74 46)" />
            {/* Hair */}
            <ellipse cx="50" cy="48" rx="26" ry="26" fill="#38bdf8" />
            {/* Face */}
            <ellipse cx="50" cy="52" rx="22" ry="21" fill="#ffffff" stroke="#bae6fd" strokeWidth="2" />
            {/* Bangs */}
            <path d="M 28 42 Q 50 48 72 42 Q 50 34 28 42 Z" fill="#38bdf8" />
            {/* Eyes with glasses */}
            <circle cx="41" cy="52" r="7" fill="none" stroke="#0284c7" strokeWidth="1.8" />
            <circle cx="59" cy="52" r="7" fill="none" stroke="#0284c7" strokeWidth="1.8" />
            <line x1="48" y1="52" x2="52" y2="52" stroke="#0284c7" strokeWidth="1.8" />
            <ellipse cx="41" cy="52" rx="3" ry="4" fill="#0c4a6e" />
            <ellipse cx="59" cy="52" rx="3" ry="4" fill="#0c4a6e" />
            <circle cx="40" cy="50.5" r="1.2" fill="#ffffff" />
            <circle cx="58" cy="50.5" r="1.2" fill="#ffffff" />
            {/* Cheeks */}
            <circle cx="32" cy="59" r="4" fill="#fbcfe8" />
            <circle cx="68" cy="59" r="4" fill="#fbcfe8" />
            {/* Smile */}
            <path d="M 47 62 Q 50 65 53 62" stroke="#0284c7" strokeWidth="1.8" fill="none" strokeLinecap="round" />
            {/* Star hairpin */}
            <polygon points="68,34 70,39 75,39 71,42 73,47 68,44 64,47 65,42 61,39 66,39" fill="#facc15" />
          </g>
        );

      case 'libra':
        // Penjaga Keseimbangan
        return (
          <g>
            {/* Celestial aura */}
            <circle cx="50" cy="50" r="32" fill="#f0f9ff" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="3 3" />
            {/* Face */}
            <ellipse cx="50" cy="46" rx="22" ry="21" fill="#ffffff" stroke="#bae6fd" strokeWidth="2" />
            {/* Eyes */}
            <ellipse cx="42" cy="44" rx="4" ry="5.5" fill="#0c4a6e" />
            <circle cx="41" cy="42.5" r="1.8" fill="#ffffff" />
            <ellipse cx="58" cy="44" rx="4" ry="5.5" fill="#0c4a6e" />
            <circle cx="57" cy="42.5" r="1.8" fill="#ffffff" />
            <circle cx="34" cy="50" r="4" fill="#fbcfe8" />
            <circle cx="66" cy="50" r="4" fill="#fbcfe8" />
            <path d="M 47 52 Q 50 55 53 52" stroke="#0284c7" strokeWidth="1.8" fill="none" strokeLinecap="round" />
            {/* Golden Balance Scales held */}
            <line x1="30" y1="68" x2="70" y2="68" stroke="#ca8a04" strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="50" cy="68" r="3.5" fill="#facc15" stroke="#ca8a04" strokeWidth="1.5" />
            {/* Pan Left */}
            <line x1="34" y1="68" x2="31" y2="76" stroke="#ca8a04" strokeWidth="1.5" />
            <line x1="34" y1="68" x2="37" y2="76" stroke="#ca8a04" strokeWidth="1.5" />
            <path d="M 28 76 Q 34 81 40 76 Z" fill="#facc15" stroke="#ca8a04" strokeWidth="1" />
            {/* Pan Right */}
            <line x1="66" y1="68" x2="63" y2="76" stroke="#ca8a04" strokeWidth="1.5" />
            <line x1="66" y1="68" x2="69" y2="76" stroke="#ca8a04" strokeWidth="1.5" />
            <path d="M 60 76 Q 66 81 72 76 Z" fill="#facc15" stroke="#ca8a04" strokeWidth="1" />
          </g>
        );

      case 'scorpio':
        // Kalajengking Kristal
        return (
          <g>
            {/* Tail looping behind */}
            <path d="M 50 70 C 80 72, 85 40, 70 24 C 64 16, 52 18, 56 26" fill="none" stroke="#0284c7" strokeWidth="6" strokeLinecap="round" />
            {/* Stardust Stinger tip */}
            <polygon points="56,22 62,28 50,29" fill="#facc15" stroke="#ca8a04" strokeWidth="1.5" />
            {/* Round Body */}
            <ellipse cx="50" cy="54" rx="26" ry="24" fill="#0369a1" stroke="#38bdf8" strokeWidth="2.5" />
            {/* Crystal armor ridges */}
            <path d="M 36 46 Q 50 42 64 46" stroke="#7dd3fc" strokeWidth="2" fill="none" />
            <path d="M 38 56 Q 50 52 62 56" stroke="#7dd3fc" strokeWidth="2" fill="none" />
            {/* Cute big anime eyes */}
            <ellipse cx="40" cy="52" rx="4.5" ry="6" fill="#ffffff" />
            <circle cx="40" cy="52" r="3" fill="#082f49" />
            <circle cx="39" cy="50.5" r="1.5" fill="#38bdf8" />
            <ellipse cx="60" cy="52" rx="4.5" ry="6" fill="#ffffff" />
            <circle cx="60" cy="52" r="3" fill="#082f49" />
            <circle cx="59" cy="50.5" r="1.5" fill="#38bdf8" />
            {/* Pink cheeks */}
            <circle cx="33" cy="62" r="4.5" fill="#fbcfe8" opacity="0.75" />
            <circle cx="67" cy="62" r="4.5" fill="#fbcfe8" opacity="0.75" />
            {/* Cheerful mouth */}
            <path d="M 47 64 Q 50 67 53 64" stroke="#e0f2fe" strokeWidth="2" fill="none" strokeLinecap="round" />
            {/* Mini claws */}
            <ellipse cx="22" cy="58" rx="6" ry="9" fill="#0284c7" transform="rotate(-20 22 58)" />
            <ellipse cx="78" cy="58" rx="6" ry="9" fill="#0284c7" transform="rotate(20 78 58)" />
          </g>
        );

      case 'sagittarius':
        // Pemanah Petualang
        return (
          <g>
            {/* Archer feather cap */}
            <ellipse cx="50" cy="38" rx="24" ry="16" fill="#0284c7" />
            <path d="M 58 28 C 65 14, 75 12, 78 20 C 72 24, 66 26, 58 28 Z" fill="#facc15" stroke="#ca8a04" strokeWidth="1" />
            {/* Face */}
            <ellipse cx="50" cy="52" rx="22" ry="20" fill="#ffffff" stroke="#bae6fd" strokeWidth="2" />
            {/* Eyes */}
            <ellipse cx="42" cy="50" rx="4" ry="5.5" fill="#0c4a6e" />
            <circle cx="41" cy="48.5" r="1.8" fill="#ffffff" />
            <ellipse cx="58" cy="50" rx="4" ry="5.5" fill="#0c4a6e" />
            <circle cx="57" cy="48.5" r="1.8" fill="#ffffff" />
            <circle cx="34" cy="57" r="4" fill="#fbcfe8" />
            <circle cx="66" cy="57" r="4" fill="#fbcfe8" />
            <path d="M 47 58 Q 50 62 53 58" stroke="#0284c7" strokeWidth="2" fill="none" strokeLinecap="round" />
            {/* Cosmic Star Bow */}
            <path d="M 22 36 Q 16 54 22 72" fill="none" stroke="#facc15" strokeWidth="3" strokeLinecap="round" />
            <line x1="22" y1="36" x2="22" y2="72" stroke="#bae6fd" strokeWidth="1.5" strokeDasharray="2 2" />
            {/* Golden Arrow */}
            <line x1="16" y1="54" x2="34" y2="54" stroke="#ca8a04" strokeWidth="2" />
            <polygon points="34,51 40,54 34,57" fill="#facc15" />
          </g>
        );

      case 'capricorn':
        // Kambing Laut Rajin
        return (
          <g>
            {/* Fish tail at bottom */}
            <path d="M 42 70 C 35 84, 55 92, 65 84 C 60 76, 52 74, 50 70 Z" fill="#38bdf8" stroke="#0284c7" strokeWidth="1.5" />
            {/* Crystal Horns */}
            <path d="M 34 32 C 26 18, 32 8, 40 18 C 38 24, 36 28, 34 32 Z" fill="#e0f2fe" stroke="#38bdf8" strokeWidth="2" />
            <path d="M 66 32 C 74 18, 68 8, 60 18 C 62 24, 64 28, 66 32 Z" fill="#e0f2fe" stroke="#38bdf8" strokeWidth="2" />
            {/* Face */}
            <ellipse cx="50" cy="50" rx="24" ry="22" fill="#ffffff" stroke="#bae6fd" strokeWidth="2" />
            {/* Eyes */}
            <ellipse cx="40" cy="48" rx="4.5" ry="6" fill="#0c4a6e" />
            <circle cx="38.5" cy="46" r="2" fill="#ffffff" />
            <ellipse cx="60" cy="48" rx="4.5" ry="6" fill="#0c4a6e" />
            <circle cx="58.5" cy="46" r="2" fill="#ffffff" />
            <circle cx="32" cy="56" r="4.5" fill="#fbcfe8" />
            <circle cx="68" cy="56" r="4.5" fill="#fbcfe8" />
            {/* Cute goat beard */}
            <polygon points="46,65 54,65 50,72" fill="#bae6fd" />
            <path d="M 47 58 Q 50 62 53 58" stroke="#0284c7" strokeWidth="2" fill="none" strokeLinecap="round" />
          </g>
        );

      case 'aquarius':
        // Pembawa Air Kreatif
        return (
          <g>
            {/* Hair */}
            <circle cx="50" cy="46" r="26" fill="#0284c7" />
            {/* Face */}
            <ellipse cx="50" cy="50" rx="22" ry="20" fill="#ffffff" stroke="#bae6fd" strokeWidth="2" />
            {/* Hair Bangs */}
            <path d="M 28 42 Q 50 48 72 42 Q 50 34 28 42 Z" fill="#0284c7" />
            {/* Eyes */}
            <ellipse cx="41" cy="48" rx="4.5" ry="6" fill="#0c4a6e" />
            <circle cx="39.5" cy="46" r="2" fill="#ffffff" />
            <ellipse cx="59" cy="48" rx="4.5" ry="6" fill="#0c4a6e" />
            <circle cx="57.5" cy="46" r="2" fill="#ffffff" />
            <circle cx="33" cy="56" r="4.5" fill="#fbcfe8" />
            <circle cx="67" cy="56" r="4.5" fill="#fbcfe8" />
            <path d="M 47 58 Q 50 62 53 58" stroke="#0284c7" strokeWidth="2" fill="none" strokeLinecap="round" />
            {/* Starlight Amphora Urn */}
            <ellipse cx="74" cy="62" rx="10" ry="14" fill="#38bdf8" stroke="#0284c7" strokeWidth="2" />
            <ellipse cx="74" cy="50" rx="6" ry="3" fill="#bae6fd" />
            {/* Water flowing out */}
            <path d="M 74 50 Q 64 64 56 68 Q 50 72 44 70" fill="none" stroke="#bae6fd" strokeWidth="4" strokeLinecap="round" />
            <circle cx="48" cy="71" r="2" fill="#ffffff" />
          </g>
        );

      case 'pisces':
        // Sepasang Ikan Ajaib Samudra
        return (
          <g>
            {/* Fish 1 (Top-Left swirling) */}
            <path d="M 34 32 C 16 38, 22 58, 44 48 C 50 44, 46 36, 34 32 Z" fill="#38bdf8" stroke="#0284c7" strokeWidth="2" />
            <polygon points="18,40 10,34 12,46" fill="#7dd3fc" />
            <ellipse cx="36" cy="40" rx="3" ry="4" fill="#0c4a6e" />
            <circle cx="35" cy="38.5" r="1.2" fill="#ffffff" />
            <circle cx="42" cy="43" r="2.5" fill="#fbcfe8" />

            {/* Fish 2 (Bottom-Right swirling) */}
            <path d="M 66 68 C 84 62, 78 42, 56 52 C 50 56, 54 64, 66 68 Z" fill="#bae6fd" stroke="#0284c7" strokeWidth="2" />
            <polygon points="82,60 90,66 88,54" fill="#7dd3fc" />
            <ellipse cx="64" cy="60" rx="3" ry="4" fill="#0c4a6e" />
            <circle cx="63" cy="58.5" r="1.2" fill="#ffffff" />
            <circle cx="58" cy="57" r="2.5" fill="#fbcfe8" />

            {/* Swirling Starlight Bubbles */}
            <circle cx="50" cy="50" r="3.5" fill="#ffffff" opacity="0.9" />
            <circle cx="46" cy="24" r="2" fill="#ffffff" />
            <circle cx="54" cy="76" r="2.5" fill="#facc15" />
          </g>
        );

      default:
        return (
          <circle cx="50" cy="50" r="30" fill="#38bdf8" />
        );
    }
  };

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`} style={{ width: size, height: size }}>
      <svg
        viewBox="0 0 100 100"
        width={size}
        height={size}
        className="w-full h-full drop-shadow-md select-none pointer-events-none"
      >
        {/* Optional Cape accessory */}
        {showCape && (
          <path
            d="M 28 65 Q 16 92 36 96 Q 50 86 64 96 Q 84 92 72 65 Z"
            fill="#0284c7"
            stroke="#0369a1"
            strokeWidth="2"
            opacity="0.9"
          />
        )}

        {/* Character Base Graphic */}
        {renderAvatarContent()}

        {/* Optional Golden Crown accessory */}
        {showCrown && (
          <g transform="translate(0, -6)">
            <polygon
              points="40,24 43,12 50,19 57,12 60,24"
              fill="#facc15"
              stroke="#ca8a04"
              strokeWidth="1.8"
            />
            <circle cx="50" cy="15" r="2" fill="#38bdf8" />
          </g>
        )}
      </svg>
    </div>
  );
};
