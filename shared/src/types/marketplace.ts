export type ModuleCategory =
  | 'CORE'
  | 'FINANCE'
  | 'SPORTS'
  | 'COMMUNICATION'
  | 'MEDIA'
  | 'ACCESS'
  | 'PORTAL'
  | 'CRM'
  | 'LEAGUE';

export interface ModuleChangelog {
  version: string;
  date: string;
  changes: string[];
}

export interface MarketplaceModule {
  id: string;
  code: string;
  name: string;
  description: string;
  category: ModuleCategory;
  version: string;
  author: string;
  icon: string;
  images: string[];
  changelog: ModuleChangelog[];
  dependencies: string[];
  permissions: string[];
  license: string;
  compatibility: string;
  monthlyPrice: number;

  // Installation status per tenant or global context
  isInstalled: boolean;
  isEnabled: boolean;
  hasUpdate: boolean;
  latestVersion?: string;
  installedAt?: Date;
}

export interface ModuleActionPayload {
  tenantId?: string;
  moduleCode: string;
  action: 'INSTALL' | 'UNINSTALL' | 'ENABLE' | 'DISABLE' | 'UPDATE';
}
