const patron = require('patron.js');
const util = require('../../utility');
const Discord = require('discord.js');

class Quote extends patron.Command {
  constructor() {
    super({
      names: ['quote', 'quoteid', 'q'],
      groupName: 'fun',
      description: 'Quote a message',
      guildOnly: true,
      args: [
        new patron.Argument({
          name: 'messageId',
          key: 'messageId',
          type: 'string',
          example: '340224149396127745'
        }),
        new patron.Argument({
          name: 'channel',
          key: 'channel',
          type: 'textchannel',
          example: 'general',
          remainder: true,
          defaultValue: patron.ArgumentDefault.Channel
        })
      ]
    });
  }

  async run(msg, args) {
    const m = await args.channel.fetchMessage(args.messageId).catch(() => null);

    if (m === null) {
      return util.Messenger.sendError(msg.channel, 'Message not found');
    }
    if (m.length > 1900) {
      return util.Messenger.sendError(msg.channel, 'Message too long to quote');
    }

    const embed = new Discord.RichEmbed()
      .setAuthor(m.author.tag, m.author.displayAvatarURL)
      .setDescription(m.content)
      .setFooter('In: #' + args.channel.name)
      .setTimestamp(m.createdAt);
    return util.Messenger.sendEmbed(msg.channel, embed);
  }
}

module.exports = new Quote();
