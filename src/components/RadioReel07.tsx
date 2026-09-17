import React, { useState, useRef, useEffect } from 'react';
import { RoutePath } from '../types';
import {
  Radio,
  Quote,
  Maximize2,
  Minimize2,
  Volume2,
  VolumeX,
  FileText,
  ArrowRight,
} from 'lucide-react';

interface RadioReel07Props {
  onNavigate: (path: RoutePath) => void;
}

export const RadioReel07: React.FC<RadioReel07Props> = ({ onNavigate }) => {
  // Lamp state: default ON (warm golden light illuminating the detective desk)
  const [isLampOn, setIsLampOn] = useState<boolean>(true);

  // Press-and-hold state for the subtle unmarked lamp switch (requires 1 second hold to toggle)
  const [isPressingSwitch, setIsPressingSwitch] = useState<boolean>(false);
  const switchHoldTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Delayed reveal of letter E: only after 3 full seconds of darkness
  const [showLuminousLetter, setShowLuminousLetter] = useState<boolean>(false);
  const darknessTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Focus view for the paper manuscript
  const [isPaperZoomed, setIsPaperZoomed] = useState<boolean>(false);

  // Audio ambience state (rain & tape hum)
  const [isRainPlaying, setIsRainPlaying] = useState<boolean>(false);
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Movable / Draggable Artifacts on the Desk
  // 1. Magnifying Glass
  const [magOffset, setMagOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  // 2. Vintage Rangefinder Camera
  const [cameraOffset, setCameraOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // Active dragging state
  const [draggingItem, setDraggingItem] = useState<'magnifier' | 'camera' | null>(null);
  const dragStartRef = useRef<{
    startX: number;
    startY: number;
    initialX: number;
    initialY: number;
  }>({
    startX: 0,
    startY: 0,
    initialX: 0,
    initialY: 0,
  });

  // Tactile vintage mechanical switch click sound using Web Audio API
  const playSwitchSound = (turnOff: boolean) => {
    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      // Tactile brass mechanical click
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(turnOff ? 380 : 540, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.05);

      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.06);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.06);
    } catch {
      // Audio fallback
    }
  };

  const toggleLamp = () => {
    setIsLampOn((prev) => {
      const next = !prev;
      playSwitchSound(!next);
      return next;
    });
  };

  // Lamp switch press-and-hold handler: MUST be pressed for 1 second (1000ms) to turn off/toggle
  const handleSwitchPointerDown = (e: React.PointerEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsPressingSwitch(true);

    if (switchHoldTimerRef.current) {
      clearTimeout(switchHoldTimerRef.current);
    }

    switchHoldTimerRef.current = setTimeout(() => {
      toggleLamp();
      setIsPressingSwitch(false);
      switchHoldTimerRef.current = null;
    }, 1000); // exactly 1 second press
  };

  const handleSwitchPointerUpOrCancel = (e: React.PointerEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (switchHoldTimerRef.current) {
      clearTimeout(switchHoldTimerRef.current);
      switchHoldTimerRef.current = null;
    }
    setIsPressingSwitch(false);
  };

  // Darkness timer: only after 3 seconds of continuous darkness does the green lume letter E appear
  useEffect(() => {
    if (darknessTimerRef.current) {
      clearTimeout(darknessTimerRef.current);
      darknessTimerRef.current = null;
    }

    if (!isLampOn) {
      // Darkness started: hide letter initially, then reveal after 3000ms
      setShowLuminousLetter(false);
      darknessTimerRef.current = setTimeout(() => {
        setShowLuminousLetter(true);
      }, 3000);
    } else {
      // Light is on: disappear immediately
      setShowLuminousLetter(false);
    }

    return () => {
      if (darknessTimerRef.current) {
        clearTimeout(darknessTimerRef.current);
      }
    };
  }, [isLampOn]);

  // Dragging handlers for movable camera and magnifying glass with frame clamping
  const handleDragStart = (
    item: 'magnifier' | 'camera',
    e: React.PointerEvent<HTMLDivElement>
  ) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    } catch {
      // Ignore if pointer capture is not supported
    }

    setDraggingItem(item);
    const currentOffset = item === 'magnifier' ? magOffset : cameraOffset;
    dragStartRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      initialX: currentOffset.x,
      initialY: currentOffset.y,
    };
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!draggingItem) return;
    const dx = e.clientX - dragStartRef.current.startX;
    const dy = e.clientY - dragStartRef.current.startY;
    let newX = dragStartRef.current.initialX + dx;
    let newY = dragStartRef.current.initialY + dy;

    // Strict boundaries so artifacts can NEVER leave the desk frame
    if (draggingItem === 'magnifier') {
      newX = Math.max(-180, Math.min(220, newX));
      newY = Math.max(-200, Math.min(180, newY));
      setMagOffset({ x: newX, y: newY });
    } else if (draggingItem === 'camera') {
      newX = Math.max(-280, Math.min(60, newX));
      newY = Math.max(-15, Math.min(320, newY));
      setCameraOffset({ x: newX, y: newY });
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (draggingItem) {
      try {
        (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
      } catch {
        // Ignore
      }
      setDraggingItem(null);
    }
  };

  // Subtle ambient rain sound generator (synthesized via Web Audio API)
  const toggleRainAudio = () => {
    if (isRainPlaying) {
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
        audioCtxRef.current = null;
      }
      setIsRainPlaying(false);
      return;
    }

    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      audioCtxRef.current = ctx;

      // Pink/Brown noise for steady rain outside
      const bufferSize = ctx.sampleRate * 2;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      let b0 = 0,
        b1 = 0,
        b2 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99 * b0 + white * 0.05;
        b1 = 0.96 * b1 + white * 0.11;
        b2 = 0.86 * b2 + white * 0.25;
        output[i] = (b0 + b1 + b2) * 0.4;
      }

      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;
      whiteNoise.loop = true;

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.value = 950;

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.045, ctx.currentTime);

      whiteNoise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      whiteNoise.start();
      setIsRainPlaying(true);
    } catch {
      setIsRainPlaying(false);
    }
  };

  useEffect(() => {
    return () => {
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
      }
      if (switchHoldTimerRef.current) {
        clearTimeout(switchHoldTimerRef.current);
      }
      if (darknessTimerRef.current) {
        clearTimeout(darknessTimerRef.current);
      }
    };
  }, []);

  // Exact paper manuscript text from the prompt
  const paperText =
    '-Late into the quiet evening, as rain poured -in steady streams outside, the weary traveller walked through the big- front entrance. He paused in the grand -hallway until -the glowing candles began to dim, casting long -shadows across the dark wooden floor. Looking -over the peaceful room, a -faint feeling of comfort settled over him, -finally leaving the house wrapped in total silence.';

  return (
    <div id="radio-reel-study-root" className="max-w-6xl mx-auto px-3 sm:px-6 py-6 select-none">
      {/* Archive Header with dossier breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#3b2e23] pb-4 mb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-typewriter text-[#c8924b] tracking-wider uppercase mb-1">
            <span>ARCHIVE DOSSIER • REEL VII</span>
            <span className="text-[#5e4b3c]">/</span>
            <code className="text-[#bfa58d] bg-[#1c1612] px-1.5 py-0.5 rounded border border-[#382b20]">
              CASE 04 // NIGHT STUDY
            </code>
          </div>
          <h1 className="text-2xl sm:text-3xl font-cinzel font-bold text-[#f3ede4] flex items-center gap-2.5">
            <Radio className="w-7 h-7 text-[#c8924b]" />
            Reel VII — The Radio
          </h1>
        </div>

        {/* Ambient controls */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleRainAudio}
            className={`px-3 py-1.5 rounded-lg border text-xs font-typewriter flex items-center gap-2 transition-all ${
              isRainPlaying
                ? 'bg-[#291f16] border-[#c8924b] text-[#f5ede2] shadow-sm'
                : 'bg-[#120e0a] border-[#36271c] text-[#8e7b68] hover:text-[#c4b3a1]'
            }`}
            title="Toggle steady rain audio ambience"
          >
            {isRainPlaying ? <Volume2 className="w-3.5 h-3.5 text-[#c8924b]" /> : <VolumeX className="w-3.5 h-3.5" />}
            <span>{isRainPlaying ? 'Rain: Active' : 'Rain Ambience'}</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* THORNE'S SAYING: "Observe carefully"                                     */}
      {/* ========================================================================= */}
      <div
        id="thorne-saying-banner"
        className="mb-6 bg-gradient-to-r from-[#17120c] via-[#211911] to-[#17120c] border border-[#4d3a27] rounded-xl px-5 sm:px-8 py-4 sm:py-5 shadow-xl relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#c8924b]/5 rounded-full blur-2xl pointer-events-none" />
        <div className="flex items-center gap-4">
          <div className="p-2.5 rounded-full bg-[#2a1d13] border border-[#694e33] text-[#e6a853] shrink-0">
            <Quote className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[11px] font-typewriter text-[#a18a73] tracking-widest uppercase">
              RECOVERED STATEMENT
            </div>
            <div className="text-xl sm:text-2xl font-cinzel font-semibold text-[#f8f1e7] tracking-wide mt-0.5">
              Thorne says: <span className="text-[#f1be6d] italic font-bold">"Observe carefully"</span>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* THE DETECTIVE DESK SCENARIO (PURE CSS / SVG / NATIVE RENDERING)           */}
      {/* With isolated stacking context and containment so nothing escapes frame   */}
      {/* ========================================================================= */}
      <div
        id="detective-desk-container"
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        className={`relative isolate overflow-hidden rounded-2xl border-2 shadow-[0_25px_70px_rgba(0,0,0,0.98)] transition-colors duration-700 select-none z-10 ${
          isLampOn ? 'border-[#4a3724]' : 'border-[#1a1c22]'
        }`}
        style={{
          clipPath: 'inset(0 round 1rem)',
          contain: 'paint',
        }}
      >
        {/* The Desk Surface: Layered Dark Walnut Planks with Wood Grain Highlights */}
        <div
          id="desk-wooden-surface"
          className="relative w-full min-h-[580px] sm:min-h-[660px] lg:min-h-[720px] overflow-hidden select-none"
          style={{
            backgroundColor: '#150e09',
            backgroundImage: `
              radial-gradient(ellipse at 25% 35%, rgba(68, 44, 25, 0.45) 0%, transparent 60%),
              linear-gradient(to right, #0d0906 0%, #1c130b 15%, #251a10 40%, #1d130c 60%, #150e09 85%, #0a0705 100%),
              repeating-linear-gradient(0deg, rgba(0,0,0,0.2) 0px, rgba(0,0,0,0.2) 2px, transparent 2px, transparent 38px),
              repeating-linear-gradient(90deg, rgba(255,255,255,0.015) 0px, transparent 1px, transparent 180px)
            `,
          }}
        >
          {/* Subtle wood plank seam running across the desk */}
          <div className="absolute inset-x-0 top-[48%] h-0.5 bg-[#0a0704] shadow-[0_1px_1px_rgba(255,255,255,0.04)] pointer-events-none opacity-80" />
          <div className="absolute inset-x-0 top-[78%] h-0.5 bg-[#090603] shadow-[0_1px_1px_rgba(255,255,255,0.03)] pointer-events-none opacity-60" />

          {/* ===================================================================== */}
          {/* DYNAMIC LIGHTING / SHADOW OVERLAYS                                   */}
          {/* ===================================================================== */}
          {isLampOn ? (
            /* WARM AMBER CONICAL BEAM CAST FROM THE LAMP AT TOP-LEFT */
            <div
              className="absolute inset-0 pointer-events-none transition-opacity duration-700"
              style={{
                background: `
                  radial-gradient(circle 540px at 18% 22%, rgba(255, 230, 150, 0.45) 0%, rgba(225, 160, 65, 0.26) 38%, rgba(24, 16, 9, 0.65) 72%, rgba(8, 6, 4, 0.94) 100%),
                  radial-gradient(ellipse 700px 420px at 32% 46%, rgba(255, 210, 120, 0.18) 0%, transparent 70%)
                `,
              }}
            />
          ) : (
            /* DEEP NOIR OBSCURITY (NIGHTFALL) */
            <div
              className="absolute inset-0 pointer-events-none transition-opacity duration-700"
              style={{
                background:
                  'radial-gradient(circle 800px at 50% 50%, rgba(6, 8, 12, 0.96) 0%, rgba(2, 3, 5, 0.99) 100%)',
              }}
            />
          )}

          {/* Desk Edge Chamfer / Drop Shadow in the background */}
          <div className="absolute top-0 inset-x-0 h-10 bg-gradient-to-b from-black/90 to-transparent pointer-events-none" />

          {/* ===================================================================== */}
          {/* THE VINTAGE BRASS GOOSENECK DESK LAMP (Top Left)                      */}
          {/* Button is unmarked; must be pressed for 1 second to turn off          */}
          {/* ===================================================================== */}
          <div
            id="vintage-desk-lamp"
            className="absolute top-4 sm:top-6 left-3 sm:left-8 z-30 flex flex-col items-center select-none pointer-events-auto"
          >
            {/* Lamp Shade & Bulb Glow */}
            <div className="relative">
              {/* Spun Brass Shade Bell */}
              <div
                className={`w-28 sm:w-34 h-16 sm:h-20 rounded-t-full border transition-all duration-500 shadow-2xl relative ${
                  isLampOn
                    ? 'bg-gradient-to-b from-[#8a6833] via-[#5c441f] to-[#362711] border-[#c49646]'
                    : 'bg-gradient-to-b from-[#261f16] via-[#1a150e] to-[#0d0a07] border-[#382b1d]'
                }`}
              >
                {/* Spun Brass Edge Highlight Rim */}
                <div
                  className={`absolute bottom-0 inset-x-0 h-1 rounded-full transition-colors duration-500 ${
                    isLampOn ? 'bg-[#ffde8a] shadow-[0_0_14px_#ffde8a]' : 'bg-[#423320]'
                  }`}
                />

                {/* Visible Warm Glowing Filament & Bulb inside shade when ON */}
                {isLampOn && (
                  <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 w-12 sm:w-16 h-5 sm:h-6 bg-[#fff4d6] rounded-full blur-[2.5px] shadow-[0_0_35px_#ffe494,0_0_75px_rgba(255,200,80,0.85)] pointer-events-none" />
                )}
              </div>

              {/* Shade Finial / Top Cap */}
              <div
                className={`w-3.5 h-3 rounded-full mx-auto -mt-1 border transition-colors ${
                  isLampOn ? 'bg-[#a37d3e] border-[#e0b25e]' : 'bg-[#2b2216] border-[#3d2f1e]'
                }`}
              />
            </div>

            {/* Brass Gooseneck Curved Tubing */}
            <div
              className={`w-2.5 sm:w-3 h-20 sm:h-24 transition-colors duration-500 rounded-sm shadow-md ${
                isLampOn
                  ? 'bg-gradient-to-r from-[#543f1e] via-[#94743b] to-[#543f1e]'
                  : 'bg-gradient-to-r from-[#17130e] via-[#2d2419] to-[#17130e]'
              }`}
            />

            {/* Stepped Heavy Brass Lamp Base */}
            <div
              className={`relative w-26 sm:w-32 h-10 sm:h-12 rounded-t-2xl border transition-all duration-500 flex items-center justify-center shadow-2xl ${
                isLampOn
                  ? 'bg-gradient-to-b from-[#75592a] via-[#4d3919] to-[#2e210e] border-[#b0873d]'
                  : 'bg-gradient-to-b from-[#211a12] via-[#14100a] to-[#0a0805] border-[#36291b]'
              }`}
            >
              {/* Stepped Cast Rim */}
              <div
                className={`absolute bottom-0 inset-x-0 h-2 rounded-t-sm border-t transition-colors ${
                  isLampOn ? 'bg-[#523d1b] border-[#8a6833]' : 'bg-[#15100a] border-[#291f14]'
                }`}
              />

              {/* =============================================================== */}
              {/* VERY SUBTLE UNMARKED BRASS SWITCH (REQUIRES 1-SEC HOLD TO TURN OFF) */}
              {/* Blends seamlessly with the lamp metalwork without markings       */}
              {/* =============================================================== */}
              <div
                id="lamp-subtle-switch"
                role="button"
                tabIndex={0}
                onPointerDown={handleSwitchPointerDown}
                onPointerUp={handleSwitchPointerUpOrCancel}
                onPointerLeave={handleSwitchPointerUpOrCancel}
                onPointerCancel={handleSwitchPointerUpOrCancel}
                aria-label="Desk lamp switch"
                className="group relative flex items-center justify-center cursor-pointer p-2 focus:outline-none select-none touch-none"
              >
                {/* Vintage Brass Rotary Key / Flush Switch Pin (Blends into the metal) */}
                <div
                  className={`
                    w-4 h-2.5 sm:w-5 sm:h-3 rounded-sm border transition-all duration-150
                    flex items-center justify-center shadow-inner
                    ${
                      isPressingSwitch
                        ? 'scale-90 translate-y-0.5 bg-[#423216] border-[#6b5225]'
                        : isLampOn
                        ? 'bg-[#6b5025] border-[#917039] group-hover:brightness-125'
                        : 'bg-[#292015] border-[#3d3020] group-hover:brightness-135'
                    }
                  `}
                >
                  {/* Subtle knurled center indentation */}
                  <div
                    className={`w-2 h-1 rounded-full transition-transform duration-200 ${
                      isPressingSwitch
                        ? 'scale-75 bg-[#d4aa5b]'
                        : isLampOn
                        ? 'bg-[#b8914c] -rotate-12 shadow-[0_0_2px_#ffe494]'
                        : 'bg-[#423321] rotate-12'
                    }`}
                  />
                </div>

                {/* Tactile cast shadow beneath the switch */}
                <div className="absolute -bottom-0.5 w-5 h-1 bg-black/50 rounded-full blur-[0.5px] pointer-events-none" />
              </div>
            </div>
          </div>

          {/* ===================================================================== */}
          {/* THE OPEN INVESTIGATION BINDER & PAPER MANUSCRIPT                       */}
          {/* Positioned on the left-center of the desk                              */}
          {/* ===================================================================== */}
          <div
            id="investigation-binder-paper"
            className={`
              absolute top-24 sm:top-20 left-4 sm:left-40 md:left-48 z-10 transition-all duration-500
              max-w-[340px] sm:max-w-[430px] md:max-w-[470px]
              ${
                isLampOn
                  ? 'opacity-100 filter-none'
                  : 'opacity-15 filter brightness-50 contrast-125 pointer-events-none'
              }
            `}
          >
            {/* Outer Leather / Heavy Board Binder Folio */}
            <div className="bg-[#1f160f] border-2 border-[#473421] rounded-lg p-3 sm:p-4 shadow-[0_20px_45px_rgba(0,0,0,0.92)] relative transform -rotate-1">
              {/* Metal Binder Rings along the left spine */}
              <div className="absolute -left-2.5 top-10 bottom-10 flex flex-col justify-between pointer-events-none">
                <div className="w-5 h-7 border-2 border-[#b89c7c] rounded-full bg-[#241a12] shadow" />
                <div className="w-5 h-7 border-2 border-[#b89c7c] rounded-full bg-[#241a12] shadow" />
                <div className="w-5 h-7 border-2 border-[#b89c7c] rounded-full bg-[#241a12] shadow" />
              </div>

              {/* Stacked parchment sheets underneath */}
              <div className="absolute -bottom-1 -right-1 inset-0 bg-[#d9c7aa] rounded -z-10 transform rotate-1 border border-[#967f60]" />

              {/* The Primary Paper Sheet */}
              <div
                className="bg-[#f6efe4] text-[#1c1610] rounded p-5 sm:p-7 shadow-md relative border border-[#dfcca8]"
                style={{
                  backgroundImage: `
                    radial-gradient(#dfcca8 0.75px, transparent 0.75px),
                    linear-gradient(to bottom, rgba(247,240,229,0.98), rgba(237,224,204,0.95))
                  `,
                  backgroundSize: '16px 16px, 100% 100%',
                }}
              >
                {/* Paper Folio Header */}
                <div className="flex items-center justify-between border-b border-[#c9b291] pb-2 mb-3.5">
                  <div className="flex items-center gap-1.5 text-[10px] sm:text-xs font-typewriter text-[#755e45] uppercase tracking-wider font-bold">
                    <FileText className="w-3.5 h-3.5 text-[#8c6b43]" />
                    <span>CASE ARCHIVE // FOLIO 14-B</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsPaperZoomed(true)}
                    className="text-[#755e45] hover:text-[#1c1610] p-1 rounded transition-colors"
                    title="Examine Manuscript Closely"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* EXACT TEXT DISPLAYED ON THE PAPER AS REQUESTED */}
                <div
                  id="manuscript-paper-content"
                  className="font-typewriter text-xs sm:text-sm text-[#241c14] leading-relaxed tracking-normal select-text space-y-2"
                >
                  <p className="indent-4">{paperText}</p>
                </div>

                {/* Vintage paper footer details */}
                <div className="mt-5 pt-2 border-t border-[#d8c29f] flex items-center justify-between text-[9px] font-typewriter text-[#8f775c]">
                  <span>CONFIDENTIAL WITNESS LOG</span>
                  <span>RECORDED: 22:45</span>
                </div>
              </div>
            </div>
          </div>

          {/* ===================================================================== */}
          {/* MOVABLE ARTIFACT 1: VINTAGE BRASS & EBONY MAGNIFYING GLASS           */}
          {/* Invisible in the dark; draggable within bounds                       */}
          {/* ===================================================================== */}
          <div
            id="movable-magnifying-glass"
            onPointerDown={(e) => handleDragStart('magnifier', e)}
            style={{
              transform: `translate(${magOffset.x}px, ${magOffset.y}px) rotate(12deg)`,
            }}
            className={`
              absolute top-72 sm:top-80 left-36 sm:left-72 md:left-96 z-20 touch-none select-none
              ${draggingItem === 'magnifier' ? 'cursor-grabbing z-30 scale-105' : 'cursor-grab'}
              ${isLampOn ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
              transition-opacity duration-500
            `}
          >
            <div className="relative w-28 sm:w-36 h-28 sm:h-36">
              {/* Circular Glass Lens with Heavy Brass Rim */}
              <div
                className={`
                  relative w-16 sm:w-20 h-16 sm:h-20 rounded-full border-4 border-[#b88c42]
                  bg-white/10 backdrop-blur-[0.5px] flex items-center justify-center
                  ${
                    draggingItem === 'magnifier'
                      ? 'shadow-[0_20px_35px_rgba(0,0,0,0.95)]'
                      : 'shadow-[0_10px_25px_rgba(0,0,0,0.85)]'
                  }
                `}
              >
                {/* Specular Reflection Glint across the curved lens */}
                <div className="absolute top-1 left-2 w-10 sm:w-12 h-5 sm:h-6 rounded-t-full border-t-2 border-l border-white/40 transform -rotate-12 pointer-events-none" />
                {/* Subtle Inner Optical Ring */}
                <div className="w-12 sm:w-15 h-12 sm:h-15 rounded-full border border-[#d4ab5b]/30 pointer-events-none" />
              </div>

              {/* Dark Fluted Wood / Ebony Handle */}
              <div className="w-3 sm:w-3.5 h-16 sm:h-20 bg-gradient-to-r from-[#17130e] via-[#382b1d] to-[#120e09] rounded-b-md border-x border-b border-[#4d3a24] shadow-xl absolute top-14 sm:top-18 left-7 sm:left-9 transform rotate-45 origin-top pointer-events-none" />
            </div>
          </div>

          {/* ===================================================================== */}
          {/* THE EMPTY TABLE SURFACE (WHERE NOTHING WAS PLACED)                     */}
          {/* When lamp is turned OFF: Letter E appears glowing green like a lume!  */}
          {/* ONLY APPEARS AFTER EXACTLY 3 SECONDS OF DARKNESS                      */}
          {/* Stays strictly within desk frame and does not pop out on scroll       */}
          {/* ===================================================================== */}
          <div
            id="empty-table-area"
            className="absolute top-16 sm:top-24 right-4 sm:right-16 md:right-28 w-48 sm:w-56 h-48 sm:h-56 flex items-center justify-center pointer-events-none z-20"
          >
            {/* Luminous Letter E (only rendered in the dark after 3 seconds of darkness) */}
            {!isLampOn && showLuminousLetter && (
              <div
                id="luminous-letter-e"
                className="relative flex flex-col items-center justify-center animate-in fade-in duration-1000"
              >
                {/* Radial phosphor halo around the lume mark */}
                <div
                  className="w-32 h-32 rounded-full absolute pointer-events-none animate-pulse"
                  style={{
                    background:
                      'radial-gradient(circle, rgba(57, 255, 20, 0.32) 0%, rgba(57, 255, 20, 0.12) 48%, transparent 76%)',
                  }}
                />

                {/* The Letter E glowing green like radium watch lume */}
                <div
                  className="text-6xl sm:text-8xl font-cinzel font-black tracking-widest select-none transform hover:scale-105 transition-transform"
                  style={{
                    color: '#4ef871',
                    textShadow:
                      '0 0 10px #39ff14, 0 0 20px #39ff14, 0 0 35px rgba(57, 255, 20, 0.95), 0 0 55px rgba(57, 255, 20, 0.65)',
                    filter: 'drop-shadow(0 0 14px #26e600)',
                  }}
                >
                  E
                </div>
              </div>
            )}
          </div>

          {/* ===================================================================== */}
          {/* SCATTERED NOIR CRIME PHOTOGRAPHS (Foreground Center)                  */}
          {/* ===================================================================== */}
          <div
            id="evidence-photographs-scatter"
            className={`
              absolute bottom-4 sm:bottom-8 left-10 sm:left-44 md:left-56 z-10 flex items-center gap-3 pointer-events-none
              transition-opacity duration-500
              ${isLampOn ? 'opacity-95' : 'opacity-15 brightness-50'}
            `}
          >
            {/* Photo 1: Dim hallway */}
            <div className="w-28 sm:w-36 h-20 sm:h-24 bg-[#ebe2d3] p-1.5 rounded shadow-2xl border border-[#d6c7b0] transform -rotate-6">
              <div className="w-full h-full bg-[#241c14] rounded-sm overflow-hidden flex flex-col justify-end p-1 border border-[#3b2d1d]">
                <div className="text-[7.5px] font-typewriter text-[#d9c7aa] bg-[#0d0a07]/85 px-1 py-0.5 rounded">
                  HALLWAY // 22:40
                </div>
              </div>
            </div>

            {/* Photo 2: Grand front entrance in rain */}
            <div className="w-32 sm:w-44 h-24 sm:h-28 bg-[#ebe2d3] p-1.5 rounded shadow-2xl border border-[#d6c7b0] transform rotate-3">
              <div className="w-full h-full bg-[#1c1611] rounded-sm overflow-hidden flex flex-col justify-end p-1 border border-[#3b2d1d]">
                <div className="text-[7.5px] font-typewriter text-[#d9c7aa] bg-[#0d0a07]/85 px-1 py-0.5 rounded">
                  FRONT ENTRANCE // RAIN
                </div>
              </div>
            </div>
          </div>

          {/* ===================================================================== */}
          {/* MOVABLE ARTIFACT 2: VINTAGE MECHANICAL RANGEFINDER CAMERA             */}
          {/* Can be dragged anywhere across the desk surface within frame          */}
          {/* ===================================================================== */}
          <div
            id="movable-camera-artifact"
            onPointerDown={(e) => handleDragStart('camera', e)}
            style={{
              transform: `translate(${cameraOffset.x}px, ${cameraOffset.y}px)`,
            }}
            className={`
              absolute top-8 right-5 sm:right-10 z-20 touch-none select-none
              ${draggingItem === 'camera' ? 'cursor-grabbing z-30 scale-105' : 'cursor-grab'}
              ${isLampOn ? 'opacity-95' : 'opacity-25 brightness-60'}
              transition-opacity duration-500
            `}
          >
            {/* Rangefinder Camera Body */}
            <div
              className={`
                w-36 sm:w-44 h-22 sm:h-26 bg-[#171513] rounded-lg border-2 border-[#3d3831] p-2 relative flex items-center justify-center
                ${
                  draggingItem === 'camera'
                    ? 'shadow-[0_25px_45px_rgba(0,0,0,0.98)]'
                    : 'shadow-[0_15px_30px_rgba(0,0,0,0.9)]'
                }
              `}
            >
              {/* Chrome Top Deck Plate */}
              <div className="absolute top-0 inset-x-0 h-5 bg-gradient-to-r from-[#595247] via-[#8c8274] to-[#595247] rounded-t-md border-b border-[#2e2a24] flex justify-between items-center px-3 pointer-events-none">
                {/* Shutter Speed Dial */}
                <div className="w-3.5 h-3.5 rounded-full bg-[#423d35] border border-[#2e2a24] shadow-inner" />
                {/* Viewfinder Window */}
                <div className="w-4 h-2 rounded-sm bg-[#1a232e] border border-[#3b4959]" />
                {/* Winding Lever */}
                <div className="w-5 h-2 rounded bg-[#3b362e]" />
              </div>

              {/* Textured Leatherette Body Wrap */}
              <div className="absolute inset-x-1 top-5 bottom-1 rounded-sm bg-[#12100e] border border-[#24201b] pointer-events-none" />

              {/* Cylindrical Lens Barrel */}
              <div className="relative z-10 w-16 h-16 rounded-full bg-gradient-to-br from-[#40382f] via-[#241e18] to-[#120f0c] border-4 border-[#6e6150] shadow-2xl flex items-center justify-center pointer-events-none">
                {/* Glass Element */}
                <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#0a121c] via-[#1c2736] to-[#0a121c] border border-[#485b73] shadow-inner flex items-center justify-center">
                  {/* Lens Coating Glint */}
                  <div className="w-2.5 h-2.5 rounded-full bg-[#8fb3e8]/30 blur-[0.5px]" />
                </div>
              </div>
            </div>
          </div>

          {/* Interactive State Indicator */}
          <div className="absolute bottom-3 right-3 z-20 font-typewriter text-[10px] text-[#8f7a65] bg-[#0d0a08]/85 px-2.5 py-1 rounded border border-[#2b2016] pointer-events-none">
            {isLampOn ? 'Desk: Illuminated' : 'Desk: Extinguished'}
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MAGNIFIED / ZOOMED MANUSCRIPT MODAL                                       */}
      {/* ========================================================================= */}
      {isPaperZoomed && (
        <div
          id="paper-zoom-modal"
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setIsPaperZoomed(false)}
        >
          <div
            className="bg-[#f5ede0] text-[#1c1611] max-w-xl w-full rounded-xl p-6 sm:p-10 shadow-2xl border-4 border-[#3b2b1b] relative animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundImage:
                'radial-gradient(#dfcca8 0.75px, transparent 0.75px), linear-gradient(to bottom, #f7efe4, #ebdcc3)',
              backgroundSize: '16px 16px, 100% 100%',
            }}
          >
            <div className="flex items-center justify-between border-b-2 border-[#bda27f] pb-3 mb-5">
              <div className="font-typewriter text-xs sm:text-sm text-[#735d45] font-bold uppercase tracking-wider">
                ARCHIVE RECORD // TRANSCRIPTION VIEW
              </div>
              <button
                type="button"
                onClick={() => setIsPaperZoomed(false)}
                className="p-1 rounded bg-[#dfcca8] hover:bg-[#cfb992] text-[#291f15] transition-colors"
              >
                <Minimize2 className="w-4 h-4" />
              </button>
            </div>

            <div className="font-typewriter text-sm sm:text-base text-[#241c14] leading-relaxed tracking-normal p-2">
              <p className="indent-6">{paperText}</p>
            </div>

            <div className="mt-8 pt-4 border-t border-[#cbb391] flex items-center justify-between font-typewriter text-xs text-[#8c7457]">
              <span>THORNE RECOVERED EVIDENCE</span>
              <button
                type="button"
                onClick={() => setIsPaperZoomed(false)}
                className="text-[#2b1f14] font-bold hover:underline"
              >
                Close Document
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* ARCHIVAL EXHIBIT NAVIGATION FOOTER (CLEAN, NO INVESTIGATOR LOG)           */}
      {/* ========================================================================= */}
      <div className="mt-8 flex items-center justify-between pt-4 border-t border-[#292017]">
        <button
          type="button"
          onClick={() => onNavigate('/archive/reel-01')}
          className="px-4 py-2.5 rounded bg-[#17120d] hover:bg-[#241c14] border border-[#3d2e20] text-xs font-cinzel font-bold text-[#b8a490] transition-all flex items-center gap-1.5"
        >
          <span>← REEL I — THE LETTER</span>
        </button>

        <button
          type="button"
          onClick={() => onNavigate('/archive/reel-03')}
          className="px-6 py-2.5 rounded bg-[#241a12] hover:bg-[#332519] border border-[#6b4e33] hover:border-[#b8863f] text-xs font-cinzel font-bold text-[#f5ede2] flex items-center gap-2 transition-all shadow-md"
        >
          <span>REEL III — THE MAP ROOM</span>
          <ArrowRight className="w-4 h-4 text-[#c8924b]" />
        </button>
      </div>
    </div>
  );
};
