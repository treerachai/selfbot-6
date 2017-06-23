const Discord = require('discord.js');
const util = require('util');
const client = new Discord.Client();
const credentials = require('./credentials.json');
const data = require('./data.json');
const git = require('simple-git')();

client.on('disconnect', () => console.log('=====================\nDisconnected'));

client.on('reconnect', () => console.log('=====================\nReconnecting...'));

client.on('ready', () => console.log('=====================\nSuccesfully Connected\n  :Logged Commands:\n====================='));

client.on('message', msg => {
  if (!msg) return;
  if (msg.author.id !== client.user.id) return;
  if (!msg.content.startsWith(credentials.prefix)) return;

  msg.delete()
    .catch(() => null);

  const content = msg.content.slice(credentials.prefix.length);
  const contentArray = content.split(' ');
  const command = contentArray[0].toLowerCase();
  const args = contentArray.slice(1);
  const singlearg = msg.content.slice(credentials.prefix.length + contentArray[0].length + 1);

  let guildMember;
  if (msg.guild) guildMember = msg.guild.member(msg.author);

  switch (command) {
    case '8ball': case '8':
      const question = args.join(' ');
      if (!question) {
        msg.error('You must provide a question to ask the mystical 8ball.');
      } else {
        const eightembed = new Discord.RichEmbed()
          .addField('Question', question)
          .addField('Answer', rand(data.eightBallAnswers))
          .setColor(rand(data.embedColors));
        msg.sendEmbed(eightembed);
      }
      break;
    case 'avatar': case 'a':
      if (!singlearg) msg.channel.send(client.user.displayAvatarURL({
        format: 'png',
        size: 2048
      }));
      else {
        let avauser = msg.client.users.find('tag', singlearg.toString());
        if (msg.mentions.users.size !== 0) avauser = msg.mentions.users.first();
        if (!avauser) avauser = client.users.find('id', singlearg.toString());
        if (!avauser) msg.error('No Match Found, This Command is Case Sensitive');
        else {
          msg.channel.send(avauser.displayAvatarURL({
            format: 'png',
            size: 2048
          }));
        }
      }
      break;
    case 'bold': case 'b':
      msg.channel.send('**' + singlearg.toString() + '**');
      break;
    case 'calculator': case 'calc':
      const calcform = singlearg.replace(/[^0-9+\-*/().]/gi, '');
      if (!calcform) {
        msg.error('You must provide something valid to calculate');
        break;
      }
      try {
        let calcans = eval(calcform);
        if (typeof calcans !== 'string') {
          calcans = require('util').inspect(calcans);
        }
        const calcEmbed = new Discord.RichEmbed()
          .setTitle('Calculator')
          .setDescription('```js\n' + calcform + ' = ' + calcans + '```')
          .setColor(rand(data.embedColors));
        msg.sendEmbed(calcEmbed);
      } catch (err) {
        msg.error('```js\n' + err + '```');
      }
      break;
    case 'choose': case 'ch':
      if (!singlearg){ msg.error('You must provide options to choose from. Example: `choose Vanilla|Chocolate`'); break;}
      const choptions = singlearg.toString().split('|');
      if (choptions.length < 2){ msg.error('You must provide at least 2 options'); break;}
      const chchoice = rand(choptions);
      let chmsg = 'Out of: ';
      for (let option in choptions){
        chmsg += '`'+choptions[option] + '`, ';
      }
      chmsg = chmsg.substring(0, chmsg.length-2);
      chmsg += '\nI choose: `'+chchoice+'`';
      msg.send(chmsg);
      break;
    case 'coinflip': case 'coin': case 'flip':
      let flips = 1;
      if (singlearg) flips = parseInt(singlearg.replace(/[^0-9]/gi, ''));
      if (flips < 1 || flips > 100000000 || flips !== flips) {
        msg.error('The amount of coin flips must be between 1 and 100 million');
        break;
      }
      let heads = 0;
      let tails = 0;
      for (var i = 0; i < flips; i++) {
        let flip = Math.floor((Math.random() * 2) + 1);
        if (flip === 1) heads++;
        else tails++;
      }
      let headpercent = (Math.round((heads / flips) * 10000) / 100);
      if (headpercent === Infinity) headpercent = 0;
      let tailspercent = (Math.round((tails / flips) * 10000) / 100);
      if (tailspercent === Infinity) tailspercent = 0;
      msg.send('```ruby\nResults of ' + flips + ' coin flips \nHeads: ' + heads + ' (' + headpercent + '%)\nTails: ' + tails + ' (' + tailspercent + '%)```');
      break;
    case 'commands': case 'help':
      const cembed = new Discord.RichEmbed()
        .addField('List of all commands can be found here', 'https://vapidslay.github.io/SelfbotDocumentation/')
        .setFooter('Additional help can be found with the server command')
        .setColor(rand(data.embedColors));
      msg.sendEmbed(cembed);
      break;
    case 'disapprove': case 'da':
      msg.channel.send(singlearg+' ಠ_ಠ');
      break;
    case 'discrim':
      if (args.toString().length != 4) msg.error('You must enter a 4 digit discriminator')
      else {
        const matches = msg.client.users.findAll('discriminator', args.toString());
        if (matches.length === 0) {
          msg.error('There are no matches for this discriminator, try joining more servers to add to the list of potential matches.');
        } else {
          let message = '```css\n';
          let discrimc = 0;
          for (const user in matches) {
            discrimc++;
            message += matches[user].username + '#' + args.toString();
            if (discrimc !== matches.length) message += ', ';
          }
          const discrembed = new Discord.RichEmbed()
            .setTitle('Results for Discrim #' + args.toString())
            .setDescription(message + '```')
            .setColor(rand(data.embedColors));
          msg.sendEmbed(discrembed);
        }
      }
      break;
    case 'download': case 'git': case 'github':
      const hembed = new Discord.RichEmbed()
        .addField('Link to repo for this fork', 'https://github.com/VapidSlay/SelfBot')
        .setColor(rand(data.embedColors));
      msg.sendEmbed(hembed);
      break;
    case 'emoji': case 'emote':
      if (!args) {
        msg.error('You must provide a message to emojify.');
      } else {
        const chars = Array.from(args.join(' ').toLowerCase());
        let message = '';
        for (let index in chars) {
          if (!chars[index].match(/[a-z]|[0-9]/i)) {
            if (chars[index] === ' ') {
              message += '    ';
            } else {
              message += chars[index];
            }
          } else {
            const number = parseInt(chars[index]);
            if (!isNaN(number)) {
              message += ':' + data.numbers[number] + ':';
            } else {
              message += ':regional_indicator_' + chars[index] + ':';
            }
          }
        }
        msg.channel.send(message);
      }
      break;
    case 'eval': case 'e':
      const code = args.join(' ');
      if (!code) {
        msg.error('You must provide some code to evalute.');
      } else {
        try {
          let evaled = eval(code);
          if (typeof evaled !== 'string') {
            evaled = require('util').inspect(evaled);
          }
          const codeEmbed = new Discord.RichEmbed()
            .addField('Eval', '```js\n' + code + '```')
            .addField('Returns', '```js\n' + evaled + '```')
            .setColor(rand(data.embedColors));
          msg.sendEmbed(codeEmbed);
        } catch (err) {
          msg.error('```js\n' + err + '```');
        }
      }
      break;
    case 'fakeeval': case 'fe':
      const fakecode = args.join(' ');
      if (!fakecode) {
        msg.error('You must provide some code to evalute.');
      } else {
        const fakeCodeEmbed = new Discord.RichEmbed()
          .addField('Eval', '```js\n' + fakecode + '```')
          .addField('Returns', '```js\ntrue```')
          .setColor(rand(data.embedColors));
        msg.sendEmbed(fakeCodeEmbed);
      }
      break;
    case 'game': case 'g':
      if (client.user.presence.game) msg.send('Playing: `' + client.user.presence.game.name + '`');
      else msg.send('Not currently playing a game');
      break;
    case 'guildstats': case 'gs':
      if (!guildMember) {
        msg.error('This command must be used in a guild.');
      } else {
        const gsembed = new Discord.RichEmbed()
          .setTitle('Stats for: `' + msg.guild.name + '`')
          .setThumbnail(msg.guild.iconURL())
          .addField('Guild Owner', '`' + msg.guild.owner.user.tag + '`', true)
          .addField('Members', msg.guild.memberCount, true)
          .addField('Region', msg.guild.region, true)
          .addField('Created At', msg.guild.createdAt.toString().substring(0, 16), true)
          .setColor(rand(data.embedColors));
        msg.sendEmbed(gsembed);
      }
      break;
    case 'h': case 'happy':
      msg.channel.send(singlearg + ' ᕕ( ᐛ )ᕗ');
      break;
    case 'impersonate':
      if (guildMember) {
        if (!singlearg) msg.error('You must specify a user to impersonate');
        else {
          let impuser = client.users.find('tag', singlearg.toString());
          if (msg.mentions.users.size !== 0) impuser = msg.mentions.users.first();
          if (!impuser) impuser = client.users.find('id', singlearg.toString());
          if (!impuser) msg.error('No Match Found, This Command is Case Sensitive');
          else if (!msg.guild.members.has(impuser.id)) msg.error('That user is not in this guild');
          else {
            const impmember = msg.guild.members.find('id', impuser.id);
            client.user.setAvatar(impuser.displayAvatarURL({
              format: 'png',
              size: 2048
            })).catch(Error);
            guildMember.setNickname(impmember.displayName).catch(Error);
            if (impuser.presence.game) client.user.setGame(impuser.presence.game.name);
            else client.user.setGame(null);
          }
        }
      } else msg.error('This command can only be used in a guild');
      break;
    case 'italics': case 'i':
      msg.channel.send('*' + singlearg.toString() + '*');
      break;
    case 'lenny': case 'l':
      msg.channel.send(singlearg + ' ( ͡° ͜ʖ ͡°)');
      break;
    case 'memory': case 'mem': case 'm':
      msg.send('Memory: ' + (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2) + ' MB');
      break;
    case 'nick': case 'n':
      if (!guildMember) {
        msg.error('You may only use this command in a guild.')
      } else {
        const nickname = args.join(' ');
        if (!nickname) {
          msg.error('You must provide a new nickname.');
        } else {
          guildMember.setNickname(nickname)
            .catch((e) => msg.error(e.message));
        }
      }
      break;
    case 'ping':
      msg.send('Ping: ' + client.ping.toFixed(2) + ' ms');
      break;
    case 'poll':
      if (!singlearg) {
        msg.error('Invalid poll, heres an example: `' + credentials.prefix + 'poll This is the title|Option 1|Option 2`');
        break;
      }
      const pollop = singlearg.toString().split('|');
      if (pollop.length > 10 || pollop.length < 3) {
        msg.error('You must have between 2 and 9 options for the poll');
        break;
      }
      if (singlearg.toString().length > 1900) {
        msg.error('Are you trying to break me? Use less characters');
        break;
      }
      let pollmsg = ':ballot_box: __**' + pollop[0] + '**__';
      for (var i = 1; i < pollop.length; i++) {
        pollmsg = pollmsg + '\n:' + data.numbers[i] + ': ' + pollop[i];
      }
      msg.send(pollmsg).then(async m => {
        for (var i = 1; i < pollop.length; i++) {
          await m.react(data.uninumbers[i]).catch(Error);
        }
      })
      break;
    case 'prune': case 'p':
      let messagesToDelete = parseInt(args[0]);
      messagesToDelete = messagesToDelete || 10;
      msg.channel.fetchMessages({
          limit: 100
        })
        .then(messages => {
          let msg_array = messages.array();
          msg_array = msg_array.filter(m => m.author.id === client.user.id);
          msg_array.length = messagesToDelete + 1;
          msg_array.map(m => {
            m.delete()
              .catch(() => null)
          });
        });
      break;
    case 'quote': case 'q':
      if (!singlearg) {
        msg.error('Invalid search. Proper format: `.quote [Mention or Username#discrim]|Text To Search For`');
        break;
      }
      const qa = singlearg.toString().split('|');
      if (qa.length < 2) {
        msg.error('Invalid search. Proper format: `.quote [Mention or Username#discrim]|Text To Search For`');
        break;
      }
      let quser = client.users.find('tag', qa[0]);
      if (msg.mentions.users.size !== 0) quser = msg.mentions.users.first();
      if (!quser) quser = client.users.find('id', qa[0]);
      const qsearch = qa[1];
      if (!quser) {
        msg.error('User not found');
        break;
      }
      msg.channel.fetchMessages({
          limit: 100
        })
        .then(messages => {
          let quote_array = messages.array();
          quote_array = quote_array.filter(m => m.author.id === quser.id);
          quote_array = quote_array.filter(m => m.content.toLowerCase().includes(qsearch.toLowerCase()));
          quote_array = quote_array.filter(m => !(m.content.toLowerCase().startsWith('.q')));
          if (quote_array.length === 0) msg.error('No results found');
          else if (quote_array[0].content.length > 1900) msg.error('Message too long to quote');
          else {
            const quembed = new Discord.RichEmbed()
              .setAuthor(quser.tag, quser.displayAvatarURL())
              .setDescription(quote_array[0].content)
              .setTimestamp(quote_array[0].createdAt)
              .setColor(rand(data.embedColors));
            msg.sendEmbed(quembed);
            if (quote_array.length > 1) {
              msg.send('**' + (quote_array.length - 1) + ' other matches found**').then(async m => {
                await m.delete({
                  timeout: 10000
                }).catch(Error);
              })
            }
          }
        });
      break;
    case 'quoteid': case 'qid':
      if (!singlearg) {
        msg.error('You must provide a valid message id');
        break;
      }
      const qidmsg = msg.channel.fetchMessage(singlearg).then(message => {
        if (message.content.length > 1900) msg.error('Message too long to quote');
        else {
          const qidauthor = message.author;
          const qidembed = new Discord.RichEmbed()
            .setAuthor(qidauthor.tag, qidauthor.displayAvatarURL())
            .setDescription(message.content)
            .setTimestamp(message.createdAt)
            .setColor(rand(data.embedColors));
          msg.sendEmbed(qidembed);
        }
      }).catch(error => msg.error('No message found in this channel with the id: `' + singlearg + '`'));
      break;
    case 'rageflip': case 'rf':
      msg.channel.send(singlearg+' ┻━┻ ﾐヽ(ಠ益ಠ)ノ彡┻━┻');
      break;
    case 'reboot':
      msg.send('Rebooting...')
        .then(() => process.exit(1));
      break;
    case 'remove': case 'r':
      break;
    case 'removeplus': case 'rp': case 'r+':
      msg.channel.send(singlearg.toString()).then(async m => {
        m.delete().catch(Error);
      })
      break;
    case 'roll':
      let maxroll = 6;
      if (singlearg) maxroll = parseInt(singlearg.replace(/[^0-9]/gi, ''));
      if (maxroll < 1 || maxroll > Number.MAX_SAFE_INTEGER || maxroll !== maxroll) {
        msg.error('Your max roll must be a number between 1 and ' + Number.MAX_SAFE_INTEGER);
        break;
      }
      let rollresult = Math.floor((Math.random() * maxroll) + 1);
      msg.send(':game_die: You rolled a ' + rollresult + ' out of ' + maxroll);
      break;
    case 'rps':
      let userchoice = singlearg.toLowerCase();
      let botchoice = 'Hey you can read code';
      let rpswin = 'pls dont expose mai easter egg';

      if (userchoice === 'rock') userchoice = userchoice + ' :full_moon:';
      else if (userchoice === 'paper') userchoice = userchoice + ' :page_facing_up:';
      else if (userchoice === 'scissors') userchoice = userchoice + ' :scissors:';

      let rpsrando = Math.floor((Math.random() * 3) + 1);
      if (rpsrando === 1) botchoice = 'rock :full_moon:';
      else if (rpsrando === 2) botchoice = 'paper :page_facing_up:';
      else botchoice = 'scissors :scissors:';

      if (userchoice === botchoice) rpswin = 'It\'s a tie!';
      else if (userchoice === "rock :full_moon:") {
        if (botchoice === "scissors :scissors:") rpswin = "Rock Wins!";
        else rpswin = "Paper Wins!";
      } else if (userchoice === "paper :page_facing_up:") {
        if (botchoice === "rock :full_moon:") rpswin = "Paper Wins!";
        else rpswin = "Scissors Wins!";
      } else if (userchoice === "scissors :scissors:") {
        if (botchoice === "rock :full_moon:") rpswin = "Rock Wins!";
        else rpswin = "Scissors Wins!";
      } else {
        msg.error('You must choose either rock, paper, or scissors');
        break;
      }
      userchoice = userchoice.charAt(0).toUpperCase() + userchoice.slice(1);
      botchoice = botchoice.charAt(0).toUpperCase() + botchoice.slice(1);
      const rpsEmbed = new Discord.RichEmbed()
        .setTitle(rpswin)
        .addField('Your Choice', userchoice, true)
        .addField('My Choice', botchoice, true)
        .setColor(rand(data.embedColors));
      msg.sendEmbed(rpsEmbed);
      break;
    case 'server':
      const servembed = new Discord.RichEmbed()
        .addField('Link to this selfbot\'s server', 'https://discord.gg/zz9KTka')
        .setColor(rand(data.embedColors));
      msg.sendEmbed(servembed);
      break;
    case 'setgame': case 'sg':
      if (!singlearg || singlearg.length < 1) client.user.setGame(null);
      else if (singlearg.length > 128) client.user.setGame(singlearg.toString().substring(0, 128));
      else client.user.setGame(singlearg.toString());
      break;
    case 'setavatar': case 'sa':
      if (!singlearg) msg.error('You must provide a valid link to an image')
      else client.user.setAvatar(singlearg.toString()).catch(Error);
      break;
    case 'shrug': case 's':
      msg.channel.send(singlearg + ' ¯\\_(ツ)_/¯');
      break;
    case 'statistics': case 'stats':
      let ssut = parseFloat(((client.uptime) / (1000))).toFixed(0);
      const sshours = ~~(ssut / 3600);
      const ssminutes = ~~((ssut % 3600) / 60);
      const ssembed = new Discord.RichEmbed()
        .addField('Ping', client.ping.toFixed(2) + ' ms', true)
        .addField('Memory', (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2) + ' MB', true)
        .addField('Uptime', sshours + ' hours, ' + ssminutes + ' minutes', true)
        .addField('Servers', client.guilds.size.toLocaleString(), true)
        .addField('Channels', client.channels.size, true)
        .addField('Users', client.guilds.reduce((a, b) => a + b.memberCount, 0).toLocaleString(), true)
        .setColor(rand(data.embedColors));
      msg.sendEmbed(ssembed);
      break;
    case 'status':
      if (args[0] != 'online' && args[0] != 'idle' && args[0] != 'dnd' && args[0] != 'invisible') {
        msg.error('Status must be one of the following: online, idle, dnd, invisible');
      } else {
        client.user.setStatus(args[0]);
      }
      break;
    case 'u': case 'underline':
      msg.channel.send('__' + singlearg.toString() + '__');
      break;
    case 'update':
      msg.send('Updating...');
      git.pull()
        .then(() => process.exit(1));
      break;
    case 'ut': case 'uptime':
      let ut = parseFloat(((client.uptime) / (1000))).toFixed(0);
      const hours = ~~(ut / 3600);
      const minutes = ~~((ut % 3600) / 60);
      const seconds = ut % 60;
      msg.send('Uptime: ' + hours + ' hours, ' + minutes + ' minutes, ' + seconds + ' seconds');
      break;
    case 'userstats': case 'us':
      const usembedo = new Discord.RichEmbed();
      let ususer = client.user;
      if (msg.mentions.users.size > 0) ususer = msg.mentions.users.first();
      else if (singlearg) {
        ususer = client.users.find('tag', singlearg.toString());
        if (!ususer) ususer = client.users.find('id', singlearg.toString());
        if (!ususer) {
          msg.error('No Match Found, This Command is Case Sensitive');
          break;
        }
      }
      usembedo.setTitle('Stats for: `' + ususer.tag + '`')
        .setThumbnail(ususer.displayAvatarURL())
        .addField('ID', ususer.id, true)
        .addField('Status', ususer.presence.status, true)
        .addField('Account Created On', ususer.createdAt.toString().substring(0, 16), true);
      if (guildMember && msg.guild.members.has(ususer.id)) {
        const usmember = msg.guild.members.find('id', ususer.id);
        usembedo.addField('Nickname', '`' + usmember.displayName + '`', true)
          .addField('Highest Role', usmember.highestRole, true)
          .addField('Joined This Server On', usmember.joinedAt.toString().substring(0, 16), true)
          .setColor(usmember.displayHexColor);
      } else usembedo.setColor(rand(data.embedColors));
      if (ususer.presence.game) usembedo.setFooter('Playing: ' + ususer.presence.game.name);
      msg.sendEmbed(usembedo);
      break;
    default:
      msg.send(content);
      break;
  }
  console.log('  ' + credentials.prefix + content);
});

Discord.Message.prototype.sendEmbed = function(spicyEmbed) {
  return this.channel.send({
      embed: spicyEmbed
    })
    .catch((e) => handleError(this.channel, e));
};

Discord.Message.prototype.send = function(description) {
  if (credentials.embedDefault) {
    const embed = new Discord.RichEmbed()
      .setColor(rand(data.embedColors))
      .setDescription(description);
    return this.sendEmbed(embed);
  } else {
    return this.channel.send(description)
      .catch((e) => handleError(this.channel, e));
  }
};

Discord.Message.prototype.error = function(description) {
  if (credentials.embedDefault) {
    const embed = new Discord.RichEmbed()
      .setColor([255, 0, 0])
      .setDescription(description);
    return this.channel.send({
        embed: embed
      })
      .catch((e) => handleError(this.channel, e));
  } else {
    return this.channel.send(description);
  }
};

function rand(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function handleError(channel, error) {
  if (error.code === 403) {
    channel.send("You do not have permission to do that.");
  } else {
    channel.send(error.message).then(async m => {
      await m.delete({
        timeout: 5000
      });
    });
  }
}

client.login(credentials.token);

process.on('unhandledRejection', err => console.error('Uncaught Promise Error: \n' + err.stack));

process.on('unhandledException', err => console.error('Uncaught Exception: \n' + err.stack));
