# Docker setup for Kinom ✅

This setup runs MongoDB, the backend API and the frontend together.

Development (fast feedback, HMR):

- Start and open the apps (PowerShell):

  .\start-dev.ps1

  This script will:
  - Run `docker-compose up --build -d`
  - Wait for the frontend and backend health endpoint to respond
  - Open the frontend URL and backend health URL in your default browser when available

- Stop the dev stack:

  .\stop-dev.ps1

Ports (development):

- Frontend (Vite dev server): http://localhost:5173
- Backend API: http://localhost:5001
- MongoDB: 27017

Production build (static):

- To build static frontend assets and run nginx + backend in production style, use the existing Dockerfiles and run:

  docker-compose up --build

Notes & tips:

- The dev scripts are Windows PowerShell helpers. On macOS/Linux you can run `docker-compose up --build -d` and then open the URLs manually.
- The frontend is configured in dev mode to bind to 0.0.0.0 so it is reachable from the host via `http://localhost:5173` and supports HMR.
- If you want clickable links directly inside Docker Desktop, I can add compose metadata/labels or a small "linker" service — let me know which you prefer.
