Set-Location $PSScriptRoot
Write-Host "Starting local server..." -ForegroundColor Cyan
Write-Host "Open: http://127.0.0.1:8765/" -ForegroundColor Green
Write-Host "Press Ctrl+C to stop.`n"
python -m http.server 8765
