import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { Track } from '../data/tracks';

export type HeroVisualMode = 'idle' | 'active' | 'core' | 'memory' | 'signal';

const VISUAL_MODES: HeroVisualMode[] = ['idle', 'active', 'core', 'memory', 'signal'];

const MODE_LABELS: Record<HeroVisualMode, string> = {
  idle: 'Fase cero',
  active: 'Frecuencia activa',
  core: 'Núcleo revelado',
  memory: 'Memoria dorada',
  signal: 'Señal fría',
};

interface AudioState {
  isPlaying: boolean;
  activeTrack: Track | null;
  heroVisualMode: HeroVisualMode;
  setIsPlaying: (playing: boolean) => void;
  setActiveTrack: (track: Track | null) => void;
  cycleHeroVisualMode: () => void;
  setHeroVisualMode: (mode: HeroVisualMode) => void;
  getModeLabel: () => string;
}

const AudioContext = createContext<AudioState | undefined>(undefined);

export function AudioProvider({ children }: { children: ReactNode }) {
  const [isPlaying, setIsPlayingState] = useState(false);
  const [activeTrack, setActiveTrackState] = useState<Track | null>(null);
  const [heroVisualMode, setHeroVisualModeState] = useState<HeroVisualMode>('idle');

  const setIsPlaying = useCallback((playing: boolean) => {
    setIsPlayingState(playing);
    // When music stops, return to idle
    if (!playing) {
      setHeroVisualModeState('idle');
    }
  }, []);

  const setActiveTrack = useCallback((track: Track | null) => {
    setActiveTrackState(track);
  }, []);

  const setHeroVisualMode = useCallback((mode: HeroVisualMode) => {
    setHeroVisualModeState(mode);
  }, []);

  const cycleHeroVisualMode = useCallback(() => {
    setHeroVisualModeState((prev) => {
      const currentIndex = VISUAL_MODES.indexOf(prev);
      // If currently idle and music is playing, jump to active first
      if (prev === 'idle' && isPlaying) {
        return 'active';
      }
      const nextIndex = (currentIndex + 1) % VISUAL_MODES.length;
      return VISUAL_MODES[nextIndex];
    });
  }, [isPlaying]);

  const getModeLabel = useCallback(() => {
    return MODE_LABELS[heroVisualMode];
  }, [heroVisualMode]);

  return (
    <AudioContext.Provider
      value={{
        isPlaying,
        activeTrack,
        heroVisualMode,
        setIsPlaying,
        setActiveTrack,
        cycleHeroVisualMode,
        setHeroVisualMode,
        getModeLabel,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const context = useContext(AudioContext);
  if (context === undefined) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
}
