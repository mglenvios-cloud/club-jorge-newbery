export interface TenantBranding {
  id: string;
  name: string;
  shortName: string;
  tagline: string;
  location: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  darkBgColor: string;
  shieldUrl?: string;
  hero3D: {
    stadiumName: string;
    ambientLightColor: string;
    spotLightColor: string;
    particlesColor: string;
    enableParticles: boolean;
  };
}

export const defaultJorgeNewberyBranding: TenantBranding = {
  id: 'cajn-devoto',
  name: 'Club Atlético Jorge Newbery',
  shortName: 'CAJN',
  tagline: 'Plataforma Oficial de Gestión e Inteligencia Deportiva',
  location: 'Villa Devoto, Buenos Aires',
  primaryColor: '#0055a5',
  secondaryColor: '#002244',
  accentColor: '#38bdf8',
  darkBgColor: '#030712',
  hero3D: {
    stadiumName: 'Estadio Jorge Newbery Nocturno',
    ambientLightColor: '#0a192f',
    spotLightColor: '#38bdf8',
    particlesColor: '#60a5fa',
    enableParticles: true,
  },
};
