@echo off
title Updating Selfbot...
ECHO This could take a couple minutes, so just leave it alone, dont worry if you get any errors. Also DO NOT CLOSE this window. It will close itself.
pause
git pull
npm i -S hydrabolt/discord.js
title Finished Updating
pause
