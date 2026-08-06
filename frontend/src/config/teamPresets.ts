export interface TeamConfig {
  id: string;
  name: string;
  shortName: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  fontSize: number;
  shieldUrl: string;
  shieldShape: 'classic' | 'round' | 'crest' | 'diamond' | 'octagon' | 'hexagon' | 'star' | 'badge';
  backgroundColor?: string;
  objectScale?: number;
}

export const PRESET_CLUBS: TeamConfig[] = [
  {
    id: 'pinocho',
    name: 'Club Atlético Pinocho',
    shortName: 'PINOCHO',
    primaryColor: '#16a34a', // Verde Pinocho
    secondaryColor: '#ffffff', // Blanco
    accentColor: '#09090b', // Negro
    fontSize: 38,
    shieldUrl: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 120"><path d="M50 5 L90 25 L90 75 L50 115 L10 75 L10 25 Z" fill="%2316a34a" stroke="%23ffffff" stroke-width="4"/><path d="M50 15 L80 32 L80 70 L50 102 L20 70 L20 32 Z" fill="%23ffffff"/><text x="50" y="55" font-size="28" font-weight="900" fill="%2316a34a" text-anchor="middle" font-family="sans-serif">P</text><text x="50" y="80" font-size="12" font-weight="bold" fill="%2309090b" text-anchor="middle" font-family="sans-serif">PINOCHO</text></svg>',
    shieldShape: 'crest',
    backgroundColor: '#040406',
    objectScale: 1.0,
  },
  {
    id: 'jorge-newbery',
    name: 'Club Atlético Jorge Newbery',
    shortName: 'NEWBERY',
    primaryColor: '#dc2626', // Rojo Newbery
    secondaryColor: '#ffffff', // Blanco
    accentColor: '#09090b', // Negro
    fontSize: 36,
    shieldUrl: '/shield.png',
    shieldShape: 'classic',
    backgroundColor: '#040406',
    objectScale: 1.0,
  },
  {
    id: '17-agosto',
    name: 'CSD 17 de Agosto',
    shortName: '17 DE AGOSTO',
    primaryColor: '#15803d', // Verde 17
    secondaryColor: '#ffffff', // Blanco
    accentColor: '#b91c1c', // Rojo
    fontSize: 32,
    shieldUrl: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 120"><circle cx="50" cy="60" r="45" fill="%2315803d" stroke="%23b91c1c" stroke-width="4"/><circle cx="50" cy="60" r="35" fill="%23ffffff"/><text x="50" y="60" font-size="24" font-weight="900" fill="%2315803d" text-anchor="middle" font-family="sans-serif">17</text><text x="50" y="80" font-size="10" font-weight="bold" fill="%23b91c1c" text-anchor="middle" font-family="sans-serif">AGOSTO</text></svg>',
    shieldShape: 'round',
    backgroundColor: '#040406',
    objectScale: 1.0,
  },
  {
    id: 'kimberley',
    name: 'Club Atlético Kimberley',
    shortName: 'KIMBERLEY',
    primaryColor: '#2563eb', // Azul
    secondaryColor: '#ffffff', // Blanco
    accentColor: '#1e293b', // Marino
    fontSize: 34,
    shieldUrl: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 120"><polygon points="50,5 95,60 50,115 5,60" fill="%232563eb" stroke="%23ffffff" stroke-width="4"/><text x="50" y="66" font-size="30" font-weight="900" fill="%23ffffff" text-anchor="middle" font-family="sans-serif">K</text></svg>',
    shieldShape: 'diamond',
    backgroundColor: '#040406',
    objectScale: 1.0,
  },
  {
    id: 'san-lorenzo',
    name: 'San Lorenzo Futsal',
    shortName: 'SAN LORENZO',
    primaryColor: '#0284c7', // Azul Grana
    secondaryColor: '#dc2626', // Rojo Grana
    accentColor: '#ffffff', // Blanco
    fontSize: 32,
    shieldUrl: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 120"><path d="M50 5 L90 25 L90 75 L50 115 L10 75 L10 25 Z" fill="%230284c7" stroke="%23ffffff" stroke-width="4"/><path d="M50 15 L80 32 L80 70 L50 102 L20 70 L20 32 Z" fill="%23dc2626"/><text x="50" y="65" font-size="28" font-weight="900" fill="%23ffffff" text-anchor="middle" font-family="sans-serif">CASLA</text></svg>',
    shieldShape: 'badge',
    backgroundColor: '#040406',
    objectScale: 1.0,
  },
];
