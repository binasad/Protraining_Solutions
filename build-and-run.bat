@echo off
echo Building and running ProTraining Solutions Docker container...
echo.

echo Building Docker image...
docker build -t protraining-solutions .

if %ERRORLEVEL% NEQ 0 (
    echo Error: Docker build failed!
    pause
    exit /b 1
)

echo.
echo Build successful! Starting container...
echo.

echo Running container on port 5000...
docker run -p 5000:5000 --env-file .env protraining-solutions

echo.
echo Container stopped.
pause
