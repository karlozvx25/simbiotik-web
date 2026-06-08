import { motion } from 'framer-motion';

const acts = [
  {
    number: 'I',
    title: 'El impulso',
    tracks: ['Dosis', 'Red social', 'Felina'],
    message: 'El cuerpo también transmite.',
    color: 'simbiotik-red',
    borderColor: 'border-simbiotik-red/40',
    bgGlow: 'from-simbiotik-red/5',
  },
  {
    number: 'II',
    title: 'La señal',
    tracks: ['Se te va a escapar', 'PragmatiK', 'Religion Rebelion', 'Tu misterio'],
    message: 'La señal no inventa lo humano; lo revela.',
    color: 'simbiotik-violet',
    borderColor: 'border-simbiotik-violet/40',
    bgGlow: 'from-simbiotik-violet/5',
  },
  {
    number: 'III',
    title: 'La memoria natural',
    tracks: ['Fluido temporal', 'Murmullos', 'Otro Infinito', 'Memoria Natural'],
    message: 'La memoria no vive atrás: transmite desde dentro.',
    color: 'simbiotik-gold',
    borderColor: 'border-simbiotik-gold/40',
    bgGlow: 'from-simbiotik-gold/5',
  },
];

export default function ThreeActs() {
  return (
    <section id="tres-actos" className="py-32 relative z-10 bg-simbiotik-deep">
      <div className="absolute inset-0 bg-noise opacity-20 pointer-events-none"></div>
      <div className="max-w-6xl mx-auto px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-xs uppercase tracking-[0.4em] text-simbiotik-chrome mb-4">Estructura narrativa</h2>
          <h3 className="text-4xl md:text-5xl font-display text-text-primary tracking-widest text-glow-dynamic">Los Tres Actos</h3>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {acts.map((act, index) => (
            <motion.div
              key={act.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: index * 0.15 }}
              className={`glass-card p-8 border-t-2 ${act.borderColor} relative overflow-hidden group`}
            >
              {/* Ambient glow */}
              <div className={`absolute inset-0 bg-gradient-to-b ${act.bgGlow} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`}></div>

              <div className="relative z-10">
                <span className={`text-6xl font-display text-${act.color}/20 group-hover:text-${act.color}/40 transition-colors duration-500 block mb-4`}>
                  {act.number}
                </span>
                <h4 className="text-xl font-sub font-bold tracking-wider text-text-primary mb-6 uppercase">
                  {act.title}
                </h4>

                <div className="space-y-2 mb-8">
                  {act.tracks.map((track) => (
                    <div key={track} className={`flex items-center gap-3 text-simbiotik-silver text-sm`}>
                      <div className={`w-1.5 h-1.5 rounded-full bg-${act.color}/60`}></div>
                      <span className="font-light">{track}</span>
                    </div>
                  ))}
                </div>

                <div className={`border-t border-${act.color}/20 pt-6`}>
                  <p className="text-simbiotik-chrome text-sm italic leading-relaxed">
                    "{act.message}"
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
