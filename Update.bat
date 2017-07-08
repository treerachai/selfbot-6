@echo off
title Updating Papa John's Selfbot...
ECHO Pulling the new files, this should be quick and errorless.
git pull
ECHO Updating the dependencies, any warning messages related to discord.js should be ignored.
npm update
pause
