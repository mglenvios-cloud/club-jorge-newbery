'use client';

import React, { createContext, useContext, useState } from 'react';
import { UserProfile, SystemRole, Permission } from '@club-digital-pro/shared';

interface AuthContextType {
  user: UserProfile | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (user: UserProfile, token: string) => void;
  logout: () => void;
  hasPermission: (permission: Permission) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>({
    id: 'user-demo-001',
    tenantId: 'tenant-default-001',
    email: 'admin@clubdigitalpro.com',
    firstName: 'Administrador',
    lastName: 'SaaS',
    role: SystemRole.SUPER_ADMIN,
    permissions: [
      'tenant:read',
      'tenant:write',
      'user:read',
      'user:write',
      'dashboard:read',
      'settings:manage',
    ],
    isActive: true,
    createdAt: new Date(),
  });

  const [token, setToken] = useState<string | null>('demo-token-jwt');

  const login = (userData: UserProfile, authToken: string) => {
    setUser(userData);
    setToken(authToken);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
  };

  const hasPermission = (permission: Permission): boolean => {
    if (!user) return false;
    if (user.role === SystemRole.SUPER_ADMIN) return true;
    return user.permissions.includes(permission);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user,
        login,
        logout,
        hasPermission,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider');
  }
  return context;
}
