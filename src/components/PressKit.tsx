import { motion } from 'framer-motion';
import { Music, Guitar, Disc, Drum } from 'lucide-react';

const coreMembers = [
  { name: 'Karloz Vázquez', role: 'Voz', icon: Music },
  { name: 'Gonzalo Gutiérrez', role: 'Guitarra líder', icon: Guitar },
  { name: 'Brian Gutiérrez', role: 'Bajo', icon: Disc },
  { name: 'Jorge Gutiérrez', role: 'Batería', icon: Drum },
];

const expandedFormat = [
  'Guitarra de apoyo',
  'Tecladista',
  'Coristas',
  'VJ y pantalla / Visual System',
];

export default function PressKit() {
  return (
    <section id="press-kit" className="py-32 relative z-10 bg-simbiotik-deep">
      <div className="absolute inset-0 bg-noise opacity-20 pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-xs uppercase tracking-[0.4em] text-simbiotik-chrome mb-4">La formación</h2>
          <h3 className="text-4xl md:text-5xl font-display text-text-primary tracking-widest text-glow-dynamic">Press Kit</h3>
        </motion.div>

        {/* Core Members */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {coreMembers.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="glass-card p-8 text-center group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-simbiotik-electric/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

              <div className="relative z-10">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full border border-simbiotik-chrome/20 flex items-center justify-center group-hover:border-simbiotik-electric/40 transition-colors duration-500">
                  <member.icon size={24} className="text-simbiotik-chrome group-hover:text-simbiotik-electric transition-colors duration-500" />
                </div>
                <h4 className="text-lg font-sub font-bold tracking-wider text-text-primary mb-2">{member.name}</h4>
                <p className="text-xs uppercase tracking-[0.2em] text-simbiotik-electric">{member.role}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Expanded Format */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card p-8 md:p-12 border border-simbiotik-chrome/10"
        >
          <h4 className="text-xs uppercase tracking-[0.3em] text-simbiotik-chrome mb-8 text-center">Formato expandible</h4>
          <div className="flex flex-wrap justify-center gap-4">
            {expandedFormat.map((role) => (
              <span
                key={role}
                className="px-5 py-2.5 border border-simbiotik-chrome/20 text-simbiotik-silver text-sm tracking-wider rounded-full hover:border-simbiotik-electric/40 hover:text-simbiotik-electric transition-all duration-300"
              >
                {role}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
