import { Router, Response } from 'express';
import { TenantRequest } from '../middleware/tenant.middleware';
import { authenticateJwt } from '../middleware/auth.middleware';
import { Discipline, AthleteProfile, SportsTraining, SportsMatch } from '@club-digital-pro/shared';

const router = Router();

// Mock Data for Sports Module
const mockDisciplines: Discipline[] = [
  { id: 'disc-1', tenantId: 'tenant-default-001', name: 'Fútbol Masculino', code: 'FUT-MASC', icon: 'Trophy', categoriesCount: 4, athletesCount: 85 },
  { id: 'disc-2', tenantId: 'tenant-default-001', name: 'Básquet', code: 'BASQUET', icon: 'Activity', categoriesCount: 3, athletesCount: 42 },
  { id: 'disc-3', tenantId: 'tenant-default-001', name: 'Hockey Femenino', code: 'HOCKEY-FEM', icon: 'Shield', categoriesCount: 3, athletesCount: 38 },
  { id: 'disc-4', tenantId: 'tenant-default-001', name: 'Natación', code: 'NATACION', icon: 'Waves', categoriesCount: 2, athletesCount: 24 },
];

const mockAthletes: AthleteProfile[] = [
  {
    id: 'ath-001',
    tenantId: 'tenant-default-001',
    disciplineId: 'disc-1',
    disciplineName: 'Fútbol Masculino',
    categoryId: 'cat-1',
    categoryName: 'Primera División',
    firstName: 'Emiliano',
    lastName: 'Ríos',
    dni: '38.990.120',
    staffRole: 'JUGADOR',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop',
    heightCm: 182,
    weightKg: 78,
    preferredFoot: 'DIESTRO',
    position: 'Delantero Centro',
    jerseyNumber: 9,
    medicalValid: true,
    medicalExpires: '2026-12-31',
    emergencyContactName: 'Carlos Ríos',
    emergencyContactPhone: '+54 9 11 4455-6677',
    stats: { goals: 12, assists: 4, yellowCards: 2, redCards: 0, minutesPlayed: 1080, matchesPlayed: 14 },
    createdAt: new Date('2024-01-10'),
  },
  {
    id: 'ath-002',
    tenantId: 'tenant-default-001',
    disciplineId: 'disc-2',
    disciplineName: 'Básquet',
    categoryId: 'cat-2',
    categoryName: 'Sub 20',
    firstName: 'Lucas',
    lastName: 'Valenzuela',
    dni: '44.120.330',
    staffRole: 'JUGADOR',
    avatarUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&h=200&fit=crop',
    heightCm: 195,
    weightKg: 85,
    preferredFoot: 'DIESTRO',
    position: 'Base / Alero',
    jerseyNumber: 7,
    medicalValid: false,
    medicalExpires: '2026-06-30',
    emergencyContactName: 'Laura Valenzuela',
    emergencyContactPhone: '+54 9 11 8899-0011',
    stats: { goals: 84, assists: 22, yellowCards: 1, redCards: 0, minutesPlayed: 450, matchesPlayed: 10 },
    createdAt: new Date('2024-02-15'),
  },
];

const mockMatches: SportsMatch[] = [
  {
    id: 'mat-001',
    tenantId: 'tenant-default-001',
    disciplineId: 'disc-1',
    disciplineName: 'Fútbol Masculino',
    categoryId: 'cat-1',
    categoryName: 'Primera División',
    opponentName: 'Atlético Deportivo Norte',
    isHome: true,
    location: 'Estadio Principal Sede Central',
    date: '2026-07-25',
    time: '15:30',
    status: 'SCHEDULED',
    refereeName: 'Marcos Maidana',
    squadCount: 18,
  },
  {
    id: 'mat-002',
    tenantId: 'tenant-default-001',
    disciplineId: 'disc-2',
    disciplineName: 'Básquet',
    categoryId: 'cat-2',
    categoryName: 'Sub 20',
    opponentName: 'Sportivo Italiano',
    isHome: false,
    location: 'Gimnasio Visitante',
    date: '2026-07-18',
    time: '19:00',
    scoreHome: 78,
    scoreAway: 82,
    status: 'FINISHED',
    squadCount: 12,
  },
];

// GET /api/tenant/sports/disciplines - List disciplines
router.get('/disciplines', authenticateJwt, (_req: TenantRequest, res: Response) => {
  return res.json({ success: true, data: mockDisciplines });
});

// POST /api/tenant/sports/disciplines - Create discipline
router.post('/disciplines', authenticateJwt, (req: TenantRequest, res: Response) => {
  const { name, code, icon } = req.body;
  if (!name || !code) {
    return res.status(400).json({ success: false, error: 'Nombre y código son requeridos.' });
  }

  const newDisc: Discipline = {
    id: `disc-${Date.now()}`,
    tenantId: req.tenantId || 'tenant-default-001',
    name,
    code,
    icon: icon || 'Trophy',
    categoriesCount: 0,
    athletesCount: 0,
  };

  mockDisciplines.push(newDisc);
  return res.status(201).json({ success: true, data: newDisc });
});

// GET /api/tenant/sports/athletes - List athletes
router.get('/athletes', authenticateJwt, (req: TenantRequest, res: Response) => {
  const { disciplineId, query } = req.query;
  let filtered = mockAthletes;

  if (disciplineId && disciplineId !== 'ALL') {
    filtered = filtered.filter((a) => a.disciplineId === disciplineId);
  }
  if (query) {
    const q = (query as string).toLowerCase();
    filtered = filtered.filter(
      (a) =>
        a.firstName.toLowerCase().includes(q) ||
        a.lastName.toLowerCase().includes(q) ||
        a.dni.includes(q)
    );
  }

  return res.json({ success: true, data: filtered });
});

// POST /api/tenant/sports/athletes - Create athlete
router.post('/athletes', authenticateJwt, (req: TenantRequest, res: Response) => {
  const body = req.body;
  if (!body.firstName || !body.lastName) {
    return res.status(400).json({ success: false, error: 'Nombre y apellido son obligatorios.' });
  }

  const newAthlete: AthleteProfile = {
    id: `ath-${Date.now()}`,
    tenantId: req.tenantId || 'tenant-default-001',
    disciplineId: body.disciplineId || 'disc-1',
    disciplineName: body.disciplineName || 'Futsal AFA',
    categoryId: body.categoryId || 'cat-1',
    categoryName: body.categoryName || 'Primera',
    firstName: body.firstName,
    lastName: body.lastName,
    dni: body.dni || 'S/D',
    staffRole: body.staffRole || 'JUGADOR',
    avatarUrl: body.avatarUrl || 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop',
    heightCm: body.heightCm ? Number(body.heightCm) : 175,
    weightKg: body.weightKg ? Number(body.weightKg) : 70,
    preferredFoot: body.preferredFoot || 'DIESTRO',
    position: body.position || 'Pivot',
    jerseyNumber: body.jerseyNumber ? Number(body.jerseyNumber) : 10,
    medicalValid: body.medicalValid !== undefined ? body.medicalValid : true,
    medicalExpires: body.medicalExpires || '2026-12-31',
    emergencyContactName: body.emergencyContactName || '',
    emergencyContactPhone: body.emergencyContactPhone || '',
    stats: body.stats || { goals: 0, assists: 0, yellowCards: 0, redCards: 0, minutesPlayed: 0, matchesPlayed: 0 },
    createdAt: new Date(),
  };

  mockAthletes.unshift(newAthlete);
  return res.status(201).json({ success: true, data: newAthlete });
});

// GET /api/tenant/sports/matches - List matches
router.get('/matches', authenticateJwt, (_req: TenantRequest, res: Response) => {
  return res.json({ success: true, data: mockMatches });
});

export default router;

