@echo off
REM Quick Installation Guide for LPU Internet Auto-Login Extension on Windows
REM This script provides installation instructions

title LPU Internet Auto-Login - Setup Guide
color 0A
cls

echo.
echo ================================
echo LPU Internet Auto-Login Setup
echo ================================
echo.
echo This extension will automatically login to:
echo https://internet.lpu.in/24online/servlet/E24onlineHTTPClient
echo.

if exist "extension" (
    echo [SUCCESS] Extension folder found!
) else (
    echo [ERROR] Extension folder not found!
    echo Please make sure you're in the correct directory.
    pause
    exit /b 1
)

echo.
echo INSTALLATION STEPS:
echo ==================
echo.
echo 1. Open Google Chrome
echo.
echo 2. Go to chrome://extensions/
echo    (Copy and paste the URL in the address bar)
echo.
echo 3. Toggle ON "Developer mode" (top right corner)
echo.
echo 4. Click "Load unpacked"
echo.
echo 5. Navigate to this folder and select the "extension" subfolder
echo    Current location: %cd%\extension
echo.
echo 6. The extension will appear in your Chrome!
echo.
echo ==================
echo USING THE EXTENSION:
echo ==================
echo.
echo 1. Click the extension icon in Chrome (top right)
echo.
echo 2. Enter your credentials:
echo    - Registration Number
echo    - Internet Password
echo.
echo 3. Click "Save ^& Auto-Login"
echo.
echo 4. The extension will automatically fill and submit the login form!
echo.
echo.
pause
