@echo off
echo Running Git Diagnostic Test...
echo Start: %DATE% %TIME% > git_debug.log

echo. >> git_debug.log
echo === PATH CHECK === >> git_debug.log
where git >> git_debug.log 2>&1

echo. >> git_debug.log
echo === DIRECTORY LIST === >> git_debug.log
dir >> git_debug.log 2>&1

echo. >> git_debug.log
echo === GIT STATUS BEFORE === >> git_debug.log
git status >> git_debug.log 2>&1

echo. >> git_debug.log
echo === CONFIG CHECK === >> git_debug.log
git config -l --local >> git_debug.log 2>&1

echo. >> git_debug.log
echo === STAGING FILES === >> git_debug.log
git add -A >> git_debug.log 2>&1
git status >> git_debug.log 2>&1

echo. >> git_debug.log
echo === COMMITTING === >> git_debug.log
git commit -m "Diagnostic commit" >> git_debug.log 2>&1
git log -n 1 >> git_debug.log 2>&1

echo. >> git_debug.log
echo === BRANCHES === >> git_debug.log
git branch >> git_debug.log 2>&1

echo Done! Diagnostic logs written to git_debug.log.
pause
