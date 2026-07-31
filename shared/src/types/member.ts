export type MemberCategory =
  | 'ACTIVO'
  | 'CADETE'
  | 'INFANTIL'
  | 'VITALICIO'
  | 'HONORARIO'
  | 'FAMILIAR';

export type MemberStatus = 'ACTIVE' | 'INACTIVE' | 'DEFAULTER' | 'SUSPENDED';

export interface MemberTutorInfo {
  name: string;
  relationship: string;
  dni: string;
  phone: string;
  email?: string;
}

export interface Member {
  id: string;
  tenantId: string;
  memberNumber: string;
  firstName: string;
  lastName: string;
  dni: string;
  email: string;
  phone: string;
  birthDate: string;
  gender?: string;
  address: string;
  city: string;
  category: MemberCategory;
  status: MemberStatus;
  avatarUrl?: string;
  tutorInfo?: MemberTutorInfo;
  qrCodeToken: string;
  joinedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateMemberInput {
  firstName: string;
  lastName: string;
  dni: string;
  email: string;
  phone: string;
  birthDate: string;
  gender?: string;
  address: string;
  city: string;
  category: MemberCategory;
  status?: MemberStatus;
  avatarUrl?: string;
  tutorInfo?: MemberTutorInfo;
}
