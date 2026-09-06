import React, { useState } from 'react';
import { RoutePath } from '../types';
import { LightboxModal } from './LightboxModal';
import { ZoomIn, ArrowLeft, ArrowRight, Radio as RadioIcon } from 'lucide-react';

interface RadioReel07Props {
  onNavigate: (path: RoutePath) => void;
}

// Scrambled 26 letters distributed around the radio dial
// Notice that 'O' is positioned at index 9, corresponding to 180 degrees (or top/side needle position)
const SCRAMBLED_LETTERS = [
  'M', 'K', 'B', 'Z', 'V', 'G', 'P', 'W', 'D',
  'O', // Target letter pointed to by the tuning needle
  'Y', 'F', 'X', 'T', 'J', 'R', 'C', 'H', 'E', 'Q', 'U', 'N', 'A', 'S', 'L', 'I'
];

export const RadioReel07: React.FC<RadioReel07Props> = ({ onNavigate }) => {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // SVG Dial Renderer
  const renderRadioDial = (isZoomed: boolean = false) => {
    const size = isZoomed ? 780 : 540;
    const center = 300;
    const outerRadius = 240;
    const letterRadius = 200;
    const tickOuterRadius = 225;
    const tickInnerRadius = 215;

    // Angle of needle: exactly points to letter 'O'
    // There are 26 letters spread over a 280-degree sweep (from -140 deg to +140 deg)
    // Letter 'O' is at index 9.
    const startAngle = -140;
    const endAngle = 140;
    const angleStep = (endAngle - startAngle) / (SCRAMBLED_LETTERS.length - 1);

    const letterAngle = (index: number) => startAngle + index * angleStep;
    const targetIndex = SCRAMBLED_LETTERS.indexOf('O');
    const needleTargetAngle = letterAngle(targetIndex);

    return (
      <svg
        viewBox="0 0 600 600"
        width={size}
        height={size}
        className="max-w-full h-auto drop-shadow-2xl select-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Heavy Bakelite Outer Gradient */}
          <radialGradient id="bakeliteBody" cx="45%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#2c221a" />
            <stop offset="70%" stopColor="#1a130e" />
            <stop offset="100%" stopColor="#0a0705" />
          </radialGradient>

          {/* Brass Bezel Gradient */}
          <radialGradient id="brassBezel" cx="40%" cy="35%" r="60%">
            <stop offset="0%" stopColor="#f3d082" />
            <stop offset="25%" stopColor="#b8893d" />
            <stop offset="60%" stopColor="#7a551e" />
            <stop offset="85%" stopColor="#c79948" />
            <stop offset="100%" stopColor="#4e330d" />
          </radialGradient>

          {/* Amber Illuminated Glass Face */}
          <radialGradient id="amberGlass" cx="50%" cy="50%" r="65%">
            <stop offset="0%" stopColor="#e8b965" stopOpacity="0.45" />
            <stop offset="60%" stopColor="#a36e26" stopOpacity="0.3" />
            <stop offset="85%" stopColor="#472b0c" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#1e1104" stopOpacity="0.95" />
          </radialGradient>

          {/* Glass Specular Sheen */}
          <linearGradient id="glassSheen" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.18" />
            <stop offset="35%" stopColor="#ffffff" stopOpacity="0.04" />
            <stop offset="50%" stopColor="#ffffff" stopOpacity="0" />
            <stop offset="75%" stopColor="#ffffff" stopOpacity="0.06" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>

          {/* Static noise texture */}
          <filter id="dialNoise" x="0%" y="0%" width="100%" height="100%">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" result="noise" />
            <feColorMatrix type="matrix" values="0 0 0 0 0.8   0 0 0 0 0.6   0 0 0 0 0.3  0 0 0 0.12 0" />
            <feComposite in2="SourceGraphic" in="glitch" operator="in" />
          </filter>
        </defs>

        {/* Chassis Outer Square with Beveled Corners */}
        <rect x="25" y="25" width="550" height="550" rx="36" fill="#140f0c" stroke="#332417" strokeWidth="4" />

        {/* Corner Brass Screws */}
        {[
          { cx: 55, cy: 55 },
          { cx: 545, cy: 55 },
          { cx: 55, cy: 545 },
          { cx: 545, cy: 545 },
        ].map((screw, i) => (
          <g key={i} transform={`translate(${screw.cx}, ${screw.cy})`}>
            <circle cx="0" cy="0" r="8" fill="#87652c" stroke="#4a3411" strokeWidth="1.5" />
            <line x1="-5" y1="-2" x2="5" y2="2" stroke="#2b1c06" strokeWidth="2" />
          </g>
        ))}

        {/* Radio Brand Plaque */}
        <g transform="translate(300, 75)">
          <rect x="-110" y="0" width="220" height="34" rx="3" fill="#201710" stroke="#78592c" strokeWidth="1.2" />
          <text x="0" y="16" fontFamily="'Cinzel', serif" fontSize="10" fontWeight="bold" fill="#d9ad67" textAnchor="middle" letterSpacing="3">
            THORNE-EDISON LABS
          </text>
          <text x="0" y="28" fontFamily="'Special Elite', monospace" fontSize="8" fill="#8f724d" textAnchor="middle">
            HARMONIC WAVE RECEIVER • TYPE-VII
          </text>
        </g>

        {/* Outer Circular Bakelite Ring */}
        <circle cx={center} cy={center} r={outerRadius + 22} fill="url(#bakeliteBody)" stroke="#4d351b" strokeWidth="3" />

        {/* Brass Bezel Ring */}
        <circle cx={center} cy={center} r={outerRadius + 8} fill="none" stroke="url(#brassBezel)" strokeWidth="14" />
        <circle cx={center} cy={center} r={outerRadius} fill="none" stroke="#24170b" strokeWidth="2" />

        {/* Dial Face Background (Illuminated Dark Amber) */}
        <circle cx={center} cy={center} r={outerRadius} fill="#140d06" />
        <circle cx={center} cy={center} r={outerRadius} fill="url(#amberGlass)" />

        {/* Dial Scale Arc & Tick Marks */}
        <path
          d={`M ${center + outerRadius * Math.sin((startAngle * Math.PI) / 180)} ${
            center - outerRadius * Math.cos((startAngle * Math.PI) / 180)
          } A ${outerRadius} ${outerRadius} 0 1 1 ${
            center + outerRadius * Math.sin((endAngle * Math.PI) / 180)
          } ${center - outerRadius * Math.cos((endAngle * Math.PI) / 180)}`}
          fill="none"
          stroke="#735222"
          strokeWidth="1.5"
        />

        {/* Scrambled Letters & Tick Marks */}
        {SCRAMBLED_LETTERS.map((char, index) => {
          const angle = letterAngle(index);
          const rad = ((angle - 90) * Math.PI) / 180;

          // Outer tick
          const tx1 = center + tickOuterRadius * Math.cos(rad);
          const ty1 = center + tickOuterRadius * Math.sin(rad);
          const tx2 = center + tickInnerRadius * Math.cos(rad);
          const ty2 = center + tickInnerRadius * Math.sin(rad);

          // Sub-tick (halfway)
          const isTarget = char === 'O';

          // Letter position
          const lx = center + letterRadius * Math.cos(rad);
          const ly = center + letterRadius * Math.sin(rad);

          return (
            <g key={char} className="select-none">
              {/* Tick line */}
              <line
                x1={tx1}
                y1={ty1}
                x2={tx2}
                y2={ty2}
                stroke={isTarget ? '#ffcf70' : '#a88243'}
                strokeWidth={isTarget ? '2.5' : '1.5'}
              />

              {/* Letter */}
              <text
                x={lx}
                y={ly}
                fill={isTarget ? '#ffdf94' : '#c9a15f'}
                fontFamily="'Special Elite', monospace"
                fontSize="15"
                fontWeight="bold"
                textAnchor="middle"
                dominantBaseline="central"
                transform={`rotate(${angle}, ${lx}, ${ly})`}
              >
                {char}
              </text>
            </g>
          );
        })}

        {/* Faded calibration numbers along inner track */}
        <path
          d="M 170 300 A 130 130 0 0 1 430 300"
          fill="none"
          stroke="#5e421c"
          strokeWidth="0.8"
          strokeDasharray="4,4"
        />

        {/* Center Vintage Knob Assembly */}
        <circle cx={center} cy={center} r="65" fill="#120c07" stroke="#473117" strokeWidth="4" />
        <circle cx={center} cy={center} r="50" fill="url(#brassBezel)" />
        <circle cx={center} cy={center} r="35" fill="#1a120b" stroke="#704e1f" strokeWidth="2" />
        <circle cx={center} cy={center} r="18" fill="#422c10" />

        {/* Brass Tuning Needle - EXACTLY pointing at 'O' */}
        <g transform={`rotate(${needleTargetAngle}, ${center}, ${center})`}>
          {/* Needle shadow */}
          <polygon
            points={`${center + 3},${center - 25} ${center + 215},${center + 3} ${center + 3},${center + 25}`}
            fill="#000000"
            opacity="0.45"
            transform="rotate(90, 300, 300)"
          />

          {/* Precision Indicator Needle: long tapered copper needle reaching letter track */}
          <path
            d={`M ${center - 5} ${center} L ${center - 1} ${center - tickInnerRadius + 5} L ${center} ${center - tickInnerRadius - 2} L ${center + 1} ${center - tickInnerRadius + 5} L ${center + 5} ${center} Z`}
            fill="#e89838"
            stroke="#6e3c08"
            strokeWidth="1"
          />

          {/* Needle center cap pin */}
          <circle cx={center} cy={center} r="8" fill="#ffc368" stroke="#73440e" strokeWidth="1.5" />
          <circle cx={center} cy={center} r="3" fill="#2b1a07" />
        </g>

        {/* Glass reflection highlight sweep */}
        <circle cx={center} cy={center} r={outerRadius - 2} fill="url(#glassSheen)" pointerEvents="none" />

        {/* Lower chassis tuner knobs */}
        <g transform="translate(160, 505)">
          <circle cx="0" cy="0" r="26" fill="#18110b" stroke="#63451e" strokeWidth="2" />
          <circle cx="0" cy="0" r="18" fill="#302011" />
          <line x1="0" y1="-22" x2="0" y2="-12" stroke="#d9a859" strokeWidth="3" />
          <text x="0" y="38" fontFamily="'Cinzel', serif" fontSize="9" fill="#8f7048" textAnchor="middle">
            CARRIER
          </text>
        </g>

        <g transform="translate(440, 505)">
          <circle cx="0" cy="0" r="26" fill="#18110b" stroke="#63451e" strokeWidth="2" />
          <circle cx="0" cy="0" r="18" fill="#302011" />
          <line x1="16" y1="-16" x2="8" y2="-8" stroke="#d9a859" strokeWidth="3" />
          <text x="0" y="38" fontFamily="'Cinzel', serif" fontSize="9" fill="#8f7048" textAnchor="middle">
            RESONANCE
          </text>
        </g>
      </svg>
    );
  };

  return (
    <div id="reel-07-container" className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      {/* Exhibit Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#3b2e23] pb-5 mb-8">
        <div>
          <div className="flex items-center gap-2 text-xs font-typewriter text-[#c8924b] tracking-wider uppercase mb-1">
            <span>ARCHIVE DOSSIER • REEL VII</span>
            <span className="text-[#5e4b3c]">/</span>
            <code className="text-[#bfa58d] bg-[#1c1612] px-1.5 py-0.5 rounded border border-[#382b20]">
              /archive/reel-07
            </code>
          </div>
          <h1 className="text-3xl sm:text-4xl font-cinzel font-bold text-[#f3ede4]">
            Reel VII — The Radio
          </h1>
        </div>

        <button
          id="radio-zoom-cta-btn"
          type="button"
          onClick={() => setIsLightboxOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded bg-[#241c16] hover:bg-[#31261e] border border-[#524032] hover:border-[#c8924b] text-xs font-cinzel text-[#dfd4c5] transition-all shadow-md"
        >
          <ZoomIn className="w-4 h-4 text-[#c8924b]" />
          <span>Click to Zoom Dial</span>
        </button>
      </div>

      {/* Visible Copy (EXACT WORDING PER PROMPT) */}
      <div className="bg-[#171310] border border-[#382c21] rounded-lg p-6 mb-8 text-[#d8cdbf] shadow-inner">
        <p className="text-xs uppercase font-typewriter tracking-widest text-[#a8927d] italic mb-3">
          Thorne rebuilt this radio himself. He never used it for frequencies.
        </p>

        <blockquote className="text-base sm:text-lg font-serif-body italic text-[#eee4d7] leading-relaxed border-l-2 border-[#c8924b] pl-4 my-2">
          &ldquo;Letters do — if you wait for the needle to stop lying to you.&rdquo;
        </blockquote>
      </div>

      {/* Radio Specimen Container */}
      <div className="relative group flex flex-col items-center justify-center p-6 sm:p-10 rounded-xl border border-[#443527] bg-[#0c0907] overflow-hidden shadow-2xl">
        {/* Atmosphere noise background */}
        <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#d9ad67_1px,transparent_1px)] [background-size:16px_16px]" />

        <div
          id="radio-artifact-clickable"
          onClick={() => setIsLightboxOpen(true)}
          className="cursor-zoom-in transition-transform duration-300 group-hover:scale-[1.02] flex items-center justify-center relative z-10"
          title="Click to enlarge"
        >
          {renderRadioDial(false)}
        </div>
      </div>

      {/* Archival Footnote */}
      <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-typewriter text-[#7b6959] border-t border-[#2d231b] pt-6">
        <div>CATALOGUE IDENTIFIER: REEL-07-TUNER-VII</div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => onNavigate('/archive/reel-09')}
            className="hover:text-[#c8924b] transition-colors flex items-center gap-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Previous Fragment
          </button>
          <span>•</span>
          <button
            type="button"
            onClick={() => onNavigate('/archive/reel-03')}
            className="hover:text-[#c8924b] transition-colors flex items-center gap-1"
          >
            Next Fragment <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Lightbox Modal for Close Inspection */}
      <LightboxModal
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        title="Reel VII — Scrambled Receiver Dial"
        caption="Inspect the scrambled rim lettering and note where the indicator needle has permanently settled."
      >
        {renderRadioDial(true)}
      </LightboxModal>
    </div>
  );
};
