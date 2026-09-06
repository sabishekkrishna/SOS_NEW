import React, { useState } from 'react';
import { RoutePath } from '../types';
import { LightboxModal } from './LightboxModal';
import { ZoomIn, ArrowLeft, ArrowRight, Eye } from 'lucide-react';

interface StudyReel09Props {
  onNavigate: (path: RoutePath) => void;
}

export const StudyReel09: React.FC<StudyReel09Props> = ({ onNavigate }) => {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // High-resolution archival Journal Page SVG specimen
  const renderJournalPage = (isZoomed: boolean = false) => {
    const width = isZoomed ? 800 : 640;
    const height = isZoomed ? 1000 : 800;

    return (
      <svg
        viewBox="0 0 800 1000"
        width={width}
        height={height}
        className="max-w-full h-auto drop-shadow-2xl select-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Parchment gradient background */}
          <radialGradient id="parchmentGrad" cx="50%" cy="45%" r="70%">
            <stop offset="0%" stopColor="#f7f0e1" />
            <stop offset="65%" stopColor="#ecdcb9" />
            <stop offset="90%" stopColor="#d8bf8d" />
            <stop offset="100%" stopColor="#be9f6a" />
          </radialGradient>

          {/* Vignette border burn */}
          <radialGradient id="vignetteBurn" cx="50%" cy="50%" r="60%">
            <stop offset="70%" stopColor="#000000" stopOpacity="0" />
            <stop offset="95%" stopColor="#3d260f" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#251405" stopOpacity="0.65" />
          </radialGradient>

          {/* Coffee stain texture gradient */}
          <radialGradient id="stainRing1" cx="45%" cy="45%" r="50%">
            <stop offset="60%" stopColor="#b37e46" stopOpacity="0.05" />
            <stop offset="85%" stopColor="#7a4e21" stopOpacity="0.45" />
            <stop offset="95%" stopColor="#573310" stopOpacity="0.65" />
            <stop offset="100%" stopColor="#3b2005" stopOpacity="0.1" />
          </radialGradient>

          {/* Water splatter filter */}
          <filter id="inkRoughness" x="0%" y="0%" width="100%" height="100%">
            <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="4" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="2" />
          </filter>
        </defs>

        {/* Paper Sheet */}
        <rect x="20" y="20" width="760" height="960" rx="4" fill="url(#parchmentGrad)" />
        <rect x="20" y="20" width="760" height="960" rx="4" fill="url(#vignetteBurn)" />

        {/* Paper Faint Ruled Lines */}
        <g stroke="#cfb584" strokeWidth="0.75" strokeOpacity="0.4" strokeDasharray="3,3">
          {Array.from({ length: 22 }).map((_, i) => (
            <line key={i} x1="70" y1={180 + i * 32} x2="680" y2={180 + i * 32} />
          ))}
        </g>

        {/* Left red margin line */}
        <line x1="120" y1="60" x2="120" y2="940" stroke="#b86958" strokeWidth="1" strokeOpacity="0.4" />

        {/* Large Water damage faint bloom top-left */}
        <path
          d="M 40 40 Q 180 80 220 190 Q 200 280 110 260 Q 50 240 40 40 Z"
          fill="#cbb07a"
          opacity="0.25"
        />

        {/* Archival Header Stamp */}
        <g opacity="0.65" transform="translate(480, 50)">
          <rect x="0" y="0" width="220" height="60" fill="none" stroke="#7a2a1d" strokeWidth="1.5" strokeDasharray="6,2" />
          <text x="110" y="24" fontFamily="'Special Elite', monospace" fontSize="11" fill="#7a2a1d" textAnchor="middle" letterSpacing="2">
            SURVEY LOG — 1932
          </text>
          <text x="110" y="44" fontFamily="'Special Elite', monospace" fontSize="10" fill="#7a2a1d" textAnchor="middle">
            REEL IX • DESK PORTFOLIO
          </text>
        </g>

        {/* Thorne's Date & Location */}
        <text x="135" y="115" fontFamily="'Playfair Display', serif" fontStyle="italic" fontSize="18" fill="#38291b">
          October 14th — The Study, midnight
        </text>

        {/* Thorne's Handwritten Note */}
        <g fill="#291e14" fontFamily="'Playfair Display', Georgia, serif" fontSize="21" fontStyle="italic">
          <text x="135" y="195">They think I mapped mountains and rivers.</text>
          <text x="135" y="235">I mapped something else — a promise.</text>

          <text x="135" y="305">If you have tracked my footprints to this desk,</text>
          <text x="135" y="345">you already know the rule of my work:</text>
          <text x="135" y="385">nothing here is wasted, not even</text>
          <text x="135" y="425">a stain on the page.</text>

          <text x="135" y="495">The world watches the bold lines in ink,</text>
          <text x="135" y="535">while the quietest signals sit right at the fringe,</text>
          <text x="135" y="575">waiting for someone patient enough</text>
          <text x="135" y="615">to count the drops.</text>
        </g>

        {/* Thorne's Signature */}
        <path
          d="M 380 720 C 420 680 460 740 500 700 S 550 710 580 690 M 430 730 C 470 730 520 740 560 725"
          stroke="#261b11"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
        />
        <text x="440" y="760" fontFamily="'Special Elite', monospace" fontSize="13" fill="#4d3725" letterSpacing="1">
          — E. Thorne
        </text>

        {/* CRITICAL PUZZLE CLUE:
            Three evenly spaced circular coffee-ring stains at the bottom of the page in a horizontal fashion.
            Visually reads as authentic coffee ring drips, but cleanly forms Morse code (···) = S!
        */}
        <g id="bottom-stain-morse-clue" transform="translate(330, 860)">
          {/* First stain dot */}
          <g transform="translate(0, 0)">
            <circle cx="0" cy="0" r="15" fill="url(#stainRing1)" />
            <circle cx="0" cy="0" r="12" fill="#7a4e21" opacity="0.18" />
            <circle cx="-1" cy="1" r="5.5" fill="#573310" opacity="0.22" />
          </g>

          {/* Second stain dot - horizontal spacing */}
          <g transform="translate(60, 0)">
            <circle cx="0" cy="0" r="15" fill="url(#stainRing1)" />
            <circle cx="0" cy="0" r="12" fill="#7a4e21" opacity="0.18" />
            <circle cx="1" cy="-1" r="5.5" fill="#573310" opacity="0.22" />
          </g>

          {/* Third stain dot - horizontal spacing */}
          <g transform="translate(120, 0)">
            <circle cx="0" cy="0" r="15" fill="url(#stainRing1)" />
            <circle cx="0" cy="0" r="12" fill="#7a4e21" opacity="0.18" />
            <circle cx="0" cy="1" r="5.5" fill="#573310" opacity="0.22" />
          </g>

          {/* Faint coffee splatter speckles adding realism */}
          <circle cx="18" cy="9" r="1.5" fill="#5c3817" opacity="0.35" />
          <circle cx="75" cy="-8" r="1.2" fill="#5c3817" opacity="0.3" />
          <circle cx="138" cy="7" r="1.8" fill="#5c3817" opacity="0.35" />
        </g>

        {/* Bottom edge torn paper marks */}
        <path
          d="M 20 970 L 60 965 L 120 975 L 200 967 L 290 978 L 390 969 L 480 976 L 580 968 L 680 975 L 780 970"
          stroke="#735431"
          strokeWidth="2"
          fill="none"
          opacity="0.4"
        />

        {/* Archival catalog number penciled bottom-left */}
        <text x="50" y="940" fontFamily="'Special Elite', monospace" fontSize="11" fill="#806242">
          ARC-1932-TH-09 / DESK LEAF
        </text>
      </svg>
    );
  };

  return (
    <div id="reel-09-container" className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      {/* Exhibit Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#3b2e23] pb-5 mb-8">
        <div>
          <div className="flex items-center gap-2 text-xs font-typewriter text-[#c8924b] tracking-wider uppercase mb-1">
            <span>ARCHIVE DOSSIER • REEL IX</span>
            <span className="text-[#5e4b3c]">/</span>
            <code className="text-[#bfa58d] bg-[#1c1612] px-1.5 py-0.5 rounded border border-[#382b20]">
              /archive/reel-09
            </code>
          </div>
          <h1 className="text-3xl sm:text-4xl font-cinzel font-bold text-[#f3ede4]">
            Reel IX — The Study
          </h1>
        </div>

        <button
          id="study-zoom-cta-btn"
          type="button"
          onClick={() => setIsLightboxOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded bg-[#241c16] hover:bg-[#31261e] border border-[#524032] hover:border-[#c8924b] text-xs font-cinzel text-[#dfd4c5] transition-all shadow-md"
        >
          <ZoomIn className="w-4 h-4 text-[#c8924b]" />
          <span>Click to Zoom &amp; Inspect</span>
        </button>
      </div>

      {/* Visible Copy (EXACT WORDING PER PROMPT) */}
      <div className="bg-[#171310] border border-[#382c21] rounded-lg p-6 mb-8 text-[#d8cdbf] shadow-inner">
        <p className="text-xs uppercase font-typewriter tracking-widest text-[#a8927d] italic mb-3">
          Recovered page from Thorne&apos;s writing desk. Water and coffee damage throughout.
        </p>

        <blockquote className="text-base sm:text-lg font-serif-body italic text-[#eee4d7] leading-relaxed border-l-2 border-[#c8924b] pl-4 my-2">
          &ldquo;They think I mapped mountains and rivers. I mapped something else — a promise. If
          you&apos;ve come this far, you already understand: nothing here is wasted, not even a stain
          on the page.&rdquo;
        </blockquote>
      </div>

      {/* Scanned Journal Specimen Container */}
      <div className="relative group flex flex-col items-center justify-center p-4 sm:p-8 rounded-xl border border-[#443527] bg-[#0e0c0a] overflow-hidden shadow-2xl">
        <div
          id="study-artifact-clickable"
          onClick={() => setIsLightboxOpen(true)}
          className="cursor-zoom-in transition-transform duration-300 group-hover:scale-[1.01] flex items-center justify-center"
          title="Click to zoom and closely inspect paper margin and marks"
        >
          {renderJournalPage(false)}
        </div>

        {/* Hover inspection badge */}
        <button
          id="study-image-inspect-badge"
          type="button"
          onClick={() => setIsLightboxOpen(true)}
          className="absolute bottom-6 right-6 bg-black/80 hover:bg-black text-[#f3ede4] text-xs font-typewriter px-3 py-1.5 rounded-full border border-[#5a4635] flex items-center gap-1.5 backdrop-blur shadow-lg transition-colors"
        >
          <Eye className="w-3.5 h-3.5 text-[#c8924b]" />
          <span>Examine High-Res Artifact</span>
        </button>
      </div>

      {/* Archival Footnote */}
      <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-typewriter text-[#7b6959] border-t border-[#2d231b] pt-6">
        <div>CATALOGUE IDENTIFIER: REEL-09-DESK-LEAF</div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => onNavigate('/')}
            className="hover:text-[#c8924b] transition-colors flex items-center gap-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Archive
          </button>
          <span>•</span>
          <button
            type="button"
            onClick={() => onNavigate('/archive/reel-07')}
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
        title="Reel IX — Thorne's Study Manuscript"
        caption="High-resolution scan. Observe all margin marks, ink weights, and paper blemishes."
      >
        {renderJournalPage(true)}
      </LightboxModal>
    </div>
  );
};
