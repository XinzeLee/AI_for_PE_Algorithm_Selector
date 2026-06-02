Set-Location $PSScriptRoot
$env:SELECTOR_SERVER_PARENT = "$PID"

$parentProcess = Get-CimInstance Win32_Process -Filter "ProcessId=$PID" -ErrorAction SilentlyContinue
if ($parentProcess.ParentProcessId) {
  $env:SELECTOR_SERVER_ANCESTOR = "$($parentProcess.ParentProcessId)"
}

Write-Host "Starting local server for AI_for_PE_Algorithm_Selector ..." -ForegroundColor Cyan
Write-Host ""
Write-Host "Open in your browser:" -ForegroundColor Green
Write-Host "  http://127.0.0.1:8765/" -ForegroundColor Green
Write-Host ""
Write-Host "Tip: hard-refresh once (Ctrl+F5) if styles look stale."
Write-Host "Press Ctrl+C or close this window to stop the server.`n"

try {
  python -u "$PSScriptRoot\serve.py"
} finally {
  Remove-Item Env:\SELECTOR_SERVER_PARENT -ErrorAction SilentlyContinue
  Remove-Item Env:\SELECTOR_SERVER_ANCESTOR -ErrorAction SilentlyContinue
}
