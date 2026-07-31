export interface MobileUser {
  id: string;
  tenantId: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'SOCIO' | 'FAMILIA' | 'JUGADOR' | 'ENTRENADOR' | 'ADMIN';
  memberNumber?: string;
  avatarUrl?: string;
}

export interface DigitalCard {
  memberId: string;
  tenantId: string;
  firstName: string;
  lastName: string;
  memberNumber: string;
  category: string;
  status: 'ACTIVE' | 'INACTIVE' | 'DEFAULTER' | 'SUSPENDED';
  qrCodeToken: string;
  avatarUrl?: string;
}

export interface MobileNotification {
  id: string;
  title: string;
  body: string;
  type: 'PAYMENT' | 'MATCH' | 'NEWS' | 'STREAM' | 'SYSTEM';
  read: boolean;
  createdAt: string;
}

export interface MobileHomeData {
  clubInfo: {
    name: string;
    shieldUrl?: string;
  };
  memberStatus: 'ACTIVE' | 'INACTIVE' | 'DEFAULTER' | 'SUSPENDED';
  nextMatch?: {
    opponent: string;
    date: string;
    time: string;
    location: string;
  };
  recentNews: Array<{
    id: string;
    title: string;
    date: string;
  }>;
  latestVideos: Array<{
    id: string;
    title: string;
    thumbnailUrl: string;
  }>;
}

export interface MobileSession {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  user: MobileUser;
}

export interface MobilePermission {
  action: 'READ' | 'WRITE' | 'DELETE' | 'EXECUTE';
  resource: 'HOME' | 'CARD' | 'PAYMENTS' | 'TV' | 'NEWS' | 'CALENDAR' | 'FAMILY' | 'PROFILE';
}
