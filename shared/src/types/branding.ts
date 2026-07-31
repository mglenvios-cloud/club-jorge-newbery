export interface TenantBranding {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  backgroundColor?: string;
  textColor?: string;
  logoUrl?: string;
  shieldUrl?: string;
  faviconUrl?: string;
  fontFamily?: string;
  customCss?: string;
  address?: string;
  phone?: string;
  email?: string;
  website?: string;
  shortName?: string;
  sigla?: string;
}

export const DEFAULT_BRANDING: TenantBranding = {
  primaryColor: '#0055a5', // Newbery Blue
  secondaryColor: '#0f172a',
  accentColor: '#e11d48', // Newbery Red / Accent
  backgroundColor: '#0b0f17',
  textColor: '#f8fafc',
  logoUrl: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=200&h=200&fit=crop',
  shieldUrl: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=200&h=200&fit=crop',
  fontFamily: 'Inter, sans-serif',
  address: 'Alpatacal 3026, Villa Devoto, CABA',
  phone: '+54 11 4501-0000',
  email: 'contacto@jorgenewbery.org.ar',
  website: 'https://jorgenewbery.org.ar',
  shortName: 'Jorge Newbery',
  sigla: 'JN',
};
