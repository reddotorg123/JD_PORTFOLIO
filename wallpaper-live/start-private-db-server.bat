@echo off
title REDDOT Private Secure Database & Sync Server
color 0A
echo =====================================================================
echo  REDDOT ARCHITECTURE - PRIVATE SECURE DATABASE & SYNC SERVER
echo =====================================================================
echo Starting local dedicated HTTP & WebSocket synchronization server on port 8765...
echo.
cd /d "%~dp0"
node server/server.js
pause
