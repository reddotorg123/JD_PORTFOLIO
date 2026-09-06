@echo off
title Jagadish K - Live Wallpaper Launcher
echo Starting Jagadish K Live Wallpaper in Kiosk Mode...
set HTML_PATH=%~dp0index.html

:: Try launching in Edge App Mode (Clean, borderless window)
start msedge --app="file:///%HTML_PATH%" --start-fullscreen

:: Fallback if Edge isn't default
if %ERRORLEVEL% NEQ 0 (
  start "" "%HTML_PATH%"
)
