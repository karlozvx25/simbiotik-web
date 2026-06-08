import { motion } from 'framer-motion';

export default function Frequency() {
  return (
    <section id="frecuencia" className="py-24 relative z-10">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-xs uppercase tracking-[0.3em] text-simbiotik-chrome mb-8">La Frecuencia</h2>
          <p className="text-2xl md:text-4xl leading-relaxed font-light text-text-primary">
            SimbiotiK es rock alternativo mexicano con visión global: oscuro, melódico, emocional, tecnológico y profundamente humano. Una banda que transforma deseo, memoria, sombra y evolución en sonido.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
