@echo off
cd /d "%~dp0"
echo Starting local server for AI_for_PE_Algorithm_Selector ...
echo.
echo Open in your browser:
echo   http://127.0.0.1:8765/
echo.
echo Press Ctrl+C in this window to stop the server.
echo.
python -m http.server 8765
