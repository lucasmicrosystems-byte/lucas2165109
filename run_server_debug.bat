@echo off
echo Starting AgriVerse Debug Mode...
echo Launcher started at %DATE% %TIME% > debug_log.txt

echo.
echo === STEP 1: Checking Python and Pip ===
echo === STEP 1: Checking Python and Pip === >> debug_log.txt
python --version >> debug_log.txt 2>&1
pip --version >> debug_log.txt 2>&1

echo.
echo === STEP 2: Installing Dependencies ===
echo === STEP 2: Installing Dependencies === >> debug_log.txt
pip install fastapi uvicorn sqlalchemy pydantic python-multipart email-validator >> debug_log.txt 2>&1

echo.
echo === STEP 3: Starting Uvicorn Server ===
echo === STEP 3: Starting Uvicorn Server === >> debug_log.txt
cd backend
python -m uvicorn app.main:app --host 127.0.0.1 --port 8000 >> ../debug_log.txt 2>&1
pause
