# Install Help (Windows)

1. Install node.js (most recent version) with npm: https://nodejs.org/en/ [If this causes you trouble, heres some extra help on installing them: http://blog.teamtreehouse.com/install-node-js-npm-windows]

2. Install git here: https://git-scm.com/download/win (when installing, just use whatever defaults it gives to you in any options)

3. Download the Installer here: http://www.mediafire.com/file/24thn21fp76ax2p/Install_Selfbot.bat

4. Put the Installer (Install Selfbot.bat) in a folder of your choosing and run it (its a bat file so your computer is gonna scream about it being unsafe just like they do with all bat files, also after this you wont need the installer anymore so you can delete it)

5. Open the new Selfbot Folder and rename credentials example.json to credentials.json and add your discord token where it's indicated

6. Run RunSelfBot.bat

(To update, all you need to do is run UpdateSelfbot.bat and then restart the selfbot)

# Commands in this Fork

n/nick [name] - changes your nickname to what you specify

8/8ball [question] - asks the mystical 8ball a question

l/lenny - like /shrug, but with lenny instead ( ͡° ͜ʖ ͡°)

s/shrug - works just like /shrug

ping - sends your ping in ms

p/prune [amount] - prunes messages (default is 10)

q/quote [mention or username#discrim]|[text] - searches the last 100 messages by the specified user for one that contains the specified text and quotes the most recent match

reboot - restarts the selfbot

fe/fakeeval [fake code] - fake eval, returns true

e/eval [code] - evaluates code (Be VERY careful with this. If you don't have knowledge of javascript and discord.js don't use this, as it could be dangerous)

stats/statistics - statistics

r [text] - instantly deletes the message

ut/uptime - bot uptime

ss - alternate statistics

emoji/emote [text] - sends your message in emojis

avatar/a [mention or username#discrim] - links the avatar of the specified user

us/userstats [mention or username#discrim] - shows statistics for yourself, or a specified user

guildstats/gs - shows statistics for current guild

status [status] - sets your status to what you specify

discrim [discriminator] - finds users with the same descriminator that you specify (helpful for discrim rerolling)

sa/setavatar [image link] - changes your avatar to the image you link

poll [Title|Option 1|Option 2...] - creates a mini-poll with reactions with up to 9 options

help/git/github/server - Sends a link to this repository and the server

sg/setgame [text] - Sets what game you are currently playing, leave empty to set yourself to not be playing a game (only visible to others)

g/game - shows you what game you are playing (helpful if you used setgame)

impersonate [mention or username#discrim] - copies the avatar, displayname, and game of a specified user in that guild

Using just the prefix then a message will send the message in an embed
