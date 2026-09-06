import React, { useState } from 'react';
import { RoutePath } from '../types';
import { LightboxModal } from './LightboxModal';
import { ZoomIn, ArrowLeft, ArrowRight } from 'lucide-react';

interface RadioReel07Props {
  onNavigate: (path: RoutePath) => void;
}

export const RadioReel07: React.FC<RadioReel07Props> = ({ onNavigate }) => {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // SVG Vintage Radio with Worn Brass OSCAR Nameplate below Dial
  const renderRadioIllustration = (isZoomed: boolean = false) => {
    const size = isZoomed ? 820 : 540;

    return (
      <svg
        viewBox="0 0 600 640"
        width={size}
        height={(size * 640) / 600}
        className="max-w-full h-auto drop-shadow-2xl select-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Walnut Wooden Cabinet Gradient */}
          <linearGradient id="walnutCabinet" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3d2616" />
            <stop offset="35%" stopColor="#2c1a0e" />
            <stop offset="70%" stopColor="#20130a" />
            <stop offset="100%" stopColor="#140b05" />
          </linearGradient>

          {/* Inner Cabinet Recess Shadow */}
          <radialGradient id="cabinetInnerRecess" cx="50%" cy="45%" r="65%">
            <stop offset="0%" stopColor="#24170d" />
            <stop offset="60%" stopColor="#170e07" />
            <stop offset="100%" stopColor="#0a0503" />
          </radialGradient>

          {/* Brass Bezel Gradient */}
          <radialGradient id="brassBezelRing" cx="40%" cy="35%" r="60%">
            <stop offset="0%" stopColor="#f3d082" />
            <stop offset="25%" stopColor="#b8893d" />
            <stop offset="60%" stopColor="#7a551e" />
            <stop offset="85%" stopColor="#c79948" />
            <stop offset="100%" stopColor="#4e330d" />
          </radialGradient>

          {/* Amber Illuminated Glass Dial Face */}
          <radialGradient id="amberDialGlass" cx="50%" cy="48%" r="65%">
            <stop offset="0%" stopColor="#f7cb79" stopOpacity="0.55" />
            <stop offset="45%" stopColor="#b87f2e" stopOpacity="0.4" />
            <stop offset="80%" stopColor="#57340e" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#221203" stopOpacity="0.98" />
          </radialGradient>

          {/* Worn Brass Nameplate Metallic Surface */}
          <linearGradient id="wornBrassPlate" x1="0%" y1="0%" x2="100%" y2="80%">
            <stop offset="0%" stopColor="#e5c175" />
            <stop offset="18%" stopColor="#cda558" />
            <stop offset="38%" stopColor="#a37c35" />
            <stop offset="62%" stopColor="#7a5820" />
            <stop offset="82%" stopColor="#b58d43" />
            <stop offset="100%" stopColor="#543a12" />
          </linearGradient>

          {/* Tarnished Verdigris / Oxidation Patina */}
          <radialGradient id="verdigrisPatina" cx="30%" cy="40%" r="55%">
            <stop offset="0%" stopColor="#4a6e56" stopOpacity="0.75" />
            <stop offset="60%" stopColor="#324d3c" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#1a2b20" stopOpacity="0" />
          </radialGradient>

          {/* Glass Specular Sheen */}
          <linearGradient id="glassSheen" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.18" />
            <stop offset="32%" stopColor="#ffffff" stopOpacity="0.03" />
            <stop offset="48%" stopColor="#ffffff" stopOpacity="0" />
            <stop offset="75%" stopColor="#ffffff" stopOpacity="0.05" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>

          {/* Deep Stamped Engraving Shadow */}
          <filter id="engravedShadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="1" dy="1" stdDeviation="0.4" floodColor="#1a0f05" floodOpacity="0.95" />
          </filter>
        </defs>

        {/* 1. RADIO CHASSIS: Cathedral / Tabletop Walnut Cabinet */}
        {/* Outer Shadow */}
        <path
          d="M 60 620 L 540 620 L 540 140 Q 540 25 300 25 Q 60 25 60 140 Z"
          fill="#0a0705"
          opacity="0.85"
        />

        {/* Outer Wood Shell */}
        <path
          d="M 50 610 L 550 610 L 550 145 Q 550 35 300 35 Q 50 35 50 145 Z"
          fill="url(#walnutCabinet)"
          stroke="#422916"
          strokeWidth="3"
        />

        {/* Inlaid Wood Border Trim */}
        <path
          d="M 65 595 L 535 595 L 535 150 Q 535 48 300 48 Q 65 48 65 150 Z"
          fill="none"
          stroke="#634024"
          strokeWidth="1.5"
          opacity="0.75"
        />

        {/* Inner Recessed Faceboard */}
        <path
          d="M 78 580 L 522 580 L 522 155 Q 522 62 300 62 Q 78 62 78 155 Z"
          fill="url(#cabinetInnerRecess)"
          stroke="#1a0f08"
          strokeWidth="2"
        />

        {/* Top Speaker Acoustic Grille Louvers */}
        <g id="speaker-grille" opacity="0.45">
          {/* Subtle Gothic Arch Slits */}
          <path d="M 270 95 L 330 95 Q 300 78 270 95 Z" fill="#4d321c" />
          <path d="M 230 115 L 370 115 Q 300 98 230 115 Z" fill="#3d2614" />
          <path d="M 210 135 L 390 135 Q 300 118 210 135 Z" fill="#3d2614" />
          <line x1="300" y1="75" x2="300" y2="145" stroke="#1c1109" strokeWidth="3" />
        </g>

        {/* 2. THE MAIN CIRCULAR TUNING DIAL */}
        <g id="radio-main-dial" transform="translate(300, 265)">
          {/* Outer Bakelite Dial Ring */}
          <circle cx="0" cy="0" r="148" fill="#140d07" stroke="#3d2714" strokeWidth="3" />

          {/* Heavy Brass Bezel with Screws */}
          <circle cx="0" cy="0" r="144" fill="none" stroke="url(#brassBezelRing)" strokeWidth="12" />
          <circle cx="0" cy="0" r="138" fill="none" stroke="#2b1a09" strokeWidth="2" />

          {/* Bezel Screws */}
          {[0, 60, 120, 180, 240, 300].map((deg) => {
            const rad = (deg * Math.PI) / 180;
            const sx = 144 * Math.cos(rad);
            const sy = 144 * Math.sin(rad);
            return (
              <g key={deg} transform={`translate(${sx}, ${sy})`}>
                <circle cx="0" cy="0" r="3.5" fill="#694a1d" stroke="#33220b" strokeWidth="0.8" />
                <line x1="-2" y1="-1" x2="2" y2="1" stroke="#1c1205" strokeWidth="1" />
              </g>
            );
          })}

          {/* Illuminated Dark Amber Glass Face */}
          <circle cx="0" cy="0" r="137" fill="#0d0803" />
          <circle cx="0" cy="0" r="137" fill="url(#amberDialGlass)" />

          {/* Faint Concentric Calibration Tracks */}
          <circle cx="0" cy="0" r="118" fill="none" stroke="#755220" strokeWidth="1" opacity="0.65" />
          <circle cx="0" cy="0" r="92" fill="none" stroke="#5e4016" strokeWidth="0.8" strokeDasharray="3,3" opacity="0.5" />
          <circle cx="0" cy="0" r="70" fill="none" stroke="#4a300e" strokeWidth="0.8" opacity="0.4" />

          {/* Standard Broadcast Frequency Markings (550 - 1600 Kilocycles) */}
          {[
            { label: '55', deg: -120 },
            { label: '60', deg: -95 },
            { label: '70', deg: -70 },
            { label: '80', deg: -45 },
            { label: '90', deg: -20 },
            { label: '100', deg: 5 },
            { label: '120', deg: 30 },
            { label: '140', deg: 55 },
            { label: '160', deg: 80 },
          ].map((item) => {
            const rad = ((item.deg - 90) * Math.PI) / 180;
            const tx1 = 125 * Math.cos(rad);
            const ty1 = 125 * Math.sin(rad);
            const tx2 = 118 * Math.cos(rad);
            const ty2 = 118 * Math.sin(rad);
            const lx = 104 * Math.cos(rad);
            const ly = 104 * Math.sin(rad);
            return (
              <g key={item.label}>
                <line x1={tx1} y1={ty1} x2={tx2} y2={ty2} stroke="#f0c273" strokeWidth="1.5" />
                <text
                  x={lx}
                  y={ly}
                  fill="#eed29b"
                  fontFamily="'Special Elite', monospace"
                  fontSize="11"
                  fontWeight="bold"
                  textAnchor="middle"
                  dominantBaseline="central"
                >
                  {item.label}
                </text>
              </g>
            );
          })}

          {/* Minor Intermediate Ticks */}
          {Array.from({ length: 35 }).map((_, i) => {
            const deg = -125 + i * 6.5;
            const rad = ((deg - 90) * Math.PI) / 180;
            const tx1 = 122 * Math.cos(rad);
            const ty1 = 122 * Math.sin(rad);
            const tx2 = 118 * Math.cos(rad);
            const ty2 = 118 * Math.sin(rad);
            return (
              <line
                key={i}
                x1={tx1}
                y1={ty1}
                x2={tx2}
                y2={ty2}
                stroke="#ab823e"
                strokeWidth="0.8"
                opacity="0.8"
              />
            );
          })}

          {/* Lower Dial Scale Text */}
          <text
            x="0"
            y="52"
            fontFamily="'Cinzel', serif"
            fontSize="8"
            letterSpacing="2"
            fill="#a68048"
            textAnchor="middle"
          >
            KILOCYCLES • BROADCAST
          </text>
          <text
            x="0"
            y="-48"
            fontFamily="'Special Elite', monospace"
            fontSize="7.5"
            letterSpacing="1"
            fill="#806134"
            textAnchor="middle"
          >
            SHORTWAVE 6.0 &mdash; 18.0 MC
          </text>

          {/* Center Brass Hub & Tuning Needle */}
          {/* Needle points steadily across scale */}
          <g transform="rotate(-15)">
            <line x1="0" y1="20" x2="0" y2="-128" stroke="#d48a28" strokeWidth="1.8" />
            <polygon points="-3,0 0,-132 3,0" fill="#f09e35" />
            {/* Needle counterweight */}
            <circle cx="0" cy="16" r="5" fill="#a1661a" stroke="#4d2f09" strokeWidth="1" />
          </g>

          {/* Center Knob Base */}
          <circle cx="0" cy="0" r="32" fill="#140d07" stroke="#4a3118" strokeWidth="2.5" />
          <circle cx="0" cy="0" r="24" fill="url(#brassBezelRing)" />
          <circle cx="0" cy="0" r="14" fill="#24170c" stroke="#5e3e1c" strokeWidth="1.5" />
          <circle cx="0" cy="0" r="5" fill="#f0b55d" />

          {/* Glass Specular Sheen Overlay */}
          <circle cx="0" cy="0" r="137" fill="url(#glassSheen)" pointerEvents="none" />
        </g>

        {/* 3. WORN BRASS IDENTIFICATION PLATE MOUNTED BELOW THE DIAL */}
        {/* EXACT REQUIREMENT:
            An illustrated old radio with a small worn brass identification plate mounted below the dial.
            Genuinely aged: corroded, scratched, with 'S' and 'A' partly worn away or obscured by a scuff/dent.
            Intact engraving reads: O S C A R
            No other text labeling it as a "call sign" or "code word".
        */}
        <g id="worn-brass-nameplate" transform="translate(300, 455)">
          {/* Plate Shadow Dropped onto Radio Cabinet */}
          <rect
            x="-106"
            y="-22"
            width="212"
            height="44"
            rx="4"
            fill="#090503"
            opacity="0.8"
          />

          {/* Tarnished Outer Brass Bevel Frame */}
          <rect
            x="-105"
            y="-21"
            width="210"
            height="42"
            rx="3"
            fill="#473216"
            stroke="#211508"
            strokeWidth="1.5"
          />

          {/* Main Weathered Brass Plate Surface */}
          <rect
            x="-103"
            y="-19"
            width="206"
            height="38"
            rx="2.5"
            fill="url(#wornBrassPlate)"
          />

          {/* Greenish Verdigris / Oxidation Patina Overlay (Authentic aged copper/brass tarnish) */}
          <rect
            x="-103"
            y="-19"
            width="206"
            height="38"
            rx="2.5"
            fill="url(#verdigrisPatina)"
            opacity="0.85"
          />

          {/* Additional Verdigris Crust Clusters along edges */}
          <path
            d="M -103 -19 Q -75 -15 -60 -19 Q -40 -17 -20 -19 L -20 -14 Q -50 -13 -75 -12 Q -95 -14 -103 -10 Z"
            fill="#2e4a37"
            opacity="0.65"
          />
          <path
            d="M 60 19 Q 80 16 103 19 L 103 12 Q 85 14 65 15 Z"
            fill="#34523e"
            opacity="0.75"
          />
          <circle cx="82" cy="-6" r="8" fill="#2d4534" opacity="0.45" />
          <circle cx="-50" cy="9" r="6.5" fill="#2a4030" opacity="0.5" />

          {/* Left Mounting Slotted Brass Screw (Corroded) */}
          <g transform="translate(-88, 0)">
            <circle cx="0" cy="0" r="5.5" fill="#6e5022" stroke="#2e1f0a" strokeWidth="1" />
            <circle cx="0" cy="0" r="3.5" fill="#3d2a10" />
            <line x1="-3.5" y1="-1" x2="3.5" y2="1" stroke="#1a0f04" strokeWidth="1.5" />
            <circle cx="-1" cy="-1" r="2.5" fill="#2a3d30" opacity="0.6" />
          </g>

          {/* Right Mounting Slotted Brass Screw (Corroded) */}
          <g transform="translate(88, 0)">
            <circle cx="0" cy="0" r="5.5" fill="#6e5022" stroke="#2e1f0a" strokeWidth="1" />
            <circle cx="0" cy="0" r="3.5" fill="#3d2a10" />
            <line x1="-1" y1="-3.5" x2="1" y2="3.5" stroke="#1a0f04" strokeWidth="1.5" />
            <circle cx="1" cy="1" r="2.5" fill="#2a3d30" opacity="0.6" />
          </g>

          {/* ENGRAVED LETTERS: "O S C A R" */}
          {/* Authentic deeply stamped letterforms with inner shadow and weathered highlights */}
          {/* Note: 'S' and 'A' are partly worn/scratched so they take a moment to confirm */}
          <g id="engraved-letters" filter="url(#engravedShadow)">
            {/* Letter 'O' — Clear, stamped groove with minor oxidation */}
            <text
              x="-58"
              y="6"
              fontFamily="'Cinzel', 'Playfair Display', serif"
              fontSize="23"
              fontWeight="bold"
              letterSpacing="2"
              fill="#261708"
              textAnchor="middle"
            >
              O
            </text>
            <text
              x="-57.5"
              y="6.5"
              fontFamily="'Cinzel', 'Playfair Display', serif"
              fontSize="23"
              fontWeight="bold"
              letterSpacing="2"
              fill="#f7dfa3"
              opacity="0.3"
              textAnchor="middle"
            >
              O
            </text>

            {/* Letter 'S' — Partly worn away and obscured by a scuff and heavy scratch across its middle curve */}
            <g id="letter-s-worn">
              <text
                x="-29"
                y="6"
                fontFamily="'Cinzel', 'Playfair Display', serif"
                fontSize="23"
                fontWeight="bold"
                letterSpacing="2"
                fill="#362310"
                opacity="0.82"
                textAnchor="middle"
              >
                S
              </text>
              {/* Scuff / abrasion obscuring the top curve */}
              <ellipse cx="-30" cy="-6" rx="6.5" ry="3.5" fill="#87652c" opacity="0.72" />
              {/* Deep scratch line cutting right through middle cross of S */}
              <path
                d="M -37 -8 L -20 10"
                stroke="#1f1408"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
              <path
                d="M -36 -7.5 L -19 10.5"
                stroke="#e0bf79"
                strokeWidth="0.8"
                strokeLinecap="round"
                opacity="0.55"
              />
              {/* Tarnished patina speck directly on S */}
              <circle cx="-28" cy="2" r="3.2" fill="#2d4232" opacity="0.65" />
            </g>

            {/* Letter 'C' — Clear stamped letter with slight patina */}
            <text
              x="0"
              y="6"
              fontFamily="'Cinzel', 'Playfair Display', serif"
              fontSize="23"
              fontWeight="bold"
              letterSpacing="2"
              fill="#261708"
              textAnchor="middle"
            >
              C
            </text>
            <text
              x="0.5"
              y="6.5"
              fontFamily="'Cinzel', 'Playfair Display', serif"
              fontSize="23"
              fontWeight="bold"
              letterSpacing="2"
              fill="#f7dfa3"
              opacity="0.3"
              textAnchor="middle"
            >
              C
            </text>

            {/* Letter 'A' — Partly worn and scratched across crossbar and right diagonal leg */}
            <g id="letter-a-worn">
              <text
                x="29"
                y="6"
                fontFamily="'Cinzel', 'Playfair Display', serif"
                fontSize="23"
                fontWeight="bold"
                letterSpacing="2"
                fill="#362310"
                opacity="0.85"
                textAnchor="middle"
              >
                A
              </text>
              {/* Scratch slicing horizontally through the crossbar and right leg */}
              <path
                d="M 20 2 L 39 8"
                stroke="#1a1005"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
              <path
                d="M 21 2.5 L 40 8.5"
                stroke="#dfbc75"
                strokeWidth="0.7"
                opacity="0.5"
              />
              {/* Abrasion scuff fading the peak of A */}
              <ellipse cx="29" cy="-7" rx="5" ry="3" fill="#826129" opacity="0.68" />
              {/* Verdigris tarnish on right foot */}
              <circle cx="36" cy="7" r="2.8" fill="#304736" opacity="0.6" />
            </g>

            {/* Letter 'R' — Intact stamped letter with authentic wear */}
            <text
              x="58"
              y="6"
              fontFamily="'Cinzel', 'Playfair Display', serif"
              fontSize="23"
              fontWeight="bold"
              letterSpacing="2"
              fill="#261708"
              textAnchor="middle"
            >
              R
            </text>
            <text
              x="58.5"
              y="6.5"
              fontFamily="'Cinzel', 'Playfair Display', serif"
              fontSize="23"
              fontWeight="bold"
              letterSpacing="2"
              fill="#f7dfa3"
              opacity="0.3"
              textAnchor="middle"
            >
              R
            </text>
          </g>

          {/* Random Surface Scratches across the Plate */}
          <path
            d="M -75 -14 L -45 14"
            stroke="#1c1106"
            strokeWidth="1"
            opacity="0.7"
          />
          <path
            d="M -74 -13.5 L -44 14.5"
            stroke="#f5d68e"
            strokeWidth="0.5"
            opacity="0.4"
          />
          <path
            d="M 10 -15 L 42 12"
            stroke="#211508"
            strokeWidth="0.9"
            opacity="0.6"
          />
          <path
            d="M -15 12 L 12 16"
            stroke="#1f1408"
            strokeWidth="0.8"
            opacity="0.5"
          />
          <path
            d="M 68 -12 L 80 8"
            stroke="#1c1106"
            strokeWidth="1.1"
            opacity="0.6"
          />

          {/* Surface oxidation specks */}
          <circle cx="-12" cy="-9" r="1.5" fill="#1f1406" opacity="0.7" />
          <circle cx="48" cy="-8" r="1.8" fill="#2d4233" opacity="0.8" />
          <circle cx="-68" cy="11" r="1.3" fill="#1a0f04" opacity="0.6" />
          <circle cx="72" cy="11" r="1.6" fill="#324738" opacity="0.7" />
        </g>

        {/* 4. LOWER CONTROL KNOBS */}
        <g id="lower-knobs" transform="translate(300, 540)">
          {/* Left Knob: Volume */}
          <g transform="translate(-130, 0)">
            <circle cx="0" cy="0" r="28" fill="#140e08" stroke="#4a331a" strokeWidth="2.5" />
            <circle cx="0" cy="0" r="20" fill="#291a0c" stroke="#694821" strokeWidth="1.5" />
            {/* Knurled Grip Ridges */}
            {Array.from({ length: 12 }).map((_, i) => {
              const deg = i * 30;
              const rad = (deg * Math.PI) / 180;
              return (
                <line
                  key={i}
                  x1={19 * Math.cos(rad)}
                  y1={19 * Math.sin(rad)}
                  x2={27 * Math.cos(rad)}
                  y2={27 * Math.sin(rad)}
                  stroke="#382310"
                  strokeWidth="1.5"
                />
              );
            })}
            {/* Brass Indicator Pointer */}
            <line x1="0" y1="-26" x2="0" y2="-12" stroke="#d49d48" strokeWidth="3" />
            <circle cx="0" cy="0" r="8" fill="#4d3215" />
            <text
              x="0"
              y="42"
              fontFamily="'Cinzel', serif"
              fontSize="9"
              letterSpacing="1"
              fill="#9e8055"
              textAnchor="middle"
            >
              VOLUME
            </text>
          </g>

          {/* Center Brand Plaque (Subtle Thorne Cartographic Maker Stamp) */}
          <g transform="translate(0, 5)">
            <rect
              x="-48"
              y="-10"
              width="96"
              height="20"
              rx="2"
              fill="#170f08"
              stroke="#543c22"
              strokeWidth="1"
            />
            <text
              x="0"
              y="3"
              fontFamily="'Special Elite', monospace"
              fontSize="7.5"
              letterSpacing="1.5"
              fill="#9e8055"
              textAnchor="middle"
            >
              THORNE LABS
            </text>
          </g>

          {/* Right Knob: Tuning */}
          <g transform="translate(130, 0)">
            <circle cx="0" cy="0" r="28" fill="#140e08" stroke="#4a331a" strokeWidth="2.5" />
            <circle cx="0" cy="0" r="20" fill="#291a0c" stroke="#694821" strokeWidth="1.5" />
            {/* Knurled Grip Ridges */}
            {Array.from({ length: 12 }).map((_, i) => {
              const deg = i * 30;
              const rad = (deg * Math.PI) / 180;
              return (
                <line
                  key={i}
                  x1={19 * Math.cos(rad)}
                  y1={19 * Math.sin(rad)}
                  x2={27 * Math.cos(rad)}
                  y2={27 * Math.sin(rad)}
                  stroke="#382310"
                  strokeWidth="1.5"
                />
              );
            })}
            {/* Brass Indicator Pointer */}
            <line x1="16" y1="-20" x2="8" y2="-10" stroke="#d49d48" strokeWidth="3" />
            <circle cx="0" cy="0" r="8" fill="#4d3215" />
            <text
              x="0"
              y="42"
              fontFamily="'Cinzel', serif"
              fontSize="9"
              letterSpacing="1"
              fill="#9e8055"
              textAnchor="middle"
            >
              TUNING
            </text>
          </g>
        </g>

        {/* 5. CABINET BOTTOM BASE PLINTH */}
        <path
          d="M 40 605 L 560 605 L 568 625 L 32 625 Z"
          fill="#170d06"
          stroke="#3d220f"
          strokeWidth="2"
        />
        <line x1="45" y1="610" x2="555" y2="610" stroke="#523218" strokeWidth="1.2" />
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
          <span>Click to Enlarge</span>
        </button>
      </div>

      {/* Visible copy (exact wording per prompt) */}
      <div className="bg-[#171310] border border-[#382c21] rounded-lg p-6 mb-8 text-[#d8cdbf] shadow-inner">
        <p className="text-sm font-typewriter text-[#c8b5a0] mb-3 leading-relaxed">
          Thorne rebuilt this radio himself. He kept the old naming plate, even after the station stopped broadcasting.
        </p>

        <blockquote className="text-base sm:text-lg font-serif-body italic text-[#eee4d7] leading-relaxed border-l-2 border-[#c8924b] pl-4 my-2">
          &ldquo;The world used to speak in names instead of letters. It made fewer mistakes that way.&rdquo;
        </blockquote>
      </div>

      {/* Radio Specimen Container */}
      <div className="relative group flex flex-col items-center justify-center p-6 sm:p-10 rounded-xl border border-[#443527] bg-[#0c0907] overflow-hidden shadow-2xl">
        {/* Atmosphere noise background */}
        <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#d9ad67_1px,transparent_1px)] [background-size:16px_16px]" />

        <div
          id="radio-artifact-clickable"
          onClick={() => setIsLightboxOpen(true)}
          className="cursor-zoom-in transition-transform duration-300 group-hover:scale-[1.01] flex items-center justify-center relative z-10"
          title="Click to enlarge"
        >
          {renderRadioIllustration(false)}
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
        title="Reel VII — Rebuilt Radio Receiver"
        caption="High-resolution specimen view: examination of the chassis, broadcast dial, and mounted identification plate."
      >
        {renderRadioIllustration(true)}
      </LightboxModal>
    </div>
  );
};
