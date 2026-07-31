import { Router, Response } from 'express';
import { TenantRequest } from '../middleware/tenant.middleware';
import { prisma } from '../config/prisma';

const router = Router();

// GET /api/tenant/facilities - List all facilities
router.get('/', async (req: TenantRequest, res: Response) => {
  try {
    const tenantId = req.tenantId || 'tenant-default-001';
    const facilities = await prisma.facility.findMany({
      where: { tenantId },
      orderBy: { createdAt: 'desc' },
    });
    return res.json({ success: true, data: facilities });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message || 'Error al obtener instalaciones' });
  }
});

// POST /api/tenant/facilities - Create new facility
router.post('/', async (req: TenantRequest, res: Response) => {
  try {
    const tenantId = req.tenantId || 'tenant-default-001';
    const { name, sport, surface, pricePerHour, isLightingAvailable, lightingPriceExtra, openingHours } = req.body;

    if (!name || !sport) {
      return res.status(400).json({ success: false, error: 'El nombre y el deporte son requeridos' });
    }

    const facility = await prisma.facility.create({
      data: {
        tenantId,
        name,
        sport,
        surface: surface || null,
        pricePerHour: Number(pricePerHour) || 0,
        isLightingAvailable: Boolean(isLightingAvailable),
        lightingPriceExtra: Number(lightingPriceExtra) || 0,
        openingHours: openingHours || '08:00 - 23:00',
        status: 'ACTIVE',
      },
    });

    return res.status(201).json({ success: true, data: facility });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message || 'Error al crear instalación' });
  }
});

// PUT /api/tenant/facilities/:id - Update facility
router.put('/:id', async (req: TenantRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { name, sport, surface, pricePerHour, isLightingAvailable, lightingPriceExtra, status, openingHours } = req.body;

    const updated = await prisma.facility.update({
      where: { id },
      data: {
        ...(name && { name }),
        ...(sport && { sport }),
        ...(surface !== undefined && { surface }),
        ...(pricePerHour !== undefined && { pricePerHour: Number(pricePerHour) }),
        ...(isLightingAvailable !== undefined && { isLightingAvailable: Boolean(isLightingAvailable) }),
        ...(lightingPriceExtra !== undefined && { lightingPriceExtra: Number(lightingPriceExtra) }),
        ...(status && { status }),
        ...(openingHours && { openingHours }),
      },
    });

    return res.json({ success: true, data: updated });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message || 'Error al actualizar instalación' });
  }
});

// DELETE /api/tenant/facilities/:id - Delete facility
router.delete('/:id', async (req: TenantRequest, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.facility.delete({ where: { id } });
    return res.json({ success: true, message: 'Instalación eliminada correctamente' });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message || 'Error al eliminar instalación' });
  }
});

// GET /api/tenant/facilities/bookings - List court bookings
router.get('/bookings', async (req: TenantRequest, res: Response) => {
  try {
    const tenantId = req.tenantId || 'tenant-default-001';
    const { date, facilityId, memberId } = req.query;

    const where: any = { tenantId };
    if (date) where.date = String(date);
    if (facilityId) where.facilityId = String(facilityId);
    if (memberId) where.memberId = String(memberId);

    const bookings = await prisma.courtBooking.findMany({
      where,
      include: { facility: true },
      orderBy: [{ date: 'asc' }, { startTime: 'asc' }],
    });

    return res.json({ success: true, data: bookings });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message || 'Error al obtener reservas' });
  }
});

// POST /api/tenant/facilities/bookings - Create court booking with overlap check
router.post('/bookings', async (req: TenantRequest, res: Response) => {
  try {
    const tenantId = req.tenantId || 'tenant-default-001';
    const { facilityId, memberId, memberName, memberDni, date, startTime, endTime, totalPrice } = req.body;

    if (!facilityId || !memberId || !date || !startTime || !endTime) {
      return res.status(400).json({ success: false, error: 'Faltan datos obligatorios para realizar la reserva' });
    }

    // Check overlap
    const existing = await prisma.courtBooking.findFirst({
      where: {
        tenantId,
        facilityId,
        date,
        status: 'CONFIRMED',
        OR: [
          {
            startTime: { lte: startTime },
            endTime: { gt: startTime },
          },
          {
            startTime: { lt: endTime },
            endTime: { gte: endTime },
          },
          {
            startTime: { gte: startTime },
            endTime: { lte: endTime },
          },
        ],
      },
    });

    if (existing) {
      return res.status(400).json({ success: false, error: 'El turno elegido ya se encuentra reservado' });
    }

    const booking = await prisma.courtBooking.create({
      data: {
        tenantId,
        facilityId,
        memberId,
        memberName: memberName || 'Socio Club Jorge Newbery',
        memberDni: memberDni || '00000000',
        date,
        startTime,
        endTime,
        totalPrice: Number(totalPrice) || 0,
        paymentStatus: 'PAID',
        status: 'CONFIRMED',
      },
      include: { facility: true },
    });

    return res.status(201).json({ success: true, data: booking });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message || 'Error al procesar reserva' });
  }
});

// DELETE /api/tenant/facilities/bookings/:id - Cancel booking
router.delete('/bookings/:id', async (req: TenantRequest, res: Response) => {
  try {
    const { id } = req.params;
    const updated = await prisma.courtBooking.update({
      where: { id },
      data: { status: 'CANCELLED', paymentStatus: 'CANCELLED' },
    });
    return res.json({ success: true, data: updated, message: 'Reserva cancelada' });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message || 'Error al cancelar reserva' });
  }
});

export default router;
