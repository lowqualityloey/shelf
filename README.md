# 📚 Shelf

> A personal reading list tracker built with Vite, React, TypeScript, TanStack Query, Auth0, Express, and PostgreSQL.

Shelf lets you search for books via the [Open Library API](https://openlibrary.org/developers/api), save them to your personal library, and track your reading progress — all wrapped in a clean, responsive UI.

---

## ✨ Features

- 🔍 **Search Books** — Find books by title, author, or ISBN using the Open Library API
- 📖 **Track Reading Progress** — Organize books into *Want to Read*, *Reading*, or *Read*
- ⭐ **Rate & Review** — Add personal notes and star ratings to finished books
- 🔐 **Secure Auth** — Authentication powered by Auth0
- ⚡ **Fast UI** — Optimistic updates and smart caching with TanStack Query
- 🐳 **Easy Setup** — PostgreSQL runs in Docker; everything else runs locally

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | Vite + React 18 + TypeScript |
| **State & Data** | TanStack Query (React Query) |
| **Auth** | Auth0 |
| **Backend** | Express.js + TypeScript |
| **Database** | PostgreSQL 16 |
| **DevOps** | Docker Compose |
| **External API** | [Open Library API](https://openlibrary.org/developers/api) |

---

## 🚀 Quick Start

### Prerequisites

- [Node.js](https://nodejs.org/) 18+
- [Docker](https://www.docker.com/) & Docker Compose
- An [Auth0](https://auth0.com/) account (free tier)

### 1. Clone the repo

```bash
git clone https://github.com/yourusername/shelf.git
cd shelf
```

### 2. Configure Auth0

1. Create a new **Single Page Application** in your Auth0 dashboard
2. Add `http://localhost:5173` to **Allowed Callback URLs**, **Allowed Logout URLs**, and **Allowed Web Origins**
3. Copy `.env.example` to `.env` and fill in your Auth0 credentials:

```bash
cp server/.env.example server/.env
cp client/.env.example client/.env
```

### 3. Start the database

```bash
docker compose up -d db
```

### 4. Start the API

```bash
cd server
npm install
npm run migrate  # run database migrations
npm run dev
```

### 5. Start the client

```bash
cd client
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) and start tracking your reads! 📚

---

## 📁 Project Structure

```
shelf/
├── client/                 # Vite + React + TypeScript frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── hooks/          # Custom TanStack Query hooks
│   │   ├── pages/          # Route-level pages
│   │   └── lib/            # API clients & utilities
│   └── ...
├── server/                 # Express + TypeScript backend
│   ├── src/
│   │   ├── routes/         # API route handlers
│   │   ├── middleware/     # Auth & validation middleware
│   │   └── db/             # Migrations & queries
│   └── ...
├── docker-compose.yml      # PostgreSQL service definition
└── README.md
```

---

## 🗄 Database Schema

```sql
users
├── id (PK)
├── auth0_sub (unique)
├── email
└── created_at

books
├── id (PK)
├── open_library_key (unique)
├── title
├── author
└── cover_url

user_books
├── id (PK)
├── user_id (FK)
├── book_id (FK)
├── status (want_to_read | reading | read)
├── rating (1-5)
├── notes
└── updated_at
```

---

## 🔌 API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET` | `/api/books/search?q={query}` | Public | Search books via Open Library |
| `GET` | `/api/shelf` | Required | Get current user's reading list |
| `POST` | `/api/shelf` | Required | Add a book to shelf |
| `PATCH` | `/api/shelf/:bookId` | Required | Update status, rating, or notes |
| `DELETE` | `/api/shelf/:bookId` | Required | Remove a book from shelf |

---

## 🧪 Scripts

### Client

```bash
npm run dev       # Start dev server
npm run build     # Production build
npm run lint      # Run ESLint
npm run preview   # Preview production build
```

### Server

```bash
npm run dev       # Start with hot-reload (nodemon)
npm run build     # Compile TypeScript
npm start         # Run compiled output
npm run migrate   # Run database migrations
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

## 📸 Screenshots

*Coming soon...*

---

## 📝 License

[MIT](LICENSE)

---

Built with ☕ and too many unread books.
