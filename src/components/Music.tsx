import { motion } from 'framer-motion';
import { Play, Pause } from 'lucide-react';
import { useState, useRef } from 'react';

const songs = [
  { id: '1', title: 'Otro Infinito', file: 'Otro Infinito.mp3', mood: 'Intenso, expansivo' },
  { id: '2', title: 'Tu misterio', file: 'Tu misterio(1).mp3', mood: 'Melancólico, profundo' },
  { id: '3', title: 'Se te va a escapar', file: 'Se te va a escapar(1).mp3', mood: 'Urgente, visceral' },
  { id: '4', title: 'Red social', file: 'Red social(1).mp3', mood: 'Tecnológico, rítmico' },
  { id: '5', title: 'Murmullos', file: 'Murmullos(1).mp3', mood: 'Oscuro, envolvente' },
  { id: '6', title: 'Dosis', file: 'Dosis(1).mp3', mood: 'Adictivo, denso' },
];

export default function Music() {
  const [playingId, setPlayingId] = useState<string | null>(null);
  const audioRefs = useRef<{ [key: string]: HTMLAudioElement }>({});

  const togglePlay = (id: string) => {
    const currentAudio = audioRefs.current[id];
    
    if (playingId === id) {
      currentAudio?.pause();
      setPlayingId(null);
    } else {
      if (playingId && audioRefs.current[playingId]) {
        audioRefs.current[playingId].pause();
      }
      currentAudio?.play();
      setPlayingId(id);
    }
  };

  return (
    <section id="musica" className="py-24 relative z-10">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-xs uppercase tracking-[0.3em] text-simbiotik-chrome mb-12 text-center">Frecuencias Emitidas</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {songs.map((song, index) => (
            <motion.div
              key={song.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="glass-card p-6 flex flex-col"
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-xl font-bold tracking-wider text-text-primary mb-1">{song.title}</h3>
                  <p className="text-xs text-simbiotik-chrome uppercase tracking-widest">{song.mood}</p>
                </div>
                <button 
                  onClick={() => togglePlay(song.id)}
                  className="w-12 h-12 rounded-full border border-text-primary/20 flex items-center justify-center hover:bg-text-primary/10 transition-colors text-text-primary"
                  aria-label={playingId === song.id ? "Pausar" : "Reproducir"}
                >
                  {playingId === song.id ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" className="ml-1" />}
                </button>
              </div>
              
              <audio 
                ref={(el) => { if (el) audioRefs.current[song.id] = el; }} 
                src={`/audio/${song.file}`} 
                onEnded={() => setPlayingId(null)}
                className="hidden"
              />
              
              {/* Fake waveform visual */}
              <div className="mt-auto h-12 flex items-end gap-1 opacity-50">
                {[...Array(24)].map((_, i) => (
                  <div 
                    key={i} 
                    className={`flex-1 bg-simbiotik-silver rounded-t-sm transition-all duration-300 ${playingId === song.id ? 'animate-pulse' : ''}`}
                    style={{ 
                      height: `${Math.max(10, Math.random() * 100)}%`,
                      animationDelay: `${i * 0.05}s`
                    }}
                  ></div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
