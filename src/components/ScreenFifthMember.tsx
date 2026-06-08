import { motion } from 'framer-motion';

export default function ScreenFifthMember() {
  return (
    <section id="pantalla" className="py-32 relative z-10 bg-simbiotik-carbon/60 border-y border-white/5">
      <div className="absolute inset-0 bg-noise opacity-20 pointer-events-none"></div>
      
      <div className="max-w-4xl mx-auto px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-center"
        >
          <h2 className="text-xs uppercase tracking-[0.4em] text-simbiotik-chrome mb-4">Sistema visual</h2>
          <h3 className="text-3xl md:text-5xl font-display text-text-primary tracking-widest text-glow-dynamic mb-12">
            La pantalla como quinto integrante
          </h3>
          
          <div className="glass-card p-10 md:p-16 border border-simbiotik-electric/10 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-simbiotik-electric/5 via-transparent to-simbiotik-violet/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none"></div>
            
            <p className="text-xl md:text-2xl leading-relaxed font-light text-text-primary relative z-10">
              En SimbiotiK, la pantalla no es decoración. Es el quinto integrante: el sistema visual que traduce en imagen lo que la banda convierte en sonido.
            </p>
            
            <div className="mt-10 flex items-center justify-center gap-6 relative z-10">
              <div className="w-16 h-[1px] bg-simbiotik-electric/40"></div>
              <span className="text-xs uppercase tracking-[0.3em] text-simbiotik-electric font-sub">Visual System</span>
              <div className="w-16 h-[1px] bg-simbiotik-electric/40"></div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
