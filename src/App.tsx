import React, { useState, useEffect } from 'react';
import { RoutePath } from './types';
import { Navigation } from './components/Navigation';
import { LandingPage } from './components/LandingPage';
import { StudyReel09 } from './components/StudyReel09';
import { RadioReel07 } from './components/RadioReel07';
import { MapRoomReel03 } from './components/MapRoomReel03';
import { LetterReel01 } from './components/LetterReel01';
import { VaultPage } from './components/VaultPage';
import { MaterialsPage } from './components/MaterialsPage';

const VALID_ROUTES: RoutePath[] = [
  '/',
  '/archive/reel-09',
  '/archive/reel-07',
  '/archive/reel-03',
  '/archive/reel-01',
  '/materials',
  '/vault',
];

const ROUTE_TITLES: Record<RoutePath, string> = {
  '/': 'The Thorne Archive — Restricted Access',
  '/archive/reel-09': 'Reel IX — The Study',
  '/archive/reel-07': 'Reel VII — The Radio',
  '/archive/reel-03': 'Reel III — The Map Room',
  '/archive/reel-01': 'Reel I — The Letter',
  '/materials': 'Field Materials & Cipher Reference',
  '/vault': 'The Vault',
};

export default function App() {
  const [currentPath, setCurrentPath] = useState<RoutePath>(() => {
    if (typeof window !== 'undefined') {
      const pathname = window.location.pathname as RoutePath;
      if (VALID_ROUTES.includes(pathname)) {
        return pathname;
      }
    }
    return '/';
  });

  // Sync document title and history
  useEffect(() => {
    const title = ROUTE_TITLES[currentPath] || 'The Thorne Archive';
    document.title = title;

    // Push state if pathname differs
    if (window.location.pathname !== currentPath) {
      window.history.pushState({}, '', currentPath);
    }
  }, [currentPath]);

  // Handle browser back / forward buttons
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname as RoutePath;
      if (VALID_ROUTES.includes(path)) {
        setCurrentPath(path);
      } else {
        setCurrentPath('/');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (path: RoutePath) => {
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#12100e] text-[#dfd7cc] flex flex-col selection:bg-[#c8924b]/30 selection:text-[#f3ede4] relative">
      {/* Subtle atmospheric film grain overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.035] bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px] z-50" />

      {/* Main Archive Navigation Header */}
      <Navigation currentPath={currentPath} onNavigate={navigateTo} />

      {/* Main View Area */}
      <main className="flex-1">
        {currentPath === '/' && <LandingPage onNavigate={navigateTo} />}
        {currentPath === '/archive/reel-09' && <StudyReel09 onNavigate={navigateTo} />}
        {currentPath === '/archive/reel-07' && <RadioReel07 onNavigate={navigateTo} />}
        {currentPath === '/archive/reel-03' && <MapRoomReel03 onNavigate={navigateTo} />}
        {currentPath === '/archive/reel-01' && <LetterReel01 onNavigate={navigateTo} />}
        {currentPath === '/materials' && <MaterialsPage onNavigate={navigateTo} />}
        {currentPath === '/vault' && <VaultPage onNavigate={navigateTo} />}
      </main>

      {/* Archival Footer */}
      <footer className="border-t border-[#292017] bg-[#0e0c0a] py-6 px-4 text-center text-xs font-typewriter text-[#69584a]">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div>
            THE THORNE ARCHIVE • RECOVERED CARTOGRAPHIC SPECIMENS • 1932
          </div>
          <div className="flex items-center gap-4 text-[#8a7564]">
            <button
              type="button"
              onClick={() => navigateTo('/')}
              className="hover:text-[#c8924b] transition-colors"
            >
              Index
            </button>
            <span>•</span>
            <button
              type="button"
              onClick={() => navigateTo('/materials')}
              className="hover:text-[#c8924b] transition-colors text-[#c8924b]"
            >
              Field Materials &amp; Ciphers
            </button>
            <span>•</span>
            <button
              type="button"
              onClick={() => navigateTo('/vault')}
              className="hover:text-[#c8924b] transition-colors"
            >
              Vault Chamber
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
