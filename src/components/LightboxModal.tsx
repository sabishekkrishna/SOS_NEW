import React, { useState, useEffect, useRef } from 'react';
import { X, ZoomIn, ZoomOut, RotateCcw, Move } from 'lucide-react';

interface LightboxModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  caption?: string;
  children: React.ReactNode;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  isOpen,
  onClose,
  title,
  caption,
  children,
}) => {
  const [zoom, setZoom] = useState<number>(1);
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [highContrast, setHighContrast] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === '+' || e.key === '=') setZoom((z) => Math.min(z + 0.25, 3.5));
      if (e.key === '-') setZoom((z) => Math.max(z - 0.25, 0.75));
      if (e.key === '0') {
        setZoom(1);
        setPan({ x: 0, y: 0 });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      setZoom(1);
      setPan({ x: 0, y: 0 });
      setHighContrast(false);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoom <= 1) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPan({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div
      id="archive-lightbox-overlay"
      className="fixed inset-0 z-50 flex flex-col items-center justify-between bg-black/90 backdrop-blur-md p-4 sm:p-6"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Top Header & Controls */}
      <div className="w-full max-w-5xl flex items-center justify-between border-b border-[#44382d] pb-3 text-[#d3c7b8]">
        <div>
          <div className="text-xs uppercase tracking-widest text-[#a89078] font-cinzel">
            Archival Inspection Specimen
          </div>
          <h2 className="text-lg sm:text-xl font-cinzel font-semibold text-[#f0e6d6]">
            {title}
          </h2>
        </div>

        <div className="flex items-center gap-2">
          {/* Zoom controls */}
          <div className="flex items-center gap-1 bg-[#1e1915] border border-[#44382d] rounded px-2 py-1">
            <button
              id="lightbox-zoom-out-btn"
              type="button"
              onClick={() => setZoom((z) => Math.max(z - 0.25, 0.75))}
              className="p-1 hover:text-white transition-colors"
              title="Zoom Out (-)"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <span className="text-xs font-mono px-1 w-12 text-center text-[#c2b4a3]">
              {Math.round(zoom * 100)}%
            </span>
            <button
              id="lightbox-zoom-in-btn"
              type="button"
              onClick={() => setZoom((z) => Math.min(z + 0.25, 3.5))}
              className="p-1 hover:text-white transition-colors"
              title="Zoom In (+)"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              id="lightbox-reset-btn"
              type="button"
              onClick={() => {
                setZoom(1);
                setPan({ x: 0, y: 0 });
              }}
              className="p-1 hover:text-white transition-colors ml-1 border-l border-[#44382d]"
              title="Reset Zoom (0)"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          <button
            id="lightbox-contrast-toggle"
            type="button"
            onClick={() => setHighContrast(!highContrast)}
            className={`hidden sm:inline-flex text-xs px-2.5 py-1.5 rounded border transition-colors ${
              highContrast
                ? 'bg-[#c8924b] text-[#12100e] border-[#e0b06b] font-medium'
                : 'bg-[#1e1915] text-[#b8a694] border-[#44382d] hover:text-white'
            }`}
          >
            {highContrast ? 'Normal Tone' : 'High Contrast'}
          </button>

          <button
            id="lightbox-close-btn"
            type="button"
            onClick={onClose}
            className="p-2 bg-[#251e18] hover:bg-[#382e25] text-[#d3c7b8] hover:text-white rounded border border-[#44382d] transition-colors"
            title="Close (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Inspection Viewport */}
      <div
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        className={`relative w-full max-w-5xl flex-1 my-3 overflow-hidden flex items-center justify-center rounded-lg border border-[#3b3026] bg-[#0d0b09] select-none ${
          zoom > 1 ? (isDragging ? 'cursor-grabbing' : 'cursor-grab') : 'cursor-default'
        }`}
      >
        <div
          style={{
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
            transformOrigin: 'center center',
            transition: isDragging ? 'none' : 'transform 0.15s ease-out',
            filter: highContrast ? 'contrast(1.4) brightness(1.1) saturate(0.8)' : 'none',
          }}
          className="max-h-full max-w-full flex items-center justify-center p-2"
        >
          {children}
        </div>

        {zoom > 1 && (
          <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur border border-[#44382d] text-[#b5a390] text-xs px-2.5 py-1 rounded flex items-center gap-1.5 pointer-events-none">
            <Move className="w-3.5 h-3.5 text-[#c8924b]" />
            <span>Click & drag to inspect details</span>
          </div>
        )}
      </div>

      {/* Footer Caption */}
      <div className="w-full max-w-5xl text-center text-xs text-[#8f7e6f] font-serif-body">
        {caption || 'Click and drag to pan when zoomed. Press Esc or close button to return to archive.'}
      </div>
    </div>
  );
};
