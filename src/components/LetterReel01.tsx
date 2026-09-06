import React, { useState } from 'react';
import { RoutePath } from '../types';
import { LightboxModal } from './LightboxModal';
import { ZoomIn, ArrowLeft, ArrowRight, Eye, RotateCw, RotateCcw, ShieldCheck } from 'lucide-react';

interface LetterReel01Props {
  onNavigate: (path: RoutePath) => void;
}

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

export const LetterReel01: React.FC<LetterReel01Props> = ({ onNavigate }) => {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [shiftOffset, setShiftOffset] = useState<number>(0);

  // SVG Burned Letter Specimen (Rendered as graphic image, non-selectable)
  const renderBurnedLetter = (isZoomed: boolean = false) => {
    const width = isZoomed ? 820 : 640;
    const height = isZoomed ? 560 : 440;

    return (
      <svg
        viewBox="0 0 800 520"
        width={width}
        height={height}
        className="max-w-full h-auto drop-shadow-2xl select-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Burned Parchment Gradient */}
          <radialGradient id="charredParchment" cx="50%" cy="50%" r="65%">
            <stop offset="0%" stopColor="#f3e6cf" />
            <stop offset="60%" stopColor="#e5d0ad" />
            <stop offset="80%" stopColor="#bfa073" />
            <stop offset="92%" stopColor="#573b1c" />
            <stop offset="98%" stopColor="#1c1108" />
            <stop offset="100%" stopColor="#080402" />
          </radialGradient>

          {/* Singe Shadow Mask */}
          <linearGradient id="topChar" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#0a0502" />
            <stop offset="15%" stopColor="#3d210d" stopOpacity="0.8" />
            <stop offset="35%" stopColor="#3d210d" stopOpacity="0" />
          </linearGradient>

          <linearGradient id="bottomChar" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#0a0502" />
            <stop offset="18%" stopColor="#47230b" stopOpacity="0.85" />
            <stop offset="40%" stopColor="#47230b" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Charred background void */}
        <rect x="10" y="10" width="780" height="500" fill="#0c0a08" />

        {/* Burned jagged letter silhouette */}
        <path
          d="M 50 80 
             Q 120 40 220 50 
             Q 340 70 460 45 
             Q 590 35 680 75 
             Q 740 100 750 160 
             Q 765 240 730 320 
             Q 750 390 710 440 
             Q 640 480 540 460 
             Q 440 485 330 465 
             Q 210 490 120 450 
             Q 45 420 40 330 
             Q 60 250 40 170 
             Z"
          fill="url(#charredParchment)"
          stroke="#261407"
          strokeWidth="3"
        />

        {/* Singed Edges and Burn Gradients */}
        <path
          d="M 50 80 Q 120 40 220 50 Q 340 70 460 45 Q 590 35 680 75 Q 740 100 750 160 Q 765 240 730 320 Q 750 390 710 440 Q 640 480 540 460 Q 440 485 330 465 Q 210 490 120 450 Q 45 420 40 330 Q 60 250 40 170 Z"
          fill="url(#topChar)"
          opacity="0.75"
        />
        <path
          d="M 50 80 Q 120 40 220 50 Q 340 70 460 45 Q 590 35 680 75 Q 740 100 750 160 Q 765 240 730 320 Q 750 390 710 440 Q 640 480 540 460 Q 440 485 330 465 Q 210 490 120 450 Q 45 420 40 330 Q 60 250 40 170 Z"
          fill="url(#bottomChar)"
          opacity="0.8"
        />

        {/* Burn Holes in Paper */}
        <ellipse cx="660" cy="110" rx="30" ry="18" fill="#0c0a08" />
        <ellipse cx="660" cy="110" rx="36" ry="22" fill="none" stroke="#381d09" strokeWidth="4" opacity="0.8" />

        <ellipse cx="110" cy="410" rx="26" ry="14" fill="#0c0a08" />
        <ellipse cx="110" cy="410" rx="32" ry="18" fill="none" stroke="#381d09" strokeWidth="3" opacity="0.8" />

        {/* Faint Red Official Stamp on Charred Paper */}
        <g transform="translate(140, 110)" opacity="0.5">
          <rect x="0" y="0" width="130" height="34" rx="2" fill="none" stroke="#8c2918" strokeWidth="1.5" strokeDasharray="4,2" />
          <text x="65" y="16" fontFamily="'Special Elite', monospace" fontSize="9" fill="#8c2918" textAnchor="middle">
            RESTRICTED
          </text>
          <text x="65" y="27" fontFamily="'Special Elite', monospace" fontSize="8" fill="#8c2918" textAnchor="middle">
            DISPATCH NO. 1
          </text>
        </g>

        {/* Hand-lettered introductory note */}
        <text x="140" y="175" fontFamily="'Playfair Display', serif" fontStyle="italic" fontSize="16" fill="#4d3520">
          To whoever holds the survey charts:
        </text>

        {/* Charred line dividers */}
        <line x1="140" y1="205" x2="640" y2="205" stroke="#997b54" strokeWidth="0.8" strokeDasharray="3,3" opacity="0.5" />

        {/* CRITICAL PUZZLE ARTIFACT:
            THE CIPHERTEXT RENDERED AS PART OF THE IMAGE (NOT SELECTABLE HTML TEXT)
            "WKH YDXOW RSHQV WR VHYHQ"
            Caesar shift 3:
            W -> T
            K -> H
            H -> E
            Y -> V
            D -> A
            X -> U
            O -> L
            W -> T
            R -> O
            S -> P
            H -> E
            Q -> N
            V -> S
            W -> T
            R -> O
            V -> S
            H -> E
            Y -> V
            H -> E
            Q -> N
            Decodes to: "THE VAULT OPENS TO SEVEN" -> 7!
        */}
        <g id="ciphertext-graphic-letters" transform="translate(400, 275)">
          {/* Shadow of heavy typewriter impression */}
          <text
            x="2"
            y="2"
            fontFamily="'Special Elite', 'Courier Prime', monospace"
            fontSize="32"
            fontWeight="bold"
            fill="#120c06"
            textAnchor="middle"
            letterSpacing="6"
            opacity="0.9"
          >
            WKH YDXOW RSHQV WR VHYHQ
          </text>

          {/* Sharp Weathered Ink Text */}
          <text
            x="0"
            y="0"
            fontFamily="'Special Elite', 'Courier Prime', monospace"
            fontSize="32"
            fontWeight="bold"
            fill="#291809"
            textAnchor="middle"
            letterSpacing="6"
          >
            WKH YDXOW RSHQV WR VHYHQ
          </text>
        </g>

        <line x1="140" y1="320" x2="640" y2="320" stroke="#997b54" strokeWidth="0.8" strokeDasharray="3,3" opacity="0.5" />

        {/* Footnote text on parchment */}
        <text x="140" y="360" fontFamily="'Playfair Display', serif" fontStyle="italic" fontSize="15" fill="#4a3523">
          The code of entry is fourfold. When the reels descend, the barrier yields.
        </text>

        {/* Thorne's Initial */}
        <text x="590" y="405" fontFamily="'Special Elite', monospace" fontSize="18" fill="#3b2614">
          — E. T.
        </text>
      </svg>
    );
  };

  // Rotate cipher wheel helper
  const handleRotate = (step: number) => {
    setShiftOffset((prev) => (prev + step + 26) % 26);
  };

  return (
    <div id="reel-01-container" className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      {/* Exhibit Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#3b2e23] pb-5 mb-8">
        <div>
          <div className="flex items-center gap-2 text-xs font-typewriter text-[#c8924b] tracking-wider uppercase mb-1">
            <span>ARCHIVE DOSSIER • REEL I</span>
            <span className="text-[#5e4b3c]">/</span>
            <code className="text-[#bfa58d] bg-[#1c1612] px-1.5 py-0.5 rounded border border-[#382b20]">
              /archive/reel-01
            </code>
          </div>
          <h1 className="text-3xl sm:text-4xl font-cinzel font-bold text-[#f3ede4]">
            Reel I — The Letter
          </h1>
        </div>

        <button
          id="letter-zoom-cta-btn"
          type="button"
          onClick={() => setIsLightboxOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded bg-[#241c16] hover:bg-[#31261e] border border-[#524032] hover:border-[#c8924b] text-xs font-cinzel text-[#dfd4c5] transition-all shadow-md"
        >
          <ZoomIn className="w-4 h-4 text-[#c8924b]" />
          <span>Click to Inspect Charred Letter</span>
        </button>
      </div>

      {/* Visible Copy (EXACT WORDING PER PROMPT) */}
      <div className="bg-[#171310] border border-[#382c21] rounded-lg p-6 mb-8 text-[#d8cdbf] shadow-inner">
        <p className="text-xs uppercase font-typewriter tracking-widest text-[#a8927d] italic mb-3">
          A burned letter, edges lost, the rest legible.
        </p>

        <blockquote className="text-base sm:text-lg font-serif-body italic text-[#eee4d7] leading-relaxed border-l-2 border-[#c8924b] pl-4 my-2">
          &ldquo;I never trusted plain words with plain meaning. Shift them the way the map told you,
          and read again.&rdquo;
        </blockquote>
      </div>

      {/* Burned Letter Specimen Container (Image, non-selectable HTML text) */}
      <div className="relative group flex flex-col items-center justify-center p-4 sm:p-8 rounded-xl border border-[#443527] bg-[#0b0907] overflow-hidden shadow-2xl mb-10">
        <div
          id="letter-artifact-clickable"
          onClick={() => setIsLightboxOpen(true)}
          className="cursor-zoom-in transition-transform duration-300 group-hover:scale-[1.01] flex items-center justify-center"
          title="Click to zoom in on the charred letter and inspect the cipher"
        >
          {renderBurnedLetter(false)}
        </div>

        {/* Hover inspection badge */}
        <button
          id="letter-image-inspect-badge"
          type="button"
          onClick={() => setIsLightboxOpen(true)}
          className="absolute bottom-6 right-6 bg-black/80 hover:bg-black text-[#f3ede4] text-xs font-typewriter px-3 py-1.5 rounded-full border border-[#5a4635] flex items-center gap-1.5 backdrop-blur shadow-lg transition-colors"
        >
          <Eye className="w-3.5 h-3.5 text-[#c8924b]" />
          <span>Enlarge Singed Manuscript</span>
        </button>
      </div>

      {/* OPTIONAL DECORATIVE CIPHER WHEEL WIDGET (PURELY MANUAL TOOL, DOES NOT AUTO-SOLVE) */}
      <div className="border border-[#382c20] bg-[#15110e] rounded-xl p-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#2d2319] pb-4 mb-6">
          <div>
            <div className="text-xs font-typewriter text-[#c8924b] uppercase tracking-wider mb-0.5">
              FIELD DECODING AID
            </div>
            <h3 className="text-lg font-cinzel font-bold text-[#f0e6d6]">
              Dual-Ring Manual Cipher Wheel
            </h3>
            <p className="text-xs font-serif-body text-[#9e8d7c]">
              Rotate the inner ring to align with the key obtained from the survey map.
            </p>
          </div>

          {/* Wheel Control Buttons */}
          <div className="flex items-center gap-2">
            <button
              id="cipher-wheel-rotate-left"
              type="button"
              onClick={() => handleRotate(-1)}
              className="p-2 bg-[#201812] hover:bg-[#2c2219] text-[#cbb8a2] hover:text-white rounded border border-[#443527] transition-colors flex items-center gap-1 text-xs"
              title="Rotate Counter-Clockwise"
            >
              <RotateCcw className="w-4 h-4" />
              <span className="hidden sm:inline">Counter-CW</span>
            </button>
            <div className="font-mono text-xs text-[#c8924b] bg-[#1a140f] px-3 py-1.5 rounded border border-[#3d2f23]">
              Shift: {shiftOffset}
            </div>
            <button
              id="cipher-wheel-rotate-right"
              type="button"
              onClick={() => handleRotate(1)}
              className="p-2 bg-[#201812] hover:bg-[#2c2219] text-[#cbb8a2] hover:text-white rounded border border-[#443527] transition-colors flex items-center gap-1 text-xs"
              title="Rotate Clockwise"
            >
              <RotateCw className="w-4 h-4" />
              <span className="hidden sm:inline">Clockwise</span>
            </button>
            <button
              id="cipher-wheel-reset"
              type="button"
              onClick={() => setShiftOffset(0)}
              className="text-xs px-2.5 py-2 text-[#8a7665] hover:text-[#d4c1ad] transition-colors"
            >
              Reset
            </button>
          </div>
        </div>

        {/* Visual Two-Ring Circular Wheel Graphic */}
        <div className="flex flex-col md:flex-row items-center justify-around gap-6">
          <div className="relative w-64 h-64 sm:w-72 sm:h-72 select-none">
            <svg viewBox="0 0 300 300" className="w-full h-full drop-shadow-lg">
              {/* Outer Ring Background (Fixed, Ciphertext) */}
              <circle cx="150" cy="150" r="140" fill="#1f1813" stroke="#54412f" strokeWidth="2" />
              <circle cx="150" cy="150" r="102" fill="#15110d" stroke="#3d2f22" strokeWidth="1.5" />

              {/* Outer Ring Letters: Fixed A-Z */}
              {ALPHABET.map((char, i) => {
                const angle = (i * 360) / 26 - 90;
                const rad = (angle * Math.PI) / 180;
                const x = 150 + 120 * Math.cos(rad);
                const y = 150 + 120 * Math.sin(rad);
                return (
                  <text
                    key={`outer-${char}`}
                    x={x}
                    y={y}
                    fill="#c8924b"
                    fontFamily="'Special Elite', monospace"
                    fontSize="11"
                    fontWeight="bold"
                    textAnchor="middle"
                    dominantBaseline="central"
                  >
                    {char}
                  </text>
                );
              })}

              {/* Inner Ring (Rotates based on shiftOffset) */}
              <g
                style={{
                  transform: `rotate(${-(shiftOffset * 360) / 26}deg)`,
                  transformOrigin: '150px 150px',
                  transition: 'transform 0.25s ease-out',
                }}
              >
                <circle cx="150" cy="150" r="100" fill="#292018" stroke="#75593c" strokeWidth="2" />
                <circle cx="150" cy="150" r="65" fill="#1a140f" stroke="#4d3926" strokeWidth="1.5" />

                {ALPHABET.map((char, i) => {
                  const angle = (i * 360) / 26 - 90;
                  const rad = (angle * Math.PI) / 180;
                  const x = 150 + 82 * Math.cos(rad);
                  const y = 150 + 82 * Math.sin(rad);
                  return (
                    <text
                      key={`inner-${char}`}
                      x={x}
                      y={y}
                      fill="#eddcc7"
                      fontFamily="'Special Elite', monospace"
                      fontSize="11"
                      fontWeight="bold"
                      textAnchor="middle"
                      dominantBaseline="central"
                    >
                      {char}
                    </text>
                  );
                })}
              </g>

              {/* Center Medallion */}
              <circle cx="150" cy="150" r="45" fill="#140f0c" stroke="#5a422d" strokeWidth="1.5" />
              <text
                x="150"
                y="146"
                fill="#8f7a68"
                fontFamily="'Cinzel', serif"
                fontSize="8"
                textAnchor="middle"
                letterSpacing="1"
              >
                OUTER: CIPHER
              </text>
              <text
                x="150"
                y="158"
                fill="#8f7a68"
                fontFamily="'Cinzel', serif"
                fontSize="8"
                textAnchor="middle"
                letterSpacing="1"
              >
                INNER: PLAIN
              </text>
            </svg>
          </div>

          {/* Quick letter alignment table preview */}
          <div className="w-full max-w-sm bg-[#1a1410] p-4 rounded-lg border border-[#33281f] text-xs font-mono">
            <div className="text-[#a08d7b] mb-2 font-typewriter flex items-center justify-between">
              <span>ACTIVE PAIRINGS:</span>
              <span className="text-[#c8924b]">Shift: {shiftOffset}</span>
            </div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-[#d8cdbe]">
              <div className="flex justify-between border-b border-[#292018] py-0.5">
                <span className="text-[#c8924b]">Cipher W</span>
                <span>→</span>
                <span className="font-bold text-[#f5ebd7]">
                  {ALPHABET[(22 - shiftOffset + 26) % 26]}
                </span>
              </div>
              <div className="flex justify-between border-b border-[#292018] py-0.5">
                <span className="text-[#c8924b]">Cipher K</span>
                <span>→</span>
                <span className="font-bold text-[#f5ebd7]">
                  {ALPHABET[(10 - shiftOffset + 26) % 26]}
                </span>
              </div>
              <div className="flex justify-between border-b border-[#292018] py-0.5">
                <span className="text-[#c8924b]">Cipher H</span>
                <span>→</span>
                <span className="font-bold text-[#f5ebd7]">
                  {ALPHABET[(7 - shiftOffset + 26) % 26]}
                </span>
              </div>
              <div className="flex justify-between border-b border-[#292018] py-0.5">
                <span className="text-[#c8924b]">Cipher Y</span>
                <span>→</span>
                <span className="font-bold text-[#f5ebd7]">
                  {ALPHABET[(24 - shiftOffset + 26) % 26]}
                </span>
              </div>
            </div>
            <p className="mt-3 text-[11px] text-[#786656] font-serif-body italic">
              Manual inspection aid only. Adjust shift offset and match the ciphertext characters directly.
            </p>
          </div>
        </div>
      </div>

      {/* Archival Footnote */}
      <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-typewriter text-[#7b6959] border-t border-[#2d231b] pt-6">
        <div>CATALOGUE IDENTIFIER: REEL-01-BURNED-MSS</div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => onNavigate('/archive/reel-03')}
            className="hover:text-[#c8924b] transition-colors flex items-center gap-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Previous Fragment
          </button>
          <span>•</span>
          <button
            type="button"
            onClick={() => onNavigate('/vault')}
            className="hover:text-[#c8924b] transition-colors flex items-center gap-1 font-bold text-[#c8924b]"
          >
            Proceed to Vault <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Lightbox Modal for Close Inspection */}
      <LightboxModal
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        title="Reel I — Burned Dispatch Manuscript"
        caption="High-resolution scan. Observe the singed edges, charred voids, and stamped ciphertext."
      >
        {renderBurnedLetter(true)}
      </LightboxModal>
    </div>
  );
};
