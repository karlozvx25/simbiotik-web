import { motion } from 'framer-motion';

export default function MemoriaNaturalIntro() {
  return (
    <section id="memoria-intro" className="py-32 relative z-10 bg-simbiotik-carbon/40 border-y border-white/5">
      <div className="absolute inset-0 bg-noise opacity-20 pointer-events-none"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-simbiotik-gold/5 via-transparent to-transparent pointer-events-none"></div>

      <div className="max-w-5xl mx-auto px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-center"
        >
          <h2 className="text-xs uppercase tracking-[0.4em] text-simbiotik-gold mb-4">Primer mapa sonoro</h2>
          <h3 className="text-4xl md:text-6xl font-display text-text-primary tracking-widest text-glow-dynamic mb-12">
            Memoria Natural
          </h3>
          
          <p className="text-xl md:text-2xl leading-relaxed font-light text-simbiotik-silver max-w-3xl mx-auto">
            Memoria Natural es el primer mapa sonoro de SimbiotiK: un recorrido entre cuerpo, señal y memoria. Once canciones que exploran lo que permanece humano cuando el deseo, la tecnología, la sombra y la conciencia empiezan a fusionarse.
          </p>

          <div className="mt-12 flex items-center justify-center gap-6">
            <div className="w-16 h-[1px] bg-simbiotik-gold/40"></div>
            <span className="text-xs uppercase tracking-[0.3em] text-simbiotik-gold/60 font-sub">11 transmisiones</span>
            <div className="w-16 h-[1px] bg-simbiotik-gold/40"></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
