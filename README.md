# Original Selfbot by John#0969, this Fork and its modifications by PapaJohn#7777
In order to run the bot, you must create a Credentials.json file, following the same format as the Credentials Example.json file. This will by default be gitignored, to prevent any accidental commits of your token.



# Commands in this Fork

n - nickname

8 - 8ball

l - ( ͡° ͜ʖ ͡°)

s - shrug

ping - sends ping

p - prunes messages

reboot - restarts the selfbot

fe - fake eval

e - eval

stats - statistics

r - instantly deletes the message

ut - bot uptime 

servers - displays the names of all servers you're in

ss - alternate statistics

emoji - sends your message in emojis

avatar - links the avatar of a pinged user

us - shows statistics for yourself, a pinged user, or a user with the specified display name / nickname

gs - shows statistics for current guild

status - sets your status to what you specify

discrim - finds users with the same descriminator that you specify (helpful for discrim rerolling)

Using just the prefix then a message will send the message in an embed

[For other aliases to commands, look into app.js under the command switch, should be pretty obvious]

# Things to NOT do

eval credentials, this will leak your token and access to your account

# Other Info

This fork will log all commands in the command prompt for you

# Install Help (Windows)
1. Install node.js (most recent version) with npm [If this causes you trouble, http://blog.teamtreehouse.com/install-node-js-npm-windows]

2. install git and add to a folder with the selfbot files (Shift+right click, open git gui here)

3. open command prompt in that folder (Shift+right click, command prompt option) and run the command: npm i -S hydrabolt/discord.js

4. rename "credentials example.json" to "credentials.json" and add your discord token where it obviously goes (and change prefix to whatever you want)

5. now run RunSelfBot.bat

===========

To update, just install the new selfbot files and replace the old ones and make sure credentials.json is formatted correctly
