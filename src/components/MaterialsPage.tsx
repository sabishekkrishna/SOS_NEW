import React, { useState, useId } from 'react';
import { RoutePath } from '../types';
import {
  Volume2,
  VolumeX,
  Search,
  Copy,
  Check,
  RotateCcw,
  BookOpen,
  Radio,
  Grid,
  Sparkles,
  ArrowLeft,
  KeyRound,
  FileText,
  HelpCircle,
} from 'lucide-react';

interface MaterialsPageProps {
  onNavigate: (path: RoutePath) => void;
}

// -----------------------------------------------------------------------------
// DATA DEFINITIONS
// -----------------------------------------------------------------------------

interface MorseItem {
  char: string;
  code: string;
  mnemonic: string;
}

const MORSE_ALPHABET: MorseItem[] = [
  { char: 'A', code: '· —', mnemonic: 'di-dah' },
  { char: 'B', code: '— · · ·', mnemonic: 'dah-di-di-dit' },
  { char: 'C', code: '— · — ·', mnemonic: 'dah-di-dah-dit' },
  { char: 'D', code: '— · ·', mnemonic: 'dah-di-dit' },
  { char: 'E', code: '·', mnemonic: 'dit' },
  { char: 'F', code: '· · — ·', mnemonic: 'di-di-dah-dit' },
  { char: 'G', code: '— — ·', mnemonic: 'dah-dah-dit' },
  { char: 'H', code: '· · · ·', mnemonic: 'di-di-di-dit' },
  { char: 'I', code: '· ·', mnemonic: 'di-dit' },
  { char: 'J', code: '· — — —', mnemonic: 'di-dah-dah-dah' },
  { char: 'K', code: '— · —', mnemonic: 'dah-di-dah' },
  { char: 'L', code: '· — · ·', mnemonic: 'di-dah-di-dit' },
  { char: 'M', code: '— —', mnemonic: 'dah-dah' },
  { char: 'N', code: '— ·', mnemonic: 'dah-dit' },
  { char: 'O', code: '— — —', mnemonic: 'dah-dah-dah' },
  { char: 'P', code: '· — — ·', mnemonic: 'di-dah-dah-dit' },
  { char: 'Q', code: '— — · —', mnemonic: 'dah-dah-di-dah' },
  { char: 'R', code: '· — ·', mnemonic: 'di-dah-dit' },
  { char: 'S', code: '· · ·', mnemonic: 'di-di-dit' },
  { char: 'T', code: '—', mnemonic: 'dah' },
  { char: 'U', code: '· · —', mnemonic: 'di-di-dah' },
  { char: 'V', code: '· · · —', mnemonic: 'di-di-di-dah' },
  { char: 'W', code: '· — —', mnemonic: 'di-dah-dah' },
  { char: 'X', code: '— · · —', mnemonic: 'dah-di-di-dah' },
  { char: 'Y', code: '— · — —', mnemonic: 'dah-di-dah-dah' },
  { char: 'Z', code: '— — · ·', mnemonic: 'dah-dah-di-dit' },
];

const MORSE_NUMBERS: MorseItem[] = [
  { char: '0', code: '— — — — —', mnemonic: 'dah-dah-dah-dah-dah' },
  { char: '1', code: '· — — — —', mnemonic: 'di-dah-dah-dah-dah' },
  { char: '2', code: '· · — — —', mnemonic: 'di-di-dah-dah-dah' },
  { char: '3', code: '· · · — —', mnemonic: 'di-di-di-dah-dah' },
  { char: '4', code: '· · · · —', mnemonic: 'di-di-di-di-dah' },
  { char: '5', code: '· · · · ·', mnemonic: 'di-di-di-di-dit' },
  { char: '6', code: '— · · · ·', mnemonic: 'dah-di-di-di-dit' },
  { char: '7', code: '— — · · ·', mnemonic: 'dah-dah-di-di-dit' },
  { char: '8', code: '— — — · ·', mnemonic: 'dah-dah-dah-di-dit' },
  { char: '9', code: '— — — — ·', mnemonic: 'dah-dah-dah-dah-dit' },
];

const RAW_MORSE_MAP: Record<string, string> = {
  A: '.-',
  B: '-...',
  C: '-.-.',
  D: '-..',
  E: '.',
  F: '..-.',
  G: '--.',
  H: '....',
  I: '..',
  J: '.---',
  K: '-.-',
  L: '.-..',
  M: '--',
  N: '-.',
  O: '---',
  P: '.--.',
  Q: '--.-',
  R: '.-.',
  S: '...',
  T: '-',
  U: '..-',
  V: '...-',
  W: '.--',
  X: '-..-',
  Y: '-.--',
  Z: '--..',
  '0': '-----',
  '1': '.----',
  '2': '..---',
  '3': '...--',
  '4': '....-',
  '5': '.....',
  '6': '-....',
  '7': '--...',
  '8': '---..',
  '9': '----.',
  ' ': '/',
};

interface PhoneticItem {
  char: string;
  nato: string;
  natoPhonetic: string;
  historic1930: string;
}

const PHONETIC_ALPHABET: PhoneticItem[] = [
  { char: 'A', nato: 'Alpha', natoPhonetic: 'AL-FAH', historic1930: 'Able' },
  { char: 'B', nato: 'Bravo', natoPhonetic: 'BRAH-VOH', historic1930: 'Baker' },
  { char: 'C', nato: 'Charlie', natoPhonetic: 'CHAR-LEE', historic1930: 'Charlie' },
  { char: 'D', nato: 'Delta', natoPhonetic: 'DELL-TAH', historic1930: 'Dog' },
  { char: 'E', nato: 'Echo', natoPhonetic: 'ECK-OH', historic1930: 'Easy' },
  { char: 'F', nato: 'Foxtrot', natoPhonetic: 'FOKS-TROT', historic1930: 'Fox' },
  { char: 'G', nato: 'Golf', natoPhonetic: 'GOLF', historic1930: 'George' },
  { char: 'H', nato: 'Hotel', natoPhonetic: 'HOH-TELL', historic1930: 'How' },
  { char: 'I', nato: 'India', natoPhonetic: 'IN-DEE-AH', historic1930: 'Item' },
  { char: 'J', nato: 'Juliett', natoPhonetic: 'JEW-LEE-ETT', historic1930: 'Jig' },
  { char: 'K', nato: 'Kilo', natoPhonetic: 'KEY-LOH', historic1930: 'King' },
  { char: 'L', nato: 'Lima', natoPhonetic: 'LEE-MAH', historic1930: 'Love' },
  { char: 'M', nato: 'Mike', natoPhonetic: 'MIKE', historic1930: 'Mike' },
  { char: 'N', nato: 'November', natoPhonetic: 'NO-VEM-BER', historic1930: 'Nan' },
  { char: 'O', nato: 'Oscar', natoPhonetic: 'OSS-CAH', historic1930: 'Oboe' },
  { char: 'P', nato: 'Papa', natoPhonetic: 'PAH-PAH', historic1930: 'Peter' },
  { char: 'Q', nato: 'Quebec', natoPhonetic: 'KEH-BECK', historic1930: 'Queen' },
  { char: 'R', nato: 'Romeo', natoPhonetic: 'ROW-ME-OH', historic1930: 'Roger' },
  { char: 'S', nato: 'Sierra', natoPhonetic: 'SEE-AIR-RAH', historic1930: 'Sugar' },
  { char: 'T', nato: 'Tango', natoPhonetic: 'TANG-GO', historic1930: 'Tare' },
  { char: 'U', nato: 'Uniform', natoPhonetic: 'YOU-NEE-FORM', historic1930: 'Uncle' },
  { char: 'V', nato: 'Victor', natoPhonetic: 'VIK-TAH', historic1930: 'Victor' },
  { char: 'W', nato: 'Whiskey', natoPhonetic: 'WISS-KEY', historic1930: 'William' },
  { char: 'X', nato: 'X-ray', natoPhonetic: 'ECKS-RAY', historic1930: 'X-ray' },
  { char: 'Y', nato: 'Yankee', natoPhonetic: 'YANG-KEY', historic1930: 'Yoke' },
  { char: 'Z', nato: 'Zulu', natoPhonetic: 'ZOO-LOO', historic1930: 'Zebra' },
];

const PHONETIC_DIGITS = [
  { digit: '0', nato: 'Zero', spoken: 'ZEE-RO', tele: 'NADAZERO' },
  { digit: '1', nato: 'One', spoken: 'WUN', tele: 'UNAONE' },
  { digit: '2', nato: 'Two', spoken: 'TOO', tele: 'BISSOTWO' },
  { digit: '3', nato: 'Three', spoken: 'TREE', tele: 'TERRATHREE' },
  { digit: '4', nato: 'Four', spoken: 'FOW-ER', tele: 'KARTEFOUR' },
  { digit: '5', nato: 'Five', spoken: 'FIFE', tele: 'PANTAFIVE' },
  { digit: '6', nato: 'Six', spoken: 'SIX', tele: 'SOXISIX' },
  { digit: '7', nato: 'Seven', spoken: 'SEV-EN', tele: 'SETTESEVEN' },
  { digit: '8', nato: 'Eight', spoken: 'AIT', tele: 'OKTOEIGHT' },
  { digit: '9', nato: 'Nine', spoken: 'NIN-ER', tele: 'NOVENINE' },
];

// -----------------------------------------------------------------------------
// PIGPEN SVG GLYPH GENERATOR
// -----------------------------------------------------------------------------
export function PigpenGlyph({
  letter,
  size = 32,
  strokeColor = '#e6c594',
  strokeWidth = 3,
  dotRadius = 3,
}: {
  letter: string;
  size?: number;
  strokeColor?: string;
  strokeWidth?: number;
  dotRadius?: number;
}) {
  const upper = letter.toUpperCase();
  const pad = 6;
  const extent = size - pad;

  // Grid Tic-Tac-Toe letters
  // Row 1: A, B, C
  // Row 2: D, E, F
  // Row 3: G, H, I
  // J-R: Same with dot
  // S-V: X grid (Top S, Left T, Right U, Bottom V)
  // W-Z: Same X with dot

  let paths: React.ReactNode = null;
  let hasDot = false;
  let dotPos = { cx: size / 2, cy: size / 2 };

  switch (upper) {
    case 'A':
    case 'J':
      // Open Top & Left -> Right vertical, Bottom horizontal
      paths = (
        <path
          d={`M ${extent} ${pad} L ${extent} ${extent} L ${pad} ${extent}`}
          fill="none"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeLinecap="square"
          strokeLinejoin="miter"
        />
      );
      hasDot = upper === 'J';
      dotPos = { cx: size / 2 - 2, cy: size / 2 - 2 };
      break;

    case 'B':
    case 'K':
      // Open Top -> Left vertical, Bottom horizontal, Right vertical (U-shape)
      paths = (
        <path
          d={`M ${pad} ${pad} L ${pad} ${extent} L ${extent} ${extent} L ${extent} ${pad}`}
          fill="none"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeLinecap="square"
          strokeLinejoin="miter"
        />
      );
      hasDot = upper === 'K';
      dotPos = { cx: size / 2, cy: size / 2 - 2 };
      break;

    case 'C':
    case 'L':
      // Open Top & Right -> Left vertical, Bottom horizontal
      paths = (
        <path
          d={`M ${pad} ${pad} L ${pad} ${extent} L ${extent} ${extent}`}
          fill="none"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeLinecap="square"
          strokeLinejoin="miter"
        />
      );
      hasDot = upper === 'L';
      dotPos = { cx: size / 2 + 2, cy: size / 2 - 2 };
      break;

    case 'D':
    case 'M':
      // Open Left -> Top horizontal, Right vertical, Bottom horizontal (]-shape)
      paths = (
        <path
          d={`M ${pad} ${pad} L ${extent} ${pad} L ${extent} ${extent} L ${pad} ${extent}`}
          fill="none"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeLinecap="square"
          strokeLinejoin="miter"
        />
      );
      hasDot = upper === 'M';
      dotPos = { cx: size / 2 - 2, cy: size / 2 };
      break;

    case 'E':
    case 'N':
      // Fully enclosed square box
      paths = (
        <rect
          x={pad}
          y={pad}
          width={extent - pad}
          height={extent - pad}
          fill="none"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
        />
      );
      hasDot = upper === 'N';
      dotPos = { cx: size / 2, cy: size / 2 };
      break;

    case 'F':
    case 'O':
      // Open Right -> Top horizontal, Left vertical, Bottom horizontal ([-shape)
      paths = (
        <path
          d={`M ${extent} ${pad} L ${pad} ${pad} L ${pad} ${extent} L ${extent} ${extent}`}
          fill="none"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeLinecap="square"
          strokeLinejoin="miter"
        />
      );
      hasDot = upper === 'O';
      dotPos = { cx: size / 2 + 2, cy: size / 2 };
      break;

    case 'G':
    case 'P':
      // Open Bottom & Left -> Top horizontal, Right vertical
      paths = (
        <path
          d={`M ${pad} ${pad} L ${extent} ${pad} L ${extent} ${extent}`}
          fill="none"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeLinecap="square"
          strokeLinejoin="miter"
        />
      );
      hasDot = upper === 'P';
      dotPos = { cx: size / 2 - 2, cy: size / 2 + 2 };
      break;

    case 'H':
    case 'Q':
      // Open Bottom -> Left vertical, Top horizontal, Right vertical (Inverted U)
      paths = (
        <path
          d={`M ${pad} ${extent} L ${pad} ${pad} L ${extent} ${pad} L ${extent} ${extent}`}
          fill="none"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeLinecap="square"
          strokeLinejoin="miter"
        />
      );
      hasDot = upper === 'Q';
      dotPos = { cx: size / 2, cy: size / 2 + 2 };
      break;

    case 'I':
    case 'R':
      // Open Bottom & Right -> Top horizontal, Left vertical
      paths = (
        <path
          d={`M ${extent} ${pad} L ${pad} ${pad} L ${pad} ${extent}`}
          fill="none"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeLinecap="square"
          strokeLinejoin="miter"
        />
      );
      hasDot = upper === 'R';
      dotPos = { cx: size / 2 + 2, cy: size / 2 + 2 };
      break;

    // X Cross Grid
    case 'S':
    case 'W':
      // Top quadrant of X: V pointing down
      paths = (
        <path
          d={`M ${pad} ${pad} L ${size / 2} ${extent} L ${extent} ${pad}`}
          fill="none"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeLinecap="square"
        />
      );
      hasDot = upper === 'W';
      dotPos = { cx: size / 2, cy: size / 2 - 3 };
      break;

    case 'T':
    case 'X':
      // Left quadrant of X: > pointing right
      paths = (
        <path
          d={`M ${pad} ${pad} L ${extent} ${size / 2} L ${pad} ${extent}`}
          fill="none"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeLinecap="square"
        />
      );
      hasDot = upper === 'X';
      dotPos = { cx: size / 2 - 3, cy: size / 2 };
      break;

    case 'U':
    case 'Y':
      // Right quadrant of X: < pointing left
      paths = (
        <path
          d={`M ${extent} ${pad} L ${pad} ${size / 2} L ${extent} ${extent}`}
          fill="none"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeLinecap="square"
        />
      );
      hasDot = upper === 'Y';
      dotPos = { cx: size / 2 + 3, cy: size / 2 };
      break;

    case 'V':
    case 'Z':
      // Bottom quadrant of X: ^ pointing up
      paths = (
        <path
          d={`M ${pad} ${extent} L ${size / 2} ${pad} L ${extent} ${extent}`}
          fill="none"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeLinecap="square"
        />
      );
      hasDot = upper === 'Z';
      dotPos = { cx: size / 2, cy: size / 2 + 3 };
      break;

    case ' ':
      // Space spacer
      return <div style={{ width: size, height: size }} className="inline-block" />;

    default:
      // Fallback for symbols/numbers
      return (
        <div
          style={{ width: size, height: size }}
          className="inline-flex items-center justify-center font-typewriter text-xs text-[#a08b76] border border-dashed border-[#443527] rounded"
        >
          {letter}
        </div>
      );
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className="inline-block overflow-visible"
    >
      {paths}
      {hasDot && (
        <circle cx={dotPos.cx} cy={dotPos.cy} r={dotRadius} fill={strokeColor} />
      )}
    </svg>
  );
}

// -----------------------------------------------------------------------------
// AUDIO SYNTHESIZER FOR MORSE
// -----------------------------------------------------------------------------
function playMorseAudio(codeString: string) {
  if (typeof window === 'undefined') return;
  try {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;

    const ctx = new AudioContextClass();
    const dotDuration = 0.08; // 80ms dit
    let currentTime = ctx.currentTime + 0.05;

    for (let i = 0; i < codeString.length; i++) {
      const char = codeString[i];
      if (char === '.' || char === '·') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(750, currentTime);
        gain.gain.setValueAtTime(0.2, currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, currentTime + dotDuration);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(currentTime);
        osc.stop(currentTime + dotDuration);
        currentTime += dotDuration + 0.06;
      } else if (char === '-' || char === '—') {
        const dahDuration = dotDuration * 3;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(750, currentTime);
        gain.gain.setValueAtTime(0.2, currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, currentTime + dahDuration);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(currentTime);
        osc.stop(currentTime + dahDuration);
        currentTime += dahDuration + 0.06;
      } else if (char === ' ') {
        currentTime += dotDuration * 2;
      } else if (char === '/') {
        currentTime += dotDuration * 6;
      }
    }
  } catch (err) {
    console.warn('Audio playback error:', err);
  }
}

// -----------------------------------------------------------------------------
// MAIN MATERIALS PAGE COMPONENT
// -----------------------------------------------------------------------------
export const MaterialsPage: React.FC<MaterialsPageProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'all' | 'morse' | 'phonetic' | 'pigpen'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Morse Scratchpad
  const [morseInput, setMorseInput] = useState('SOS');
  const [morseOutput, setMorseOutput] = useState('... --- ...');

  // Pigpen Scratchpad
  const [pigpenText, setPigpenText] = useState('THORNE 1932');

  // Phonetic Scratchpad
  const [phoneticInput, setPhoneticInput] = useState('SEVEN');

  const searchInputId = useId();
  const morseInputId = useId();
  const phoneticInputId = useId();
  const pigpenInputId = useId();

  const handleCopy = (text: string, key: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 1800);
    }
  };

  const handleMorseEncode = (text: string) => {
    setMorseInput(text);
    const converted = text
      .toUpperCase()
      .split('')
      .map((c) => RAW_MORSE_MAP[c] || c)
      .join(' ');
    setMorseOutput(converted);
  };

  return (
    <div id="materials-page-root" className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      {/* Top Header & Breadcrumb */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-[#362a1f] gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-typewriter text-[#c8924b] mb-1.5 uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5" />
            <span>EXHIBIT SUPPORTING FOLIO • DOC REF #REF-1932-CRYPT</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-cinzel font-bold text-[#f5ebd7] tracking-wide">
            Field Reference Materials
          </h1>
          <p className="text-sm font-serif-body text-[#b09e8c] max-w-2xl mt-1">
            Standard cryptographic primers, signal transmission tables, and archival decoding aids
            provided for archive field analysts.
          </p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            id="materials-back-btn"
            type="button"
            onClick={() => onNavigate('/')}
            className="flex items-center gap-1.5 px-3 py-2 rounded bg-[#1e1712] hover:bg-[#2c221a] border border-[#483728] text-xs font-cinzel text-[#dfd4c5] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-[#c8924b]" />
            <span>Return to Archive</span>
          </button>

          <button
            id="materials-to-vault-btn"
            type="button"
            onClick={() => onNavigate('/vault')}
            className="flex items-center gap-1.5 px-3 py-2 rounded bg-[#351e0e] hover:bg-[#4a2b15] border border-[#a87438] text-xs font-cinzel text-[#ffdfab] transition-colors shadow-sm"
          >
            <KeyRound className="w-3.5 h-3.5 text-[#e0a455]" />
            <span>Access Vault</span>
          </button>
        </div>
      </div>

      {/* Navigation Filter Tabs & Live Search */}
      <div className="mt-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          <button
            id="tab-all-btn"
            type="button"
            onClick={() => setActiveTab('all')}
            className={`px-3 py-1.5 rounded text-xs font-cinzel tracking-wider border transition-all whitespace-nowrap ${
              activeTab === 'all'
                ? 'bg-[#3b2b1e] text-[#f4ecd8] border-[#9c774f] shadow-sm'
                : 'bg-[#18130f] text-[#8e7a68] border-[#31251c] hover:text-[#d5c6b3]'
            }`}
          >
            All Materials
          </button>
          <button
            id="tab-morse-btn"
            type="button"
            onClick={() => setActiveTab('morse')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-cinzel tracking-wider border transition-all whitespace-nowrap ${
              activeTab === 'morse'
                ? 'bg-[#3b2b1e] text-[#f4ecd8] border-[#9c774f] shadow-sm'
                : 'bg-[#18130f] text-[#8e7a68] border-[#31251c] hover:text-[#d5c6b3]'
            }`}
          >
            <Radio className="w-3.5 h-3.5 text-[#c8924b]" />
            <span>Morse Code Chart</span>
          </button>
          <button
            id="tab-phonetic-btn"
            type="button"
            onClick={() => setActiveTab('phonetic')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-cinzel tracking-wider border transition-all whitespace-nowrap ${
              activeTab === 'phonetic'
                ? 'bg-[#3b2b1e] text-[#f4ecd8] border-[#9c774f] shadow-sm'
                : 'bg-[#18130f] text-[#8e7a68] border-[#31251c] hover:text-[#d5c6b3]'
            }`}
          >
            <FileText className="w-3.5 h-3.5 text-[#c8924b]" />
            <span>Phonetic Alphabets</span>
          </button>
          <button
            id="tab-pigpen-btn"
            type="button"
            onClick={() => setActiveTab('pigpen')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-cinzel tracking-wider border transition-all whitespace-nowrap ${
              activeTab === 'pigpen'
                ? 'bg-[#3b2b1e] text-[#f4ecd8] border-[#9c774f] shadow-sm'
                : 'bg-[#18130f] text-[#8e7a68] border-[#31251c] hover:text-[#d5c6b3]'
            }`}
          >
            <Grid className="w-3.5 h-3.5 text-[#c8924b]" />
            <span>Pigpen Cipher</span>
          </button>
        </div>

        {/* Search filter for character or code */}
        <div className="relative w-full md:w-64">
          <Search className="w-3.5 h-3.5 text-[#735e4d] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            id={searchInputId}
            type="text"
            placeholder="Search letter or symbol..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#16120e] text-[#e8dfd2] text-xs font-typewriter pl-9 pr-3 py-2 rounded border border-[#3d2e22] focus:border-[#c8924b] focus:outline-none placeholder-[#6b5847]"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-[#735e4d] hover:text-[#c8924b]"
            >
              ×
            </button>
          )}
        </div>
      </div>

      {/* ===================================================================== */}
      {/* 1. MORSE CODE SECTION                                                 */}
      {/* ===================================================================== */}
      {(activeTab === 'all' || activeTab === 'morse') && (
        <section id="morse-section" className="mt-10 pt-8 border-t border-[#31251b]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-[#2a1e15] border border-[#523d29] text-[10px] font-mono text-[#c8924b]">
                  TABLE I
                </span>
                <h2 className="text-xl sm:text-2xl font-cinzel font-bold text-[#e8ded1]">
                  International Morse Code Reference
                </h2>
              </div>
              <p className="text-xs font-serif-body text-[#9b8978] mt-1">
                Dot (dit = 1 unit), Dash (dah = 3 units). Space between elements = 1 unit; between
                letters = 3 units; between words = 7 units.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => playMorseAudio('... --- ...')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#201711] hover:bg-[#2d2017] border border-[#543e2b] hover:border-[#c8924b] text-xs font-typewriter text-[#e5d8c7] transition-all shadow-sm"
                title="Play audible SOS radio tone"
              >
                <Volume2 className="w-3.5 h-3.5 text-[#c8924b]" />
                <span>Hear &ldquo;SOS&rdquo; Tone</span>
              </button>
            </div>
          </div>

          {/* Interactive Morse Scratchpad / Encoder */}
          <div className="mb-8 p-4 sm:p-5 rounded-lg border border-[#483726] bg-[#17120e] relative overflow-hidden">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2 text-xs font-cinzel text-[#c8924b]">
                <Sparkles className="w-3.5 h-3.5" />
                <span className="font-bold">Interactive Signal Scratchpad</span>
              </div>
              <div className="text-[11px] font-typewriter text-[#7c6957]">
                TYPE TO ENCODE &amp; AUDITION
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor={morseInputId} className="block text-[11px] font-typewriter text-[#a18c77] mb-1.5">
                  PLAIN TEXT / SYMBOLS:
                </label>
                <input
                  id={morseInputId}
                  type="text"
                  value={morseInput}
                  onChange={(e) => handleMorseEncode(e.target.value)}
                  placeholder="e.g. SOS7 or THORNE"
                  className="w-full bg-[#100d0a] text-[#f2e9dc] font-typewriter text-sm px-3.5 py-2.5 rounded border border-[#3e2e21] focus:border-[#c8924b] focus:outline-none"
                  maxLength={32}
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[11px] font-typewriter text-[#a18c77]">
                    MORSE CODE TELEGRAPH:
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleCopy(morseOutput, 'scratchpad-morse')}
                      className="text-[10px] font-typewriter text-[#8f7d6a] hover:text-[#c8924b] flex items-center gap-1"
                    >
                      {copiedKey === 'scratchpad-morse' ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span className="text-emerald-400">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => playMorseAudio(morseOutput)}
                      className="text-[10px] font-typewriter text-[#c8924b] hover:text-[#e4a758] flex items-center gap-1"
                    >
                      <Volume2 className="w-3 h-3" />
                      <span>Play Signal</span>
                    </button>
                  </div>
                </div>

                <div className="w-full bg-[#100d0a] text-[#ffd699] font-mono tracking-widest text-sm px-3.5 py-2.5 rounded border border-[#3e2e21] min-h-[42px] flex items-center">
                  {morseOutput || <span className="text-[#594838] italic">No signal input</span>}
                </div>
              </div>
            </div>
          </div>

          {/* Alphabet Grid */}
          <div className="mb-4">
            <h3 className="text-xs font-cinzel font-bold text-[#b5a18d] uppercase tracking-wider mb-3">
              Letters (A &mdash; Z)
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5">
              {MORSE_ALPHABET.filter(
                (item) =>
                  !searchQuery ||
                  item.char.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  item.code.includes(searchQuery) ||
                  item.mnemonic.toLowerCase().includes(searchQuery.toLowerCase())
              ).map((item) => (
                <div
                  key={item.char}
                  className="p-3 rounded border border-[#382a1d] bg-[#16120e] hover:bg-[#201913] hover:border-[#674e36] transition-all flex flex-col justify-between group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-cinzel font-bold text-[#f5ebd7] group-hover:text-[#ffdfa6]">
                      {item.char}
                    </span>
                    <button
                      type="button"
                      onClick={() => playMorseAudio(RAW_MORSE_MAP[item.char] || '')}
                      className="p-1 rounded text-[#7a6755] hover:text-[#c8924b] hover:bg-[#2b2118] transition-colors"
                      title={`Play audio for ${item.char}`}
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="mt-2 text-sm font-mono font-bold text-[#d49950] tracking-wider">
                    {item.code}
                  </div>
                  <div className="text-[10px] font-typewriter text-[#7c6957] mt-1">
                    {item.mnemonic}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Numbers Grid */}
          <div className="mt-6">
            <h3 className="text-xs font-cinzel font-bold text-[#b5a18d] uppercase tracking-wider mb-3">
              Numerals (0 &mdash; 9)
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5">
              {MORSE_NUMBERS.filter(
                (item) =>
                  !searchQuery ||
                  item.char.includes(searchQuery) ||
                  item.code.includes(searchQuery)
              ).map((item) => (
                <div
                  key={item.char}
                  className="p-3 rounded border border-[#382a1d] bg-[#16120e] hover:bg-[#201913] hover:border-[#674e36] transition-all flex flex-col justify-between group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-mono font-bold text-[#c8924b] group-hover:text-[#ffd699]">
                      {item.char}
                    </span>
                    <button
                      type="button"
                      onClick={() => playMorseAudio(RAW_MORSE_MAP[item.char] || '')}
                      className="p-1 rounded text-[#7a6755] hover:text-[#c8924b] hover:bg-[#2b2118] transition-colors"
                      title={`Play audio for ${item.char}`}
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="mt-2 text-xs font-mono font-bold text-[#d49950] tracking-wider">
                    {item.code}
                  </div>
                  <div className="text-[10px] font-typewriter text-[#7c6957] mt-1">
                    {item.mnemonic}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ===================================================================== */}
      {/* 2. PHONETIC ALPHABETS SECTION                                         */}
      {/* ===================================================================== */}
      {(activeTab === 'all' || activeTab === 'phonetic') && (
        <section id="phonetic-section" className="mt-12 pt-8 border-t border-[#31251b]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-[#2a1e15] border border-[#523d29] text-[10px] font-mono text-[#c8924b]">
                  TABLE II
                </span>
                <h2 className="text-xl sm:text-2xl font-cinzel font-bold text-[#e8ded1]">
                  Phonetic Alphabets &amp; Radio Voice Call-signs
                </h2>
              </div>
              <p className="text-xs font-serif-body text-[#9b8978] mt-1">
                Comparative chart of standard International NATO words alongside Elias
                Thorne&apos;s 1930s era maritime/military voice protocol (Able-Baker).
              </p>
            </div>
          </div>

          {/* Interactive Phonetic Spellout Scratchpad */}
          <div className="mb-8 p-4 sm:p-5 rounded-lg border border-[#483726] bg-[#17120e]">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2 text-xs font-cinzel text-[#c8924b]">
                <FileText className="w-3.5 h-3.5" />
                <span className="font-bold">Phonetic Spellout Simulator</span>
              </div>
              <div className="text-[11px] font-typewriter text-[#7c6957]">
                ENTER WORD TO EXPAND PHONETICALLY
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor={phoneticInputId} className="block text-[11px] font-typewriter text-[#a18c77] mb-1.5">
                  WORD OR CODE:
                </label>
                <input
                  id={phoneticInputId}
                  type="text"
                  value={phoneticInput}
                  onChange={(e) => setPhoneticInput(e.target.value.toUpperCase())}
                  placeholder="e.g. SOS or SEVEN"
                  className="w-full bg-[#100d0a] text-[#f2e9dc] font-typewriter text-sm px-3.5 py-2.5 rounded border border-[#3e2e21] focus:border-[#c8924b] focus:outline-none uppercase"
                  maxLength={24}
                />
              </div>

              <div>
                <span className="block text-[11px] font-typewriter text-[#a18c77] mb-1.5">
                  NATO / ICAO STANDARD:
                </span>
                <div className="bg-[#100d0a] text-[#ffd699] font-typewriter text-xs p-2.5 rounded border border-[#3e2e21] min-h-[42px] flex items-center flex-wrap gap-1">
                  {phoneticInput.split('').map((char, i) => {
                    const found = PHONETIC_ALPHABET.find((p) => p.char === char);
                    return found ? (
                      <span
                        key={i}
                        className="bg-[#241a13] px-2 py-0.5 rounded border border-[#483424] text-[#f0e3d0]"
                      >
                        {found.nato}
                      </span>
                    ) : (
                      <span key={i} className="text-[#8e7a68]">
                        {char}
                      </span>
                    );
                  })}
                </div>
              </div>

              <div>
                <span className="block text-[11px] font-typewriter text-[#a18c77] mb-1.5">
                  1930s ERA ARCHIVE (ABLE-BAKER):
                </span>
                <div className="bg-[#100d0a] text-[#d9a263] font-typewriter text-xs p-2.5 rounded border border-[#3e2e21] min-h-[42px] flex items-center flex-wrap gap-1">
                  {phoneticInput.split('').map((char, i) => {
                    const found = PHONETIC_ALPHABET.find((p) => p.char === char);
                    return found ? (
                      <span
                        key={i}
                        className="bg-[#2a1d13] px-2 py-0.5 rounded border border-[#593d25] text-[#ffdfab]"
                      >
                        {found.historic1930}
                      </span>
                    ) : (
                      <span key={i} className="text-[#8e7a68]">
                        {char}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Comparative Phonetic Table */}
          <div className="overflow-x-auto rounded-lg border border-[#382a1d] bg-[#14100c]">
            <table className="w-full text-left text-xs font-typewriter border-collapse">
              <thead>
                <tr className="border-b border-[#36271a] bg-[#1c1611] text-[#a4917e]">
                  <th className="py-3 px-4 font-cinzel font-bold text-[#c8924b]">LETTER</th>
                  <th className="py-3 px-4 font-cinzel font-bold text-[#e4dacb]">
                    NATO / ICAO CODE
                  </th>
                  <th className="py-3 px-4 font-cinzel font-bold text-[#8d7c6b]">PRONUNCIATION</th>
                  <th className="py-3 px-4 font-cinzel font-bold text-[#d49950]">
                    1930s VINTAGE (THORNE ERA)
                  </th>
                  <th className="py-3 px-4 font-cinzel font-bold text-[#8d7c6b] text-right">
                    MORSE EQUIV.
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#261c14] text-[#d6cbbe]">
                {PHONETIC_ALPHABET.filter(
                  (item) =>
                    !searchQuery ||
                    item.char.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    item.nato.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    item.historic1930.toLowerCase().includes(searchQuery.toLowerCase())
                ).map((item) => {
                  const morse = MORSE_ALPHABET.find((m) => m.char === item.char);
                  return (
                    <tr
                      key={item.char}
                      className="hover:bg-[#1e1711] transition-colors group"
                    >
                      <td className="py-2.5 px-4 font-cinzel font-bold text-base text-[#f5ebd7] group-hover:text-[#ffdfa6]">
                        {item.char}
                      </td>
                      <td className="py-2.5 px-4 text-[#f0e3d0] font-semibold">{item.nato}</td>
                      <td className="py-2.5 px-4 text-[#8f7c69] italic">{item.natoPhonetic}</td>
                      <td className="py-2.5 px-4 text-[#d9a263]">{item.historic1930}</td>
                      <td className="py-2.5 px-4 font-mono text-[#c8924b] text-right font-bold">
                        {morse?.code || ''}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Phonetic Numerals */}
          <div className="mt-6">
            <h3 className="text-xs font-cinzel font-bold text-[#b5a18d] uppercase tracking-wider mb-3">
              Standard Voice Pronunciation of Digits
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5">
              {PHONETIC_DIGITS.map((item) => (
                <div
                  key={item.digit}
                  className="p-3 rounded border border-[#382a1d] bg-[#16120e] flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-mono font-bold text-[#c8924b]">{item.digit}</span>
                    <span className="text-xs text-[#eed6b4] font-typewriter">{item.nato}</span>
                  </div>
                  <div className="mt-2 text-[11px] font-mono text-[#8f7c69]">
                    Spoken: <span className="text-[#ffd699] font-bold">{item.spoken}</span>
                  </div>
                  <div className="text-[9px] font-mono text-[#6e5c4c] mt-0.5">{item.tele}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ===================================================================== */}
      {/* 3. PIGPEN CIPHER SECTION                                              */}
      {/* ===================================================================== */}
      {(activeTab === 'all' || activeTab === 'pigpen') && (
        <section id="pigpen-section" className="mt-12 pt-8 border-t border-[#31251b]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-[#2a1e15] border border-[#523d29] text-[10px] font-mono text-[#c8924b]">
                  TABLE III
                </span>
                <h2 className="text-xl sm:text-2xl font-cinzel font-bold text-[#e8ded1]">
                  Pigpen Cipher (Freemason &amp; Rosicrucian Grids)
                </h2>
              </div>
              <p className="text-xs font-serif-body text-[#9b8978] mt-1">
                Geometric substitution cipher based on two 3×3 grids and two X-crosses. Frame edges
                and inner dots designate each individual character.
              </p>
            </div>
          </div>

          {/* Visual Schematic Diagram of the 4 Pigpen Grids */}
          <div className="mb-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Grid 1: Basic Tic-Tac-Toe */}
            <div className="p-4 rounded-lg border border-[#3e2e21] bg-[#16120e] flex flex-col items-center">
              <div className="text-xs font-cinzel font-bold text-[#c8924b] mb-2 text-center">
                Grid 1: Basic # Grid (A &mdash; I)
              </div>
              <div className="w-36 h-36 border-2 border-[#543e2b] relative bg-[#100d0a] grid grid-cols-3 grid-rows-3 p-1">
                {/* Horizontal internal dividers */}
                <div className="absolute left-0 right-0 top-1/3 h-[2px] bg-[#674f38]" />
                <div className="absolute left-0 right-0 top-2/3 h-[2px] bg-[#674f38]" />
                {/* Vertical internal dividers */}
                <div className="absolute top-0 bottom-0 left-1/3 w-[2px] bg-[#674f38]" />
                <div className="absolute top-0 bottom-0 left-2/3 w-[2px] bg-[#674f38]" />

                {['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'].map((c) => (
                  <div
                    key={c}
                    className="flex items-center justify-center font-cinzel font-bold text-[#e6d0b3] text-sm relative z-10"
                  >
                    {c}
                  </div>
                ))}
              </div>
              <div className="text-[10px] font-typewriter text-[#7b6958] mt-2.5 text-center">
                Lines form outer bounding walls (no dot)
              </div>
            </div>

            {/* Grid 2: Dotted Tic-Tac-Toe */}
            <div className="p-4 rounded-lg border border-[#3e2e21] bg-[#16120e] flex flex-col items-center">
              <div className="text-xs font-cinzel font-bold text-[#c8924b] mb-2 text-center">
                Grid 2: Dotted # Grid (J &mdash; R)
              </div>
              <div className="w-36 h-36 border-2 border-[#543e2b] relative bg-[#100d0a] grid grid-cols-3 grid-rows-3 p-1">
                {/* Horizontal internal dividers */}
                <div className="absolute left-0 right-0 top-1/3 h-[2px] bg-[#674f38]" />
                <div className="absolute left-0 right-0 top-2/3 h-[2px] bg-[#674f38]" />
                {/* Vertical internal dividers */}
                <div className="absolute top-0 bottom-0 left-1/3 w-[2px] bg-[#674f38]" />
                <div className="absolute top-0 bottom-0 left-2/3 w-[2px] bg-[#674f38]" />

                {['J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R'].map((c) => (
                  <div
                    key={c}
                    className="flex flex-col items-center justify-center font-cinzel font-bold text-[#e6d0b3] text-sm relative z-10 leading-tight"
                  >
                    <span>{c}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#c8924b] inline-block -mt-0.5" />
                  </div>
                ))}
              </div>
              <div className="text-[10px] font-typewriter text-[#7b6958] mt-2.5 text-center">
                Same bounding walls + center dot (•)
              </div>
            </div>

            {/* Grid 3: X Cross */}
            <div className="p-4 rounded-lg border border-[#3e2e21] bg-[#16120e] flex flex-col items-center">
              <div className="text-xs font-cinzel font-bold text-[#c8924b] mb-2 text-center">
                Grid 3: X Cross (S &mdash; V)
              </div>
              <div className="w-36 h-36 relative bg-[#100d0a] border border-[#3e2e21] flex items-center justify-center">
                {/* Diagonal lines crossing */}
                <svg className="absolute inset-0 w-full h-full">
                  <line x1="10" y1="10" x2="134" y2="134" stroke="#674f38" strokeWidth="2" />
                  <line x1="134" y1="10" x2="10" y2="134" stroke="#674f38" strokeWidth="2" />
                </svg>
                {/* Letters positioned in 4 quadrants */}
                <span className="absolute top-2 font-cinzel font-bold text-[#e6d0b3] text-sm">
                  S
                </span>
                <span className="absolute left-3 font-cinzel font-bold text-[#e6d0b3] text-sm">
                  T
                </span>
                <span className="absolute right-3 font-cinzel font-bold text-[#e6d0b3] text-sm">
                  U
                </span>
                <span className="absolute bottom-2 font-cinzel font-bold text-[#e6d0b3] text-sm">
                  V
                </span>
              </div>
              <div className="text-[10px] font-typewriter text-[#7b6958] mt-2.5 text-center">
                Open diagonal corners (no dot)
              </div>
            </div>

            {/* Grid 4: Dotted X Cross */}
            <div className="p-4 rounded-lg border border-[#3e2e21] bg-[#16120e] flex flex-col items-center">
              <div className="text-xs font-cinzel font-bold text-[#c8924b] mb-2 text-center">
                Grid 4: Dotted X Cross (W &mdash; Z)
              </div>
              <div className="w-36 h-36 relative bg-[#100d0a] border border-[#3e2e21] flex items-center justify-center">
                {/* Diagonal lines crossing */}
                <svg className="absolute inset-0 w-full h-full">
                  <line x1="10" y1="10" x2="134" y2="134" stroke="#674f38" strokeWidth="2" />
                  <line x1="134" y1="10" x2="10" y2="134" stroke="#674f38" strokeWidth="2" />
                </svg>
                {/* Letters positioned in 4 quadrants with dot */}
                <div className="absolute top-1.5 flex flex-col items-center font-cinzel font-bold text-[#e6d0b3] text-xs">
                  <span>W</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#c8924b] inline-block" />
                </div>
                <div className="absolute left-2 flex flex-row items-center gap-1 font-cinzel font-bold text-[#e6d0b3] text-xs">
                  <span>X</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#c8924b] inline-block" />
                </div>
                <div className="absolute right-2 flex flex-row-reverse items-center gap-1 font-cinzel font-bold text-[#e6d0b3] text-xs">
                  <span>Y</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#c8924b] inline-block" />
                </div>
                <div className="absolute bottom-1.5 flex flex-col-reverse items-center font-cinzel font-bold text-[#e6d0b3] text-xs">
                  <span>Z</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#c8924b] inline-block" />
                </div>
              </div>
              <div className="text-[10px] font-typewriter text-[#7b6958] mt-2.5 text-center">
                Open diagonal corners + center dot (•)
              </div>
            </div>
          </div>

          {/* Interactive Pigpen Visual Encoder Scratchpad */}
          <div className="mb-8 p-4 sm:p-5 rounded-lg border border-[#483726] bg-[#17120e]">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2 text-xs font-cinzel text-[#c8924b]">
                <Grid className="w-3.5 h-3.5" />
                <span className="font-bold">Interactive Pigpen Glyph Generator</span>
              </div>
              <div className="text-[11px] font-typewriter text-[#7c6957]">
                TYPE TEXT TO INSTANTLY RENDER CIPHER
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor={pigpenInputId} className="block text-[11px] font-typewriter text-[#a18c77] mb-1.5">
                  SECRET TEXT TO ENCODE:
                </label>
                <input
                  id={pigpenInputId}
                  type="text"
                  value={pigpenText}
                  onChange={(e) => setPigpenText(e.target.value.toUpperCase())}
                  placeholder="e.g. SOS or ELIAS"
                  className="w-full bg-[#100d0a] text-[#f2e9dc] font-typewriter text-sm px-3.5 py-2.5 rounded border border-[#3e2e21] focus:border-[#c8924b] focus:outline-none uppercase"
                  maxLength={30}
                />
                <div className="text-[10px] font-typewriter text-[#756250] mt-1.5">
                  Letters A-Z convert directly to geometric glyphs.
                </div>
              </div>

              <div className="md:col-span-2">
                <span className="block text-[11px] font-typewriter text-[#a18c77] mb-1.5">
                  GENERATED PIGPEN CIPHER VISUAL:
                </span>
                <div className="bg-[#100d0a] p-4 rounded border border-[#3e2e21] min-h-[58px] flex items-center flex-wrap gap-2 overflow-x-auto">
                  {pigpenText.length === 0 ? (
                    <span className="text-xs text-[#5c4a3b] italic">
                      Type above to generate Pigpen symbols...
                    </span>
                  ) : (
                    pigpenText.split('').map((char, idx) => (
                      <div
                        key={idx}
                        className="flex flex-col items-center bg-[#1a140f] p-1.5 rounded border border-[#36291e]"
                      >
                        <PigpenGlyph
                          letter={char}
                          size={36}
                          strokeColor="#ffd699"
                          strokeWidth={2.5}
                          dotRadius={2.8}
                        />
                        <span className="text-[9px] font-typewriter text-[#7c6957] mt-1">
                          {char === ' ' ? '␣' : char}
                        </span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Full A-Z Interactive Pigpen Glyph Reference Catalog */}
          <div>
            <h3 className="text-xs font-cinzel font-bold text-[#b5a18d] uppercase tracking-wider mb-3">
              Full Alphabet Glyph Chart (A &mdash; Z)
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
              {'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map((char) => (
                <div
                  key={char}
                  className="p-3 rounded border border-[#3a2c1f] bg-[#16120e] hover:bg-[#201913] hover:border-[#6f553c] transition-all flex flex-col items-center justify-center group"
                >
                  <div className="w-12 h-12 flex items-center justify-center">
                    <PigpenGlyph
                      letter={char}
                      size={36}
                      strokeColor="#f0ce9f"
                      strokeWidth={2.5}
                      dotRadius={2.8}
                    />
                  </div>
                  <div className="mt-2 flex items-center justify-between w-full px-1 pt-1.5 border-t border-[#291f16]">
                    <span className="font-cinzel font-bold text-sm text-[#f5ebd7] group-hover:text-[#ffd699]">
                      {char}
                    </span>
                    <span className="text-[9px] font-mono text-[#8a7663]">
                      #{char.charCodeAt(0) - 64}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Archival Research Notes Box at Bottom */}
      <div className="mt-12 p-5 rounded-lg border border-[#3d2e20] bg-[#14100c] text-xs font-serif-body text-[#9b8875] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <HelpCircle className="w-4 h-4 text-[#c8924b] shrink-0 mt-0.5" />
          <div>
            <div className="font-cinzel font-bold text-[#d4c5b2] mb-0.5">
              Archivist Cryptographic Notice
            </div>
            <div>
              All materials in this folio correspond to 1932 communication and transmission
              protocols recovered from Elias Thorne&apos;s field expedition kit. Use these tables to
              cross-examine Reel IX (Study), Reel VII (Radio), Reel III (Map Room), and Reel I
              (Letter).
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => onNavigate('/')}
          className="shrink-0 px-3 py-1.5 rounded bg-[#241a13] hover:bg-[#33251b] border border-[#523e2c] text-xs font-cinzel text-[#eed8be] transition-colors"
        >
          Back to Archives
        </button>
      </div>
    </div>
  );
};
