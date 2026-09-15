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

          {/* Deep Fountain Pen / Iron-Gall Ink Blot Gradient */}
          <radialGradient id="inkBlotGrad" cx="45%" cy="40%" r="55%">
            <stop offset="0%" stopColor="#100b07" stopOpacity="0.95" />
            <stop offset="55%" stopColor="#1e140c" stopOpacity="0.85" />
            <stop offset="82%" stopColor="#362214" stopOpacity="0.6" />
            <stop offset="94%" stopColor="#57371f" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#57371f" stopOpacity="0" />
          </radialGradient>

          {/* Ink capillary absorption rough edge filter */}
          <filter id="inkBleedRoughness" x="-30%" y="-30%" width="160%" height="160%">
            <feTurbulence type="fractalNoise" baseFrequency="0.09" numOctaves="3" result="noise" />
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

        {/* The ONLY text on the page: "The Vault Begins Here" */}
        <g
          fill="#24170d"
          fontFamily="'Playfair Display', Georgia, serif"
          fontSize="44"
          fontStyle="italic"
          fontWeight="bold"
        >
          <text x="150" y="490">The</text>
          <text x="275" y="490">Vault</text>
          <text x="430" y="490">Begins</text>
          <text x="605" y="490">Here</text>
        </g>

        {/* CRITICAL PUZZLE ARTIFACT:
            The four stains are exclusively on the starting letter of each word:
            The, Vault, Begins, Here
            Rendered as authentic fountain-pen ink stains / ink blots.
            First letters:
            'T' in The    -> x=164, y=472
            'V' in Vault  -> x=290, y=472
            'B' in Begins -> x=446, y=472
            'H' in Here   -> x=624, y=472
        */}
        <g id="ink-initial-letter-stains">
          {[
            {
              x: 164,
              y: 472,
              r: 15,
              id: 'ink-stain-t',
              spatters: [{ dx: -11, dy: -10, r: 1.0 }, { dx: 12, dy: 8, r: 1.2 }, { dx: -8, dy: 11, r: 0.7 }],
            },
            {
              x: 290,
              y: 472,
              r: 15,
              id: 'ink-stain-v',
              spatters: [{ dx: -12, dy: 8, r: 1.2 }, { dx: 11, dy: -9, r: 0.9 }, { dx: 6, dy: 13, r: 0.8 }],
            },
            {
              x: 446,
              y: 472,
              r: 15.5,
              id: 'ink-stain-b',
              spatters: [{ dx: 13, dy: 7, r: 1.1 }, { dx: -10, dy: -11, r: 0.8 }, { dx: -7, dy: 12, r: 1.0 }],
            },
            {
              x: 624,
              y: 472,
              r: 15.5,
              id: 'ink-stain-h',
              spatters: [{ dx: 13, dy: -8, r: 1.1 }, { dx: -12, dy: 9, r: 0.9 }, { dx: 8, dy: 13, r: 0.8 }],
            },
          ].map((stain, idx) => (
            <g key={idx} id={stain.id} transform={`translate(${stain.x}, ${stain.y})`}>
              {/* Soft capillary ink bleed perimeter */}
              <circle
                cx="0"
                cy="0"
                r={stain.r + 2}
                fill="url(#inkBlotGrad)"
                opacity="0.45"
                filter="url(#inkBleedRoughness)"
              />
              {/* Main dense wet ink blot body */}
              <ellipse
                cx="0.5"
                cy="-0.5"
                rx={stain.r}
                ry={stain.r * 0.92}
                fill="url(#inkBlotGrad)"
                filter="url(#inkBleedRoughness)"
              />
              {/* Deep concentrated ink core */}
              <ellipse
                cx="-0.5"
                cy="0.5"
                rx={stain.r * 0.55}
                ry={stain.r * 0.52}
                fill="#150e09"
                opacity="0.82"
              />
              {/* Microscopic ink spatters / flickers from the pen nib */}
              {stain.spatters.map((sp, sIdx) => (
                <circle
                  key={sIdx}
                  cx={sp.dx}
                  cy={sp.dy}
                  r={sp.r}
                  fill="#1b120c"
                  opacity="0.7"
                />
              ))}
            </g>
          ))}
        </g>

        {/* Ellias Thorne signature at one corner (bottom right) */}
        <g id="ellias-thorne-signature" transform="translate(450, 750)">
          <path
            d="M 10 30 C 50 -10 90 50 130 10 S 180 20 210 0 M 60 40 C 100 40 150 50 190 35"
            stroke="#261b11"
            strokeWidth="2.4"
            fill="none"
            strokeLinecap="round"
          />
          <text
            x="85"
            y="70"
            fontFamily="'Special Elite', 'Playfair Display', cursive, serif"
            fontSize="18"
            fill="#3a2717"
            letterSpacing="1"
            fontStyle="italic"
          >
            — Ellias Thorne
          </text>
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
