# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Apartment Maintenance Tracker - A full-stack dockerized application currently in minimal working state. The infrastructure is complete but most features are intentionally not implemented yet.

**Tech Stack:** React 18 + Vite + Tailwind (frontend) | Express + Prisma ORM (backend) | PostgreSQL 16 (database)

## IMPORTANT RULES

**NEVER run database migrations without explicit user approval.** You can create new migration files when the user requests schema changes, but DO NOT execute them with `prisma migrate dev`, `prisma migrate deploy`, or any other migration command. Migrations are destructive actions that modify the database and must only be run by the user.

**NEVER run git commands without explicit user consent.** This includes `git add`, `git commit`, `git push`, `git pull`, `git reset`, etc. These are destructive actions that modify version control history and should only be executed by the user.

## Architecture

### Three-Container Docker Setup
- **postgres** (port 5433→5432): PostgreSQL with health checks, persistent volume
- **server** (port 5002→5000): Express API, depends on postgres health, hot-reload via volumes
- **client** (port 3000→5173): Vite dev server, hot-reload via volumes

All services communicate via `app-network` bridge network. The server uses internal container networking (`postgres:5432`) not localhost.

### Backend Structure
- `server/server.js` - Entry point, loads dotenv and starts Express
- `server/src/app.js` - Express app config with middleware (CORS, morgan, body parsing, error handling)
- `server/src/routes/` - Route modules mounted to Express app
- `server/prisma/schema.prisma` - Single-source-of-truth for database schema

**Key Pattern:** Routes are mounted in `app.js` with `/api` prefix. Add new routes by creating files in `src/routes/` and registering in `app.js`.

### Frontend Structure
- `client/src/main.jsx` - React entry point
- `client/src/App.jsx` - Root component, currently handles health check on mount via axios
- Environment variables must use `VITE_` prefix to be accessible via `import.meta.env`

### Database Layer
Prisma is the only database interface. Never write raw SQL queries outside Prisma - use `@prisma/client` for all database operations. Current schema has only a `User` model with `id`, `name`, `createdAt`, `updatedAt`.

## Essential Commands

### Startup
```bash
# First time setup (USER runs migrations, not Claude)
docker-compose up -d
docker-compose exec server npx prisma migrate dev  # USER ONLY

# Subsequent starts
docker-compose up -d
```

### Development
```bash
# View all logs
docker-compose logs -f

# View specific service logs
docker-compose logs -f [server|client|postgres]

# Restart after package.json changes
docker-compose up -d --build [service-name]

# After schema.prisma changes - Claude can generate migration file, USER runs it
# 1. Claude: Update schema.prisma
# 2. Claude: Generate Prisma Client - docker-compose exec server npx prisma generate
# 3. USER ONLY: Run migration - docker-compose exec server npx prisma migrate dev
# 4. Claude: Restart - docker-compose restart server
```

### Database
```bash
# Create migration file (Claude can do this, but NOT run it)
# Claude: Update server/prisma/schema.prisma
# Claude: docker-compose exec server npx prisma generate
# USER ONLY: docker-compose exec server npx prisma migrate dev --name <migration-name>

# Regenerate Prisma Client (Claude CAN do this - safe, non-destructive)
docker-compose exec server npx prisma generate

# Open Prisma Studio database GUI (Claude CAN suggest, user runs)
docker-compose exec server npx prisma studio

# Direct PostgreSQL access (for user reference)
docker-compose exec postgres psql -U postgres -d apartment_tracker

# Nuclear option - wipe everything (USER ONLY - extremely destructive)
docker-compose down -v
docker-compose up -d --build
docker-compose exec server npx prisma migrate dev  # USER ONLY
```

### Testing
```bash
# Check if all services are healthy
docker-compose ps

# Test backend-database connectivity
curl http://localhost:5002/api/health
```

## Port Configuration

**CRITICAL:** This project uses non-standard ports due to local conflicts. If changing ports, update in THREE places:
1. `docker-compose.yml` - External port mappings
2. `client/.env` - VITE_API_URL
3. `server/.env` - CLIENT_URL (for CORS)

Current mappings: Frontend 3000, Backend 5002, Database 5433

## Current Implementation State

**Implemented:**
- Complete Docker orchestration with health checks
- Backend health endpoint (`/api/health`) that tests database connectivity
- Frontend connection check via axios that hits health endpoint
- Prisma ORM with minimal User model
- Hot-reload for both frontend and backend

**NOT Implemented (see implementation_steps.md for full list):**
- Authentication/authorization
- Full database schema (Issue, Comment, Appointment, Cost, StatusHistory models)
- Routing, forms, file uploads, email, dashboards
- React Query, validation, error boundaries
- Service/controller layers

The full specification is in `rundowns/initial-rundown.md` with complete database schema, all planned models with enums, and comprehensive feature list.

## Adding New Features

### New API Endpoint
1. Create route file in `server/src/routes/`
2. Import and mount in `server/src/app.js` (e.g., `app.use('/api/endpoint', routerName)`)
3. Use Prisma Client for database operations: `const { PrismaClient } = require('@prisma/client')`
4. Test with `curl http://localhost:5002/api/endpoint`

### New Database Model
1. Claude: Add model to `server/prisma/schema.prisma`
2. Claude: Regenerate client with `docker-compose exec server npx prisma generate`
3. Claude: Inform user to run migration: `docker-compose exec server npx prisma migrate dev --name <descriptive-name>`
4. USER ONLY: Runs the migration command
5. Claude: After user confirms migration ran, restart server: `docker-compose restart server`
6. Prisma Client auto-generates TypeScript types - use `prisma.<ModelName>.create/find/update/delete()`

### New Frontend Component
1. Add to `client/src/` (files auto-reload)
2. For API calls, use axios with `import.meta.env.VITE_API_URL`
3. Tailwind classes are available globally via `index.css`

## Troubleshooting

**"Port already allocated"**: Another service using the port. Either stop conflicting service or change port in docker-compose.yml + update .env files.

**Backend can't connect to database**: Check `docker-compose logs postgres` for health. Verify DATABASE_URL uses container name `postgres:5432` not `localhost:5433`.

**Frontend shows "Not connected"**: Check `docker-compose logs server`. Common causes: migrations not run by user, Prisma Client not generated, server crashed on startup. Remind user to run migrations if needed.

**Changes not reflecting**: For src/* files, should hot-reload. For package.json, run `docker-compose up -d --build <service>`. For schema.prisma changes, Claude regenerates Prisma Client, user runs migration, then Claude restarts server.

**Prisma errors**: Most Prisma commands must run inside server container via `docker-compose exec server npx prisma <command>`.
