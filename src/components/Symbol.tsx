import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

export default function Symbol() {
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

  const tooltips = [
    { id: 'circle', label: 'El Círculo', top: '15%', left: '50%', desc: 'Representa sistema, ciclo, órbita y destino.' },
    { id: 'core', label: 'El Núcleo Central', top: '50%', left: '50%', desc: 'Ojo, bocina, portal, frecuencia y corazón tecnológico.' },
    { id: 'top-lines', label: 'Líneas Superiores', top: '30%', left: '50%', desc: 'Mente expandida y red neuronal.' },
    { id: 'bottom-lines', label: 'Líneas Inferiores', top: '75%', left: '50%', desc: 'Raíces, cuerpo, sistema nervioso y descarga emocional.' },
  ];

  return (
    <section id="simbolo" className="py-32 relative z-10 overflow-hidden bg-simbiotik-deep">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-simbiotik-violet/5 via-simbiotik-deep to-simbiotik-deep pointer-events-none"></div>
      
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center gap-16 relative">
        
        <motion.div 
          initial={{ opacity: 0, rotate: -15, scale: 0.8 }}
          whileInView={{ opacity: 1, rotate: 0, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="w-full md:w-1/2 flex justify-center relative"
        >
          {/* Ambient glow behind symbol */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-simbiotik-violet/20 blur-[100px] rounded-full pointer-events-none"></div>
          
          <div className="w-64 h-64 md:w-96 md:h-96 rounded-full glass-card flex items-center justify-center relative overflow-hidden group shadow-[0_0_50px_rgba(109,40,217,0.1)] hover:shadow-[0_0_80px_rgba(56,189,248,0.2)] transition-shadow duration-700">
            <img 
              src="/logos/WhatsApp%20Image%202026-05-15%20at%205.49.56%20PM.jpeg" 
              alt="SimbiotiK Monochromatic Logo" 
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover opacity-60 grayscale brightness-125 contrast-125 mix-blend-screen group-hover:opacity-90 group-hover:scale-105 transition-all duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-simbiotik-deep via-transparent to-transparent opacity-80 pointer-events-none"></div>
            {/* Inner Ring */}
            <div className="absolute inset-4 border border-simbiotik-electric/20 rounded-full group-hover:border-simbiotik-electric/40 transition-colors duration-700 pointer-events-none"></div>
            <div className="absolute inset-8 border border-simbiotik-violet/10 rounded-full border-dashed animate-[spin_60s_linear_infinite] pointer-events-none"></div>

            {/* Interactive Hotspots */}
            {tooltips.map((tooltip) => (
              <div 
                key={tooltip.id}
                className="absolute w-6 h-6 -ml-3 -mt-3 rounded-full flex items-center justify-center cursor-none group/hotspot z-20"
                style={{ top: tooltip.top, left: tooltip.left }}
                onMouseEnter={() => setActiveTooltip(tooltip.id)}
                onMouseLeave={() => setActiveTooltip(null)}
              >
                <div className="w-2 h-2 rounded-full bg-simbiotik-electric shadow-[0_0_10px_#38BDF8] group-hover/hotspot:scale-150 transition-transform duration-300"></div>
                <div className="absolute inset-0 rounded-full border border-simbiotik-electric opacity-0 group-hover/hotspot:animate-ping"></div>
                
                <AnimatePresence>
                  {activeTooltip === tooltip.id && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 5, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-8 left-1/2 -translate-x-1/2 w-48 bg-simbiotik-graphite/90 backdrop-blur-md border border-simbiotik-electric/30 p-3 rounded-lg shadow-xl pointer-events-none"
                    >
                      <p className="text-[10px] font-bold tracking-widest text-simbiotik-electric mb-1 uppercase">{tooltip.label}</p>
                      <p className="text-xs font-light text-simbiotik-silver">{tooltip.desc}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="w-full md:w-1/2"
        >
          <h2 className="text-sm font-display uppercase tracking-[0.4em] text-simbiotik-electric mb-6 text-glow-dynamic">El Símbolo</h2>
          <p className="text-3xl font-light text-text-primary mb-10 leading-relaxed font-sans">
            Dos rostros. Una conciencia dividida. Un núcleo donde la piel y la señal se convierten en frecuencia.
          </p>
          
          <div className="space-y-4">
            {tooltips.map((tooltip) => (
              <div 
                key={tooltip.id}
                className={`glass-card p-6 border-l transition-colors group ${activeTooltip === tooltip.id ? 'border-l-simbiotik-electric bg-simbiotik-graphite/40' : 'border-l-simbiotik-violet hover:border-l-simbiotik-electric'}`}
                onMouseEnter={() => setActiveTooltip(tooltip.id)}
                onMouseLeave={() => setActiveTooltip(null)}
              >
                <h3 className={`text-xs font-bold tracking-[0.2em] mb-2 uppercase transition-colors ${activeTooltip === tooltip.id ? 'text-simbiotik-electric' : 'text-simbiotik-silver group-hover:text-simbiotik-electric'}`}>
                  {tooltip.label}
                </h3>
                <p className="text-simbiotik-chrome text-sm font-light">{tooltip.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
