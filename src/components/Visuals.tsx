import { motion } from 'framer-motion';

const territories = [
  { name: 'Cuerpo', visuals: [
    { title: 'Impulso', img: '/images/WhatsApp%20Image%202026-05-15%20at%209.53.31%20PM%20(4).jpeg' },
    { title: 'Raíz', img: '/images/WhatsApp%20Image%202026-05-16%20at%203.04.19%20AM.jpeg' },
  ]},
  { name: 'Señal', visuals: [
    { title: 'Frecuencia', img: '/images/WhatsApp%20Image%202026-05-15%20at%209.53.28%20PM.jpeg' },
    { title: 'Conexión', img: '/images/WhatsApp%20Image%202026-05-15%20at%209.53.31%20PM%20(1).jpeg' },
  ]},
  { name: 'Sombra', visuals: [
    { title: 'Oscuridad', img: '/images/WhatsApp%20Image%202026-05-15%20at%209.53.25%20PM%20(3).jpeg' },
  ]},
  { name: 'Memoria', visuals: [
    { title: 'Memoria Natural', img: '/images/WhatsApp%20Image%202026-05-15%20at%209.53.31%20PM%20(3).jpeg' },
  ]},
  { name: 'Evolución', visuals: [
    { title: 'Órbita', img: '/images/WhatsApp%20Image%202026-05-15%20at%209.53.28%20PM%20(1).jpeg' },
  ]},
];

export default function Visuals() {
  return (
    <section id="visuales" className="py-24 relative z-10 bg-simbiotik-deep">
      <div className="absolute inset-0 bg-noise opacity-30 pointer-events-none"></div>
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <h2 className="text-sm font-display uppercase tracking-[0.4em] text-simbiotik-electric mb-16 text-center text-glow-dynamic">Registros Visuales</h2>
        
        {territories.map((territory, tIdx) => (
          <div key={territory.name} className="mb-16 last:mb-0">
            <motion.h3 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-xs uppercase tracking-[0.3em] text-simbiotik-chrome mb-6 font-sub border-l-2 border-simbiotik-electric/30 pl-4"
            >
              Territorio: {territory.name}
            </motion.h3>
            <div className={`grid gap-6 ${territory.visuals.length === 1 ? 'grid-cols-1 max-w-2xl' : 'grid-cols-1 md:grid-cols-2'}`}>
              {territory.visuals.map((vis, index) => (
                <motion.div
                  key={vis.title}
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.7, delay: (tIdx * 0.1) + (index * 0.1), ease: "easeOut" }}
                  className="relative overflow-hidden group rounded-xl glass-card border border-white/5 shadow-2xl"
                >
                  <div className="aspect-video w-full relative">
                    <img 
                      src={vis.img} 
                      alt={vis.title} 
                      loading="lazy"
                      className="w-full h-full object-cover transition-all duration-[2000ms] group-hover:scale-110 filter brightness-75 group-hover:brightness-100 group-hover:contrast-125"
                    />
                    <div className="absolute inset-0 bg-simbiotik-violet/20 opacity-0 group-hover:opacity-100 mix-blend-overlay transition-opacity duration-1000 pointer-events-none"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-simbiotik-deep/90 via-simbiotik-deep/30 to-transparent opacity-90 group-hover:opacity-70 transition-opacity duration-500"></div>
                    
                    <div className="absolute bottom-0 left-0 p-8 w-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <h4 className="text-2xl font-sans font-light text-text-primary tracking-wider mb-2">{vis.title}</h4>
                      <div className="w-8 h-1 bg-simbiotik-electric mb-4 group-hover:w-16 transition-all duration-500"></div>
                      <p className="text-simbiotik-chrome text-xs font-bold uppercase tracking-[0.3em]">{territory.name}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
