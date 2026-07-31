export * from './types/branding';
export * from './types/tenant';
export * from './types/auth';
export * from './types/superadmin';
export * from './types/marketplace';
export * from './types/member';
export * from './types/portal';
export * from './types/finance';
export * from './types/sports';
export * from './types/tv';
export * from './types/media';
export * from './types/mobile';
export * from './types/facilities';
export * from './types/tournaments';
export * from './types/notifications';

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
}
