const patron = require('patron.js');
const util = require('../../utility');
const Discord = require('discord.js');

class Altcheck extends patron.Command {
  constructor() {
    super({
      name: 'altcheck',
      aliases: ['ac'],
      group: 'utility',
      description: 'Check when a user\'s account was created and when they joined the guild',
      guildOnly: true,
      args: [
        new patron.Argument({
          name: 'member',
          key: 'member',
          type: 'member',
          example: 'PapaJohn#7777',
          remainder: true,
          default: patron.Default.Member
        })
      ]
    });
  }

  async run(msg, args) {
    const embed = new Discord.RichEmbed()
      .setAuthor(args.member.user.tag + ' (' + args.member.id + ')', args.member.user.displayAvatarURL)
      .addField('Account Created', args.member.user.createdAt.toString().substring(0, 24))
      .addField('Joined this Server', args.member.joinedAt.toString().substring(0, 24));
    if (args.member.joinedTimestamp - args.member.user.createdTimestamp < 3600000) {
      embed.setFooter('Joined server within 1 hour of account creation');
    }
    return util.Messenger.sendEmbed(msg.channel, embed);
  }
}

module.exports = new Altcheck();
