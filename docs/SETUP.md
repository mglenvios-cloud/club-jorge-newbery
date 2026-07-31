# Setup & Developer Guide - Club Digital Pro

## Requirements
- Node.js >= 18.x
- npm >= 9.x
- PostgreSQL database server

## Installation & Setup

1. Install dependencies from workspace root:
   ```bash
   npm install
   ```

2. Configure environment variables:
   Copy `.env.example` to `.env` in root, `backend/.env`, and `frontend/.env.local`.

3. Setup Database (Prisma):
   ```bash
   cd backend
   npx prisma generate
   npx prisma db push
   ```

4. Build Shared Package:
   ```bash
   npm run build:shared
   ```

5. Run Development Servers:
   ```bash
   # Run frontend and backend concurrently
   npm run dev:frontend
   npm run dev:backend
   ```
