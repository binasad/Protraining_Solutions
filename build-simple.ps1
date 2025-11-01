# Simple build and run script for protraining-solutions
Write-Host "Building and running protraining-solutions..." -ForegroundColor Green

# Function to check if Docker is running
function Test-Docker {
    try {
        docker info > $null 2>&1
        return $true
    }
    catch {
        return $false
    }
}

# Check if Docker is running
if (-not (Test-Docker)) {
    Write-Host "Docker is not running. Please start Docker Desktop first." -ForegroundColor Red
    exit 1
}

# Clean up any existing containers
Write-Host "Cleaning up existing containers..." -ForegroundColor Yellow
docker stop protraining-frontend protraining-backend 2>$null
docker rm protraining-frontend protraining-backend 2>$null

# Build backend first
Write-Host "Building backend..." -ForegroundColor Yellow
docker build -f Dockerfile.backend.serve -t protraining-backend:latest .

if ($LASTEXITCODE -ne 0) {
    Write-Host "Backend build failed!" -ForegroundColor Red
    exit 1
}

# Build frontend
Write-Host "Building frontend..." -ForegroundColor Yellow
docker build -f Dockerfile.frontend.serve -t protraining-frontend:latest .

if ($LASTEXITCODE -ne 0) {
    Write-Host "Frontend build failed!" -ForegroundColor Red
    exit 1
}

Write-Host "Both builds completed successfully!" -ForegroundColor Green

# Run backend first
Write-Host "Starting backend..." -ForegroundColor Yellow
docker run -d --name protraining-backend -p 5000:5000 protraining-backend:latest

# Wait a moment for backend to start
Start-Sleep -Seconds 5

# Run frontend
Write-Host "Starting frontend..." -ForegroundColor Yellow
docker run -d --name protraining-frontend -p 80:80 protraining-frontend:latest

Write-Host "Services started!" -ForegroundColor Green
Write-Host "Frontend: http://localhost:80" -ForegroundColor Cyan
Write-Host "Backend: http://localhost:5000" -ForegroundColor Cyan
Write-Host ""
Write-Host "To stop services:" -ForegroundColor Yellow
Write-Host "  docker stop protraining-frontend protraining-backend" -ForegroundColor White
Write-Host "  docker rm protraining-frontend protraining-backend" -ForegroundColor White
Write-Host ""
Write-Host "To view logs:" -ForegroundColor Yellow
Write-Host "  docker logs protraining-backend" -ForegroundColor White
Write-Host "  docker logs protraining-frontend" -ForegroundColor White




