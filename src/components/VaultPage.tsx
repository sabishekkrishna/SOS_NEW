import React, { useState } from 'react';
import { RoutePath } from '../types';
import { Lock, Unlock, ArrowLeft, KeyRound, CheckCircle2, AlertCircle } from 'lucide-react';

interface VaultPageProps {
  onNavigate: (path: RoutePath) => void;
}

export const VaultPage: React.FC<VaultPageProps> = ({ onNavigate }) => {
  const [passcode, setPasscode] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFeedbackMessage(null);

    // Simulate brief mechanical tumbler turn
    setTimeout(() => {
      setIsSubmitting(false);
      const normalized = passcode.trim().toUpperCase();

      // STRICT REQUIREMENT: The vault opens ONLY at the code HELP
      if (normalized === 'HELP') {
        setIsUnlocked(true);
        setFeedbackMessage(null);
      } else {
        // Neutral message with no further hint
        setFeedbackMessage('Not yet.');
      }
    }, 400);
  };

  return (
    <div id="vault-page-container" className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
      {/* Back button */}
      <div className="mb-6">
        <button
          type="button"
          onClick={() => onNavigate('/')}
          className="text-xs font-typewriter text-[#8f7c6b] hover:text-[#c8924b] transition-colors flex items-center gap-1.5"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Return to Catalog
        </button>
      </div>

      {/* Heavy Vault Housing */}
      <div className="relative border border-[#4a3a2d] bg-[#14100d] rounded-2xl p-6 sm:p-12 shadow-2xl overflow-hidden">
        {/* Subtle vault door border texture */}
        <div className="absolute inset-0 pointer-events-none border-4 border-[#281f18] rounded-2xl m-2" />

        {/* Vault Door Top Plaque */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#201812] border border-[#443324] text-[11px] font-typewriter text-[#c8924b] mb-3">
            {isUnlocked ? (
              <>
                <Unlock className="w-3 h-3 text-emerald-400" />
                <span>CHAMBER SEAL BROKEN</span>
              </>
            ) : (
              <>
                <Lock className="w-3 h-3 text-[#c8924b]" />
                <span>CHAMBER RESTRICTED • LEVEL IV</span>
              </>
            )}
          </div>

          <h1 className="text-3xl sm:text-5xl font-cinzel font-black tracking-wider text-[#f3ede4] mb-3">
            {isUnlocked ? 'The Inner Vault — Unlocked' : 'The Vault'}
          </h1>

          {/* EXACT PROMPT WORDING: "Speak the Archive's true name." */}
          <p className="text-base sm:text-lg font-serif-body italic text-[#b8a694]">
            &ldquo;Speak the Archive&apos;s true name.&rdquo;
          </p>
        </div>

        {/* Vault Dial / Mechanism Art */}
        <div className="flex justify-center mb-8">
          <div className="relative w-36 h-36 rounded-full bg-[#1e1712] border-4 border-[#574332] flex items-center justify-center shadow-inner">
            <div className="w-28 h-28 rounded-full border-2 border-dashed border-[#856543] flex items-center justify-center">
              <div
                className={`w-20 h-20 rounded-full border border-[#96744f] flex items-center justify-center transition-all duration-700 ${
                  isUnlocked
                    ? 'bg-emerald-950/40 border-emerald-500/60 shadow-[0_0_20px_rgba(16,185,129,0.3)]'
                    : 'bg-[#291e16]'
                }`}
              >
                {isUnlocked ? (
                  <Unlock className="w-8 h-8 text-emerald-400 animate-pulse" />
                ) : (
                  <KeyRound className="w-8 h-8 text-[#c8924b]" />
                )}
              </div>
            </div>

            {/* Dial Tick Marks */}
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-2 bg-[#6b5239]"
                style={{
                  top: '6px',
                  left: '50%',
                  transformOrigin: '0 66px',
                  transform: `translateX(-50%) rotate(${i * 30}deg)`,
                }}
              />
            ))}
          </div>
        </div>

        {/* Form or Unlocked Success State */}
        {!isUnlocked ? (
          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="mb-5">
              <label
                htmlFor="vault-passcode-input"
                className="block text-xs font-cinzel tracking-widest text-[#a89582] uppercase mb-2 text-center"
              >
                Archive Passcode
              </label>

              <div className="relative">
                <input
                  id="vault-passcode-input"
                  type="text"
                  autoComplete="off"
                  spellCheck="false"
                  value={passcode}
                  onChange={(e) => {
                    setPasscode(e.target.value);
                    if (feedbackMessage) setFeedbackMessage(null);
                  }}
                  placeholder="Enter archive code..."
                  maxLength={24}
                  className="w-full px-4 py-3.5 bg-[#0e0c0a] border-2 border-[#473628] focus:border-[#c8924b] text-[#f5ebd7] text-center font-typewriter text-xl sm:text-2xl tracking-[0.3em] uppercase rounded-lg outline-none transition-colors shadow-inner"
                  autoFocus
                />
              </div>
            </div>

            {/* Neutral "Not yet." message if incorrect */}
            {feedbackMessage && (
              <div
                id="vault-feedback-msg"
                className="mb-5 p-3 rounded bg-[#20130f] border border-[#6b2c20] text-center text-sm font-serif-body italic text-[#e6a090] flex items-center justify-center gap-2"
              >
                <AlertCircle className="w-4 h-4 text-[#d95a43]" />
                <span>{feedbackMessage}</span>
              </div>
            )}

            <button
              id="vault-submit-btn"
              type="submit"
              disabled={isSubmitting || !passcode.trim()}
              className="w-full py-3.5 px-6 rounded-lg bg-[#c8924b] hover:bg-[#d69f58] disabled:bg-[#332820] disabled:text-[#6e5d50] text-[#120f0c] font-cinzel font-bold text-sm tracking-widest uppercase transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <span>Aligning Tumblers...</span>
              ) : (
                <>
                  <KeyRound className="w-4 h-4" />
                  <span>Submit Code</span>
                </>
              )}
            </button>
          </form>
        ) : (
          /* SUCCESS STATE - UNLOCKED ARCHIVE */
          <div id="vault-success-panel" className="max-w-lg mx-auto text-center animate-fadeIn">
            <div className="inline-flex p-3 rounded-full bg-emerald-950/60 border border-emerald-500/50 text-emerald-400 mb-4">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="font-cinzel text-xs uppercase tracking-widest text-emerald-400 mb-1">
              DISPATCH CLEARED • SEQUENCE CONFIRMED
            </div>

            <h2 className="text-2xl sm:text-3xl font-cinzel font-bold text-[#f3ede4] mb-3">
              The Vault Chamber Is Open
            </h2>

            <p className="text-sm font-serif-body text-[#c8b7a6] mb-6">
              The locking tumblers have disengaged. The archival chamber stands open.
            </p>

            <button
              type="button"
              onClick={() => {
                setIsUnlocked(false);
                setPasscode('');
              }}
              className="text-xs font-typewriter text-[#8e7b6b] hover:text-[#d1bba4] transition-colors underline"
            >
              Reset and Seal the Vault Door
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
