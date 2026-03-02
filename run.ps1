# Buildconnect Robust Run Script
# Purpose: Run both Backend and Frontend in separate windows with automated setup and port cleanup.

$ErrorActionPreference = "Continue" # Don't stop if kill fails

Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "   Buildconnect Project Launcher          " -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan

# 1. Check Node.js
try {
    $nodeVersion = node -v
    Write-Host "[OK] Node.js is installed ($nodeVersion)" -ForegroundColor Green
} catch {
    Write-Host "[ERROR] Node.js is not installed or not in PATH." -ForegroundColor Red
    Write-Host "Please install Node.js from https://nodejs.org/" -ForegroundColor Yellow
    pause
    exit
}

# 2. Port Cleanup Function
function Use-PortCleanup {
    param ([int]$Port)
    $process = Get-NetTCPConnection -LocalPort $Port -State Listen -ErrorAction SilentlyContinue
    if ($process) {
        Write-Host "[FIX] Port $Port is in use by PID $($process.OwningProcess). Killing it to avoid conflict..." -ForegroundColor Yellow
        Stop-Process -Id $process.OwningProcess -Force -ErrorAction SilentlyContinue
    }
}

# 3. Function to setup and start a component
function Start-Component {
    param (
        [string]$Path,
        [string]$Name,
        [string]$Command = "npm run dev",
        [string]$BinaryCheck = "",
        [int]$Port = 0
    )

    $fullPath = Resolve-Path $Path
    if (-not (Test-Path "$fullPath\package.json")) {
        Write-Host "[SKIP] $Name folder or package.json not found at $Path" -ForegroundColor Red
        return
    }

    Write-Host "[INFO] Processing $Name..." -ForegroundColor Cyan

    # Cleanup port if specified
    if ($Port -gt 0) {
        Use-PortCleanup -Port $Port
    }

    # Check node_modules status
    $needsInstall = $false
    if (-not (Test-Path "$fullPath\node_modules")) {
        $needsInstall = $true
        Write-Host "[SETUP] node_modules missing for $Name." -ForegroundColor Yellow
    }
    elseif ($BinaryCheck -ne "") {
        $binPath = Join-Path "$fullPath\node_modules\.bin" $BinaryCheck
        if (-not (Test-Path $binPath)) {
            $needsInstall = $true
            Write-Host "[SETUP] Core binary '$BinaryCheck' missing for $Name." -ForegroundColor Yellow
        }
        elseif ((Get-Item $binPath).Length -eq 0) {
            $needsInstall = $true
            Write-Host "[FIX] node_modules seems corrupted (0-byte binaries) for $Name." -ForegroundColor Yellow
        }
    }

    if ($needsInstall) {
        Write-Host "[INSTALL] Running npm install in $Path... (This may take a minute)" -ForegroundColor Yellow
        Start-Process cmd -ArgumentList "/c", "cd /d `"$fullPath`" && npm install" -Wait
    }

    # Start the dev server in a new window
    Write-Host "[LAUNCH] Starting $Name server..." -ForegroundColor Green
    $launchCmd = "cd /d `"$fullPath`" && title $Name && $Command"
    Start-Process cmd -ArgumentList "/k", $launchCmd
}

# 4. Launch Components
Write-Host "`nInitializing Frontend and Backend..." -ForegroundColor Cyan

# Start Frontend (Buildconnect folder) - Port 5173
Start-Component -Path ".\Buildconnect" -Name "Frontend" -BinaryCheck "vite" -Port 5173

# Start Backend (buildconnect_backend folder) - Port 8000 (standard for this project)
Start-Component -Path ".\buildconnect_backend" -Name "Backend" -Port 8000

Write-Host "`n==========================================" -ForegroundColor Cyan
Write-Host "Servers should be opening in new windows." -ForegroundColor Cyan
Write-Host "Frontend: http://localhost:5173" -ForegroundColor Gray
Write-Host "Backend:  http://localhost:8000" -ForegroundColor Gray
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "Press any key to close this window..."
pause
