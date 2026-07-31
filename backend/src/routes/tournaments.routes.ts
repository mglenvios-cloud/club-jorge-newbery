import { Router, Response } from 'express';
import { TenantRequest } from '../middleware/tenant.middleware';
import { prisma } from '../config/prisma';

const router = Router();

// GET /api/tenant/sports/tournaments - List tournaments
router.get('/', async (req: TenantRequest, res: Response) => {
  try {
    const tenantId = req.tenantId || 'tenant-default-001';
    const tournaments = await prisma.tournament.findMany({
      where: { tenantId },
      include: {
        standings: {
          orderBy: [{ points: 'desc' }, { goalDiff: 'desc' }, { goalsFor: 'desc' }],
        },
      },
      orderBy: { createdAt: 'desc' },
    });
    return res.json({ success: true, data: tournaments });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message || 'Error al obtener torneos' });
  }
});

// GET /api/tenant/sports/tournaments/:id - Single tournament
router.get('/:id', async (req: TenantRequest, res: Response) => {
  try {
    const { id } = req.params;
    const tournament = await prisma.tournament.findUnique({
      where: { id },
      include: {
        standings: {
          orderBy: [{ points: 'desc' }, { goalDiff: 'desc' }],
        },
      },
    });

    if (!tournament) {
      return res.status(404).json({ success: false, error: 'Torneo no encontrado' });
    }

    return res.json({ success: true, data: tournament });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message || 'Error al obtener detalle del torneo' });
  }
});

// POST /api/tenant/sports/tournaments - Create tournament
router.post('/', async (req: TenantRequest, res: Response) => {
  try {
    const tenantId = req.tenantId || 'tenant-default-001';
    const { name, sport, season, category, startDate, endDate, teams } = req.body;

    if (!name || !sport || !season || !category) {
      return res.status(400).json({ success: false, error: 'Nombre, deporte, temporada y categoría son obligatorios' });
    }

    const tournament = await prisma.tournament.create({
      data: {
        tenantId,
        name,
        sport,
        season,
        category,
        startDate: startDate || new Date().toISOString().split('T')[0],
        endDate: endDate || null,
        status: 'ACTIVE',
      },
    });

    // If teams provided, initialize standings
    if (Array.isArray(teams) && teams.length > 0) {
      const standingsData = teams.map((teamName: string, idx: number) => ({
        tournamentId: tournament.id,
        tenantId,
        teamName,
        played: 0,
        won: 0,
        drawn: 0,
        lost: 0,
        goalsFor: 0,
        goalsAgainst: 0,
        goalDiff: 0,
        points: 0,
        position: idx + 1,
      }));

      await prisma.tournamentStanding.createMany({
        data: standingsData,
      });
    }

    const fullTournament = await prisma.tournament.findUnique({
      where: { id: tournament.id },
      include: { standings: true },
    });

    return res.status(201).json({ success: true, data: fullTournament });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message || 'Error al crear torneo' });
  }
});

// PUT /api/tenant/sports/tournaments/:id/standings - Update team standing
router.put('/:id/standings', async (req: TenantRequest, res: Response) => {
  try {
    const { id: tournamentId } = req.params;
    const { teamName, played, won, drawn, lost, goalsFor, goalsAgainst } = req.body;

    if (!teamName) {
      return res.status(400).json({ success: false, error: 'Nombre de equipo requerido' });
    }

    const p = Number(played) || 0;
    const w = Number(won) || 0;
    const d = Number(drawn) || 0;
    const l = Number(lost) || 0;
    const gf = Number(goalsFor) || 0;
    const ga = Number(goalsAgainst) || 0;
    const gd = gf - ga;
    const pts = (w * 3) + (d * 1);

    const existingStanding = await prisma.tournamentStanding.findFirst({
      where: { tournamentId, teamName },
    });

    if (existingStanding) {
      await prisma.tournamentStanding.update({
        where: { id: existingStanding.id },
        data: { played: p, won: w, drawn: d, lost: l, goalsFor: gf, goalsAgainst: ga, goalDiff: gd, points: pts },
      });
    } else {
      const tenantId = req.tenantId || 'tenant-default-001';
      await prisma.tournamentStanding.create({
        data: {
          tournamentId,
          tenantId,
          teamName,
          played: p,
          won: w,
          drawn: d,
          lost: l,
          goalsFor: gf,
          goalsAgainst: ga,
          goalDiff: gd,
          points: pts,
          position: 1,
        },
      });
    }

    // Re-calculate positions
    const allStandings = await prisma.tournamentStanding.findMany({
      where: { tournamentId },
      orderBy: [{ points: 'desc' }, { goalDiff: 'desc' }, { goalsFor: 'desc' }],
    });

    for (let i = 0; i < allStandings.length; i++) {
      await prisma.tournamentStanding.update({
        where: { id: allStandings[i].id },
        data: { position: i + 1 },
      });
    }

    const updatedTournament = await prisma.tournament.findUnique({
      where: { id: tournamentId },
      include: {
        standings: {
          orderBy: [{ position: 'asc' }],
        },
      },
    });

    return res.json({ success: true, data: updatedTournament });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message || 'Error al actualizar posiciones del torneo' });
  }
});

// DELETE /api/tenant/sports/tournaments/:id - Delete tournament
router.delete('/:id', async (req: TenantRequest, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.tournament.delete({ where: { id } });
    return res.json({ success: true, message: 'Torneo eliminado correctamente' });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message || 'Error al eliminar torneo' });
  }
});

export default router;
