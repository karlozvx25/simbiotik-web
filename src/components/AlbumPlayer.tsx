import { motion } from 'framer-motion';
import { Play, Pause, SkipForward, SkipBack, Volume2 } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { memoriaNaturalTracks } from '../data/tracks';
import { useAudio } from '../context/AudioContext';

export default function AlbumPlayer() {
  const { isPlaying, setIsPlaying, setActiveTrack, setHeroVisualMode } = useAudio();
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const currentTrack = memoriaNaturalTracks[currentTrackIndex];

  // Sync activeTrack when index changes
  useEffect(() => {
    setActiveTrack(currentTrack);
  }, [currentTrackIndex, currentTrack, setActiveTrack]);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(e => console.error("Error playing audio:", e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentTrackIndex]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setProgress(audioRef.current.currentTime);
      setDuration(audioRef.current.duration || 0);
    }
  };

  const handleTrackEnded = () => {
    playNextTrack();
  };

  const playNextTrack = () => {
    if (currentTrackIndex < memoriaNaturalTracks.length - 1) {
      setCurrentTrackIndex(prev => prev + 1);
      setIsPlaying(true);
    } else {
      // End of playlist: full reset
      setIsPlaying(false);
      setHeroVisualMode('idle');
      setCurrentTrackIndex(0);
      setProgress(0);
      setDuration(0);
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
      }
    }
  };

  const playPrevTrack = () => {
    if (currentTrackIndex > 0) {
      setCurrentTrackIndex(prev => prev - 1);
      setIsPlaying(true);
    }
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = value;
      setProgress(value);
    }
  };

  const formatTime = (time: number) => {
    if (!time || isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <section id="musica" className="py-32 relative z-10 bg-simbiotik-deep/50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs uppercase tracking-[0.4em] text-simbiotik-chrome mb-4"
          >
            Arquitectura Sonora
          </motion.h2>
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-5xl font-display text-text-primary tracking-widest"
          >
            Memoria Natural
          </motion.h3>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Player Controls - Premium Console */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 glass-card p-8 rounded-2xl flex flex-col relative overflow-hidden backdrop-blur-[18px]"
          >
            {/* Ambient Background Glow with track guide color */}
            <div 
              className="absolute inset-0 mix-blend-overlay transition-all duration-1000"
              style={{ 
                backgroundColor: isPlaying ? currentTrack.guideColor : 'transparent',
                opacity: isPlaying ? 0.08 : 0,
              }}
            />
            
            <div className="relative z-10 flex-grow flex flex-col justify-center">
              {/* Track info */}
              <div className="text-center mb-8">
                <div className="flex items-center justify-center gap-2 mb-3">
                  <span 
                    className="w-2 h-2 rounded-full" 
                    style={{ backgroundColor: currentTrack.guideColor, boxShadow: `0 0 8px ${currentTrack.guideColor}` }}
                  ></span>
                  <span className="text-[10px] text-simbiotik-chrome uppercase tracking-[0.3em] font-sub">
                    Acto {currentTrack.actNumber} · {currentTrack.act}
                  </span>
                </div>
                <h4 className="text-2xl font-bold tracking-wider text-text-primary mb-2">{currentTrack.title}</h4>
                <p className="text-xs text-simbiotik-chrome uppercase tracking-widest mb-1">{currentTrack.territory}</p>
                <p className="text-[10px] uppercase tracking-widest opacity-60 mt-2 italic" style={{ color: currentTrack.guideColor }}>
                  {currentTrack.mood}
                </p>
              </div>

              {/* Core Phrase */}
              <div className="text-center mb-8 px-4">
                <p className="text-xs text-simbiotik-silver/60 italic leading-relaxed font-light">
                  "{currentTrack.corePhrase}"
                </p>
              </div>

              {/* Audio Visualizer - Optimized with CSS Animations */}
              <div className="h-20 flex items-end justify-center gap-[3px] mb-8 opacity-70">
                {[...Array(40)].map((_, i) => (
                  <div 
                    key={i} 
                    className={`w-1 rounded-t-sm transition-colors duration-500 ${isPlaying ? 'animate-visualizer-bar' : ''}`}
                    style={{ 
                      height: isPlaying ? '100%' : '8%',
                      backgroundColor: isPlaying ? currentTrack.guideColor : 'rgb(var(--color-simbiotik-chrome) / 0.3)',
                      animationDelay: `${i * 0.05}s`,
                      animationDuration: `${0.5 + Math.random() * 0.5}s`,
                      opacity: isPlaying ? 0.7 : 0.3,
                    }}
                  />
                ))}
              </div>


              {/* Progress Bar */}
              <div className="mb-8">
                <input 
                  type="range" 
                  min="0" 
                  max={duration || 100} 
                  value={progress} 
                  onChange={handleSeek}
                  className="w-full h-1 bg-simbiotik-carbon rounded-full appearance-none cursor-pointer accent-simbiotik-violet"
                />
                <div className="flex justify-between text-xs text-simbiotik-chrome mt-2 font-mono">
                  <span>{formatTime(progress)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center justify-center gap-6">
                <button 
                  onClick={playPrevTrack}
                  disabled={currentTrackIndex === 0}
                  className="text-simbiotik-chrome hover:text-text-primary transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <SkipBack size={24} />
                </button>
                
                <button 
                  onClick={togglePlay}
                  className="w-16 h-16 rounded-full bg-text-primary text-simbiotik-deep flex items-center justify-center hover:scale-105 transition-transform shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                >
                  {isPlaying ? <Pause size={28} fill="currentColor" /> : <Play size={28} fill="currentColor" className="ml-1" />}
                </button>
                
                <button 
                  onClick={playNextTrack}
                  disabled={currentTrackIndex === memoriaNaturalTracks.length - 1}
                  className="text-simbiotik-chrome hover:text-text-primary transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <SkipForward size={24} />
                </button>
              </div>
            </div>
            
            <audio 
              ref={audioRef}
              src={`/audio/${currentTrack.file}`}
              onTimeUpdate={handleTimeUpdate}
              onEnded={handleTrackEnded}
              onLoadedMetadata={handleTimeUpdate}
            />
          </motion.div>

          {/* Tracklist */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7 flex flex-col gap-2"
          >
            {memoriaNaturalTracks.map((track, index) => (
              <div 
                key={track.id}
                onClick={() => {
                  setCurrentTrackIndex(index);
                  setIsPlaying(true);
                }}
                className={`group flex items-center justify-between p-4 border border-simbiotik-carbon/50 rounded-lg cursor-pointer transition-all duration-300
                  ${currentTrackIndex === index 
                    ? 'bg-simbiotik-graphite/30 border-simbiotik-chrome/30' 
                    : 'hover:bg-simbiotik-carbon/30 hover:border-simbiotik-chrome/30'}`}
              >
                <div className="flex items-center gap-4">
                  {/* Guide color dot */}
                  <div 
                    className="w-1.5 h-6 rounded-full shrink-0" 
                    style={{ backgroundColor: currentTrackIndex === index ? track.guideColor : 'rgb(var(--color-simbiotik-chrome) / 0.2)' }}
                  ></div>
                  <span className={`text-sm font-mono w-6 text-center ${currentTrackIndex === index ? 'text-simbiotik-electric' : 'text-simbiotik-chrome'}`}>
                    {currentTrackIndex === index && isPlaying ? (
                      <Volume2 size={16} className="animate-pulse mx-auto" />
                    ) : (
                      (index + 1).toString().padStart(2, '0')
                    )}
                  </span>
                  <div>
                    <h5 className={`font-bold tracking-wide transition-colors ${currentTrackIndex === index ? 'text-text-primary' : 'text-simbiotik-silver group-hover:text-text-primary'}`}>
                      {track.title}
                    </h5>
                    <p className="text-[10px] text-simbiotik-chrome uppercase tracking-widest mt-0.5">
                      Acto {track.actNumber} · {track.territory}
                    </p>
                  </div>
                </div>
                
                <button className={`w-8 h-8 rounded-full flex items-center justify-center border transition-colors shrink-0
                  ${currentTrackIndex === index 
                    ? 'border-simbiotik-electric text-simbiotik-electric' 
                    : 'border-transparent text-simbiotik-chrome group-hover:border-simbiotik-chrome/30 group-hover:text-simbiotik-silver'}`}
                >
                  {currentTrackIndex === index && isPlaying ? <Pause size={12} fill="currentColor" /> : <Play size={12} fill="currentColor" className="ml-0.5" />}
                </button>
              </div>
            ))}
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
