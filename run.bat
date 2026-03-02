@echo off
:: Buildconnect One-Click Launcher
:: This script runs the PowerShell launcher with the necessary execution policy bypass.

set SCRIPT_DIR=%~dp0
powershell -NoProfile -ExecutionPolicy Bypass -File "%SCRIPT_DIR%run.ps1"

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo [ERROR] The launcher failed to start.
    echo Please make sure Node.js is installed.
    pause
)
