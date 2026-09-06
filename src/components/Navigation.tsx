import React from 'react';
import { RoutePath, ExhibitMeta } from '../types';
import { Lock, Archive, Compass, Radio, FileText, Map, KeyRound, BookOpen } from 'lucide-react';

export const EXHIBITS: ExhibitMeta[] = [
  {
    id: 'radio',
    path: '/archive/reel-07',
    reelNumber: '07',
    reelRoman: 'VII',
    title: 'The Radio',
    subtitle: 'Rebuilt frequency tuner',
    thumbnailDesc: 'Scrambled receiver dial with copper needle',
  },
  {
    id: 'letter',
    path: '/archive/reel-01',
    reelNumber: '01',
    reelRoman: 'I',
    title: 'The Letter',
    subtitle: 'Charred parchment document',
    thumbnailDesc: 'Burned correspondence with enciphered message',
  },
  {
    id: 'study',
    path: '/archive/reel-09',
    reelNumber: '09',
    reelRoman: 'IX',
    title: 'The Study',
    subtitle: 'Field desk journal leaf',
    thumbnailDesc: 'Water and coffee damaged cartography notes',
  },
  {
    id: 'map-room',
    path: '/archive/reel-03',
    reelNumber: '03',
    reelRoman: 'III',
    title: 'The Map Room',
    subtitle: 'Tactical survey wall display',
    thumbnailDesc: 'Unlabeled chart bound with taut strings and brass pins',
  },
];

interface NavigationProps {
  currentPath: RoutePath;
  onNavigate: (path: RoutePath) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ currentPath, onNavigate }) => {
  const getIcon = (id: string) => {
    switch (id) {
      case 'radio':
        return <Radio className="w-3.5 h-3.5" />;
      case 'letter':
        return <FileText className="w-3.5 h-3.5" />;
      case 'study':
        return <Compass className="w-3.5 h-3.5" />;
      case 'map-room':
        return <Map className="w-3.5 h-3.5" />;
      default:
        return <Archive className="w-3.5 h-3.5" />;
    }
  };

  return (
    <header
      id="archive-header-nav"
      className="sticky top-0 z-40 w-full border-b border-[#362b21] bg-[#12100e]/95 backdrop-blur-md px-4 sm:px-8 py-3.5"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Brand / Archive Title */}
        <div className="flex items-center justify-between">
          <button
            id="nav-brand-btn"
            type="button"
            onClick={() => onNavigate('/')}
            className="group flex items-center gap-2.5 text-left focus:outline-none"
          >
            <div className="w-7 h-7 rounded border border-[#695542] bg-[#221c16] flex items-center justify-center text-[#c8924b] group-hover:border-[#c8924b] transition-colors">
              <Archive className="w-4 h-4" />
            </div>
            <div>
              <div className="font-cinzel text-sm sm:text-base font-bold tracking-wider text-[#e8dfd3] group-hover:text-[#f3ede4] transition-colors">
                THE THORNE ARCHIVE
              </div>
              <div className="text-[10px] uppercase font-typewriter tracking-widest text-[#8a7767]">
                DEPT. OF HISTORICAL ANOMALIES • SEALED 1932
              </div>
            </div>
          </button>

          {/* Current Path Indicator on mobile */}
          <div className="md:hidden font-mono text-[11px] text-[#c8924b] bg-[#1c1713] px-2 py-0.5 rounded border border-[#3d3126]">
            {currentPath}
          </div>
        </div>

        {/* Shuffled Exhibit Links & Vault Link */}
        <nav className="flex items-center gap-1 sm:gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          {EXHIBITS.map((exhibit) => {
            const isActive = currentPath === exhibit.path;
            return (
              <button
                key={exhibit.id}
                id={`nav-${exhibit.id}-btn`}
                type="button"
                onClick={() => onNavigate(exhibit.path)}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded text-xs transition-all whitespace-nowrap border ${
                  isActive
                    ? 'bg-[#2b221a] text-[#f5ebd7] border-[#9a7854] shadow-sm'
                    : 'bg-[#181410] text-[#a89887] border-[#31271f] hover:text-[#e4d8c7] hover:border-[#524235] hover:bg-[#201a14]'
                }`}
                title={`${exhibit.title} (${exhibit.path})`}
              >
                <span className={isActive ? 'text-[#c8924b]' : 'text-[#877463]'}>
                  {getIcon(exhibit.id)}
                </span>
                <span className="font-cinzel tracking-wide">{exhibit.title}</span>
              </button>
            );
          })}

          {/* Materials Section Button */}
          <button
            id="nav-materials-btn"
            type="button"
            onClick={() => onNavigate('/materials')}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded text-xs transition-all whitespace-nowrap border ml-0.5 ${
              currentPath === '/materials'
                ? 'bg-[#2b221a] text-[#f5ebd7] border-[#9a7854] shadow-sm'
                : 'bg-[#181410] text-[#a89887] border-[#31271f] hover:text-[#e4d8c7] hover:border-[#524235] hover:bg-[#201a14]'
            }`}
            title="Field Materials: Morse Code, Phonetic Alphabet, and Pigpen Cipher"
          >
            <BookOpen
              className={`w-3.5 h-3.5 ${
                currentPath === '/materials' ? 'text-[#c8924b]' : 'text-[#877463]'
              }`}
            />
            <span className="font-cinzel tracking-wide">Materials</span>
          </button>

          {/* Locked Vault Link */}
          <button
            id="nav-vault-btn"
            type="button"
            onClick={() => onNavigate('/vault')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs transition-all whitespace-nowrap border ml-1 ${
              currentPath === '/vault'
                ? 'bg-[#422915] text-[#ffdfab] border-[#c8924b] shadow-[0_0_12px_rgba(200,146,75,0.25)]'
                : 'bg-[#1a1410] text-[#827161] border-[#382b21] hover:text-[#b89f88] hover:border-[#4d3c2e]'
            }`}
            title="Locked — requires the Archive's true code"
          >
            {currentPath === '/vault' ? (
              <KeyRound className="w-3.5 h-3.5 text-[#e0a455]" />
            ) : (
              <Lock className="w-3.5 h-3.5 text-[#827161]" />
            )}
            <span className="font-cinzel tracking-wider">
              {currentPath === '/vault' ? 'The Vault' : 'Vault [Locked]'}
            </span>
          </button>
        </nav>
      </div>

      {/* URL path breadcrumb strip giving visual affirmation of the active browser path */}
      <div className="max-w-7xl mx-auto mt-2 pt-2 border-t border-[#261f18] hidden sm:flex items-center justify-between text-[11px] text-[#736353] font-typewriter">
        <div className="flex items-center gap-2">
          <span className="text-[#594c3f]">LOCATION URL:</span>
          <code className="text-[#c8924b] bg-[#1a1511] px-2 py-0.5 rounded border border-[#33281e]">
            {currentPath}
          </code>
        </div>
        <div className="text-[#736353]">
          EXHIBIT CLASSIFICATION PROTOCOL 1932-B
        </div>
      </div>
    </header>
  );
};
