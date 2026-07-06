@echo off
echo ===================================================
echo   AgriVerse - Smart Farming Ecosystem Launcher
echo ===================================================
echo.
echo Installing Python dependencies...
pip install fastapi uvicorn sqlalchemy pydantic python-multipart email-validator
echo.
echo Starting FastAPI application server...
cd backend
python -m uvicorn app.main:app --host 127.0.0.1 --port 8000
pause
