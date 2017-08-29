const patron = require('patron.js');
const util = require('../../utility');
const Discord = require('discord.js');

class ForwardMessage extends patron.Command {
  constructor() {
    super({
      names: ['forwardmessage', 'fm', 'quoteforward', 'forwardquote'],
      groupName: 'messager',
      description: 'Forwards a message from chat to another channel',
      args: [
        new patron.Argument({
          name: 'channel',
          key: 'c',
          type: 'textchannel',
          example: 'general',
          defaultValue: patron.ArgumentDefault.Channel
        }),
        new patron.Argument({
          name: 'message',
          key: 'm',
          type: 'message',
          example: 'radical'
        })
      ]
    });
  }

  async run(msg, args) {
    const embed = new Discord.RichEmbed()
      .setAuthor(args.m.author.tag, args.m.author.displayAvatarURL)
      .setDescription(args.m.content)
      .setFooter('In: #' + args.m.channel.name)
      .setTimestamp(args.m.createdAt);
    const m = await util.Messenger.sendEmbed(args.c, embed);
    if (m !== null) {
      return util.Messenger.send(msg.channel, 'Message Forwarded Successfully to: ' + args.c);
    }
    return util.Messenger.sendError(msg.channel, 'Unable to forward message to: ' + args.c);
  }
}

module.exports = new ForwardMessage();
