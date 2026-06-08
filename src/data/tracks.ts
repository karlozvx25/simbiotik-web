export interface Track {
  id: string;
  title: string;
  file: string;
  act: string;
  actNumber: number;
  territory: string;
  mood: string;
  corePhrase: string;
  guideColor: string;
}

export const memoriaNaturalTracks: Track[] = [
  {
    id: '1', title: 'Dosis', file: 'dosis.mp3',
    act: 'El impulso', actNumber: 1,
    territory: 'Instinto', mood: 'Cuerpo + Deseo',
    corePhrase: 'El cuerpo pide antes que la mente entienda.',
    guideColor: '#7F1D1D',
  },
  {
    id: '2', title: 'Red social', file: 'red_social.mp3',
    act: 'El impulso', actNumber: 1,
    territory: 'Deseo digital', mood: 'Señal + Dualidad',
    corePhrase: 'Detrás de cada pantalla hay piel buscando piel.',
    guideColor: '#38BDF8',
  },
  {
    id: '3', title: 'Felina', file: 'felina.mp3',
    act: 'El impulso', actNumber: 1,
    territory: 'Instinto', mood: 'Energía primaria',
    corePhrase: 'Lo salvaje no se domestica, se acepta.',
    guideColor: '#7F1D1D',
  },
  {
    id: '4', title: 'Se te va a escapar', file: 'se_te_va_a_escapar.mp3',
    act: 'La señal', actNumber: 2,
    territory: 'Renacimiento', mood: 'Urgente, visceral',
    corePhrase: 'Lo que no dices a tiempo, el silencio se lo queda.',
    guideColor: '#6D28D9',
  },
  {
    id: '5', title: 'PragmatiK', file: 'pragmatik.mp3',
    act: 'La señal', actNumber: 2,
    territory: 'Dualidad', mood: 'Evolución',
    corePhrase: 'La lógica no mata lo emocional; lo revela.',
    guideColor: '#38BDF8',
  },
  {
    id: '6', title: 'Religion Rebelion', file: 'religion_rebelion.mp3',
    act: 'La señal', actNumber: 2,
    territory: 'Rediseño interior', mood: 'Mutación personal',
    corePhrase: 'Cada fe tiene su rebelión pendiente.',
    guideColor: '#6D28D9',
  },
  {
    id: '7', title: 'Tu misterio', file: 'tu_misterio.mp3',
    act: 'La señal', actNumber: 2,
    territory: 'Oscuridad íntima', mood: 'Ansiedad contenida',
    corePhrase: 'Lo que no entiendes de alguien te transforma.',
    guideColor: '#6D28D9',
  },
  {
    id: '8', title: 'Fluido temporal', file: 'fluido_temporal.mp3',
    act: 'La memoria natural', actNumber: 3,
    territory: 'Tiempo alterado', mood: 'Memoria + Evolución',
    corePhrase: 'El tiempo no avanza: muta.',
    guideColor: '#B88945',
  },
  {
    id: '9', title: 'Murmullos', file: 'murmullos.mp3',
    act: 'La memoria natural', actNumber: 3,
    territory: 'Oscuridad íntima', mood: 'Memoria + Sombra',
    corePhrase: 'Lo que callas sigue sonando por dentro.',
    guideColor: '#B88945',
  },
  {
    id: '10', title: 'Otro Infinito', file: 'otro_infinito.mp3',
    act: 'La memoria natural', actNumber: 3,
    territory: 'Deseo imposible', mood: 'Cuerpo + Memoria',
    corePhrase: 'El infinito no está arriba: está entre dos cuerpos.',
    guideColor: '#B88945',
  },
  {
    id: '11', title: 'Memoria Natural', file: 'memoria_natural.mp3',
    act: 'La memoria natural', actNumber: 3,
    territory: 'Memoria', mood: 'Sistema activo',
    corePhrase: 'Lo que permanece no se recuerda: transmite.',
    guideColor: '#B88945',
  },
];
