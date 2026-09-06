@echo off
title Build Standalone Windows Executable & Installer (.exe)
color 0B
echo =====================================================================
echo  REDDOT WORKSTATION OS - STANDALONE WINDOWS BUILDER
echo =====================================================================
echo.
echo Packaging REDDOT Workstation into standalone Windows .exe installer and portable executable...
echo Target output folder: release/
echo.
cd /d "%~dp0"
npx -y electron-builder --win
if %ERRORLEVEL% EQU 0 (
  echo.
  echo [SUCCESS] Windows Installer & Portable Executable built successfully!
  echo Check the "release" directory for your .exe files.
) else (
  echo.
  echo [WARNING] Build encountered an error. Ensure internet connection is active for electron-builder binaries.
)
pause
