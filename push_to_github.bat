@echo off
echo ===================================================
echo      AgriVerse GitHub Repository Publisher
echo ===================================================
echo.

:: Check if git is installed
where git >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] Git is not installed or not in your system PATH.
    echo Please install Git from https://git-scm.com/ and try again.
    echo.
    pause
    exit /b
)

:: 1. Initialize git repository first (Required for local configurations)
if not exist .git (
    echo Initializing Git repository...
    git init
    
    :: Write standard gitignore
    echo node_modules/ > .gitignore
    echo .venv/ >> .gitignore
    echo venv/ >> .gitignore
    echo debug_log.txt >> .gitignore
    echo .idea/ >> .gitignore
    echo .vscode/ >> .gitignore
    echo *.db >> .gitignore
    echo debug.log >> .gitignore
)

:: 2. Check and set Git user identity locally inside this repo folder
git config user.name >nul 2>&1
if %errorlevel% neq 0 (
    echo [INFO] Git User Name is not configured in this repository.
    set /p GIT_NAME="Enter your name (e.g. Lucas): "
    git config user.name "%GIT_NAME%"
    echo Git User Name configured locally.
    echo.
)

git config user.email >nul 2>&1
if %errorlevel% neq 0 (
    echo [INFO] Git User Email is not configured in this repository.
    set /p GIT_EMAIL="Enter your GitHub email (e.g. lucas@example.com): "
    git config user.email "%GIT_EMAIL%"
    echo Git User Email configured locally.
    echo.
)

:: 3. Add files and commit
echo.
echo Adding files to git staging...
git add -A
echo.
echo Creating initial commit...
git commit -m "Initial commit - AgriVerse Smart Farming Ecosystem"

if %errorlevel% neq 0 (
    echo.
    echo [ERROR] Git commit failed. Checking status...
    git status
    echo.
    echo Press any key to try committing again.
    pause
    git commit -m "Initial commit"
)

:: 4. Setup remote
echo.
echo Your GitHub username is: lucasmicrosystem
set /p REPO_NAME="Enter your GitHub Repository Name (Press Enter for default: AgriVerse): "
if "%REPO_NAME%"=="" set REPO_NAME=AgriVerse

set REMOTE_URL=https://github.com/lucasmicrosystem/%REPO_NAME%.git
echo.
echo Setting remote origin to %REMOTE_URL%...
git remote remove origin >nul 2>nul
git remote add origin %REMOTE_URL%

:: 5. Push to main branch
echo.
echo Pushing code to branch 'main'...
echo (Note: If this is the first push, Windows Git Credential Manager will ask you to sign in to GitHub)
echo.
git branch -M main
git push -u origin main

if %errorlevel% neq 0 (
    echo.
    echo ---------------------------------------------------
    echo [ERROR] Push failed.
    echo 1. Ensure you have created a repository named "%REPO_NAME%" on GitHub:
    echo    https://github.com/new
    echo 2. Verify you are logged into your GitHub account in the credential manager.
    echo ---------------------------------------------------
) else (
    echo.
    echo ===================================================
    echo [SUCCESS] Code pushed successfully to:
    echo %REMOTE_URL%
    echo ===================================================
)
echo.
pause
