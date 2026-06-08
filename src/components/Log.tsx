import { motion } from 'framer-motion';

export default function Log() {
  return (
    <section id="arquitectura" className="py-32 relative z-10">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="glass-card p-12 border-simbiotik-electric/20"
        >
          <h2 className="text-xs uppercase tracking-[0.3em] text-simbiotik-chrome mb-8">Arquitectura sonora</h2>
          <p className="text-2xl md:text-3xl leading-relaxed font-light text-text-primary italic">
            "Usamos tecnología como herramienta de arquitectura sonora, pero la voz, la piel y la intención son humanas."
          </p>
        </motion.div>
      </div>
    </section>
  );
}
