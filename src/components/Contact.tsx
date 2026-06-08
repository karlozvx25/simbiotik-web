import { motion } from 'framer-motion';
import { useState } from 'react';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contacto" className="py-24 relative z-10 bg-simbiotik-carbon/40 border-t border-text-primary/5">
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="text-xs uppercase tracking-[0.3em] text-simbiotik-chrome mb-12 text-center">Señal / Contacto</h2>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-panel p-8 md:p-12 rounded-xl"
        >
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12"
            >
              <div className="w-16 h-16 mx-auto mb-6 rounded-full border border-simbiotik-electric/40 flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-simbiotik-electric shadow-[0_0_15px_#38BDF8]"></div>
              </div>
              <p className="text-xl font-sub tracking-wider text-text-primary mb-3">Señal recibida.</p>
              <p className="text-simbiotik-chrome text-sm tracking-widest">Pronto volveremos a transmitir.</p>
            </motion.div>
          ) : (
            <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="text-xs uppercase tracking-widest text-simbiotik-chrome">Nombre</label>
                  <input 
                    type="text" 
                    id="name" 
                    className="bg-text-primary/5 border border-text-primary/10 rounded-md p-3 text-text-primary focus:outline-none focus:border-simbiotik-electric/50 transition-colors"
                    placeholder="Tu nombre"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-xs uppercase tracking-widest text-simbiotik-chrome">Correo</label>
                  <input 
                    type="email" 
                    id="email" 
                    className="bg-text-primary/5 border border-text-primary/10 rounded-md p-3 text-text-primary focus:outline-none focus:border-simbiotik-electric/50 transition-colors"
                    placeholder="tu@correo.com"
                  />
                </div>
              </div>
              
              <div className="flex flex-col gap-2">
                <label htmlFor="reason" className="text-xs uppercase tracking-widest text-simbiotik-chrome">Motivo</label>
                <select 
                  id="reason" 
                  className="bg-simbiotik-deep border border-text-primary/10 rounded-md p-3 text-text-primary focus:outline-none focus:border-simbiotik-electric/50 transition-colors appearance-none"
                >
                  <option value="booking">Booking</option>
                  <option value="prensa">Prensa</option>
                  <option value="colaboraciones">Colaboraciones</option>
                  <option value="management">Management</option>
                </select>
              </div>
              
              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="text-xs uppercase tracking-widest text-simbiotik-chrome">Mensaje</label>
                <textarea 
                  id="message" 
                  rows={4}
                  className="bg-text-primary/5 border border-text-primary/10 rounded-md p-3 text-text-primary focus:outline-none focus:border-simbiotik-electric/50 transition-colors resize-none"
                  placeholder="Transmite tu señal..."
                ></textarea>
              </div>
              
              <button 
                type="submit" 
                className="mt-4 py-4 border border-simbiotik-electric text-simbiotik-electric bg-transparent text-sm uppercase tracking-widest font-bold hover:bg-simbiotik-electric hover:text-white hover:shadow-[0_0_20px_rgba(56,189,248,0.4)] transition-all duration-300 rounded-md"
              >
                Enviar señal
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
