import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import { config } from './config/env';
import { tenantMiddleware } from './middleware/tenant.middleware';
import { errorHandler } from './middleware/error.middleware';
import healthRoutes from './routes/health.routes';
import tenantRoutes from './routes/tenant.routes';
import authRoutes from './routes/auth.routes';
import superadminRoutes from './routes/superadmin.routes';
import membersRoutes from './routes/members.routes';
import portalRoutes from './routes/portal.routes';
import financeRoutes from './routes/finance.routes';
import sportsRoutes from './routes/sports.routes';
import tvRoutes from './routes/tv.routes';
import mediaRoutes from './routes/media.routes';
import mobileRoutes from './routes/mobile.routes';
import adminRoutes from './routes/admin.routes';
import onboardingRoutes from './routes/onboarding.routes';
import facilitiesRoutes from './routes/facilities.routes';
import tournamentsRoutes from './routes/tournaments.routes';
import notificationsRoutes from './routes/notifications.routes';

const app = express();

// Enable Trust Proxy for Render / Vercel SSL reverse proxies
app.set('trust proxy', 1);

// Production Security & Optimization Middlewares
app.use(helmet({ crossOriginResourcePolicy: false }));
app.use(compression());
app.use(cors({ origin: config.corsOrigin || '*', credentials: true }));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(tenantMiddleware);

// Routes
app.use('/api/health', healthRoutes);
app.use('/api/tenant', tenantRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/superadmin', superadminRoutes);
app.use('/api/tenant/members', membersRoutes);
app.use('/api/portal', portalRoutes);
app.use('/api/tenant/finance', financeRoutes);
app.use('/api/tenant/sports', sportsRoutes);
app.use('/api/tenant/sports/tournaments', tournamentsRoutes);
app.use('/api/tenant/facilities', facilitiesRoutes);
app.use('/api/tenant/notifications', notificationsRoutes);
app.use('/api/tenant/tv', tvRoutes);
app.use('/api/tenant/media', mediaRoutes);
app.use('/api/mobile', mobileRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/onboarding', onboardingRoutes);


// Error Handling
app.use(errorHandler);

// Server Listen
app.listen(config.port, () => {
  console.log(`🚀 [Club Digital Pro] Backend running on port ${config.port} (${config.nodeEnv})`);
});
