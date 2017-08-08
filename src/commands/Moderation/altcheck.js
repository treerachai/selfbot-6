const patron = require('patron.js');
const util = require('../../utility');
const Discord = require('discord.js');

class Altcheck extends patron.Command {
  constructor() {
    super({
      names: ['altcheck', 'ac'],
      groupName: 'moderation',
      description: 'Check when a user\'s account was created and when they joined the guild',
      guildOnly: true,
      args: [
        new patron.Argument({
          name: 'member',
          key: 'member',
          type: 'member',
          example: 'PapaJohn#7777',
          remainder: true,
          defaultValue: patron.ArgumentDefault.Member
        })
      ]
    });
  }

  async run(msg, args) {
    const gap = util.NumberUtil.msToTime(args.member.joinedTimestamp - args.member.user.createdTimestamp);
    const embed = new Discord.RichEmbed()
      .setAuthor(args.member.user.tag + ' (' + args.member.id + ')', args.member.user.displayAvatarURL)
      .addField('Account Created', args.member.user.createdAt.toString().substring(0, 24), true)
      .addField('Create-Join Gap', gap.hours + ' hours, ' + gap.minutes + ' minutes', true)
      .addField('Joined this Server', args.member.joinedAt.toString().substring(0, 24))
      .setFooter(args.member.user.displayAvatarURL === args.member.user.defaultAvatarURL ? 'Uses Default Avatar' : 'Does Not Use Default Avatar');
    return util.Messenger.sendEmbed(msg.channel, embed);
  }
}

module.exports = new Altcheck();
