import { motion, AnimatePresence } from 'framer-motion';
import { useAudio, type HeroVisualMode } from '../context/AudioContext';

// Visual config for each mode
const MODE_CONFIG: Record<HeroVisualMode, {
  logoBlur: number;
  logoOpacity: number;
  logoScale: number;
  wordmarkColor: string;
  wordmarkTextShadow: string;
  wordmarkDropShadow: string;
  subtitleColor: string;
  subtitleTextShadow?: string;
  glowColor: string;
  glowOpacity: number;
  glowSize: number;
  haloVisible: boolean;
  haloColor?: string;
}> = {
  idle: {
    logoBlur: 18,
    logoOpacity: 0.16,
    logoScale: 1.08,
    wordmarkColor: 'transparent',
    wordmarkTextShadow: 'none',
    wordmarkDropShadow: 'drop-shadow(0 0 30px rgba(56, 189, 248, 0.3))',
    subtitleColor: 'rgb(var(--color-simbiotik-silver))',
    glowColor: 'rgba(56, 189, 248, 0.05)',
    glowOpacity: 0.05,
    glowSize: 800,
    haloVisible: false,
  },
  active: {
    logoBlur: 0,
    logoOpacity: 0.34,
    logoScale: 1,
    wordmarkColor: '#f5f2e9',
    wordmarkTextShadow: '0 0 2px rgba(184, 137, 69, 0.75), 0 0 8px rgba(184, 137, 69, 0.42), 0 0 18px rgba(184, 137, 69, 0.22)',
    wordmarkDropShadow: 'drop-shadow(0 0 14px rgba(184, 137, 69, 0.22))',
    subtitleColor: 'rgba(184, 137, 69, 0.7)',
    subtitleTextShadow: '0 0 12px rgba(184, 137, 69, 0.2)',
    glowColor: 'rgba(184, 137, 69, 0.12)',
    glowOpacity: 0.12,
    glowSize: 900,
    haloVisible: false,
  },
  core: {
    logoBlur: 0,
    logoOpacity: 0.38,
    logoScale: 1,
    wordmarkColor: '#f5f2e9',
    wordmarkTextShadow: '0 0 2px rgba(184, 137, 69, 0.75), 0 0 8px rgba(184, 137, 69, 0.42), 0 0 18px rgba(184, 137, 69, 0.22)',
    wordmarkDropShadow: 'drop-shadow(0 0 14px rgba(184, 137, 69, 0.22))',
    subtitleColor: 'rgba(184, 137, 69, 0.7)',
    subtitleTextShadow: '0 0 12px rgba(184, 137, 69, 0.2)',
    glowColor: 'rgba(184, 137, 69, 0.15)',
    glowOpacity: 0.15,
    glowSize: 950,
    haloVisible: true,
    haloColor: 'rgba(184, 137, 69, 0.08)',
  },
  memory: {
    logoBlur: 0,
    logoOpacity: 0.36,
    logoScale: 1,
    wordmarkColor: '#f0e6d3',
    wordmarkTextShadow: '0 0 2px rgba(184, 137, 69, 0.85), 0 0 10px rgba(184, 137, 69, 0.5), 0 0 22px rgba(184, 137, 69, 0.28)',
    wordmarkDropShadow: 'drop-shadow(0 0 16px rgba(184, 137, 69, 0.3))',
    subtitleColor: 'rgba(184, 137, 69, 0.8)',
    subtitleTextShadow: '0 0 14px rgba(184, 137, 69, 0.25)',
    glowColor: 'rgba(184, 137, 69, 0.14)',
    glowOpacity: 0.14,
    glowSize: 920,
    haloVisible: false,
  },
  signal: {
    logoBlur: 0,
    logoOpacity: 0.34,
    logoScale: 1,
    wordmarkColor: '#e8e8ec',
    wordmarkTextShadow: '0 0 2px rgba(56, 189, 248, 0.6), 0 0 8px rgba(56, 189, 248, 0.3), 0 0 18px rgba(200, 200, 200, 0.1)',
    wordmarkDropShadow: 'drop-shadow(0 0 14px rgba(56, 189, 248, 0.2))',
    subtitleColor: 'rgba(56, 189, 248, 0.6)',
    subtitleTextShadow: '0 0 10px rgba(56, 189, 248, 0.15)',
    glowColor: 'rgba(56, 189, 248, 0.1)',
    glowOpacity: 0.1,
    glowSize: 900,
    haloVisible: false,
  },
};

export default function Hero() {
  const { isPlaying, activeTrack, heroVisualMode, cycleHeroVisualMode, getModeLabel } = useAudio();
  const bgLogo = "/logos/WhatsApp%20Image%202026-05-15%20at%205.49.46%20PM.jpeg";

  // Determine effective mode: if playing, force at least 'active'
  const effectiveMode: HeroVisualMode = isPlaying && heroVisualMode === 'idle' ? 'active' : heroVisualMode;
  const config = MODE_CONFIG[effectiveMode];

  // Use track guide color for glow when playing
  const dynamicGlowColor = isPlaying && activeTrack
    ? activeTrack.guideColor.replace(')', ', 0.12)').replace('rgb', 'rgba')
    : config.glowColor;

  return (
    <section className={`relative min-h-screen flex items-center justify-center overflow-hidden pt-20 bg-black hero-${effectiveMode}`}>

      {/* ===== LAYER 1: Background atmosphere ===== */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Radial glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[150px] mix-blend-screen transition-all duration-900 ease-out"
          style={{
            width: `${config.glowSize}px`,
            height: `${config.glowSize}px`,
            backgroundColor: dynamicGlowColor,
            opacity: config.glowOpacity,
          }}
        />

        {/* Halo for core mode */}
        {config.haloVisible && (
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border transition-all duration-900 ease-out"
            style={{
              width: '600px',
              height: '600px',
              borderColor: config.haloColor,
              boxShadow: `0 0 60px ${config.haloColor}, inset 0 0 60px ${config.haloColor}`,
            }}
          />
        )}
      </div>

      {/* ===== LAYER 2: Rear logo / isotipo ===== */}
      <div className="absolute inset-0 z-0 flex items-center justify-center overflow-hidden">
        <motion.div
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{
            scale: config.logoScale,
            opacity: config.logoOpacity,
          }}
          transition={{ duration: 900, ease: "easeOut" }}
          className="relative w-full h-full flex items-center justify-center"
        >
          <img
            src={bgLogo}
            alt="SimbiotiK Isotipo Background"
            className="w-[120%] h-[120%] object-contain mix-blend-screen transition-all duration-900 ease-out"
            style={{
              filter: `blur(${config.logoBlur}px) brightness(${config.logoBlur === 0 ? 1.3 : 1.1})`,
            }}
          />
          {/* Radial mask to blend with black */}
          <div className="absolute inset-0 bg-[radial-gradient(circle,_transparent_20%,_black_70%)] z-10"></div>
        </motion.div>
      </div>

      {/* ===== LAYER 3-6: Foreground content ===== */}
      <div className="relative z-10 text-center px-4 max-w-6xl mx-auto flex flex-col items-center">

        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="relative"
        >
          {/* LAYER 3: Wordmark SIMBIOTIK — NEVER blurred */}
          <h1
            className="text-7xl md:text-[12rem] font-display tracking-[0.1em] md:tracking-[0.2em] leading-none mb-4 glitch-text transition-all duration-700 ease-out"
            style={{
              // Idle: metallic/chrome via background clip
              // Active modes: solid color with text-shadow
              backgroundImage: effectiveMode === 'idle' ? `url(${bgLogo})` : 'none',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              WebkitBackgroundClip: effectiveMode === 'idle' ? 'text' : undefined,
              WebkitTextFillColor: effectiveMode === 'idle' ? 'transparent' : 'transparent',
              color: effectiveMode === 'idle' ? undefined : config.wordmarkColor,
              textShadow: effectiveMode === 'idle' ? 'none' : config.wordmarkTextShadow,
              filter: config.wordmarkDropShadow,
            }}
          >
            SIMBIOTIK
          </h1>

          {/* LAYER 4: Claim */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="text-lg md:text-xl tracking-[0.4em] uppercase font-sub mt-12 transition-colors duration-700 ease-out"
            style={{
              color: config.subtitleColor,
              textShadow: config.subtitleTextShadow,
            }}
          >
            Donde la simbiosis humana se convierte en sonido
          </motion.p>

          {/* Active frequency indicator */}
          <AnimatePresence>
            {isPlaying && activeTrack && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.5 }}
                className="flex items-center justify-center gap-3 mt-8"
              >
                <span
                  className="w-2 h-2 rounded-full animate-pulse"
                  style={{ backgroundColor: activeTrack.guideColor, boxShadow: `0 0 8px ${activeTrack.guideColor}` }}
                />
                <span className="text-[10px] uppercase tracking-[0.3em] font-sub" style={{ color: activeTrack.guideColor }}>
                  Frecuencia activa · {activeTrack.title}
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* LAYER 5: CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2, ease: "easeOut" }}
          className="flex flex-col sm:flex-row gap-8 mt-16"
        >
          <a href="#memoria-intro" className="px-10 py-5 border border-simbiotik-electric text-simbiotik-electric bg-transparent text-sm uppercase tracking-[0.3em] font-bold hover:bg-simbiotik-electric hover:text-white hover:shadow-[0_0_30px_rgba(56,189,248,0.5)] transition-all duration-500">
            Escuchar ahora
          </a>
          <a href="#manifiesto" className="px-10 py-5 border border-simbiotik-chrome/40 text-simbiotik-silver text-sm uppercase tracking-[0.3em] hover:bg-simbiotik-silver/10 hover:border-simbiotik-chrome transition-all duration-500 glass-panel">
            Ver manifiesto
          </a>
        </motion.div>

        {/* LAYER 6: Manual frequency button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.8 }}
          className="mt-10"
        >
          <button
            onClick={cycleHeroVisualMode}
            className="px-6 py-3 rounded-full text-xs uppercase tracking-[0.25em] font-sub transition-all duration-500 border backdrop-blur-md"
            style={{
              backgroundColor: 'rgba(11, 13, 18, 0.6)',
              borderColor: 'rgba(200, 200, 200, 0.1)',
              color: 'rgba(200, 200, 200, 0.5)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'rgba(184, 137, 69, 0.3)';
              e.currentTarget.style.color = 'rgba(184, 137, 69, 0.8)';
              e.currentTarget.style.boxShadow = '0 0 20px rgba(184, 137, 69, 0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(200, 200, 200, 0.1)';
              e.currentTarget.style.color = 'rgba(200, 200, 200, 0.5)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            {getModeLabel()}
          </button>
        </motion.div>

      </div>
    </section>
  );
}
