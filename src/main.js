import './style.css';
import Lenis from 'lenis';
import { SimbiotikWebGL } from './webgl.js';
import { TextScramble } from './scramble.js';
import { tracks } from './audio.js';
import gsap from 'gsap';

document.addEventListener('DOMContentLoaded', () => {
  
  // 1. INICIALIZAR WEBGL CANVAS
  const webgl = new SimbiotikWebGL();
  
  // Carga del modelo 3D GLTF/GLB en formato Cromo Azul
  webgl.loadLogoModel('/smbtk1.glb');

  // 1.5 CURSOR PERSONALIZADO (Punto)
  const cursor = document.createElement('div');
  cursor.className = 'custom-cursor';
  document.body.appendChild(cursor);
  
  document.addEventListener('mousemove', (e) => {
    gsap.to(cursor, {
      x: e.clientX,
      y: e.clientY,
      duration: 0.08,
      ease: 'power2.out'
    });
  });

  // Efectos de hover sobre elementos interactivos
  const updateHoverEffects = () => {
    const hoverables = document.querySelectorAll('a, button, .track-row, .hotspot, .part-card, .status-btn, [role="button"]');
    hoverables.forEach(el => {
      if (el.dataset.cursorBound) return;
      el.dataset.cursorBound = "true";

      el.addEventListener('mouseenter', () => {
        gsap.to(cursor, {
          scale: 1.8,
          backgroundColor: '#ffffff',
          boxShadow: '0 0 12px #ffffff',
          duration: 0.15
        });
      });
      el.addEventListener('mouseleave', () => {
        gsap.to(cursor, {
          scale: 1,
          backgroundColor: '#38BDF8', // Azul eléctrico
          boxShadow: '0 0 8px #38BDF8',
          duration: 0.15
        });
      });
    });
  };

  updateHoverEffects();

  // Escuchar adiciones en el DOM para aplicar hover de cursor a nuevos elementos dinámicos
  const domObserver = new MutationObserver(() => {
    updateHoverEffects();
  });
  domObserver.observe(document.body, { childList: true, subtree: true });
  
  // 2. INICIALIZAR SCROLL SUAVE (LENIS)
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    wheelMultiplier: 1.0
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  // 3. INICIALIZAR TEXT SCRAMBLE PARA TÍTULOS
  const scrambleElements = document.querySelectorAll('.scramble-text');
  const scramblers = Array.from(scrambleElements).map(el => {
    const sc = new TextScramble(el);
    const originalText = el.getAttribute('data-text') || el.innerText;
    
    // Scramble inicial
    sc.setText(originalText);
    
    // Activar scramble al pasar el mouse (hover)
    el.addEventListener('mouseenter', () => {
      sc.setText(originalText);
    });
    
    return { el, sc, originalText };
  });

  // 4. GENERAR LA LISTA DE CANCIONES (ACTOS)
  const act1Container = document.getElementById('act-1-tracks');
  const act2Container = document.getElementById('act-2-tracks');
  const act3Container = document.getElementById('act-3-tracks');
  
  let currentTrackIndex = 0;

  function renderTracklist() {
    tracks.forEach((track, index) => {
      const row = document.createElement('div');
      row.className = `track-row ${index === currentTrackIndex ? 'active' : ''}`;
      row.setAttribute('data-index', index);
      
      row.innerHTML = `
        <div class="row-left">
          <span class="track-row-num">${String(track.id).padStart(2, '0')}</span>
          <div class="track-row-details">
            <span class="track-row-title">${track.title}</span>
          </div>
        </div>
        <div class="row-right">
          <span class="track-row-territory">${track.territory}</span>
          <button class="btn-play-mini" aria-label="Select Track">
            <svg class="info-svg" viewBox="0 0 24 24" width="12" height="12" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
            </svg>
          </button>
        </div>
      `;
      
      // Añadir fila al contenedor correspondiente según su acto
      if (track.actNumber === 1) {
        act1Container.appendChild(row);
      } else if (track.actNumber === 2) {
        act2Container.appendChild(row);
      } else if (track.actNumber === 3) {
        act3Container.appendChild(row);
      }

      // Evento al hacer clic en la fila
      row.addEventListener('click', () => {
        selectTrack(index);
      });
    });
  }

  renderTracklist();

  // Elementos del panel activo
  const playerActNum = document.getElementById('player-act-num');
  const playerActTitle = document.getElementById('player-act-title');
  const playerTrackTitle = document.getElementById('player-track-title');
  const playerTrackTerritory = document.getElementById('player-track-territory');
  const playerTrackMood = document.getElementById('player-track-mood');
  const playerTrackQuote = document.getElementById('player-track-quote');
  
  const activeTrackScrambler = new TextScramble(playerTrackTitle);

  function selectTrack(index) {
    // Quitar clase activa previa
    document.querySelectorAll('.track-row').forEach(row => {
      row.classList.remove('active');
    });
    
    currentTrackIndex = index;
    const track = tracks[currentTrackIndex];
    
    // Activar fila actual
    const activeRow = document.querySelector(`.track-row[data-index="${index}"]`);
    if (activeRow) activeRow.classList.add('active');
    
    // Cambiar datos del panel izquierdo
    playerActNum.innerText = track.actNumber === 1 ? 'I' : track.actNumber === 2 ? 'II' : 'III';
    playerActTitle.innerText = track.act;
    playerTrackTerritory.innerText = track.territory;
    playerTrackMood.innerText = track.mood;
    playerTrackQuote.innerText = `"${track.corePhrase}"`;
    
    // Efecto text scramble sobre el título de la canción seleccionada
    activeTrackScrambler.setText(track.title);

    // Cambiar color del fondo WebGL según la guía del track
    webgl.updateColorTheme(track.guideColor);
  }

  // Cargar primera canción al inicio
  selectTrack(0);
  
  // Forzar el tema de color a Azul Frecuencia al inicio (para recrear el efecto de la esfera)
  webgl.updateColorTheme('#38bdf8');


  // 5. GENERAR ITEMS DEL MANIFIESTO
  const manifestoItems = [
    { text: "SimbiotiK no pertenece a la vieja escuela, pero respeta la raíz del rock.", keyword: "Raíz" },
    { text: "La canción debe sentirse como una experiencia, no como un ejercicio musical.", keyword: "Experiencia" },
    { text: "La voz humana es el centro del conflicto.", keyword: "Voz" },
    { text: "La guitarra debe ser personaje, no decoración.", keyword: "Guitarra" },
    { text: "El bajo debe tener presencia física.", keyword: "Bajo" },
    { text: "La batería debe marcar el pulso emocional, no solo el tiempo.", keyword: "Batería" },
    { text: "Los sintetizadores deben abrir atmósferas, no volver pop la canción.", keyword: "Síntesis" },
    { text: "Las letras deben ser profundas, pero cantables.", keyword: "Letras" },
    { text: "La oscuridad debe ser elegante.", keyword: "Oscuridad" },
    { text: "SimbiotiK debe construir universo.", keyword: "Universo" }
  ];

  const manifestoContainer = document.getElementById('manifiesto-items-container');
  manifestoItems.forEach((item) => {
    const card = document.createElement('div');
    card.className = 'manifiesto-card glass-panel';
    card.innerHTML = `
      <span class="manifiesto-keyword">${item.keyword}</span>
      <p class="manifiesto-text">${item.text}</p>
    `;
    manifestoContainer.appendChild(card);
  });

  // 6. INTERACCIONES DEL SÍMBOLO (HOTSPOTS)
  const partCards = document.querySelectorAll('.part-card');

  partCards.forEach(card => {
    const partName = card.getAttribute('data-part');
    
    card.addEventListener('mouseenter', () => {
      highlightPart(partName);
    });
    
    card.addEventListener('mouseleave', () => {
      clearHighlight();
    });
  });

  function highlightPart(partName) {
    // Apagar todos
    partCards.forEach(c => c.classList.remove('hover'));
    
    // Encender tarjeta correspondiente
    const card = document.getElementById(`part-${partName}`);
    if (card) {
      card.classList.add('hover');
    }
    
    // En WebGL, podemos cambiar el foco de la cámara levemente o iluminar el área del shader
    // según el hotspot. Ejemplo:
    if (partName === 'core') {
      webgl.updateColorTheme("#38bdf8"); // Electric azul
    } else if (partName === 'circle') {
      webgl.updateColorTheme("#b88945"); // Gold
    } else if (partName === 'top-lines') {
      webgl.updateColorTheme("#6d28d9"); // Violet
    } else if (partName === 'bottom-lines') {
      webgl.updateColorTheme("#7f1d1d"); // Rojo
    }
  }

  function clearHighlight() {
    partCards.forEach(c => c.classList.remove('hover'));
  }

  // 7. SELECTOR DE ESTADOS (HERO SECTION)
  // Cambia colores del WebGL dinámicamente representando los estados estéticos de la banda
  const statusButtons = document.querySelectorAll('.status-btn');
  const stateColors = {
    idle: '#38bdf8',    // Fase Cero (Cyan base)
    active: '#7f1d1d',  // Frecuencia Activa (Rojo Instinto)
    core: '#6d28d9',    // Núcleo Revelado (Violeta)
    memory: '#b88945',  // Memoria Dorada (Oro)
    signal: '#1e40af'   // Señal Fría (Azul Eléctrico oscuro)
  };

  statusButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      statusButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      const state = btn.getAttribute('data-state');
      const section = btn.getAttribute('data-section');
      const color = stateColors[state];
      
      // Hacer scroll a la sección correspondiente
      if (section) {
        const targetSection = document.getElementById(section);
        if (targetSection) {
          targetSection.classList.add('visible');

          if (section === 'manifiesto') {
            const headerHeight = document.querySelector('.navbar')?.offsetHeight || 0;
            const techSubtitle = targetSection.querySelector('.tech-subtitle');
            if (techSubtitle) {
              const rect = techSubtitle.getBoundingClientRect();
              const targetY = window.scrollY + rect.top - headerHeight - 25;
              lenis.scrollTo(targetY, { duration: 1.5 });
            }
          } else {
            const sectionOffset = section === 'memoria-intro' ? -20 : section === 'simbolo' ? -25 : -60;
            lenis.scrollTo(targetSection, {
              offset: sectionOffset,
              duration: 1.5
            });
          }
        }
      }
      
      // Actualizar color base WebGL
      webgl.updateColorTheme(color);
      
      // Cambiar texto de cabecera como un glitch
      const headerLogo = document.querySelector('.logo');
      const headerScramble = scramblers.find(s => s.el === headerLogo);
      if (headerScramble) {
        headerScramble.sc.setText(`SIMBIOTIK [${state.toUpperCase()}]`).then(() => {
          setTimeout(() => {
            headerScramble.sc.setText("SIMBIOTIK");
          }, 2000);
        });
      }
    });
  });

  // 8. FORMULARIO DE CONTACTO
  const contactForm = document.getElementById('contact-form');
  const contactSuccess = document.getElementById('contact-success');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Animación de salida del formulario
      gsap.to(contactForm, {
        opacity: 0,
        y: -20,
        duration: 0.5,
        onComplete: () => {
          contactForm.classList.add('hidden');
          contactSuccess.classList.remove('hidden');
          
          // Animación de entrada de la confirmación
          gsap.fromTo(contactSuccess, 
            { opacity: 0, scale: 0.95 },
            { opacity: 1, scale: 1, duration: 0.5 }
          );
          
          // Glitch sónico en WebGL al enviar exitosamente la señal
          webgl.updateColorTheme("#ffffff");
          setTimeout(() => {
            webgl.updateColorTheme("#38bdf8");
          }, 400);
        }
      });
    });
  }

  // 9. REVELADO DE SECCIONES AL SCROLL (IntersectionObserver)
  const menuToggle = document.querySelector('.menu-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  const sections = document.querySelectorAll('.section-pane');
  
  // Mapa de secciones a estados y colores
  const sectionStateMap = {
    'inicio': { state: 'idle', color: '#38bdf8' },
    'simbiosis-sonido': { state: 'idle', color: '#38bdf8' },
    'memoria-intro': { state: 'active', color: '#7f1d1d' },
    'simbolo': { state: 'core', color: '#6d28d9' },
    'manifiesto': { state: 'memory', color: '#b88945' },
    'press-kit': { state: 'memory', color: '#b88945' },
    'contacto': { state: 'signal', color: '#1e40af' }
  };

  let lastActiveSection = null;

  const observerOptions = {
    root: null,
    rootMargin: '-30% 0px -30% 0px',
    threshold: 0.1
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Añadir clase visible para animar opacidad y posición en CSS
        entry.target.classList.add('visible');
        
        const sectionId = entry.target.id;
        
        // No repetir si ya es la misma sección activa
        if (sectionId === lastActiveSection) return;
        lastActiveSection = sectionId;
        
        // Mover cámara WebGL según la sección activa en el scroll
        webgl.triggerSectionTransition(sectionId);
        
        // Actualizar menú activo en el menú lateral del hero
        document.querySelectorAll('.hero-sidebar-links a').forEach(l => {
          l.classList.remove('active');
          if (l.getAttribute('href') === `#${sectionId}`) {
            l.classList.add('active');
          }
        });
        
        // Iluminar botón de estado correspondiente y cambiar color del logo
        const sectionMap = sectionStateMap[sectionId];
        if (sectionMap) {
          // Actualizar botones de estado
          document.querySelectorAll('.fixed-status-bar .status-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-section') === sectionId ||
                btn.getAttribute('data-state') === sectionMap.state) {
              btn.classList.add('active');
            }
          });
          
          // Cambiar color del logo 3D
          webgl.updateColorTheme(sectionMap.color);
        }
        
        // Mostrar/ocultar SVG overlay y logo 3D en la sección Símbolo
        const svgOverlay = document.getElementById('logo-svg-overlay');
        if (sectionId === 'simbolo') {
          // Mostrar SVG overlay y ocultar logo 3D con un ligero retraso
          setTimeout(() => {
            svgOverlay.classList.add('visible');
            webgl.setLogoVisibility(false);
          }, 600);
        } else {
          // Ocultar SVG overlay y restaurar logo 3D
          svgOverlay.classList.remove('visible');
          webgl.setLogoVisibility(true);
        }
      }
    });
  }, observerOptions);

  sections.forEach(section => {
    sectionObserver.observe(section);
  });

  // 9.5 NAVEGACIÓN POR CLICS (LENIS SCROLL)
  const navLinks = document.querySelectorAll('.mobile-menu a, .header-buttons a, .hero-sidebar-links a');
  
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      
      const targetId = link.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      if (!targetSection) return;
      
      // Cerrar menú móvil si está abierto
      if (mobileMenu) {
        mobileMenu.classList.remove('active');
      }
      if (menuToggle) {
        menuToggle.classList.remove('open');
      }
      
      // Hacer scroll suave hacia la sección
      if (targetSection) targetSection.classList.add('visible');

      if (targetId === '#manifiesto') {
        const headerHeight = document.querySelector('.navbar')?.offsetHeight || 0;
        const techSubtitle = targetSection.querySelector('.tech-subtitle');
        if (techSubtitle) {
          const rect = techSubtitle.getBoundingClientRect();
          const targetY = window.scrollY + rect.top - headerHeight - 25;
          lenis.scrollTo(targetY, { duration: 1.5 });
        }
      } else {
        const sectionOffsets = {
          '#memoria-intro': -20,
          '#simbolo': -25
        };
        lenis.scrollTo(targetSection, {
          offset: sectionOffsets[targetId] || -60,
          duration: 1.5
        });
      }
    });
  });

  // 10. MENÚ MÓVIL
  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', () => {
      mobileMenu.classList.toggle('active');
      menuToggle.classList.toggle('open');
    });
  }
});
