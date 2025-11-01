# Docker 4-Image Architecture for Frontend and Backend

This setup provides **4 separate Docker images** for frontend and backend, allowing for complete separation of build and runtime environments, optimized for different use cases.

## Architecture Overview

The system creates **4 distinct Docker images**:

1. **`protraining-frontend-builder:latest`** - Frontend build environment
2. **`protraining-frontend-runtime:latest`** - Frontend runtime with Nginx
3. **`protraining-backend-builder:latest`** - Backend build environment  
4. **`protraining-backend-runtime:latest`** - Backend runtime with Node.js

## Image Purposes

### Build Images (for CI/CD and Development)
- **Frontend Builder**: Contains Node.js and build tools to compile React app
- **Backend Builder**: Contains Node.js and dependencies for backend compilation

### Runtime Images (for Production and Development)
- **Frontend Runtime**: Lightweight Nginx server serving built React app
- **Backend Runtime**: Optimized Node.js server running the API

## File Structure

```
├── Dockerfile.frontend.build      # Creates protraining-frontend-builder
├── Dockerfile.frontend.serve      # Creates protraining-frontend-runtime
├── Dockerfile.backend.build       # Creates protraining-backend-builder
├── Dockerfile.backend.serve       # Creates protraining-backend-runtime
├── docker-compose.yml             # All 4 images + runtime services
├── docker-compose.prod.yml        # Runtime services only
├── docker-compose.dev.yml         # Runtime + build services
├── build-separate.ps1            # PowerShell script for all 4 images
└── build-separate.bat            # Batch script for all 4 images
```

## Quick Start

### Option 1: Build All 4 Images with Docker Compose

#### All Services (Including Build Images)
```bash
docker compose up --build
```

#### Production (Runtime Images Only)
```bash
docker compose -f docker-compose.prod.yml up --build
```

#### Development (All 4 Images)
```bash
docker compose -f docker-compose.dev.yml up --build
```

### Option 2: Using Build Scripts (Creates All 4 Images)

#### PowerShell
```powershell
.\build-separate.ps1
```

#### Batch File
```cmd
build-separate.bat
```

### Option 3: Manual Docker Commands

#### Build All 4 Images
```bash
# Frontend Runtime
docker build -f Dockerfile.frontend.serve --target frontend-runtime -t protraining-frontend-runtime:latest .

# Backend Runtime  
docker build -f Dockerfile.backend.serve --target backend-runtime -t protraining-backend-runtime:latest .

# Frontend Builder
docker build -f Dockerfile.frontend.build --target frontend-builder -t protraining-frontend-builder:latest .

# Backend Builder
docker build -f Dockerfile.backend.build --target backend-builder -t protraining-backend-builder:latest .
```

#### Run Runtime Services
```bash
# Start backend first
docker run -d --name protraining-backend -p 5000:5000 protraining-backend-runtime:latest

# Start frontend
docker run -d --name protraining-frontend -p 80:80 protraining-frontend-runtime:latest
```

## Image Details

### Frontend Builder Image (`protraining-frontend-builder`)
- **Base**: Node.js 18-alpine
- **Purpose**: Build React application
- **Output**: Built app in `/app/frontend/build`
- **Use Case**: CI/CD pipelines, development builds

### Frontend Runtime Image (`protraining-frontend-runtime`)
- **Base**: Nginx 1.27-alpine
- **Purpose**: Serve built React app
- **Port**: 80
- **Use Case**: Production deployment, development serving

### Backend Builder Image (`protraining-backend-builder`)
- **Base**: Node.js 18-alpine
- **Purpose**: Prepare backend dependencies
- **Output**: Backend with dependencies in `/app/backend`
- **Use Case**: CI/CD pipelines, dependency preparation

### Backend Runtime Image (`protraining-backend-runtime`)
- **Base**: Node.js 18-alpine
- **Purpose**: Run Node.js API server
- **Port**: 5000
- **Features**: dumb-init, health checks
- **Use Case**: Production deployment, development serving

## Environment Variables

### Frontend Runtime
- `NODE_ENV`: Set to `production` or `development`

### Backend Runtime
- `NODE_ENV`: Set to `production` or `development`
- `PORT`: API server port (default: 5000)

## Network Configuration

All services run on a custom bridge network `app-network` for secure inter-service communication.

## Volume Mounts

- **Backend Logs**: `./backend/logs:/app/logs`
- **Development Backend**: `./backend:/app/backend` (dev only)
- **Build Outputs**: Mounted to local directories for CI/CD

## Health Checks

The backend runtime includes a health check endpoint at `/api/health` for monitoring.

## Stopping Services

### Docker Compose
```bash
docker compose down
```

### Individual Containers
```bash
docker stop protraining-frontend protraining-backend
docker rm protraining-frontend protraining-backend
```

## Viewing All Images

To see all 4 created images:
```bash
docker images | grep protraining
```

Expected output:
```
protraining-frontend-runtime   latest    <hash>   <size>   <time>
protraining-backend-runtime    latest    <hash>   <size>   <time>
protraining-frontend-builder   latest    <hash>   <size>   <time>
protraining-backend-builder    latest    <hash>   <size>   <time>
```

## Troubleshooting

### Build Issues
1. Ensure Docker is running
2. Check for port conflicts (80, 5000)
3. Verify all source files are present
4. Use `--target` flag to build specific stages

### Runtime Issues
1. Check container logs: `docker logs <container-name>`
2. Verify network connectivity between services
3. Check environment variables are set correctly

### Port Conflicts
If ports 80 or 5000 are in use, modify the port mappings in the compose files:
```yaml
ports:
  - "8080:80"  # Frontend on 8080
  - "5001:5000"  # Backend on 5001
```

## Development Workflow

1. **Build All Images**: Use `docker-compose.dev.yml` or build scripts
2. **Runtime Services**: Use `docker-compose.prod.yml` for production
3. **Hot Reload**: Mount source directories for development
4. **Build Outputs**: Use separate build images for CI/CD

## Production Deployment

1. Use `docker-compose.prod.yml` (creates runtime images only)
2. Set `NODE_ENV=production`
3. Ensure proper logging and monitoring
4. Use reverse proxy for SSL termination
5. Implement proper health checks and restart policies

## CI/CD Integration

The build images are perfect for CI/CD pipelines:
- **Frontend Builder**: Use in build stage to compile React app
- **Backend Builder**: Use in build stage to prepare backend
- **Runtime Images**: Use in deployment stage for production

## Benefits of 4-Image Architecture

1. **Separation of Concerns**: Build and runtime environments are completely separate
2. **Optimization**: Runtime images contain only what's needed to run
3. **CI/CD Friendly**: Build images can be used in pipelines
4. **Development Flexibility**: Can use build images for development builds
5. **Production Ready**: Runtime images are optimized for production deployment
