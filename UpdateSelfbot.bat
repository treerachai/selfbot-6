@echo off
title Updating Selfbot...
ECHO This part should be quick and not give any errors
git pull
ECHO =
ECHO Finished updating selfbot files, if you would like to update discord.js too, continue. If not, close this window
pause
ECHO Updating discord.js, you WILL get errors while doing this, don't worry.
ECHO This window will close itself when it is finished, DO NOT CLOSE IT MANUALLY
npm i -S hydrabolt/discord.js
pause
