/**
 * Email Service — Club Digital Pro
 * Handles transactional emails for onboarding, welcome, payment confirmations.
 * Prepared for SMTP (Nodemailer) integration.
 */

export interface EmailPayload {
  to: string;
  subject: string;
  html: string;
}

const SMTP_HOST = process.env.SMTP_HOST || '';
const SMTP_PORT = parseInt(process.env.SMTP_PORT || '587');
const SMTP_USER = process.env.SMTP_USER || '';
const SMTP_PASS = process.env.SMTP_PASS || '';
const FROM_NAME = process.env.EMAIL_FROM_NAME || 'Club Digital Pro';
const FROM_EMAIL = process.env.EMAIL_FROM || 'noreply@clubdigitalpro.com';

export class EmailService {
  private static isConfigured(): boolean {
    return !!(SMTP_HOST && SMTP_USER && SMTP_PASS);
  }

  static async send(payload: EmailPayload): Promise<void> {
    if (!this.isConfigured()) {
      console.log(`[EmailService] SMTP not configured. Would send to ${payload.to}: ${payload.subject}`);
      return;
    }

    // Production integration:
    // const transporter = nodemailer.createTransport({ host: SMTP_HOST, port: SMTP_PORT, ... });
    // await transporter.sendMail({ from: `"${FROM_NAME}" <${FROM_EMAIL}>`, ...payload });
    console.log(`[EmailService] Email queued → ${payload.to} | ${payload.subject}`);
  }

  static async sendRegistrationReceived(to: string, clubName: string, contactName: string): Promise<void> {
    await this.send({
      to,
      subject: `✅ Recibimos tu solicitud — ${clubName}`,
      html: `
        <div style="font-family:Inter,sans-serif;max-width:600px;margin:0 auto;background:#0f172a;color:#e2e8f0;padding:40px;border-radius:16px;">
          <h1 style="color:#6366f1;">${clubName}</h1>
          <h2>¡Hola ${contactName}!</h2>
          <p>Recibimos correctamente la solicitud de registro para <strong>${clubName}</strong>.</p>
          <p>Nuestro equipo comercial revisará tu solicitud y te contactará dentro de las próximas <strong>24 horas hábiles</strong>.</p>
        </div>
      `,
    });
  }

  static async sendWelcome(to: string, clubName: string, adminName: string, loginUrl: string, tempPassword: string): Promise<void> {
    await this.send({
      to,
      subject: `🎉 ¡Bienvenido a ${clubName}!`,
      html: `
        <div style="font-family:Inter,sans-serif;max-width:600px;margin:0 auto;background:#0f172a;color:#e2e8f0;padding:40px;border-radius:16px;">
          <h1 style="color:#6366f1;">${clubName}</h1>
          <h2>¡Bienvenido, ${adminName}!</h2>
          <p>Tu instancia de <strong>${clubName}</strong> fue creada exitosamente.</p>
          <p><strong>Acceso al panel:</strong> <a href="${loginUrl}" style="color:#6366f1;">${loginUrl}</a></p>
          <p><strong>Email:</strong> ${to}<br><strong>Contraseña temporal:</strong> ${tempPassword}</p>
          <p style="color:#f59e0b;">⚠️ Por seguridad, cambia tu contraseña al iniciar sesión.</p>
          <a href="${loginUrl}" style="background:#6366f1;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;display:inline-block;margin-top:16px;">Ingresar al Panel</a>
        </div>
      `,
    });
  }

  static async sendTrialStarted(to: string, clubName: string, trialDays: number, trialEndsAt: Date): Promise<void> {
    await this.send({
      to,
      subject: `🚀 Periodo de prueba iniciado — ${clubName}`,
      html: `
        <div style="font-family:Inter,sans-serif;max-width:600px;margin:0 auto;background:#0f172a;color:#e2e8f0;padding:40px;border-radius:16px;">
          <h1 style="color:#6366f1;">${clubName}</h1>
          <h2>¡Tu período de prueba comenzó!</h2>
          <p><strong>${clubName}</strong> tiene acceso completo durante <strong>${trialDays} días</strong>.</p>
          <p>Tu período de prueba finaliza el <strong>${trialEndsAt.toLocaleDateString('es-AR')}</strong>.</p>
          <p>Aprovechá para explorar todos los módulos disponibles en tu plan.</p>
        </div>
      `,
    });
  }

  static async sendPaymentApproved(to: string, clubName: string, planName: string, amount: number): Promise<void> {
    await this.send({
      to,
      subject: `💳 Pago aprobado — ${clubName} (Plan ${planName})`,
      html: `
        <div style="font-family:Inter,sans-serif;max-width:600px;margin:0 auto;background:#0f172a;color:#e2e8f0;padding:40px;border-radius:16px;">
          <h1 style="color:#6366f1;">${clubName}</h1>
          <h2>¡Pago aprobado!</h2>
          <p>El pago de <strong>$${amount.toLocaleString('es-AR')} ARS</strong> para el plan <strong>${planName}</strong> de <strong>${clubName}</strong> fue procesado correctamente.</p>
          <p>Tu suscripción está activa. Podés continuar utilizando todos los módulos habilitados.</p>
        </div>
      `,
    });
  }
}
