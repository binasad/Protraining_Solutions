# Build and run frontend and backend separately with 4 distinct images
# This script builds each service independently and then runs them

Write-Host "Building and running protraining-solutions with 4 separate images..." -ForegroundColor Green

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

# Build frontend runtime image
Write-Host "Building frontend runtime image..." -ForegroundColor Yellow
docker build -f Dockerfile.frontend.serve --target frontend-runtime -t protraining-frontend-runtime:latest .

if ($LASTEXITCODE -ne 0) {
    Write-Host "Frontend runtime build failed!" -ForegroundColor Red
    exit 1
}

# Build backend runtime image
Write-Host "Building backend runtime image..." -ForegroundColor Yellow
docker build -f Dockerfile.backend.serve --target backend-runtime -t protraining-backend-runtime:latest .

if ($LASTEXITCODE -ne 0) {
    Write-Host "Backend runtime build failed!" -ForegroundColor Red
    exit 1
}

# Build frontend builder image (optional, for CI/CD)
Write-Host "Building frontend builder image..." -ForegroundColor Yellow
docker build -f Dockerfile.frontend.build --target frontend-builder -t protraining-frontend-builder:latest .

if ($LASTEXITCODE -ne 0) {
    Write-Host "Frontend builder build failed!" -ForegroundColor Red
    exit 1
}

# Build backend builder image (optional, for CI/CD)
Write-Host "Building backend builder image..." -ForegroundColor Yellow
docker build -f Dockerfile.backend.build --target backend-builder -t protraining-backend-builder:latest .

if ($LASTEXITCODE -ne 0) {
    Write-Host "Backend builder build failed!" -ForegroundColor Red
    exit 1
}

Write-Host "All 4 images built successfully!" -ForegroundColor Green
Write-Host "Images created:" -ForegroundColor Cyan
Write-Host "  - protraining-frontend-runtime:latest" -ForegroundColor White
Write-Host "  - protraining-backend-runtime:latest" -ForegroundColor White
Write-Host "  - protraining-frontend-builder:latest" -ForegroundColor White
Write-Host "  - protraining-backend-builder:latest" -ForegroundColor White

# Run backend first
Write-Host "Starting backend..." -ForegroundColor Yellow
Start-Process -NoNewWindow -FilePath "docker" -ArgumentList "run", "-d", "--name", "protraining-backend", "-p", "5000:5000", "protraining-backend-runtime:latest"

# Wait a moment for backend to start
Start-Sleep -Seconds 5

# Run frontend
Write-Host "Starting frontend..." -ForegroundColor Yellow
Start-Process -NoNewWindow -FilePath "docker" -ArgumentList "run", "-d", "--name", "protraining-frontend", "-p", "80:80", "protraining-frontend-runtime:latest"

Write-Host "Services started!" -ForegroundColor Green
Write-Host "Frontend: http://localhost:80" -ForegroundColor Cyan
Write-Host "Backend: http://localhost:5000" -ForegroundColor Cyan
Write-Host ""
Write-Host "To stop services:" -ForegroundColor Yellow
Write-Host "  docker stop protraining-frontend protraining-backend" -ForegroundColor White
Write-Host "  docker rm protraining-frontend protraining-backend" -ForegroundColor White
Write-Host ""
Write-Host "To view all images:" -ForegroundColor Yellow
Write-Host "  docker images | findstr protraining" -ForegroundColor White
