@echo off
cd /d %~dp0
node build.mjs
if %ERRORLEVEL% EQU 0 (
    node cli.js %*
)

