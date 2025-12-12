# Start the web UI server and open it in the browser
$ErrorActionPreference = "Stop"

# Change to script directory
Set-Location $PSScriptRoot

# Pull latest changes from uma-tools repositories
Write-Host "Pulling latest changes from uma-tools..."
Push-Location "C:\Users\TrueM\Repos\uma-tools"
git pull
if ($LASTEXITCODE -ne 0) {
    Write-Warning "Failed to pull uma-tools, continuing anyway..."
}
Pop-Location

Write-Host "Pulling latest changes from uma-skill-tools..."
Push-Location "C:\Users\TrueM\Repos\uma-tools\uma-skill-tools"
git pull
if ($LASTEXITCODE -ne 0) {
    Write-Warning "Failed to pull uma-skill-tools, continuing anyway..."
}
Pop-Location

# Rebuild the project
Write-Host "Rebuilding project..."
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Error "Build failed!"
    exit 1
}

# Start the server in a new window
Start-Process powershell -ArgumentList "-NoExit", "-Command", "npm run web"

# Wait a moment for the server to start
Start-Sleep -Seconds 2

# Open the browser
Start-Process "http://localhost:3000"

