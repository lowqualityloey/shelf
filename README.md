# 📚 Shelf

> A monorepo with a React frontend and an Express API — the starting point for a personal reading list tracker.

This repo currently contains the project scaffolding: a Vite + React 19 + TypeScript starter frontend and a minimal Express 5 + TypeScript backend, with PostgreSQL ready to go in Docker.

---

## 🏗 Structure

```
shelf/
├── client/                 # Vite + React 19 + TypeScript frontend
│   └── src/
│       ├── App.tsx         # Main app component
│       ├── main.tsx        # React entry point
│       └── index.css       # Global styles
├── server/                 # Express 5 + TypeScript backend
│   └── src/
│       └── index.ts        # Server entry point (GET /health)
├── docker-compose.yml      # PostgreSQL 16 service definition
└── README.md
```

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | Vite 8 + React 19 + TypeScript |
| **Backend** | Express 5 + TypeScript (NodeNext) |
| **Database** | PostgreSQL 16 (Docker, not yet wired in) |
| **Tooling** | ESLint 10, TypeScript, Docker Compose |

---

## 🚀 Quick Start

### Prerequisites

- [Node.js](https://nodejs.org/) 20+
- [Docker](https://www.docker.com/) & Docker Compose

### 1. Start the database (optional for now)

```bash
docker compose up -d db
```

### 2. Start the API

```bash
cd server
npm install
npm run dev
```

The server runs on `http://localhost:3000` — check it with `curl http://localhost:3000/health` (returns `{"status":"ok"}`).

### 3. Start the client

```bash
cd client
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to see the Vite starter page.

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/health` | Health check, returns `{ "status": "ok" }` |

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
npm run dev        # Start with hot-reload (tsx watch)
npm run build      # Compile TypeScript
npm run typecheck  # Typecheck only (no emit)
npm start          # Run compiled output (dist/index.js)
npm run lint       # Run ESLint
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
