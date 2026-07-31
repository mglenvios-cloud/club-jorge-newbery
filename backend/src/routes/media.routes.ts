import { Router, Response } from 'express';
import { TenantRequest } from '../middleware/tenant.middleware';
import { authenticateJwt } from '../middleware/auth.middleware';
import { MediaContent, GenerateMatchArticleInput, GenerateSocialPostsInput } from '@club-digital-pro/shared';
import { MediaAIService } from '../services/mediaAI.service';

const router = Router();

// Mock Media Database
const mockMediaContents: MediaContent[] = [
  {
    id: 'med-101',
    tenantId: 'tenant-default-001',
    title: 'Victoria Histórica en el Clásico Interclubes',
    description: 'Excelente actuación con triunfos contundentes en todas las categorías.',
    type: 'ARTICLE',
    category: 'Deportes',
    discipline: 'Fútbol',
    url: '#',
    thumbnail: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&h=450&fit=crop',
    tags: ['Fútbol', 'Primera', 'Victoria'],
    aiGenerated: true,
    createdAt: new Date('2026-07-20'),
  },
  {
    id: 'med-102',
    tenantId: 'tenant-default-001',
    title: 'Recibo Oficial & Memoria Anual 2025 (PDF)',
    description: 'Documento oficial presentado en la última asamblea de socios.',
    type: 'DOCUMENT',
    category: 'Institucional',
    url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    tags: ['Asamblea', 'Memoria', 'PDF'],
    aiGenerated: false,
    createdAt: new Date('2026-06-15'),
  },
  {
    id: 'med-103',
    tenantId: 'tenant-default-001',
    title: 'Equipo Campeón del Año 1978 (Archivo Histórico)',
    description: 'Fotografía histórica digitalizada en alta resolución de nuestro museo digital.',
    type: 'PHOTO',
    category: 'Histórico',
    discipline: 'Básquet',
    season: '1978',
    url: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800&h=450&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800&h=450&fit=crop',
    tags: ['Museo', 'Leyendas', 'Campeones'],
    aiGenerated: false,
    isHistorical: true,
    createdAt: new Date('2026-05-10'),
  },
];

// GET /api/tenant/media - List media contents with type & category filtering
router.get('/', authenticateJwt, (req: TenantRequest, res: Response) => {
  const { type, category, isHistorical } = req.query;
  let filtered = mockMediaContents;

  if (type && type !== 'ALL') {
    filtered = filtered.filter((m) => m.type === type);
  }
  if (category && category !== 'ALL') {
    filtered = filtered.filter((m) => m.category === category);
  }
  if (isHistorical === 'true') {
    filtered = filtered.filter((m) => m.isHistorical === true);
  }

  return res.json({ success: true, data: filtered });
});

// POST /api/tenant/media - Create content
router.post('/', authenticateJwt, (req: TenantRequest, res: Response) => {
  const body = req.body;
  if (!body.title || !body.type) {
    return res.status(400).json({ success: false, error: 'Título y tipo de contenido son requeridos.' });
  }

  const created: MediaContent = {
    id: `med-${Date.now()}`,
    tenantId: req.tenantId || 'tenant-default-001',
    title: body.title,
    description: body.description || '',
    type: body.type,
    category: body.category || 'General',
    discipline: body.discipline,
    season: body.season,
    url: body.url || '#',
    thumbnail: body.thumbnail || 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&h=450&fit=crop',
    tags: body.tags || [],
    aiGenerated: !!body.aiGenerated,
    isHistorical: !!body.isHistorical,
    createdAt: new Date(),
  };

  mockMediaContents.unshift(created);
  return res.status(201).json({ success: true, data: created });
});

// POST /api/tenant/media/ai/generate-article - AI Content Engine
router.post('/ai/generate-article', authenticateJwt, async (req: TenantRequest, res: Response) => {
  const input: GenerateMatchArticleInput = req.body;

  if (!input.matchTitle || !input.resultScore) {
    return res.status(400).json({ success: false, error: 'Por favor complete el título del partido y el resultado.' });
  }

  const article = await MediaAIService.generateMatchArticle(input);
  const social = await MediaAIService.generateSocialPosts({
    articleTitle: article.headline,
    keyHighlights: input.keyNotes,
  });

  return res.json({
    success: true,
    data: {
      article,
      social,
    },
  });
});

export default router;
