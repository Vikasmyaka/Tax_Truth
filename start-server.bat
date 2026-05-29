@echo off
title TaxTruth Dev Server
echo ===================================================
echo Starting TaxTruth Development Server...
echo ===================================================
echo.

:: Check for node_modules directory
if not exist node_modules (
    echo node_modules not found. Installing dependencies...
    call npm install
)

:: Start Vite dev server
echo Starting Vite server on http://localhost:5173 ...
start http://localhost:5173
call npm run dev

pause
