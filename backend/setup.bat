@echo off
REM VerbAItim Backend — one-time setup script (Windows)
REM Run from the backend directory: cd backend && setup.bat

echo.
echo =============================================
echo  VerbAItim Backend Setup
echo =============================================
echo.

REM Check for Python
python --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Python not found. Install Python 3.10+ from https://python.org
    pause & exit /b 1
)

REM Check for ffmpeg
ffmpeg -version >nul 2>&1
if errorlevel 1 (
    echo WARNING: ffmpeg not found on PATH.
    echo Audio conversion (WebM to WAV) will be unavailable.
    echo Install it with:  winget install ffmpeg
    echo Then restart this terminal and run setup.bat again.
    echo.
)

REM Create and activate virtual environment
if not exist ".venv" (
    echo Creating virtual environment...
    python -m venv .venv
)

call .venv\Scripts\activate.bat

REM Upgrade pip silently
python -m pip install --upgrade pip --quiet

REM Install core dependencies first (fast)
echo Installing FastAPI, uvicorn, pydub, webrtcvad...
pip install fastapi uvicorn[standard] python-multipart pydub webrtcvad --quiet

REM Install torch CPU (large download ~200MB)
echo.
echo Installing PyTorch (CPU build) — this may take a few minutes...
pip install torch torchaudio --index-url https://download.pytorch.org/whl/cpu --quiet

REM Install Allosaurus (downloads model weights on first run)
echo Installing Allosaurus...
pip install allosaurus --quiet

echo.
echo =============================================
echo  Setup complete!
echo =============================================
echo.
echo To start the backend:
echo   cd backend
echo   .venv\Scripts\activate.bat
echo   uvicorn main:app --reload --port 8001
echo.
pause
