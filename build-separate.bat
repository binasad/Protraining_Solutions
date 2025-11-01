@echo off
REM Build and run frontend and backend separately with 4 distinct images
REM This script builds each service independently and then runs them

echo Building and running protraining-solutions with 4 separate images...

REM Build frontend runtime image
echo Building frontend runtime image...
docker build -f Dockerfile.frontend.serve --target frontend-runtime -t protraining-frontend-runtime:latest .
if %ERRORLEVEL% neq 0 (
    echo Frontend runtime build failed!
    exit /b 1
)

REM Build backend runtime image
echo Building backend runtime image...
docker build -f Dockerfile.backend.serve --target backend-runtime -t protraining-backend-runtime:latest .
if %ERRORLEVEL% neq 0 (
    echo Backend runtime build failed!
    exit /b 1
)

REM Build frontend builder image (optional, for CI/CD)
echo Building frontend builder image...
docker build -f Dockerfile.frontend.build --target frontend-builder -t protraining-frontend-builder:latest .
if %ERRORLEVEL% neq 0 (
    echo Frontend builder build failed!
    exit /b 1
)

REM Build backend builder image (optional, for CI/CD)
echo Building backend builder image...
docker build -f Dockerfile.backend.build --target backend-builder -t protraining-backend-builder:latest .
if %ERRORLEVEL% neq 0 (
    echo Backend builder build failed!
    exit /b 1
)

echo All 4 images built successfully!
echo Images created:
echo   - protraining-frontend-runtime:latest
echo   - protraining-backend-runtime:latest
echo   - protraining-frontend-builder:latest
echo   - protraining-backend-builder:latest

REM Run backend first
echo Starting backend...
start /B docker run -d --name protraining-backend -p 5000:5000 protraining-backend-runtime:latest

REM Wait a moment for backend to start
timeout /t 5 /nobreak >nul

REM Run frontend
echo Starting frontend...
start /B docker run -d --name protraining-frontend -p 80:80 protraining-frontend-runtime:latest

echo Services started!
echo Frontend: http://localhost:80
echo Backend: http://localhost:5000
echo.
echo To stop services:
echo   docker stop protraining-frontend protraining-backend
echo   docker rm protraining-frontend protraining-backend
echo.
echo To view all images:
echo   docker images | findstr protraining

pause
