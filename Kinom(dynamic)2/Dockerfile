# Multi-stage Dockerfile for Render deployment
# Stage 1: Build frontend
FROM node:18-alpine AS frontend-builder
WORKDIR /app/frontend

COPY frontend/package*.json ./
RUN npm install

COPY frontend/ .
RUN npm run build

# Stage 2: Build and run backend with frontend static files
FROM node:18-alpine

WORKDIR /app

# Copy backend dependencies
COPY backend/package*.json ./
RUN npm install --production

# Copy backend code
COPY backend/ .

# Copy built frontend to backend public directory
RUN mkdir -p public
COPY --from=frontend-builder /app/frontend/dist ./public

# Set environment variables for Render
ENV NODE_ENV=production
ENV PORT=10000

EXPOSE 10000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:' + (process.env.PORT || 10000), (r) => {if (r.statusCode !== 200) throw new Error(r.statusCode)})"

CMD ["npm", "start"]
