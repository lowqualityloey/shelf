# 📚 Shelf

> A monorepo with a React frontend and an Express API — the starting point for a personal reading list tracker.

This repository contains a full-stack reading tracker application: a Vite + React 19 + TypeScript frontend, an Express 5 + TypeScript API authenticated with Supabase, and a PostgreSQL 16 database managed via Drizzle ORM and Docker Compose.

---

## 🏗 Structure

```
shelf/
├── client/                 # Vite + React 19 + TypeScript frontend
│   └── src/
│       ├── assets/         # Static assets and icons
│       ├── App.tsx         # Main app component
│       ├── main.tsx        # React entry point
│       └── index.css       # Global styles
├── server/                 # Express 5 + TypeScript backend
│   ├── drizzle/            # Generated SQL migrations
│   ├── src/
│   │   ├── middleware/     # Auth & validation middleware (Supabase)
│   │   ├── db.ts           # PostgreSQL connection & Drizzle instance
│   │   ├── index.ts        # Server entry point & route definitions
│   │   └── schema.ts       # Drizzle database tables & relations
│   └── drizzle.config.ts   # Drizzle Kit configuration
├── docker-compose.yml      # PostgreSQL 16 service definition
└── README.md
```

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | Vite 8 + React 19 + TypeScript |
| **Backend** | Express 5 + TypeScript (NodeNext) |
| **Database & ORM** | PostgreSQL 16 (Docker) + Drizzle ORM |
| **Authentication** | Supabase Auth (JWT Bearer verification) |
| **Tooling & Quality** | ESLint 10, Prettier, TypeScript, Drizzle Kit, Docker Compose |

---

## 🚀 Quick Start

### Prerequisites

- [Node.js](https://nodejs.org/) 20+
- [Docker](https://www.docker.com/) & Docker Compose

### 1. Start the database

```bash
docker compose up -d db
```

### 2. Configure environment variables

Create a `.env` file in `server/`:

```env
PORT=3000
DATABASE_URL=postgresql://shelf_user:shelf_pass@127.0.0.1:5432/shelf_db
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-supabase-anon-key
```

### 3. Run migrations

```bash
cd server
npm install
npm run db:migrate
```

### 4. Start the API

```bash
cd server
npm run dev
```

The server runs on `http://localhost:3000` — verify with `curl http://localhost:3000/health`.

### 5. Start the client

```bash
cd client
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view the client application.

---

## 🔌 API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET` | `/health` | No | Health check, returns `{ "status": "ok" }` |
| `GET` | `/api/me` | Bearer Token | Returns authenticated user profile info |

---

## 🧪 Scripts

### Client

```bash
npm run dev        # Start dev server (Vite)
npm run build      # Typecheck + production build
npm run typecheck  # Typecheck only (no emit)
npm run lint       # Run ESLint
npm run preview    # Preview production build
```

### Server

```bash
npm run dev          # Start with hot-reload (tsx watch)
npm run build        # Compile TypeScript
npm run typecheck    # Typecheck only (no emit)
npm run start        # Run compiled output (dist/src/index.js)
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues
npm run format       # Format code with Prettier
npm run format:check # Check code formatting
npm run db:generate  # Generate Drizzle migration files
npm run db:migrate   # Apply migrations to database
npm run db:studio    # Launch Drizzle Studio database UI
```

---

## 🐳 Docker Commands

```bash
# Start only the database
docker compose up -d db

# View database logs
docker compose logs -f db

# Reset database (⚠️ destroys all data)
docker compose down -v

# Full teardown
docker compose down
```

---

## 📝 License

[MIT](LICENSE)
