Write-Host "Building and running ProTraining Solutions Docker container..." -ForegroundColor Green
Write-Host ""

Write-Host "Building Docker image..." -ForegroundColor Yellow
docker build -t protraining-solutions .

if ($LASTEXITCODE -ne 0) {
    Write-Host "Error: Docker build failed!" -ForegroundColor Red
    Read-Host "Press Enter to continue"
    exit 1
}

Write-Host ""
Write-Host "Build successful! Starting container..." -ForegroundColor Green
Write-Host ""

Write-Host "Running container on port 5000..." -ForegroundColor Yellow
docker run -p 5000:5000 --env-file .env protraining-solutions

Write-Host ""
Write-Host "Container stopped." -ForegroundColor Yellow
Read-Host "Press Enter to continue"
