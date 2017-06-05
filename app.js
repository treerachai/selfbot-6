const Discord = require('discord.js');
const util = require('util');
const client = new Discord.Client();
const credentials = require('./credentials.json');
const data = require('./data.json');

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
  const singlearg = msg.content.slice(credentials.prefix.length+contentArray[0].length+1)

  let guildMember;
  if (msg.guild) guildMember = msg.guild.member(msg.author);

  switch (command) {
	case 'help': case 'git': case 'github':
	  const hembed = new Discord.RichEmbed()
	  .addField('Link to repo for this fork','https://github.com/VapidSlay/SelfBot')
	  .setColor(rand(data.embedColors));
	  msg.sendEmbed(hembed);
	  break;
	case 'ping':
      msg.send('Ping: ' + client.ping.toFixed(2) + ' ms');
      break;
	case 'emote': case 'emoji':
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
            }
            else {
              message += ':regional_indicator_' + chars[index] + ':';
            }
          }
        }
        msg.channel.send(message);
      }
      break;
  case 'n': case 'nick':
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
	case 'status':
	  if (args[0] != 'online'&&args[0] != 'idle'&&args[0] != 'dnd'&&args[0] != 'invisible'){
		msg.error('Status must be one of the following: online, idle, dnd, invisible');
	  } else {
	  client.user.setStatus(args[0]);
	  }
	  break;
  case 'fe': case 'fakeeval':
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
	case 'servers':
	  const sembed = new Discord.RichEmbed()
	  .addField('Servers', client.guilds.map(g=>g.name).join(', '))
	  .setColor(rand(data.embedColors));
	  msg.sendEmbed(sembed);
	  break;
  case 'e': case 'eval':
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
	case 'ut': case 'uptime':
	  var ut = parseFloat(((client.uptime)/(1000))).toFixed(0);
	  var hours = ~~(ut/3600);
	  var minutes = ~~((ut%3600)/60);
	  var seconds = ut%60;
	  msg.send('Uptime: '+hours+' hours, '+minutes+' minutes, '+seconds+' seconds');
	  break;
  case 'stats': case 'statistics':
      const embed = new Discord.RichEmbed()
        .addField('Author', 'John#0969', true)
        .addField('Framework', 'Discord.js ' + Discord.version, true)
        .addField('Memory', (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2) + ' MB', true)
        .addField('Users', client.guilds.reduce((a, b) => a + b.memberCount, 0).toLocaleString(), true)
        .addField('Servers', client.guilds.size.toLocaleString(), true)
        .addField('Forked by', 'PapaJohn#7777', true)
        .setColor(rand(data.embedColors));
      msg.sendEmbed(embed);
      break;
	case 'ss':
	  var ssut = parseFloat(((client.uptime)/(1000))).toFixed(0);
	  var hours = ~~(ssut/3600);
	  var minutes = ~~((ssut%3600)/60);
      const ssembed = new Discord.RichEmbed()
        .addField('Author', 'John#0969', true)
        .addField('Forked by', 'PapaJohn#7777', true)
		.addField('Servers', client.guilds.size.toLocaleString(), true)
		.addField('Memory', (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2) + ' MB', true)
		.addField('Ping', client.ping.toFixed(2) + ' ms', true)
		.addField('Uptime', hours+' hours, '+minutes+' minutes', true)
        .setColor(rand(data.embedColors));
	  msg.sendEmbed(ssembed);
      break;
  case '8': case '8ball':
      const question = args.join(' ');
      if (!question) {
        msg.error('You must provide a question to ask the mystical 8ball.');
      } else {
		const eightembed = new Discord.RichEmbed()
		.addField('Question',question)
		.addField('Answer',rand(data.eightBallAnswers))
		.setColor(rand(data.embedColors));
		msg.sendEmbed(eightembed);
      }
      break;
  case 'l': case 'lenny':
      msg.channel.send('( ͡° ͜ʖ ͡°)');
      break;
  case 'discrim':
    if(args.toString().length != 4) msg.error('You must enter a 4 digit discriminator')
    else{
    const matches = msg.client.users.findAll('discriminator', args.toString());
    if (matches.length === 0) {
            msg.error('There are no matches for this discriminator, try joining more servers to add to the list of potential matches.');
        } else {
            let message = '```css\n';
            for (const user in matches) {
                message += matches[user].username + '#' + args.toString() + '\n';
        }
            const discrembed = new Discord.RichEmbed()
            .setTitle('Results for Discrim #'+args.toString())
            .setDescription(message + '```')
            .setColor(rand(data.embedColors));
            msg.sendEmbed(discrembed);
        }}
    break;
	case 'm': case 'mem': case 'memory':
		msg.send('Memory: ' + (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2) + ' MB');
		break;
  case 's': case 'shrug':
    msg.channel.send(singlearg+' ¯\\_(ツ)_/¯');
    break;
  case 'p': case 'prune':
      let messagesToDelete = parseInt(args[0]);
      messagesToDelete = messagesToDelete || 10;
      msg.channel.fetchMessages({limit: 100})
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
  case 'impersonate':
    if (guildMember){
     if (!singlearg) msg.error('You must specify a user to impersonate');
     else {
      const impuser = msg.guild.members.findAll('displayName', singlearg.toString());
      if (impuser.length > 1) msg.error('Multiple Matches Found, Try Mentioning the User Instead');
      else if (impuser.length != 1) msg.error('No Match Found, This Command is Case Sensitive');
      else{
        client.user.setAvatar(impuser[0].user.avatarURL())
          .catch(Error);
        guildMember.setNickname(impuser[0].displayName);
      }
     }
     } else msg.error('This command can only be used in a guild');
      break;
  case 'setavatar': case 'sa':
    if(!singlearg) msg.error('You must provide a valid link to an image')
    else{
    client.user.setAvatar(singlearg)
      .catch(Error);
    const saembed = new Discord.RichEmbed()
    .addField('Command Registered','Check your avatar',true)
    .setFooter('If your avatar did not change, you are either changing it too fast or using an invalid link')
    .setColor(rand(data.embedColors));
    msg.sendEmbed(saembed);
    }
    break;
	case 'a': case 'avatar':
      if (msg.mentions.users.size === 0){
       if(!guildMember) msg.error('You must mention a user if not in a guild')
       else if (!singlearg) msg.channel.send(client.user.avatarURL());
       else {
        const avauser = msg.guild.members.findAll('displayName', singlearg.toString());
        if (avauser.length > 1) msg.error('Multiple Matches Found, Try Mentioning the User Instead');
        else if (avauser.length != 1) msg.error('No Match Found, This Command is Case Sensitive');
        else msg.channel.send(avauser[0].user.avatarURL());
       }
      } else {
        msg.channel.send(msg.mentions.users.first().avatarURL());
      }
      break;
	case 'userstats': case 'us':
    const usembedo = new Discord.RichEmbed();
    if (guildMember){
      var ususer = msg.member;
      if (msg.mentions.users.size > 0) ususer = msg.mentions.members.first()
      else if (singlearg){
        const usoptions = msg.guild.members.findAll('displayName', singlearg.toString());
        ususer = usoptions[0];
        if (usoptions.length > 1) {
          msg.error('Multiple Matches Found, Try Mentioning the User Instead');
          break;
        } else if (usoptions.length != 1) {
          msg.error('No Match Found, This Command is Case Sensitive');
          break;
      }}
        usembedo.setTitle('Stats for: `'+ususer.user.tag+'`')
        .setThumbnail(ususer.user.displayAvatarURL)
        .addField('Nickname','`'+ususer.displayName+'`',true)
        .addField('ID',ususer.user.id,true)
        .addField('Status',ususer.user.presence.status,true)
        .addField('Highest Role',ususer.highestRole,true)
        .addField('Joined This Server On',ususer.joinedAt.toString().substring(0, 16),true)
        .addField('Account Created On',ususer.user.createdAt.toString().substring(0, 16),true)
        .setColor(ususer.displayHexColor);
    } else {
      var ususer = msg.author;
      if (msg.mentions.users.size > 0) ususer = msg.mentions.users.first();
      else if (singlearg) {
        msg.error('You must mention the target user to use this command outside a guild');
        break;
      }
  	    usembedo.setTitle('Stats for: `'+ususer.tag+'`')
  		  .setThumbnail(ususer.displayAvatarURL)
  		  .addField('ID',ususer.id,true)
  		  .addField('Status',ususer.presence.status,true)
  		  .addField('Account Created On',ususer.createdAt.toString().substring(0, 16),true)
        .setColor(rand(data.embedColors));
    }
    msg.sendEmbed(usembedo);
    break;
	case 'guildstats': case 'gs':
	  if (!guildMember){
		  msg.error('This command must be used in a guild.');
	  } else {
		  const gsembed = new Discord.RichEmbed()
		  .setTitle('Stats for: `'+msg.guild.name+'`')
		  .setThumbnail(msg.guild.iconURL())
		  .addField('Guild Owner','`'+msg.guild.owner.user.tag+'`',true)
		  .addField('Members',msg.guild.memberCount,true)
		  .addField('Region',msg.guild.region,true)
		  .addField('Created At',msg.guild.createdAt.toString().substring(0, 16), true)
		  .setColor(rand(data.embedColors));
		  msg.sendEmbed(gsembed);
	  }
	  break;
  case 'r':
	  break;
    case 'reboot':
      msg.send('Rebooting...')
      .then(() => process.exit(1));
      break;
	default:
          msg.send(content);
      break;
  }
  console.log('  '+credentials.prefix+content);
});

Discord.Message.prototype.sendEmbed = function(spicyEmbed) {
  return this.channel.send({ embed: spicyEmbed })
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
    return this.channel.send({ embed:embed })
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
    channel.send(error.message);
  }
}

client.login(credentials.token);

process.on('unhandledRejection', err => console.error('Uncaught Promise Error: \n' + err.stack));

process.on('unhandledException', err => console.error('Uncaught Exception: \n' + err.stack));
