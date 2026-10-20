import React from 'react';

export const CosmicBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none">
      {/* Base Cosmic Sky Gradient: Baby Blue to Vibrant Sky Blue */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#7dd3fc] via-[#bae6fd] to-[#e0f2fe]" />

      {/* Sun / Moon Celestial Warm Radiance (Top Center) */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-gradient-to-b from-[#fef08a]/35 via-[#38bdf8]/20 to-transparent blur-3xl" />

      {/* Cute Smiling Crescent Moon (Top-Right) */}
      <div className="absolute top-14 right-6 w-14 h-14 opacity-80 animate-float-slow">
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
          {/* Crescent path */}
          <path
            d="M 50 10 A 40 40 0 1 0 90 50 A 30 30 0 1 1 50 10 Z"
            fill="#fef08a"
            stroke="#facc15"
            strokeWidth="2"
          />
          {/* Moon closed happy eye */}
          <path d="M 46 44 Q 52 40 58 44" stroke="#ca8a04" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          {/* Moon cheek blush */}
          <circle cx="50" cy="52" r="4" fill="#fbcfe8" opacity="0.8" />
          {/* Moon smile */}
          <path d="M 54 50 Q 58 54 62 50" stroke="#ca8a04" strokeWidth="2" fill="none" strokeLinecap="round" />
        </svg>
      </div>

      {/* Cute Ringed Blue Planet (Top-Left) */}
      <div className="absolute top-20 left-4 w-12 h-12 opacity-85 animate-float-slow" style={{ animationDelay: '1.5s' }}>
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
          {/* Planet Sphere */}
          <circle cx="50" cy="50" r="28" fill="#38bdf8" stroke="#0284c7" strokeWidth="2" />
          <path d="M 32 40 Q 50 36 68 40" stroke="#bae6fd" strokeWidth="3" fill="none" opacity="0.6" />
          <path d="M 28 55 Q 50 50 72 55" stroke="#0284c7" strokeWidth="2" fill="none" opacity="0.4" />
          {/* Rings */}
          <ellipse
            cx="50"
            cy="50"
            rx="46"
            ry="14"
            fill="none"
            stroke="#facc15"
            strokeWidth="3.5"
            transform="rotate(-20 50 50)"
          />
          <circle cx="50" cy="48" r="2" fill="#ffffff" />
        </svg>
      </div>

      {/* Floating Star Constellations */}
      <div className="absolute top-36 left-1/4 text-amber-300 text-sm animate-star-shimmer">⭐</div>
      <div className="absolute top-48 right-1/4 text-amber-200 text-base animate-star-shimmer" style={{ animationDelay: '1.2s' }}>✨</div>
      <div className="absolute top-28 right-16 text-sky-200 text-xs animate-star-shimmer" style={{ animationDelay: '0.6s' }}>⭐</div>
      <div className="absolute top-64 left-10 text-amber-300 text-xs animate-star-shimmer" style={{ animationDelay: '2.1s' }}>✨</div>
      <div className="absolute top-80 right-8 text-sky-300 text-sm animate-star-shimmer" style={{ animationDelay: '1.7s' }}>⭐</div>
      <div className="absolute bottom-40 left-12 text-amber-200 text-xs animate-star-shimmer" style={{ animationDelay: '2.8s' }}>✨</div>
      <div className="absolute bottom-28 right-14 text-sky-200 text-sm animate-star-shimmer" style={{ animationDelay: '0.9s' }}>⭐</div>

      {/* Drifting Clouds Layer 1 (Back, Slower) */}
      <div className="absolute top-1/4 -left-10 w-[120%] opacity-40 animate-cloud-drift pointer-events-none">
        <svg viewBox="0 0 1000 200" fill="#ffffff" className="w-full h-24">
          <path d="M0,100 C150,60 200,120 350,90 C500,60 550,130 700,95 C850,60 900,110 1000,90 L1000,200 L0,200 Z" />
        </svg>
      </div>

      {/* Drifting Clouds Layer 2 (Foreground Bottom, Fluffy) */}
      <div className="absolute bottom-0 -left-6 right-0 w-[110%] opacity-70 pointer-events-none">
        <svg viewBox="0 0 1000 220" fill="#ffffff" className="w-full h-32 md:h-44">
          <path d="M0,120 C120,70 200,130 360,90 C520,50 620,130 760,85 C900,50 960,110 1000,90 L1000,220 L0,220 Z" />
        </svg>
      </div>

      {/* Golden Stardust Particles Floating */}
      <div className="absolute inset-0 bg-[radial-gradient(#facc15_1px,transparent_1px)] [background-size:64px_64px] opacity-15" />
    </div>
  );
};
