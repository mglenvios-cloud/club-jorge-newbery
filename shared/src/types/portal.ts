import { Member } from './member';

export type NotificationType = 'ALERT' | 'INFO' | 'PAYMENT' | 'EVENT';
export type PaymentStatus = 'PAID' | 'PENDING' | 'OVERDUE';

export interface PortalNotification {
  id: string;
  title: string;
  message: string;
  date: string;
  read: boolean;
  type: NotificationType;
}

export interface PortalPayment {
  id: string;
  concept: string;
  period: string;
  amount: number;
  dueDate: string;
  paidDate?: string;
  status: PaymentStatus;
  invoiceUrl?: string;
}

export interface ClubNewsItem {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  imageUrl?: string;
  category: string;
}

export interface MemberEmergencyContact {
  name: string;
  relationship: string;
  phone: string;
}

export interface UpdateMemberProfileInput {
  email?: string;
  phone?: string;
  address?: string;
  avatarUrl?: string;
  emergencyContact?: MemberEmergencyContact;
}
