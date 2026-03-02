#!/bin/bash

echo "Starting Buildconnect project..."

# Frontend
if [ -d "Buildconnect" ]; then
    cd Buildconnect
    if [ ! -d "node_modules" ]; then
        echo "Frontend node_modules not found. Running npm install..."
        npm install
    fi
    echo "Starting Frontend in background..."
    npm run dev &
    cd ..
fi

# Backend (if exists and has package.json)
if [ -f "buildconnect_backend/package.json" ]; then
    echo "Starting Backend in WSL..."
    cd buildconnect_backend
    if [ ! -d "node_modules" ]; then
        echo "Backend node_modules not found. Running npm install..."
        npm install
    fi
    # Use explicit 0.0.0.0 for WSL reachability
    PORT=5000 npm run dev &
    cd ..
fi

echo "Project components are starting. Backend is on port 5000."
wait
