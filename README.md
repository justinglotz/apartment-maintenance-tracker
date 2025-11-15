# Apartment Maintenance Tracker

A full-stack web application for tenants to track apartment maintenance issues, communicate with landlords, and maintain evidence of reported problems.

## Tech Stack

- **Frontend:** React 18, Vite, Tailwind CSS, Axios
- **Backend:** Node.js, Express, Prisma ORM
- **Database:** PostgreSQL 16
- **DevOps:** Docker, Docker Compose

## Quick Start

### Prerequisites
- Docker and Docker Compose installed
- Ports 3000, 5002, and 5433 available (or modify `docker-compose.yml`)

### Setup

1. **Clone and navigate to the project:**
   ```bash
   cd bonfire-builders
   ```

2. **Start all services:**
   ```bash
   docker-compose up -d
   ```

3. **Run database migrations (first time only):**
   ```bash
   docker-compose exec server npx prisma migrate dev
   ```

4. **Access the application:**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5002
   - Health Check: http://localhost:5002/api/health

## Application Ports

| Service  | External Port | Internal Port |
|----------|---------------|---------------|
| Frontend | 3000          | 5173          |
| Backend  | 5002          | 5000          |
| Database | 5433          | 5432          |

> **Note:** These ports differ from the original specification due to local port conflicts.

## Common Commands

### Development

```bash
# Start all services
docker-compose up -d

# View logs (all services)
docker-compose logs -f

# View logs (specific service)
docker-compose logs -f server
docker-compose logs -f client
docker-compose logs -f postgres

# Stop all services
docker-compose down

# Restart a service
docker-compose restart server
```

### Database

```bash
# Run migrations
docker-compose exec server npx prisma migrate dev

# Open Prisma Studio (database GUI)
docker-compose exec server npx prisma studio

# Access PostgreSQL directly
docker-compose exec postgres psql -U postgres -d apartment_tracker

# Reset database (deletes all data)
docker-compose exec server npx prisma migrate reset
```

### Clean Start

```bash
# Remove all containers and volumes
docker-compose down -v

# Rebuild and start fresh
docker-compose up -d --build

# Run migrations again
docker-compose exec server npx prisma migrate dev
```

## Project Structure

```
bonfire-builders/
├── client/                 # React frontend
│   ├── src/
│   │   ├── App.jsx        # Main component with connection check
│   │   ├── main.jsx       # React entry point
│   │   └── index.css      # Tailwind styles
│   ├── Dockerfile
│   ├── package.json
│   └── vite.config.js
│
├── server/                 # Express backend
│   ├── src/
│   │   ├── app.js         # Express app configuration
│   │   └── routes/
│   │       └── health.js  # Health check endpoint
│   ├── prisma/
│   │   └── schema.prisma  # Database schema
│   ├── Dockerfile
│   ├── package.json
│   └── server.js          # Entry point
│
├── docker-compose.yml      # Multi-container orchestration
├── .gitignore
├── README.md
└── implementation_steps.md # Detailed implementation notes
```

## Current Implementation

This is a **minimal working version** with:
- ✅ Full Docker setup with 3 containers
- ✅ React frontend with "Hello World" landing page
- ✅ Connection status indicator (shows "Connected" when backend + DB are working)
- ✅ Express backend with health check endpoint
- ✅ PostgreSQL database with Prisma ORM
- ✅ Simple `users` table with `name` column

### Not Yet Implemented
- Authentication (JWT, login/logout)
- Full database schema (Issues, Comments, Appointments, etc.)
- Routing and multiple pages
- Forms and validation
- File uploads
- Email notifications
- Dashboard and data visualization

See `implementation_steps.md` for detailed information.

## Troubleshooting

### Port Already Allocated
If you get port conflict errors, modify the port mappings in `docker-compose.yml`:

```yaml
# Change external ports (left side)
ports:
  - "3001:5173"  # Frontend
  - "5003:5000"  # Backend
  - "5434:5432"  # Database
```

### Database Connection Issues
```bash
# Check if postgres is healthy
docker-compose ps

# View postgres logs
docker-compose logs postgres

# Restart postgres
docker-compose restart postgres
```

### Frontend Not Loading
```bash
# Check client logs
docker-compose logs client

# Rebuild client container
docker-compose up -d --build client
```

### Backend API Errors
```bash
# Check server logs
docker-compose logs server

# Regenerate Prisma Client
docker-compose exec server npx prisma generate

# Restart server
docker-compose restart server
```

## API Endpoints

### Health Check
```bash
GET /api/health

Response:
{
  "status": "ok",
  "message": "Server is running and database is connected",
  "database": "connected",
  "timestamp": "2025-11-15T04:23:20.773Z"
}
```

## Environment Variables

### Client (.env)
```env
VITE_API_URL=http://localhost:5002/api
VITE_APP_NAME=Apartment Maintenance Tracker
```

### Server (.env)
```env
NODE_ENV=development
PORT=5000
DATABASE_URL=postgresql://postgres:postgres@postgres:5432/apartment_tracker
CLIENT_URL=http://localhost:3000
```

## Development Workflow

1. Make changes to source files (hot-reload is enabled)
2. Changes in `client/src/*` and `server/src/*` auto-reload
3. For package.json changes, rebuild: `docker-compose up -d --build`
4. For schema changes, run migrations: `docker-compose exec server npx prisma migrate dev`

## License

MIT

## Documentation

- `README.md` - This file (quick start and reference)
- `implementation_steps.md` - Detailed implementation notes
- `rundowns/initial-rundown.md` - Full project specification
