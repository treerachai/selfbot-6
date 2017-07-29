const patron = require('patron.js');
const util = require('../../utility');
const Discord = require('discord.js');

class Memberstats extends patron.Command {
  constructor() {
    super({
      name: 'memberstats',
      aliases: ['ms', 'userstats', 'us'],
      group: 'fun',
      description: 'Get a member\'s statistics',
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
    const res = await msg.guild.search({
      author: args.member.user
    });
    const results = res.totalResults;

    const embed = new Discord.RichEmbed()
      .setTitle(args.member.user.tag + ' (' + args.member.user.id + ')')
      .setThumbnail(args.member.user.displayAvatarURL)
      .addField('Nickname', '`' + args.member.displayName + '`', true)
      .addField('Total Messages Sent', results, true)
      .addField('Highest Role', args.member.highestRole, true);
      if (args.member.colorRole === null) {
        embed.addField('Color Role', msg.guild.defaultRole, true);
      } else {
        embed.addField('Color Role', args.member.colorRole + ' - ' + args.member.displayHexColor, true);
      }
      embed.addField('Account Created On', args.member.user.createdAt.toString().substring(0, 16), true)
      .addField('Joined This Server On', args.member.joinedAt.toString().substring(0, 16), true);
    return util.Messenger.sendEmbed(msg.channel, embed, args.member.displayHexColor);

  }
}

module.exports = new Memberstats();
