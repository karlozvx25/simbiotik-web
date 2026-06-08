import { motion } from 'framer-motion';

const commandments = [
  { text: "SimbiotiK no pertenece a la vieja escuela, pero respeta la raíz del rock.", keyword: "Raíz" },
  { text: "La canción debe sentirse como una experiencia, no como un ejercicio musical.", keyword: "Experiencia" },
  { text: "La voz humana es el centro del conflicto.", keyword: "Voz" },
  { text: "La guitarra debe ser personaje, no decoración.", keyword: "Guitarra" },
  { text: "El bajo debe tener presencia física.", keyword: "Bajo" },
  { text: "La batería debe marcar el pulso emocional, no solo el tiempo.", keyword: "Batería" },
  { text: "Los sintetizadores deben abrir atmósferas, no volver pop la canción.", keyword: "Síntesis" },
  { text: "Las letras deben ser profundas, pero cantables.", keyword: "Letras" },
  { text: "La oscuridad debe ser elegante.", keyword: "Oscuridad" },
  { text: "SimbiotiK debe construir universo.", keyword: "Universo" },
];

export default function Manifesto() {
  return (
    <section id="manifiesto" className="py-32 relative z-10 bg-simbiotik-carbon/80 backdrop-blur-md border-y border-white/5">
      <div className="absolute inset-0 bg-[url('/images/WhatsApp%20Image%202026-05-15%20at%209.53.31%20PM.jpeg')] bg-cover bg-fixed opacity-5 mix-blend-luminosity pointer-events-none"></div>
      
      <div className="max-w-6xl mx-auto px-6 relative">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-xs uppercase tracking-[0.4em] text-simbiotik-chrome mb-4">Brújula artística</h2>
          <h3 className="text-4xl md:text-5xl font-display tracking-widest text-glow-dynamic text-text-primary">El Manifiesto</h3>
          <p className="text-simbiotik-chrome text-sm mt-6 max-w-xl mx-auto font-light leading-relaxed">
            Diez principios que definen cómo suena, se siente y se construye el universo SimbiotiK.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {commandments.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="glass-card p-8 border-l-2 border-l-simbiotik-chrome/30 hover:border-l-simbiotik-electric transition-all group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-simbiotik-electric/0 to-transparent group-hover:from-simbiotik-electric/5 transition-all duration-500 pointer-events-none"></div>
              
              <div className="flex items-start gap-6 relative z-10">
                <div className="flex flex-col items-center shrink-0">
                  <span className="text-4xl font-display text-simbiotik-chrome/20 group-hover:text-simbiotik-electric/60 transition-colors duration-500">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="text-[9px] uppercase tracking-widest text-simbiotik-chrome/40 mt-1 font-sub group-hover:text-simbiotik-electric/50 transition-colors">
                    {item.keyword}
                  </span>
                </div>
                <p className="text-simbiotik-silver text-lg leading-relaxed font-light group-hover:text-text-primary transition-colors">
                  {item.text}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
