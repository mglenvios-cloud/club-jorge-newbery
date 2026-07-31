export enum SystemRole {
  SUPER_ADMIN = 'SUPER_ADMIN',
  TENANT_ADMIN = 'TENANT_ADMIN',
  STAFF = 'STAFF',
  MEMBER = 'MEMBER',
  GUEST = 'GUEST',
}

export type Permission =
  | 'tenant:read'
  | 'tenant:write'
  | 'user:read'
  | 'user:write'
  | 'user:delete'
  | 'dashboard:read'
  | 'settings:manage';

export interface UserProfile {
  id: string;
  tenantId: string;
  email: string;
  firstName: string;
  lastName: string;
  role: SystemRole;
  permissions: Permission[];
  avatarUrl?: string;
  isActive: boolean;
  createdAt: Date;
}

export interface AuthState {
  user: UserProfile | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}
