import { Router, Response } from 'express';
import { TenantRequest } from '../middleware/tenant.middleware';
import { prisma } from '../config/prisma';

const router = Router();

// GET /api/tenant/notifications - List notifications
router.get('/', async (req: TenantRequest, res: Response) => {
  try {
    const tenantId = req.tenantId || 'tenant-default-001';
    const notifications = await prisma.notification.findMany({
      where: { tenantId },
      orderBy: { createdAt: 'desc' },
      take: 50,
    });
    return res.json({ success: true, data: notifications });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message || 'Error al obtener notificaciones' });
  }
});

// POST /api/tenant/notifications - Create notification
router.post('/', async (req: TenantRequest, res: Response) => {
  try {
    const tenantId = req.tenantId || 'tenant-default-001';
    const { title, message, targetType, targetId, type, linkUrl } = req.body;

    if (!title || !message) {
      return res.status(400).json({ success: false, error: 'Título y mensaje son requeridos' });
    }

    const notification = await prisma.notification.create({
      data: {
        tenantId,
        title,
        message,
        targetType: targetType || 'ALL',
        targetId: targetId || null,
        type: type || 'INFO',
        linkUrl: linkUrl || null,
        isRead: false,
      },
    });

    return res.status(201).json({ success: true, data: notification });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message || 'Error al enviar notificación' });
  }
});

// POST /api/tenant/notifications/read-all - Mark all as read
router.post('/read-all', async (req: TenantRequest, res: Response) => {
  try {
    const tenantId = req.tenantId || 'tenant-default-001';
    await prisma.notification.updateMany({
      where: { tenantId, isRead: false },
      data: { isRead: true },
    });
    return res.json({ success: true, message: 'Todas las notificaciones marcadas como leídas' });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message || 'Error al actualizar notificaciones' });
  }
});

export default router;
