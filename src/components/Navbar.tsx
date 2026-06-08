import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Inicio', href: '#' },
    { name: 'Memoria Natural', href: '#memoria-intro' },
    { name: 'Música', href: '#musica' },
    { name: 'Manifiesto', href: '#manifiesto' },
    { name: 'Símbolo', href: '#simbolo' },
    { name: 'Press Kit', href: '#press-kit' },
    { name: 'Contacto', href: '#contacto' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${isScrolled ? 'glass-panel py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <a href="#" className="text-2xl font-display tracking-[0.2em] text-text-primary text-glow-dynamic">SIMBIOTIK</a>
        
        <div className="hidden md:flex gap-8 items-center">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className="text-sm font-sub uppercase tracking-wider hover:text-simbiotik-electric transition-colors text-simbiotik-silver">
              {link.name}
            </a>
          ))}
        </div>

        <div className="md:hidden flex items-center gap-4">
          <button className="text-text-primary" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} aria-label="Toggle Menu">
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full glass-panel py-4 md:hidden flex flex-col items-center gap-6"
          >
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-sub uppercase tracking-wider text-text-primary hover:text-simbiotik-electric transition-colors">
                {link.name}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
