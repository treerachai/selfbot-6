const Discord = require('discord.js');
const util = require('util');
const client = new Discord.Client();
const credentials = require('./credentials.json');
const data = require('./data.json');

client.on('disconnect', () => console.log('Selfbot has disconnected.'));

client.on('reconnect', () => console.log('Attempting to reconnect...'));

client.on('ready', () => console.log('Selfbot has successfully connected.'));

client.on('message', msg => {
  if (!msg) return;
  if (msg.author.id !== credentials.id) return;
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
          msg.send(evaled);
        } catch (err) {
          msg.error(err);
        }
      }
    case '8':
    case '8ball':
      const question = args.join(' ');
      if (!question) {
        msg.error('You must provide a question to ask the mystical 8ball.');
      } else {
        msg.send('**Question:** ' + question + '\n\n**Answer:** ' + rand(data.eightBallAnswers) + '.');
      }
      break;
    case 'l':
    case 'lenny':
      msg.channel.send('( ͡° ͜ʖ ͡°)');
      break;
    case 's':
    case 'shrug':
      msg.channel.send('¯\\_(ツ)_/¯');
      break;
    case 'ping':
      msg.send('Ping: ' + client.ping.toFixed(2));
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
    case 'r':
    case 'reboot':
      msg.send('Rebooting...')
      .then(() => process.exit(1));
      break;
    default:
        if (credentials.embedDefault) {
          msg.send(content);
        } else {
          msg.send("This command does not exist.");
        }
      break;
  }
});

Discord.Message.prototype.send = function(content) {
  if (credentials.embedDefault) {
    const embed = new Discord.RichEmbed()
      .setColor(rand(data.embedColors))
      .setDescription(content);
    return this.channel.send({ embed })
    .catch((e) => {
      if (e.code === 403) {
        this.channel.send("You do not have permission to send embeds here.")
      } else {
        this.channel.error(e.message);
      }
    });
  } else {
    return this.channel.send(content)
    .catch((e) => this.error(e.message));
  }
};

Discord.Message.prototype.error = function(content) {
  if (credentials.embedDefault) {
    const embed = new Discord.RichEmbed()
      .setColor([255, 0, 0])
      .setDescription(content);
    return this.channel.send({ embed })
    .catch(() => null);
  } else {
    return this.channel.send(content)
    .catch(() => null);
  }
};

function rand(array) {
  return array[Math.floor(Math.random() * array.length)];
}

client.login(credentials.token);

process.on('unhandledRejection', err => console.error('Uncaught Promise Error: \n' + err.stack));

process.on('unhandledException', err => console.error('Uncaught Exception: \n' + err.stack));
