# Apartment Maintenance Tracker - Project Setup

## Project Overview
A full-stack web application for tenants to track apartment maintenance issues, communicate with landlords, and maintain evidence of reported problems. Local development setup using Docker.

---

## Tech Stack

### Frontend
- **React** `^18.2.0` - Component-based UI library
- **React Router DOM** `^6.20.0` - Client-side routing
- **Axios** `^1.6.2` - HTTP client for API requests
- **React Query** `^5.14.0` - Server state management and caching
- **Tailwind CSS** `^3.3.6` - Utility-first CSS framework
- **date-fns** `^3.0.0` - Date manipulation library
- **react-dropzone** `^14.2.3` - File upload handling
- **react-big-calendar** `^1.8.5` - Calendar component
- **Recharts** `^2.10.3` - Data visualization for dashboard
- **Vite** `^5.0.8` - Build tool and dev server

### Backend
- **Node.js** `^20.10.0` - JavaScript runtime
- **Express** `^4.18.2` - Web application framework
- **PostgreSQL** `^16.1` - Relational database
- **Prisma** `^5.7.1` - Modern ORM for PostgreSQL
- **bcryptjs** `^2.4.3` - Password hashing
- **jsonwebtoken** `^9.0.2` - JWT authentication
- **multer** `^1.4.5-lts.1` - File upload middleware
- **sharp** `^0.33.1` - Image processing
- **dotenv** `^16.3.1` - Environment variable management
- **cors** `^2.8.5` - CORS middleware
- **express-validator** `^7.0.1` - Request validation
- **nodemailer** `^6.9.7` - Email sending for notifications
- **pg** `^8.11.3` - PostgreSQL client for Node.js

### Development Tools
- **Docker** `^24.0.0` - Container platform
- **Docker Compose** `^2.23.0` - Multi-container orchestration
- **nodemon** `^3.0.2` - Auto-restart server during development
- **ESLint** `^8.55.0` - Code linting
- **Prettier** `^3.1.1` - Code formatting

---

## Why Each Technology?

### React (Frontend)
- **Industry Standard**: Most popular frontend framework
- **Component Reusability**: Teaches modular code structure
- **Large Ecosystem**: Extensive libraries and community support
- **Job Market**: High demand skill

### Node.js + Express (Backend)
- **JavaScript Everywhere**: Same language for frontend and backend
- **Beginner Friendly**: Simple, unopinionated framework
- **REST API**: Standard architectural pattern for web services

### PostgreSQL
- **Industry Standard**: Most widely used open-source relational database
- **ACID Compliance**: Teaches proper database transactions and data integrity
- **Relational Model**: Essential SQL skills
- **Data Integrity**: Foreign keys and constraints prevent bad data

### Prisma ORM
- **Modern Developer Experience**: Type-safe database access
- **Auto-generated Types**: Autocomplete support
- **Migrations**: Easy database schema versioning
- **Intuitive API**: Easier to learn than raw SQL for beginners
- **Prisma Studio**: Built-in database browser

### Docker + Docker Compose
- **Consistent Environment**: Same setup for all developers
- **Easy Setup**: No need to install PostgreSQL locally
- **Isolation**: No conflicts with other projects
- **Industry Standard**: Essential skill for modern development

### Tailwind CSS
- **No CSS Expertise Required**: Utility classes reduce need for custom CSS
- **Consistent Design**: Pre-defined spacing and color systems
- **Responsive by Default**: Mobile-first approach built in

### React Query
- **Simplified Data Fetching**: Handles caching, loading, and error states automatically
- **Best Practices**: Teaches separation of server and client state

### Vite
- **Fast Development**: Lightning-fast hot module replacement
- **Modern Tooling**: ESM-based, future-proof approach
- **Simple Configuration**: Less complex than Webpack

---

## Project File Structure

```
apartment-maintenance-tracker/
│
├── client/                          # Frontend React application
│   ├── public/
│   ├── src/
│   │   ├── api/                     # API service layer
│   │   ├── components/              # Reusable components
│   │   │   ├── common/
│   │   │   ├── layout/
│   │   │   ├── issues/
│   │   │   ├── dashboard/
│   │   │   └── calendar/
│   │   ├── pages/
│   │   ├── hooks/                   # Custom React hooks
│   │   ├── context/                 # React Context providers
│   │   ├── utils/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── .env.example
│   ├── .dockerignore
│   ├── Dockerfile
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
│
├── server/                          # Backend Node.js application
│   ├── prisma/
│   │   ├── schema.prisma            # Database schema definition
│   │   ├── migrations/              # Database migrations
│   │   └── seed.js                  # Seed data for development
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── middleware/
│   │   ├── services/
│   │   ├── utils/
│   │   └── app.js
│   ├── uploads/                     # File storage
│   ├── .env.example
│   ├── .dockerignore
│   ├── Dockerfile
│   ├── package.json
│   └── server.js                    # Entry point
│
├── .gitignore
├── docker-compose.yml
└── README.md
```

---

## Dependencies

### Frontend (`client/package.json`)

```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.20.0",
    "axios": "^1.6.2",
    "@tanstack/react-query": "^5.14.0",
    "date-fns": "^3.0.0",
    "react-dropzone": "^14.2.3",
    "react-big-calendar": "^1.8.5",
    "recharts": "^2.10.3",
    "react-hook-form": "^7.49.2",
    "react-hot-toast": "^2.4.1",
    "clsx": "^2.0.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.2.1",
    "vite": "^5.0.8",
    "tailwindcss": "^3.3.6",
    "postcss": "^8.4.32",
    "autoprefixer": "^10.4.16",
    "eslint": "^8.55.0",
    "eslint-plugin-react": "^7.33.2",
    "prettier": "^3.1.1"
  }
}
```

### Backend (`server/package.json`)

```json
{
  "dependencies": {
    "express": "^4.18.2",
    "@prisma/client": "^5.7.1",
    "bcryptjs": "^2.4.3",
    "jsonwebtoken": "^9.0.2",
    "dotenv": "^16.3.1",
    "cors": "^2.8.5",
    "multer": "^1.4.5-lts.1",
    "sharp": "^0.33.1",
    "nodemailer": "^6.9.7",
    "express-validator": "^7.0.1",
    "morgan": "^1.10.0",
    "pg": "^8.11.3"
  },
  "devDependencies": {
    "prisma": "^5.7.1",
    "nodemon": "^3.0.2",
    "eslint": "^8.55.0",
    "prettier": "^3.1.1"
  }
}
```

---

## Docker Configuration

### `docker-compose.yml`
```yaml
version: '3.8'

services:
  # PostgreSQL Database
  postgres:
    image: postgres:16.1-alpine
    container_name: apartment-tracker-db
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: apartment_tracker
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
    networks:
      - app-network
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 10s
      timeout: 5s
      retries: 5

  # Backend API
  server:
    build:
      context: ./server
      dockerfile: Dockerfile
    container_name: apartment-tracker-server
    environment:
      NODE_ENV: development
      DATABASE_URL: postgresql://postgres:postgres@postgres:5432/apartment_tracker
      PORT: 5000
    ports:
      - "5000:5000"
    volumes:
      - ./server/src:/app/src
      - ./server/prisma:/app/prisma
      - ./server/uploads:/app/uploads
      - /app/node_modules
    depends_on:
      postgres:
        condition: service_healthy
    networks:
      - app-network

  # Frontend
  client:
    build:
      context: ./client
      dockerfile: Dockerfile
    container_name: apartment-tracker-client
    environment:
      - VITE_API_URL=http://localhost:5000/api
    ports:
      - "5173:5173"
    volumes:
      - ./client/src:/app/src
      - ./client/public:/app/public
      - /app/node_modules
    depends_on:
      - server
    networks:
      - app-network

volumes:
  postgres_data:

networks:
  app-network:
    driver: bridge
```

### Server `Dockerfile`
```dockerfile
FROM node:20.10-alpine

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/

RUN npm install

RUN npx prisma generate

COPY . .

EXPOSE 5000

CMD ["npm", "run", "dev"]
```

### Client `Dockerfile`
```dockerfile
FROM node:20.10-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host"]
```

---

## Environment Variables

### Client `.env`
```
VITE_API_URL=http://localhost:5000/api
VITE_APP_NAME=Apartment Maintenance Tracker
```

### Server `.env`
```
# Server
NODE_ENV=development
PORT=5000

# Database (for Docker)
DATABASE_URL=postgresql://postgres:postgres@postgres:5432/apartment_tracker

# Authentication
JWT_SECRET=your-super-secret-jwt-key-change-this
JWT_EXPIRE=7d

# Email (optional - using Gmail as example)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-specific-password

# File Upload
MAX_FILE_SIZE=5242880
ALLOWED_FILE_TYPES=image/jpeg,image/png,image/jpg

# Frontend URL (for CORS)
CLIENT_URL=http://localhost:5173
```

---

## Database Schema (Prisma)

### `prisma/schema.prisma`
```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  password  String
  name      String
  role      Role     @default(TENANT)

  // Apartment information
  unit      String?
  building  String?
  address   String?

  // Relations
  issues          Issue[]       @relation("IssueCreator")
  assignedIssues  Issue[]       @relation("IssueAssignee")
  comments        Comment[]
  appointments    Appointment[] @relation("AppointmentCreator")
  attendees       Appointment[] @relation("AppointmentAttendees")
  costs           Cost[]
  statusChanges   StatusHistory[]

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@map("users")
}

model Issue {
  id          Int          @id @default(autoincrement())
  title       String
  description String
  category    Category
  priority    Priority
  status      Status       @default(PENDING)
  location    String?
  images      String[]

  // Relations
  tenantId      Int
  tenant        User         @relation("IssueCreator", fields: [tenantId], references: [id])
  assignedToId  Int?
  assignedTo    User?        @relation("IssueAssignee", fields: [assignedToId], references: [id])

  comments      Comment[]
  appointments  Appointment[]
  costs         Cost[]
  statusHistory StatusHistory[]

  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
  resolvedAt  DateTime?

  @@map("issues")
  @@index([tenantId])
  @@index([assignedToId])
  @@index([status])
  @@index([category])
}

model Comment {
  id          Int      @id @default(autoincrement())
  content     String
  attachments String[]

  // Relations
  issueId   Int
  issue     Issue    @relation(fields: [issueId], references: [id], onDelete: Cascade)
  authorId  Int
  author    User     @relation(fields: [authorId], references: [id])

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@map("comments")
  @@index([issueId])
}

model Appointment {
  id          Int               @id @default(autoincrement())
  title       String
  description String?
  startDate   DateTime
  endDate     DateTime
  status      AppointmentStatus @default(SCHEDULED)

  // Relations
  issueId     Int?
  issue       Issue?  @relation(fields: [issueId], references: [id])
  createdById Int
  createdBy   User    @relation("AppointmentCreator", fields: [createdById], references: [id])
  attendees   User[]  @relation("AppointmentAttendees")

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@map("appointments")
  @@index([issueId])
  @@index([startDate])
}

model Cost {
  id          Int      @id @default(autoincrement())
  amount      Decimal  @db.Decimal(10, 2)
  description String
  paidBy      PaidBy
  category    String?
  date        DateTime @default(now())
  receipt     String?

  // Relations
  issueId     Int?
  issue       Issue?   @relation(fields: [issueId], references: [id])
  createdById Int
  createdBy   User     @relation(fields: [createdById], references: [id])

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@map("costs")
  @@index([issueId])
  @@index([paidBy])
}

model StatusHistory {
  id        Int      @id @default(autoincrement())
  status    Status
  note      String?

  // Relations
  issueId     Int
  issue       Issue    @relation(fields: [issueId], references: [id], onDelete: Cascade)
  changedById Int
  changedBy   User     @relation(fields: [changedById], references: [id])

  changedAt DateTime @default(now())

  @@map("status_history")
  @@index([issueId])
}

// Enums
enum Role {
  TENANT
  LANDLORD
  ADMIN
}

enum Category {
  PLUMBING
  ELECTRICAL
  STRUCTURAL
  APPLIANCE
  HVAC
  PEST_CONTROL
  OTHER
}

enum Priority {
  LOW
  MEDIUM
  HIGH
  URGENT
}

enum Status {
  PENDING
  IN_PROGRESS
  RESOLVED
  CLOSED
}

enum AppointmentStatus {
  SCHEDULED
  COMPLETED
  CANCELLED
}

enum PaidBy {
  TENANT
  LANDLORD
}
```

---

## Getting Started

### Prerequisites
- **Docker** and **Docker Compose** installed
- **Git** for version control
- Code editor (VS Code recommended)

### Setup Steps

1. **Create environment files:**
   ```bash
   cp server/.env.example server/.env
   cp client/.env.example client/.env
   ```

2. **Start all services:**
   ```bash
   docker-compose up
   ```

3. **Run database migrations (in new terminal):**
   ```bash
   docker-compose exec server npx prisma migrate dev
   ```

4. **Seed database (optional):**
   ```bash
   docker-compose exec server npx prisma db seed
   ```

5. **Access the application:**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000
   - Prisma Studio: `docker-compose exec server npx prisma studio`

### Common Commands

```bash
# View logs
docker-compose logs -f

# Stop all services
docker-compose down

# Fresh start (removes database)
docker-compose down -v
docker-compose up

# Access database directly
docker-compose exec postgres psql -U postgres -d apartment_tracker

# Run Prisma commands
docker-compose exec server npx prisma migrate dev
docker-compose exec server npx prisma studio
docker-compose exec server npx prisma generate

# Access container shell
docker-compose exec server sh
```

---

## Troubleshooting

### Port Conflicts
If ports are already in use, modify `docker-compose.yml`:
```yaml
ports:
  - "5433:5432"  # Change PostgreSQL port
  - "5001:5000"  # Change server port
  - "3000:5173"  # Change client port
```

### PostgreSQL Connection Issues
```bash
# Check if postgres is running
docker-compose ps

# View postgres logs
docker-compose logs postgres

# Restart postgres
docker-compose restart postgres
```

### Prisma Issues
```bash
# Regenerate Prisma Client
docker-compose exec server npx prisma generate

# Reset database (deletes all data)
docker-compose exec server npx prisma migrate reset
```

### Docker Issues
```bash
# Rebuild containers
docker-compose build --no-cache

# Remove all containers and volumes
docker-compose down -v
```

---

## Quick Reference

**Start development:**
```bash
docker-compose up
```

**Run migrations:**
```bash
docker-compose exec server npx prisma migrate dev
```

**View database:**
```bash
docker-compose exec server npx prisma studio
```

**Stop everything:**
```bash
docker-compose down
```
