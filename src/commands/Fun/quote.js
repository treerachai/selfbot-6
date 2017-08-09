const patron = require('patron.js');
const util = require('../../utility');
const Discord = require('discord.js');

class Quote extends patron.Command {
  constructor() {
    super({
      names: ['quote', 'q'],
      groupName: 'fun',
      description: 'Quote a message',
      args: [
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
    return util.Messenger.sendEmbed(msg.channel, embed);
  }
}

module.exports = new Quote();
