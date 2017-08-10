const patron = require('patron.js');
const util = require('../../utility');
const Discord = require('discord.js');

class Enlarge extends patron.Command {
  constructor() {
    super({
      names: ['emojistats', 'es', 'emotestats', 'emojiinfo', 'emoteinfo'],
      groupName: 'statistics',
      description: 'Get information about a custom emoji',
      guildOnly: false,
      args: [
        new patron.Argument({
          name: 'emoji',
          key: 'emoji',
          type: 'emoji',
          example: ':thonk:',
          remainder: true
        })
      ]
    });
  }

  async run(msg, args) {
    const embed = new Discord.RichEmbed()
      .setThumbnail(args.emoji.url)
      .setTitle(args.emoji.name + ' (' + args.emoji.id + ')')
      .addField('Name', '`' + args.emoji.name + '`', true)
      .addField('Guild', '`' + args.emoji.guild.name + '`', true)
      .addField('Global', args.emoji.managed, true)
      .addField('Created At', args.emoji.createdAt.toString().substring(0, 16), true);
    return util.Messenger.sendEmbed(msg.channel, embed);
  }
}

module.exports = new Enlarge();
