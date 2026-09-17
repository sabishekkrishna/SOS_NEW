import React, { useState } from 'react';
import { RoutePath } from '../types';
import { LightboxModal } from './LightboxModal';
import { ZoomIn, ArrowLeft, ArrowRight } from 'lucide-react';

interface RadioReel07Props {
  onNavigate: (path: RoutePath) => void;
}

export const RadioReel07: React.FC<RadioReel07Props> = ({ onNavigate }) => {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // SVG: A long, slightly curled paper-tape strip pulled from the receiver's recorder
  // Punched with dense, irregular Morse-style dots and dashes (visual noise),
  // with one isolated single dot punch roughly two-thirds along the strip,
  // flanked by noticeably wider blank gaps on both sides.
  const renderPaperTapeIllustration = (isZoomed: boolean = false) => {
    const width = isZoomed ? 1100 : 720;
    const height = (width * 200) / 1000;

    // Deterministic visual noise punches for left region (x: 75 -> 510)
    const leftPunches = [
      { type: 'dash', w: 18 }, { type: 'dot', w: 7 }, { type: 'dot', w: 7 }, { type: 'dash', w: 16 },
      { type: 'dot', w: 7 }, { type: 'dash', w: 20 }, { type: 'dash', w: 17 }, { type: 'dot', w: 7 },
      { type: 'dot', w: 7 }, { type: 'dash', w: 19 }, { type: 'dash', w: 16 }, { type: 'dot', w: 7 },
      { type: 'dash', w: 17 }, { type: 'dot', w: 7 }, { type: 'dot', w: 7 }, { type: 'dash', w: 20 },
      { type: 'dash', w: 16 }, { type: 'dot', w: 7 }, { type: 'dash', w: 18 }, { type: 'dot', w: 7 },
      { type: 'dash', w: 17 }, { type: 'dot', w: 7 }, { type: 'dash', w: 19 }, { type: 'dash', w: 16 },
      { type: 'dot', w: 7 }, { type: 'dash', w: 18 },
    ];

    // Compute x positions for left punches (ending cleanly at ~510 to create a very wide clearing)
    let curX = 75;
    const leftRenderData: { x: number; w: number; isDash: boolean }[] = [];
    leftPunches.forEach((p, i) => {
      if (curX + p.w <= 512) {
        leftRenderData.push({ x: curX, w: p.w, isDash: p.type === 'dash' });
        const gap = (i % 3 === 0) ? 8.5 : 5.5;
        curX += p.w + gap;
      }
    });

    // ISOLATED SINGLE DOT at roughly two-thirds of the strip (~x = 648)
    // Left empty space: from ~512 to 648 = ~136px of completely clear paper tape
    // Right empty space: from 656 to 786 = ~130px of completely clear paper tape
    // (Noticeably wider than the tight 5.5-8.5px intra-letter noise gaps)
    const isolatedDotX = 648;

    // Right punches (dense visual noise starting after the wide clearing, x: 786 -> 935)
    const rightPunches = [
      { type: 'dash', w: 17 }, { type: 'dot', w: 7 }, { type: 'dash', w: 19 }, { type: 'dot', w: 7 },
      { type: 'dot', w: 7 }, { type: 'dash', w: 18 }, { type: 'dash', w: 16 }, { type: 'dot', w: 7 },
      { type: 'dot', w: 7 }, { type: 'dash', w: 20 }, { type: 'dot', w: 7 }, { type: 'dash', w: 17 },
    ];

    let rightCurX = 786;
    const rightRenderData: { x: number; w: number; isDash: boolean }[] = [];
    rightPunches.forEach((p, i) => {
      if (rightCurX + p.w <= 936) {
        rightRenderData.push({ x: rightCurX, w: p.w, isDash: p.type === 'dash' });
        const gap = (i % 3 === 0) ? 8.5 : 5.5;
        rightCurX += p.w + gap;
      }
    });

    return (
      <svg
        viewBox="0 0 1000 200"
        width={width}
        height={height}
        className="max-w-full h-auto drop-shadow-2xl select-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Aged paper tape surface gradient */}
          <linearGradient id="agedTapeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#f7f1e4" />
            <stop offset="30%" stopColor="#ede1c9" />
            <stop offset="75%" stopColor="#dfcfb1" />
            <stop offset="100%" stopColor="#c5b08e" />
          </linearGradient>

          {/* Slight 3D paper curl highlight and shadow along the horizontal ribbon */}
          <linearGradient id="tapeCurlSheen" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.2" />
            <stop offset="15%" stopColor="#ffffff" stopOpacity="0.05" />
            <stop offset="35%" stopColor="#000000" stopOpacity="0.04" />
            <stop offset="65%" stopColor="#ffffff" stopOpacity="0.08" />
            <stop offset="85%" stopColor="#000000" stopOpacity="0.06" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.15" />
          </linearGradient>

          {/* Punched hole interior cavity shadow */}
          <radialGradient id="punchHoleShadow" cx="50%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#0a0806" />
            <stop offset="70%" stopColor="#120e0b" />
            <stop offset="100%" stopColor="#1a140f" />
          </radialGradient>

          {/* Paper drop shadow filter */}
          <filter id="tapeDropShadow" x="-5%" y="-20%" width="110%" height="150%">
            <feDropShadow dx="0" dy="6" stdDeviation="5" floodColor="#000000" floodOpacity="0.65" />
          </filter>
        </defs>

        {/* 1. PAPER-TAPE STRIP (Aged, slightly curled ribbon with torn ends) */}
        <g filter="url(#tapeDropShadow)">
          {/* Main Paper Ribbon Body (Length ~900px, Height ~54px, y: 72 -> 126) */}
          <path
            d="
              M 52 75
              C 250 69, 500 75, 750 71
              C 840 70, 910 73, 946 75
              L 949 79 L 945 84 L 948 90 L 943 96 L 947 103 L 944 110 L 948 116 L 944 122 L 946 127
              C 800 131, 550 126, 300 129
              C 180 131, 100 128, 54 126
              L 51 121 L 55 115 L 50 109 L 54 102 L 49 95 L 53 89 L 48 83 L 52 75
              Z
            "
            fill="url(#agedTapeGrad)"
            stroke="#b8a17d"
            strokeWidth="1"
          />

          {/* Subtle paper curl lighting overlay */}
          <path
            d="
              M 52 75
              C 250 69, 500 75, 750 71
              C 840 70, 910 73, 946 75
              L 946 127
              C 800 131, 550 126, 300 129
              C 180 131, 100 128, 54 126
              Z
            "
            fill="url(#tapeCurlSheen)"
          />

          {/* Faint edge wear and paper aging rim lines */}
          <path
            d="M 54 77 C 250 71, 500 77, 750 73 C 840 72, 910 75, 944 77"
            fill="none"
            stroke="#dfcfb1"
            strokeWidth="0.8"
            opacity="0.8"
          />
          <path
            d="M 56 124 C 200 129, 550 124, 800 129 C 880 128, 920 126, 944 125"
            fill="none"
            stroke="#a38965"
            strokeWidth="0.8"
            opacity="0.6"
          />

          {/* 2. DENSE VISUAL NOISE (LEFT REGION) */}
          {/* Punched dots (circles) and dashes (oblong slots) */}
          <g id="left-noise-punches">
            {leftRenderData.map((p, idx) => (
              <g key={`l-punch-${idx}`} transform={`translate(${p.x}, 96)`}>
                {p.isDash ? (
                  // Oblong dash punch
                  <>
                    <rect
                      x="0"
                      y="0"
                      width={p.w}
                      height="8"
                      rx="3.5"
                      fill="url(#punchHoleShadow)"
                      stroke="#1a140f"
                      strokeWidth="0.5"
                    />
                    {/* Upper punched hole rim depth shadow */}
                    <line x1="2" y1="0.5" x2={p.w - 2} y2="0.5" stroke="#000000" strokeWidth="0.8" opacity="0.85" />
                    {/* Bottom paper punch rim highlight */}
                    <line x1="2" y1="7.8" x2={p.w - 2} y2="7.8" stroke="#fcf8f0" strokeWidth="0.5" opacity="0.5" />
                  </>
                ) : (
                  // Circular dot punch
                  <>
                    <circle
                      cx="3.8"
                      cy="4"
                      r="3.8"
                      fill="url(#punchHoleShadow)"
                      stroke="#1a140f"
                      strokeWidth="0.5"
                    />
                    <path
                      d="M 1 3.5 A 3 3 0 0 1 6.6 3.5"
                      fill="none"
                      stroke="#000000"
                      strokeWidth="0.7"
                      opacity="0.85"
                    />
                    <path
                      d="M 1.2 4.5 A 3 3 0 0 0 6.4 4.5"
                      fill="none"
                      stroke="#fcf8f0"
                      strokeWidth="0.5"
                      opacity="0.5"
                    />
                  </>
                )}
              </g>
            ))}
          </g>

          {/* ========================================================================= */}
          {/* CRITICAL PUZZLE SPECIFICATION:
              Roughly two-thirds of the way along the strip, break the noise with ONE ISOLATED
              SINGLE DOT PUNCH. On both sides of this dot, leave a gap noticeably wider than every
              other gap on the tape — wide enough to read, once zoomed, as a deliberate pause
              rather than just another letter-break.
              (Morse code single dot '.' = E)
          */}
          {/* ========================================================================= */}
          <g id="isolated-single-dot" transform={`translate(${isolatedDotX}, 96)`}>
            {/* The crisp single dot punch standing isolated in the wide clearing */}
            <circle
              cx="4"
              cy="4"
              r="4.4"
              fill="url(#punchHoleShadow)"
              stroke="#100b07"
              strokeWidth="0.8"
            />
            {/* 3D Paper punch depth: Top inner shadow */}
            <path
              d="M 0.6 3.5 A 3.8 3.8 0 0 1 7.4 3.5"
              fill="none"
              stroke="#000000"
              strokeWidth="0.95"
              opacity="0.95"
            />
            {/* Bottom edge paper thickness highlight */}
            <path
              d="M 0.8 4.6 A 3.8 3.8 0 0 0 7.2 4.6"
              fill="none"
              stroke="#ffffff"
              strokeWidth="0.75"
              opacity="0.7"
            />
          </g>

          {/* 3. DENSE VISUAL NOISE (RIGHT REGION) */}
          <g id="right-noise-punches">
            {rightRenderData.map((p, idx) => (
              <g key={`r-punch-${idx}`} transform={`translate(${p.x}, 96)`}>
                {p.isDash ? (
                  <>
                    <rect
                      x="0"
                      y="0"
                      width={p.w}
                      height="8"
                      rx="3.5"
                      fill="url(#punchHoleShadow)"
                      stroke="#1a140f"
                      strokeWidth="0.5"
                    />
                    <line x1="2" y1="0.5" x2={p.w - 2} y2="0.5" stroke="#000000" strokeWidth="0.8" opacity="0.85" />
                    <line x1="2" y1="7.8" x2={p.w - 2} y2="7.8" stroke="#fcf8f0" strokeWidth="0.5" opacity="0.5" />
                  </>
                ) : (
                  <>
                    <circle
                      cx="3.8"
                      cy="4"
                      r="3.8"
                      fill="url(#punchHoleShadow)"
                      stroke="#1a140f"
                      strokeWidth="0.5"
                    />
                    <path
                      d="M 1 3.5 A 3 3 0 0 1 6.6 3.5"
                      fill="none"
                      stroke="#000000"
                      strokeWidth="0.7"
                      opacity="0.85"
                    />
                    <path
                      d="M 1.2 4.5 A 3 3 0 0 0 6.4 4.5"
                      fill="none"
                      stroke="#fcf8f0"
                      strokeWidth="0.5"
                      opacity="0.5"
                    />
                  </>
                )}
              </g>
            ))}
          </g>

          {/* Torn edge loose fiber details */}
          <line x1="51" y1="84" x2="48" y2="83" stroke="#e8dcc4" strokeWidth="1" />
          <line x1="50" y1="108" x2="47" y2="109" stroke="#e8dcc4" strokeWidth="1" />
          <line x1="946" y1="88" x2="950" y2="87" stroke="#e8dcc4" strokeWidth="1" />
          <line x1="945" y1="114" x2="949" y2="115" stroke="#e8dcc4" strokeWidth="1" />
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
          <span>Click to Enlarge</span>
        </button>
      </div>

      {/* Visible copy (exact wording per prompt) */}
      <div className="bg-[#171310] border border-[#382c21] rounded-lg p-6 mb-8 text-[#d8cdbf] shadow-inner">
        <p className="text-sm font-typewriter text-[#c8b5a0] mb-3 leading-relaxed">
          A strip of paper tape, pulled from the receiver&apos;s recorder. Most of it is noise — one mark stands alone.
        </p>

        <blockquote className="text-base sm:text-lg font-serif-body italic text-[#eee4d7] leading-relaxed border-l-2 border-[#c8924b] pl-4 my-2">
          &ldquo;A wire that speaks for itself doesn&apos;t need company.
        </blockquote>
      </div>

      {/* Radio Specimen Container: Paper Tape Artifact */}
      <div className="relative group flex flex-col items-center justify-center p-6 sm:p-12 rounded-xl border border-[#443527] bg-[#0c0907] overflow-hidden shadow-2xl">
        {/* Atmosphere background noise */}
        <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#d9ad67_1px,transparent_1px)] [background-size:16px_16px]" />

        <div
          id="radio-artifact-clickable"
          onClick={() => setIsLightboxOpen(true)}
          className="cursor-zoom-in transition-transform duration-300 group-hover:scale-[1.01] flex items-center justify-center relative z-10 w-full overflow-x-auto py-2"
          title="Click to zoom tape and inspect punched marks"
        >
          {renderPaperTapeIllustration(false)}
        </div>
      </div>

      {/* Archival Footnote */}
      <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-typewriter text-[#7b6959] border-t border-[#2d231b] pt-6">
        <div>CATALOGUE IDENTIFIER: REEL-07-RECORDER-TAPE</div>
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
        title="Reel VII — The Radio (Recorder Paper Tape)"
        caption="High-resolution scan: examine the continuous punch sequence and the isolated mark along the tape."
      >
        <div className="flex items-center justify-center p-4 bg-[#0a0806] rounded-lg overflow-x-auto">
          {renderPaperTapeIllustration(true)}
        </div>
      </LightboxModal>
    </div>
  );
};
