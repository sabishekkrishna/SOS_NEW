import React, { useState } from 'react';
import { RoutePath } from '../types';
import { LightboxModal } from './LightboxModal';
import { ZoomIn, ArrowLeft, ArrowRight, Eye } from 'lucide-react';

interface StudyReel09Props {
  onNavigate: (path: RoutePath) => void;
}

export const StudyReel09: React.FC<StudyReel09Props> = ({ onNavigate }) => {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // High-resolution specimen: Bird's-eye view of Thorne's Study Writing Desk
  const renderJournalPage = (isZoomed: boolean = false) => {
    const width = isZoomed ? 1160 : 920;
    const height = (width * 800) / 1200;

    return (
      <svg
        viewBox="0 0 1200 800"
        width={width}
        height={height}
        className="max-w-full h-auto drop-shadow-2xl select-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <style>
            {`
              /* Blinking Bulb Pattern: 4 short pulses (Morse 'H'), 3.0 second break, then repeat */
              /* Cycle length: 4.12s total (0.0s - 1.12s active 4 pulses, 1.12s - 4.12s = 3.0s dark break) */
              @keyframes bulbPulsePattern {
                /* Pulse 1: ON 0.00s-0.14s, OFF 0.14s-0.28s */
                0%, 3.39% {
                  opacity: 1;
                }
                3.40%, 6.79% {
                  opacity: 0;
                }
                /* Pulse 2: ON 0.28s-0.42s, OFF 0.42s-0.56s */
                6.80%, 10.19% {
                  opacity: 1;
                }
                10.20%, 13.59% {
                  opacity: 0;
                }
                /* Pulse 3: ON 0.56s-0.70s, OFF 0.70s-0.84s */
                13.60%, 16.99% {
                  opacity: 1;
                }
                17.00%, 20.38% {
                  opacity: 0;
                }
                /* Pulse 4: ON 0.84s-0.98s, OFF 0.98s-1.12s */
                20.39%, 23.78% {
                  opacity: 1;
                }
                /* 3-Second Break (1.12s to 4.12s OFF) */
                23.79%, 100% {
                  opacity: 0;
                }
              }

              .bulb-blinking-lit {
                animation: bulbPulsePattern 4.12s cubic-bezier(0.4, 0, 0.2, 1) infinite;
              }
            `}
          </style>

          {/* Table surface: dark polished mahogany planks */}
          <linearGradient id="mahoganyWoodGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1a110a" />
            <stop offset="20%" stopColor="#2c1a0f" />
            <stop offset="55%" stopColor="#22140b" />
            <stop offset="85%" stopColor="#180e07" />
            <stop offset="100%" stopColor="#120904" />
          </linearGradient>

          {/* Desk ambient spotlighting from top-down */}
          <radialGradient id="deskVignette" cx="50%" cy="48%" r="62%">
            <stop offset="0%" stopColor="#8c5828" stopOpacity="0.18" />
            <stop offset="65%" stopColor="#3d220e" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0.75" />
          </radialGradient>

          {/* Desk leather writing pad inlay */}
          <linearGradient id="leatherBlotterGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1b241c" />
            <stop offset="50%" stopColor="#141c15" />
            <stop offset="100%" stopColor="#0d140e" />
          </linearGradient>

          {/* Parchment paper texture */}
          <radialGradient id="parchmentGrad" cx="50%" cy="45%" r="70%">
            <stop offset="0%" stopColor="#faf4e8" />
            <stop offset="55%" stopColor="#f3e6ce" />
            <stop offset="85%" stopColor="#e5d0a9" />
            <stop offset="100%" stopColor="#caa974" />
          </radialGradient>

          {/* Letter Drop Shadow */}
          <filter id="letterDropShadow" x="-10%" y="-10%" width="125%" height="130%">
            <feDropShadow dx="6" dy="14" stdDeviation="12" floodColor="#040201" floodOpacity="0.85" />
            <feDropShadow dx="2" dy="4" stdDeviation="4" floodColor="#000000" floodOpacity="0.5" />
          </filter>

          {/* Heavy Desk Object Drop Shadow */}
          <filter id="objectDropShadow" x="-20%" y="-20%" width="145%" height="145%">
            <feDropShadow dx="5" dy="9" stdDeviation="8" floodColor="#020101" floodOpacity="0.75" />
          </filter>

          {/* Soft Blur Filters for subtle LED and paper stains */}
          <filter id="subtleLedBlur" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="4" />
          </filter>
          <filter id="subtleLedCoreBlur" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="0.8" />
          </filter>
          <filter id="stainBlur" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="1.2" />
          </filter>

          {/* Table Lamp Brass Finishes */}
          <radialGradient id="lampBrassGrad" cx="40%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#fae7b2" />
            <stop offset="45%" stopColor="#c59846" />
            <stop offset="80%" stopColor="#7a5522" />
            <stop offset="100%" stopColor="#3d260c" />
          </radialGradient>

          {/* Lamp Green Glass Shade Gradient (Bird's-Eye Top View) */}
          <linearGradient id="lampGreenShade" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#143c22" />
            <stop offset="25%" stopColor="#1e5833" />
            <stop offset="50%" stopColor="#287343" />
            <stop offset="75%" stopColor="#1e5833" />
            <stop offset="100%" stopColor="#143c22" />
          </linearGradient>

          {/* Porcelain Socket Gradient */}
          <radialGradient id="socketBaseGrad" cx="45%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#f0ece4" />
            <stop offset="50%" stopColor="#d5cebe" />
            <stop offset="85%" stopColor="#9c927f" />
            <stop offset="100%" stopColor="#4f4738" />
          </radialGradient>

          {/* Socket Brass Shell Collar */}
          <linearGradient id="socketBrassCollar" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f7dc99" />
            <stop offset="45%" stopColor="#c6953e" />
            <stop offset="100%" stopColor="#573c12" />
          </linearGradient>

          {/* Subtle Diffused LED Flare */}
          <radialGradient id="subtleLedHalo" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ff9a2e" stopOpacity="0.85" />
            <stop offset="40%" stopColor="#ff7a12" stopOpacity="0.4" />
            <stop offset="80%" stopColor="#e55500" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#cc4400" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* ========================================================================= */}
        {/* 1. BIRD'S-EYE VIEW: MAHOGANY DESK SURFACE                                  */}
        {/* ========================================================================= */}
        <rect x="0" y="0" width="1200" height="800" fill="url(#mahoganyWoodGrad)" />

        {/* Wood planks dividing seams */}
        <g stroke="#090503" strokeWidth="2.5" opacity="0.8">
          <line x1="0" y1="160" x2="1200" y2="160" />
          <line x1="0" y1="162" x2="1200" y2="162" stroke="#482d17" strokeWidth="0.8" opacity="0.45" />
          <line x1="0" y1="420" x2="1200" y2="420" />
          <line x1="0" y1="422" x2="1200" y2="422" stroke="#482d17" strokeWidth="0.8" opacity="0.45" />
          <line x1="0" y1="650" x2="1200" y2="650" />
          <line x1="0" y1="652" x2="1200" y2="652" stroke="#482d17" strokeWidth="0.8" opacity="0.45" />
        </g>

        {/* Subtle wood grain flow lines */}
        <g stroke="#3f2714" strokeWidth="0.75" opacity="0.28" strokeDasharray="90, 30, 160, 40">
          <line x1="0" y1="75" x2="1200" y2="75" />
          <line x1="0" y1="280" x2="1200" y2="280" />
          <line x1="0" y1="520" x2="1200" y2="520" />
          <line x1="0" y1="730" x2="1200" y2="730" />
        </g>

        {/* Leather desk pad inlay centered behind the writing area */}
        <rect
          x="280"
          y="40"
          width="600"
          height="720"
          rx="12"
          fill="url(#leatherBlotterGrad)"
          stroke="#3d2b1c"
          strokeWidth="2.5"
          filter="url(#objectDropShadow)"
        />
        {/* Leather gold-embossed perimeter tooling line */}
        <rect
          x="292"
          y="52"
          width="576"
          height="696"
          rx="8"
          fill="none"
          stroke="#735933"
          strokeWidth="1"
          strokeOpacity="0.45"
          strokeDasharray="6, 3"
        />

        {/* Ambient Top-Down Room Vignette */}
        <rect x="0" y="0" width="1200" height="800" fill="url(#deskVignette)" pointerEvents="none" />

        {/* ========================================================================= */}
        {/* 2. DESK ACCESSORIES (LEFT REGION) - OUTSIDE THE LETTER AREA                */}
        {/* ========================================================================= */}

        {/* Banker's Table Lamp (Top-Down Bird's-Eye View) */}
        <g id="table-lamp" transform="translate(135, 175)" filter="url(#objectDropShadow)">
          {/* Heavy brass stepped circular base */}
          <circle cx="0" cy="0" r="48" fill="url(#lampBrassGrad)" stroke="#2b1a0c" strokeWidth="2" />
          <circle cx="0" cy="0" r="38" fill="#5c3f1a" stroke="#1f1207" strokeWidth="1.2" />
          <circle cx="0" cy="0" r="28" fill="url(#lampBrassGrad)" />

          {/* Lamp rotary switch key on base */}
          <rect x="-4" y="24" width="8" height="18" rx="2" fill="#1b1108" stroke="#785526" strokeWidth="0.8" />
          <circle cx="0" cy="33" r="3" fill="#dfbe74" />

          {/* Lamp arched dual brass arm viewed from above */}
          <path
            d="M -16 0 L -16 68 L 16 68 L 16 0"
            fill="none"
            stroke="url(#lampBrassGrad)"
            strokeWidth="7"
            strokeLinecap="round"
          />

          {/* Classic Emerald Green Glass Shade (seen from above) */}
          <rect
            x="-68"
            y="54"
            width="136"
            height="52"
            rx="14"
            fill="url(#lampGreenShade)"
            stroke="#0d2415"
            strokeWidth="1.8"
          />
          {/* Glass shade specular top highlight */}
          <rect
            x="-56"
            y="60"
            width="112"
            height="10"
            rx="5"
            fill="#5be38c"
            opacity="0.25"
          />
          {/* Shade brass top finial bracket */}
          <circle cx="0" cy="80" r="7" fill="url(#lampBrassGrad)" stroke="#1a1006" strokeWidth="1" />
          <line x1="-30" y1="80" x2="30" y2="80" stroke="url(#lampBrassGrad)" strokeWidth="3" />
        </g>

        {/* Glass Inkwell & Fine Dip Pen */}
        <g id="inkwell-pen" transform="translate(130, 480)" filter="url(#objectDropShadow)">
          {/* Octagonal Heavy Cut-Glass Inkwell */}
          <polygon
            points="-28,-28 28,-28 40,-12 40,24 24,40 -24,40 -40,24 -40,-12"
            fill="#121a1f"
            stroke="#3a4852"
            strokeWidth="1.5"
          />
          {/* Inner ink reservoir */}
          <circle cx="0" cy="6" r="22" fill="#080605" stroke="#1c252a" strokeWidth="1" />
          {/* Deep wet black iron-gall ink level reflection */}
          <circle cx="0" cy="6" r="18" fill="#060403" />
          <ellipse cx="-4" cy="2" rx="10" ry="6" fill="#ffffff" opacity="0.15" />
          {/* Brass inkwell hinged cap */}
          <circle cx="0" cy="6" r="14" fill="url(#lampBrassGrad)" stroke="#221509" strokeWidth="1.2" />
          <circle cx="0" cy="6" r="6" fill="#e7ca85" opacity="0.6" />

          {/* Dip Pen resting angled across pen rest */}
          <g transform="translate(65, -30) rotate(24)">
            {/* Wooden taper pen holder */}
            <path
              d="M -3 -80 L 3 -80 L 2 110 L -2 110 Z"
              fill="#3a1b0d"
              stroke="#1a0b04"
              strokeWidth="0.8"
            />
            {/* Brass ferrule collar */}
            <rect x="-3" y="105" width="6" height="14" fill="url(#lampBrassGrad)" />
            {/* Steel writing nib pointing down */}
            <polygon points="-3,119 3,119 0,138" fill="#d0d6dc" stroke="#68737c" strokeWidth="0.5" />
            <line x1="0" y1="119" x2="0" y2="134" stroke="#000000" strokeWidth="0.4" />
          </g>
        </g>

        {/* Small leather field notebook on lower left corner */}
        <g id="field-notebook" transform="translate(80, 640) rotate(-6)" filter="url(#objectDropShadow)">
          <rect x="0" y="0" width="135" height="105" rx="5" fill="#3c2214" stroke="#221209" strokeWidth="2" />
          {/* Spine stitching */}
          <line x1="16" y1="0" x2="16" y2="105" stroke="#170c06" strokeWidth="2.5" />
          <line x1="18" y1="0" x2="18" y2="105" stroke="#8b5735" strokeWidth="1" strokeDasharray="5,4" />
          <text x="32" y="55" fontFamily="'Special Elite', monospace" fontSize="9" fill="#a47b56" opacity="0.7">
            FIELD NOTES • 1932
          </text>
        </g>

        {/* ========================================================================= */}
        {/* 3. THE LETTER (CENTERED WRITINGS, SUBTLE STAINS, CLEAN FOCUS)              */}
        {/* ========================================================================= */}
        <g id="study-letter-specimen" transform="translate(325, 60)" filter="url(#letterDropShadow)">
          {/* Parchment Paper Sheet (510 x 680) */}
          <rect
            x="0"
            y="0"
            width="510"
            height="680"
            rx="4"
            fill="url(#parchmentGrad)"
            stroke="#bda475"
            strokeWidth="1.2"
          />

          {/* Subtle aged paper edge vignette */}
          <rect
            x="3"
            y="3"
            width="504"
            height="674"
            rx="3"
            fill="none"
            stroke="#755227"
            strokeWidth="1"
            opacity="0.32"
          />

          {/* Faint paper ruled guidelines (centered symmetrically) */}
          <g stroke="#cfb584" strokeWidth="0.65" strokeOpacity="0.25" strokeDasharray="3,3">
            {Array.from({ length: 16 }).map((_, i) => (
              <line key={i} x1="60" y1={175 + i * 32} x2="450" y2={175 + i * 32} />
            ))}
          </g>

          {/* ========================================================================= */}
          {/* SUBTLE PAPER STAINS THAT MEAN NOTHING (AUTHENTIC AGED PARCHMENT MARKS)    */}
          {/* Faded coffee mug ring, soft tea drips & water spots — non-interfering     */}
          {/* ========================================================================= */}
          <g id="subtle-meaningless-stains" pointerEvents="none">
            {/* Faint dried coffee cup ring in lower-right margin (faded, meaningless) */}
            <circle
              cx="415"
              cy="535"
              r="38"
              fill="none"
              stroke="#68421e"
              strokeWidth="2.2"
              opacity="0.10"
              strokeDasharray="45, 12, 25, 10"
              filter="url(#stainBlur)"
            />
            <circle
              cx="415"
              cy="535"
              r="36"
              fill="#7d5228"
              opacity="0.03"
              filter="url(#stainBlur)"
            />

            {/* Faint irregular water/tea splash spot in upper-left margin */}
            <ellipse
              cx="92"
              cy="215"
              rx="16"
              ry="11"
              fill="#744a22"
              opacity="0.07"
              filter="url(#stainBlur)"
            />
            <ellipse
              cx="92"
              cy="215"
              rx="15.5"
              ry="10.5"
              fill="none"
              stroke="#583312"
              strokeWidth="0.75"
              opacity="0.11"
              filter="url(#stainBlur)"
            />

            {/* Faded paper blemish / thumbing patina along top-right edge */}
            <path
              d="M 405 105 Q 445 115 455 145 Q 430 160 410 140 Z"
              fill="#7a5028"
              opacity="0.05"
              filter="url(#stainBlur)"
            />

            {/* Stray faint micro-droplets (meaningless blemish flecks) */}
            <circle cx="135" cy="575" r="3.2" fill="#69401d" opacity="0.08" filter="url(#stainBlur)" />
            <circle cx="452" cy="315" r="2.4" fill="#69401d" opacity="0.06" filter="url(#stainBlur)" />
            <circle cx="165" cy="120" r="2" fill="#69401d" opacity="0.05" filter="url(#stainBlur)" />
          </g>

          {/* Header catalog mark (centered) */}
          <text
            x="255"
            y="75"
            textAnchor="middle"
            fontFamily="'Special Elite', monospace"
            fontSize="10"
            letterSpacing="3"
            fill="#7e6041"
            opacity="0.8"
          >
            DISPATCH FROM THE STUDY • ELIAS THORNE
          </text>

          {/* ========================================================================= */}
          {/* THE EXACT LETTER WRITINGS (CENTER-ALIGNED ON THE PAGE)                    */}
          {/* Crisp, elegant, dark iron-gall script, fully centered and clear           */}
          {/* ========================================================================= */}
          <g
            fill="#181109"
            fontFamily="'Playfair Display', Georgia, serif"
            fontStyle="italic"
            fontSize="21.5"
            fontWeight="600"
            textAnchor="middle"
            letterSpacing="0.2"
          >
            {/* Line 1 */}
            <text x="255" y="180">
              They think I mapped mountains and rivers.
            </text>

            {/* Line 2 */}
            <text x="255" y="265">
              I mapped something else — a promise.
            </text>

            {/* Line 3 */}
            <text x="255" y="355">
              If you&apos;ve come this far, you already understand:
            </text>

            {/* Line 4 */}
            <text x="255" y="395">
              nothing here is wasted, not even a stain on the page.
            </text>
          </g>

          {/* Signature of Thorne (Centered on the page) */}
          <g id="thorne-signature" transform="translate(255, 495)">
            {/* Centered ink pen flourish curves */}
            <path
              d="M -95 18 C -55 -18 -15 32 25 -3 S 70 12 90 -3 M -50 28 C -10 28 30 35 70 23"
              stroke="#1b120a"
              strokeWidth="2.2"
              fill="none"
              strokeLinecap="round"
            />
            {/* Signature wording (centered) */}
            <text
              x="0"
              y="68"
              textAnchor="middle"
              fontFamily="'Playfair Display', cursive, Georgia, serif"
              fontSize="28"
              fill="#1e130a"
              fontStyle="italic"
              fontWeight="bold"
            >
              — Thorne
            </text>
          </g>

          {/* Torn lower deckled paper edge */}
          <path
            d="M 0 672 L 35 668 L 95 674 L 180 669 L 275 675 L 375 670 L 460 674 L 510 671"
            stroke="#96774a"
            strokeWidth="1.4"
            fill="none"
            opacity="0.4"
          />
        </g>

        {/* Brass paperweight holding down upper-right corner of the letter */}
        <g id="paperweight" transform="translate(830, 85)" filter="url(#objectDropShadow)">
          <rect x="-12" y="-12" width="34" height="34" rx="6" fill="url(#lampBrassGrad)" stroke="#2b1a0c" strokeWidth="1.2" />
          <circle cx="5" cy="5" r="9" fill="#694b1f" stroke="#e7ca85" strokeWidth="0.8" opacity="0.7" />
        </g>

        {/* ========================================================================= */}
        {/* 4. DESK ACCESSORIES (RIGHT REGION): SUBTLE BLURRED SMALL INDICATOR LED     */}
        {/* Same frequency: 4 short pulses, 3s break, gentle blurred non-intrusive glow */}
        {/* ========================================================================= */}
        <g id="desk-socket-fixture" transform="translate(1030, 240)">
          {/* Dual twisted cloth-covered electrical cord leading to socket */}
          <path
            d="M 0 -240 Q 25 -160 -10 -90 T 0 -38"
            fill="none"
            stroke="#261b12"
            strokeWidth="5.5"
            strokeLinecap="round"
          />
          <path
            d="M 0 -240 Q 25 -160 -10 -90 T 0 -38"
            fill="none"
            stroke="#5c3f25"
            strokeWidth="3.2"
            strokeDasharray="4, 3"
            strokeLinecap="round"
          />

          {/* Heavy circular porcelain / ceramic desktop socket base */}
          <g filter="url(#objectDropShadow)">
            <circle cx="0" cy="0" r="50" fill="url(#socketBaseGrad)" stroke="#292218" strokeWidth="2.2" />
            <circle cx="0" cy="0" r="42" fill="#ded7c9" stroke="#998f7e" strokeWidth="1" />

            {/* Socket mounting brass screw holes */}
            <circle cx="-30" cy="-16" r="3" fill="#241b11" />
            <circle cx="-30" cy="-16" r="1.8" fill="#997b47" />
            <line x1="-32" y1="-16" x2="-28" y2="-16" stroke="#120c07" strokeWidth="0.7" />

            <circle cx="30" cy="16" r="3" fill="#241b11" />
            <circle cx="30" cy="16" r="1.8" fill="#997b47" />
            <line x1="28" y1="16" x2="32" y2="16" stroke="#120c07" strokeWidth="0.7" />

            {/* Brass wiring terminal binding posts */}
            <circle cx="-13" cy="-30" r="5" fill="url(#socketBrassCollar)" stroke="#241608" strokeWidth="0.9" />
            <circle cx="13" cy="-30" r="5" fill="url(#socketBrassCollar)" stroke="#241608" strokeWidth="0.9" />

            {/* Stepped Brass Socket Fitting */}
            <circle cx="0" cy="0" r="28" fill="url(#socketBrassCollar)" stroke="#31210b" strokeWidth="1.5" />
            <circle cx="0" cy="0" r="23" fill="#221506" />
            <circle cx="0" cy="0" r="18" fill="url(#socketBrassCollar)" opacity="0.65" />
            <circle cx="0" cy="0" r="14" fill="#150d03" />

            {/* Miniature threaded brass diode bezel */}
            <circle cx="0" cy="0" r="8.5" fill="url(#socketBrassCollar)" stroke="#3b270d" strokeWidth="0.8" />
            <circle cx="0" cy="0" r="6" fill="#140b04" />

            {/* UNLIT SMALL DIODE (Dark amber-ruby lens when in break/OFF state) */}
            <circle
              cx="0"
              cy="0"
              r="4"
              fill="#2e1408"
              stroke="#150702"
              strokeWidth="0.5"
            />
            <ellipse
              cx="-1.2"
              cy="-1.2"
              rx="1.4"
              ry="0.7"
              fill="#ffffff"
              opacity="0.2"
            />
          </g>

          {/* ========================================================================= */}
          {/* BLINKING SUBTLE BLURRED SMALL LED SYSTEM                                  */}
          {/* Exact same frequency (4 short pulses, 3.0s break), but soft & non-intrusive */}
          {/* ========================================================================= */}
          <g className="bulb-blinking-lit" pointerEvents="none">
            {/* Soft, gently blurred diffuse ambient glow halo (small & quiet) */}
            <circle
              cx="0"
              cy="0"
              r="22"
              fill="url(#subtleLedHalo)"
              opacity="0.45"
              filter="url(#subtleLedBlur)"
            />

            {/* Small illuminated LED diode lens (softly blurred) */}
            <circle
              cx="0"
              cy="0"
              r="4.2"
              fill="#ffaa44"
              opacity="0.85"
              filter="url(#subtleLedCoreBlur)"
            />

            {/* Warm pinpoint center filament glow */}
            <circle
              cx="-0.4"
              cy="-0.4"
              r="1.4"
              fill="#ffffff"
              opacity="0.8"
            />
          </g>
        </g>

        {/* Brass Magnifying Glass on lower right desk */}
        <g id="magnifying-glass" transform="translate(1010, 560)" filter="url(#objectDropShadow)">
          {/* Turned wooden handle angled downward to edge */}
          <g transform="rotate(35)">
            <path
              d="M -5 32 L 5 32 L 7 135 L -7 135 Z"
              fill="#2e160a"
              stroke="#140903"
              strokeWidth="1.2"
            />
            {/* Brass ferrule */}
            <rect x="-6" y="24" width="12" height="10" rx="1" fill="url(#lampBrassGrad)" />
            {/* Heavy Brass Lens Rim */}
            <circle cx="0" cy="0" r="38" fill="none" stroke="url(#lampBrassGrad)" strokeWidth="5.5" />
            <circle cx="0" cy="0" r="35" fill="none" stroke="#2b1a09" strokeWidth="1" />
            {/* Convex Optical Glass with light reflection streak */}
            <circle cx="0" cy="0" r="34" fill="#6ba7ba" fillOpacity="0.1" />
            <path
              d="M -22 -16 A 30 30 0 0 1 18 -22"
              fill="none"
              stroke="#ffffff"
              strokeWidth="2"
              opacity="0.35"
            />
          </g>
        </g>

        {/* Brass Compass on right desk margin */}
        <g id="brass-compass" transform="translate(1120, 420)" filter="url(#objectDropShadow)">
          <circle cx="0" cy="0" r="26" fill="url(#lampBrassGrad)" stroke="#221508" strokeWidth="1.5" />
          <circle cx="0" cy="0" r="22" fill="#f4ebd9" stroke="#5c4427" strokeWidth="1" />
          {/* Compass rose dial markings */}
          <line x1="0" y1="-20" x2="0" y2="20" stroke="#876538" strokeWidth="0.8" />
          <line x1="-20" y1="0" x2="20" y2="0" stroke="#876538" strokeWidth="0.8" />
          <text x="-2" y="-12" fontFamily="'Playfair Display', serif" fontSize="6" fontWeight="bold" fill="#7a1a12">N</text>
          {/* Magnetic needle */}
          <polygon points="0,-16 3,0 0,2 -3,0" fill="#ad281b" />
          <polygon points="0,16 3,0 0,-2 -3,0" fill="#2a3842" />
          <circle cx="0" cy="0" r="2" fill="#d9b66c" />
        </g>
      </svg>
    );
  };

  return (
    <div id="reel-09-container" className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
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

      {/* Visible Copy */}
      <div className="bg-[#171310] border border-[#382c21] rounded-lg p-6 mb-8 text-[#d8cdbf] shadow-inner">
        <p className="text-xs uppercase font-typewriter tracking-widest text-[#a8927d] italic mb-3">
          Bird&apos;s-eye view of Thorne&apos;s study desk.
        </p>

        <blockquote className="text-base sm:text-lg font-serif-body italic text-[#eee4d7] leading-relaxed border-l-2 border-[#c8924b] pl-4 my-2">
          &ldquo;They think I mapped mountains and rivers. I mapped something else — a promise. If
          you&apos;ve come this far, you already understand: nothing here is wasted, not even a stain
          on the page.&rdquo;
        </blockquote>
      </div>

      {/* Scanned Desk Specimen Container */}
      <div className="relative group flex flex-col items-center justify-center p-3 sm:p-5 rounded-xl border border-[#443527] bg-[#0c0805] overflow-hidden shadow-2xl">
        <div
          id="study-artifact-clickable"
          onClick={() => setIsLightboxOpen(true)}
          className="cursor-zoom-in transition-transform duration-300 group-hover:scale-[1.005] w-full flex items-center justify-center"
          title="Click to zoom and closely inspect the desk, letter, and instruments"
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
        <div>CATALOGUE IDENTIFIER: REEL-09-STUDY-DESK</div>
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
        title="Reel IX — Bird's-Eye View: Thorne's Study Desk"
        caption="High-resolution scan of Thorne's study table from above. Notice the centered letter with subtle paper stains, desktop instruments, and the subtle socket indicator LED."
      >
        <div className="flex items-center justify-center p-2 bg-[#0a0704] rounded-lg overflow-x-auto w-full">
          {renderJournalPage(true)}
        </div>
      </LightboxModal>
    </div>
  );
};


