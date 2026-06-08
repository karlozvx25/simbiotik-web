import { AudioProvider } from './context/AudioContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MemoriaNaturalIntro from './components/MemoriaNaturalIntro';
import AlbumPlayer from './components/AlbumPlayer';
import ThreeActs from './components/ThreeActs';
import Symbol from './components/Symbol';
import Manifesto from './components/Manifesto';
import ScreenFifthMember from './components/ScreenFifthMember';
import Log from './components/Log';
import Visuals from './components/Visuals';
import PressKit from './components/PressKit';
import Contact from './components/Contact';
import Cursor from './components/Cursor';

function App() {
  return (
    <AudioProvider>
      <div className="min-h-screen bg-simbiotik-deep text-simbiotik-silver font-sans selection:bg-simbiotik-violet/30 selection:text-text-primary relative overflow-hidden">
        <Cursor />
        <div className="fixed inset-0 bg-noise z-50 mix-blend-overlay pointer-events-none"></div>
        <Navbar />
        <main>
          <Hero />
          <MemoriaNaturalIntro />
          <AlbumPlayer />
          <ThreeActs />
          <Symbol />
          <Manifesto />
          <ScreenFifthMember />
          <Log />
          <Visuals />
          <PressKit />
          <Contact />
        </main>
        <footer className="py-12 border-t border-white/5 bg-simbiotik-carbon/50 backdrop-blur-md relative z-10">
          <div className="max-w-7xl mx-auto px-6 text-center text-simbiotik-chrome text-sm tracking-widest font-light">
            <p>&copy; {new Date().getFullYear()} SIMBIOTIK. DONDE LA SIMBIOSIS HUMANA SE CONVIERTE EN SONIDO.</p>
          </div>
        </footer>
      </div>
    </AudioProvider>
  );
}

export default App;
