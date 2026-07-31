export interface AppNotification {
  id: string;
  tenantId: string;
  targetType: string; // ALL, MEMBER, ADMIN
  targetId?: string | null;
  title: string;
  message: string;
  type: string; // INFO, WARNING, PAYMENT, EVENT
  isRead: boolean;
  linkUrl?: string | null;
  createdAt: string | Date;
}

export interface SendNotificationInput {
  targetType?: string;
  targetId?: string;
  title: string;
  message: string;
  type?: string;
  linkUrl?: string;
}
