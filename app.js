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

  let guildMember;
  if (msg.guild) guildMember = msg.guild.member(msg.author);

  switch (command) {
	case 'help':
	case 'git':
	case 'github':
	  const hembed = new Discord.RichEmbed()
	  .addField('Link to repo for this fork','https://github.com/VapidSlay/SelfBot')
	  .setColor(rand(data.embedColors));
	  msg.sendEmbed(hembed);
	  break;
	case 'ping':
      msg.send('Ping: ' + client.ping.toFixed(2) + ' ms');
      break;
	case 'emote':
	case 'emoji':
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
    case 'n':
    case 'nick':
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
    case 'fe':
    case 'fakeeval':
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
    case 'e':
    case 'eval':
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
	case 'ut':
	case 'uptime':
	  var ut = parseFloat(((client.uptime)/(1000))).toFixed(0);
	  var hours = ~~(ut/3600);
	  var minutes = ~~((ut%3600)/60);
	  var seconds = ut%60;
	  msg.send('Uptime: '+hours+' hours, '+minutes+' minutes, '+seconds+' seconds');
	  break;
    case 'stats':
    case 'statistics':
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
    case '8':
    case '8ball':
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
    case 'l':
    case 'lenny':
      msg.channel.send('( ͡° ͜ʖ ͡°)');
      break;
	case 'm':
	case 'mem':
	case 'memory':
		msg.send('Memory: ' + (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2) + ' MB');
		break;
    case 's':
    case 'shrug':
      msg.channel.send('¯\\_(ツ)_/¯');
      break;
    case 'p':
    case 'prune':
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
	case 'a':
    case 'avatar':
      if (msg.mentions.users.size === 0){
        msg.error('You must mention a user in order to fetch their avatar url.');
      } else {
        msg.channel.send(msg.mentions.users.first().avatarURL());
      }
      break;
	case 'userstats':
	case 'us':
	  if (msg.mentions.users.size === 0){
		msg.error('You must mention a user for this command to work');
      } else {
	  var usDiscrimo = msg.mentions.users.first().discriminator, discrimString = msg.mentions.users.first().discriminator.toString(), check = new RegExp("^(\d)(?!\1+$)\d{11}$");
	  const usembedo = new Discord.RichEmbed()
	    .setTitle('Stats for: `'+msg.mentions.users.first().username+'#'+usDiscrimo+'`')
		.setThumbnail(msg.mentions.users.first().displayAvatarURL);
		if(msg.guild)
		usembedo.addField('Nickname','`'+msg.mentions.members.first().displayName+'`',true);
		usembedo.addField('ID',msg.mentions.users.first().id,true);
		usembedo.addField('Status',msg.mentions.users.first().presence.status,true);
		if(msg.guild){
		usembedo.addField('Highest Role',msg.mentions.members.first().highestRole,true);
		usembedo.addField('Joined This Server On',msg.mentions.members.first().joinedAt.toString().substring(0, 16),true);
		}
		usembedo.addField('Account Created On',msg.mentions.users.first().createdAt.toString().substring(0, 16),true);
	    usembedo.setColor(rand(data.embedColors));
		msg.sendEmbed(usembedo);
	  }
	  break;
	case 'guildstats':
	case 'gs':
	  if (!msg.guild){
		  msg.error('This command must be used in a guild.');
	  } else {
		  var goDiscrim = msg.guild.owner.user.discriminator, discrimString = msg.guild.owner.user.discriminator.toString(), check = new RegExp("^(\d)(?!\1+$)\d{11}$");
		  const gsembed = new Discord.RichEmbed()
		  .setTitle('Stats for: `'+msg.guild.name+'`')
		  .setThumbnail(msg.guild.iconURL())
		  .addField('Guild Owner','`'+msg.guild.owner.user.username+'#'+goDiscrim+'`',true)
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
