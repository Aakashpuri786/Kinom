# Frontend multi-stage Dockerfile (build with Vite, serve with nginx)
FROM node:18-alpine AS build
WORKDIR /app

# Build-time argument for API base URL (Vite reads VITE_ prefixed envs at build time)
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

COPY package.json package-lock.json* ./
RUN npm install

COPY . .
RUN npm run build

# Production image
FROM nginx:stable-alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
