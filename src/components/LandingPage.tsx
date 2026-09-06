import React from 'react';
import { RoutePath } from '../types';
import { EXHIBITS } from './Navigation';
import { ArrowRight, Lock, Eye, Compass, Radio, FileText, Map, ShieldAlert, BookOpen } from 'lucide-react';

interface LandingPageProps {
  onNavigate: (path: RoutePath) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  const getIcon = (id: string) => {
    switch (id) {
      case 'radio':
        return <Radio className="w-5 h-5" />;
      case 'letter':
        return <FileText className="w-5 h-5" />;
      case 'study':
        return <Compass className="w-5 h-5" />;
      case 'map-room':
        return <Map className="w-5 h-5" />;
      default:
        return <Eye className="w-5 h-5" />;
    }
  };

  return (
    <div id="landing-page" className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-14">
      {/* Archival Classification Stamp */}
      <div className="flex items-center justify-between border-b border-[#3b2f24] pb-4 mb-10 text-xs font-typewriter text-[#8f7d6d]">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#c8924b]/60 inline-block animate-pulse"></span>
          <span>FILE STATUS: RESTRICTED ACCESS (PARTIAL DECLASSIFICATION)</span>
        </div>
        <div className="tracking-widest uppercase text-[#b39c87]">
          CATALOG REF: TH-1932-IV
        </div>
      </div>

      {/* Main Dossier Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-block border border-[#524131] bg-[#1a1410] px-4 py-1 rounded-full text-xs font-typewriter text-[#c8924b] mb-4">
          DISPATCH RECORD • SPECIAL INVESTIGATION
        </div>

        <h1 className="text-4xl sm:text-6xl font-cinzel font-black tracking-tight text-[#f3ede4] mb-3">
          THE THORNE ARCHIVE
        </h1>

        <p className="text-base sm:text-xl font-serif-body italic text-[#c4b5a2] mb-6">
          Recovered materials of Elias Thorne, cartographer, missing since 1932
        </p>

        <div className="relative py-4 px-6 border-y border-[#3d3023] bg-[#15110d] rounded my-6">
          <p className="text-sm sm:text-base font-serif-body text-[#ddd2c3] leading-relaxed max-w-2xl mx-auto">
            This archive was sealed until now. Four fragments survive. Read them closely — the
            Archive does not explain itself twice.
          </p>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            id="enter-archive-btn"
            type="button"
            onClick={() => onNavigate(EXHIBITS[0].path)}
            className="w-full sm:w-auto px-8 py-3.5 bg-[#c8924b] hover:bg-[#d69f58] text-[#120f0c] font-cinzel font-bold text-sm tracking-wider rounded border border-[#e2ad6b] shadow-lg shadow-black/40 transition-all flex items-center justify-center gap-2.5 group"
          >
            <span>Enter the Archive</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            id="landing-vault-locked-btn"
            type="button"
            onClick={() => onNavigate('/vault')}
            className="w-full sm:w-auto px-6 py-3.5 bg-[#1a1410] hover:bg-[#231b15] text-[#8e7a68] hover:text-[#bca48e] font-cinzel text-xs tracking-wider rounded border border-[#3b2d22] transition-colors flex items-center justify-center gap-2"
          >
            <Lock className="w-3.5 h-3.5 text-[#8e7a68]" />
            <span>Locked — requires the Archive&apos;s true code</span>
          </button>
        </div>
      </div>

      {/* Shuffled Exhibit Cards Section */}
      <div className="mt-14">
        <div className="flex items-center justify-between mb-6 pb-2 border-b border-[#2d241c]">
          <div className="font-cinzel text-lg sm:text-xl font-bold text-[#e8dfd3] tracking-wide">
            Surviving Artifacts
          </div>
          <div className="text-xs font-typewriter text-[#7c6957]">
            CATALOGUED OUT OF ORDER • UNRESTORED
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {EXHIBITS.map((exhibit, idx) => (
            <div
              key={exhibit.id}
              id={`exhibit-card-${exhibit.id}`}
              onClick={() => onNavigate(exhibit.path)}
              className="group cursor-pointer p-6 rounded-lg border border-[#382b20] bg-[#171310] hover:bg-[#1f1914] hover:border-[#6f563e] transition-all relative overflow-hidden"
            >
              {/* Subtle top edge decoration */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#c8924b]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 rounded border border-[#4a392b] bg-[#221a14] flex items-center justify-center text-[#c8924b] group-hover:border-[#c8924b] group-hover:scale-105 transition-all">
                  {getIcon(exhibit.id)}
                </div>

                <div className="text-right">
                  <div className="text-[11px] font-mono text-[#c8924b] bg-[#221a14] px-2 py-0.5 rounded border border-[#3d2f23]">
                    {exhibit.path}
                  </div>
                  <div className="text-[10px] font-typewriter text-[#7b6958] mt-1">
                    FRAGMENT {idx + 1} OF 4
                  </div>
                </div>
              </div>

              <div className="mb-2">
                <div className="text-xs font-cinzel text-[#a08b76] uppercase tracking-wider">
                  Reel {exhibit.reelRoman}
                </div>
                <h3 className="text-xl font-cinzel font-bold text-[#f5ebd7] group-hover:text-[#ffd699] transition-colors">
                  {exhibit.title}
                </h3>
              </div>

              <p className="text-sm font-serif-body text-[#a89988] mb-4">
                {exhibit.thumbnailDesc}
              </p>

              <div className="flex items-center justify-between text-xs pt-3 border-t border-[#292018] text-[#8e7b6a] group-hover:text-[#c8924b] transition-colors">
                <span className="font-typewriter">INSPECT FRAGMENT</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>

        {/* Field Materials Reference Card for Participants */}
        <div className="mt-6 p-6 rounded-lg border border-[#3e3022] bg-[#16120e] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#241c15] border border-[#59432f] flex items-center justify-center text-[#c8924b]">
              <BookOpen className="w-5 h-5 text-[#c8924b]" />
            </div>
            <div>
              <div className="text-xs font-typewriter text-[#c8924b] tracking-wider uppercase">
                PARTICIPANT FIELD MATERIALS
              </div>
              <div className="text-lg font-cinzel font-bold text-[#e4dacb]">
                Cryptographic Reference Charts &amp; Ciphers
              </div>
              <div className="text-xs text-[#8f7d6c] font-serif-body">
                Access official Morse code charts, NATO &amp; 1930s phonetic alphabets, and Pigpen cipher grids.
              </div>
            </div>
          </div>

          <button
            id="landing-materials-btn"
            type="button"
            onClick={() => onNavigate('/materials')}
            className="w-full sm:w-auto px-5 py-2.5 rounded bg-[#271d16] hover:bg-[#382b20] border border-[#6b523a] text-xs font-cinzel text-[#f4ecd8] hover:text-[#ffd699] transition-colors whitespace-nowrap flex items-center justify-center gap-2 shadow-sm"
          >
            <span>Open Materials Folio</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#c8924b]" />
          </button>
        </div>

        {/* Vault Teaser Card */}
        <div className="mt-6 p-6 rounded-lg border border-[#443123] bg-[#140f0c] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#201711] border border-[#523d2b] flex items-center justify-center text-[#967d66]">
              <Lock className="w-5 h-5 text-[#c8924b]" />
            </div>
            <div>
              <div className="text-xs font-typewriter text-[#c8924b] tracking-wider uppercase">
                FINAL CHAMBER
              </div>
              <div className="text-lg font-cinzel font-bold text-[#e4dacb]">
                The Inner Vault
              </div>
              <div className="text-xs text-[#8f7d6c] font-serif-body">
                Access is sealed until the Archive&apos;s 4-character true name is assembled.
              </div>
            </div>
          </div>

          <button
            id="bottom-vault-btn"
            type="button"
            onClick={() => onNavigate('/vault')}
            className="w-full sm:w-auto px-5 py-2.5 rounded bg-[#201812] hover:bg-[#2c2119] border border-[#4d3929] text-xs font-cinzel text-[#c8924b] hover:text-[#e0a860] transition-colors whitespace-nowrap flex items-center justify-center gap-2"
          >
            <span>Test Vault Entry</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Field Note / Disclaimer */}
      <div className="mt-12 text-center text-xs font-typewriter text-[#6b5a4b] border-t border-[#261f18] pt-6">
        <ShieldAlert className="w-4 h-4 mx-auto mb-2 text-[#8c745f]" />
        <span>RECORDS PRESERVED UNDER SEAL. EXAMINE EVERY MARK, SHIFT, AND RETRIEVAL INDEX.</span>
      </div>
    </div>
  );
};
