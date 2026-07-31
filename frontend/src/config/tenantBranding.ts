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
  tagline: 'Futsal Primera AFA, Inferiores & Centro de Gestión Deportiva',
  location: 'Villa Devoto, Buenos Aires',
  primaryColor: '#dc2626',
  secondaryColor: '#0a0a0a',
  accentColor: '#ffffff',
  darkBgColor: '#0a0a0a',
  shieldUrl: '/shield.png',
  hero3D: {
    stadiumName: 'Estadio Jorge Newbery Nocturno',
    ambientLightColor: '#1a0505',
    spotLightColor: '#dc2626',
    particlesColor: '#ef4444',
    enableParticles: true,
  },
};
