import React, { useState } from 'react';
import { RoutePath } from '../types';
import { LightboxModal } from './LightboxModal';
import { ZoomIn, ArrowLeft, ArrowRight, MapPin } from 'lucide-react';

interface MapRoomReel03Props {
  onNavigate: (path: RoutePath) => void;
}

// Exactly 19 separate pins spread cleanly across the chart without overlap
const MAP_PINS = [
  { id: 1, x: 120, y: 160, label: 'Cape Horn Point' },
  { id: 2, x: 195, y: 130, label: 'North Atoll' },
  { id: 3, x: 280, y: 175, label: 'Trident Reach' },
  { id: 4, x: 370, y: 140, label: 'St. Jude Bay' },
  { id: 5, x: 490, y: 160, label: 'Meridian Ridge' },
  { id: 6, x: 610, y: 135, label: 'Eastern Shelf' },
  { id: 7, x: 680, y: 220, label: 'Gull Head' },
  { id: 8, x: 630, y: 310, label: 'Shadow Channel' },
  { id: 9, x: 535, y: 270, label: 'Falcon Shoals' },
  { id: 10, x: 440, y: 330, label: 'Thorne Sound' },
  { id: 11, x: 360, y: 260, label: 'Anchor Basin' },
  { id: 12, x: 265, y: 320, label: 'Mist Strait' },
  { id: 13, x: 170, y: 275, label: 'Deadman Pass' },
  { id: 14, x: 130, y: 380, label: 'South Headland' },
  { id: 15, x: 225, y: 440, label: 'Cormorant Bank' },
  { id: 16, x: 340, y: 410, label: 'Iron Anchorage' },
  { id: 17, x: 470, y: 445, label: 'Lowland Spit' },
  { id: 18, x: 575, y: 415, label: 'Pelican Reef' },
  { id: 19, x: 670, y: 470, label: 'Terminus Point' },
];

// String connections linking the 19 pins in a survey traversal
const STRING_PATHS = [
  [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7],
  [7, 8], [8, 9], [9, 10], [10, 11], [11, 12], [12, 13],
  [13, 14], [14, 15], [15, 16], [16, 17], [17, 18], [18, 19],
  [3, 11], [10, 16], [5, 9] // Secondary cross-tie strings
];

export const MapRoomReel03: React.FC<MapRoomReel03Props> = ({ onNavigate }) => {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // SVG Wall Map Specimen
  const renderMapSpecimen = (isZoomed: boolean = false) => {
    const width = isZoomed ? 860 : 680;
    const height = isZoomed ? 680 : 540;

    return (
      <svg
        viewBox="0 0 800 600"
        width={width}
        height={height}
        className="max-w-full h-auto drop-shadow-2xl select-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Aged Map Paper Texture */}
          <radialGradient id="mapParchment" cx="50%" cy="50%" r="70%">
            <stop offset="0%" stopColor="#f3e8d2" />
            <stop offset="60%" stopColor="#e5d2b0" />
            <stop offset="90%" stopColor="#cfb689" />
            <stop offset="100%" stopColor="#b39763" />
          </radialGradient>

          {/* Landmass Fill Pattern */}
          <linearGradient id="landGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#dbc297" />
            <stop offset="100%" stopColor="#c7a876" />
          </linearGradient>

          {/* Red Pin Gradient */}
          <radialGradient id="pinHead" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#ff5a4d" />
            <stop offset="50%" stopColor="#c92214" />
            <stop offset="100%" stopColor="#690a02" />
          </radialGradient>
        </defs>

        {/* Map Paper Backing */}
        <rect x="20" y="20" width="760" height="560" rx="4" fill="url(#mapParchment)" />

        {/* Border grid lines (Nautical navigation chart style) */}
        <rect x="40" y="40" width="720" height="520" fill="none" stroke="#785a33" strokeWidth="1.5" />
        <rect x="46" y="46" width="708" height="508" fill="none" stroke="#8c6d42" strokeWidth="0.75" />

        {/* Longitude / Latitude Graticules */}
        <g stroke="#b89d6e" strokeWidth="0.6" strokeDasharray="5,5" opacity="0.6">
          <line x1="46" y1="150" x2="754" y2="150" />
          <line x1="46" y1="280" x2="754" y2="280" />
          <line x1="46" y1="420" x2="754" y2="420" />
          <line x1="180" y1="46" x2="180" y2="554" />
          <line x1="340" y1="46" x2="340" y2="554" />
          <line x1="500" y1="46" x2="500" y2="554" />
          <line x1="640" y1="46" x2="640" y2="554" />
        </g>

        {/* Unlabeled Coastline / Archipelago Topography */}
        <path
          d="M 80 120 Q 140 90 220 120 Q 300 150 360 110 Q 420 70 500 120 Q 580 170 660 110 Q 720 160 740 240 Q 710 320 660 360 Q 600 320 540 370 Q 460 410 400 350 Q 320 380 260 440 Q 180 480 120 400 Q 70 320 80 220 Z"
          fill="url(#landGrad)"
          stroke="#91744b"
          strokeWidth="1.2"
          opacity="0.85"
        />

        {/* Secondary Island Outlines */}
        <path
          d="M 520 410 Q 560 380 610 420 Q 640 470 590 500 Q 530 480 520 410 Z"
          fill="url(#landGrad)"
          stroke="#91744b"
          strokeWidth="1"
          opacity="0.85"
        />
        <path
          d="M 160 390 Q 200 360 250 410 Q 210 460 160 440 Z"
          fill="url(#landGrad)"
          stroke="#91744b"
          strokeWidth="1"
          opacity="0.8"
        />

        {/* Compass Rose */}
        <g transform="translate(110, 485)" opacity="0.65">
          <circle cx="0" cy="0" r="36" fill="none" stroke="#6e502c" strokeWidth="1" />
          <polygon points="0,-36 6,-10 0,0 -6,-10" fill="#6e502c" />
          <polygon points="0,36 6,10 0,0 -6,10" fill="#99774d" />
          <polygon points="36,0 10,6 0,0 10,-6" fill="#99774d" />
          <polygon points="-36,0 -10,6 0,0 -10,-6" fill="#6e502c" />
          <text x="0" y="-40" fontFamily="'Cinzel', serif" fontSize="11" fill="#4d351b" textAnchor="middle" fontWeight="bold">
            N
          </text>
        </g>

        {/* Map Title Block */}
        <g transform="translate(420, 65)">
          <text x="0" y="0" fontFamily="'Cinzel', serif" fontSize="12" fontWeight="bold" fill="#52391c" letterSpacing="2">
            SURVEY CHART — TRAVERSAL NETWORK
          </text>
          <text x="0" y="16" fontFamily="'Special Elite', monospace" fontSize="9" fill="#755631">
            CARTOGRAPHIC REEL III • STATION LOG
          </text>
        </g>

        {/* Red String Connections between pins */}
        <g stroke="#a62215" strokeWidth="1.8" strokeLinecap="round" strokeOpacity="0.85">
          {STRING_PATHS.map(([p1, p2], idx) => {
            const pin1 = MAP_PINS.find((p) => p.id === p1)!;
            const pin2 = MAP_PINS.find((p) => p.id === p2)!;
            return (
              <line
                key={idx}
                x1={pin1.x}
                y1={pin1.y}
                x2={pin2.x}
                y2={pin2.y}
              />
            );
          })}
        </g>

        {/* EXACTLY 19 COUNTABLE PINS:
            Clearly separated, brass post with red sphere head and cast shadow.
            19 pins = 19th letter = S!
        */}
        {MAP_PINS.map((pin) => (
          <g key={pin.id} transform={`translate(${pin.x}, ${pin.y})`}>
            {/* Pin shadow on map */}
            <ellipse cx="4" cy="5" rx="5" ry="3.5" fill="#000000" opacity="0.35" />

            {/* Brass pin needle base */}
            <circle cx="0" cy="0" r="3" fill="#876527" stroke="#3b2909" strokeWidth="0.5" />

            {/* Red spherical pin head */}
            <circle cx="0" cy="-2" r="6" fill="url(#pinHead)" stroke="#4a0803" strokeWidth="0.8" />

            {/* Highlight gleam on red sphere */}
            <circle cx="-2" cy="-4" r="1.8" fill="#ffffff" opacity="0.75" />
          </g>
        ))}

        {/* CLUE #2: FADED CORNER NUMBER "3" (styled like a postmark / page corner stamp) */}
        <g transform="translate(710, 520)" opacity="0.45">
          {/* Postmark circular stamp */}
          <circle cx="0" cy="0" r="26" fill="none" stroke="#752a1b" strokeWidth="1.2" strokeDasharray="4,2" />
          <circle cx="0" cy="0" r="21" fill="none" stroke="#752a1b" strokeWidth="0.6" />
          <text x="0" y="-12" fontFamily="'Special Elite', monospace" fontSize="6.5" fill="#752a1b" textAnchor="middle">
            POSTMARK
          </text>
          {/* The Shift Key: "3" */}
          <text
            x="0"
            y="7"
            fontFamily="'Cinzel', serif"
            fontSize="22"
            fontWeight="bold"
            fill="#661f12"
            textAnchor="middle"
          >
            3
          </text>
          <text x="0" y="16" fontFamily="'Special Elite', monospace" fontSize="5.5" fill="#752a1b" textAnchor="middle">
            OCT 1932
          </text>
        </g>

        {/* Faded corner folded mark */}
        <polygon points="760,540 760,580 720,580" fill="#bfa373" stroke="#876f47" strokeWidth="0.5" />
      </svg>
    );
  };

  return (
    <div id="reel-03-container" className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      {/* Exhibit Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#3b2e23] pb-5 mb-8">
        <div>
          <div className="flex items-center gap-2 text-xs font-typewriter text-[#c8924b] tracking-wider uppercase mb-1">
            <span>ARCHIVE DOSSIER • REEL III</span>
            <span className="text-[#5e4b3c]">/</span>
            <code className="text-[#bfa58d] bg-[#1c1612] px-1.5 py-0.5 rounded border border-[#382b20]">
              /archive/reel-03
            </code>
          </div>
          <h1 className="text-3xl sm:text-4xl font-cinzel font-bold text-[#f3ede4]">
            Reel III — The Map Room
          </h1>
        </div>

        <button
          id="map-zoom-cta-btn"
          type="button"
          onClick={() => setIsLightboxOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded bg-[#241c16] hover:bg-[#31261e] border border-[#524032] hover:border-[#c8924b] text-xs font-cinzel text-[#dfd4c5] transition-all shadow-md"
        >
          <ZoomIn className="w-4 h-4 text-[#c8924b]" />
          <span>Enlarge</span>
        </button>
      </div>

      {/* Visible Copy (EXACT WORDING PER PROMPT) */}
      <div className="bg-[#171310] border border-[#382c21] rounded-lg p-6 mb-8 text-[#d8cdbf] shadow-inner">
        <p className="text-xs uppercase font-typewriter tracking-widest text-[#a8927d] italic mb-3">
          A wall map, pins and string, location unlabeled.
        </p>

        <blockquote className="text-base sm:text-lg font-serif-body italic text-[#eee4d7] leading-relaxed border-l-2 border-[#c8924b] pl-4 my-2">
          &ldquo;A vault is only a door. Count what holds the string, and you&apos;ll have the first key.
          The corner remembers what the shift should be.&rdquo;
        </blockquote>
      </div>

      {/* Wall Map Specimen Container */}
      <div className="relative group flex flex-col items-center justify-center p-4 sm:p-8 rounded-xl border border-[#443527] bg-[#0d0a08] overflow-hidden shadow-2xl">
        <div
          id="map-artifact-clickable"
          onClick={() => setIsLightboxOpen(true)}
          className="cursor-zoom-in transition-transform duration-300 group-hover:scale-[1.01] flex items-center justify-center"
          title="Click to enlarge"
        >
          {renderMapSpecimen(false)}
        </div>

        {/* Lower enlargement button */}
        <button
          id="map-image-inspect-badge"
          type="button"
          onClick={() => setIsLightboxOpen(true)}
          className="absolute bottom-6 right-6 bg-black/80 hover:bg-black text-[#f3ede4] text-xs font-typewriter px-3 py-1.5 rounded-full border border-[#5a4635] flex items-center gap-1.5 backdrop-blur shadow-lg transition-colors"
        >
          <ZoomIn className="w-3.5 h-3.5 text-[#c8924b]" />
          <span>Enlarge</span>
        </button>
      </div>

      {/* WEB-NATIVE HIDDEN CLUE #2:
          Classic matching text-color and background-color.
          Invisible to eye, but revealed via Ctrl+A / Cmd+A or mouse selection!
          Prompt specification:
          <p style="color:#141414; background:#141414; user-select:text;">3</p>
      */}
      <div className="my-4 py-2 px-1">
        <p
          id="hidden-shift-key-web"
          style={{
            color: '#12100e',
            backgroundColor: '#12100e',
            userSelect: 'text',
          }}
          className="text-sm font-mono"
        >
          3
        </p>
      </div>

      {/* Archival Footnote */}
      <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-typewriter text-[#7b6959] border-t border-[#2d231b] pt-6">
        <div>CATALOGUE IDENTIFIER: REEL-03-SURVEY-MAP</div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => onNavigate('/archive/reel-07')}
            className="hover:text-[#c8924b] transition-colors flex items-center gap-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Previous Fragment
          </button>
          <span>•</span>
          <button
            type="button"
            onClick={() => onNavigate('/archive/reel-01')}
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
        title="Reel III — Wall Survey Chart"
        caption="High-resolution survey chart."
      >
        {renderMapSpecimen(true)}
      </LightboxModal>
    </div>
  );
};
