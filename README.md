# Original Selfbot by John#0969, this Fork and its modifications by PapaJohn#7777
In order to run the bot, you must create a Credentials.json file, following the same format as the Credentials Example.json file. This will by default be gitignored, to prevent any accidental commits of your token.



# Commands in this Fork

n - nickname

8 - 8ball

l - ( ͡° ͜ʖ ͡°)

s - shrug

ping - sends ping

p - prunes messages

reboot - stops the selfbot

fe - fake eval

e - eval

stats - statistics

r - instantly deletes the message

ut - bot uptime 

servers - displays the names of all servers you're in

ss - alternate statistics

emoji - sends your message in emojis

avatar - links the avatar of a pinged user

us - shows statistics for a pinged user

gs - shows statistics for current guild

Using just the prefix then a message will send the message in an embed

[For other aliases to commands, look into app.js under the command switch, should be pretty obvious]

# Things to NOT do

eval credentials, this will leak your token and access to your account

# Other Info

This fork will log all commands in the command prompt for you

# Install Help (Windows)
Install node.js with npm

install git and add to a folder with the selfbot files (Shift+right click, open git gui here)

open command prompt in that folder (Shift+right click, command prompt option) and run the command: npm i -S hydrabolt/discord.js

rename "credentials example.json" to "credentials.json" and add your discord token where it obviously goes

now run RunSelfBot.bat
