# Multi-stage Docker build for protraining-solutions
# Stage 1: Build React frontend
FROM node:18-alpine AS frontend-builder

WORKDIR /app/frontend

# Copy frontend package files
COPY package*.json ./
COPY tsconfig.json ./

# Install frontend dependencies
RUN npm ci --only=production

# Copy frontend source code
COPY src/ ./src/
COPY public/ ./public/

# Build the React application
RUN npm run build

# Stage 2: Build Node.js backend
FROM node:18-alpine AS backend-builder

WORKDIR /app/backend

# Copy backend package files
COPY backend/package*.json ./

# Install backend dependencies
RUN npm ci --only=production

# Copy backend source code
COPY backend/ ./

# Stage 3: Production runtime
FROM node:18-alpine AS production

# Install dumb-init for proper signal handling
RUN apk add --no-cache dumb-init

# Create app directory
WORKDIR /app

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

# Copy backend dependencies and source
COPY --from=backend-builder --chown=nodejs:nodejs /app/backend ./backend

# Copy frontend build
COPY --from=frontend-builder --chown=nodejs:nodejs /app/frontend/build ./backend/public

# Set working directory to backend
WORKDIR /app/backend

# Expose port
EXPOSE 5000

# Switch to non-root user
USER nodejs

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:5000/api/health', (res) => { process.exit(res.statusCode === 200 ? 0 : 1) })"

# Start the application
ENTRYPOINT ["dumb-init", "--"]
CMD ["npm", "start"]
