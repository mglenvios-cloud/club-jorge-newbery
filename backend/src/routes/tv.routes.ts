import { Router, Response } from 'express';
import { TenantRequest } from '../middleware/tenant.middleware';
import { authenticateJwt } from '../middleware/auth.middleware';
import { TvStream, MediaItem, SponsorAd } from '@club-digital-pro/shared';

const router = Router();

// Mock Data for Club TV Module
const mockStreams: TvStream[] = [
  {
    id: 'stream-1',
    tenantId: 'tenant-default-001',
    title: 'Gran Clásico Interclubes — Primera División',
    description: 'Transmisión en vivo con relatos oficiales y estadísticas en tiempo real.',
    sourceType: 'OBS',
    streamUrl: 'https://www.youtube.com/watch?v=live-demo-1',
    embedUrl: 'https://www.youtube.com/embed/live-demo-1',
    status: 'LIVE',
    viewerCount: 1420,
    thumbnailUrl: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&h=450&fit=crop',
    category: 'Deportes',
    createdAt: new Date(),
  },
  {
    id: 'stream-2',
    tenantId: 'tenant-default-001',
    title: 'Conferencia de Prensa & Lanzamiento de la Temporada',
    description: 'Presentación de nuevos refuerzos y renovaciones del plantel.',
    sourceType: 'YOUTUBE',
    streamUrl: 'https://www.youtube.com/watch?v=press-demo-2',
    embedUrl: 'https://www.youtube.com/embed/press-demo-2',
    status: 'FINISHED',
    viewerCount: 3890,
    thumbnailUrl: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800&h=450&fit=crop',
    category: 'Institucional',
    createdAt: new Date('2026-07-15'),
  },
];

const mockMedia: MediaItem[] = [
  {
    id: 'med-1',
    tenantId: 'tenant-default-001',
    title: 'Resumen Semanal de Goles y Mejores Jugadas',
    description: 'Los momentos más destacados del fin de semana deportivo.',
    fileType: 'VIDEO',
    fileUrl: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&h=450&fit=crop',
    thumbnailUrl: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&h=450&fit=crop',
    category: 'Resúmenes',
    tags: ['Fútbol', 'Goles', 'Primera'],
    views: 5400,
    createdAt: new Date('2026-07-19'),
  },
  {
    id: 'med-2',
    tenantId: 'tenant-default-001',
    title: 'Galería Fotográfica Inauguración Canchas de Pádel',
    description: 'Cobertura fotográfica en alta definición.',
    fileType: 'PHOTO',
    fileUrl: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800&h=450&fit=crop',
    thumbnailUrl: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800&h=450&fit=crop',
    category: 'Galerías',
    tags: ['Pádel', 'Obras'],
    views: 1200,
    createdAt: new Date('2026-07-10'),
  },
];

const mockAds: SponsorAd[] = [
  {
    id: 'ad-1',
    tenantId: 'tenant-default-001',
    sponsorName: 'Banco Macro Pro',
    logoUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=300&h=100&fit=crop',
    position: 'BANNER',
    targetUrl: 'https://banco.example.com',
    impressions: 14500,
    clicks: 680,
    isActive: true,
  },
  {
    id: 'ad-2',
    tenantId: 'tenant-default-001',
    sponsorName: 'SportWear Argentina',
    logoUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=300&h=100&fit=crop',
    position: 'PREROLL',
    targetUrl: 'https://sportwear.example.com',
    impressions: 8900,
    clicks: 410,
    isActive: true,
  },
];

// GET /api/tenant/tv/streams - List streams
router.get('/streams', authenticateJwt, (_req: TenantRequest, res: Response) => {
  return res.json({ success: true, data: mockStreams });
});

// POST /api/tenant/tv/streams - Create stream
router.post('/streams', authenticateJwt, (req: TenantRequest, res: Response) => {
  const { title, description, sourceType, streamUrl, category } = req.body;
  if (!title || !streamUrl) {
    return res.status(400).json({ success: false, error: 'Título y URL de transmisión son requeridos.' });
  }

  const newStream: TvStream = {
    id: `stream-${Date.now()}`,
    tenantId: req.tenantId || 'tenant-default-001',
    title,
    description: description || '',
    sourceType: sourceType || 'YOUTUBE',
    streamUrl,
    embedUrl: streamUrl,
    status: 'LIVE',
    viewerCount: 1,
    thumbnailUrl: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&h=450&fit=crop',
    category: category || 'Institucional',
    createdAt: new Date(),
  };

  mockStreams.unshift(newStream);
  return res.status(201).json({ success: true, data: newStream });
});

// GET /api/tenant/tv/media - List media items
router.get('/media', authenticateJwt, (_req: TenantRequest, res: Response) => {
  return res.json({ success: true, data: mockMedia });
});

// GET /api/tenant/tv/ads - List sponsor ads
router.get('/ads', authenticateJwt, (_req: TenantRequest, res: Response) => {
  return res.json({ success: true, data: mockAds });
});

export default router;
