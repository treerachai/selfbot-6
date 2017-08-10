const patron = require('patron.js');
const util = require('../../utility');
const Discord = require('discord.js');

class MyEmojis extends patron.Command {
  constructor() {
    super({
      names: ['myemojis', 'me', 'myemotes'],
      groupName: 'emote',
      description: 'List all global emojis to which you have access',
      guildOnly: false,
      args: [
        new patron.Argument({
          name: 'page',
          key: 'page',
          type: 'int',
          example: '2',
          defaultValue: 1
        })
      ]
    });
  }

  async run(msg, args) {
    let emojis = msg.client.emojis.findAll('managed', true);
    if (emojis.length === 0) {
      return util.Messenger.sendError(msg.channel, 'You are not in any servers with global emojis');
    }
    emojis = emojis.sort(util.StringUtil.alphabeticallySort).filter(emoji => emoji.requiresColons === true);
    const msgArray = [''];
    let c = 0;

    for (let i = 0; i < msgArray.length; i++) {
      for (let x = c; x < emojis.length; x++) {
        if (msgArray[i].length + emojis[x].toString().length > 1940) {
          msgArray.push('');
          break;
        }
        c++;
        msgArray[i] += emojis[x] + ' ';
      }
    }
    const embed = new Discord.RichEmbed()
      .setTitle('Your Global Emojis')
      .setDescription(msgArray[args.page-1])
      .setFooter('Page ' + args.page + '/' + msgArray.length + ' | Total Emoji Count: ' + emojis.length);
    return util.Messenger.sendEmbed(msg.channel, embed);
  }
}

module.exports = new MyEmojis();
