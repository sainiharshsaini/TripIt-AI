@echo off
echo 🚀 Building TripIt AI for production...

REM Clean previous build
echo 🧹 Cleaning previous build...
if exist dist rmdir /s /q dist

REM Install dependencies if needed
echo 📦 Installing dependencies...
call npm ci --only=production

REM Build the application
echo 🔨 Building application...
call npm run build:prod

REM Check if build was successful
if %ERRORLEVEL% EQU 0 (
    echo ✅ Build successful!
    echo 📁 Build output: dist/
    echo 🌐 Preview your build: npm run preview:prod
) else (
    echo ❌ Build failed!
    exit /b 1
)
