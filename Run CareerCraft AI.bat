
@echo off
cd /d "C:\Users\hp\resume-maker\ai-resume-job-matcher"

start "Python AI" cmd /k "cd /d C:\Users\hp\resume-maker\ai-resume-job-matcher && py ai\app.py"

timeout /t 3 /nobreak >nul

start "Node Backend" cmd /k "cd /d C:\Users\hp\resume-maker\ai-resume-job-matcher\backend && node server.js"

timeout /t 3 /nobreak >nul

start "React Frontend" cmd /k "cd /d C:\Users\hp\resume-maker\ai-resume-job-matcher\frontend && npm run dev -- --host 127.0.0.1 --port 5173 --strictPort"

timeout /t 6 /nobreak >nul

start "" "http://localhost:5173"

exit
