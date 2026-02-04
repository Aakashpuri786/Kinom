# Backend Dockerfile
FROM node:18-alpine

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package.json package-lock.json* ./
RUN npm install --production

# Bundle app source
COPY . .

# Expose port and run
ENV PORT=5000
EXPOSE 5000
CMD ["npm", "start"]
