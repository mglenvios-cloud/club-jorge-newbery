import { Router, Response } from 'express';
import { TenantRequest } from '../middleware/tenant.middleware';
import { authenticateJwt } from '../middleware/auth.middleware';
import {
  FeeSubscription,
  TreasuryMovement,
  DailyCashRegister,
  GenerateFeesInput,
  MembershipPlan,
  Income,
  Expense,
} from '@club-digital-pro/shared';
import { PaymentService } from '../services/payment.service';
import { FinanceAIService } from '../services/financeAI.service';

const router = Router();

// Mock Data for Finance Module
const mockMembershipPlans: MembershipPlan[] = [
  { id: 'plan-1', tenantId: 'tenant-default-001', name: 'Socio Activo', description: 'Acceso a instalaciones y actividades de sede central.', price: 12500, period: 'MONTHLY', active: true, createdAt: new Date() },
  { id: 'plan-2', tenantId: 'tenant-default-001', name: 'Socio Familiar', description: 'Grupo familiar hasta 4 integrantes.', price: 24000, period: 'MONTHLY', active: true, createdAt: new Date() },
  { id: 'plan-3', tenantId: 'tenant-default-001', name: 'Socio Premium', description: 'Pase libre a gimnasio, natatorio y eventos VIP.', price: 35000, period: 'MONTHLY', active: true, createdAt: new Date() },
];

const mockIncomes: Income[] = [
  { id: 'inc-1', tenantId: 'tenant-default-001', category: 'CUOTAS', description: 'Recaudación cuotas Julio', amount: 145000, date: new Date('2026-07-15') },
  { id: 'inc-2', tenantId: 'tenant-default-001', category: 'SPONSORS', description: 'Canon sponsoreo Banco Macro Pro', amount: 80000, date: new Date('2026-07-10') },
];

const mockExpenses: Expense[] = [
  { id: 'exp-1', tenantId: 'tenant-default-001', category: 'DEPORTES', description: 'Arbitrajes e insumos fixture', amount: 45000, date: new Date('2026-07-12') },
  { id: 'exp-2', tenantId: 'tenant-default-001', category: 'MANTENIMIENTO', description: 'Cloro e insumos natatorio', amount: 18000, date: new Date('2026-07-14') },
];

const mockFees: FeeSubscription[] = [
  {
    id: 'fee-101',
    tenantId: 'tenant-default-001',
    memberId: 'mem-001',
    memberName: 'Martín González',
    memberNumber: 'SOC-1001',
    category: 'ACTIVO',
    period: '2026-07',
    amount: 12500,
    dueDate: '2026-07-10',
    paidDate: '2026-07-05',
    status: 'PAID',
    paymentMethod: 'TRANSFER',
    receiptNumber: 'REC-2026-0091',
    createdAt: new Date('2026-07-01'),
  },
  {
    id: 'fee-102',
    tenantId: 'tenant-default-001',
    memberId: 'mem-002',
    memberName: 'Lucía Fernández',
    memberNumber: 'SOC-1002',
    category: 'ACTIVO',
    period: '2026-07',
    amount: 12500,
    dueDate: '2026-07-10',
    status: 'OVERDUE',
    createdAt: new Date('2026-07-01'),
  },
];

const mockMovements: TreasuryMovement[] = [
  {
    id: 'mov-001',
    tenantId: 'tenant-default-001',
    type: 'INCOME',
    category: 'CUOTAS_SOCIALES',
    concept: 'Cobro de cuotas sociales mensualidad Julio',
    amount: 21000,
    paymentMethod: 'CASH',
    createdBy: 'Caja Central',
    createdAt: new Date('2026-07-21T10:30:00'),
  },
];

let currentCashRegister: DailyCashRegister = {
  id: 'cash-2026-07-21',
  tenantId: 'tenant-default-001',
  date: '2026-07-21',
  openingBalance: 15000,
  totalIncome: 21000,
  totalExpense: 4500,
  closingBalance: 31500,
  status: 'OPEN',
};

// GET /api/tenant/finance/plans - List membership plans
router.get('/plans', authenticateJwt, (_req: TenantRequest, res: Response) => {
  return res.json({ success: true, data: mockMembershipPlans });
});

// POST /api/tenant/finance/plans - Create plan
router.post('/plans', authenticateJwt, (req: TenantRequest, res: Response) => {
  const { name, description, price, period } = req.body;
  if (!name || !price) {
    return res.status(400).json({ success: false, error: 'Nombre y precio son requeridos.' });
  }

  const newPlan: MembershipPlan = {
    id: `plan-${Date.now()}`,
    tenantId: req.tenantId || 'tenant-default-001',
    name,
    description: description || '',
    price: parseFloat(price),
    period: period || 'MONTHLY',
    active: true,
    createdAt: new Date(),
  };

  mockMembershipPlans.push(newPlan);
  return res.status(201).json({ success: true, data: newPlan });
});

// GET /api/tenant/finance/incomes
router.get('/incomes', authenticateJwt, (_req: TenantRequest, res: Response) => {
  return res.json({ success: true, data: mockIncomes });
});

// POST /api/tenant/finance/incomes
router.post('/incomes', authenticateJwt, (req: TenantRequest, res: Response) => {
  const { category, description, amount } = req.body;
  const created: Income = {
    id: `inc-${Date.now()}`,
    tenantId: req.tenantId || 'tenant-default-001',
    category: category || 'GENERAL',
    description,
    amount: parseFloat(amount),
    date: new Date(),
  };
  mockIncomes.unshift(created);
  return res.status(201).json({ success: true, data: created });
});

// GET /api/tenant/finance/expenses
router.get('/expenses', authenticateJwt, (_req: TenantRequest, res: Response) => {
  return res.json({ success: true, data: mockExpenses });
});

// POST /api/tenant/finance/expenses
router.post('/expenses', authenticateJwt, (req: TenantRequest, res: Response) => {
  const { category, description, amount } = req.body;
  const created: Expense = {
    id: `exp-${Date.now()}`,
    tenantId: req.tenantId || 'tenant-default-001',
    category: category || 'GENERAL',
    description,
    amount: parseFloat(amount),
    date: new Date(),
  };
  mockExpenses.unshift(created);
  return res.status(201).json({ success: true, data: created });
});

// Mercado Pago Checkout preference
router.post('/mercadopago/preference', authenticateJwt, async (req: TenantRequest, res: Response) => {
  const { title, price, memberId, memberEmail } = req.body;
  const pref = await PaymentService.createPaymentPreference(req.tenantId || 'tenant-default-001', {
    title: title || 'Cuota Social Institucional',
    price: parseFloat(price) || 12500,
    quantity: 1,
    memberId: memberId || 'mem-001',
    memberEmail: memberEmail || 'socio@email.com',
  });
  return res.json({ success: true, data: pref });
});

// Financial AI Report
router.post('/ai-analysis', authenticateJwt, async (req: TenantRequest, res: Response) => {
  const totalIncome = mockIncomes.reduce((acc, i) => acc + i.amount, 0);
  const totalExpenses = mockExpenses.reduce((acc, e) => acc + e.amount, 0);
  const report = await FinanceAIService.analyzeFinancialStatus({
    totalIncome,
    totalExpenses,
    activeMembersCount: 250,
    overdueCount: 18,
  });

  return res.json({ success: true, data: report });
});

// GET /api/tenant/finance/fees - Get list of fees
router.get('/fees', authenticateJwt, (req: TenantRequest, res: Response) => {
  const { period, status } = req.query;
  let filtered = mockFees;
  if (period) filtered = filtered.filter((f) => f.period === period);
  if (status && status !== 'ALL') filtered = filtered.filter((f) => f.status === status);

  return res.json({ success: true, data: filtered });
});

export default router;
