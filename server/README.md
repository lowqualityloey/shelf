# 🚀 Shelf Server

> Express 5 + TypeScript backend with Drizzle ORM, PostgreSQL, and Supabase Authentication.

---

## 🛠 Tech Stack

- **Runtime & Framework**: [Node.js](https://nodejs.org/) (ESM / NodeNext), [Express 5](https://expressjs.com/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **ORM & Migrations**: [Drizzle ORM](https://orm.drizzle.team/) & [Drizzle Kit](https://orm.drizzle.team/kit-docs/overview)
- **Database Driver**: [`pg`](https://node-postgres.com/) (node-postgres Pool)
- **Authentication**: [Supabase Auth](https://supabase.com/docs/guides/auth) (`@supabase/supabase-js`)
- **Dev Runner**: [`tsx`](https://github.com/privatenumber/tsx) (watch mode)
- **Code Quality**: ESLint 10, Prettier, TypeScript strict check

---

## ⚙️ Environment Variables

Create a `.env` file in `server/` with the following variables:

```env
# Server Configuration
PORT=3000

# Database Configuration (matches docker-compose.yml)
DB_HOST=localhost
DB_PORT=5432
DB_USER=shelf_user
DB_PASSWORD=shelf_pass
DB_NAME=shelf_db

# Supabase Auth Configuration
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-supabase-anon-key
```

---

## 📦 Database & Drizzle Commands

Drizzle Kit is configured via [`drizzle.config.ts`](drizzle.config.ts) and reads schema definitions from [`src/schema.ts`](src/schema.ts).

### 1. Generate Migrations
Generate SQL migration files in `drizzle/` after modifying `src/schema.ts`:
```bash
npm run db:generate
```

### 2. Apply Migrations
Execute pending migrations against the configured PostgreSQL database:
```bash
npm run db:migrate
```

### 3. Drizzle Studio (Database GUI)
Launch Drizzle Studio in your browser to inspect and edit database records visually:
```bash
npm run db:studio
```
> By default, Drizzle Studio opens on [https://local.drizzle.studio](https://local.drizzle.studio) or `http://localhost:4983`.

---

## 💻 Development & Build Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot-reload via `tsx watch` |
| `npm run build` | Compile TypeScript into `dist/` |
| `npm start` | Run compiled production output (`dist/src/index.js`) |
| `npm run typecheck` | Run TypeScript type checking without emitting files (`tsc --noEmit`) |
| `npm run lint` | Run ESLint across server files |
| `npm run lint:fix` | Automatically fix fixable ESLint warnings/errors |
| `npm run format` | Format files using Prettier |
| `npm run format:check` | Check code formatting compliance with Prettier |

---

## 🔌 API Endpoints & Testing

### Public Endpoints

#### Health Check
```bash
curl http://localhost:3000/health
```
**Response (`200 OK`):**
```json
{
  "status": "ok"
}
```

### Protected Endpoints (Supabase Bearer Token)

Protected routes use `authMiddleware` located in [`src/middleware/auth.ts`](src/middleware/auth.ts).

#### Authenticated User Info
```bash
curl -H "Authorization: Bearer <SUPABASE_JWT_TOKEN>" http://localhost:3000/api/me
```
**Response (`200 OK`):**
```json
{
  "message": "Authenticated successfully!",
  "userId": "usr_12345",
  "email": "reader@example.com"
}
```

**Unauthorized Response (`401 Unauthorized`):**
```json
{
  "error": "Unauthorized: Missing or malformed token"
}
```

---

## 📁 Project Structure

```
server/
├── drizzle/                # Generated SQL migration files & snapshots
│   ├── meta/               # Drizzle migration journal and snapshots
│   └── 0000_*.sql          # Individual SQL migration scripts
├── src/
│   ├── middleware/
│   │   └── auth.ts         # Supabase JWT verification middleware
│   ├── db.ts               # pg Pool initialization & Drizzle instance
│   ├── index.ts            # Express server initialization & routes
│   └── schema.ts           # Drizzle table schemas, enums, & relations
├── drizzle.config.ts       # Drizzle Kit CLI configuration
├── eslint.config.js        # Server ESLint configuration
├── package.json            # Dependencies and npm scripts
└── tsconfig.json           # TypeScript configuration
```
