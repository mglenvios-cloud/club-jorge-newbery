# Architecture - Club Digital Pro

## Overview
Club Digital Pro is a modern, enterprise-grade multi-tenant SaaS application built specifically for sports and social clubs.

## Core Pillars
1. **Multi-Tenancy**: Database level isolation with logical tenant identifier (`tenant_id`) across core tables and dynamic request context binding via subdomain/headers.
2. **Dynamic System Branding**: Each club tenant can customize colors, logos, typography, and themes dynamically without requiring app re-deployment.
3. **Role-Based Access Control (RBAC)**: Fine-grained permission system supporting Super Admins, Tenant Admins, Staff, and Members.
4. **Decoupled Architecture**:
   - `frontend`: Next.js 14 App Router, React, Tailwind CSS.
   - `backend`: Express Node.js application powered by TypeScript & Prisma ORM.
   - `shared`: Common types, constants, and utilities consumed by frontend and backend.

## Tenant Isolation Strategy
- Requests to backend include header `X-Tenant-Id` or subdomain identification.
- Backend middleware validates tenant active status and injects tenant scope into database queries.
