const patron = require('patron.js');
const util = require('../../utility');
const Discord = require('discord.js');
const Minimum = require('../../preconditions/minimum.js');

class MyEmojis extends patron.Command {
  constructor() {
    super({
      names: ['myemojis', 'me', 'myemotes'],
      groupName: 'emoji',
      description: 'List all global emojis to which you have access',
      guildOnly: false,
      args: [
        new patron.Argument({
          name: 'page',
          key: 'page',
          type: 'int',
          example: '2',
          defaultValue: 1,
          preconditions: [new Minimum(1)]
        })
      ]
    });
  }

  async run(msg, args) {
    try {
      let emojis = msg.client.emojis.findAll('managed', true);
      if (emojis.length === 0) {
        return util.Messenger.sendError(msg.channel, 'You are not in any servers with global emojis');
      }
      emojis = emojis.filter(emoji => emoji.requiresColons === true).sort(util.StringUtil.alphabeticallySort);
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
      if (args.page > msgArray.length) {
        return util.Messenger.sendError(msg.channel, 'Invalid page: ' + args.page + '/' + msgArray.length);
      }
      const embed = new Discord.RichEmbed()
        .setTitle('Your Global Emojis')
        .setDescription(msgArray[args.page-1])
        .setFooter('Page ' + args.page + '/' + msgArray.length + ' | Total Emoji Count: ' + emojis.length);
      return util.Messenger.sendEmbed(msg.channel, embed);
    } catch (e) {
      if (e === 'TypeError: Cannot read property \'values\' of undefined') {
        return util.Messenger.sendError(msg.channel, 'You are using this command too soon after starting the selfbot. Give me some time to load in all your insane emojis ;)');
      }
      return util.Messenger.sendError(msg.channel, 'Something went wrong.\n' + e);
    }
  }
}

module.exports = new MyEmojis();
