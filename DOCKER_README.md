# Docker Multi-Stage Build for ProTraining Solutions

This project uses a multi-stage Docker build to create a single container that runs both the React frontend and Node.js backend.

## Architecture

The Docker build process consists of three stages:

1. **Frontend Builder**: Builds the React application
2. **Backend Builder**: Prepares the Node.js backend
3. **Production Runtime**: Combines both and runs the application

## Prerequisites

- Docker installed on your system
- Docker Compose (optional, for easier management)

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```bash
# Application Configuration
NODE_ENV=production
PORT=5000

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/protraining_solutions

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-here

# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key_here

# Frontend URL (used for CORS)
FRONTEND_URL=http://localhost:5000

# Email Configuration (if using nodemailer)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

## Building and Running

### Option 1: Using Docker directly

1. **Build the image:**
   ```bash
   docker build -t protraining-solutions .
   ```

2. **Run the container:**
   ```bash
   docker run -p 5000:5000 --env-file .env protraining-solutions
   ```

### Option 2: Using Docker Compose (Recommended)

1. **Build and run:**
   ```bash
   docker-compose up --build
   ```

2. **Run in background:**
   ```bash
   docker-compose up -d --build
   ```

3. **Stop the services:**
   ```bash
   docker-compose down
   ```

## Accessing the Application

- **Frontend**: http://localhost:5000
- **Backend API**: http://localhost:5000/api
- **Health Check**: http://localhost:5000/api/health

## How It Works

1. **Frontend Build**: The React app is built using `npm run build`
2. **Static File Serving**: The built frontend files are copied to `backend/public/`
3. **Unified Server**: The Express.js backend serves both API routes and static frontend files
4. **Single Container**: Everything runs in one container on port 5000

## Benefits of This Approach

- **Single Container**: Easier deployment and management
- **Optimized Build**: Multi-stage build reduces final image size
- **Unified Port**: Both frontend and backend accessible on the same port
- **Production Ready**: Includes health checks, non-root user, and proper signal handling

## Troubleshooting

### Build Issues
- Ensure all dependencies are properly listed in package.json files
- Check that the Dockerfile paths match your project structure

### Runtime Issues
- Verify environment variables are set correctly
- Check container logs: `docker logs <container_id>`
- Ensure the MongoDB connection string is correct

### Port Conflicts
- Change the port mapping in docker-compose.yml if port 5000 is already in use
- Update the FRONTEND_URL environment variable accordingly

## Development vs Production

- **Development**: Use `npm run dev` in the backend for hot reloading
- **Production**: The Docker setup uses `npm start` for production mode

## Security Features

- Non-root user execution
- Helmet.js security headers
- Rate limiting
- CORS configuration
- Environment variable management
