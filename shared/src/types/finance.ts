export type FeeStatus = 'PENDING' | 'PAID' | 'OVERDUE' | 'PARTIAL';
export type PaymentMethod = 'CASH' | 'DEBIT_CARD' | 'CREDIT_CARD' | 'MERCADOPAGO' | 'TRANSFER';
export type MovementType = 'INCOME' | 'EXPENSE';

export interface MembershipPlan {
  id: string;
  tenantId: string;
  name: string;
  description: string;
  price: number;
  period: 'MONTHLY' | 'QUARTERLY' | 'ANNUAL';
  active: boolean;
  createdAt: Date;
}

export interface Subscription {
  id: string;
  tenantId: string;
  memberId: string;
  memberName?: string;
  planId: string;
  planName?: string;
  status: 'ACTIVE' | 'PAUSED' | 'CANCELLED';
  startDate: Date;
  nextPaymentDate: Date;
}

export interface Payment {
  id: string;
  tenantId: string;
  memberId: string;
  memberName?: string;
  subscriptionId?: string;
  amount: number;
  currency: string;
  method: PaymentMethod;
  status: 'PAID' | 'PENDING' | 'FAILED';
  externalId?: string;
  paidAt?: Date;
  createdAt: Date;
}

export interface Invoice {
  id: string;
  tenantId: string;
  paymentId: string;
  number: string;
  amount: number;
  status: 'ISSUED' | 'DRAFT' | 'CANCELLED';
  createdAt: Date;
}

export interface Income {
  id: string;
  tenantId: string;
  category: string;
  description: string;
  amount: number;
  date: Date;
}

export interface Expense {
  id: string;
  tenantId: string;
  category: string;
  description: string;
  amount: number;
  date: Date;
}

export interface CashMovement {
  id: string;
  tenantId: string;
  type: MovementType;
  amount: number;
  description: string;
  createdAt: Date;
}

export interface FeeSubscription {
  id: string;
  tenantId: string;
  memberId: string;
  memberName: string;
  memberNumber: string;
  category: string;
  period: string;
  concept?: string;
  amount: number;
  dueDate: string;
  paidDate?: string;
  status: FeeStatus;
  paymentMethod?: PaymentMethod;
  receiptNumber?: string;
  createdAt: Date;
}

export interface TreasuryMovement {
  id: string;
  tenantId: string;
  type: MovementType;
  category: string;
  concept: string;
  amount: number;
  paymentMethod: PaymentMethod;
  createdBy: string;
  createdAt: Date;
}

export interface DailyCashRegister {
  id: string;
  tenantId: string;
  date: string;
  openingBalance: number;
  totalIncome: number;
  totalExpense: number;
  closingBalance: number;
  status: 'OPEN' | 'CLOSED';
}

export interface GenerateFeesInput {
  period: string;
  dueDate: string;
  categories?: string[];
  frequency: 'MONTHLY' | 'QUARTERLY' | 'ANNUAL';
}

export interface FinancialAnalysisInput {
  totalIncome: number;
  totalExpenses: number;
  activeMembersCount: number;
  overdueCount: number;
}
