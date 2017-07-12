const patron = require('patron.js');
const util = require('../../utility');
const Discord = require('discord.js');

class Userstats extends patron.Command {
  constructor() {
    super({
      name: 'userstats',
      aliases: ['us'],
      group: 'utility',
      description: 'Get a user\'s statistics',
      guildOnly: false,
      args: [
        new patron.Argument({
          name: 'user',
          key: 'user',
          type: 'user',
          example: 'PapaJohn#7777',
          isRemainder: true,
          default: patron.Default.Author
        })
      ]
    });
  }

  async run(msg, args) {
     const embed = new Discord.RichEmbed()
      .setTitle(args.user.tag + ' (' + args.user.id + ')')
      .setThumbnail(args.user.displayAvatarURL)
      .addField('Status', args.user.presence.status, true)
      .addField('Account Created On', args.user.createdAt.toString().substring(0, 16), true);
    if (msg.guild !== null && msg.guild.members.has(args.user.id)) {
      const member = msg.guild.members.find('id', args.user.id);
      embed.addField('Nickname', '`' + member.displayName + '`', true)
        .addField('Highest Role', member.highestRole, true)
        .addField('Joined This Server On', member.joinedAt.toString().substring(0, 16), true);
      return util.Messenger.sendEmbed(msg.channel, embed, member.displayHexColor);
    } else {
      return util.Messenger.sendEmbed(msg.channel, embed);
    }

  }
}

module.exports = new Userstats();
