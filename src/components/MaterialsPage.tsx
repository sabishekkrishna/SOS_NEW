import React from 'react';
import { RoutePath } from '../types';
import { ArrowLeft, BookOpen } from 'lucide-react';

interface MaterialsPageProps {
  onNavigate: (path: RoutePath) => void;
}

const MORSE_LETTERS_LEFT = [
  { letter: 'A', code: '.-' },
  { letter: 'B', code: '-...' },
  { letter: 'C', code: '-.-.' },
  { letter: 'D', code: '-..' },
  { letter: 'E', code: '.' },
  { letter: 'F', code: '..-.' },
  { letter: 'G', code: '--.' },
  { letter: 'H', code: '....' },
  { letter: 'I', code: '..' },
  { letter: 'J', code: '.---' },
  { letter: 'K', code: '-.-' },
  { letter: 'L', code: '.-..' },
  { letter: 'M', code: '--' },
];

const MORSE_LETTERS_RIGHT = [
  { letter: 'N', code: '-.' },
  { letter: 'O', code: '---' },
  { letter: 'P', code: '.--.' },
  { letter: 'Q', code: '--.-' },
  { letter: 'R', code: '.-.' },
  { letter: 'S', code: '...' },
  { letter: 'T', code: '-' },
  { letter: 'U', code: '..-' },
  { letter: 'V', code: '...-' },
  { letter: 'W', code: '.--' },
  { letter: 'X', code: '-..-' },
  { letter: 'Y', code: '-.--' },
  { letter: 'Z', code: '--..' },
];

const MORSE_DIGITS = [
  { digit: '0', code: '-----' },
  { digit: '1', code: '.----' },
  { digit: '2', code: '..---' },
  { digit: '3', code: '...--' },
  { digit: '4', code: '....-' },
  { digit: '5', code: '.....' },
  { digit: '6', code: '-....' },
  { digit: '7', code: '--...' },
  { digit: '8', code: '---..' },
  { digit: '9', code: '----.' },
];

const NATO_LEFT = [
  { letter: 'A', word: 'Alpha' },
  { letter: 'B', word: 'Bravo' },
  { letter: 'C', word: 'Charlie' },
  { letter: 'D', word: 'Delta' },
  { letter: 'E', word: 'Echo' },
  { letter: 'F', word: 'Foxtrot' },
  { letter: 'G', word: 'Golf' },
  { letter: 'H', word: 'Hotel' },
  { letter: 'I', word: 'India' },
  { letter: 'J', word: 'Juliett' },
  { letter: 'K', word: 'Kilo' },
  { letter: 'L', word: 'Lima' },
  { letter: 'M', word: 'Mike' },
];

const NATO_RIGHT = [
  { letter: 'N', word: 'November' },
  { letter: 'O', word: 'Oscar' },
  { letter: 'P', word: 'Papa' },
  { letter: 'Q', word: 'Quebec' },
  { letter: 'R', word: 'Romeo' },
  { letter: 'S', word: 'Sierra' },
  { letter: 'T', word: 'Tango' },
  { letter: 'U', word: 'Uniform' },
  { letter: 'V', word: 'Victor' },
  { letter: 'W', word: 'Whiskey' },
  { letter: 'X', word: 'X-ray' },
  { letter: 'Y', word: 'Yankee' },
  { letter: 'Z', word: 'Zulu' },
];

const COLOUR_CODE = [
  { colour: 'Black', digit: 0, hex: '#18181b', border: '#3f3f46' },
  { colour: 'Brown', digit: 1, hex: '#78350f', border: '#92400e' },
  { colour: 'Red', digit: 2, hex: '#dc2626', border: '#b91c1c' },
  { colour: 'Orange', digit: 3, hex: '#ea580c', border: '#c2410c' },
  { colour: 'Yellow', digit: 4, hex: '#eab308', border: '#ca8a04' },
  { colour: 'Green', digit: 5, hex: '#16a34a', border: '#15803d' },
  { colour: 'Blue', digit: 6, hex: '#2563eb', border: '#1d4ed8' },
  { colour: 'Violet', digit: 7, hex: '#7c3aed', border: '#6d28d9' },
  { colour: 'Grey', digit: 8, hex: '#6b7280', border: '#4b5563' },
  { colour: 'White', digit: 9, hex: '#f4f4f5', border: '#d4d4d8' },
];

export const MaterialsPage: React.FC<MaterialsPageProps> = ({ onNavigate }) => {
  return (
    <div id="materials-page-container" className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      {/* Return to Archive Link */}
      <div className="mb-6">
        <button
          type="button"
          onClick={() => onNavigate('/')}
          className="text-xs font-typewriter text-[#8e7b6b] hover:text-[#c8924b] transition-colors flex items-center gap-1.5"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Return to Archive Catalog
        </button>
      </div>

      {/* Header Section */}
      <div className="border-b border-[#3b2d20] pb-6 mb-8">
        <div className="flex items-center gap-2 text-xs font-typewriter text-[#c8924b] tracking-wider uppercase mb-2">
          <BookOpen className="w-4 h-4 text-[#c8924b]" />
          <span>FIELD REFERENCE FOLIO</span>
          <span className="text-[#594636]">/</span>
          <code className="text-[#bfa38b] bg-[#1a140f] px-2 py-0.5 rounded border border-[#382a1d]">
            /materials
          </code>
        </div>

        <h1 className="text-3xl sm:text-4xl font-cinzel font-bold text-[#f5ebd7] tracking-wide mb-3">
          The Thorne Archive — Field Reference
        </h1>

        {/* Exact Prompt Required Copy */}
        <p className="text-base sm:text-lg font-serif-body italic text-[#c8b5a0] leading-relaxed">
          Recovered alongside the reels: a keeper&apos;s reference card, reprinted here for convenience.
        </p>
      </div>

      <div className="space-y-10">
        {/* SECTION 1: MORSE CODE */}
        <section id="section-morse-code" className="rounded-xl border border-[#3e2e21] bg-[#14100c] p-6 sm:p-8 shadow-xl">
          <div className="border-b border-[#2b2017] pb-4 mb-6">
            <h2 className="text-xl sm:text-2xl font-cinzel font-bold text-[#f0e4d2] tracking-wide">
              Morse Code
            </h2>
            <p className="text-xs font-typewriter text-[#8a7563] mt-1">
              Standard International Radiotelegraph Signaling Codes
            </p>
          </div>

          {/* Letters Reference (Two Columns) */}
          <div className="mb-8">
            <h3 className="text-xs font-typewriter uppercase tracking-wider text-[#c8924b] mb-3">
              Letters (A &mdash; Z)
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Left Column A-M */}
              <div className="border border-[#2d2218] rounded-lg overflow-hidden bg-[#18130e]">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#201812] border-b border-[#2d2218] text-xs font-cinzel text-[#a08b76]">
                      <th className="py-2.5 px-4 font-semibold">Letter</th>
                      <th className="py-2.5 px-4 font-semibold text-right">Code</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#241a12] text-sm">
                    {MORSE_LETTERS_LEFT.map((row) => (
                      <tr key={row.letter} className="hover:bg-[#201913] transition-colors">
                        <td className="py-2 px-4 font-cinzel font-bold text-[#f5ebd7]">{row.letter}</td>
                        <td className="py-2 px-4 text-right">
                          <code className="font-mono font-bold text-base text-[#e8a355] tracking-widest bg-[#100d0a] px-2.5 py-0.5 rounded border border-[#33261a]">
                            {row.code}
                          </code>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Right Column N-Z */}
              <div className="border border-[#2d2218] rounded-lg overflow-hidden bg-[#18130e]">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#201812] border-b border-[#2d2218] text-xs font-cinzel text-[#a08b76]">
                      <th className="py-2.5 px-4 font-semibold">Letter</th>
                      <th className="py-2.5 px-4 font-semibold text-right">Code</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#241a12] text-sm">
                    {MORSE_LETTERS_RIGHT.map((row) => (
                      <tr key={row.letter} className="hover:bg-[#201913] transition-colors">
                        <td className="py-2 px-4 font-cinzel font-bold text-[#f5ebd7]">{row.letter}</td>
                        <td className="py-2 px-4 text-right">
                          <code className="font-mono font-bold text-base text-[#e8a355] tracking-widest bg-[#100d0a] px-2.5 py-0.5 rounded border border-[#33261a]">
                            {row.code}
                          </code>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Digits Reference (0-9) */}
          <div>
            <h3 className="text-xs font-typewriter uppercase tracking-wider text-[#c8924b] mb-3">
              Digits (0 &mdash; 9)
            </h3>

            <div className="border border-[#2d2218] rounded-lg overflow-hidden bg-[#18130e] max-w-md">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#201812] border-b border-[#2d2218] text-xs font-cinzel text-[#a08b76]">
                    <th className="py-2.5 px-4 font-semibold">Digit</th>
                    <th className="py-2.5 px-4 font-semibold text-right">Code</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#241a12] text-sm">
                  {MORSE_DIGITS.map((row) => (
                    <tr key={row.digit} className="hover:bg-[#201913] transition-colors">
                      <td className="py-2 px-4 font-cinzel font-bold text-[#f5ebd7]">{row.digit}</td>
                      <td className="py-2 px-4 text-right">
                        <code className="font-mono font-bold text-base text-[#e8a355] tracking-widest bg-[#100d0a] px-2.5 py-0.5 rounded border border-[#33261a]">
                          {row.code}
                        </code>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* SECTION 2: NATO PHONETIC ALPHABET */}
        <section id="section-phonetic-alphabet" className="rounded-xl border border-[#3e2e21] bg-[#14100c] p-6 sm:p-8 shadow-xl">
          <div className="border-b border-[#2b2017] pb-4 mb-6">
            <h2 className="text-xl sm:text-2xl font-cinzel font-bold text-[#f0e4d2] tracking-wide">
              NATO Phonetic Alphabet
            </h2>
            <p className="text-xs font-typewriter text-[#8a7563] mt-1">
              Standard Radiotelephony Spelling Alphabet
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Left Column A-M */}
            <div className="border border-[#2d2218] rounded-lg overflow-hidden bg-[#18130e]">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#201812] border-b border-[#2d2218] text-xs font-cinzel text-[#a08b76]">
                    <th className="py-2.5 px-4 font-semibold">Letter</th>
                    <th className="py-2.5 px-4 font-semibold">Word</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#241a12] text-sm">
                  {NATO_LEFT.map((row) => (
                    <tr key={row.letter} className="hover:bg-[#201913] transition-colors">
                      <td className="py-2 px-4 font-cinzel font-bold text-[#c8924b] w-16">{row.letter}</td>
                      <td className="py-2 px-4 font-serif-body text-[#f5ebd7] font-medium">{row.word}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Right Column N-Z */}
            <div className="border border-[#2d2218] rounded-lg overflow-hidden bg-[#18130e]">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#201812] border-b border-[#2d2218] text-xs font-cinzel text-[#a08b76]">
                    <th className="py-2.5 px-4 font-semibold">Letter</th>
                    <th className="py-2.5 px-4 font-semibold">Word</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#241a12] text-sm">
                  {NATO_RIGHT.map((row) => (
                    <tr key={row.letter} className="hover:bg-[#201913] transition-colors">
                      <td className="py-2 px-4 font-cinzel font-bold text-[#c8924b] w-16">{row.letter}</td>
                      <td className="py-2 px-4 font-serif-body text-[#f5ebd7] font-medium">{row.word}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* SECTION 3: COLOUR CODE */}
        <section id="section-colour-code" className="rounded-xl border border-[#3e2e21] bg-[#14100c] p-6 sm:p-8 shadow-xl">
          <div className="border-b border-[#2b2017] pb-4 mb-6">
            <h2 className="text-xl sm:text-2xl font-cinzel font-bold text-[#f0e4d2] tracking-wide">
              Colour Code
            </h2>
            <p className="text-xs font-typewriter text-[#8a7563] mt-1">
              Standard Electronic Component &amp; Resistor Marking Values
            </p>
          </div>

          <div className="border border-[#2d2218] rounded-lg overflow-hidden bg-[#18130e] max-w-md">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#201812] border-b border-[#2d2218] text-xs font-cinzel text-[#a08b76]">
                  <th className="py-2.5 px-4 font-semibold">Colour</th>
                  <th className="py-2.5 px-4 font-semibold text-right">Digit</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#241a12] text-sm">
                {COLOUR_CODE.map((row) => (
                  <tr key={row.colour} className="hover:bg-[#201913] transition-colors">
                    <td className="py-2 px-4 font-cinzel font-bold text-[#f5ebd7] flex items-center gap-3">
                      <span
                        className="w-3.5 h-3.5 rounded-full inline-block shrink-0 shadow-sm"
                        style={{ backgroundColor: row.hex, border: `1px solid ${row.border}` }}
                      />
                      <span>{row.colour}</span>
                    </td>
                    <td className="py-2 px-4 text-right">
                      <code className="font-mono font-bold text-base text-[#e8a355] tracking-widest bg-[#100d0a] px-2.5 py-0.5 rounded border border-[#33261a]">
                        {row.digit}
                      </code>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>

      {/* Footer Navigation */}
      <div className="mt-12 pt-6 border-t border-[#261d15] flex items-center justify-between text-xs font-typewriter text-[#786656]">
        <div>ARCHIVAL KEEPER&apos;S REFERENCE CARD</div>
        <button
          type="button"
          onClick={() => onNavigate('/vault')}
          className="text-[#c8924b] hover:text-[#e0a860] transition-colors"
        >
          Proceed to The Vault &rarr;
        </button>
      </div>
    </div>
  );
};
