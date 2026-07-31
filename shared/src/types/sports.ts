export interface Discipline {
  id: string;
  tenantId: string;
  name: string;
  code: string;
  icon: string;
  categoriesCount: number;
  athletesCount: number;
}

export interface SportCategory {
  id: string;
  tenantId: string;
  disciplineId: string;
  name: string;
  minAge?: number;
  maxAge?: number;
}

export interface AthleteStats {
  goals: number;
  assists: number;
  yellowCards: number;
  redCards: number;
  minutesPlayed: number;
  matchesPlayed: number;
}

export type StaffRole = 'JUGADOR' | 'ENTRENADOR' | 'PREPARADOR_FISICO' | 'MEDICO' | 'UTILERO' | 'ASISTENTE';

export interface AthleteProfile {
  id: string;
  tenantId: string;
  disciplineId: string;
  disciplineName: string;
  categoryId: string;
  categoryName: string;
  firstName: string;
  lastName: string;
  dni: string;
  staffRole: StaffRole;
  avatarUrl?: string;
  heightCm?: number;
  weightKg?: number;
  preferredFoot?: 'DIESTRO' | 'ZURDO' | 'AMBIDIESTRO';
  position?: string;
  jerseyNumber?: number;
  medicalValid: boolean;
  medicalExpires: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  observations?: string;
  stats: AthleteStats;
  createdAt: Date;
}

export interface SportsTraining {
  id: string;
  tenantId: string;
  disciplineId: string;
  categoryId: string;
  title: string;
  location: string;
  date: string;
  startTime: string;
  endTime: string;
  attendanceCount: number;
  totalAthletes: number;
}

export type MatchStatus = 'SCHEDULED' | 'FINISHED' | 'POSTPONED';

export interface SportsMatch {
  id: string;
  tenantId: string;
  disciplineId: string;
  disciplineName: string;
  categoryId: string;
  categoryName: string;
  opponentName: string;
  isHome: boolean;
  location: string;
  date: string;
  time: string;
  scoreHome?: number;
  scoreAway?: number;
  status: MatchStatus;
  refereeName?: string;
  squadCount: number;
}
