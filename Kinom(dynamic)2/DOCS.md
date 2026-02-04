# Kinom (Dynamic) — Full Documentation (Frontend + Backend + Docker)

This repository contains:

- A **Vue 3 + Vite + Tailwind** frontend in `frontend/`
- A **Node.js + Express + MongoDB (Mongoose)** backend API in `backend/`
- A **Docker Compose dev stack** (Mongo + backend + frontend) at the repo root

---

## What you get (features)

### Public website (Landing page)
Route: `/`

Sections/components:

- **Navbar**: scroll-spy navigation to sections (Hero/Gallery/About/Review/Contact)
- **Hero**: Kinom branding + “Try it” button linking to `/dashboard`
- **Gallery section**: currently static placeholder cards (in code it is `FeaturesSection.vue`, but the section id is `gallery`)
- **About section**: description of the Kinom concept
- **Testimonials/Review section**: currently static placeholder reviews
- **CTA section**: call-to-action links to contact/features
- **Why Choose Us**: placeholder stats/bullets (mixed light/dark styles)
- **Contact section**: **real working form** that calls the backend API and stores submissions in MongoDB
- **Footer**: navigation + placeholder social links

### Dashboard UI (Admin/Portal style pages)
Route: `/dashboard/*`

Pages:

- `/dashboard` **Dashboard Home**: stats + recent orders + quick actions (mock data)
- `/dashboard/products` **Products**: product table (mock data)
- `/dashboard/carts` **Carts**: cart UI (mock data)
- `/dashboard/orders` **Orders**: orders table (mock data)
- `/dashboard/insights` **Insights**: analytics UI + chart placeholder (mock data)
- `/dashboard/your-products` **Your Products**: listing cards (mock data)
- `/dashboard/chats` **Chats**: chat layout (mock data)
- `/dashboard/ai-assistant` **AI Assistant**: simulated AI chat (no backend integration)

Important note: **The dashboard is currently a UI template/demo**. It does not connect to backend endpoints yet (no authentication, no real products/orders/chats DB).

---

## Tech stack

### Frontend

- **Vue 3**
- **Vite**
- **Vue Router**
- **Tailwind CSS**
- API calls: uses `fetch()` (contact form)

### Backend

- **Node.js** (ES modules)
- **Express**
- **Mongoose** (MongoDB)
- **CORS** configured via `FRONTEND_URL`

### Docker

- Dev: `docker-compose.yml` runs Mongo + backend + frontend dev servers with volume mounts (hot reload)
- Production-style: `frontend/Dockerfile` builds static assets and serves via **nginx**; `backend/Dockerfile` runs the API

---

## Repository structure

```
.
├─ docker-compose.yml              # Dev stack: mongo + backend + frontend
├─ start-dev.ps1                   # Windows helper: compose up + wait + open URLs
├─ stop-dev.ps1                    # Windows helper: compose down
├─ backend/
│  ├─ server.js                    # Express app + routes + health check
│  ├─ config/db.js                 # Mongo connection
│  ├─ routes/                      # contact/gallery/reviews routers
│  ├─ controllers/                 # controller logic
│  ├─ schemas/                     # Mongoose schemas
│  └─ Dockerfile                   # backend container image (production-style)
└─ frontend/
   ├─ src/
   │  ├─ views/                    # Home + dashboard pages
   │  ├─ components/               # Landing page sections
   │  ├─ router/index.js           # Routes
   │  └─ main.js                   # Vue bootstrap
   ├─ nginx.conf                   # nginx SPA + /api proxy (optional)
   └─ Dockerfile                   # frontend build -> nginx (production-style)
```

---

## Environment variables

### Backend (`backend/server.js`)

- **`PORT`**: API port (default `5000`)
- **`MONGO_URI`**: Mongo connection string
  - default fallback in code: `mongodb://localhost:27017/kinom`
  - in Docker Compose: `mongodb://mongo:27017/kinom`
- **`FRONTEND_URL`**: allowed CORS origin (default `http://localhost:5173`)
- **`NODE_ENV`**: when `production`, API errors hide stack traces

### Frontend (`frontend/src/components/ContactSection.vue`)

- **`VITE_API_URL`**: API base URL used by the contact form
  - local (no docker): usually `http://localhost:5000`
  - docker-compose dev: set to `http://localhost:5001` (because compose maps backend to host `5001`)

Important note: `VITE_*` vars are **read by Vite at build/dev time**. For production builds inside Docker, pass `--build-arg VITE_API_URL=...` to the frontend Docker build.

---

## Backend API

Base URL (local): `http://localhost:5000`

Base URL (docker-compose dev): `http://localhost:5001`

### Health

- `GET /api/health`
  - returns `{ status: "ok", message: "Kinom API is running" }`

### Contact (stores contact form submissions)

- `POST /api/contact` **(public)**
  - body: `{ name, email, message }`
  - validates required fields; saves into MongoDB
- `GET /api/contact` **(admin-only concept, currently no auth)**
  - query: `status`, `page`, `limit`
- `GET /api/contact/:id` **(admin-only concept, currently no auth)**
- `PUT /api/contact/:id` **(admin-only concept, currently no auth)**
  - body: `{ status }` where status is one of `pending | read | replied`
- `DELETE /api/contact/:id` **(admin-only concept, currently no auth)**

### Gallery (intended to power “Gallery” section later)

- `GET /api/gallery` **(public)** — returns active gallery items
- `GET /api/gallery/:id` **(public)**
- `POST /api/gallery` **(admin-only concept, currently no auth)**
- `PUT /api/gallery/:id` **(admin-only concept, currently no auth)**
- `DELETE /api/gallery/:id` **(admin-only concept, currently no auth)**

Data fields:

- `title` (required)
- `date` (required, stored as string)
- `imageUrl` (required)
- `description` (optional)
- `isActive` (boolean, default true)

### Reviews (intended to power Testimonials later)

- `GET /api/reviews` **(public)** — returns active reviews
- `GET /api/reviews/:id` **(public)**
- `POST /api/reviews` **(admin-only concept, currently no auth)**
- `PUT /api/reviews/:id` **(admin-only concept, currently no auth)**
- `DELETE /api/reviews/:id` **(admin-only concept, currently no auth)**

Data fields:

- `name` (required)
- `quote` (required)
- `title` (optional)
- `avatarUrl` (optional)
- `rating` (1..5, default 5)
- `isActive` (boolean, default true)

---

## Running the project (recommended): Docker Compose dev stack

This is the easiest setup because MongoDB runs in Docker and the frontend/backend hot-reload.

### Option A (Windows PowerShell helpers)

From repo root:

```powershell
.\start-dev.ps1
```

To stop:

```powershell
.\stop-dev.ps1
```

### Option B (manual)

From repo root:

```powershell
docker-compose up --build -d
docker-compose logs -f backend
docker-compose logs -f frontend
```

URLs (dev):

- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:5001`
- Backend health: `http://localhost:5001/api/health`

Notes:

- MongoDB does **not** publish a host port in compose (it’s internal to the Docker network).
- Backend is mapped as **host `5001` → container `5000`** to avoid conflicts.
- The compose file includes helper “wait” services that print readiness messages in logs.

---

## Running locally (no Docker)

Use this if you have **MongoDB installed locally**.

### 1) Install dependencies

From repo root:

```powershell
npm run install:all
```

Or manually:

```powershell
cd backend; npm install
cd ..\frontend; npm install
```

### 2) Start MongoDB

Make sure a MongoDB instance is available at:

- `mongodb://localhost:27017/kinom`

### 3) Run backend

From `backend/`:

```powershell
$env:MONGO_URI="mongodb://localhost:27017/kinom"
$env:FRONTEND_URL="http://localhost:5173"
$env:PORT="5000"
npm run dev
```

### 4) Run frontend

From `frontend/`:

```powershell
$env:VITE_API_URL="http://localhost:5000"
npm run dev
```

Then open:

- `http://localhost:5173`

---

## Production-style Docker build (static frontend + backend)

This repo includes production-style Dockerfiles, but the current `docker-compose.yml` is optimized for **development**. For a production-like run you typically:

1) Build the backend image from `backend/Dockerfile`
2) Build the frontend nginx image from `frontend/Dockerfile`
3) Run both containers on the same Docker network (and optionally use nginx to proxy `/api`)

### Build backend image

```powershell
docker build -t kinom-backend:prod .\backend
```

### Build frontend image (set API url at build time)

Example: if the browser should call a backend exposed at `http://YOUR_DOMAIN:5000`:

```powershell
docker build -t kinom-frontend:prod --build-arg VITE_API_URL="http://YOUR_DOMAIN:5000" .\frontend
```

### Run production containers (example)

```powershell
docker network create kinom-net

docker run -d --name kinom-mongo --network kinom-net mongo:6

docker run -d --name kinom-backend --network kinom-net -p 5000:5000 `
  -e PORT=5000 `
  -e MONGO_URI="mongodb://kinom-mongo:27017/kinom" `
  -e FRONTEND_URL="http://YOUR_DOMAIN" `
  -e NODE_ENV=production `
  kinom-backend:prod

docker run -d --name kinom-frontend --network kinom-net -p 80:80 kinom-frontend:prod
```

Optional nginx behavior:

- `frontend/nginx.conf` can proxy `/api/` to `http://backend:5000` **inside Docker**
- If you use that proxy, the browser can call `/api/...` without a separate API domain

---

## “Full process” overview (how the system works end-to-end)

### Development flow (Docker Compose)

1) `docker-compose up` starts MongoDB + backend + frontend dev servers
2) Frontend loads at `http://localhost:5173`
3) When a user submits the contact form:
   - Frontend runs `fetch(`${VITE_API_URL}/api/contact`, ...)`
   - Backend validates input and saves it to MongoDB (`contacts` collection)
4) Admin endpoints exist for contacts/gallery/reviews, but **there is no authentication yet**

### Data flow (MongoDB)

Collections used:

- `contacts`: contact form submissions + status (pending/read/replied)
- `galleries`: gallery items (title/date/imageUrl/isActive)
- `reviews`: testimonial/review items (name/quote/rating/isActive)

---

## Current limitations / what to implement next

- **No authentication/authorization**: “admin” endpoints are publicly reachable right now
- **Dashboard is not connected** to backend (products/orders/chats are UI-only)
- **Gallery/Reviews are not used by the frontend** yet (frontend currently uses placeholders)
- **No file uploads**: gallery uses `imageUrl` string, not uploaded media storage
- **No validation middleware / rate limiting** beyond basic controller checks

Suggested next steps (if you want this to become a full app):

- Add auth (JWT/session) and protect admin routes
- Add Products/Orders schemas + CRUD endpoints and connect dashboard UI
- Make landing page Gallery/Testimonials fetch from `/api/gallery` and `/api/reviews`
- Add admin panel pages to manage contacts/gallery/reviews


