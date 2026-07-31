export interface Tournament {
  id: string;
  tenantId: string;
  name: string;
  sport: string;
  season: string;
  category: string;
  status: string; // UPCOMING, ACTIVE, COMPLETED
  startDate: string;
  endDate?: string | null;
  createdAt: string | Date;
  standings?: TournamentStanding[];
}

export interface TournamentStanding {
  id: string;
  tournamentId: string;
  tenantId: string;
  teamName: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDiff: number;
  points: number;
  position: number;
}

export interface CreateTournamentInput {
  name: string;
  sport: string;
  season: string;
  category: string;
  startDate: string;
  endDate?: string;
  teams?: string[];
}
