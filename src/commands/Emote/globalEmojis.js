const patron = require('patron.js');
const util = require('../../utility');

class GlobalEmojis extends patron.Command {
  constructor() {
    super({
      names: ['globalemojis', 'ge', 'globalemotes'],
      groupName: 'emote',
      description: 'List a guild\'s global emojis',
      guildOnly: false,
      args: [
        new patron.Argument({
          name: 'guild',
          key: 'guild',
          type: 'guild',
          example: 'Papa John\'s Selfbot',
          remainder: true,
          defaultValue: patron.ArgumentDefault.Guild
        })
      ]
    });
  }

  async run(msg, args) {
    if (args.guild === null) {
      return util.Messenger.sendError(msg.channel, 'Please specify a guild');
    }
    let emojis = args.guild.emojis.findAll('managed', true);
    if (emojis.length === 0) {
      return util.Messenger.sendError(msg.channel, '`' + args.guild.name + '` has no global emojis');
    }
    emojis = emojis.sort(util.StringUtil.alphabeticallySort);
    let m = '';
    for (let i = 0; i < emojis.length; i++) {
      m += emojis[i] + ' ';
    }
    return util.Messenger.send(msg.channel, m, args.guild.name + '\'s Global Emojis');
  }
}

module.exports = new GlobalEmojis();
