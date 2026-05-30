@echo off
echo =======================================
echo   PUSHING TO GITHUB
echo =======================================
echo.
set /p REPO_URL="Paste your GitHub Repository URL (e.g. https://github.com/username/repo-name.git): "
if "%REPO_URL%"=="" (
    echo Error: Repository URL cannot be empty.
    pause
    exit /b
)

echo.
echo Renaming branch to main...
git branch -M main

echo.
echo Adding remote origin...
git remote remove origin >nul 2>&1
git remote add origin %REPO_URL%

echo.
echo Pushing code to GitHub...
echo (If prompted, log in to GitHub via the popup window)
git push -u origin main

echo.
echo =======================================
echo   FINISHED PUSHING!
echo =======================================
echo Now go to vercel.com, import this repository, and click Deploy.
pause
